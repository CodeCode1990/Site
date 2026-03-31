// src/components/HomeButton.jsx

import React from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Database } from "lucide-react";

const HomeButton = () => {
  const location = useLocation();
  
  // Don't show on home page
  if (location.pathname === "/" || location.pathname === "") {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-6 left-6 z-50"
    >
      <Link to="/">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group flex items-center gap-3 px-4 py-2.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 hover:border-cyan-500/50 transition-all duration-300"
        >
          {/* Logo Icon */}
          <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-green-400 rounded-lg flex items-center justify-center group-hover:shadow-lg group-hover:shadow-cyan-500/25 transition-all duration-300">
            <Database className="w-4 h-4 text-black" />
          </div>
          
          {/* Name */}
          <div className="flex items-center">
            <span className="text-lg font-bold font-mono tracking-tight text-white group-hover:text-cyan-400 transition-colors duration-300">
              YASH
            </span>
            <span className="text-lg font-bold font-mono tracking-tight text-cyan-400">
              PATEL
            </span>
          </div>

          {/* Home Indicator */}
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            whileHover={{ opacity: 1, x: 0 }}
            className="text-xs text-gray-400 uppercase tracking-wider hidden md:block"
          >
            ← Home
          </motion.span>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default HomeButton;