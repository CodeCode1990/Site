// src/components/PortfolioComponents.jsx

import React, { useState, useEffect, useRef, useLayoutEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

// ================ Helper: Base URL for Assets ================
export const BASE_URL = process.env.PUBLIC_URL || '/';
export const assetUrl = (path) => `${BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;

// ================ CountRoller Component ================
export const CountRoller = ({ target = 7, seconds = 2.5, em = 1.3, nudgeY = 7, className = '' }) => {
  const containerRef = useRef(null);
  const [rowH, setRowH] = useState(0);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const measure = () => {
      const h = el.getBoundingClientRect().height || 0;
      if (h) setRowH(h);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const digits = useMemo(() => Array.from({ length: target }, (_, i) => i + 1), [target]);

  return (
    <span
      ref={containerRef}
      className={`relative inline-flex align-baseline items-center overflow-hidden min-w-[2ch] select-none ${className}`}
      style={{ fontSize: `calc(1em * ${em})`, lineHeight: 1, height: '1em', top: nudgeY, background: 'transparent' }}
      aria-hidden="true"
    >
      <motion.div
        key={rowH}
        initial={{ y: 0 }}
        animate={{ y: rowH ? -(target - 1) * rowH : 0 }}
        transition={{ duration: seconds, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-0 top-0 w-full will-change-transform"
      >
        {digits.map((d) => (
          <div key={d} style={{ height: rowH || '1em' }} className="flex items-center justify-center font-mono tabular-nums leading-none bg-transparent">
            {d}
          </div>
        ))}
      </motion.div>
    </span>
  );
};

// ================ Gradient Magic Title Component ================
export const MagicTitle = ({ text, align = "left", className = "", size = "default" }) => {
  const sizeClasses = {
    small: "text-2xl md:text-3xl",
    default: "text-3xl md:text-4xl",
    large: "text-4xl md:text-5xl",
    xlarge: "text-5xl md:text-6xl"
  };

  return (
    <div className={`w-full mb-2 ${align === "center" ? "text-center" : align === "right" ? "text-right" : "text-left"} ${className}`}>
      <motion.h3
        className={`${sizeClasses[size]} font-black tracking-tight inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-green-400`}
        style={{ backgroundSize: "200% auto" }}
        animate={{ backgroundPosition: ["0% center", "200% center"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      >
        {text}
      </motion.h3>
    </div>
  );
};

// ================ Section Divider ================
export const SectionDivider = ({ className = "" }) => (
  <div className={`w-full flex items-center gap-4 my-8 ${className}`}>
    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
    <div className="w-2 h-2 rounded-full bg-cyan-500/50" />
    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
  </div>
);

// ================ Page Transition Wrapper ================
export const PageTransition = ({ children, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ================ Circular Text Shuffle Component ================
export const CircularTextShuffle = ({ phrases, size = "default" }) => {
  const [index, setIndex] = useState(0);

  const sizes = {
    small: { container: 250, radius: 90, underlineRadius: 70, fontSize: "text-lg", innerCircle: 100, pulseCircle: 75 },
    default: { container: 350, radius: 120, underlineRadius: 95, fontSize: "text-2xl", innerCircle: 150, pulseCircle: 110 },
    large: { container: 450, radius: 160, underlineRadius: 130, fontSize: "text-3xl", innerCircle: 200, pulseCircle: 150 }
  };

  const { container, radius, underlineRadius, fontSize, innerCircle, pulseCircle } = sizes[size];

  const colors = ["#22d3ee", "#4ade80", "#c084fc", "#fb923c", "#f472b6"];
  const currentColor = colors[index % colors.length];

  const formatPhrase = (text) => {
    if (text.length > 18) {
      return `${text} • `;
    }
    return `${text} • ${text} • `;
  };

  const [displayString, setDisplayString] = useState(formatPhrase(phrases[0]));
  const [isScrambling, setIsScrambling] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

  const currentText = phrases[index];
  const fullString = formatPhrase(currentText);

  const circumference = 2 * Math.PI * underlineRadius;
  const visibleTextLength = currentText.length;
  const totalLength = fullString.length;

  const textArc = (visibleTextLength / totalLength) * circumference;
  const gapArc = (3 / totalLength) * circumference;
  const dashArray = `${textArc} ${gapArc}`;

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [phrases.length]);

  useEffect(() => {
    const targetPhrase = formatPhrase(phrases[index]);

    if (displayString === targetPhrase && !isScrambling) return;

    setIsScrambling(true);
    let shuffleTime = 0;
    const maxShuffleTime = 600;

    const shuffleInterval = setInterval(() => {
      shuffleTime += 50;
      const randomStr = targetPhrase
        .split("")
        .map((char) => {
          if (char === " " || char === "•") return char;
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");

      setDisplayString(randomStr);

      if (shuffleTime >= maxShuffleTime) {
        clearInterval(shuffleInterval);
        setDisplayString(targetPhrase);
        setIsScrambling(false);
      }
    }, 50);

    return () => clearInterval(shuffleInterval);
  }, [index, phrases]);

  return (
    <div
      className="relative flex items-center justify-center cursor-pointer group"
      style={{ width: container, height: container }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className="absolute rounded-full bg-black/20 backdrop-blur-sm z-0"
        style={{ width: innerCircle, height: innerCircle }}
      />
      <div
        className="absolute rounded-full z-0 animate-pulse opacity-20"
        style={{ width: pulseCircle, height: pulseCircle, backgroundColor: currentColor }}
      />

      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: isHovered ? 60 : 40,
          repeat: Infinity,
          ease: "linear",
        }}
        className="relative w-full h-full flex items-center justify-center"
      >
        <svg
          className="absolute w-full h-full -rotate-90 transform transition-all duration-500"
          viewBox={`0 0 ${container} ${container}`}
        >
          <circle
            cx={container / 2}
            cy={container / 2}
            r={underlineRadius}
            fill="none"
            stroke={isScrambling ? "#ffffff" : currentColor}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={dashArray}
            className={`transition-all duration-300 ${isScrambling ? "opacity-50" : "opacity-100"}`}
            style={{ filter: isHovered ? `drop-shadow(0 0 8px ${currentColor})` : "none" }}
          />
        </svg>

        {displayString.split("").map((char, i) => {
          const totalChars = displayString.length;
          const degree = (360 / totalChars) * i;

          return (
            <span
              key={i}
              className={`absolute font-mono ${fontSize} font-black tracking-tight select-none`}
              style={{
                height: `${radius}px`,
                transform: `rotate(${degree}deg)`,
                transformOrigin: "0 100%",
                bottom: "50%",
                color: isScrambling ? "#ffffff" : currentColor,
              }}
            >
              <span
                className="block"
                style={{
                  transform: "translateY(-100%)",
                  textShadow: isScrambling
                    ? "0 0 5px rgba(255,255,255,0.8)"
                    : "none",
                }}
              >
                {char}
              </span>
            </span>
          );
        })}
      </motion.div>
    </div>
  );
};

// ================ Smooth WheelPicker Component ================
export const WheelPicker = ({ data, activeIndex, setActiveIndex }) => {
  const itemHeight = 48;
  const visibleRows = 5;
  const totalHeight = itemHeight * visibleRows;

  const normalizedIndex =
    ((activeIndex % data.length) + data.length) % data.length;

  const handleWheel = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (e.deltaY > 0) setActiveIndex((prev) => prev + 1);
    else if (e.deltaY < 0) setActiveIndex((prev) => prev - 1);
  };

  useEffect(() => {
    const el = document.getElementById("wheel-container");
    el?.addEventListener("wheel", handleWheel, { passive: false });
    return () => el?.removeEventListener("wheel", handleWheel);
  }, []);

  const indices = [];
  for (let offset = 0; offset < visibleRows; offset++) {
    const idx = (normalizedIndex + offset) % data.length;
    indices.push(idx);
  }

  return (
    <div className="relative flex flex-col items-center">
      <div id="wheel-container" className="relative w-56 overflow-hidden rounded-lg bg-black/20 backdrop-blur-sm border border-white/10" style={{ height: totalHeight }}>
        <motion.div
          key={activeIndex}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {indices.map((idx, i) => {
            const isActive = i === 0;
            return (
              <div key={idx} className="flex items-center justify-center" style={{ height: itemHeight }}>
                <motion.span
                  animate={{
                    scale: isActive ? 1.2 : 0.9,
                    opacity: isActive ? 1 : 0.8,
                    color: isActive ? "#22d3ee" : "#bebec0",
                    fontWeight: isActive ? 700 : 400,
                    filter: isActive ? "drop-shadow(0 0 8px rgba(34,211,238,0.5))" : "none"
                  }}
                  className="font-mono text-lg transition-colors cursor-pointer"
                  onClick={() => setActiveIndex(activeIndex + i)}
                >
                  {data[idx].start} – {data[idx].end}
                </motion.span>
              </div>
            );
          })}
        </motion.div>
        <div className="pointer-events-none absolute left-0 w-full border-b border-cyan-500/30 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent" style={{ top: 0, height: itemHeight }} />
      </div>
      <div className="mt-4 flex flex-col items-center animate-bounce font-medium text-white-500">
        <span className="text-[10px] uppercase tracking-widest mb-1">Scroll Me</span>
        <ChevronDown className="w-4 h-4" />
      </div>
    </div>
  );
};

// ================ Role Tags Component ================
export const RoleTags = ({ roles }) => {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {roles.map((role, index) => (
        <motion.span
          key={role}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 + 0.5 }}
          className="px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-sm font-medium text-gray-300 hover:border-cyan-500/50 hover:text-cyan-400 transition-all duration-300 cursor-default"
        >
          {role}
        </motion.span>
      ))}
    </div>
  );
};

// ================ Animated Background ================
export const AnimatedBackground = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
    <motion.div
      className="absolute top-1/4 -left-1/4 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl"
      animate={{
        x: [0, 100, 0],
        y: [0, 50, 0],
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    />
    <motion.div
      className="absolute bottom-1/4 -right-1/4 w-96 h-96 rounded-full bg-purple-500/10 blur-3xl"
      animate={{
        x: [0, -100, 0],
        y: [0, -50, 0],
      }}
      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
    />
    <motion.div
      className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full bg-green-500/5 blur-3xl"
      animate={{
        scale: [1, 1.2, 1],
      }}
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
    />
  </div>
);

// ================ Navigation Link Card ================
export const NavCard = ({ to, title, description, icon: Icon, gradient }) => (
  <motion.div
    whileHover={{ scale: 1.02, y: -5 }}
    whileTap={{ scale: 0.98 }}
    className="group"
  >
    <a href={to} className="block">
      <div className={`relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${gradient} p-6 backdrop-blur-sm transition-all duration-300 group-hover:border-white/20`}>
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-white/10">
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
            <p className="text-sm text-gray-400">{description}</p>
          </div>
          <motion.div
            className="text-white/50 group-hover:text-white transition-colors"
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            →
          </motion.div>
        </div>
      </div>
    </a>
  </motion.div>
);