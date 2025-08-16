import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Building2, 
  Banknote, 
  Laptop, 
  Car, 
  Phone,
  Briefcase,
  Shield,
  Factory,
  Zap,
  Building
} from 'lucide-react';

export default function IndustriesSection() {
  const industries = [
    {
      icon: Shield,
      name: 'Government & Public Sector',
      description: 'PSU, government departments, and regulatory bodies',
      keyOrganizations: 'BHEL, NTPC, Indian Railways, DRDO, Various Ministries',
      gradient: 'from-blue-500 to-indigo-600',
      stats: { clients: '25+', employees: '5000+' }
    },
    {
      icon: Banknote,
      name: 'Banking & Financial Services',
      description: 'Banks, NBFCs, and financial institutions headquarters',
      keyOrganizations: 'SBI, PNB, HDFC Bank, ICICI Bank, LIC, Insurance companies',
      gradient: 'from-green-500 to-emerald-600',
      stats: { clients: '30+', employees: '2500+' }
    },
    {
      icon: Laptop,
      name: 'Information Technology',
      description: 'IT services, software development, and tech startups',
      keyOrganizations: 'TCS, Infosys, HCL, Tech Mahindra, Microsoft, Adobe, Startups',
      gradient: 'from-purple-500 to-pink-600',
      stats: { clients: '40+', employees: '3000+' }
    },
    {
      icon: Car,
      name: 'Automotive & Manufacturing',
      description: 'Auto manufacturers and heavy industry',
      keyOrganizations: 'Maruti Suzuki, Hero MotoCorp, Bajaj Auto, Manufacturing units',
      gradient: 'from-orange-500 to-red-600',
      stats: { clients: '20+', employees: '1800+' }
    },
    {
      icon: Phone,
      name: 'Telecommunications',
      description: 'Telecom operators and equipment manufacturers',
      keyOrganizations: 'Airtel, BSNL, Jio, Samsung, Nokia, Telecom infrastructure',
      gradient: 'from-cyan-500 to-blue-600',
      stats: { clients: '15+', employees: '1200+' }
    },
    {
      icon: Briefcase,
      name: 'Consulting & Professional Services',
      description: 'Management consulting and professional service firms',
      keyOrganizations: 'McKinsey, BCG, Deloitte, PwC, EY, KPMG, Law firms',
      gradient: 'from-violet-500 to-purple-600',
      stats: { clients: '35+', employees: '2200+' }
    }
  ];

  const delhiSpecialties = [
    {
      area: 'Connaught Place',
      focus: 'Corporate Headquarters',
      description: 'Fortune 500 companies and MNC headquarters',
      color: 'from-blue-600 to-indigo-600'
    },
    {
      area: 'Gurgaon',
      focus: 'Tech & Startups',
      description: 'Technology companies and unicorn startups',
      color: 'from-purple-600 to-pink-600'
    },
    {
      area: 'Noida',
      focus: 'IT & Software',
      description: 'Software development and IT services',
      color: 'from-green-600 to-emerald-600'
    },
    {
      area: 'Central Delhi',
      focus: 'Government & PSU',
      description: 'Government departments and public sector',
      color: 'from-orange-600 to-red-600'
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
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section id="industries" className="py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="text-gray-900">Industries We Serve in </span>
            <span className="text-gradient bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Delhi NCR</span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Sector-specific HR expertise across Delhi NCR's major industries and business centers 
            with deep understanding of each sector's unique requirements.
          </motion.p>
        </motion.div>

        {/* Industries Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {industries.map((industry, index) => (
            <motion.div
              key={industry.name}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <Card className="h-full bg-white/80 backdrop-blur-sm border-0 shadow-premium hover:shadow-glow transition-all duration-300 group overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <motion.div 
                      className={`w-16 h-16 bg-gradient-to-r ${industry.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      whileHover={{ rotate: 10 }}
                    >
                      <industry.icon className="h-8 w-8 text-white" />
                    </motion.div>
                    <div className="flex space-x-2">
                      <Badge className="bg-white/50 text-gray-700 text-xs">
                        {industry.stats.clients}
                      </Badge>
                      <Badge className="bg-white/50 text-gray-700 text-xs">
                        {industry.stats.employees}
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="text-xl text-gray-900">{industry.name}</CardTitle>
                  <p className="text-gray-600 text-sm leading-relaxed">{industry.description}</p>
                </CardHeader>
                <CardContent>
                  <div className={`bg-gradient-to-r ${industry.gradient} bg-opacity-10 p-4 rounded-xl border border-opacity-20`}>
                    <p className="text-xs text-gray-500 mb-2">Key Organizations:</p>
                    <p className="text-sm text-gray-800 font-medium leading-relaxed">{industry.keyOrganizations}</p>
                  </div>
                </CardContent>
                
                {/* Hover effect overlay */}
                <motion.div 
                  className={`absolute inset-0 bg-gradient-to-br ${industry.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.05 }}
                />
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Delhi NCR Specialties */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Delhi NCR Regional Expertise
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Specialized knowledge across different areas of Delhi NCR, understanding the unique 
              business landscapes and requirements of each region.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {delhiSpecialties.map((specialty, index) => (
              <motion.div
                key={specialty.area}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-premium transition-all duration-300 group">
                  <CardContent className="p-6 text-center">
                    <motion.div 
                      className={`w-full h-2 bg-gradient-to-r ${specialty.color} rounded-full mb-6 group-hover:h-3 transition-all duration-300`}
                    />
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{specialty.area}</h4>
                    <Badge className={`bg-gradient-to-r ${specialty.color} text-white mb-3`}>
                      {specialty.focus}
                    </Badge>
                    <p className="text-gray-600 text-sm leading-relaxed">{specialty.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div 
            className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-8 text-center text-white shadow-premium"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
          >
            <Building className="h-16 w-16 mx-auto mb-6 opacity-80" />
            <h3 className="text-2xl font-bold mb-4">Don't See Your Industry?</h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto leading-relaxed">
              We work with organizations across all sectors in Delhi NCR. Our flexible HR solutions 
              can be customized to meet the specific needs of your industry and business requirements.
            </p>
            <motion.button 
              className="bg-white text-indigo-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Our Experts Today
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}