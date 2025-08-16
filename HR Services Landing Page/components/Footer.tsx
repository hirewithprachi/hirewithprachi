import { motion } from 'motion/react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram,
  ArrowUp,
  ArrowRight,
  Briefcase,
  Users,
  Shield,
  Zap
} from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cities = [
    'Hyderabad', 'Bangalore', 'Mumbai', 'Pune', 'Chennai', 'Kolkata',
    'Ahmedabad', 'Jaipur', 'Lucknow', 'Indore', 'Nagpur', 'Coimbatore', 'Bhubaneswar'
  ];

  const services = [
    'Virtual HR Services',
    'HR Consulting', 
    'Remote HR Support',
    'HR Compliance',
    'Startup HR Solutions',
    'SME HR Services',
    'Virtual HR Agency',
    'HR Prachi Shrivastava',
    'Policy Development',
    'Employee Engagement',
    'Recruitment Support',
    'HR Strategy'
  ];

  const companyLinks = [
    'About Prachi',
    'HR Services',
    'Client Success',
    'HR Resources',
    'Blog & Insights',
    'Contact Us'
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
      </div>
      
      {/* Scrolling Services Banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-4 overflow-hidden">
        <motion.div 
          className="flex space-x-8 whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
          {[...services, ...services].map((service, index) => (
            <div key={index} className="flex items-center space-x-2 text-white/90">
              <Briefcase className="h-4 w-4" />
              <span className="font-medium">{service}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="flex items-center space-x-3 mb-6"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                P
              </div>
              <div>
                <h3 className="text-2xl font-bold">Prachi Shrivastava</h3>
                <p className="text-indigo-300 font-medium">Virtual HR Consultant</p>
              </div>
            </motion.div>
            
            <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
              Expert virtual HR services for startups and SMEs. Transform your business with 
              professional HR solutions, compliance expertise, and strategic HR planning.
            </p>
            
            <div className="space-y-3 mb-6">
              <motion.div 
                className="flex items-center space-x-3 text-gray-300"
                whileHover={{ x: 5, color: '#fff' }}
                transition={{ duration: 0.2 }}
              >
                <Mail className="h-5 w-5 text-indigo-400" />
                <span>info@hirewithprachi.com</span>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-3 text-gray-300"
                whileHover={{ x: 5, color: '#fff' }}
                transition={{ duration: 0.2 }}
              >
                <Phone className="h-5 w-5 text-indigo-400" />
                <span>+91 87408 89927</span>
              </motion.div>
            </div>

            <div className="flex space-x-4">
              {[
                { icon: Facebook, label: 'Facebook' },
                { icon: Twitter, label: 'Twitter' },
                { icon: Linkedin, label: 'LinkedIn' },
                { icon: Instagram, label: 'Instagram' }
              ].map((social, index) => (
                <motion.a
                  key={social.label}
                  href="#"
                  className="bg-white/10 p-3 rounded-lg text-white hover:bg-indigo-500 hover:text-white transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Services */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="font-bold text-xl mb-6 flex items-center">
              <Users className="h-5 w-5 mr-2 text-indigo-400" />
              Services
            </h4>
            <ul className="space-y-3">
              {['Virtual HR Services', 'HR Consulting', 'Remote HR Support', 'HR Compliance', 'Policy Development', 'Startup HR Solutions'].map((service, index) => (
                <motion.li key={service}>
                  <motion.a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors text-sm flex items-center group"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 5 }}
                  >
                    <ArrowRight className="h-3 w-3 mr-2 text-indigo-400 group-hover:translate-x-1 transition-transform" />
                    {service}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="font-bold text-xl mb-6 flex items-center">
              <Shield className="h-5 w-5 mr-2 text-indigo-400" />
              Company
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link, index) => (
                <motion.li key={link}>
                  <motion.a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors text-sm flex items-center group"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 5 }}
                  >
                    <ArrowRight className="h-3 w-3 mr-2 text-indigo-400 group-hover:translate-x-1 transition-transform" />
                    {link}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Newsletter Section */}
        <motion.div 
          className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 backdrop-blur-sm rounded-2xl p-8 mb-12 text-center border border-white/10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Zap className="h-12 w-12 mx-auto mb-4 text-indigo-400" />
          <h4 className="text-2xl font-bold text-white mb-2">Get Free HR Resources</h4>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Subscribe to receive the latest HR insights, compliance updates, and exclusive resources 
            for Delhi NCR organizations delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Your email"
              className="flex-1 bg-white/10 border-white/20 text-white placeholder-gray-400 focus:bg-white/20 focus:border-indigo-400"
            />
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 hover:from-indigo-700 hover:to-purple-700">
                Subscribe
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Cities Section */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h4 className="text-xl font-bold text-center mb-6">Explore HR Services in Other Cities</h4>
          <div className="flex flex-wrap justify-center gap-4">
            {cities.map((city, index) => (
              <motion.a
                key={city}
                href="#"
                className="bg-white/10 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg transition-all text-sm font-medium border border-white/20 hover:border-indigo-400"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {city} →
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Bottom Footer */}
        <div className="border-t border-white/20 pt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <motion.p 
            className="text-gray-400 text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            © 2024 Prachi Shrivastava. All rights reserved. Virtual HR Consultant & Agency.
          </motion.p>
          
          <div className="flex items-center space-x-6">
            <motion.a
              href="#"
              className="text-gray-400 hover:text-white text-sm transition-colors"
              whileHover={{ y: -2 }}
            >
              Privacy Policy
            </motion.a>
            <motion.a
              href="#"
              className="text-gray-400 hover:text-white text-sm transition-colors"
              whileHover={{ y: -2 }}
            >
              Terms of Service
            </motion.a>
            <motion.a
              href="#"
              className="text-gray-400 hover:text-white text-sm transition-colors"
              whileHover={{ y: -2 }}
            >
              Cookie Policy
            </motion.a>
            <motion.button
              onClick={scrollToTop}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-colors shadow-lg"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Scroll to top"
            >
              <ArrowUp className="h-4 w-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}