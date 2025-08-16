import { motion } from 'motion/react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  MessageSquare,
  Calendar,
  Users,
  CheckCircle,
  Bot
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    jobTitle: '',
    phone: '',
    companySize: '',
    service: '',
    message: '',
    newsletter: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast("Thank you for your message! We'll get back to you within 2 hours.", {
        description: "Our Delhi NCR team will review your inquiry and respond promptly.",
      });
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        jobTitle: '',
        phone: '',
        companySize: '',
        service: '',
        message: '',
        newsletter: false
      });
    }, 2000);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      content: 'info@hirewithprachi.com',
      description: 'Send us an email anytime',
      gradient: 'from-blue-500 to-indigo-600'
    },
    {
      icon: Phone,
      title: 'Call Us',
      content: '+91-87408-89927',
      description: 'Mon-Fri from 9:00 AM - 6:00 PM',
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      icon: MapPin,
      title: 'Delhi NCR',
      content: 'Pan Delhi NCR Coverage',
      description: 'CP, Gurgaon, Noida & more',
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      icon: Clock,
      title: 'Response Time',
      content: 'Less than 2 hours',
      description: '24/7 support available',
      gradient: 'from-orange-500 to-red-600'
    }
  ];

  const services = [
    'Government & PSU HR Services',
    'Corporate Headquarters HR',
    'Gurgaon Startup HR Services',
    'Noida IT & Tech HR',
    'Virtual HR Services',
    'HR Consulting',
    'Remote HR Support',
    'HR Compliance',
    'All Services'
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
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
            Get In Touch
          </motion.div>

          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="text-gray-900">Ready to Transform Your </span>
            <span className="text-gradient bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Delhi NCR HR?</span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Connect with our Delhi NCR HR experts for a personalized consultation. 
            Whether you're a PSU, corporate headquarters, or growing startup, we have the right solution for you.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Let's Connect</h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Join 120+ Delhi NCR organizations who trust us for their HR excellence. 
                  From government compliance to startup scaling, we're here to help you succeed.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                  >
                    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-premium transition-all duration-300 group">
                      <CardContent className="pt-6">
                        <div className="flex items-start space-x-4">
                          <motion.div 
                            className={`bg-gradient-to-r ${info.gradient} p-3 rounded-xl shadow-lg`}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <info.icon className="h-6 w-6 text-white" />
                          </motion.div>
                          <div>
                            <h4 className="font-bold text-gray-900 mb-1">{info.title}</h4>
                            <p className="text-gray-900 font-semibold">{info.content}</p>
                            <p className="text-gray-600 text-sm">{info.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Schedule Demo Card */}
              <motion.div 
                className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white shadow-premium"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start space-x-4">
                  <Calendar className="h-8 w-8 text-white/90 mt-1" />
                  <div>
                    <h4 className="text-xl font-bold mb-2">Book Premium Delhi Consultation</h4>
                    <p className="text-white/90 mb-4 leading-relaxed">
                      Get a personalized demo of our AI-powered HR solutions tailored 
                      for Delhi NCR organizations. Free consultation with instant insights.
                    </p>
                    <motion.button 
                      className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-lg"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Schedule Free Demo
                    </motion.button>
                  </div>
                </div>
              </motion.div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '120+', label: 'Delhi NCR Clients' },
                  { value: '<2hrs', label: 'Response Time' }
                ].map((stat, index) => (
                  <motion.div 
                    key={stat.label}
                    className="bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-indigo-100 text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-2xl font-bold text-gradient bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-premium">
              <CardHeader>
                <CardTitle className="text-2xl text-center flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 mr-2 text-indigo-600" />
                  Send us a Message
                </CardTitle>
                <div className="flex justify-center space-x-2">
                  <Badge className="bg-green-100 text-green-700">Free Consultation</Badge>
                  <Badge className="bg-blue-100 text-blue-700">2hr Response</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        First Name *
                      </label>
                      <Input
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        placeholder="John"
                        required
                        className="transition-all duration-200 focus:scale-105 border-2 border-indigo-100 focus:border-indigo-400"
                      />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      viewport={{ once: true }}
                    >
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <Input
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        placeholder="Doe"
                        required
                        className="transition-all duration-200 focus:scale-105 border-2 border-indigo-100 focus:border-indigo-400"
                      />
                    </motion.div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email *
                      </label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="john.doe@company.com"
                        required
                        className="transition-all duration-200 focus:scale-105 border-2 border-indigo-100 focus:border-indigo-400"
                      />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone
                      </label>
                      <Input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="+91-XXXXX-XXXXX"
                        className="transition-all duration-200 focus:scale-105 border-2 border-indigo-100 focus:border-indigo-400"
                      />
                    </motion.div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Company *
                      </label>
                      <Input
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        placeholder="Acme Corp"
                        required
                        className="transition-all duration-200 focus:scale-105 border-2 border-indigo-100 focus:border-indigo-400"
                      />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Company Size
                      </label>
                      <Select onValueChange={(value) => handleInputChange('companySize', value)}>
                        <SelectTrigger className="transition-all duration-200 focus:scale-105 border-2 border-indigo-100">
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-10">1-10 employees</SelectItem>
                          <SelectItem value="11-50">11-50 employees</SelectItem>
                          <SelectItem value="51-200">51-200 employees</SelectItem>
                          <SelectItem value="201-1000">201-1000 employees</SelectItem>
                          <SelectItem value="1000+">1000+ employees</SelectItem>
                        </SelectContent>
                      </Select>
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Service Interested In
                    </label>
                    <Select onValueChange={(value) => handleInputChange('service', value)}>
                      <SelectTrigger className="transition-all duration-200 focus:scale-105 border-2 border-indigo-100">
                        <SelectValue placeholder="Select service" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service} value={service.toLowerCase().replace(/\s+/g, '-')}>
                            {service}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    viewport={{ once: true }}
                  >
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Message *
                    </label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Tell us about your HR challenges and how we can help your Delhi NCR organization..."
                      rows={4}
                      required
                      className="transition-all duration-200 focus:scale-105 border-2 border-indigo-100 focus:border-indigo-400"
                    />
                  </motion.div>

                  <motion.div 
                    className="flex items-center space-x-2"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    viewport={{ once: true }}
                  >
                    <Checkbox
                      id="newsletter"
                      checked={formData.newsletter}
                      onCheckedChange={(checked) => handleInputChange('newsletter', !!checked)}
                    />
                    <label htmlFor="newsletter" className="text-sm text-gray-600">
                      Subscribe to our newsletter for Delhi NCR HR insights and updates
                    </label>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                    viewport={{ once: true }}
                  >
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg group"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="mr-2"
                        >
                          <Users className="h-5 w-5" />
                        </motion.div>
                      ) : (
                        <Send className="h-5 w-5 mr-2 group-hover:translate-x-1 transition-transform" />
                      )}
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}