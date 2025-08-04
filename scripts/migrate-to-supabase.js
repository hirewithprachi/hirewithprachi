import { createClient } from '@supabase/supabase-js'
import { servicesData } from '../src/data/servicesData.js'
import { toolsData } from '../src/data/toolsData.js'
import { blogPosts } from '../src/data/blogPosts.js'
import { faqData } from '../src/data/faqData.js'

// Initialize Supabase client
const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseServiceKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

// Sample salary benchmark data
const salaryBenchmarks = [
  {
    position: 'HR Manager',
    location: 'Mumbai',
    experience_level: '1-3',
    industry: 'Technology',
    salary_min: 600000,
    salary_max: 1200000,
    salary_median: 800000,
    salary_mean: 850000,
    data_source: 'Industry Survey 2024',
    sample_size: 150
  },
  {
    position: 'HR Manager',
    location: 'Delhi',
    experience_level: '1-3',
    industry: 'Technology',
    salary_min: 550000,
    salary_max: 1100000,
    salary_median: 750000,
    salary_mean: 800000,
    data_source: 'Industry Survey 2024',
    sample_size: 120
  },
  {
    position: 'HR Generalist',
    location: 'Mumbai',
    experience_level: '1-3',
    industry: 'Technology',
    salary_min: 400000,
    salary_max: 800000,
    salary_median: 550000,
    salary_mean: 580000,
    data_source: 'Industry Survey 2024',
    sample_size: 200
  },
  {
    position: 'Recruiter',
    location: 'Mumbai',
    experience_level: '1-3',
    industry: 'Technology',
    salary_min: 350000,
    salary_max: 750000,
    salary_median: 500000,
    salary_mean: 520000,
    data_source: 'Industry Survey 2024',
    sample_size: 180
  },
  {
    position: 'HR Director',
    location: 'Mumbai',
    experience_level: '5-8',
    industry: 'Technology',
    salary_min: 900000,
    salary_max: 1800000,
    salary_median: 1200000,
    salary_mean: 1250000,
    data_source: 'Industry Survey 2024',
    sample_size: 80
  }
]

// Sample market trends data
const marketTrends = [
  {
    metric_type: 'salary_growth',
    industry: 'Technology',
    location: 'Mumbai',
    trend_value: 12.5,
    change_percentage: 8.2,
    forecast_period: '2024-2025',
    confidence_level: 0.85,
    data_source: 'Market Analysis'
  },
  {
    metric_type: 'hr_automation_adoption',
    industry: 'Technology',
    location: 'India',
    trend_value: 65.0,
    change_percentage: 15.3,
    forecast_period: '2024-2025',
    confidence_level: 0.90,
    data_source: 'Industry Report'
  },
  {
    metric_type: 'remote_work_preference',
    industry: 'Technology',
    location: 'India',
    trend_value: 78.0,
    change_percentage: 5.2,
    forecast_period: '2024-2025',
    confidence_level: 0.88,
    data_source: 'Employee Survey'
  }
]

// Sample resources data
const resources = [
  {
    title: 'Employee Handbook Template 2024',
    description: 'Comprehensive employee handbook template compliant with Indian labor laws',
    type: 'template',
    file_url: '/downloads/employee-handbook-template-2024.pdf',
    category: 'HR Policies',
    tags: ['handbook', 'policies', 'compliance', 'template'],
    file_size: 2048576,
    is_featured: true
  },
  {
    title: 'HR Compliance Checklist 2024',
    description: 'Complete checklist for HR compliance requirements in India',
    type: 'checklist',
    file_url: '/downloads/hr-compliance-checklist-2024.pdf',
    category: 'Compliance',
    tags: ['compliance', 'checklist', 'legal', 'requirements'],
    file_size: 512000,
    is_featured: true
  },
  {
    title: 'Salary Structure Template',
    description: 'Professional salary structure template for different company sizes',
    type: 'template',
    file_url: '/downloads/salary-structure-template-comprehensive.pdf',
    category: 'Compensation',
    tags: ['salary', 'compensation', 'structure', 'template'],
    file_size: 1024000,
    is_featured: false
  },
  {
    title: 'Employee Engagement Survey Template',
    description: 'Comprehensive employee engagement survey with analysis framework',
    type: 'template',
    file_url: '/downloads/employee-engagement-survey-template.pdf',
    category: 'Employee Engagement',
    tags: ['engagement', 'survey', 'template', 'analysis'],
    file_size: 768000,
    is_featured: true
  }
]

