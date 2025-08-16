import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArrowRight, Users, Star, Clock, Shield, MapPin, Award, TrendingUp, CheckCircle } from 'lucide-react';

export default function HeroSection() {
  const stats = [
    { icon: Users, value: '150+', label: 'Premium Clients', color: 'from-blue-500 to-cyan-500' },
    { icon: Award, value: '20+', label: 'Industries Served', color: 'from-purple-500 to-pink-500' },
    { icon: Star, value: '4.9/5', label: 'Client Rating', color: 'from-yellow-500 to-orange-500' },
    { icon: Clock, value: '<2hrs', label: 'Response Time', color: 'from-green-500 to-emerald-500' }
  ];

  const certifications = [
    { icon: Shield, label: 'ISO Certified' },
    { icon: Shield, label: 'Data Secure' },
    { icon: Clock, label: '24/7 Support' },
    { icon: MapPin, label: 'CP Expertise' }
  ];

  const locations = [
    { 
      title: 'Corporate Hub Specialists',
      subtitle: 'CP Expertise',
      description: 'Connaught Place corporate specialists'
    },
    { 
      title: 'Gurgaon Tech Hub',
      subtitle: 'Tech Focus',
      description: 'Technology industry focus'
    },
    { 
      title: 'Startup Growth',
      subtitle: 'NCR Ecosystem',
      description: 'NCR startup ecosystem support'
    },
    { 
      title: 'Compliance Expert',
      subtitle: 'Delhi Regulations',
      description: 'Delhi regulatory compliance'
    }
  ];

  return (
    <section id="home" className="relative min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="absolute inset-0">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Premium Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Badge className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 text-sm font-medium">
                <MapPin className="h-4 w-4 mr-2" />
                Delhi NCR • Premium HR Excellence
              </Badge>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="text-gray-900">Premium</span>
                <br />
                <motion.span 
                  className="text-gradient bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  HR Excellence
                </motion.span>
                <br />
                <span className="text-gray-900">in Delhi</span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p 
              className="text-xl text-gray-700 leading-relaxed max-w-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Elevate your business with sophisticated HR solutions. From Connaught Place's 
              corporate hub to Gurgaon's tech district, we deliver premium HR services that 
              align with Delhi NCR's dynamic business landscape.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg px-8 py-4 text-lg group">
                  Schedule Consultation
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="lg" className="border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-8 py-4 text-lg">
                  Download Brochure
                </Button>
              </motion.div>
            </motion.div>

            {/* Certifications */}
            <motion.div 
              className="flex flex-wrap gap-4 pt-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              {certifications.map((cert, index) => (
                <motion.div 
                  key={cert.label}
                  className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-3 py-2 rounded-full border border-indigo-100 shadow-sm"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                  whileHover={{ scale: 1.05, backgroundColor: 'rgb(238 242 255)' }}
                >
                  <cert.icon className="h-4 w-4 text-indigo-600" />
                  <span className="text-sm font-medium text-gray-700">{cert.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - Stats & Visual */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          >
            {/* Main Stats Card */}
            <motion.div 
              className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-premium border border-white/50"
              whileHover={{ scale: 1.02, rotateY: 5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-2 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <motion.div 
                    key={stat.label}
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mb-3 mx-auto shadow-lg`}>
                      <stat.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Location Specialties */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Delhi NCR Expertise</h3>
                {locations.map((location, index) => (
                  <motion.div 
                    key={location.title}
                    className="flex items-center space-x-3 p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    whileHover={{ scale: 1.02, backgroundColor: 'rgb(224 231 255)' }}
                  >
                    <div className="w-3 h-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"></div>
                    <div>
                      <div className="font-medium text-gray-900 text-sm">{location.subtitle}</div>
                      <div className="text-xs text-gray-600">{location.description}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Floating Elements */}
            <motion.div 
              className="absolute -top-6 -right-6 bg-gradient-to-r from-yellow-400 to-orange-400 text-white p-4 rounded-xl shadow-lg"
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              <TrendingUp className="h-6 w-6" />
            </motion.div>

            <motion.div 
              className="absolute -bottom-6 -left-6 bg-gradient-to-r from-green-400 to-emerald-400 text-white p-4 rounded-xl shadow-lg"
              animate={{ 
                y: [0, 10, 0],
                rotate: [0, -5, 0]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 1
              }}
            >
              <CheckCircle className="h-6 w-6" />
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Stats */}
        <motion.div 
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          {[
            { value: '120+', label: 'Delhi NCR Clients' },
            { value: '25+', label: 'PSU Organizations' },
            { value: '8000+', label: 'Employees Managed' },
            { value: '99.9%', label: 'Compliance Record' }
          ].map((item, index) => (
            <motion.div 
              key={item.label}
              className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-white/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.8)' }}
            >
              <div className="text-2xl md:text-3xl font-bold text-gradient bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{item.value}</div>
              <div className="text-sm text-gray-600 mt-1">{item.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}