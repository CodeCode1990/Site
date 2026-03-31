// src/pages/Projects.jsx

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
  ExternalLink,
  Github,
  BarChart3,
  Brain,
  Calendar,
  Gamepad2,
  Grid3X3,
  Bike,
  Coins,
  Activity,
  ChevronLeft,
  ChevronRight,
  X,
  Menu
} from "lucide-react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { mockProjects } from "../data/mock";
import { SectionDivider, PageTransition } from "../components/PortfolioComponents";

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

const Projects = () => {
  const [filter, setFilter] = useState("all");
  const [hoveredProject, setHoveredProject] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); 
  const CARDS_VISIBLE = 3; 

  useEffect(() => {
    setCurrentIndex(0);
  }, [filter]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelectedProject(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const categories = [
    { id: "all", name: "All Projects", count: mockProjects.length },
    {
      id: "dashboarding",
      name: "Dashboarding",
      count: mockProjects.filter((p) => p.category.includes("dashboarding")).length,
    },
    {
      id: "data-analysis",
      name: "Data Analysis",
      count: mockProjects.filter((p) => p.category.includes("data-analysis")).length,
    },
    {
      id: "automation-bi",
      name: "Automated Dashboards (BI)",
      count: mockProjects.filter((p) => p.category.includes("automation-bi")).length,
    },
    {
      id: "python-minigames",
      name: "Python MiniGames",
      count: mockProjects.filter((p) => p.category.includes("python-minigames")).length,
    }
  ];

  let filteredProjects =
    filter === "all"
      ? mockProjects
      : mockProjects.filter((project) => project.category.includes(filter));

  const customOrder = [
    "Pharma Sales Analysis Project",
    "FDA CAERS Data Analysis",
    "Ride Analysis Project",
    "War Cards Game",
    "Tic Tac Toe Game",
    "Automated Banking Transaction Dashboard"
  ];

  filteredProjects.sort((a, b) => {
    const indexA = customOrder.indexOf(a.title);
    const indexB = customOrder.indexOf(b.title);
    return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
  });

  const nextSlide = () => {
    if (currentIndex + CARDS_VISIBLE < filteredProjects.length) {
      setDirection(1);
      setCurrentIndex(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(prev => prev - 1);
    }
  };

  const getCategoryColor = (cat) => {
    switch (cat) {
      case "python-minigames": return "text-orange-400 border-orange-400/30 bg-orange-400/10";
      case "data-analysis": return "text-cyan-400 border-cyan-400/30 bg-cyan-400/10";
      case "automation-bi": return "text-green-400 border-green-400/30 bg-green-400/10";
      case "dashboarding": return "text-purple-400 border-purple-400/30 bg-purple-400/10";
      default: return "text-gray-400 border-gray-400/30 bg-gray-400/10";
    }
  };

  const getProjectIcon = (title) => {
    switch (title) {
      case "Pharma Sales Analysis Project": return Activity; 
      case "Tic Tac Toe Game": return Grid3X3;
      case "War Cards Game": return Gamepad2;
      case "FDA CAERS Data Analysis": return BarChart3;
      case "Ride Analysis Project": return Bike;
      case "Automated Banking Transaction Dashboard": return Coins;
      default: return Brain;
    }
  };

  const getCardAnimation = (title, hoveredProject, projectId) => {
    const isActive = hoveredProject === projectId;
    switch (title) {
      case "Pharma Sales Analysis Project": 
        return { animate: isActive ? { scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] } : { scale: 1, rotate: 0 }, transition: { duration: 1 } };
      case "Tic Tac Toe Game":
        return { animate: isActive ? { rotate: [0, 5, -5, 0], scale: 1.3 } : { rotate: 0, scale: 1 }, transition: { duration: 0.8 } };
      case "War Cards Game":
        return { animate: isActive ? { rotateY: [0, 180, 0], scale: [1, 1.1, 1] } : { rotateY: 0, scale: 1 }, transition: { duration: 0.8 } };
      case "FDA CAERS Data Analysis":
        return { animate: isActive ? { y: [-5, 5, -5], scale: 1.2 } : { y: 0, scale: 1 }, transition: { duration: 1, repeat: Infinity, repeatType: "mirror" } };
      case "Ride Analysis Project":
        return { animate: isActive ? { rotate: 360, scale: [1, 1.2, 1] } : { rotate: 0, scale: 1 }, transition: { duration: 1 } };
      case "Automated Banking Transaction Dashboard":
        return { animate: isActive ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] } : { scale: 1, rotate: 0 }, transition: { duration: 1 } };
      default:
        return { animate: { scale: 1 }, transition: { duration: 0 } };
    }
  };

  const visibleProjects = filteredProjects.slice(currentIndex, currentIndex + CARDS_VISIBLE);

  const ProjectCard = ({ project, isMobile }) => {
      const Icon = getProjectIcon(project.title);
      const anim = getCardAnimation(project.title, hoveredProject, project.id);
      
      return (
        <Card
        className="bg-gray-900/40 backdrop-blur-md border-gray-800/50 overflow-hidden hover:bg-gray-800/60 hover:border-cyan-500/30 transition-all duration-300 group h-full min-h-[550px] md:min-h-[600px] flex flex-col cursor-pointer rounded-2xl border"
        onClick={() => setSelectedProject(project)}
        >
            <div className="relative h-28 md:h-32 bg-gradient-to-br from-black/60 to-gray-900/60 flex items-center justify-center overflow-hidden border-b border-white/5 shrink-0">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-green-500/10 opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                <motion.div {...(isMobile ? {} : anim)}>
                    <Icon className="w-14 h-14 md:w-16 md:h-16 text-cyan-400/80 group-hover:text-cyan-400 z-10 transition-colors duration-300" />
                </motion.div>
            </div>

            <div className="p-6 md:p-8 flex-1 flex flex-col">
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.category.map((cat, idx) => (
                        <Badge key={idx} className={`font-bold text-[10px] md:text-xs uppercase tracking-wider border ${getCategoryColor(cat)}`}>
                            {cat.replace("-", " ")}
                        </Badge>
                    ))}
                </div>

                <h3 className="text-2xl md:text-3xl font-black text-white mb-3 group-hover:text-cyan-400 transition-colors line-clamp-2">
                    {project.title}
                </h3>

                <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6 flex-1 font-medium">
                    {project.description}
                </p>

                <div className="flex items-center space-x-2 text-xs md:text-sm text-gray-500 mb-4 font-medium shrink-0">
                    <Calendar className="w-4 h-4" />
                    <span>{project.date}</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-6 shrink-0">
                    {project.technologies.slice(0, 4).map((tech, idx) => (
                        <span key={idx} className="px-3 py-1 bg-white/5 text-gray-200 text-xs md:text-sm rounded-md font-bold border border-white/5">
                        {tech}
                        </span>
                    ))}
                </div>

                <div className="flex space-x-3 mt-auto shrink-0">
                <Button
                    size="sm"
                    className="flex-1 h-10 md:h-12 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm md:text-base font-bold tracking-wide transition-all duration-300 hover:bg-cyan-400 hover:text-black hover:scale-105"
                >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    DETAILS
                </Button>

                {project.githubUrl && (
                    <Button
                        size="sm"
                        variant="outline"
                        className="h-10 w-10 md:h-12 md:w-12 p-0 border-gray-700 bg-transparent text-gray-400 transition-all duration-300 hover:bg-white hover:text-black hover:border-white hover:scale-105"
                        onClick={(e) => { e.stopPropagation(); window.open(project.githubUrl, "_blank"); }}
                    >
                        <Github className="w-5 h-5 md:w-6 md:h-6" />
                    </Button>
                )}
                </div>
            </div>
        </Card>
      );
  }

  return (
    <div className="relative h-screen w-full font-['Red_Hat_Display'] selection:bg-cyan-500/30 overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@400;500;700;900&display=swap');
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Navigation */}
      <TopNavigation />

      <div 
        className="fixed inset-0 overflow-y-auto overflow-x-hidden hide-scrollbar"
        style={{
            maskImage: "linear-gradient(to bottom, transparent 0px, transparent 80px, black 150px, black 80%, transparent 95%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0px, transparent 80px, black 150px, black 80%, transparent 95%, transparent 100%)"
        }}
      >
        <PageTransition className="relative z-10 h-full w-full max-w-[1800px] mx-auto px-4 md:px-8 lg:px-8 pt-28 md:pt-32 pb-[200px] md:pb-[450px]">
          
          <ScrollFade className="mb-2">
            <BlurBackground className="px-5 py-2 -ml-2 md:-ml-5 w-fit -mb-2">
                <h2 className="text-3xl md:text-6xl font-black text-white">
                  Featured <span className="text-cyan-400">Projects</span>
                </h2>
            </BlurBackground>

            <BlurBackground className="w-full p-4 md:p-6 -ml-2 md:-ml-5 mt-0 mb-0">
                <p className="text-lg md:text-2xl text-gray-200 font-normal leading-relaxed max-w-4xl">
                  Explore my data-driven projects that showcase the power of analytics
                  in solving complex business challenges and driving innovation.
                </p>
            </BlurBackground>
          </ScrollFade>

          <BlurBackground className="py-0 px-5 -mx-4 md:-mx-5 -my-8">
              <SectionDivider />
          </BlurBackground>

          <ScrollFade>
            <BlurBackground className="p-2 -mx-4 md:-mx-5 mt-2 mb-2 w-full flex justify-center">
              <div className="flex overflow-x-auto md:flex-wrap md:justify-center gap-2 md:gap-4 px-2 pb-2 md:pb-0 hide-scrollbar snap-x">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setFilter(category.id)}
                    className={`flex-shrink-0 snap-center px-4 py-2 md:px-6 md:py-3 rounded-full font-bold text-sm md:text-base transition-all duration-300 border whitespace-nowrap ${
                      filter === category.id
                        ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-400"
                        : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {category.name} <span className="opacity-60 text-xs md:text-sm ml-1">({category.count})</span>
                  </button>
                ))}
              </div>
            </BlurBackground>

            <BlurBackground className="p-2 -mx-4 md:-mx-5 min-h-[600px] md:min-h-[700px] flex items-center justify-center relative">
                
                {/* MOBILE VIEW LIST */}
                <div className="md:hidden flex w-full overflow-x-auto gap-4 px-4 pb-4 snap-x snap-mandatory hide-scrollbar">
                    {filteredProjects.map((project) => (
                        <div key={project.id} className="min-w-[85vw] snap-center">
                            <ProjectCard project={project} isMobile={true} />
                        </div>
                    ))}
                    <div className="min-w-[4vw] snap-center" />
                </div>

                {/* DESKTOP VIEW CAROUSEL */}
                <div className="hidden md:flex w-full items-center justify-center relative">
                    <motion.button 
                        onClick={prevSlide}
                        disabled={currentIndex === 0}
                        animate={{ scale: [1, 1.15, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className={`absolute left-4 z-30 p-3 rounded-full border border-white/10 bg-black/50 backdrop-blur-md transition-colors duration-300 ${
                            currentIndex === 0 ? "opacity-30 cursor-not-allowed" : "opacity-100 hover:bg-cyan-500/20 hover:text-cyan-400"
                        }`}
                    >
                        <ChevronLeft className="w-8 h-8" />
                    </motion.button>

                    <div className="flex gap-8 lg:gap-10 w-full overflow-hidden justify-center items-stretch px-20">
                    <AnimatePresence mode="popLayout" initial={false}>
                        {visibleProjects.map((project) => (
                            <motion.div
                                layout
                                key={project.id}
                                initial={{ opacity: 0, x: direction > 0 ? 100 : -100, scale: 0.9 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, x: direction > 0 ? -100 : 100, scale: 0.9 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                onMouseEnter={() => setHoveredProject(project.id)}
                                onMouseLeave={() => setHoveredProject(null)}
                                className="w-full md:w-1/2 lg:w-1/3 min-w-[380px] max-w-[480px]"
                            >
                                <ProjectCard project={project} isMobile={false} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    </div>

                    <motion.button 
                        onClick={nextSlide}
                        disabled={currentIndex + CARDS_VISIBLE >= filteredProjects.length}
                        animate={{ scale: [1, 1.15, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className={`absolute right-4 z-30 p-3 rounded-full border border-white/10 bg-black/50 backdrop-blur-md transition-colors duration-300 ${
                            currentIndex + CARDS_VISIBLE >= filteredProjects.length ? "opacity-30 cursor-not-allowed" : "opacity-100 hover:bg-cyan-500/20 hover:text-cyan-400"
                        }`}
                    >
                        <ChevronRight className="w-8 h-8" />
                    </motion.button>
                </div>

            </BlurBackground>
          </ScrollFade>

          <div className="h-[200px] w-full pointer-events-none" />

        </PageTransition>

        {/* --- MODAL OVERLAY --- */}
        <AnimatePresence>
            {selectedProject && (
            <motion.div
                className="fixed inset-0 z-[999] flex items-center justify-center p-0 md:p-4 bg-black/95 backdrop-blur-md" 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
            >
                <motion.div
                    className="bg-[#0a0a0a] w-full h-full md:h-auto md:max-h-[90vh] md:max-w-6xl md:rounded-2xl md:border md:border-white/10 shadow-2xl overflow-hidden flex flex-col relative"
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                >
                
                {/* 1. STICKY HEADER WITH CLOSE BUTTON */}
                <div className="sticky top-0 z-[120] flex items-center justify-end px-4 py-3 bg-[#0a0a0a] border-b border-white/10">
                    <button
                        onClick={() => setSelectedProject(null)}
                        className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all border border-white/10"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* SCROLLABLE CONTENT AREA */}
                <div className="flex-1 overflow-y-auto p-5 md:p-12">
                    
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-4 pt-4">
                        {selectedProject.title}
                    </h2>
                    
                    <div className="flex flex-wrap gap-2 mb-8">
                        {selectedProject.category.map((cat, idx) => (
                            <Badge key={idx} className={`font-bold text-sm md:text-base border ${getCategoryColor(cat)}`}>
                                {cat.replace("-", " ")}
                            </Badge>
                        ))}
                    </div>

                    {/* Image Gallery */}
                    {selectedProject.images && selectedProject.images.length > 0 && (
                        <div className="mb-6 md:mb-8 flex space-x-4 overflow-x-auto pb-4 hide-scrollbar snap-x">
                        {selectedProject.images.map((imgSrc, idx) => (
                            <div
                            key={idx}
                            className="flex-shrink-0 w-[85vw] md:w-96 aspect-video rounded-xl overflow-hidden border border-white/10 shadow-lg snap-center"
                            >
                            <img
                                src={imgSrc}
                                alt={`${selectedProject.title} snapshot ${idx + 1}`}
                                className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
                            />
                            </div>
                        ))}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 pb-8">
                        <div className="md:col-span-2 space-y-6 md:space-y-8">
                            <div>
                                <h3 className="text-xl md:text-2xl font-bold text-cyan-400 mb-3">Overview</h3>
                                <p className="text-gray-300 leading-relaxed text-lg md:text-xl font-medium">
                                    {selectedProject.description}
                                </p>
                            </div>

                            {/* --- CONDITIONAL BLOCKS --- */}

                            {/* 1. FDA CAERS Data Analysis */}
                            {selectedProject.title === "FDA CAERS Data Analysis" && (
                                <div className="space-y-6">
                                    {/* Specifications Box */}
                                    <div className="bg-white/5 border border-white/10 rounded-xl p-5 md:p-6">
                                        <h3 className="text-cyan-400 font-bold text-lg mb-4 uppercase tracking-wider border-b border-white/10 pb-3">
                                            Project Specifications
                                        </h3>
                                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300 text-base md:text-lg">
                                            <li><strong className="text-white">Platform:</strong> Jupyter Notebook</li>
                                            <li><strong className="text-white">Dataset:</strong> FDA CAERS (221,000+ reports)</li>
                                            <li><strong className="text-white">Language:</strong> Python</li>
                                            <li><strong className="text-white">Libraries:</strong> Pandas, NumPy, Matplotlib, Scikit-learn</li>
                                        </ul>
                                    </div>

                                    {/* Findings Box */}
                                    <div className="bg-white/5 border border-white/10 rounded-xl p-5 md:p-6">
                                        <h3 className="text-cyan-400 font-bold text-lg mb-4 uppercase tracking-wider border-b border-white/10 pb-3">
                                            Key Findings & Insights
                                        </h3>
                                        <div className="space-y-5 text-gray-300 text-base md:text-lg">
                                            <div className="leading-relaxed">
                                                <strong className="text-white block mb-1">👥 Demographic Patterns:</strong> 
                                                Females accounted for nearly 70% of reported cases. Fatalities were heavily concentrated in adult and elderly age groups, making up 75% of all deaths. The median reported patient age was 52.
                                            </div>
                                            <div className="leading-relaxed">
                                                <strong className="text-white block mb-1">💊 Product Exposure:</strong> 
                                                Analyzed over 77,000 unique products. Everyday items like Multivitamins, Fish Oil, and cosmetics dominated the list. This reflects widespread usage rather than exceptional danger.
                                            </div>
                                            <div className="leading-relaxed">
                                                <strong className="text-white block mb-1">⚕️ Outcomes & Severity:</strong> 
                                                Roughly 64% of all reported outcomes were considered serious (death, life-threatening, or hospitalization), showing the database is skewed toward significant incidents.
                                            </div>
                                            <div className="leading-relaxed">
                                                <strong className="text-white block mb-1">🧠 Predictive Modeling:</strong> 
                                                Trained a logistic regression model to predict serious outcomes based on age and sex (Accuracy: ~63%, ROC-AUC: 0.63). It showed stronger capability identifying serious cases than mild ones.
                                            </div>
                                        </div>
                                    </div>

                                    {/* Conclusion Box */}
                                    <div className="bg-white/5 border border-white/10 rounded-xl p-5 md:p-6">
                                        <h3 className="text-cyan-400 font-bold text-lg mb-4 uppercase tracking-wider border-b border-white/10 pb-3">
                                            Conclusion & Limitations
                                        </h3>
                                        <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-5">
                                            This analysis successfully demonstrates a full data science workflow. It reveals that severe outcomes dominate FDA submissions, primarily affecting adults and females. However, demographic and product predictors alone only modestly explain severity, indicating multifactorial causes.
                                        </p>
                                        <div className="text-sm md:text-base text-gray-400 bg-black/40 p-4 rounded-lg border border-white/5">
                                            <strong className="text-gray-300 block mb-1">Limitations:</strong> 
                                            Incomplete demographic data, self-reported associations (not medically verified causality), and inconsistent product naming conventions limited precise grouping and predictive power.
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* 2. Ride Analysis Project */}
                            {selectedProject.title === "Ride Analysis Project" && (
                                <div className="bg-white/5 border border-white/10 rounded-xl p-5 md:p-6">
                                <h3 className="text-cyan-400 font-bold text-base mb-4 uppercase tracking-wider">
                                    Key Highlights
                                </h3>
                                <ul className="space-y-3">
                                    {[
                                        "Unioned multiple monthly datasets in SQL for unified analysis",
                                        "Created ride-length categories and time-based KPIs",
                                        "Designed interactive Tableau dashboard showing rider behavior",
                                        "Compared Member vs. Casual riders across seasons and vehicle types"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start text-gray-300 text-base md:text-lg font-medium">
                                            <span className="mr-3 text-cyan-500 mt-1">•</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                                </div>
                            )}

                            {/* 3. Pharma Sales Analysis Project */}
                            {selectedProject.title === "Pharma Sales Analysis Project" && (
                                <div className="bg-white/5 border border-white/10 rounded-xl p-5 md:p-6">
                                <h3 className="text-cyan-400 font-bold text-lg mb-4 uppercase tracking-wider border-b border-white/10 pb-3">
                                    Key Findings & Strategic Recommendations
                                </h3>
                                <div className="space-y-5 text-gray-300 text-base md:text-lg">
                                    <div className="leading-relaxed">
                                        <strong className="text-white block mb-1">🚨 The Churn Crisis (Phase III):</strong> 
                                        The brand acquired ~26,000 new patients but lost nearly the same amount (66% churn metric). This "leaky bucket" is the primary driver of the long-term revenue plateau.
                                    </div>
                                    <div className="leading-relaxed">
                                        <strong className="text-white block mb-1">📉 Volume Paradox (Phase I & II):</strong> 
                                        Glucashield’s unit cost ($3.67) is significantly lower than the category average. High sales volume (14.98M units) isn't translating to high margins, creating a volume trap.
                                    </div>
                                    <div className="leading-relaxed">
                                        <strong className="text-white block mb-1">🎯 The "Golden" Demographic:</strong> 
                                        A perfect bell curve peaking at Age 50–70 with zero gender correlation. High penetration observed in Atlantic Canada (St. John's and Charlottetown at ~48%).
                                    </div>
                                    <div className="pt-2">
                                        <strong className="text-cyan-400 block mb-2 font-bold">💡 Recommended Action Plan:</strong>
                                        <ul className="space-y-3">
                                            <li className="flex items-start">
                                                <span className="mr-3 text-cyan-500 mt-1.5">•</span>
                                                Launch a "Patient Adherence Program" specifically targeting the 50–70 age group to reduce the massive churn rate.
                                            </li>
                                            <li className="flex items-start">
                                                <span className="mr-3 text-cyan-500 mt-1.5">•</span>
                                                Re-deploy sales representatives from high-competition urban centers (like Ontario) to high-penetration Atlantic Canada regions.
                                            </li>
                                            <li className="flex items-start">
                                                <span className="mr-3 text-cyan-500 mt-1.5">•</span>
                                                Prioritize formulary negotiations with private payers, who drive $28M (52%) of category revenue.
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                </div>
                            )}
                        </div>

                        <div className="space-y-6 md:space-y-8">
                            <div>
                                <h3 className="text-base font-bold text-gray-500 uppercase tracking-wider mb-4">Technologies</h3>
                                <div className="flex flex-wrap gap-2">
                                    {selectedProject.technologies.map((tech, i) => (
                                    <span
                                        key={i}
                                        className="px-3 py-2 bg-white/5 text-gray-200 text-sm rounded-lg font-bold border border-white/10"
                                    >
                                        {tech}
                                    </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-base font-bold text-gray-500 uppercase tracking-wider mb-4">Impact</h3>
                                <div className="flex items-start text-gray-300 text-base font-medium">
                                    <BarChart3 className="w-5 h-5 mr-3 text-green-400 mt-0.5" />
                                    {selectedProject.impact}
                                </div>
                            </div>

                            <div className="pt-4 flex flex-col gap-4">
                                {selectedProject.githubUrl && (
                                    <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">
                                        <Button className="w-full bg-white text-black hover:bg-gray-200 font-bold h-12 md:h-14 text-base md:text-lg">
                                            <Github className="w-5 h-5 md:w-6 md:h-6 mr-3" /> View Code
                                        </Button>
                                    </a>
                                )}
                                {selectedProject.tableauUrl && (
                                    <a href={selectedProject.tableauUrl} target="_blank" rel="noopener noreferrer">
                                        <Button variant="outline" className="w-full border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 font-bold h-12 md:h-14 text-base md:text-lg">
                                            <BarChart3 className="w-5 h-5 md:w-6 md:h-6 mr-3" /> Tableau Dashboard
                                        </Button>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>

                    <button 
                        onClick={() => setSelectedProject(null)}
                        className="w-full py-4 mt-8 rounded-xl bg-white/5 border border-white/10 text-gray-300 font-bold text-lg hover:bg-white/10 transition-colors"
                    >
                        Close Project Details
                    </button>
                    
                    <div className="h-10" />
                </div>
                </motion.div>
            </motion.div>
            )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Projects;