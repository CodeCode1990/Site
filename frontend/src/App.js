// src/App.js

import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "./components/ui/toaster";
import Footer from "./Footer";
import HomeButton from "./components/HomeButton";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import TechStack from "./pages/TechStack";
import Timeline from "./pages/Timeline";
import Certifications from "./pages/Certifications";
import Connect from "./pages/Connect";

// Components
import InteractiveBackground from "./components/InteractiveBackground";
import PageTransition, { TransitionProvider } from "./components/PageTransition";
import ScrollToTop from "./components/ScrollTotop";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Main Pages */}
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/projects" element={<PageTransition><Projects /></PageTransition>} />
        <Route path="/techstack" element={<PageTransition><TechStack /></PageTransition>} />
        <Route path="/timeline" element={<PageTransition><Timeline /></PageTransition>} />
        <Route path="/certifications" element={<PageTransition><Certifications /></PageTransition>} />
        <Route path="/connect" element={<PageTransition><Connect /></PageTransition>} />
        
        {/* Legacy route redirects */}
        <Route path="/education" element={<PageTransition><Timeline /></PageTransition>} />
        <Route path="/experience" element={<PageTransition><Timeline /></PageTransition>} />
        
        {/* 404 Fallback */}
        <Route path="*" element={<PageTransition><Home /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <div className="App min-h-screen bg-black text-white relative overflow-x-hidden flex flex-col">
      <InteractiveBackground />
      <BrowserRouter basename="/Site">
        <ScrollToTop />
        <TransitionProvider>
          {/* Home Button - Shows on all pages except Home */}
          <HomeButton />
          
          {/* Main Content */}
          <main className="relative z-10 flex-1">
            <AnimatedRoutes />
          </main>
          
          {/* Footer - Always visible */}
          <Footer />
          <Toaster />
        </TransitionProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;