import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import { 
  BarChart3, 
  LineChart, 
  PieChart, 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Users, 
  FileText, 
  Video, 
  Mail, 
  Calendar, 
  Clock, 
  Target, 
  DollarSign,
  Eye,
  Heart,
  Share2,
  MessageCircle,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  Download,
  Filter,
  Search,
  Settings,
  X,
  Loader,
  Database,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  MousePointer,
  Zap,
  Award,
  Star,
  CheckCircle,
  AlertCircle,
  Info,
  AlertTriangle
} from 'lucide-react';

const AnalyticsProCenter = ({ data, leads, blogPosts, onClose, addNotification }) => {
  const [loading, setLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState({});
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('overview');
  const [realTimeData, setRealTimeData] = useState({});
  const [chartType, setChartType] = useState('line');

  // Load analytics data
  useEffect(() => {
    loadAnalyticsData();
  }, [timeRange]);

  const loadAnalyticsData = async () => {
    try {
      setLoading(true);
      
      // Simulate real analytics data
      const mockAnalytics = {
        overview: {
          totalPageViews: 15420,
          uniqueVisitors: 8640,
          bounceRate: 32.4,
          avgSessionDuration: '2m 45s',
          conversionRate: 4.2,
          revenue: 125000
        },
        traffic: {
          organic: 45.2,
          direct: 23.8,
          social: 18.5,
          referral: 8.9,
          email: 3.6
        },
        content: {
          topPages: [
            { page: '/services/hr-compliance', views: 2340, conversionRate: 8.5 },
            { page: '/services/recruitment', views: 1890, conversionRate: 6.2 },
            { page: '/blog/hr-trends-2025', views: 1650, conversionRate: 3.8 },
            { page: '/calculators/salary-calculator', views: 1420, conversionRate: 12.1 },
            { page: '/services/payroll-management', views: 1285, conversionRate: 7.3 }
          ],
          topBlogs: blogPosts.slice(0, 5).map((post, index) => ({
            ...post,
            views: Math.floor(Math.random() * 2000) + 500,
            engagement: Math.floor(Math.random() * 50) + 20
          }))
        },
        leads: {
          totalLeads: leads.length,
          newLeads: leads.filter(l => {
            const created = new Date(l.created_at);
            const weekAgo = new Date();
            weekAgo.setDate(weekAgo.getDate() - 7);
            return created >= weekAgo;
          }).length,
          conversionsBySource: {
            'Website Forms': 45,
            'Social Media': 23,
            'Email Campaigns': 18,
            'Referrals': 14
          },
          conversionFunnel: [
            { stage: 'Visitors', count: 8640, percentage: 100 },
            { stage: 'Form Views', count: 2160, percentage: 25 },
            { stage: 'Form Starts', count: 1296, percentage: 15 },
            { stage: 'Form Completes', count: 864, percentage: 10 },
            { stage: 'Qualified Leads', count: 432, percentage: 5 },
            { stage: 'Customers', count: 86, percentage: 1 }
          ]
        },
        realTime: {
          activeUsers: Math.floor(Math.random() * 50) + 20,
          pageViews: Math.floor(Math.random() * 100) + 50,
          topPages: [
            '/services/hr-compliance',
            '/blog/hr-trends-2025',
            '/calculators/salary-calculator'
          ],
          devices: {
            desktop: 52.3,
            mobile: 35.7,
            tablet: 12.0
          }
        }
      };

      setAnalyticsData(mockAnalytics);
      setRealTimeData(mockAnalytics.realTime);
      
      // Try to load from database
      const { data: analyticsEvents } = await supabase
        .from('analytics_events')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1000);

      if (analyticsEvents && analyticsEvents.length > 0) {
        // Process real analytics data
        const processedData = processAnalyticsEvents(analyticsEvents);
        setAnalyticsData(prev => ({ ...prev, ...processedData }));
      }
      
    } catch (error) {
      console.error('Error loading analytics:', error);
      addNotification('Failed to load analytics data', 'error');
    } finally {
      setLoading(false);
    }
  };

  const processAnalyticsEvents = (events) => {
    // Process analytics events into meaningful data
    const eventsByType = events.reduce((acc, event) => {
      if (!acc[event.event_name]) acc[event.event_name] = [];
      acc[event.event_name].push(event);
      return acc;
    }, {});

    return {
      processedEvents: eventsByType,
      totalEvents: events.length
    };
  };

  const timeRanges = [
    { value: '1d', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' },
    { value: '1y', label: 'Last Year' }
  ];

  const metrics = [
    { id: 'overview', label: 'Overview', icon: BarChart3, color: 'blue' },
    { id: 'traffic', label: 'Traffic Sources', icon: Globe, color: 'green' },
    { id: 'content', label: 'Content Performance', icon: FileText, color: 'purple' },
    { id: 'leads', label: 'Lead Analytics', icon: Users, color: 'orange' },
    { id: 'realtime', label: 'Real-time', icon: Activity, color: 'red' }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader className="w-8 h-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Loading analytics...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics Pro</h2>
          <p className="text-gray-600 dark:text-gray-400">Advanced analytics and business insights</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          >
            {timeRanges.map(range => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
          <button
            onClick={loadAnalyticsData}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 flex items-center space-x-2"
          >
            <X className="w-4 h-4" />
            <span>Close</span>
          </button>
        </div>
      </div>

      {/* Metrics Navigation */}
      <div className="flex space-x-4 overflow-x-auto">
        {metrics.map(metric => {
          const Icon = metric.icon;
          return (
            <button
              key={metric.id}
              onClick={() => setSelectedMetric(metric.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-200 ${
                selectedMetric === metric.id
                  ? `bg-${metric.color}-600 text-white shadow-lg`
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{metric.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content based on selected metric */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedMetric}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          {selectedMetric === 'overview' && (
            <OverviewAnalytics data={analyticsData.overview} />
          )}
          {selectedMetric === 'traffic' && (
            <TrafficAnalytics data={analyticsData.traffic} />
          )}
          {selectedMetric === 'content' && (
            <ContentAnalytics data={analyticsData.content} />
          )}
          {selectedMetric === 'leads' && (
            <LeadAnalytics data={analyticsData.leads} leads={leads} />
          )}
          {selectedMetric === 'realtime' && (
            <RealTimeAnalytics data={realTimeData} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// Overview Analytics Component
const OverviewAnalytics = ({ data }) => {
  const kpis = [
    {
      label: 'Total Page Views',
      value: data?.totalPageViews || 0,
      change: '+12.5%',
      trend: 'up',
      icon: Eye,
      color: 'blue'
    },
    {
      label: 'Unique Visitors',
      value: data?.uniqueVisitors || 0,
      change: '+8.3%',
      trend: 'up',
      icon: Users,
      color: 'green'
    },
    {
      label: 'Bounce Rate',
      value: `${data?.bounceRate || 0}%`,
      change: '-2.1%',
      trend: 'down',
      icon: TrendingDown,
      color: 'red'
    },
    {
      label: 'Avg Session Duration',
      value: data?.avgSessionDuration || '0s',
      change: '+15.2%',
      trend: 'up',
      icon: Clock,
      color: 'purple'
    },
    {
      label: 'Conversion Rate',
      value: `${data?.conversionRate || 0}%`,
      change: '+3.7%',
      trend: 'up',
      icon: Target,
      color: 'orange'
    },
    {
      label: 'Revenue',
      value: `₹${(data?.revenue || 0).toLocaleString()}`,
      change: '+18.9%',
      trend: 'up',
      icon: DollarSign,
      color: 'yellow'
    }
  ];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kpis.map(kpi => {
          const Icon = kpi.icon;
          return (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-${kpi.color}-100 dark:bg-${kpi.color}-900/20`}>
                  <Icon className={`w-6 h-6 text-${kpi.color}-600`} />
                </div>
                <div className={`flex items-center space-x-1 text-sm ${
                  kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {kpi.trend === 'up' ? (
                    <ArrowUpRight className="w-4 h-4" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4" />
                  )}
                  <span>{kpi.change}</span>
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{kpi.value}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{kpi.label}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Traffic Trends</h3>
          <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <LineChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Traffic trend chart</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Conversion Funnel</h3>
          <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Conversion funnel chart</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Traffic Analytics Component
const TrafficAnalytics = ({ data }) => {
  const sources = [
    { name: 'Organic Search', percentage: data?.organic || 0, color: 'green' },
    { name: 'Direct', percentage: data?.direct || 0, color: 'blue' },
    { name: 'Social Media', percentage: data?.social || 0, color: 'purple' },
    { name: 'Referral', percentage: data?.referral || 0, color: 'orange' },
    { name: 'Email', percentage: data?.email || 0, color: 'red' }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Sources */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Traffic Sources</h3>
          <div className="space-y-4">
            {sources.map(source => (
              <div key={source.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full bg-${source.color}-500`}></div>
                  <span className="text-gray-900 dark:text-white">{source.name}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`bg-${source.color}-500 h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${source.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400 w-12 text-right">
                    {source.percentage.toFixed(1)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Geographic Data */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top Locations</h3>
          <div className="space-y-3">
            {['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Pune'].map((city, index) => (
              <div key={city} className="flex items-center justify-between">
                <span className="text-gray-900 dark:text-white">{city}</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {(Math.random() * 20 + 5).toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Content Analytics Component
const ContentAnalytics = ({ data }) => {
  return (
    <div className="space-y-6">
      {/* Top Pages */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top Performing Pages</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 text-gray-600 dark:text-gray-400">Page</th>
                <th className="text-right py-3 text-gray-600 dark:text-gray-400">Views</th>
                <th className="text-right py-3 text-gray-600 dark:text-gray-400">Conversion Rate</th>
              </tr>
            </thead>
            <tbody>
              {data?.topPages?.map((page, index) => (
                <tr key={index} className="border-b border-gray-100 dark:border-gray-700">
                  <td className="py-3 text-gray-900 dark:text-white">{page.page}</td>
                  <td className="py-3 text-right text-gray-600 dark:text-gray-400">{page.views.toLocaleString()}</td>
                  <td className="py-3 text-right">
                    <span className="text-green-600">{page.conversionRate}%</span>
                  </td>
                </tr>
              )) || []}
            </tbody>
          </table>
        </div>
      </div>

      {/* Blog Performance */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top Blog Posts</h3>
        <div className="space-y-3">
          {data?.topBlogs?.map((blog, index) => (
            <div key={blog.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 dark:text-white">{blog.title}</h4>
                <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
                  <span className="flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    {blog.views}
                  </span>
                  <span className="flex items-center">
                    <Heart className="w-4 h-4 mr-1" />
                    {blog.engagement}%
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-lg font-semibold text-gray-900 dark:text-white">{blog.views}</span>
                <p className="text-sm text-gray-600 dark:text-gray-400">views</p>
              </div>
            </div>
          )) || []}
        </div>
      </div>
    </div>
  );
};

// Lead Analytics Component
const LeadAnalytics = ({ data, leads }) => {
  return (
    <div className="space-y-6">
      {/* Lead Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Leads</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{data?.totalLeads || 0}</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">New This Week</p>
              <p className="text-2xl font-bold text-green-600">{data?.newLeads || 0}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Conversion Rate</p>
              <p className="text-2xl font-bold text-purple-600">4.2%</p>
            </div>
            <Target className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Conversion Funnel */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Conversion Funnel</h3>
        <div className="space-y-3">
          {data?.conversionFunnel?.map((stage, index) => (
            <div key={stage.stage} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
                  index === 0 ? 'bg-blue-500' :
                  index === 1 ? 'bg-green-500' :
                  index === 2 ? 'bg-yellow-500' :
                  index === 3 ? 'bg-orange-500' :
                  index === 4 ? 'bg-red-500' : 'bg-purple-500'
                }`}>
                  {index + 1}
                </div>
                <span className="text-gray-900 dark:text-white">{stage.stage}</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${stage.percentage}%` }}
                  />
                </div>
                <span className="text-gray-900 dark:text-white font-medium w-12 text-right">
                  {stage.count.toLocaleString()}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400 w-12 text-right">
                  {stage.percentage}%
                </span>
              </div>
            </div>
          )) || []}
        </div>
      </div>
    </div>
  );
};

// Real-time Analytics Component
const RealTimeAnalytics = ({ data }) => {
  return (
    <div className="space-y-6">
      {/* Real-time Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Users</p>
              <p className="text-2xl font-bold text-green-600">{data?.activeUsers || 0}</p>
            </div>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Page Views (Last Hour)</p>
              <p className="text-2xl font-bold text-blue-600">{data?.pageViews || 0}</p>
            </div>
            <Activity className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Device Breakdown</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-1">
                  <Monitor className="w-4 h-4 text-gray-600" />
                  <span className="text-sm">{data?.devices?.desktop || 0}%</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Smartphone className="w-4 h-4 text-gray-600" />
                  <span className="text-sm">{data?.devices?.mobile || 0}%</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Tablet className="w-4 h-4 text-gray-600" />
                  <span className="text-sm">{data?.devices?.tablet || 0}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Live Activity</h3>
        <div className="space-y-3">
          {data?.topPages?.map((page, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-gray-900 dark:text-white">{page}</span>
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {Math.floor(Math.random() * 10) + 1} active users
              </span>
            </div>
          )) || []}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsProCenter;
