// src/Footer.jsx

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Github, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const location = useLocation();
  const isConnectActive = location.pathname === "/connect";

  return (
    <footer className="fixed bottom-8 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <div className="pointer-events-auto flex items-center gap-5 px-6 py-3 rounded-full bg-[#050505]/80 backdrop-blur-xl border border-white/10 shadow-2xl">
        
        {/* Social Icons Group */}
        <div className="flex items-center gap-5">
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            <motion.div whileHover={{ scale: 1.1, y: -2 }}>
              <Github className="w-5 h-5" />
            </motion.div>
          </a>
          
          <a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
          >
            <motion.div whileHover={{ scale: 1.1, y: -2 }}>
              <Linkedin className="w-5 h-5" />
            </motion.div>
          </a>
          
          <a 
            href="mailto:your@email.com"
            className="text-gray-400 hover:text-green-400 transition-colors duration-300"
          >
            <motion.div whileHover={{ scale: 1.1, y: -2 }}>
              <Mail className="w-5 h-5" />
            </motion.div>
          </a>
        </div>

        {/* Divider */}
        <div className="h-5 w-px bg-white/10" />

        {/* Connect Link */}
        <Link to="/connect" className="relative">
          <motion.div
            className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-300 ${
              isConnectActive ? "text-black" : "text-gray-300 hover:text-white"
            }`}
            whileHover={{ scale: 1.05 }}
          >
            {isConnectActive && (
              <motion.div
                layoutId="activeFooterNav"
                className="absolute inset-0 bg-white rounded-full"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">Connect</span>
          </motion.div>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;