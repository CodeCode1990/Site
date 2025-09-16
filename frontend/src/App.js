import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "./components/ui/toaster";
import Header from "./components/Header";
import Footer from "./Footer";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Education from "./pages/Education";
import Connect from "./pages/Connect";
import InteractiveBackground from "./components/InteractiveBackground";
import PageTransition from "./components/PageTransition";

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <PageTransition>
            <Home />
          </PageTransition>
        } />
        <Route path="/projects" element={
          <PageTransition>
            <Projects />
          </PageTransition>
        } />
        <Route path="/education" element={
          <PageTransition>
            <Education />
          </PageTransition>
        } />
        <Route path="/connect" element={
          <PageTransition>
            <Connect />
          </PageTransition>
        } />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <div className="App min-h-screen bg-black text-white relative overflow-x-hidden">
      <InteractiveBackground />
      <BrowserRouter>
        <Header />
        <main className="relative z-10">
          <AnimatedRoutes />
        </main>
        <Footer />
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;