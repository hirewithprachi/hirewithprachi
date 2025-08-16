import { motion } from 'motion/react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Menu, X, Home, Users, Zap, BookOpen, PenTool, Phone, Bot } from 'lucide-react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '#home', icon: Home },
    { name: 'About Us', href: '#about', icon: Users },
    { name: 'Services', href: '#services', icon: Zap },
    { name: 'Resources', href: '#resources', icon: BookOpen },
    { name: 'Blog', href: '#blog', icon: PenTool },
    { name: 'Contact Us', href: '#contact', icon: Phone },
  ];

  return (
    <>
      {/* Top Bar */}
      <motion.div 
        className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-2 text-sm"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center space-x-6">
              <motion.div 
                className="flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
              >
                <Bot className="h-4 w-4" />
                <span>HR Assistant</span>
              </motion.div>
              <div className="hidden md:flex items-center space-x-6 text-white/90">
                <span>+91-87408-89927</span>
                <span>info@hirewithprachi.com</span>
                <span>Mon - Fri: 9:00 AM - 6:00 PM</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-white/90">Follow us:</span>
              <div className="flex space-x-2">
                {['Facebook', 'Twitter', 'LinkedIn'].map((social) => (
                  <motion.a
                    key={social}
                    href="#"
                    className="hover:text-yellow-300 transition-colors"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {social.charAt(0)}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Navigation */}
      <motion.nav 
        className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-indigo-100"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                P
              </div>
              <div>
                <h1 className="text-xl font-bold text-gradient">Hire With Prachi</h1>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="text-xs bg-indigo-50 text-indigo-700 border-indigo-200">
                    Delhi NCR
                  </Badge>
                  <Badge variant="secondary" className="text-xs bg-purple-50 text-purple-700 border-purple-200">
                    Premium
                  </Badge>
                </div>
              </div>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-8">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 transition-colors font-medium"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ y: -2 }}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </motion.a>
                ))}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.7 }}
                >
                  <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg">
                    Get Started
                  </Button>
                </motion.div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-700"
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          <motion.div 
            className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? 'auto' : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-md border-t border-indigo-100">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </a>
              ))}
              <div className="px-3 py-2">
                <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                  Get Started
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.nav>
    </>
  );
}