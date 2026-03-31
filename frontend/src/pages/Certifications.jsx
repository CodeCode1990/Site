// src/pages/Timeline.jsx

import React from "react";
import { motion } from "framer-motion";
import { MagicTitle } from "../components/PortfolioComponents";

const Timeline = () => {
  return (
    <div className="min-h-[calc(100vh-250px)] w-full px-6 md:px-12 lg:px-24 py-24">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <MagicTitle text="My Journey" size="xlarge" />
          <p className="text-gray-400 text-lg mt-4">
            Education and professional experience timeline
          </p>
        </motion.div>
        
        {/* Add your timeline content here */}
        <div className="mt-12 text-gray-500">
          Timeline content coming soon...
        </div>
      </div>
    </div>
  );
};

export default Timeline;