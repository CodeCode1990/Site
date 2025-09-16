import React, { createContext, useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { Home, FolderOpen, GraduationCap, MessageCircle } from 'lucide-react';

const TransitionContext = createContext();

export const TransitionProvider = ({ children }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionIcon, setTransitionIcon] = useState(null);
  
  const triggerTransition = (iconComponent, color) => {
    setTransitionIcon({ icon: iconComponent, color });
    setIsTransitioning(true);
    
    setTimeout(() => {
      setIsTransitioning(false);
      setTransitionIcon(null);
    }, 800);
  };

  return (
    <TransitionContext.Provider value={{ triggerTransition, isTransitioning }}>
      {children}
      <TransitionOverlay icon={transitionIcon} isActive={isTransitioning} />
    </TransitionContext.Provider>
  );
};

const TransitionOverlay = ({ icon, isActive }) => {
  if (!icon) return null;

  const IconComponent = icon.icon;
  
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Background overlay */}
          <motion.div
            className="absolute inset-0 bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Icon explosion effect */}
          <motion.div
            className="relative z-10"
            initial={{ scale: 0, rotate: 0 }}
            animate={{ 
              scale: [0, 1.2, 20],
              rotate: [0, 180, 720],
              opacity: [1, 1, 0]
            }}
            transition={{ 
              duration: 0.8,
              times: [0, 0.3, 1],
              ease: "easeOut"
            }}
          >
            <div className={`w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-r ${
              icon.color === 'cyan' ? 'from-cyan-500 to-cyan-600' :
              icon.color === 'green' ? 'from-green-500 to-green-600' :
              icon.color === 'purple' ? 'from-purple-500 to-purple-600' :
              'from-orange-500 to-orange-600'
            }`}>
              <IconComponent className="w-8 h-8 text-white" />
            </div>
          </motion.div>
          
          {/* Explosion particles */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-2 h-2 rounded-full ${
                icon.color === 'cyan' ? 'bg-cyan-400' :
                icon.color === 'green' ? 'bg-green-400' :
                icon.color === 'purple' ? 'bg-purple-400' :
                'bg-orange-400'
              }`}
              initial={{ 
                scale: 0,
                x: 0,
                y: 0,
                opacity: 1
              }}
              animate={{ 
                scale: [0, 1, 0],
                x: Math.cos((i * 30) * Math.PI / 180) * 200,
                y: Math.sin((i * 30) * Math.PI / 180) * 200,
                opacity: [1, 0.8, 0]
              }}
              transition={{ 
                duration: 0.8,
                delay: 0.2,
                ease: "easeOut"
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const useTransition = () => {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error('useTransition must be used within TransitionProvider');
  }
  return context;
};

const PageTransition = ({ children }) => {
  const location = useLocation();
  
  // Get the appropriate icon for current route
  const getRouteIcon = (pathname) => {
    switch (pathname) {
      case '/': return Home;
      case '/projects': return FolderOpen;
      case '/education': return GraduationCap;
      case '/connect': return MessageCircle;
      default: return Home;
    }
  };

  const getRouteColor = (pathname) => {
    switch (pathname) {
      case '/': return 'cyan';
      case '/projects': return 'green';
      case '/education': return 'purple';
      case '/connect': return 'orange';
      default: return 'cyan';
    }
  };

  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 1.05 }}
      transition={{
        duration: 0.4,
        ease: "easeInOut",
        delay: 0.2 // Delay to allow explosion to finish
      }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;