import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, FolderOpen, GraduationCap, MessageCircle, Code2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { 
      name: 'Home', 
      path: '/', 
      icon: Home,
      color: 'cyan',
      description: 'Overview & Skills'
    },
    { 
      name: 'Projects', 
      path: '/projects', 
      icon: FolderOpen,
      color: 'green',
      description: 'Portfolio & Work'
    },
    { 
      name: 'Education', 
      path: '/education', 
      icon: GraduationCap,
      color: 'purple',
      description: 'Learning & Growth'
    },
    { 
      name: 'Connect', 
      path: '/connect', 
      icon: MessageCircle,
      color: 'orange',
      description: 'Get In Touch'
    }
  ];

  const isActive = (path) => location.pathname === path;

  const getColorClasses = (color, isActive) => {
    const colors = {
      cyan: isActive ? 'text-cyan-400 bg-cyan-400/20' : 'text-cyan-300/70 hover:text-cyan-400',
      green: isActive ? 'text-green-400 bg-green-400/20' : 'text-green-300/70 hover:text-green-400',
      purple: isActive ? 'text-purple-400 bg-purple-400/20' : 'text-purple-300/70 hover:text-purple-400',
      orange: isActive ? 'text-orange-400 bg-orange-400/20' : 'text-orange-300/70 hover:text-orange-400'
    };
    return colors[color];
  };

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/90 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.div 
              className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-green-400 rounded-sm flex items-center justify-center"
              whileHover={{ 
                scale: 1.1,
                rotate: 360,
                background: "linear-gradient(45deg, #06b6d4, #22c55e, #a855f7)"
              }}
              transition={{ duration: 0.3 }}
            >
              <Code2 className="w-5 h-5 text-black" />
            </motion.div>
            <motion.span 
              className="text-xl font-bold font-mono tracking-tight"
              whileHover={{ scale: 1.05 }}
            >
              YASH<span className="text-cyan-400">PATEL</span>
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className="relative group"
                >
                  <motion.div
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${getColorClasses(item.color, active)}`}
                    whileHover={{ 
                      scale: 1.05,
                      y: -2
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      animate={active ? { 
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1]
                      } : {}}
                      transition={{ 
                        duration: 0.5,
                        repeat: active ? Infinity : 0,
                        repeatDelay: 3
                      }}
                    >
                      <Icon className="w-4 h-4" />
                    </motion.div>
                    <span className="font-mono text-sm uppercase tracking-wider">{item.name}</span>
                  </motion.div>
                  
                  {/* Tooltip */}
                  <motion.div
                    className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap"
                    initial={{ opacity: 0, y: -10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                  >
                    {item.description}
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                  </motion.div>
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-white hover:text-cyan-400 transition-colors duration-200"
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 180 }}
                  exit={{ rotate: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 180 }}
                  animate={{ rotate: 0 }}
                  exit={{ rotate: 180 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden absolute top-16 left-0 right-0 bg-black/95 backdrop-blur-md border-b border-white/10"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <nav className="px-6 py-4 space-y-2">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  const active = isActive(item.path);
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        to={item.path}
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${getColorClasses(item.color, active)}`}
                      >
                        <Icon className="w-5 h-5" />
                        <div>
                          <span className="font-mono text-sm uppercase tracking-wider block">{item.name}</span>
                          <span className="text-xs text-gray-400">{item.description}</span>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;