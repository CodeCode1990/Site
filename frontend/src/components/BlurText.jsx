import React from 'react';
import { motion } from 'framer-motion';

const BlurText = ({ text, delay = 300, animateBy = 'words', direction = 'top', onAnimationComplete, className }) => {
  const words = text.split(' ');

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: delay / 1000,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      filter: 'blur(5px)',
      y: direction === 'top' ? 20 : -20,
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      onAnimationComplete={onAnimationComplete}
      className={className}
      style={{ display: 'inline-flex', gap: '0.25rem' }}
    >
      {words.map((word, i) => (
        <motion.span key={i} variants={wordVariants} style={{ whiteSpace: 'nowrap' }}>
          {word}
          {i !== words.length - 1 ? '\u00A0' : ''}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default BlurText;
