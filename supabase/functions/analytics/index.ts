import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

interface AnalyticsRequest {
  type: 'dashboard' | 'leads' | 'blog' | 'users' | 'calculators' | 'custom'
  dateRange: {
    start: string
    end: string
  }
  filters?: {
    status?: string
    category?: string
    source?: string
  }
  groupBy?: 'day' | 'week' | 'month' | 'year'
}

interface AnalyticsResponse {
  success: boolean
  data: any
  metadata: {
    totalRecords: number
    dateRange: string
    generatedAt: string
  }
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey)
    const { method } = req

    if (method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Get user token for authentication
    const authHeader = req.headers.get('Authorization')
    let userId: string | null = null
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.replace('Bearer ', '')
      try {
        const { data: { user }, error: authError } = await supabase.auth.getUser(token)
        if (!authError && user) {
          userId = user.id
        }
      } catch (error) {
        console.log('Auth error:', error.message)
      }
    }

    if (!userId) {
      return new Response(
        JSON.stringify({ error: 'Authentication required' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Check if user is admin
    const { data: userProfile, error: profileError } = await supabase
      .from('users')
      .select('role')
      .eq('id', userId)
      .single()

    if (profileError || userProfile?.role !== 'admin') {
      return new Response(
        JSON.stringify({ error: 'Admin access required' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const request: AnalyticsRequest = await req.json()

    // Generate analytics based on type
    let analyticsData: any
    let totalRecords = 0

    switch (request.type) {
      case 'dashboard':
        analyticsData = await generateDashboardAnalytics(supabase, request)
        break
      case 'leads':
        analyticsData = await generateLeadsAnalytics(supabase, request)
        break
      case 'blog':
        analyticsData = await generateBlogAnalytics(supabase, request)
        break
      case 'users':
        analyticsData = await generateUsersAnalytics(supabase, request)
        break
      case 'calculators':
        analyticsData = await generateCalculatorAnalytics(supabase, request)
        break
      case 'custom':
        analyticsData = await generateCustomAnalytics(supabase, request)
        break
      default:
        return new Response(
          JSON.stringify({ error: 'Invalid analytics type' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
    }

    const response: AnalyticsResponse = {
      success: true,
      data: analyticsData,
      metadata: {
        totalRecords,
        dateRange: `${request.dateRange.start} to ${request.dateRange.end}`,
        generatedAt: new Date().toISOString()
      }
    }

    return new Response(
      JSON.stringify(response),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Analytics error:', error)
    return new Response(
      JSON.stringify({ error: 'Analytics generation failed', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

async function generateDashboardAnalytics(supabase: any, request: AnalyticsRequest) {
  const { dateRange } = request

  // Get overall statistics
  const [
    leadsStats,
    blogStats,
    userStats,
    calculatorStats,
    recentActivity
  ] = await Promise.all([
    getLeadsStats(supabase, dateRange),
    getBlogStats(supabase, dateRange),
    getUserStats(supabase, dateRange),
    getCalculatorStats(supabase, dateRange),
    getRecentActivity(supabase, dateRange)
  ])

  // Generate trends
  const trends = await generateTrends(supabase, dateRange)

  return {
    overview: {
      totalLeads: leadsStats.total,
      totalBlogPosts: blogStats.total,
      totalUsers: userStats.total,
      totalCalculations: calculatorStats.total
    },
    leads: leadsStats,
    blog: blogStats,
    users: userStats,
    calculators: calculatorStats,
    trends,
    recentActivity
  }
}

async function generateLeadsAnalytics(supabase: any, request: AnalyticsRequest) {
  const { dateRange, filters, groupBy = 'day' } = request

  // Get leads data
  let query = supabase
    .from('leads')
    .select('*')
    .gte('created_at', dateRange.start)
    .lte('created_at', dateRange.end)

  if (filters?.status) {
    query = query.eq('status', filters.status)
  }

  if (filters?.source) {
    query = query.eq('source', filters.source)
  }

  const { data: leads, error } = await query

  if (error) {
    throw new Error(`Failed to fetch leads: ${error.message}`)
  }

  // Group by status
  const statusBreakdown = leads.reduce((acc: any, lead: any) => {
    acc[lead.status] = (acc[lead.status] || 0) + 1
    return acc
  }, {})

  // Group by source
  const sourceBreakdown = leads.reduce((acc: any, lead: any) => {
    acc[lead.source || 'unknown'] = (acc[lead.source || 'unknown'] || 0) + 1
    return acc
  }, {})

  // Time series data
  const timeSeriesData = groupDataByTime(leads, groupBy, 'created_at')

  // Conversion funnel
  const conversionFunnel = {
    total: leads.length,
    new: statusBreakdown.new || 0,
    contacted: statusBreakdown.contacted || 0,
    converted: statusBreakdown.converted || 0,
    lost: statusBreakdown.lost || 0
  }

  return {
    summary: {
      total: leads.length,
      conversionRate: leads.length > 0 ? ((conversionFunnel.converted / leads.length) * 100).toFixed(2) : '0',
      averageResponseTime: calculateAverageResponseTime(leads)
    },
    statusBreakdown,
    sourceBreakdown,
    timeSeriesData,
    conversionFunnel,
    topSources: Object.entries(sourceBreakdown)
      .sort(([,a], [,b]) => (b as number) - (a as number))
      .slice(0, 5)
  }
}

async function generateBlogAnalytics(supabase: any, request: AnalyticsRequest) {
  const { dateRange, groupBy = 'day' } = request

  // Get blog posts data
  const { data: posts, error } = await supabase
    .from('blog_posts')
    .select('*')
    .gte('created_at', dateRange.start)
    .lte('created_at', dateRange.end)

  if (error) {
    throw new Error(`Failed to fetch blog posts: ${error.message}`)
  }

  // Status breakdown
  const statusBreakdown = posts.reduce((acc: any, post: any) => {
    acc[post.status] = (acc[post.status] || 0) + 1
    return acc
  }, {})

  // Time series data
  const timeSeriesData = groupDataByTime(posts, groupBy, 'created_at')

  // Author performance
  const authorPerformance = posts.reduce((acc: any, post: any) => {
    if (!acc[post.author_id]) {
      acc[post.author_id] = { total: 0, published: 0, drafts: 0 }
    }
    acc[post.author_id].total++
    if (post.status === 'published') {
      acc[post.author_id].published++
    } else if (post.status === 'draft') {
      acc[post.author_id].drafts++
    }
    return acc
  }, {})

  return {
    summary: {
      total: posts.length,
      published: statusBreakdown.published || 0,
      drafts: statusBreakdown.draft || 0,
      archived: statusBreakdown.archived || 0
    },
    statusBreakdown,
    timeSeriesData,
    authorPerformance,
    publishingTrends: calculatePublishingTrends(posts)
  }
}

async function generateUsersAnalytics(supabase: any, request: AnalyticsRequest) {
  const { dateRange, groupBy = 'day' } = request

  // Get users data
  const { data: users, error } = await supabase
    .from('users')
    .select('*')
    .gte('created_at', dateRange.start)
    .lte('created_at', dateRange.end)

  if (error) {
    throw new Error(`Failed to fetch users: ${error.message}`)
  }

  // Role breakdown
  const roleBreakdown = users.reduce((acc: any, user: any) => {
    acc[user.role] = (acc[user.role] || 0) + 1
    return acc
  }, {})

  // Time series data
  const timeSeriesData = groupDataByTime(users, groupBy, 'created_at')

  // Activity analysis
  const activeUsers = users.filter((user: any) => user.is_active)
  const verifiedUsers = users.filter((user: any) => user.email_verified)

  return {
    summary: {
      total: users.length,
      active: activeUsers.length,
      verified: verifiedUsers.length,
      activeRate: users.length > 0 ? ((activeUsers.length / users.length) * 100).toFixed(2) : '0'
    },
    roleBreakdown,
    timeSeriesData,
    userGrowth: calculateUserGrowth(users),
    activityMetrics: {
      activeUsers: activeUsers.length,
      verifiedUsers: verifiedUsers.length,
      newUsers: users.filter((user: any) => {
        const userDate = new Date(user.created_at)
        const startDate = new Date(dateRange.start)
        return userDate >= startDate
      }).length
    }
  }
}

async function generateCalculatorAnalytics(supabase: any, request: AnalyticsRequest) {
  const { dateRange, groupBy = 'day' } = request

  // Get calculator sessions data
  const { data: sessions, error } = await supabase
    .from('calculator_sessions')
    .select('*')
    .gte('created_at', dateRange.start)
    .lte('created_at', dateRange.end)

  if (error) {
    throw new Error(`Failed to fetch calculator sessions: ${error.message}`)
  }

  // Calculator type breakdown
  const typeBreakdown = sessions.reduce((acc: any, session: any) => {
    acc[session.calculator_type] = (acc[session.calculator_type] || 0) + 1
    return acc
  }, {})

  // Time series data
  const timeSeriesData = groupDataByTime(sessions, groupBy, 'created_at')

  // User engagement
  const uniqueUsers = new Set(sessions.map((session: any) => session.user_id))
  const averageCalculationsPerUser = sessions.length / uniqueUsers.size

  return {
    summary: {
      total: sessions.length,
      uniqueUsers: uniqueUsers.size,
      averagePerUser: averageCalculationsPerUser.toFixed(2)
    },
    typeBreakdown,
    timeSeriesData,
    popularCalculators: Object.entries(typeBreakdown)
      .sort(([,a], [,b]) => (b as number) - (a as number))
      .slice(0, 3)
  }
}

async function generateCustomAnalytics(supabase: any, request: AnalyticsRequest) {
  // Custom analytics implementation
  return {
    message: 'Custom analytics endpoint - implement specific logic as needed'
  }
}

// Helper functions
async function getLeadsStats(supabase: any, dateRange: any) {
  const { data: leads, error } = await supabase
    .from('leads')
    .select('*')
    .gte('created_at', dateRange.start)
    .lte('created_at', dateRange.end)

  if (error) return { total: 0, error: error.message }

  return {
    total: leads.length,
    byStatus: leads.reduce((acc: any, lead: any) => {
      acc[lead.status] = (acc[lead.status] || 0) + 1
      return acc
    }, {})
  }
}

async function getBlogStats(supabase: any, dateRange: any) {
  const { data: posts, error } = await supabase
    .from('blog_posts')
    .select('*')
    .gte('created_at', dateRange.start)
    .lte('created_at', dateRange.end)

  if (error) return { total: 0, error: error.message }

  return {
    total: posts.length,
    byStatus: posts.reduce((acc: any, post: any) => {
      acc[post.status] = (acc[post.status] || 0) + 1
      return acc
    }, {})
  }
}

async function getUserStats(supabase: any, dateRange: any) {
  const { data: users, error } = await supabase
    .from('users')
    .select('*')
    .gte('created_at', dateRange.start)
    .lte('created_at', dateRange.end)

  if (error) return { total: 0, error: error.message }

  return {
    total: users.length,
    byRole: users.reduce((acc: any, user: any) => {
      acc[user.role] = (acc[user.role] || 0) + 1
      return acc
    }, {})
  }
}

async function getCalculatorStats(supabase: any, dateRange: any) {
  const { data: sessions, error } = await supabase
    .from('calculator_sessions')
    .select('*')
    .gte('created_at', dateRange.start)
    .lte('created_at', dateRange.end)

  if (error) return { total: 0, error: error.message }

  return {
    total: sessions.length,
    byType: sessions.reduce((acc: any, session: any) => {
      acc[session.calculator_type] = (acc[session.calculator_type] || 0) + 1
      return acc
    }, {})
  }
}

async function getRecentActivity(supabase: any, dateRange: any) {
  // Get recent activity from various tables
  const activities = []

  // Recent leads
  const { data: recentLeads } = await supabase
    .from('leads')
    .select('id, first_name, last_name, status, created_at')
    .gte('created_at', dateRange.start)
    .lte('created_at', dateRange.end)
    .order('created_at', { ascending: false })
    .limit(5)

  if (recentLeads) {
    activities.push(...recentLeads.map((lead: any) => ({
      type: 'lead',
      action: 'created',
      description: `New lead: ${lead.first_name} ${lead.last_name}`,
      timestamp: lead.created_at,
      data: lead
    })))
  }

  // Recent blog posts
  const { data: recentPosts } = await supabase
    .from('blog_posts')
    .select('id, title, status, created_at')
    .gte('created_at', dateRange.start)
    .lte('created_at', dateRange.end)
    .order('created_at', { ascending: false })
    .limit(5)

  if (recentPosts) {
    activities.push(...recentPosts.map((post: any) => ({
      type: 'blog',
      action: 'created',
      description: `New blog post: ${post.title}`,
      timestamp: post.created_at,
      data: post
    })))
  }

  // Sort by timestamp and return top 10
  return activities
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 10)
}

async function generateTrends(supabase: any, dateRange: any) {
  // Generate trend data for the last 30 days
  const trends = {
    leads: await generateTrendData(supabase, 'leads', dateRange),
    blog: await generateTrendData(supabase, 'blog_posts', dateRange),
    users: await generateTrendData(supabase, 'users', dateRange),
    calculators: await generateTrendData(supabase, 'calculator_sessions', dateRange)
  }

  return trends
}

async function generateTrendData(supabase: any, table: string, dateRange: any) {
  const { data, error } = await supabase
    .from(table)
    .select('created_at')
    .gte('created_at', dateRange.start)
    .lte('created_at', dateRange.end)

  if (error) return []

  // Group by day
  const dailyData = data.reduce((acc: any, item: any) => {
    const date = new Date(item.created_at).toISOString().split('T')[0]
    acc[date] = (acc[date] || 0) + 1
    return acc
  }, {})

  return Object.entries(dailyData).map(([date, count]) => ({
    date,
    count
  }))
}

function groupDataByTime(data: any[], groupBy: string, dateField: string) {
  const grouped = data.reduce((acc: any, item: any) => {
    const date = new Date(item[dateField])
    let key: string

    switch (groupBy) {
      case 'day':
        key = date.toISOString().split('T')[0]
        break
      case 'week':
        const weekStart = new Date(date)
        weekStart.setDate(date.getDate() - date.getDay())
        key = weekStart.toISOString().split('T')[0]
        break
      case 'month':
        key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
        break
      case 'year':
        key = date.getFullYear().toString()
        break
      default:
        key = date.toISOString().split('T')[0]
    }

    acc[key] = (acc[key] || 0) + 1
    return acc
  }, {})

  return Object.entries(grouped).map(([date, count]) => ({
    date,
    count
  }))
}

function calculateAverageResponseTime(leads: any[]) {
  const respondedLeads = leads.filter((lead: any) => lead.contacted_at)
  
  if (respondedLeads.length === 0) return 0

  const totalResponseTime = respondedLeads.reduce((total: number, lead: any) => {
    const created = new Date(lead.created_at).getTime()
    const contacted = new Date(lead.contacted_at).getTime()
    return total + (contacted - created)
  }, 0)

  return Math.round(totalResponseTime / respondedLeads.length / (1000 * 60 * 60 * 24)) // Days
}

function calculatePublishingTrends(posts: any[]) {
  const publishedPosts = posts.filter((post: any) => post.status === 'published')
  
  return {
    totalPublished: publishedPosts.length,
    averagePublishTime: publishedPosts.length > 0 ? 
      publishedPosts.reduce((total: number, post: any) => {
        const created = new Date(post.created_at).getTime()
        const published = new Date(post.published_at).getTime()
        return total + (published - created)
      }, 0) / publishedPosts.length / (1000 * 60 * 60 * 24) : 0 // Days
  }
}

function calculateUserGrowth(users: any[]) {
  const sortedUsers = users.sort((a: any, b: any) => 
    new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  )

  return sortedUsers.map((user: any, index: number) => ({
    date: user.created_at,
    cumulative: index + 1
  }))
}
