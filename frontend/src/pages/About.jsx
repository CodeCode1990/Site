// src/pages/About.jsx

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
  Clock,
  BarChart3,
  Search,
  TrendingUp,
  Users,
  LayoutDashboard,
  Database,
  Quote,
  Menu,
  X,
} from "lucide-react";
import BlurText from "../components/BlurText";
import {
  MagicTitle,
  SectionDivider,
  PageTransition,
} from "../components/PortfolioComponents";

// --- Scroll Fade Component ---
const ScrollFade = ({ children, className = "" }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [60, 0, 0, -60]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
};

// --- UPDATED RESPONSIVE NAVIGATION ---
const TopNavigation = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  
  const navLinks = [
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Experience", path: "/timeline" },
    { name: "Tech Stack", path: "/techstack" }
  ];

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
      {/* ================= DESKTOP VIEW (Centered Pill) ================= */}
      <nav className="hidden md:flex fixed top-0 left-0 right-0 z-50 justify-center py-6 pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link key={link.name} to={link.path}>
                <motion.div
                  className={`relative px-4 py-2 rounded-full transition-all duration-300 ${
                    isActive 
                      ? "text-black font-bold text-lg" 
                      : "text-gray-400 hover:text-white font-medium text-base"
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavDesktop"
                      className="absolute inset-0 bg-white rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* ================= MOBILE VIEW (Hamburger Menu) ================= */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 pointer-events-none">
        {/* The Toggle Button (Top Right) */}
        <div className="absolute top-6 right-6 pointer-events-auto">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-3 rounded-full bg-black/50 backdrop-blur-xl border border-white/10 text-white shadow-lg active:scale-95 transition-transform"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* The Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-20 right-6 w-48 pointer-events-auto"
            >
              <div className="flex flex-col gap-2 p-2 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 shadow-2xl">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link key={link.name} to={link.path} onClick={() => setIsOpen(false)}>
                      <div
                        className={`relative px-4 py-3 rounded-xl transition-all ${
                          isActive 
                            ? "bg-white text-black font-bold" 
                            : "text-gray-300 hover:bg-white/10"
                        }`}
                      >
                        <span className="text-sm">{link.name}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

// --- Blur Background Component ---
const BlurBackground = ({ children, className = "" }) => (
  <div className={`relative ${className}`}>
    <div 
      className="absolute inset-0 -z-10 rounded-3xl bg-black/80 backdrop-blur-3xl"
      style={{
        maskImage: "radial-gradient(ellipse at center, black 50%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse at center, black 50%, transparent 100%)",
      }}
    />
    {children}
  </div>
);

const About = () => {
  const [activeMetricIndex, setActiveMetricIndex] = useState(0);
  const [bridgeIndex, setBridgeIndex] = useState(0);

  const bridgeWords = [
    "Business",
    "Healthcare",
    "Finance",
    "Market",
    "Insights",
    "Strategy",
    "Analytics",
  ];

  const metricCards = [
    {
      label: "Faster Turnaround",
      value: "35%",
      icon: Clock,
      details: [
        "Engineered an Excel-based automation tool to streamline the patient case report distribution and tracking method.",
        "The tool also forecasts if the rate of incoming cases fits within the capacity of present Full-time Equivalents (FTEs).",
        "This initiative resulted in reducing the time required for case distribution and tracking by 35%.",
      ],
      colorClasses: "from-cyan-500/20 to-cyan-500/5 border-cyan-500/30",
      iconColor: "text-cyan-400",
      detailColor: "text-cyan-200",
      bgGlow: "bg-cyan-500",
    },
    {
      label: "Data Points Analyzed",
      value: "2M+",
      icon: BarChart3,
      details: [
        "Performed extensive data wrangling, cleaning, and statistical analysis on massive healthcare datasets exceeding 2 million raw data points.",
        "Developed automated cleaning scripts to identify duplicates, missing values, and inconsistent formatting across legacy databases.",
        "These clean datasets were utilized to uncover hidden safety signals and epidemiological trends.",
      ],
      colorClasses: "from-green-500/20 to-green-500/5 border-green-500/30",
      iconColor: "text-green-400",
      detailColor: "text-green-200",
      bgGlow: "bg-green-500",
    },
    {
      label: "SOPs Optimized",
      value: "10+",
      icon: Search,
      details: [
        "Authored and refined over 10 critical Standard Operating Procedures (SOPs) related to pharmacovigilance workflows.",
        "Bridged the gap between complex technical data processes and rigid regulatory compliance requirements (Health Canada/FDA).",
        "These optimized SOPs standardized the data entry and review process, reducing onboarding time for new hires by 20%.",
      ],
      colorClasses: "from-purple-500/20 to-purple-500/5 border-purple-500/30",
      iconColor: "text-purple-400",
      detailColor: "text-purple-200",
      bgGlow: "bg-purple-500",
    },
    {
      label: "Years Experience",
      value: "7+",
      icon: TrendingUp,
      details: [
        "Possess over 7 years of diverse professional experience spanning clinical research, medical coding, and advanced data analytics.",
        "Demonstrated a consistent track record of adapting to new technologies and industries."
      ],
      colorClasses: "from-orange-500/20 to-orange-500/5 border-orange-500/30",
      iconColor: "text-orange-400",
      detailColor: "text-orange-200",
      bgGlow: "bg-orange-500",
    },
    {
      label: "Cross-Functional Teams",
      value: "5+",
      icon: Users,
      details: [
        "Acted as the primary 'translation layer' between 5+ distinct teams, including clinical safety physicians and IT developers.",
        "Translated complex business requirements into technical SQL queries and dashboard logic.",
        "Facilitated agile stand-ups and sprint reviews, fostering collaboration.",
      ],
      colorClasses: "from-teal-500/20 to-teal-500/5 border-teal-500/30",
      iconColor: "text-teal-400",
      detailColor: "text-teal-200",
      bgGlow: "bg-teal-500",
    },
    {
      label: "Dashboards Delivered",
      value: "25+",
      icon: LayoutDashboard,
      details: [
        "Designed and deployed over 25 interactive Power BI and Tableau dashboards, transforming raw operational metrics into insights.",
        "Created specific KPIs for case processing throughput, error rates, and inventory management.",
        "Implemented row-level security and user-friendly filters, increasing the adoption rate of self-service analytics.",
      ],
      colorClasses: "from-blue-500/20 to-blue-500/5 border-blue-500/30",
      iconColor: "text-blue-400",
      detailColor: "text-blue-200",
      bgGlow: "bg-blue-500",
    },
    {
      label: "Tools & Platforms",
      value: "7+",
      icon: Database,
      details: [
        "Mastered a diverse tech stack of 7+ tools including Python, SQL, R, SAS and other specialized PV software.",
        "Continuously upskilling in cloud platforms (Azure/AWS) to migrate legacy on-premise reporting solutions."
      ],
      colorClasses: "from-rose-500/20 to-rose-500/5 border-rose-500/30",
      iconColor: "text-rose-400",
      detailColor: "text-rose-200",
      bgGlow: "bg-rose-500",
    },
  ];

  useEffect(() => {
    const i = setInterval(
      () => setBridgeIndex((prev) => (prev + 1) % bridgeWords.length),
      3000
    );
    return () => clearInterval(i);
  }, []);

  return (
    <div className="relative h-screen w-full font-['Red_Hat_Display'] selection:bg-cyan-500/30 overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@400;500;700;900&display=swap');
        
        /* Hide scrollbar for Chrome, Safari and Opera */
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        /* Hide scrollbar for IE, Edge and Firefox */
        .hide-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>

      {/* Navigation */}
      <TopNavigation />

      {/* THE MASK CONTAINER */}
      <div 
        className="fixed inset-0 overflow-y-auto overflow-x-hidden hide-scrollbar"
        style={{
            maskImage: "linear-gradient(to bottom, transparent 0px, transparent 80px, black 150px, black 80%, transparent 95%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0px, transparent 80px, black 150px, black 80%, transparent 95%, transparent 100%)"
        }}
      >
        <PageTransition className="relative z-10 h-full w-full max-w-[1600px] mx-auto px-4 md:px-8 lg:px-8 pt-32 md:pt-32 pb-[200px] md:pb-[450px]">
            
            <ScrollFade className="mb-1">
            
            <BlurBackground className="mb-1 w-fit px-5 py-0.5 -ml-2 md:-ml-5">
                <MagicTitle text="About Me" size="xlarge" className="mb-0" />
            </BlurBackground>

            <BlurBackground className="px-5 py-1 -ml-2 md:-ml-5 w-fit -mb-1">
                <h2 className="text-3xl md:text-4xl lg:text-4xl font-black text-white flex items-baseline gap-2 md:gap-4 flex-wrap leading-none">
                Bridging <span className="text-cyan-400">Data</span> &
                <span className="inline-block min-w-[8ch] md:min-w-[10ch]">
                    <BlurText
                    key={bridgeIndex}
                    text={bridgeWords[bridgeIndex]}
                    delay={150}
                    animateBy="words"
                    direction="top"
                    className="text-green-400"
                    />
                </span>
                </h2>
            </BlurBackground>

            <BlurBackground className="w-full p-4 md:p-6 -ml-2 md:-ml-5 -mt-1">
                <div className="space-y-4 md:space-y-5 text-lg md:text-2xl text-gray-200 font-normal leading-relaxed">
                <p>
                    My journey into the world of data didn't start with code — it
                    started in{" "}
                    <span className="text-cyan-400 font-bold">pharmacy school</span>,
                    where I first learned the importance of accuracy, evidence-based
                    decisions, and understanding the deeper "why".
                </p>
                <p>
                    While working on different domains of pharmacovigilance, I found
                    myself drawn to a new kind of curiosity — not just what the data
                    showed, but how I could{" "}
                    
                    analyze it better
                    {" "}
                    and{" "}
                    
                    automate repetitive work
                    . This interest quickly grew into a passion. I began
                    exploring Python, SQL, dashboards, and statistical methods.
                </p>

                <div className="grid md:grid-cols-2 gap-4 md:gap-6 items-center mt-4 md:mt-6">
                    <p>
                    I aspire to grow into a{" "}
                    <span className="text-orange-400 font-bold">
                        full-stack data professional
                    </span>, combining the strengths of data engineering, data
                    analysis, and data science. My goal is to design and optimize
                    data pipelines, ensure data quality, and apply advanced modeling
                    techniques for predictive insights.
                    </p>

                    <div className="relative pl-5 border-l-2 border-cyan-500/30">
                    <Quote className="w-5 h-5 md:w-6 md:h-6 text-cyan-500/40 mb-2" />
                    <p className="italic text-cyan-100/90 font-medium text-lg md:text-2xl leading-relaxed">
                    "Every dataset tells a story. My job is to listen carefully
                    and translate that story into actionable business insights."
                    </p>
                    </div>
                </div>
                </div>
            </BlurBackground>
            </ScrollFade>

            <BlurBackground className="py-1 px-5 -mx-4 md:-mx-5 -my-6 md:-my-10">
                <SectionDivider />
            </BlurBackground>

            <ScrollFade>
            <BlurBackground className="mb-1 w-fit px-5 py-0.5 -ml-2 md:-ml-5">
                <MagicTitle text="Impact & Metrics" size="large" className="mb-0" />
            </BlurBackground>

            <BlurBackground className="p-3 md:p-6 -mx-4 md:-mx-5 -mb-3">
                {/* 
                  UPDATED CONTAINER FOR MOBILE CARDS:
                  - flex: Makes it a row on mobile.
                  - overflow-x-auto: Enables horizontal scrolling.
                  - snap-x / snap-mandatory: Snaps cards into place.
                  - pb-4: Adds space for scrollbar (even if hidden)/touch.
                  - md:grid: Switches back to grid on tablet/desktop.
                */}
                <div className="flex md:grid overflow-x-auto md:overflow-visible gap-3 md:gap-4 pb-4 md:pb-0 md:grid-cols-4 lg:grid-cols-7 snap-x snap-mandatory hide-scrollbar">
                    {metricCards.map((card, index) => (
                    <motion.div
                        key={card.label}
                        whileHover={{ y: -5, scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 260, damping: 18 }}
                        onMouseEnter={() => setActiveMetricIndex(index)}
                        onClick={() => setActiveMetricIndex(index)}
                        className={`
                        group relative flex-shrink-0 flex flex-col justify-between rounded-xl border 
                        bg-gradient-to-br ${card.colorClasses} 
                        p-3 min-h-[100px] md:min-h-[110px] 
                        min-w-[130px] md:min-w-0  /* FIXED WIDTH FOR MOBILE SCROLL */
                        cursor-pointer shadow-lg transition-all duration-300
                        snap-center /* Snap point */
                        ${
                            activeMetricIndex === index
                            ? "ring-2 ring-white/30"
                            : "opacity-80 hover:opacity-100"
                        }
                        `}
                    >
                        <div
                        className={`absolute inset-0 rounded-xl ${card.bgGlow} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`}
                        />
                        <div className="relative z-10 flex flex-col justify-between h-full">
                            <div className="flex items-start justify-between w-full -mb-1">
                                <div className={`p-1 md:p-1.5 rounded-md bg-black/20 ${card.iconColor}`}>
                                    <card.icon className="w-5 h-5 md:w-6 md:h-6" />
                                </div>
                                <div className="text-2xl md:text-4xl font-black text-white leading-none tracking-tight">
                                    {card.value}
                                </div>
                            </div>
                            <div className="text-xs md:text-lg font-bold text-gray-100 leading-tight break-words mt-auto">
                                {card.label}
                            </div>
                        </div>
                    </motion.div>
                    ))}
                </div>
            </BlurBackground>

            {/* Active Metric Detail with Blur Background */}
            <BlurBackground className="p-3 md:p-6 -mx-4 md:-mx-5">
                <AnimatePresence mode="wait">
                    {metricCards[activeMetricIndex] && (
                    <motion.div
                        key={activeMetricIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="relative overflow-hidden rounded-xl border border-white/10 backdrop-blur-xl shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                    >
                        <div className={`absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l ${metricCards[activeMetricIndex].colorClasses} opacity-10`} />

                        <div className="relative z-10 p-4 md:p-6">
                        <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-start md:items-center mb-3 md:mb-4 border-b border-white/10 pb-3 md:pb-4">
                            <div
                            className={`p-2 rounded-lg bg-white/5 ${metricCards[activeMetricIndex].iconColor}`}
                            >
                            {React.createElement(
                                metricCards[activeMetricIndex].icon,
                                {
                                className: "w-8 h-8 md:w-10 md:h-10",
                                }
                            )}
                            </div>
                            <div>
                            <h4 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-1">
                                {metricCards[activeMetricIndex].value}
                            </h4>
                            <p className="text-base md:text-xl text-gray-300 font-medium">
                                {metricCards[activeMetricIndex].label}
                            </p>
                            </div>
                        </div>

                        <div
                            className={`space-y-3 text-base md:text-xl font-normal leading-relaxed ${metricCards[activeMetricIndex].detailColor}`}
                        >
                            {metricCards[activeMetricIndex].details.map(
                            (paragraph, i) => (
                                <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-start gap-3"
                                >
                                <span className="mt-2.5 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-current opacity-60 flex-shrink-0" />
                                <p>{paragraph}</p>
                                </motion.div>
                            )
                            )}
                        </div>
                        </div>
                    </motion.div>
                    )}
                </AnimatePresence>
            </BlurBackground>
            <div className="h-[100px] w-full pointer-events-none" />
            </ScrollFade>

        </PageTransition>
      </div>
    </div>
  );
};
export default About;