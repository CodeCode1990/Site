// src/Footer.jsx

import React from "react";
import { Link } from "react-router-dom";
import { Github, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    // Global Fixed Footer Container - Full Width
    <footer className="fixed bottom-0 left-0 right-0 z-50 flex justify-center w-full px-6 pb-6 pointer-events-none">
      
      {/* Content Wrapper - Spans width but maxes out for large screens */}
      <div className="flex items-end justify-between w-full max-w-[1600px] mx-auto">
        
        {/* LEFT: Copyright Info */}
        <div className="pointer-events-auto text-xs md:text-sm text-gray-500 font-medium bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/5 shadow-lg mb-1 hidden md:block">
          &copy; {currentYear} <span className="text-gray-300">Yash Patel</span>. All rights reserved.
        </div>

        {/* RIGHT GROUP: Pill & Status */}
        <div className="flex items-center gap-4 ml-auto">
          
          {/* THE PILL: Icons + Connect (Moved to Right) */}
          <div className="pointer-events-auto flex items-center gap-5 px-5 py-2.5 rounded-full bg-[#050505]/90 backdrop-blur-2xl border border-white/10 shadow-2xl">
            
            {/* Social Icons Group - Animated */}
            <div className="flex items-center gap-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <motion.div whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                  <Github className="w-5 h-5" />
                </motion.div>
              </a>
              
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
              >
                <motion.div whileHover={{ scale: 1.2, rotate: -5 }} whileTap={{ scale: 0.9 }}>
                  <Linkedin className="w-5 h-5" />
                </motion.div>
              </a>
              
              <a 
                href="mailto:your@email.com"
                className="text-gray-400 hover:text-green-400 transition-colors duration-300"
              >
                <motion.div whileHover={{ scale: 1.2, y: -2 }} whileTap={{ scale: 0.9 }}>
                  <Mail className="w-5 h-5" />
                </motion.div>
              </a>
            </div>

            {/* Divider */}
            <div className="h-5 w-px bg-white/10" />

            {/* Connect Link - Glowing & Colored */}
            <Link to="/connect">
              <motion.div
                className="relative px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-bold text-sm shadow-[0_0_15px_rgba(34,211,238,0.15)] hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:bg-cyan-500/20 hover:text-cyan-300 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Connect
              </motion.div>
            </Link>
          </div>

          {/* AVAILABLE STATUS */}
          <div className="pointer-events-auto hidden md:flex items-center gap-2 px-4 py-2.5 rounded-full bg-black/40 backdrop-blur-md border border-white/5 shadow-lg">
             <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
            <span className="text-xs font-medium text-gray-300">Available for Projects</span>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;