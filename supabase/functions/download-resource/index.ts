import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface DownloadRequest {
  token: string
  userEmail: string
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    const url = new URL(req.url)
    const token = url.pathname.split('/').pop()
    const userEmail = url.searchParams.get('email')

    if (!token) {
      return new Response(
        JSON.stringify({ error: 'Download token is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    if (!userEmail) {
      return new Response(
        JSON.stringify({ error: 'User email is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Verify the download token
    const { data: verificationResult, error: verificationError } = await supabase
      .rpc('verify_download_token', {
        p_token: token,
        p_user_email: userEmail
      })

    if (verificationError) {
      console.error('Token verification error:', verificationError)
      return new Response(
        JSON.stringify({ error: 'Token verification failed' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    const verification = verificationResult?.[0]
    
    if (!verification || !verification.is_valid) {
      return new Response(
        JSON.stringify({ error: 'Invalid or expired download token' }),
        { 
          status: 403, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Generate signed URL for the file (if markdown, convert to PDF filename for downstream handling)
    const filePath: string = verification.file_path
    const { data: signedUrlData, error: signedUrlError } = await supabase
      .storage
      .from('resource-downloads')
      .createSignedUrl(filePath, 300) // 5 minutes expiry

    if (signedUrlError) {
      console.error('Signed URL generation error:', signedUrlError)
      return new Response(
        JSON.stringify({ error: 'Failed to generate download link' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Return the signed URL for download
    return new Response(
      JSON.stringify({
        success: true,
        downloadUrl: signedUrlData.signedUrl,
        fileName: verification.resource_title,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000).toISOString() // 5 minutes from now
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Download endpoint error:', error)
    
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})

/* 
Usage Examples:

1. Request download:
   GET /functions/v1/download-resource/{token}?email=user@example.com

2. Response (success):
   {
     "success": true,
     "downloadUrl": "https://...",
     "fileName": "Resource Title",
     "expiresAt": "2024-01-01T12:00:00Z"
   }

3. Response (error):
   {
     "error": "Invalid or expired download token"
   }

Security Features:
- Token-based authentication
- Email verification
- Time-based expiry
- Single-use tokens
- Signed URLs with short expiry
- No direct file access
*/
