import { motion } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Target, 
  Heart, 
  Lightbulb, 
  Users, 
  Award,
  TrendingUp,
  Shield,
  CheckCircle,
  Building2,
  Rocket
} from 'lucide-react';

export default function AboutSection() {
  const stats = [
    { icon: Users, value: '120+', label: 'Delhi NCR Clients', color: 'from-blue-500 to-indigo-600' },
    { icon: Award, value: '99.9%', label: 'Compliance Rate', color: 'from-green-500 to-emerald-600' },
    { icon: TrendingUp, value: '25+', label: 'PSU Organizations', color: 'from-purple-500 to-pink-600' },
    { icon: Shield, value: '4.9/5', label: 'Client Rating', color: 'from-orange-500 to-red-600' }
  ];

  const values = [
    {
      icon: Heart,
      title: 'People First',
      description: 'We believe that putting people at the center of everything we do drives success and creates positive workplace cultures in Delhi NCR organizations.',
      gradient: 'from-pink-500 to-rose-600'
    },
    {
      icon: Lightbulb,
      title: 'AI Innovation',
      description: 'We continuously evolve our solutions using cutting-edge AI technology to solve modern HR challenges specific to Delhi NCR businesses.',
      gradient: 'from-yellow-500 to-orange-600'
    },
    {
      icon: Target,
      title: 'Delhi NCR Excellence',
      description: 'We are committed to delivering exceptional service that exceeds expectations across government, corporate, and startup sectors.',
      gradient: 'from-indigo-500 to-purple-600'
    },
    {
      icon: Users,
      title: 'Strategic Partnership',
      description: 'We work as trusted partners with our Delhi NCR clients, building lasting relationships based on mutual success and growth.',
      gradient: 'from-emerald-500 to-teal-600'
    }
  ];

  const teamMembers = [
    {
      name: 'Prachi Shrivastava',
      role: 'Founder & Virtual HR Consultant',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b765?w=400&h=400&fit=crop&crop=face',
      description: '10+ years Delhi NCR HR expertise',
      specialization: 'Government & PSU Relations'
    },
    {
      name: 'Delhi Team Lead',
      role: 'Corporate Relations Manager',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      description: 'Fortune 500 experience',
      specialization: 'Corporate Headquarters'
    },
    {
      name: 'Gurgaon Specialist',
      role: 'Startup HR Consultant',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
      description: 'Startup scaling expert',
      specialization: 'Tech & Startups'
    },
    {
      name: 'Noida Expert',
      role: 'IT Sector Specialist',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      description: 'IT industry focus',
      specialization: 'Technology Sector'
    }
  ];

  const achievements = [
    { icon: Building2, title: '25+ PSU Organizations', description: 'Successfully partnered with' },
    { icon: Users, title: '8000+ Employees', description: 'Managed across Delhi NCR' },
    { icon: Award, title: 'ISO Certified', description: 'Quality & compliance standards' },
    { icon: Shield, title: '99.9% Compliance', description: 'Perfect regulatory record' }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-gray-50 via-indigo-50 to-purple-50">
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
            <span className="text-gray-900">About </span>
            <span className="text-gradient bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Prachi Shrivastava</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Virtual HR Consultant specializing in Delhi NCR organizations. Expert virtual HR services 
            for startups and SMEs with professional solutions, compliance expertise, and strategic HR planning.
          </motion.p>
        </motion.div>

        {/* Company Story */}
        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <Badge className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 py-1">
                Virtual HR Expert
              </Badge>
              <Badge className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-3 py-1">
                Delhi NCR Specialist
              </Badge>
            </div>
            
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h3>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Founded with a vision to revolutionize human resources in Delhi NCR, we combine 
                deep local expertise with innovative virtual HR solutions. From understanding 
                PSU compliance requirements to scaling startup teams, we know Delhi NCR inside out.
              </p>
              <p>
                Our journey began with recognizing the unique challenges faced by organizations 
                across Delhi NCR - from government sector complexities in Central Delhi to tech 
                startup dynamics in Gurgaon and corporate headquarters demands in Connaught Place.
              </p>
              <p>
                Today, we're proud to be the trusted HR partner for 120+ organizations across 
                government, corporate, and startup sectors, delivering AI-powered solutions that 
                are both sophisticated and personal.
              </p>
            </div>
            
            <motion.div 
              className="mt-8 grid grid-cols-2 gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              {achievements.map((achievement, index) => (
                <motion.div 
                  key={achievement.title}
                  className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-indigo-100 text-center"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <achievement.icon className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
                  <div className="font-bold text-gray-900 text-sm">{achievement.title}</div>
                  <div className="text-xs text-gray-600">{achievement.description}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-br from-indigo-600/10 to-purple-600/10 rounded-3xl p-8 backdrop-blur-sm border border-indigo-100">
              <div className="grid grid-cols-2 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <motion.div 
                    key={stat.label}
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mb-3 mx-auto shadow-lg`}>
                      <stat.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
              
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/50">
                <h4 className="font-bold text-gray-900 mb-4 text-center">Why Choose Virtual HR?</h4>
                <div className="space-y-3">
                  {[
                    'Cost-effective solutions for growing businesses',
                    'Expert knowledge without full-time overhead',
                    'Scalable support that grows with your needs',
                    'Deep Delhi NCR market understanding'
                  ].map((benefit, index) => (
                    <motion.div 
                      key={benefit}
                      className="flex items-center space-x-2 text-sm text-gray-700"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Values */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Core Values</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <Card className="h-full text-center bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-premium transition-all duration-300 group">
                  <CardContent className="pt-8">
                    <motion.div 
                      className={`w-16 h-16 bg-gradient-to-r ${value.gradient} rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      whileHover={{ rotate: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <value.icon className="h-8 w-8 text-white" />
                    </motion.div>
                    <h4 className="text-lg font-bold text-gray-900 mb-3">{value.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">Meet Our Delhi NCR Team</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <Card className="text-center bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-premium transition-all duration-300 overflow-hidden group">
                  <CardContent className="pt-8">
                    <motion.div 
                      className="relative w-24 h-24 mx-auto mb-4"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ImageWithFallback
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg"
                      />
                    </motion.div>
                    <h4 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h4>
                    <p className="text-indigo-600 text-sm font-medium mb-2">{member.role}</p>
                    <p className="text-gray-600 text-sm mb-2">{member.description}</p>
                    <Badge className="bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 text-xs">
                      {member.specialization}
                    </Badge>
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