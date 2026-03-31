// src/pages/Home.jsx

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  User, 
  Briefcase, 
  Wrench, 
  Clock, 
  Award, 
  Mail 
} from "lucide-react";
import { CircularTextShuffle } from "../components/PortfolioComponents";

// ================ 1. Custom Gradient Name Component ================
const GradientBlurText = () => {
  const text = "YASH PATEL";
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const child = {
    hidden: { 
      opacity: 0, 
      filter: "blur(20px)", 
      y: 20 
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: { duration: 1.2, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="flex flex-wrap justify-center lg:justify-start gap-x-3 md:gap-x-6"
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={child}
          className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-cyan-600 bg-[length:300%_auto] animate-gradient-move"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

// ================ 2. Icon Animation Variants ================
const iconAnimations = {
  user: {
    hover: { rotate: [0, -20, 20, -20, 0], transition: { duration: 0.5 } }
  },
  briefcase: {
    hover: { 
      scale: [1, 1.2, 1.2, 1.2, 1],
      rotate: [0, -10, 10, -10, 10, 0],
      transition: { duration: 0.6, ease: "easeInOut" } 
    }
  },
  wrench: {
    hover: { rotate: [0, 45, 0], transition: { duration: 0.4 } }
  },
  clock: {
    hover: { rotate: 360, transition: { duration: 1, ease: "linear" } }
  },
  award: {
    hover: { scale: [1, 1.2, 1], transition: { duration: 0.4 } }
  },
  mail: {
    hover: { y: [0, -5, 0], transition: { duration: 0.3, repeat: 1 } }
  }
};

// ================ 3. Navigation Tab Component ================
const NavTab = ({ to, icon: Icon, label, iconType, delay = 0 }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="relative w-full"
    >
      <Link to={to} className="block w-full">
        <motion.button
          layout
          whileHover="hover"
          initial="initial"
          className="relative w-full group flex items-center gap-3 md:gap-4 px-5 py-4 md:px-8 md:py-6 rounded-full bg-transparent backdrop-blur-sm border border-white/20 overflow-hidden justify-center md:justify-start"
          style={{ 
            fontFamily: '"Red Hat Display", sans-serif',
          }}
          variants={{
            initial: { 
              scale: 1, 
              borderColor: "rgba(255, 255, 255, 0.2)",
              boxShadow: "0px 0px 0px rgba(0,0,0,0)" 
            },
            hover: { 
              scale: 1.05, 
              borderColor: "#ffffff", 
              zIndex: 50,
              boxShadow: "0px 0px 15px 5px rgba(255, 255, 255, 0.1)",
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 20
              }
            }
          }}
        >
          {/* Shutter Background */}
          <motion.div 
            className="absolute inset-0 bg-gray-100/90" 
            initial={{ scaleY: 0 }}
            variants={{
              hover: { scaleY: 1 }
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ originY: 1 }}
          />

          {/* Content Layer */}
          <div className="relative z-10 flex items-center gap-3 md:gap-4">
            <motion.div 
              variants={iconAnimations[iconType]}
              className="text-white group-hover:text-black transition-colors duration-300"
            >
              <Icon className="w-5 h-5 md:w-7 md:h-7" />
            </motion.div>
            
            <span className="font-bold text-base md:text-xl tracking-wide text-white group-hover:text-black transition-colors duration-300 whitespace-nowrap">
              {label}
            </span>
          </div>
        </motion.button>
      </Link>
    </motion.div>
  );
};

// ================ 4. Main Home Component ================
const Home = () => {
  const [showContent, setShowContent] = useState(false);

  const phrasesArray = [
    "DATA ANALYST",
    "MEDICAL CODER",
    "BUSINESS ANALYST",
    "PHARMACOVIGILANCE SPECIALIST",
    "HEALTHCARE & CLINICAL DATA ANALYST",
  ];

  const navItems = [
    { to: "/about", icon: User, label: "About Me", iconType: "user" },
    { to: "/projects", icon: Briefcase, label: "Projects", iconType: "briefcase" },
    { to: "/techstack", icon: Wrench, label: "Tech Stack", iconType: "wrench" },
    { to: "/timeline", icon: Clock, label: "Timeline", iconType: "clock" },
    { to: "/connect", icon: Mail, label: "Connect", iconType: "mail" },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-[calc(100vh-250px)] w-full flex items-center justify-center overflow-x-hidden px-4 md:px-12 lg:px-24 py-8 md:py-12 pb-32 md:pb-12 font-['Red_Hat_Display']">
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@400;500;700;900&display=swap');
        
        @keyframes gradient-move {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-move {
          animation: gradient-move 8s ease infinite;
        }
      `}</style>

      {/* Content Wrapper */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-[1600px] mx-auto"
        style={{ fontFamily: '"Red Hat Display", sans-serif' }}
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          
          {/* Left Side Content */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left w-full"
          >
            {/* NAME */}
            <div className="text-5xl sm:text-6xl md:text-7xl lg:text-[7rem] font-black tracking-tighter leading-none mb-6 md:mb-8">
              <GradientBlurText />
            </div>

            {/* CONTAINER 1: TEXT SECTION */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="relative p-6 max-w-4xl w-full lg:w-fit group"
            >
              <div 
                className="absolute inset-0 -z-10 bg-transparent backdrop-blur-sm rounded-3xl"
                style={{
                  maskImage: "radial-gradient(ellipse at center, black 50%, transparent 100%)",
                  WebkitMaskImage: "radial-gradient(ellipse at center, black 50%, transparent 100%)"
                }}
              />

              <p className="relative z-8 text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white font-medium leading-tight">
                From Drug Safety to Data Science — Turning Data into Better Decisions and Actionable Insights.
              </p>

              <p className="relative z-10 mt-4 text-base sm:text-lg md:text-2xl text-gray-300 font-normal">
                Data Analyst with 7+ years of experience in healthcare analytics, 
                pharmacovigilance, and business intelligence.
              </p>
            </motion.div>

            {/* CONTAINER 2: TAGS SECTION */}
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="relative mt-8 p-4 w-full lg:w-fit"
            >
              <div 
                className="absolute inset-0 -z-10 bg-transparent backdrop-blur-sm rounded-3xl"
                style={{
                  maskImage: "radial-gradient(ellipse at center, black 50%, transparent 100%)",
                  WebkitMaskImage: "radial-gradient(ellipse at center, black 50%, transparent 100%)"
                }}
              />

              <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 w-full">
                <AnimatePresence>
                  {navItems.map((item, index) => (
                    <NavTab
                      key={item.to}
                      to={item.to}
                      icon={item.icon}
                      label={item.label}
                      iconType={item.iconType}
                      delay={0.9 + index * 0.1}
                    />
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>

          </motion.div>

          {/* Right Side - Circular Animation */}
          {/* FIX: 'hidden lg:block' -> Completely hides this component on Mobile and Tablet, shows on Large Screens (PC) */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:block relative flex-shrink-0 mt-0 transform scale-125 origin-center"
          >
            <div className="absolute inset-0 flex items-center justify-center -z-10 pointer-events-none">
              <div className="w-[85%] h-[85%] rounded-full bg-transparent backdrop-blur-[1px] blur-sm" />
            </div>
            
            <CircularTextShuffle phrases={phrasesArray} size="large" />
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
};

export default Home;