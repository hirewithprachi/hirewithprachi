// Security middleware for Supabase Edge Functions
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

interface RateLimitConfig {
  windowMs: number
  maxRequests: number
  message: string
}

interface SecurityConfig {
  rateLimit: RateLimitConfig
  allowedOrigins: string[]
  requireAuth: boolean
  requireAdmin: boolean
}

// In-memory rate limit store (in production, use Redis or database)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

export class SecurityMiddleware {
  private config: SecurityConfig

  constructor(config: Partial<SecurityConfig> = {}) {
    this.config = {
      rateLimit: {
        windowMs: 15 * 60 * 1000, // 15 minutes
        maxRequests: 100,
        message: 'Too many requests, please try again later.'
      },
      allowedOrigins: ['*'],
      requireAuth: false,
      requireAdmin: false,
      ...config
    }
  }

  async handleRequest(req: Request, supabase: any): Promise<Response | null> {
    // 1. CORS check
    const corsResult = this.handleCORS(req)
    if (corsResult) return corsResult

    // 2. Rate limiting
    const rateLimitResult = this.handleRateLimit(req)
    if (rateLimitResult) return rateLimitResult

    // 3. Input validation
    const validationResult = await this.validateInput(req)
    if (validationResult) return validationResult

    // 4. Authentication check
    if (this.config.requireAuth) {
      const authResult = await this.handleAuthentication(req, supabase)
      if (authResult) return authResult
    }

    // 5. Admin check
    if (this.config.requireAdmin) {
      const adminResult = await this.handleAdminCheck(req, supabase)
      if (adminResult) return adminResult
    }

    return null // Continue with the request
  }

  private handleCORS(req: Request): Response | null {
    const origin = req.headers.get('Origin')
    
    if (origin && this.config.allowedOrigins.includes('*')) {
      return new Response('ok', {
        headers: {
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
          'Access-Control-Max-Age': '86400'
        }
      })
    }

    if (origin && !this.config.allowedOrigins.includes(origin)) {
      return new Response('Forbidden', { status: 403 })
    }

    return null
  }

  private handleRateLimit(req: Request): Response | null {
    const clientIP = req.headers.get('CF-Connecting-IP') || 
                    req.headers.get('X-Forwarded-For') || 
                    'unknown'
    
    const now = Date.now()
    const windowStart = now - this.config.rateLimit.windowMs
    
    const clientData = rateLimitStore.get(clientIP)
    
    if (!clientData || clientData.resetTime < now) {
      // Reset or initialize rate limit data
      rateLimitStore.set(clientIP, {
        count: 1,
        resetTime: now + this.config.rateLimit.windowMs
      })
    } else {
      // Increment request count
      clientData.count++
      
      if (clientData.count > this.config.rateLimit.maxRequests) {
        return new Response(
          JSON.stringify({ 
            error: 'Rate limit exceeded',
            message: this.config.rateLimit.message,
            retryAfter: Math.ceil((clientData.resetTime - now) / 1000)
          }),
          {
            status: 429,
            headers: {
              'Content-Type': 'application/json',
              'Retry-After': Math.ceil((clientData.resetTime - now) / 1000).toString(),
              'X-RateLimit-Limit': this.config.rateLimit.maxRequests.toString(),
              'X-RateLimit-Remaining': '0',
              'X-RateLimit-Reset': new Date(clientData.resetTime).toISOString()
            }
          }
        )
      }
    }

    return null
  }

  private async validateInput(req: Request): Promise<Response | null> {
    if (req.method === 'GET') return null

    try {
      const contentType = req.headers.get('Content-Type')
      
      if (contentType?.includes('application/json')) {
        const body = await req.json()
        
        // Basic input sanitization
        if (typeof body === 'object' && body !== null) {
          const sanitizedBody = this.sanitizeObject(body)
          
          // Check for potential injection attacks
          if (this.containsInjection(sanitizedBody)) {
            return new Response(
              JSON.stringify({ error: 'Invalid input detected' }),
              { status: 400, headers: { 'Content-Type': 'application/json' } }
            )
          }
        }
      }
    } catch (error) {
      return new Response(
        JSON.stringify({ error: 'Invalid request body' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    return null
  }

  private async handleAuthentication(req: Request, supabase: any): Promise<Response | null> {
    const authHeader = req.headers.get('Authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ error: 'Authentication required' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const token = authHeader.replace('Bearer ', '')
    
    try {
      const { data: { user }, error } = await supabase.auth.getUser(token)
      
      if (error || !user) {
        return new Response(
          JSON.stringify({ error: 'Invalid authentication token' }),
          { status: 401, headers: { 'Content-Type': 'application/json' } }
        )
      }

      // Add user to request context
      ;(req as any).user = user
      
    } catch (error) {
      return new Response(
        JSON.stringify({ error: 'Authentication failed' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      )
    }

    return null
  }

  private async handleAdminCheck(req: Request, supabase: any): Promise<Response | null> {
    const user = (req as any).user
    
    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Authentication required' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      )
    }

    try {
      const { data: userProfile, error } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single()

      if (error || userProfile?.role !== 'admin') {
        return new Response(
          JSON.stringify({ error: 'Admin access required' }),
          { status: 403, headers: { 'Content-Type': 'application/json' } }
        )
      }
    } catch (error) {
      return new Response(
        JSON.stringify({ error: 'Authorization check failed' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }

    return null
  }

  private sanitizeObject(obj: any): any {
    if (typeof obj !== 'object' || obj === null) {
      return typeof obj === 'string' ? this.sanitizeString(obj) : obj
    }

    if (Array.isArray(obj)) {
      return obj.map(item => this.sanitizeObject(item))
    }

    const sanitized: any = {}
    for (const [key, value] of Object.entries(obj)) {
      sanitized[key] = this.sanitizeObject(value)
    }

    return sanitized
  }

  private sanitizeString(str: string): string {
    if (typeof str !== 'string') return str
    
    // Remove null bytes and other control characters
    return str
      .replace(/\0/g, '')
      .replace(/[\x00-\x1F\x7F]/g, '')
      .trim()
  }

  private containsInjection(obj: any): boolean {
    const str = JSON.stringify(obj).toLowerCase()
    
    // Check for common injection patterns
    const injectionPatterns = [
      /<script/i,
      /javascript:/i,
      /on\w+\s*=/i,
      /union\s+select/i,
      /drop\s+table/i,
      /delete\s+from/i,
      /insert\s+into/i,
      /update\s+set/i,
      /exec\s*\(/i,
      /eval\s*\(/i
    ]

    return injectionPatterns.some(pattern => pattern.test(str))
  }

  // Add security headers to response
  addSecurityHeaders(response: Response): Response {
    const headers = new Headers(response.headers)
    
    headers.set('X-Content-Type-Options', 'nosniff')
    headers.set('X-Frame-Options', 'DENY')
    headers.set('X-XSS-Protection', '1; mode=block')
    headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
    headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()')
    
    // Add CSP header
    headers.set('Content-Security-Policy', 
      "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:;"
    )

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers
    })
  }

  // Clean up old rate limit entries
  cleanupRateLimitStore(): void {
    const now = Date.now()
    for (const [key, value] of rateLimitStore.entries()) {
      if (value.resetTime < now) {
        rateLimitStore.delete(key)
      }
    }
  }
}

// Utility function to create security middleware
export function createSecurityMiddleware(config: Partial<SecurityConfig> = {}): SecurityMiddleware {
  return new SecurityMiddleware(config)
}

// Default security headers
export const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:;"
}
