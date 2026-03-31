import React from "react";
import { motion } from "framer-motion";

const SplitText = ({
  text,
  className = "",
  delay = 0, // Delay before animation starts (in ms)
  duration = 0.5, // Duration of one character's animation (in s)
  from = { opacity: 0, y: 20 },
  to = { opacity: 1, y: 0 },
  ease = "easeOut",
}) => {
  // Split text into individual characters
  const characters = text.split("");

  return (
    <span className={className} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
      {characters.map((char, index) => {
        return (
          <motion.span
            key={index}
            initial={from}
            animate={to}
            transition={{
              duration: duration,
              ease: ease,
              // Convert delay to seconds and add a stagger effect of 0.05s per index
              delay: delay / 1000 + index * 0.05, 
            }}
            style={{ display: "inline-block", whiteSpace: "pre" }}
          >
            {char}
          </motion.span>
        );
      })}
    </span>
  );
};

export default SplitText;