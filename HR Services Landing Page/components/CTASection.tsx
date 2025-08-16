import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArrowRight, Sparkles, Zap, Target, MapPin, Users, Award } from 'lucide-react';

export default function CTASection() {
  const benefits = [
    { icon: Zap, text: 'Free HR consultation', color: 'text-yellow-400' },
    { icon: Target, text: 'Delhi NCR expertise', color: 'text-green-400' },
    { icon: Sparkles, text: 'Premium AI solutions', color: 'text-purple-400' }
  ];

  const stats = [
    { value: '120+', label: 'Delhi NCR Organizations' },
    { value: '25+', label: 'PSU Partnerships' },
    { value: '4.9/5', label: 'Client Satisfaction' },
    { value: '<2hrs', label: 'Response Time' }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full mix-blend-overlay filter blur-3xl animate-float"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-300/20 rounded-full mix-blend-overlay filter blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-300/20 rounded-full mix-blend-overlay filter blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <MapPin className="h-4 w-4 mr-2" />
            Delhi NCR Premium HR Excellence
          </motion.div>

          <motion.h2 
            className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Ready to Transform HR for Your
            <br />
            <motion.span 
              className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Delhi NCR Organization?
            </motion.span>
          </motion.h2>

          <motion.p 
            className="text-xl text-white/90 max-w-4xl mx-auto mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Join 120+ organizations across government, corporate, and startup sectors in Delhi NCR 
            who trust us for their <strong>AI-powered HR excellence</strong> with intelligent automation. 
            From PSU compliance to startup scaling, we've got you covered.
          </motion.p>

          <motion.div 
            className="flex flex-wrap justify-center gap-8 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            {benefits.map((benefit, index) => (
              <motion.div 
                key={benefit.text}
                className="flex items-center space-x-3 text-white/90"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <benefit.icon className={`h-6 w-6 ${benefit.color}`} />
                <span className="font-medium text-lg">{benefit.text}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            viewport={{ once: true }}
          >
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              className="relative group"
            >
              <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100 px-10 py-4 text-xl font-semibold shadow-xl relative z-10">
                <div className="flex items-center">
                  Book Premium Delhi Consultation
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </div>
              </Button>
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-lg opacity-0 group-hover:opacity-70 transition-opacity blur-sm"></div>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-white text-white hover:bg-white hover:text-indigo-600 px-10 py-4 text-xl font-semibold backdrop-blur-sm"
              >
                Delhi NCR HR Guide
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-white/80 text-sm font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Floating Elements */}
        <motion.div 
          className="absolute top-20 left-10 text-white/20"
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 10, 0]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          <Users className="h-16 w-16" />
        </motion.div>

        <motion.div 
          className="absolute top-32 right-10 text-white/20"
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -10, 0]
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 2
          }}
        >
          <Award className="h-16 w-16" />
        </motion.div>

        <motion.div 
          className="absolute bottom-20 left-1/4 text-white/20"
          animate={{ 
            y: [0, -15, 0],
            x: [0, 10, 0]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1
          }}
        >
          <Sparkles className="h-12 w-12" />
        </motion.div>

        <motion.div 
          className="absolute bottom-32 right-1/4 text-white/20"
          animate={{ 
            y: [0, 15, 0],
            x: [0, -10, 0]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 3
          }}
        >
          <MapPin className="h-12 w-12" />
        </motion.div>
      </div>
    </section>
  );
}