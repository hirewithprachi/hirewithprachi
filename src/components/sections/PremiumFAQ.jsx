import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search as SearchIcon, X, HelpCircle, MessageCircle, Sparkles, ChevronDown, ChevronUp, Send, User, Mail, FileText } from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

// Premium FAQ with right-side quick question form
// items: [{ q, a }]
export default function PremiumFAQ({
  items = [],
  title = 'Frequently Asked Questions',
  subtitle = 'Ask anything. We are here to help.',
  region = null,
}) {
  const [question, setQuestion] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(null);
  const heading = region ? `${title} - ${region}` : title;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Redirect to contact page with prefilled query to avoid backend wiring
    const encoded = encodeURIComponent(question);
    window.location.href = `/contact?subject=Question&message=${encoded}`;
  };

  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return items;
    return items.filter((it) =>
      (it.q || '').toLowerCase().includes(q) || (it.a || '').toLowerCase().includes(q)
    );
  }, [items, searchQuery]);

  const highlight = (text) => {
    const q = searchQuery.trim();
    if (!q) return text;
    try {
      const regex = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'ig');
      const parts = String(text).split(regex);
      return parts.map((part, i) => (
        regex.test(part) ? (
          <mark key={i} className="bg-gradient-to-r from-yellow-200 to-orange-200 text-gray-900 rounded px-1 py-0.5 font-medium">{part}</mark>
        ) : (
          <span key={i}>{part}</span>
        )
      ));
    } catch {
      return text;
    }
  };

  return (
    <section className="relative py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-purple-200/20 to-pink-200/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, 20, 0],
            y: [0, -20, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-r from-blue-200/20 to-cyan-200/20 rounded-full blur-3xl"
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
            className="absolute top-20 right-20 w-32 h-32 border-2 border-purple-300/30 rounded-full"
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
            className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-full text-sm font-semibold mb-8 shadow-xl shadow-purple-500/25"
          >
            <HelpCircle className="w-4 h-4" />
            Got Questions?
            <HelpCircle className="w-4 h-4" />
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6"
          >
            {heading}
          </motion.h2>
          
          {subtitle && (
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
            >
              {subtitle}
            </motion.p>
          )}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Enhanced Accordion list */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {/* Enhanced Search */}
            <div className="mb-8">
              <div className="relative group">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-purple-500 transition-colors duration-300" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search questions..."
                  className="w-full rounded-2xl border border-slate-200 pl-12 pr-12 py-4 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 text-slate-700 placeholder-slate-500"
                />
                {searchQuery && (
                  <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all duration-300"
                    onClick={() => setSearchQuery('')}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="h-4 w-4" />
                  </motion.button>
                )}
              </div>
              <motion.div 
                className="mt-3 text-sm text-slate-500 flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Sparkles className="w-4 h-4" />
                {filteredItems.length} result{filteredItems.length !== 1 ? 's' : ''}
                {searchQuery ? ' found' : ''}
              </motion.div>
            </div>

            <Accordion type="single" collapsible className="w-full space-y-4">
              {filteredItems.map((faq, idx) => (
                <motion.div
                  key={`${faq.q}-${idx}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + idx * 0.1 }}
                  whileHover={{ 
                    scale: 1.02, 
                    y: -2,
                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)"
                  }}
                  className="group"
                >
                  <AccordionItem value={`item-${idx}`} className="border-none">
                    <AccordionTrigger 
                      className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl text-left data-[state=open]:bg-white/95 data-[state=open]:shadow-2xl"
                      onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
                    >
                      <div className="flex items-start gap-4 w-full">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300">
                          <HelpCircle className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-slate-900 text-lg leading-relaxed group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-600 group-hover:bg-clip-text transition-all duration-300">
                            {highlight(faq.q)}
                          </div>
                        </div>
                        <motion.div
                          animate={{ rotate: activeIndex === idx ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex-shrink-0 text-slate-400 group-hover:text-purple-500 transition-colors duration-300"
                        >
                          <ChevronDown className="w-5 h-5" />
                        </motion.div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="pt-4 text-slate-600 leading-relaxed"
                      >
                        {highlight(faq.a)}
                      </motion.div>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>

          {/* Right: Enhanced Quick Question Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="lg:sticky lg:top-8"
          >
            <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl p-8 shadow-2xl shadow-purple-500/25 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20"></div>
              <div className="relative z-10">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-white mb-6"
                >
                  <MessageCircle className="w-4 h-4" />
                  Quick Question
                </motion.div>
                
                <h3 className="text-2xl font-bold text-white mb-4">
                  Can't find what you're looking for?
                </h3>
                <p className="text-purple-100 mb-8 leading-relaxed">
                  Ask us anything! Our HR experts are here to help you with personalized answers.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Your Question
                    </label>
                    <textarea
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      placeholder="Type your question here..."
                      rows={4}
                      className="w-full rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm p-4 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/40 transition-all duration-300 resize-none"
                      required
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-white text-purple-600 font-semibold py-4 px-6 rounded-xl flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transition-all duration-300 group"
                  >
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    Send Question
                  </motion.button>
                </form>

                <div className="mt-8 pt-6 border-t border-white/20">
                  <div className="flex items-center gap-4 text-white/80">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-white">Expert Support</div>
                      <div className="text-sm text-purple-200">Get answers within 24 hours</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Enhanced Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-20 text-center"
        >
          <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-3xl p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5"></div>
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Still Have Questions?
              </h3>
              <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
                Our HR experts are ready to provide personalized guidance for your specific needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold px-8 py-4 rounded-2xl flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transition-all duration-300 text-lg"
                >
                  <MessageCircle className="w-5 h-5" />
                  Schedule Consultation
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white/10 hover:bg-white/20 text-slate-700 font-semibold px-8 py-4 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 backdrop-blur-sm border border-slate-200 text-lg"
                >
                  <FileText className="w-5 h-5" />
                  Download Resources
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