async function migrateData() {
  console.log('🚀 Starting data migration to Supabase...')

  try {
    // 1. Migrate salary benchmarks
    console.log('📊 Migrating salary benchmarks...')
    const { data: benchmarksData, error: benchmarksError } = await supabase
      .from('salary_benchmarks')
      .insert(salaryBenchmarks)
      .select()

    if (benchmarksError) {
      console.error('Error migrating salary benchmarks:', benchmarksError)
    } else {
      console.log(`✅ Migrated ${benchmarksData.length} salary benchmarks`)
    }

    // 2. Migrate market trends
    console.log('📈 Migrating market trends...')
    const { data: trendsData, error: trendsError } = await supabase
      .from('market_trends')
      .insert(marketTrends)
      .select()

    if (trendsError) {
      console.error('Error migrating market trends:', trendsError)
    } else {
      console.log(`✅ Migrated ${trendsData.length} market trends`)
    }

    // 3. Migrate resources
    console.log('📚 Migrating resources...')
    const { data: resourcesData, error: resourcesError } = await supabase
      .from('resources')
      .insert(resources)
      .select()

    if (resourcesError) {
      console.error('Error migrating resources:', resourcesError)
    } else {
      console.log(`✅ Migrated ${resourcesData.length} resources`)
    }

    // 4. Migrate blog posts (if available)
    if (blogPosts && blogPosts.length > 0) {
      console.log('📝 Migrating blog posts...')
      const blogData = blogPosts.map(post => ({
        title: post.title,
        slug: post.slug || post.title.toLowerCase().replace(/\s+/g, '-'),
        content: post.content,
        excerpt: post.excerpt || post.content.substring(0, 200) + '...',
        category: post.category || 'HR Insights',
        tags: post.tags || [],
        status: 'published',
        published_at: new Date().toISOString()
      }))

      const { data: blogDataResult, error: blogError } = await supabase
        .from('blog_posts')
        .insert(blogData)
        .select()

      if (blogError) {
        console.error('Error migrating blog posts:', blogError)
      } else {
        console.log(`✅ Migrated ${blogDataResult.length} blog posts`)
      }
    }

    console.log('🎉 Data migration completed successfully!')
    console.log('\n📋 Migration Summary:')
    console.log(`- Salary Benchmarks: ${benchmarksData?.length || 0}`)
    console.log(`- Market Trends: ${trendsData?.length || 0}`)
    console.log(`- Resources: ${resourcesData?.length || 0}`)
    console.log(`- Blog Posts: ${blogDataResult?.length || 0}`)

  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  }
}

// Function to seed additional test data
async function seedTestData() {
  console.log('🌱 Seeding additional test data...')

  try {
    // Add more salary benchmarks for different locations and experience levels
    const additionalBenchmarks = [
      {
        position: 'HR Manager',
        location: 'Bangalore',
        experience_level: '1-3',
        industry: 'Technology',
        salary_min: 500000,
        salary_max: 1000000,
        salary_median: 700000,
        salary_mean: 720000,
        data_source: 'Industry Survey 2024',
        sample_size: 100
      },
      {
        position: 'HR Manager',
        location: 'Hyderabad',
        experience_level: '1-3',
        industry: 'Technology',
        salary_min: 450000,
        salary_max: 900000,
        salary_median: 650000,
        salary_mean: 670000,
        data_source: 'Industry Survey 2024',
        sample_size: 80
      },
      {
        position: 'HR Generalist',
        location: 'Delhi',
        experience_level: '1-3',
        industry: 'Technology',
        salary_min: 350000,
        salary_max: 700000,
        salary_median: 480000,
        salary_mean: 500000,
        data_source: 'Industry Survey 2024',
        sample_size: 150
      }
    ]

    const { data: additionalData, error } = await supabase
      .from('salary_benchmarks')
      .insert(additionalBenchmarks)
      .select()

    if (error) {
      console.error('Error seeding additional data:', error)
    } else {
      console.log(`✅ Seeded ${additionalData.length} additional salary benchmarks`)
    }

  } catch (error) {
    console.error('❌ Seeding failed:', error)
  }
}

// Run migration
if (process.argv.includes('--seed')) {
  seedTestData()
} else {
  migrateData()
} 