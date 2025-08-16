import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  Target, 
  Zap, 
  Shield, 
  Star,
  ArrowRight,
  CheckCircle,
  Play,
  Download,
  Mail,
  Phone
} from 'lucide-react';

// Floating Card Component
export const FloatingCard = ({ children, delay = 0, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -10, scale: 1.02 }}
      className={`ai-card ${className}`}
    >
      {children}
    </motion.div>
  );
};

// Animated Stat Component
export const AnimatedStat = ({ icon: Icon, value, label, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.05 }}
      className="ai-stat"
    >
      <div className="flex items-center justify-center mb-3">
        <Icon className="w-8 h-8 text-blue-500" />
      </div>
      <div className="text-3xl font-bold text-gradient-ai mb-2">
        {value}
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-300">
        {label}
      </div>
    </motion.div>
  );
};

// AI-Era Button Component
export const AIEraButton = ({ 
  children, 
  variant = "primary", 
  size = "md", 
  icon: Icon,
  className = "",
  ...props 
}) => {
  const baseClasses = "ai-button font-semibold transition-all duration-300 flex items-center justify-center gap-2";
  
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  const variantClasses = {
    primary: "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700",
    secondary: "bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600",
    outline: "bg-transparent border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-5 h-5" />}
      {children}
    </motion.button>
  );
};

// Service Card Component
export const ServiceCard = ({ 
  icon: Icon, 
  title, 
  description, 
  features = [], 
  delay = 0 
}) => {
  return (
    <FloatingCard delay={delay} className="h-full">
      <div className="flex items-center mb-4">
        <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl mr-4">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">
          {title}
        </h3>
      </div>
      
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        {description}
      </p>
      
      {features.length > 0 && (
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
      )}
    </FloatingCard>
  );
};

// Hero Badge Component
export const HeroBadge = ({ children, variant = "primary" }) => {
  const variantClasses = {
    primary: "bg-gradient-to-r from-blue-500 to-purple-600 text-white",
    secondary: "bg-gradient-to-r from-pink-500 to-red-500 text-white",
    outline: "bg-transparent border-2 border-blue-500 text-blue-500"
  };

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${variantClasses[variant]} animate-pulse-glow`}
    >
      <TrendingUp className="w-4 h-4 mr-2" />
      {children}
    </motion.span>
  );
};

// Testimonial Card Component
export const TestimonialCard = ({ 
  name, 
  role, 
  company, 
  content, 
  rating = 5, 
  avatar,
  delay = 0 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="ai-card p-6"
    >
      <div className="flex items-center mb-4">
        <div className="flex items-center">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
          ))}
        </div>
      </div>
      
      <p className="text-gray-600 dark:text-gray-300 mb-4 italic">
        "{content}"
      </p>
      
      <div className="flex items-center">
        {avatar && (
          <img 
            src={avatar} 
            alt={name} 
            className="w-12 h-12 rounded-full mr-4 object-cover"
          />
        )}
        <div>
          <div className="font-semibold text-gray-800 dark:text-white">
            {name}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {role} at {company}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Feature Grid Component
export const FeatureGrid = ({ features = [] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ y: -5 }}
          className="ai-card p-6 text-center"
        >
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <feature.icon className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
            {feature.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            {feature.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

// CTA Section Component
export const CTASection = ({ 
  title, 
  subtitle, 
  primaryAction, 
  secondaryAction,
  background = "gradient" 
}) => {
  const bgClasses = {
    gradient: "ai-hero-bg",
    glass: "glass-effect",
    solid: "bg-gray-900"
  };

  return (
    <section className={`${bgClasses[background]} py-16 px-4`}>
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-white mb-6"
        >
          {title}
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-gray-200 mb-8"
        >
          {subtitle}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          {primaryAction && (
            <AIEraButton
              variant="primary"
              size="lg"
              icon={primaryAction.icon}
              onClick={primaryAction.onClick}
            >
              {primaryAction.text}
            </AIEraButton>
          )}
          
          {secondaryAction && (
            <AIEraButton
              variant="outline"
              size="lg"
              icon={secondaryAction.icon}
              onClick={secondaryAction.onClick}
            >
              {secondaryAction.text}
            </AIEraButton>
          )}
        </motion.div>
      </div>
    </section>
  );
};

// Contact Info Component
export const ContactInfo = () => {
  const contactMethods = [
    {
      icon: Phone,
      title: "Call Us",
      value: "+91-8740889927",
      action: "tel:+918740889927"
    },
    {
      icon: Mail,
      title: "Email Us",
      value: "info@hirewithprachi.com",
      action: "mailto:info@hirewithprachi.com"
    },
    {
      icon: Download,
      title: "Download Brochure",
      value: "Get our services brochure",
      action: "#"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {contactMethods.map((method, index) => (
        <motion.a
          key={index}
          href={method.action}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ y: -5 }}
          className="ai-card p-6 text-center group"
        >
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <method.icon className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
            {method.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            {method.value}
          </p>
        </motion.a>
      ))}
    </div>
  );
}; 