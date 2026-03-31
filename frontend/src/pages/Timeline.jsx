// src/pages/Timeline.jsx

import React, { useState, useEffect, useRef, useLayoutEffect, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import {
  GraduationCap,
  Award,
  BookOpen,
  Star,
  FileCheck,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Briefcase,
  ExternalLink,
  Menu,
  X,
} from 'lucide-react';

// Import shared components
import {
  MagicTitle,
  PageTransition,
} from "../components/PortfolioComponents";
import { mockCertifications } from '../data/mock';

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

// --- Colored Divider Component ---
const ColoredSeparator = () => (
  <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent opacity-70" />
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

// --- Horizontal Timeline Picker (Hidden on Mobile) ---
const HorizontalTimelinePicker = ({ data, activeIndex, setActiveIndex }) => {
  return (
    <div className="hidden md:flex w-full items-center justify-between gap-2 select-none mb-1 font-['Red_Hat_Display']">
      <button 
        onClick={() => setActiveIndex(Math.max(0, activeIndex - 1))}
        disabled={activeIndex === 0}
        className="p-2 rounded-full bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all border border-white/10 shrink-0 z-20"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      <div className="relative flex-1 h-32 flex items-center px-6 md:px-12 overflow-hidden">
        <div className="relative w-full flex items-center justify-between">
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-white/20 rounded-full z-0" />
          <motion.div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-cyan-400 to-orange-400 z-0 origin-left rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: activeIndex / (data.length - 1) }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ width: '100%' }}
          />
          
          {data.map((item, index) => {
            const isActive = index === activeIndex;
            const isPastOrActive = index <= activeIndex;
            const isEdu = item.type === 'education';
            const activeColor = isEdu ? 'bg-cyan-400' : 'bg-orange-400';
            const ringColor = isEdu ? 'ring-cyan-400/50' : 'ring-orange-400/50';
            const textColor = isEdu ? 'text-cyan-400' : 'text-orange-400';

            return (
              <div 
                key={index} 
                className="relative z-10 flex flex-col items-center justify-center group cursor-pointer" 
                onClick={() => setActiveIndex(index)}
              >
                <motion.div
                  className={`w-3 h-3 md:w-4 md:h-4 rounded-full border-2 transition-all duration-300
                    ${isActive 
                        ? `${activeColor} border-transparent scale-125 ring-4 ${ringColor}` 
                        : isPastOrActive
                            ? 'bg-gray-200 border-transparent'
                            : 'bg-black border-gray-500 hover:border-white'
                    }
                  `}
                />
                <div className={`absolute top-6 text-sm md:text-lg font-mono font-bold whitespace-nowrap transition-colors duration-300 transform
                  ${isActive ? textColor : 'text-gray-500 group-hover:text-gray-300'}
                `}>
                  {item.start} - {item.end}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <button 
        onClick={() => setActiveIndex(Math.min(data.length - 1, activeIndex + 1))}
        disabled={activeIndex === data.length - 1}
        className="p-2 rounded-full bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all border border-white/10 shrink-0 z-20"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>
    </div>
  );
};

// --- Utility: CountRoller ---
const CountRoller = ({
  target = 7,
  seconds = 2.5,
  em = 1.3,
  nudgeY = 7,
  className = '',
}) => {
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
      style={{
        fontSize: `calc(1em * ${em})`,
        lineHeight: 1,
        height: '1em',
        top: nudgeY,
      }}
    >
      <motion.div
        key={rowH}
        initial={{ y: 0 }}
        animate={{ y: rowH ? -(target - 1) * rowH : 0 }}
        transition={{ duration: seconds, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-0 top-0 w-full will-change-transform"
      >
        {digits.map((d) => (
          <div
            key={d}
            style={{ height: rowH || '1em' }}
            className="flex items-center justify-center font-mono tabular-nums leading-none"
          >
            {d}
          </div>
        ))}
      </motion.div>
    </span>
  );
};

// --- Helpers for URLs ---
const BASE_URL = process.env.PUBLIC_URL || '/';
const assetUrl = (path) => `${BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;

const Timeline = () => {
  const timelineData = [
    { 
      start: 2021, 
      end: 2025, 
      title: "Job: Medical Coder / Junior Epidemiologist", 
      org: "Public Health Agency of Canada", 
      location: "Guelph, Ontario, Canada (Hybrid)", 
      type: "experience", 
      description: (
        <ul className="list-disc pl-5 space-y-2">
          <li>Analyzed large national datasets using <span className="text-orange-400 font-bold">Python, SQL, SAS and Excel</span> to generate descriptive trends and dashboards.</li>
          <li>Processed and coded AEFI (Adverse Events Following Immunization) case reports using <span className="text-orange-400 font-bold">MedDRA terminology</span>.</li>
          <li>Performed testing and validation activities for the <span className="text-orange-400 font-bold">Cloud CAEFISS</span> reporting system, suggesting operational improvements.</li>
          <li>Created and maintained SOPs, coding guidelines, and OneNote work guides to streamline onboarding and daily workflows.</li>
          <li>Used tools like <span className="text-orange-400 font-bold">Excel (Power Query, VBA)</span> and <span className="text-orange-400 font-bold">Tableau/Power BI</span> to automate reports and visualize surveillance data.</li>
        </ul>
      ) 
    },
    { 
      start: 2020, 
      end: 2021, 
      title: "Degree: Postgraduate Diploma", 
      org: "Academy of Applied Pharmaceutical Sciences (AAPS)", 
      location: "Canada (Remote)", 
      type: "education", 
      description: (
        <ul className="list-disc pl-5 space-y-2">
          <li>Intensive training in <span className="text-cyan-400 font-bold">Clinical Research, Pharmacovigilance & Regulatory Affairs</span>.</li>
          <li>Mastered <span className="text-cyan-400 font-bold">Health Canada and FDA</span> regulations and clinical trial protocols.</li>
          <li>Focused on advanced data management practices ensuring compliance with <span className="text-cyan-400 font-bold">Good Clinical Practice (GCP)</span>.</li>
        </ul>
      ) 
    },
    { 
      start: 2019, 
      end: 2022, 
      title: "Job: Sales Specialist", 
      org: "Best Buy Canada", 
      location: "Kitchener, Ontario, Canada", 
      type: "experience", 
      description: (
        <ul className="list-disc pl-5 space-y-2">
          <li>Analyzed weekly <span className="text-orange-400 font-bold">sales and product performance metrics</span> to understand trends and customer preferences.</li>
          <li>Used <span className="text-orange-400 font-bold">data insights</span> to refine product recommendations, reducing return rates and improving satisfaction.</li>
          <li>Supported <span className="text-orange-400 font-bold">inventory optimization</span> by reconciling stock levels and highlighting fast‑ and slow‑moving products.</li>
          <li>Leveraged <span className="text-orange-400 font-bold">CRM tools</span> to track sales performance and manage customer interactions effectively.</li>
        </ul>
      ) 
    },
    { 
      start: 2018, 
      end: 2019, 
      title: "Job: Pharmacovigilance Associate", 
      org: "Cliantha Research", 
      location: "Ahmedabad, Gujarat, India", 
      type: "experience", 
      description: (
        <ul className="list-disc pl-5 space-y-2">
          <li>Maintained the safety database, performed compliance checks, and conducted <span className="text-orange-400 font-bold">Quality Checks (QC)</span> on the integrity of ICSR data.</li>
          <li>Reviewed and processed ICSRs and ensured timely submission to Health Canada, FDA, and PvPI within regulatory timelines.</li>
          <li>Helped develop and qualify in-house PV software (Code PV), including participation in <span className="text-orange-400 font-bold">Operational and Performance Qualification (OQ/PQ)</span>.</li>
          <li>Prepared <span className="text-orange-400 font-bold">risk management plans (RMPs)</span> and <span className="text-orange-400 font-bold">aggregate reports</span> (PSUR, PADER, ASR).</li>
        </ul>
      ) 
    },
    { 
      start: 2016, 
      end: 2017, 
      title: "Job: Medical In-Charge Manager", 
      org: "Science City Chemist", 
      location: "Ahmedabad, Gujarat, India", 
      type: "experience", 
      description: (
        <ul className="list-disc pl-5 space-y-2">
          <li>Managed day‑to‑day pharmacy operations, including <span className="text-orange-400 font-bold">inventory management</span>, stock levels, and ordering schedules.</li>
          <li>Oversaw the disposal of expired drugs and ensured inventory was regularly updated and compliant with regulations.</li>
          <li>Handled billing and cash transactions accurately, maintaining reliable <span className="text-orange-400 font-bold">financial and inventory records</span>.</li>
          <li>Implemented digital tracking for <span className="text-orange-400 font-bold">supply chain logistics</span> to ensure availability of essential medicines.</li>
        </ul>
      ) 
    },
    { 
      start: 2014, 
      end: 2016, 
      title: "Job: Pharmacovigilance Sr. Process Associate", 
      org: "TATA Consultancy Services", 
      location: "Mumbai, Maharashtra, India", 
      type: "experience", 
      description: (
        <ul className="list-disc pl-5 space-y-2">
          <li>Processed <span className="text-orange-400 font-bold">ICSRs</span> from multiple sources including spontaneous reports, medical inquiries, clinical trials, and literature.</li>
          <li>Utilized <span className="text-orange-400 font-bold">Safety Databases (ARISg and Argus)</span> and <span className="text-orange-400 font-bold">MedDRA coding</span> to ensure regulatory compliance.</li>
          <li>Assessed causality between suspect drugs and adverse events according to Health Authority or MAH requirements.</li>
          <li>Triaged, validated, and prioritized information from various vendors to meet strict <span className="text-orange-400 font-bold">regulatory reporting timelines</span>.</li>
          <li>Contributed to <span className="text-orange-400 font-bold">data governance</span> and standardization efforts, helping to improve consistency of safety data.</li>
        </ul>
      ) 
    },
    { 
      start: 2012, 
      end: 2014, 
      title: "Degree: Master of Pharmacy", 
      org: "NIRMA University", 
      location: "Ahmedabad, Gujarat, India", 
      type: "education", 
      description: (
        <ul className="list-disc pl-5 space-y-2">
          <li>Specialized in <span className="text-cyan-400 font-bold">clinical research</span> and <span className="text-cyan-400 font-bold">pharmacology</span> with a focus on evidence-based research.</li>
          <li>Conducted <span className="text-cyan-400 font-bold">advanced statistical analysis</span> on experimental data for thesis work.</li>
          <li>Learned to create precise documentation and interpret clinical data for evaluating drug safety and efficacy.</li>
        </ul>
      ) 
    },
    { 
      start: 2007, 
      end: 2011, 
      title: "Degree: Bachelor of Pharmacy", 
      org: "Al-Ameen College of Pharmacy", 
      location: "Bangalore, Karnataka, India", 
      type: "education", 
      description: (
        <ul className="list-disc pl-5 space-y-2">
          <li>Gained core knowledge of pharmaceutics, pharmacology, medicinal chemistry, regulatory affairs, and pharmacy practice.</li>
          <li>Developed key research skills through laboratory experiments, gaining proficiency in data recording and scientific methodologies.</li>
          <li>Participated in seminars and workshops focused on emerging trends in pharmaceutical sciences.</li>
        </ul>
      ) 
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [activePhilosophyIndex, setActivePhilosophyIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // --- Refs for Mobile Scrolling ---
  const mobileScrollRef = useRef(null);

  // --- Intersection Observer to Update Counter on Swipe ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            if (!isNaN(index)) {
              setActiveIndex(index);
            }
          }
        });
      },
      { 
        root: mobileScrollRef.current, 
        threshold: 0.6 // Card must be 60% visible to trigger update
      }
    );

    const container = mobileScrollRef.current;
    if (container) {
      Array.from(container.children).forEach((child) => observer.observe(child));
    }

    return () => observer.disconnect();
  }, []);

  // Mobile scroll handlers
  const scrollLeft = () => {
    if (mobileScrollRef.current) {
      mobileScrollRef.current.scrollBy({ left: -window.innerWidth * 0.8, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (mobileScrollRef.current) {
      mobileScrollRef.current.scrollBy({ left: window.innerWidth * 0.8, behavior: 'smooth' });
    }
  };


  const verticalListRef = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    if (itemRefs.current[activeIndex]) {
      itemRefs.current[activeIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [activeIndex]);
  
  const philosophyItems = [
    {
      label: 'Micro‑Certs & Badges',
      headingSuffix: 'Micro‑Certs and Badges achieved',
      countTarget: 8,
      icon: Award,
      colorClasses: "text-amber-400 bg-amber-400/10 border-amber-400/20",
      rgb: '251,191,36', 
      bullets: [
        {
          text: 'Micro‑Certificates from Uppsala Monitoring Centre',
          href: assetUrl('Certificates/Pharmacovigilance-UMC-certificates.pdf'),
          children: [
            'Introduction to Pharmacovigilance',
            'Signal Detection',
            'Signal Assessment',
            'Causality Assessment',
            'Statistical Reasoning & Algorithms in Pharmacovigilance',
          ],
        },
        {
          text: 'Adverse Drug Reactions: Reporting makes medicines safer (SCOPE Joint Action)',
          href: assetUrl('Certificates/SCOPE_Certificate.pdf'),
        },
        {
          text: 'Tri‑Council Policy Statement: Ethical Conduct for Research Involving Humans (TCPS 2: CORE)',
          href: assetUrl('Certificates/tcps2_core_certificate.pdf'),
        },
        {
          text: 'TESTDOME‑SQL Badge',
          href: 'https://www.testdome.com/certificates/cd984a3167914741a13f528c34c35295',
          external: true,
        },
      ],
    },
    {
      label: 'SOPs & Review',
      headingSuffix: 'SOP Authored and Reviewed',
      countTarget: 15,
      icon: FileCheck,
      colorClasses: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
      rgb: '34,211,238',
      bullets: [
        'Authored 11 Standard Operating Procedures (SOPs) and Work Instructions (WIs) to ensure compliance with regulatory standards.',
        'Reviewed 7 SOP and WI documents, contributing to documentation creation and maintenance.'
      ],
    },
    {
      label: 'Audits Faced',
      headingSuffix: 'Audits Successfully Faced',
      countTarget: 3,
      icon: Star,
      colorClasses: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
      rgb: '74,222,128',
      bullets: [
        'Successfully managed and participated in 2 third-party vendor audits and 1 FDA pharmacovigilance Audit.',
        'Demonstrated strong adherence to regulatory standards through flawless audit outcomes.',
      ],
    },
    {
      label: 'Research & Reading',
      headingSuffix: 'Continuous Research',
      icon: BookOpen,
      colorClasses: "text-pink-400 bg-pink-400/10 border-pink-400/20",
      rgb: '96,165,250',
      bullets: [
        'Deep dives into papers, books, and technical blogs—turning theory into practical heuristics and reusable patterns.',
      ],
    },
  ];

  const activePhilosophy = philosophyItems[activePhilosophyIndex];

  return (
    <div className="relative h-screen w-full font-['Red_Hat_Display'] selection:bg-cyan-500/30 overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@400;500;700;900&display=swap');
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <TopNavigation />

      <div 
        className="fixed inset-0 overflow-y-auto overflow-x-hidden hide-scrollbar"
        style={{
            maskImage: "linear-gradient(to bottom, transparent 0px, transparent 100px, black 10px, black 70%, transparent 95%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0px, transparent 100px, black 150px, black 70%, transparent 95%, transparent 100%)"
        }}
      >
        <PageTransition className="relative z-10 h-full w-full max-w-[1900px] mx-auto px-4 md:px-8 lg:px-8 pt-28 md:pt-32 pb-[00px]">
            
            <ScrollFade>
                <BlurBackground className="mb-2 w-fit px-5 py-1 -ml-2 md:-ml-5">
                    <h2 className="text-3xl md:text-6xl font-black text-white font-['Red_Hat_Display']">
                        Experience <span className="text-green-300">Timeline</span>
                    </h2>
                </BlurBackground>
                
                <BlurBackground className="mb-2 w-fit px-5 py-0.5 -ml-2 md:-ml-5 -mt-2">
                     <p className="text-base md:text-lg text-white-400 font-lg font-['Red_Hat_Display']">
                        A comprehensive timeline of my academic background, career milestones, and continuously evolving expertise.
                    </p>
                </BlurBackground>

                <BlurBackground className="p-4 -mx-4 md:-mx-5 -mt-2 md:-mt-5">
                    
                    <HorizontalTimelinePicker 
                        data={timelineData} 
                        activeIndex={activeIndex} 
                        setActiveIndex={setActiveIndex} 
                    />

                    {/* Content Container */}
                    <div className="flex flex-col xl:flex-row gap-6 mt-2 md:mt-6 font-['Red_Hat_Display'] relative">
                        
                        {/* 2. Active Description Area */}
                        
                        {/* --- MOBILE VIEW: Horizontal Scrollable Cards with Side Arrows --- */}
                        <div className="md:hidden relative group">
                            
                            {/* Left Side Arrow (Overlay) */}
                            <button 
                                onClick={scrollLeft}
                                className="absolute -left-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/40 border border-white/10 text-white backdrop-blur-sm active:scale-95 transition-transform"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>

                            {/* Scrollable Container */}
                            <div 
                                ref={mobileScrollRef}
                                className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-4 pb-4 w-full"
                            >
                                {timelineData.map((current, index) => {
                                    const isEducation = current.type === "education";
                                    const gradientColors = isEducation
                                        ? "bg-gradient-to-b from-cyan-300 via-cyan-200 to-white"
                                        : "bg-gradient-to-b from-orange-300 via-orange-200 to-white";

                                    return (
                                        <div key={index} data-index={index} className="min-w-full snap-center space-y-3 px-1">
                                            <div className="flex items-center gap-3">
                                                <span className={`px-2 py-1 text-xs font-bold uppercase rounded text-black ${isEducation ? 'bg-cyan-400' : 'bg-orange-400'}`}>
                                                    {isEducation ? "Degree" : "Job"}
                                                </span>
                                                <span className="text-white font-bold text-2xl font-mono">{current.start} - {current.end}</span>
                                            </div>
                                            
                                            <h3 className={`text-3xl font-black tracking-tight text-transparent bg-clip-text pb-2 leading-tight ${gradientColors}`}>
                                                {current.title.split(":")[1]?.trim()}
                                            </h3>
                                            
                                            <div className="flex flex-col gap-0.5">
                                                <p className="text-lg font-bold text-white">{current.org}</p>
                                                <p className="text-sm font-medium text-gray-400 italic">{current.location}</p>
                                            </div>
                                            
                                            <div className="text-base leading-relaxed font-normal mt-4 text-gray-200 border-l-4 border-white/10 pl-5">
                                                {current.description}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Right Side Arrow (Overlay) */}
                            <button 
                                onClick={scrollRight}
                                className="absolute -right-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/40 border border-white/10 text-white backdrop-blur-sm active:scale-95 transition-transform"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>

                            {/* Mobile Counter (New Addition) */}
                            <div className="flex justify-center mt-2">
                                <div className="bg-black/40 border border-white/10 px-3 py-1 rounded-full text-xs font-mono font-bold text-gray-400">
                                    {activeIndex + 1} / {timelineData.length}
                                </div>
                            </div>
                        </div>


                        {/* --- DESKTOP VIEW: Single Animated Card --- */}
                        <div className="hidden md:flex flex-[2] flex-col justify-start min-h-[500px] md:min-h-0">
                             {(() => {
                                const normalizedIndex = ((activeIndex % timelineData.length) + timelineData.length) % timelineData.length;
                                const current = timelineData[normalizedIndex];
                                const isEducation = current.type === "education";
                                const gradientColors = isEducation
                                ? "bg-gradient-to-b from-cyan-300 via-cyan-200 to-white"
                                : "bg-gradient-to-b from-orange-300 via-orange-200 to-white";

                                const variants = {
                                    enter: (direction) => ({
                                        x: direction > 0 ? 50 : -50,
                                        opacity: 0
                                    }),
                                    center: {
                                        x: 0,
                                        opacity: 1
                                    },
                                    exit: (direction) => ({
                                        x: direction > 0 ? -50 : 50,
                                        opacity: 0
                                    })
                                };

                                return (
                                <AnimatePresence custom={direction} mode="wait">
                                    <motion.div
                                        key={current.start}
                                        custom={direction}
                                        variants={variants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        transition={{ duration: 0.3 }}
                                        className="space-y-3"
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className={`px-2 py-1 text-xs font-bold uppercase rounded text-black ${isEducation ? 'bg-cyan-400' : 'bg-orange-400'}`}>
                                                {isEducation ? "Degree" : "Job"}
                                            </span>
                                            <span className="text-white font-bold text-2xl font-mono">{current.start} - {current.end}</span>
                                        </div>
                                        
                                        <h3 className={`text-3xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text pb-2 leading-tight ${gradientColors}`}>
                                            {current.title.split(":")[1]?.trim()}
                                        </h3>
                                        
                                        <div className="flex flex-col gap-0.5">
                                            <p className="text-lg md:text-xl font-bold text-white">{current.org}</p>
                                            <p className="text-sm md:text-base font-medium text-gray-400 italic">{current.location}</p>
                                        </div>
                                        
                                        <div className="text-base md:text-xl leading-relaxed font-normal mt-4 text-gray-200 border-l-4 border-white/10 pl-5">
                                            {current.description}
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                                );
                            })()}
                        </div>

                        {/* Divider Line (Desktop Only) */}
                        <div className="hidden xl:block w-px bg-white/10 self-stretch mx-2" />
                        
                        {/* 4. Vertical Timeline List (Desktop Only - hidden on mobile) */}
                        <div className="hidden md:flex flex-1 flex-col h-full pr-2 mt-4 xl:mt-0">
                             <div className="bg-black/5 backdrop-blur-sm pb-2 mb-2 z-10 border-b border-white/10">
                                <h4 className="text-gray-300 font-bold uppercase tracking-widest text-sm mb-2">History</h4>
                                <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm font-bold">
                                    <div className="flex items-center gap-1.5 text-cyan-400">
                                        <GraduationCap size={16} />
                                        <span>Education</span>
                                    </div>
                                    <span className="text-white-600">/</span>
                                    <div className="flex items-center gap-1.5 text-orange-400">
                                        <Briefcase size={16} />
                                        <span>Experience</span>
                                    </div>
                                </div>
                             </div>
                             
                             <div 
                                ref={verticalListRef}
                                className="space-y-2 overflow-y-auto hide-scrollbar h-[350px] pr-1 scroll-smooth"
                             >
                                {timelineData.map((item, index) => {
                                    const isActive = index === activeIndex;
                                    const isEdu = item.type === "education";
                                    const colorClass = isEdu ? "text-cyan-400" : "text-orange-400";
                                    const bgHover = isEdu ? "hover:bg-cyan-500/10" : "hover:bg-orange-500/10";
                                    const bgActive = isEdu ? "bg-cyan-500/10 border-cyan-500/30" : "bg-orange-500/10 border-orange-500/30";
                                    const Icon = isEdu ? GraduationCap : Briefcase;

                                    return (
                                        <div 
                                            key={index}
                                            ref={(el) => itemRefs.current[index] = el}
                                            onClick={() => setActiveIndex(index)}
                                            className={`
                                                cursor-pointer p-3 rounded-lg transition-all duration-200 border border-transparent
                                                ${isActive ? `${bgActive} scale-[1.01]` : `${bgHover} border-white/5 bg-white/5 text-gray-400 opacity-70 hover:opacity-100`}
                                            `}
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className={`mt-1.5 shrink-0 ${isActive ? colorClass : 'text-gray-500'}`}>
                                                    <Icon size={18} />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className={`text-base md:text-lg font-bold leading-tight mb-1 ${isActive ? 'text-white' : ''}`}>
                                                        {item.title.split(":")[1]?.trim()}
                                                    </div>
                                                    <div className="flex flex-col gap-0.5">
                                                        <span className="text-sm md:text-lg font-medium opacity-80 leading-tight">{item.org}</span>
                                                        <span className="text-[13px] md:text-[15px] font-mono opacity-80 bg-black/10 px-1.5 py-0.5 rounded w-fit mt-1">
                                                            {item.start}-{item.end}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                             </div>
                        </div>

                    </div>
                </BlurBackground>
            </ScrollFade>

            <div className="py-4 -mx-5 px-5">
                <ColoredSeparator />
            </div>

            <ScrollFade>
                <BlurBackground className="mb-1 w-fit px-5 py-1 -ml-2 md:-ml-5">
                    <h2 className="text-3xl md:text-6xl font-black text-green-300 font-['Red_Hat_Display']">
                        Certifications
                    </h2>
                </BlurBackground>

                <BlurBackground className="p-4 -mx-4 md:-mx-5 ">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3 font-['Red_Hat_Display']">
                        {mockCertifications.map((cert, index) => (
                             <motion.div
                             key={index}
                             whileHover={{ y: -5 }}
                             transition={{ type: "spring", stiffness: 260, damping: 18 }}
                             className={`
                             group relative flex flex-col justify-between rounded-xl border 
                             bg-gradient-to-br from-green-500/10 to-cyan-500/5 border-green-500/20 p-4 
                             shadow-lg transition-all duration-300 hover:border-cyan-400/40 hover:bg-gradient-to-br hover:from-green-500/20 hover:to-cyan-500/10
                             `}
                         >
                            <div className="flex justify-between items-start mb-3">
                                <div className="p-1.5 rounded-lg bg-black/30 text-green-400 border border-white/5">
                                    <Award className="w-5 h-5" />
                                </div>
                                <div className="text-sm md:text-lg font-mono text-white-400 bg-black/20 px-2 py-1 rounded">
                                    {cert.date}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg md:text-xl font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                                    {cert.name}
                                </h3>
                                <p className="text-green-400/80 font-medium text-base md:text-lg mb-2">{cert.issuer}</p>
                                <p className="text-gray-200 text-base md:text-lg leading-normal mb-3">
                                    {cert.description}
                                </p>
                            </div>

                            <div className="mt-auto pt-3 border-t border-white/5 flex flex-wrap gap-2 justify-between items-center">
                                <div className="flex gap-2">
                                    {(cert.skills || []).slice(0,3).map((skill, idx) => (
                                        <span key={idx} className="text-[10px] md:text-[12px] uppercase font-bold tracking-wider text-gray-200 bg-white/5 px-2 py-1 rounded">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                                {cert.credentialUrl && (
                                    <a 
                                        href={cert.credentialUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1 text-xs font-bold text-cyan-400 hover:text-white transition-colors"
                                    >
                                        VERIFY <ExternalLink size={12} />
                                    </a>
                                )}
                            </div>
                         </motion.div>
                        ))}
                    </div>
                </BlurBackground>
            </ScrollFade>

            <div className="py-4 -mx-5 px-5">
                <ColoredSeparator />
            </div>

            <ScrollFade>
                <BlurBackground className="mb-1 w-fit px-5 py-1 -ml-2 md:-ml-5 pb-2">
                    <h2 className="text-3xl md:text-6xl font-black text-white font-['Red_Hat_Display']">
                        Continuous <span className="text-green-300">Learning</span>
                    </h2>
                </BlurBackground>

                <BlurBackground className="p-0 -mx-4 md:-mx-5 overflow-hidden">
                    <div className="grid md:grid-cols-[200px_1fr] lg:grid-cols-[250px_1fr] h-auto md:h-[450px] font-['Red_Hat_Display']">
                        
                        <div className="bg-black/20 p-3 space-y-1 md:space-y-1 border-r border-white/5 md:h-full overflow-y-auto hide-scrollbar grid grid-cols-2 md:grid-cols-1 gap-2 md:gap-0">
                            {philosophyItems.map((item, idx) => {
                                const isActive = activePhilosophyIndex === idx;
                                const Icon = item.icon;
                                return (
                                    <motion.button
                                        key={idx}
                                        onClick={() => setActivePhilosophyIndex(idx)}
                                        className={`w-full flex items-center gap-2 md:gap-3 px-3 py-3 rounded-xl text-left transition-all duration-300 relative overflow-hidden group
                                            ${isActive ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'}
                                        `}
                                    >
                                        {isActive && (
                                            <motion.div 
                                                layoutId="activePhil"
                                                className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-400"
                                            />
                                        )}
                                        <span className={`p-1.5 rounded-lg ${isActive ? item.colorClasses.split(' ')[0] + ' bg-black/40' : 'text-gray-500 bg-white/5'}`}>
                                            <Icon size={18} />
                                        </span>
                                        <span className="font-bold text-xs md:text-sm">{item.label}</span>
                                    </motion.button>
                                );
                            })}
                        </div>

                        <div className="relative p-6 md:p-8 flex flex-col justify-center bg-gradient-to-br from-white/5 to-transparent h-full md:overflow-y-auto">
                             <AnimatePresence mode="wait">
                                <motion.div
                                    key={activePhilosophyIndex}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="w-full"
                                >
                                    <div className="mb-4 pb-4 border-b border-white/10">
                                        <div className={`text-2xl md:text-4xl font-black mb-1 flex flex-col md:flex-row md:items-baseline gap-1 md:gap-3 ${activePhilosophy.colorClasses.split(' ')[0]}`}>
                                            {typeof activePhilosophy.countTarget === 'number' && (
                                                <CountRoller target={activePhilosophy.countTarget} />
                                            )}
                                            <span className="text-lg md:text-2xl text-white">
                                                {activePhilosophy.headingSuffix}
                                            </span>
                                        </div>
                                    </div>

                                    <ul className="space-y-3">
                                        {activePhilosophy.bullets.map((bullet, i) => {
                                            const isString = typeof bullet === 'string';
                                            const text = isString ? bullet : bullet.text;
                                            const href = !isString ? bullet.href : null;
                                            const children = !isString ? bullet.children : null;
                                            
                                            return (
                                                <motion.li 
                                                    key={i}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: i * 0.1 }}
                                                    className="group"
                                                >
                                                    <div className="flex items-start gap-3 text-sm md:text-base text-gray-300">
                                                        <ArrowRight className={`mt-1.5 w-4 h-4 shrink-0 ${activePhilosophy.colorClasses.split(' ')[0]} opacity-70`} />
                                                        <div className="flex-1">
                                                            {href ? (
                                                                <a 
                                                                    href={href} 
                                                                    target="_blank" 
                                                                    rel="noopener noreferrer"
                                                                    className="hover:text-cyan-400 transition-colors border-b border-gray-700 hover:border-cyan-400 pb-0.5"
                                                                >
                                                                    {text}
                                                                </a>
                                                            ) : (
                                                                <span>{text}</span>
                                                            )}
                                                            
                                                            {children && (
                                                                <ul className="mt-2 ml-2 space-y-1 border-l border-white/10 pl-4">
                                                                    {children.map((child, j) => (
                                                                        <li key={j} className="text-xs md:text-sm text-gray-500 font-mono">
                                                                            {child}
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            )}
                                                        </div>
                                                    </div>
                                                </motion.li>
                                            )
                                        })}
                                    </ul>

                                </motion.div>
                             </AnimatePresence>
                        </div>
                    </div>
                </BlurBackground>
            </ScrollFade>

            <div className="h-[200px] w-full pointer-events-none" />

        </PageTransition>
      </div>
    </div>
  );
};

export default Timeline;