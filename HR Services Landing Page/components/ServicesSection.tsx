import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Building2, 
  Users, 
  Rocket, 
  Laptop,
  ArrowRight,
  Shield,
  Target,
  Zap,
  Bot,
  CheckCircle
} from 'lucide-react';

export default function ServicesSection() {
  const services = [
    {
      icon: Building2,
      title: 'Government & PSU HR Services',
      subtitle: 'Specialized for Public Sector',
      description: 'Specialized HR solutions for government departments and public sector organizations with deep understanding of regulatory requirements.',
      gradient: 'from-blue-500 to-indigo-600',
      features: [
        'PSU recruitment and selection processes',
        'Government compliance and audit support',
        'Public sector performance management',
        'Training and capacity building programs',
        'Policy development for government organizations'
      ],
      organizations: 'BHEL, NTPC, Indian Railways, DRDO, Various Ministries'
    },
    {
      icon: Users,
      title: 'Corporate Headquarters HR',
      subtitle: 'Fortune 500 Expertise',
      description: 'Comprehensive HR services for multinational and large corporate headquarters with global standards and local expertise.',
      gradient: 'from-purple-500 to-pink-600',
      features: [
        'Executive recruitment and leadership hiring',
        'Global HR policy implementation',
        'Corporate governance and compliance',
        'Senior management performance systems',
        'Strategic workforce planning'
      ],
      organizations: 'Fortune 500 Companies, MNCs, Corporate Headquarters'
    },
    {
      icon: Rocket,
      title: 'Gurgaon Startup HR Services',
      subtitle: 'Agile & Scalable',
      description: 'Agile HR solutions for the dynamic startup ecosystem in Gurgaon with cost-effective and scalable approaches.',
      gradient: 'from-green-500 to-emerald-600',
      features: [
        'Rapid scaling HR support',
        'Startup-friendly policies and processes',
        'Cost-effective recruitment solutions',
        'Equity and ESOP management support',
        'Compliance for growing businesses'
      ],
      organizations: 'Tech Startups, Scale-ups, Unicorns'
    },
    {
      icon: Laptop,
      title: 'Noida IT & Tech HR',
      subtitle: 'Technology Focus',
      description: 'Specialized HR services for the IT and technology sector in Noida with deep understanding of tech talent requirements.',
      gradient: 'from-orange-500 to-red-600',
      features: [
        'Tech talent acquisition strategies',
        'IT industry compensation benchmarking',
        'Agile team management practices',
        'Remote work policy development',
        'Innovation and R&D team support'
      ],
      organizations: 'TCS, Infosys, HCL, Tech Mahindra, Microsoft, Adobe'
    }
  ];

  const whyChooseUs = [
    {
      icon: Shield,
      title: 'Government Sector Expertise',
      description: 'Specialized knowledge of PSU, government, and regulatory sector HR requirements'
    },
    {
      icon: Building2,
      title: 'Corporate Headquarters Hub',
      description: 'Experience with Fortune 500 and multinational corporate headquarters in Delhi'
    },
    {
      icon: Rocket,
      title: 'NCR Startup Ecosystem',
      description: 'Tailored HR services for the thriving startup ecosystem in Gurgaon and Noida'
    },
    {
      icon: Target,
      title: 'Delhi State Compliance',
      description: 'Expert knowledge of Delhi, Haryana, and UP state-specific labor regulations'
    },
    {
      icon: Zap,
      title: 'Multi-location Coverage',
      description: 'Seamless HR support across entire Delhi NCR including Gurgaon and Noida'
    },
    {
      icon: Users,
      title: 'Diverse Talent Pool',
      description: 'Access to Delhi NCR\'s vast and diverse professional talent network'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Bot className="h-4 w-4 mr-2" />
            AI-Powered HR Solutions
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="text-gray-900">Delhi NCR</span>
            <span className="text-gradient bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> Solutions</span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Specialized AI-Powered HR Services for Delhi NCR. Tailored HR solutions for the unique 
            requirements of government, corporate, and startup sectors across Delhi NCR with 
            intelligent automation and expert insights.
          </motion.p>
        </motion.div>

        {/* Main Services */}
        <motion.div 
          className="grid lg:grid-cols-2 gap-8 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              whileHover={{ y: -10 }}
            >
              <Card className="h-full bg-white/80 backdrop-blur-sm border-0 shadow-premium hover:shadow-glow transition-all duration-300 group overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <motion.div 
                      className={`w-16 h-16 bg-gradient-to-r ${service.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      whileHover={{ rotate: 10 }}
                    >
                      <service.icon className="h-8 w-8 text-white" />
                    </motion.div>
                    <Badge className={`bg-gradient-to-r ${service.gradient} text-white border-0`}>
                      {service.subtitle}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <motion.div 
                        key={feature}
                        className="flex items-start space-x-3 text-sm text-gray-600"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: featureIndex * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="bg-gradient-to-r from-gray-50 to-indigo-50 p-4 rounded-xl border border-indigo-100">
                    <p className="text-xs text-gray-500 mb-1">Key Organizations:</p>
                    <p className="text-sm text-gray-700 font-medium">{service.organizations}</p>
                  </div>
                  
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      className={`w-full bg-gradient-to-r ${service.gradient} text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 group`}
                    >
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Why Choose Us */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Delhi NCR Organizations Choose Our Premium AI Solutions
            </h3>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              Deep expertise across government, corporate, and startup sectors with comprehensive 
              understanding of NCR's diverse business landscape enhanced by intelligent automation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-premium transition-all duration-300 group">
                  <CardContent className="p-6 text-center">
                    <motion.div 
                      className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300"
                      whileHover={{ rotate: 10 }}
                    >
                      <item.icon className="h-8 w-8 text-white" />
                    </motion.div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}