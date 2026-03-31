// src/pages/TechStack.jsx

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Card } from "../components/ui/card";
import { SectionDivider, PageTransition } from "../components/PortfolioComponents";
import SkillsFlipShowcase from "../components/SkillsFlipShowcase";
import {
  Code2,
  Database,
  BarChart3,
  HeartPulse,
  Menu,
  X,
} from "lucide-react";

// --- Asset Imports ---
import bigquery from "../assets/icons/bigquery.svg";
import gitIcon from "../assets/icons/git.svg";
import googleColab from "../assets/icons/google-colab.svg";
import jupyter from "../assets/icons/jupyter-seeklogo.svg";
import looker from "../assets/icons/looker.svg";
import matplotlibIcon from "../assets/icons/matplotlib.svg";
import m365 from "../assets/icons/Microsoft-365.svg";
import mongodbIcon from "../assets/icons/mongodb.svg";
import msOffice from "../assets/icons/MS_Office.svg";
import mssql from "../assets/icons/MSSQL.svg";
import mysqlIcon from "../assets/icons/mysql.svg";
import numpyIcon from "../assets/icons/numpy.svg";
import pandasIcon from "../assets/icons/pandas.svg";
import postgresqlIcon from "../assets/icons/postgresql.svg";
import powerBi from "../assets/icons/power-bi.svg";
import pycharmIcon from "../assets/icons/pycharm.svg";
import pythonIcon from "../assets/icons/python.svg";
import rIcon from "../assets/icons/r.svg";
import seabornIcon from "../assets/icons/seaborn.svg";
import sharepointIcon from "../assets/icons/sharepoint.svg";
import tableauIcon from "../assets/icons/tableau.svg";
import vscodeIcon from "../assets/icons/vscode.svg";

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

