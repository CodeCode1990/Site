// src/pages/Education.jsx

import React, { useState, useEffect, useRef, useLayoutEffect, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import {
  GraduationCap,
  Award,
  BookOpen,
  Calendar,
  ExternalLink,
  Star,
  FileCheck,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

// Import shared components (Assuming these exist based on reference)
import BlurText from "../components/BlurText";
import {
  MagicTitle,
  SectionDivider,
  PageTransition,
} from "../components/PortfolioComponents";
import { mockEducation, mockCertifications } from '../data/mock';

// --- Scroll Fade Component (From About.jsx) ---
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

// --- Blur Background Component (From About.jsx) ---
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

// --- Navigation Component (Modified to include Education) ---
const TopNavigation = () => {
  const location = useLocation();
  
  const navLinks = [
    { name: "About", path: "/about" },
    { name: "Education", path: "/education" }, // Added Education
    { name: "Projects", path: "/projects" },
    { name: "Experience", path: "/experience" },
    { name: "Tech Stack", path: "/techstack" },
    { name: "Timeline", path: "/timeline" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center py-6 pointer-events-none">
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
  );
};

// --- Utility: CountRoller (Preserved from original Education.jsx) ---
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

const Education = () => {
  const [activePhilosophyIndex, setActivePhilosophyIndex] = useState(0);
  const panelId = 'lp-desc-panel';

  // --- Data Definition for Interactive Section ---
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

      {/* Navigation */}
      <TopNavigation />

      {/* Main Masked Container */}
      <div 
        className="fixed inset-0 overflow-y-auto overflow-x-hidden hide-scrollbar"
        style={{
            maskImage: "linear-gradient(to bottom, transparent 0px, transparent 80px, black 150px, black 80%, transparent 95%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0px, transparent 80px, black 150px, black 80%, transparent 95%, transparent 100%)"
        }}
      >
        <PageTransition className="relative z-10 h-full w-full max-w-[1600px] mx-auto px-6 md:px-8 lg:px-8 pt-32 pb-[200px]">
            
            <ScrollFade className="mb-1">
                <BlurBackground className="mb-1 w-fit px-5 py-0.5 -ml-5">
                    <MagicTitle text="Education" size="xlarge" className="mb-0" />
                </BlurBackground>

                <BlurBackground className="px-5 py-1 -ml-5 w-fit mb-2">
                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white flex items-baseline gap-4 flex-wrap leading-none">
                    Learning <span className="text-cyan-400">Journey</span> &
                    <span className="inline-block min-w-[10ch]">
                        <BlurText
                            text="Growth"
                            delay={150}
                            animateBy="words"
                            direction="top"
                            className="text-green-400"
                        />
                    </span>
                    </h2>
                </BlurBackground>

                <BlurBackground className="w-full p-4 md:p-6 -ml-5 mt-1">
                    <div className="text-xl md:text-2xl text-gray-200 font-normal leading-relaxed max-w-4xl">
                        <p>
                        A comprehensive overview of my <span className="text-cyan-400 font-bold">academic background</span>, 
                        certifications, and continuously evolving expertise in data science and analytics.
                        </p>
                    </div>
                </BlurBackground>
            </ScrollFade>

            <BlurBackground className="py-1 px-5 -mx-5 -my-6">
                <SectionDivider />
            </BlurBackground>

            {/* --- SECTION 1: Academic Timeline --- */}
            <ScrollFade>
                <BlurBackground className="mb-1 w-fit px-5 py-0.5 -ml-5">
                    <MagicTitle text="Academic Background" size="large" className="mb-0" />
                </BlurBackground>

                <div className="space-y-4 -mx-5 mt-2">
                    {mockEducation.map((edu, index) => (
                        <BlurBackground key={index} className="p-6 transition-all duration-300 hover:bg-white/5">
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
                                            <GraduationCap size={24} />
                                        </div>
                                        <h3 className="text-2xl md:text-3xl font-bold text-white">{edu.degree}</h3>
                                    </div>
                                    <p className="text-cyan-300 text-lg font-medium">{edu.institution}</p>
                                    <p className="text-gray-400 text-sm mt-1">{edu.location}</p>
                                </div>
                                
                                <div className="md:text-right shrink-0">
                                    <div className="flex items-center md:justify-end gap-2 text-gray-300 font-mono text-sm mb-2">
                                        <Calendar size={14} />
                                        <span>{edu.period}</span>
                                    </div>
                                    {edu.gpa && (
                                        <div className="inline-block px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 text-sm font-bold">
                                            GPA: {edu.gpa}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="mt-4 text-lg text-gray-300 leading-relaxed border-l-2 border-white/10 pl-4">
                                {edu.description}
                            </div>

                            {edu.achievements && (
                                <div className="mt-4 pl-4">
                                    <h4 className="text-sm font-bold text-cyan-400 uppercase tracking-wider mb-2">Key Achievements</h4>
                                    <ul className="space-y-2">
                                        {edu.achievements.map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-gray-400 text-sm md:text-base">
                                                <CheckCircle2 className="w-4 h-4 text-cyan-500/50 mt-1 shrink-0" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </BlurBackground>
                    ))}
                </div>
            </ScrollFade>

            <div className="h-10" />

            {/* --- SECTION 2: Certifications --- */}
            <ScrollFade>
                <BlurBackground className="mb-1 w-fit px-5 py-0.5 -ml-5">
                    <MagicTitle text="Certifications" size="large" className="mb-0" />
                </BlurBackground>

                <BlurBackground className="p-4 md:p-6 -mx-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                        {mockCertifications.map((cert, index) => (
                             <motion.div
                             key={index}
                             whileHover={{ y: -5 }}
                             transition={{ type: "spring", stiffness: 260, damping: 18 }}
                             className={`
                             group relative flex flex-col justify-between rounded-xl border 
                             bg-gradient-to-br from-green-500/10 to-cyan-500/5 border-green-500/20 p-5 
                             shadow-lg transition-all duration-300 hover:border-cyan-400/40 hover:bg-gradient-to-br hover:from-green-500/20 hover:to-cyan-500/10
                             `}
                         >
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2 rounded-lg bg-black/30 text-green-400 border border-white/5">
                                    <Award className="w-6 h-6" />
                                </div>
                                <div className="text-xs font-mono text-gray-400 bg-black/20 px-2 py-1 rounded">
                                    {cert.date}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                                    {cert.name}
                                </h3>
                                <p className="text-green-400/80 font-medium text-sm mb-3">{cert.issuer}</p>
                                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                                    {cert.description}
                                </p>
                            </div>

                            <div className="mt-auto pt-4 border-t border-white/5 flex flex-wrap gap-2 justify-between items-center">
                                <div className="flex gap-2">
                                    {(cert.skills || []).slice(0,3).map((skill, idx) => (
                                        <span key={idx} className="text-[10px] uppercase font-bold tracking-wider text-gray-400 bg-white/5 px-2 py-1 rounded">
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

            <div className="h-10" />

            {/* --- SECTION 3: Continuous Learning (The Interactive Split) --- */}
            <ScrollFade>
                <BlurBackground className="mb-1 w-fit px-5 py-0.5 -ml-5">
                    <MagicTitle text="Continuous Learning" size="large" className="mb-0" />
                </BlurBackground>

                <BlurBackground className="p-0 -mx-5 overflow-hidden">
                    <div className="grid lg:grid-cols-[300px_1fr] min-h-[400px]">
                        
                        {/* Left Side: Buttons */}
                        <div className="bg-black/20 p-4 space-y-2 border-r border-white/5">
                            {philosophyItems.map((item, idx) => {
                                const isActive = activePhilosophyIndex === idx;
                                const Icon = item.icon;
                                return (
                                    <motion.button
                                        key={idx}
                                        onClick={() => setActivePhilosophyIndex(idx)}
                                        className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl text-left transition-all duration-300 relative overflow-hidden group
                                            ${isActive ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'}
                                        `}
                                    >
                                        {isActive && (
                                            <motion.div 
                                                layoutId="activePhil"
                                                className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-400"
                                            />
                                        )}
                                        <span className={`p-2 rounded-lg ${isActive ? item.colorClasses.split(' ')[0] + ' bg-black/40' : 'text-gray-500 bg-white/5'}`}>
                                            <Icon size={20} />
                                        </span>
                                        <span className="font-bold text-sm md:text-base">{item.label}</span>
                                    </motion.button>
                                );
                            })}
                        </div>

                        {/* Right Side: Content Area */}
                        <div className="relative p-6 md:p-10 flex flex-col justify-center bg-gradient-to-br from-white/5 to-transparent">
                             <AnimatePresence mode="wait">
                                <motion.div
                                    key={activePhilosophyIndex}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="w-full"
                                >
                                    {/* Header with Counter */}
                                    <div className="mb-6 pb-6 border-b border-white/10">
                                        <div className={`text-4xl md:text-5xl font-black mb-2 flex items-baseline gap-3 ${activePhilosophy.colorClasses.split(' ')[0]}`}>
                                            {typeof activePhilosophy.countTarget === 'number' && (
                                                <CountRoller target={activePhilosophy.countTarget} />
                                            )}
                                            <span className="text-2xl md:text-3xl text-white">
                                                {activePhilosophy.headingSuffix}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Bullets */}
                                    <ul className="space-y-4">
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
                                                    <div className="flex items-start gap-3 text-lg text-gray-300">
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
                                                            
                                                            {/* Nested Children */}
                                                            {children && (
                                                                <ul className="mt-3 ml-2 space-y-2 border-l border-white/10 pl-4">
                                                                    {children.map((child, j) => (
                                                                        <li key={j} className="text-sm text-gray-500 font-mono">
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

            <div className="h-[100px] w-full pointer-events-none" />

        </PageTransition>
      </div>
    </div>
  );
};

export default Education;