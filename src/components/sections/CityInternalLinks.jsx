import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, Building, Users, TrendingUp, Star } from 'lucide-react';

const cities = [
  {
    name: 'Mumbai',
    slug: 'mumbai',
    description: 'Financial capital & entertainment hub',
    icon: '🏢',
    color: 'from-emerald-500 to-teal-500',
    stats: { companies: '250+', industries: '15+' }
  },
  {
    name: 'Delhi',
    slug: 'delhi',
    description: 'Government & corporate headquarters',
    icon: '🏛️',
    color: 'from-blue-500 to-indigo-500',
    stats: { companies: '200+', industries: '12+' }
  },
  {
    name: 'Bangalore',
    slug: 'bangalore',
    description: 'Tech capital & startup ecosystem',
    icon: '💻',
    color: 'from-purple-500 to-pink-500',
    stats: { companies: '180+', industries: '10+' }
  },
  {
    name: 'Hyderabad',
    slug: 'hyderabad',
    description: 'IT hub & pharmaceutical center',
    icon: '🏥',
    color: 'from-orange-500 to-red-500',
    stats: { companies: '150+', industries: '8+' }
  },
  {
    name: 'Chennai',
    slug: 'chennai',
    description: 'Manufacturing & automotive hub',
    icon: '🏭',
    color: 'from-cyan-500 to-blue-500',
    stats: { companies: '120+', industries: '9+' }
  },
  {
    name: 'Pune',
    slug: 'pune',
    description: 'Education & IT destination',
    icon: '🎓',
    color: 'from-green-500 to-emerald-500',
    stats: { companies: '100+', industries: '7+' }
  },
  {
    name: 'Kolkata',
    slug: 'kolkata',
    description: 'Cultural capital & port city',
    icon: '🎭',
    color: 'from-yellow-500 to-orange-500',
    stats: { companies: '90+', industries: '6+' }
  },
  {
    name: 'Ahmedabad',
    slug: 'ahmedabad',
    description: 'Textile & manufacturing center',
    icon: '🧵',
    color: 'from-pink-500 to-rose-500',
    stats: { companies: '80+', industries: '5+' }
  },
  {
    name: 'Jaipur',
    slug: 'jaipur',
    description: 'Tourism & heritage city',
    icon: '🏰',
    color: 'from-indigo-500 to-purple-500',
    stats: { companies: '70+', industries: '4+' }
  },
  {
    name: 'Indore',
    slug: 'indore',
    description: 'Emerging business hub',
    icon: '📈',
    color: 'from-teal-500 to-cyan-500',
    stats: { companies: '60+', industries: '4+' }
  },
  {
    name: 'Bhubaneswar',
    slug: 'bhubaneswar',
    description: 'Smart city & IT destination',
    icon: '🏙️',
    color: 'from-violet-500 to-purple-500',
    stats: { companies: '50+', industries: '3+' }
  },
  {
    name: 'Coimbatore',
    slug: 'coimbatore',
    description: 'Textile & engineering hub',
    icon: '⚙️',
    color: 'from-amber-500 to-yellow-500',
    stats: { companies: '45+', industries: '3+' }
  },
  {
    name: 'Lucknow',
    slug: 'lucknow',
    description: 'Government & cultural center',
    icon: '🎪',
    color: 'from-rose-500 to-pink-500',
    stats: { companies: '40+', industries: '3+' }
  },
  {
    name: 'Nagpur',
    slug: 'nagpur',
    description: 'Orange city & logistics hub',
    icon: '🍊',
    color: 'from-lime-500 to-green-500',
    stats: { companies: '35+', industries: '3+' }
  }
];

export default function CityInternalLinks() {
  return (
    <section className="relative py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-emerald-200/20 to-teal-200/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, 20, 0],
            y: [0, -20, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-r from-blue-200/20 to-indigo-200/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.1, 0.3],
            x: [0, -30, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        
        {/* Geometric Patterns */}
        <div className="absolute inset-0 opacity-5">
          <motion.div 
            className="absolute top-20 right-20 w-32 h-32 border-2 border-emerald-300/30 rounded-full"
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3],
              rotate: [0, 360]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-40 left-32 w-24 h-24 border-2 border-blue-300/30 rotate-45"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
              rotate: [45, 405]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-6 py-3 rounded-full text-sm font-semibold mb-8 shadow-xl shadow-emerald-500/25"
          >
            <MapPin className="w-4 h-4" />
            Nationwide HR Services
            <MapPin className="w-4 h-4" />
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6"
          >
            Explore HR Services in <span className="bg-gradient-to-r from-emerald-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">Other Cities</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
          >
            Discover our premium HR services across India's major business hubs. Each city offers specialized solutions tailored to local industry needs and business culture.
          </motion.p>
        </motion.div>

        {/* Enhanced Cities Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {cities.map((city, index) => (
            <motion.div
              key={city.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              whileHover={{ 
                scale: 1.05, 
                y: -8,
                boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)"
              }}
              className="group relative bg-white/80 backdrop-blur-sm border border-white/20 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${city.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              
              <div className="relative z-10">
                {/* City Icon */}
                <motion.div 
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${city.color} mb-4 group-hover:scale-110 transition-transform duration-300`}
                  whileHover={{ rotate: 5 }}
                >
                  <span className="text-2xl">{city.icon}</span>
                </motion.div>

                {/* City Info */}
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-emerald-600 group-hover:to-blue-600 group-hover:bg-clip-text transition-all duration-300">
                  {city.name}
                </h3>
                
                <p className="text-slate-600 mb-4 text-sm group-hover:text-slate-700 transition-colors duration-300">
                  {city.description}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Building className="w-3 h-3" />
                    <span>{city.stats.companies} Companies</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <TrendingUp className="w-3 h-3" />
                    <span>{city.stats.industries} Industries</span>
                  </div>
                </div>

                {/* CTA Button */}
                <Link
                  to={`/hr-services-${city.slug}`}
                  className={`inline-flex items-center justify-center w-full py-3 px-4 bg-gradient-to-r ${city.color} text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 group-hover:scale-105`}
                >
                  <span>Explore {city.name}</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-emerald-600 to-blue-600 rounded-3xl p-12 shadow-2xl shadow-emerald-500/25 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-blue-600/20"></div>
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Need HR Services in Your City?
              </h3>
              <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
                We provide comprehensive HR solutions across all major Indian cities. Contact us to discuss your specific requirements.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white text-emerald-600 font-semibold px-8 py-4 rounded-2xl flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transition-all duration-300 text-lg"
                >
                  <MapPin className="w-5 h-5" />
                  Find Your City
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 backdrop-blur-sm border border-white/20 text-lg"
                >
                  <Users className="w-5 h-5" />
                  Contact Us
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


