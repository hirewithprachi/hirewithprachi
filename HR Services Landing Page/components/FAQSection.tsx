import { motion } from 'motion/react';
import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Search, MessageSquare, Send } from 'lucide-react';

export default function FAQSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [chatQuery, setChatQuery] = useState('');

  const faqs = [
    {
      question: 'Do you have experience with government and PSU organizations?',
      answer: 'Yes, we have extensive experience working with government departments and PSU organizations across Delhi NCR. We understand the unique requirements, procurement processes, compliance needs, and operational frameworks of public sector organizations. Our team has successfully supported organizations like BHEL, NTPC, Indian Railways, DRDO, and various government ministries with specialized HR solutions tailored to their specific needs and regulatory requirements.'
    },
    {
      question: 'Can you handle HR for companies across Delhi NCR?',
      answer: 'Absolutely! We provide comprehensive HR services across the entire Delhi NCR region, including Delhi, Gurgaon, Noida, Faridabad, and Ghaziabad. Our team understands the unique business landscapes of each area - from Connaught Place\'s corporate headquarters to Gurgaon\'s tech startups and Noida\'s IT companies. We offer seamless multi-location support with local expertise in each region.'
    },
    {
      question: 'What industries do you specialize in within Delhi NCR?',
      answer: 'We specialize in multiple industries across Delhi NCR including Government & Public Sector (PSUs, ministries), Banking & Financial Services (SBI, HDFC, ICICI), Information Technology (TCS, Infosys, HCL, startups), Automotive & Manufacturing (Maruti, Hero MotoCorp), Telecommunications (Airtel, BSNL, Jio), and Consulting & Professional Services (McKinsey, Deloitte, PwC). Each industry has unique HR challenges, and we provide tailored solutions accordingly.'
    },
    {
      question: 'How do you support startup companies in Gurgaon and Noida?',
      answer: 'We offer specialized startup-friendly HR solutions designed for the unique needs of growing companies in Gurgaon and Noida. Our services include rapid scaling HR support, cost-effective recruitment solutions, startup-friendly policies and processes, equity and ESOP management support, compliance assistance for growing businesses, and flexible pricing models. We understand the fast-paced startup environment and provide agile HR solutions that scale with your growth.'
    },
    {
      question: 'What is your approach to corporate headquarters in Delhi?',
      answer: 'For corporate headquarters in Delhi, especially around Connaught Place and central business district, we provide executive-level HR services including C-suite recruitment, global HR policy implementation, corporate governance and compliance, senior management performance systems, strategic workforce planning, and multinational coordination. We understand the sophisticated requirements of Fortune 500 companies and multinational corporations operating from Delhi.'
    },
    {
      question: 'How do you handle different state compliances across NCR?',
      answer: 'Delhi NCR spans multiple states (Delhi, Haryana, Uttar Pradesh), each with different labor laws and regulations. We have specialized knowledge of state-specific compliance requirements including Delhi labor laws, Haryana state regulations, UP labor compliance, inter-state transfer policies, and multi-state payroll management. Our compliance team stays updated with changes in each state\'s regulations to ensure your organization remains fully compliant.'
    },
    {
      question: 'Do you understand the government procurement and tender processes?',
      answer: 'Yes, we have deep expertise in government procurement processes and tender procedures. Our team understands GeM (Government e-Marketplace) requirements, tender documentation processes, government approval workflows, PSU procurement guidelines, compliance requirements for government contracts, and the unique timelines and procedures involved in working with government organizations. This expertise helps us provide seamless HR services to public sector clients.'
    },
    {
      question: 'What are your response times for Delhi NCR clients?',
      answer: 'We pride ourselves on providing exceptional response times for our Delhi NCR clients. Our standard response time is less than 2 hours for all inquiries during business hours (9 AM - 6 PM). For urgent matters, we provide immediate support. We also offer 24/7 support for critical HR issues. Our local presence in Delhi NCR ensures quick response times and on-site support when needed. Premium clients receive dedicated account managers for even faster response times.'
    }
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle chat query submission
    console.log('Chat query:', chatQuery);
    setChatQuery('');
  };

  return (
    <section id="faq" className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <span className="text-gray-900">Frequently Asked Questions - </span>
            <span className="text-gradient bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Delhi NCR</span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Common questions about our HR services specifically for Delhi NCR organizations. 
            Find answers to questions about our expertise across different sectors and regions.
          </motion.p>
        </motion.div>

        {/* Search */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-4 text-lg bg-white/80 backdrop-blur-sm border-2 border-indigo-100 rounded-xl shadow-lg focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100"
            />
          </div>
          <p className="text-sm text-gray-500 mt-2 text-center">
            {filteredFaqs.length} result{filteredFaqs.length !== 1 ? 's' : ''}
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-premium rounded-2xl p-6">
            <Accordion type="single" collapsible className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <AccordionItem 
                    value={`item-${index}`} 
                    className="border-2 border-indigo-100 rounded-xl px-6 hover:bg-indigo-50/50 transition-all duration-300 hover:border-indigo-200 hover:shadow-lg"
                  >
                    <AccordionTrigger className="text-left hover:no-underline py-6 group">
                      <span className="text-lg font-semibold text-gray-900 pr-4 group-hover:text-indigo-700 transition-colors">
                        {faq.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-6">
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="text-gray-700 leading-relaxed text-base"
                      >
                        {faq.answer}
                      </motion.div>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </Card>
        </motion.div>

        {/* Chat Section */}
        <motion.div 
          className="mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Card className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-0 shadow-premium rounded-2xl p-8">
            <div className="text-center mb-6">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-90" />
              <h3 className="text-2xl font-bold mb-2">Any Question?</h3>
              <p className="text-white/90">
                You can ask anything you want to know about our services.
              </p>
            </div>
            
            <form onSubmit={handleChatSubmit} className="flex gap-4">
              <Input
                type="text"
                placeholder="Enter here"
                value={chatQuery}
                onChange={(e) => setChatQuery(e.target.value)}
                className="flex-1 bg-white/10 border-white/20 text-white placeholder-white/70 focus:bg-white/20 focus:border-white/40"
              />
              <Button 
                type="submit"
                className="bg-white text-indigo-600 hover:bg-gray-100 px-6"
              >
                <Send className="h-4 w-4 mr-2" />
                Send
              </Button>
            </form>
          </Card>
        </motion.div>

        {/* Additional Help */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <Card className="bg-white/60 backdrop-blur-sm border-2 border-indigo-100 rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Our team of HR experts is here to help. Get in touch with us for personalized 
              answers to your specific questions about our Delhi NCR HR solutions.
            </p>
            <motion.button 
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Our Delhi NCR Experts
            </motion.button>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}