// --- NAVIGATION ---
const TopNavigation = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  
  const navLinks = [
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Experience", path: "/timeline" },
    { name: "Tech Stack", path: "/techstack" }
  ];

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
      <nav className="hidden md:flex fixed top-0 left-0 right-0 z-50 justify-center py-6 pointer-events-none font-['Red_Hat_Display']">
        <div className="pointer-events-auto flex items-center gap-1 md:gap-2 px-6 py-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link key={link.name} to={link.path}>
                <motion.div
                  className={`relative px-4 py-2 rounded-full transition-all duration-300 ${
                    isActive
                      ? "text-black font-bold text-base md:text-lg"
                      : "text-gray-400 hover:text-white font-medium text-sm md:text-base"
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
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

      <div className="md:hidden fixed top-0 left-0 right-0 z-50 pointer-events-none">
        <div className="absolute top-6 right-6 pointer-events-auto">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-3 rounded-full bg-black/50 backdrop-blur-xl border border-white/10 text-white shadow-lg active:scale-95 transition-transform"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-20 right-6 w-48 pointer-events-auto"
            >
              <div className="flex flex-col gap-2 p-2 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 shadow-2xl font-['Red_Hat_Display']">
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

// --- Skills Data ---
const skills = [
  {
    category: "Programming & Analytics",
    icon: Code2,
    color: "text-cyan-400",
    iconBg: "bg-cyan-500/10",
    bulletColor: "bg-cyan-400",
    borderColor: "border-cyan-500/30",
    shadowColor: "shadow-cyan-500/10",
    gradient: "from-cyan-500/20 to-cyan-500/5",
    items: [
      { label: "Python & R", detail: "Pandas, NumPy, SciPy, scikit-learn, Statsmodels" },
      { label: "Statistical Methods", detail: "Hypothesis testing, regression, ANOVA, A/B testing" },
      { label: "Predictive Modeling", detail: "Classification, time-series forecasting (ARIMA, Prophet)" },
      { label: "Advanced Analytics", detail: "Behavioral trend analysis, funnel optimization" },
      { label: "Automation", detail: "Web scraping, API extraction, Jupyter workflows" },
    ],
  },
  {
    category: "SQL & Databases",
    icon: Database,
    color: "text-green-400",
    iconBg: "bg-green-500/10",
    bulletColor: "bg-green-400",
    borderColor: "border-green-500/30",
    shadowColor: "shadow-green-500/10",
    gradient: "from-green-500/20 to-green-500/5",
    items: [
      { label: "Core SQL", detail: "PostgreSQL, MySQL, SQLite, MS SQL Server & SAS" },
      { label: "Advanced Queries", detail: "CTEs, window functions, subqueries & stored procedures" },
      { label: "Data Modeling", detail: "ER diagrams, normalization, indexing & optimization" },
      { label: "ETL & Pipelines", detail: "Data warehouse concepts, migration & schema control" },
    ],
  },
  {
    category: "Visualization & BI",
    icon: BarChart3,
    color: "text-purple-400",
    iconBg: "bg-purple-500/10",
    bulletColor: "bg-purple-400",
    borderColor: "border-purple-500/30",
    shadowColor: "shadow-purple-500/10",
    gradient: "from-purple-500/20 to-purple-500/5",
    items: [
      { label: "Power BI & Tableau", detail: "DAX, LOD expressions, row-level security & storytelling" },
      { label: "Python Viz", detail: "Matplotlib, Seaborn, Plotly & geospatial heatmaps" },
      { label: "Dashboard Design", detail: "KPI scorecards, drill-downs, cross-filtering & automation" },
      { label: "Excel Mastery", detail: "Power Query, Power Pivot, VBA macros & dynamic charts" },
      { label: "Data Storytelling", detail: "Executive presentations, metric trees & insight delivery" },
    ],
  },
  {
    category: "Healthcare & PV",
    icon: HeartPulse,
    color: "text-orange-400",
    iconBg: "bg-orange-500/10",
    bulletColor: "bg-orange-400",
    borderColor: "border-orange-500/30",
    shadowColor: "shadow-orange-500/10",
    gradient: "from-orange-500/20 to-orange-500/5",
    items: [
      { label: "Medical Coding", detail: "MedDRA, ICD-10 & WHO-Drug dictionaries" },
      { label: "Safety Processing", detail: "ICSR triage, causality assessment, Aggregate reports (PSUR, PADER, ASR)" },
      { label: "Regulatory Reporting", detail: "FDA, Health Canada, EMA, PVPI " },
      { label: "Signal & Surveillance", detail: "Signal detection, AEFI (Vaccine) analysis" },
      { label: "Compliance & SOPs", detail: "GCP/GVP, RMPs, audit readiness" },
    ],
  },
];

// --- Animated Skill Card (Desktop) ---
const SkillCard = ({ skill, index, isHovered, onHover, onLeave }) => {
  const Icon = skill.icon;

  return (
    <motion.div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4, ease: "easeOut" }}
      whileHover={{ y: -5, scale: 1.01 }}
    >
      <Card
        className={`relative bg-gray-900/40 backdrop-blur-md overflow-hidden transition-all duration-200 ease-out rounded-2xl border p-0 h-full ${
          isHovered
            ? `bg-gray-800/60 ${skill.borderColor} ${skill.shadowColor} shadow-xl`
            : "border-gray-800/50"
        }`}
      >
        <div
          className={`h-[3px] w-full bg-gradient-to-r ${skill.gradient} transition-all duration-200 ease-out ${
            isHovered ? "opacity-100" : "opacity-40"
          }`}
        />

        <div className="px-5 py-3">
          <div className="flex items-center gap-2.5 mb-2">
            <motion.div
              className={`p-1.5 rounded-lg ${skill.iconBg} border border-white/5`}
              animate={
                isHovered
                  ? { rotate: [0, -5, 5, 0], scale: 1.05 }
                  : { rotate: 0, scale: 1 }
              }
              transition={{ duration: 0.4 }}
            >
              <Icon className={`w-5 h-5 ${skill.color}`} />
            </motion.div>
            <h3
              className={`text-base md:text-lg font-black uppercase tracking-widest ${skill.color} font-['Red_Hat_Display']`}
            >
              {skill.category}
            </h3>
            <span className="h-px flex-1 bg-gradient-to-r from-gray-700 to-transparent" />
          </div>

          <div className="space-y-2.5">
            {skill.items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08 + i * 0.05, duration: 0.35 }}
                className={`flex items-start gap-2.5 transition-colors duration-200 ${
                  isHovered ? "text-gray-100" : "text-gray-500"
                }`}
              >
                <div 
                  className={`mt-[9px] h-1.5 w-1.5 flex-shrink-0 rounded-full ${skill.bulletColor} transition-opacity duration-300 ${
                    isHovered ? "opacity-100 shadow-[0_0_8px_currentColor]" : "opacity-60"
                  }`} 
                />
                
                <p className="text-base md:text-[17px] leading-snug font-['Red_Hat_Display']">
                  <span
                    className={`font-bold transition-colors duration-200 ${
                      isHovered ? "text-white" : "text-gray-300"
                    }`}
                  >
                    {item.label}
                  </span>
                  <span className="mx-1.5 text-gray-600">—</span>
                  <span className="font-medium">{item.detail}</span>
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

// --- Mobile Marquee Component (Improved) ---
const MarqueeRow = ({ items, direction = "left", speed = 40 }) => {
  return (
    <div className="relative flex overflow-hidden w-full mask-gradient py-2 select-none">
      
      {/* Track 1 */}
      <div 
        className="flex shrink-0 items-center gap-3 pr-3 min-w-full animate-marquee"
        style={{ 
            animationDuration: `${speed}s`,
            animationDirection: direction === "right" ? "reverse" : "normal"
        }}
      >
        {items.map((item, index) => (
          <div
            key={`a-${index}`}
            className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-lg"
          >
            <img 
              src={item.src} 
              alt={item.label} 
              className="w-5 h-5 object-contain" 
            />
            <span className="text-sm font-bold text-gray-200 whitespace-nowrap">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Track 2 (Duplicate for Seamless Loop) */}
      <div 
        className="flex shrink-0 items-center gap-3 pr-3 min-w-full animate-marquee"
        style={{ 
            animationDuration: `${speed}s`,
            animationDirection: direction === "right" ? "reverse" : "normal"
        }}
      >
        {items.map((item, index) => (
          <div
            key={`b-${index}`}
            className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-lg"
          >
            <img 
              src={item.src} 
              alt={item.label} 
              className="w-5 h-5 object-contain" 
            />
            <span className="text-sm font-bold text-gray-200 whitespace-nowrap">
              {item.label}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
};

// --- Main TechStack Component ---
const TechStack = () => {
  const [hoveredSkillIndex, setHoveredSkillIndex] = useState(null);

  // --- Mobile Marquee Data (SVG Assets) ---
  const marqueeRow1 = [
    { label: "Python", src: pythonIcon },
    { label: "R", src: rIcon },
    { label: "Pandas", src: pandasIcon },
    { label: "NumPy", src: numpyIcon },
    { label: "Matplotlib", src: matplotlibIcon },
    { label: "Seaborn", src: seabornIcon },
    { label: "Jupyter", src: jupyter },
    { label: "PyCharm", src: pycharmIcon },
    { label: "VS Code", src: vscodeIcon },
    { label: "Git", src: gitIcon },
    { label: "Colab", src: googleColab },
  ];

  const marqueeRow2 = [
    { label: "PostgreSQL", src: postgresqlIcon },
    { label: "MySQL", src: mysqlIcon },
    { label: "MS SQL", src: mssql },
    { label: "MongoDB", src: mongodbIcon },
    { label: "BigQuery", src: bigquery },
    { label: "Power BI", src: powerBi },
    { label: "Tableau", src: tableauIcon },
    { label: "Looker", src: looker },
    { label: "Office", src: msOffice },
    { label: "SharePoint", src: sharepointIcon },
  ];

  return (
    <div className="relative h-screen w-full font-['Red_Hat_Display'] selection:bg-cyan-500/30 overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@400;500;700;900&display=swap');
        
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-100%); }
        }
        
        .animate-marquee {
          animation: marquee linear infinite;
        }
      `}</style>

      <TopNavigation />

      <div 
        className="fixed inset-0 overflow-y-auto overflow-x-hidden hide-scrollbar"
        style={{
            maskImage: "linear-gradient(to bottom, transparent 0px, transparent 80px, black 150px, black 80%, transparent 95%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0px, transparent 80px, black 150px, black 80%, transparent 95%, transparent 100%)"
        }}
      >
        <PageTransition className="relative z-10 w-full min-h-full max-w-[1900px] mx-auto px-4 md:px-8 lg:px-8 pt-28 md:pt-32 pb-32 md:pb-0 flex flex-col">
          
          <BlurBackground className="px-5 py-1 -ml-2 md:-ml-5 w-fit mb-0 shrink-0">
            <h2 className="text-3xl md:text-6xl font-black text-white font-['Red_Hat_Display']">
              Technical <span className="text-cyan-400">Expertise</span>
            </h2>
          </BlurBackground>

          <BlurBackground className="w-full px-5 py-1.5 -ml-2 md:-ml-5 mt-0 mb-0 shrink-0">
            <p className="text-lg md:text-xl text-gray-300 font-normal leading-snug max-w-4xl font-['Red_Hat_Display']">
              From raw data to executive dashboards — a full-stack analytical
              toolkit spanning Python, SQL, BI platforms, and regulated
              healthcare domains.
            </p>
          </BlurBackground>

          <BlurBackground className="py-0 px-5 -mx-4 md:-mx-5 -my-4 shrink-0">
            <SectionDivider />
          </BlurBackground>

          {/* Skills Grid - Responsive Gap */}
          <div className="grid gap-4 md:gap-3 grid-cols-1 md:grid-cols-2 w-full shrink-0 mt-4 md:mt-0">
            {skills.map((skill, index) => (
              <SkillCard
                key={index}
                skill={skill}
                index={index}
                isHovered={hoveredSkillIndex === index}
                onHover={() => setHoveredSkillIndex(index)}
                onLeave={() => setHoveredSkillIndex(null)}
              />
            ))}
          </div>

          {/* --- DESKTOP VIEW: Flip Showcase --- */}
          <div className="hidden md:flex flex-1 w-full justify-center items-center relative overflow-hidden -mt-12 min-h-[400px]">
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ transform: "scale(1.25)" }}
            >
              <SkillsFlipShowcase />
            </div>
          </div>

          {/* --- MOBILE VIEW: Infinite Marquee Rows (Fixed) --- */}
          <div className="md:hidden mt-10 mb-12 flex flex-col gap-5">
             <h3 className="text-center text-gray-500 text-xs font-bold uppercase tracking-[0.2em] mb-1">
                Core Tools
             </h3>
             {/* Left Moving Row - Slower Speed */}
             <MarqueeRow items={marqueeRow1} direction="left" speed={60} />
             {/* Right Moving Row - Slower Speed */}
             <MarqueeRow items={marqueeRow2} direction="right" speed={70} />
          </div>
          
          <div className="md:hidden h-20" />

        </PageTransition>
      </div>
    </div>
  );
};

export default TechStack;