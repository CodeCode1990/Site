import React, { useEffect, useState } from 'react';
import { ChevronDown, Database, BarChart3, Activity, TrendingUp, Zap, Microscope } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';

const Home = () => {
  const [typedText, setTypedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const fullText = "Pharmaceutical Data Analyst";

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText]);

  const stats = [
    { label: 'Projects Completed', value: '25+', icon: Database },
    { label: 'Data Points Analyzed', value: '2M+', icon: BarChart3 },
    { label: 'Research Papers', value: '8', icon: Activity },
    { label: 'Years Experience', value: '3+', icon: TrendingUp }
  ];

  const skills = [
    { name: 'Python & R', level: 95, color: 'bg-cyan-400' },
    { name: 'SQL & Database Management', level: 90, color: 'bg-green-400' },
    { name: 'Statistical Analysis', level: 88, color: 'bg-blue-400' },
    { name: 'Data Visualization', level: 92, color: 'bg-purple-400' },
    { name: 'Machine Learning', level: 85, color: 'bg-orange-400' },
    { name: 'Clinical Research', level: 90, color: 'bg-pink-400' }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500/20 to-green-500/20 rounded-full px-4 py-2 backdrop-blur-sm border border-cyan-500/30 mb-6">
              <Microscope className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-mono text-cyan-400 tracking-wider">PHARMACEUTICAL ANALYTICS</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="text-white">YASH </span>
              <span className="bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
                PATEL
              </span>
            </h1>
            
            <div className="text-2xl md:text-3xl text-gray-300 mb-8 h-12 font-mono">
              <span className="text-cyan-400">{typedText}</span>
              <span className="animate-pulse text-green-400">|</span>
            </div>
            
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-12">
              Transforming complex pharmaceutical data into actionable insights that drive 
              <span className="text-cyan-400"> innovation</span>, enhance 
              <span className="text-green-400"> patient outcomes</span>, and accelerate 
              <span className="text-purple-400"> drug discovery</span> processes.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
            <Button className="bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-black font-mono px-8 py-3 rounded-sm transition-all duration-300 hover:scale-105">
              VIEW MY PROJECTS
            </Button>
            <Button variant="outline" className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 font-mono px-8 py-3 rounded-sm">
              DOWNLOAD CV
            </Button>
          </div>

          <div className="animate-bounce">
            <ChevronDown className="w-6 h-6 text-gray-400 mx-auto" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="bg-gray-900/50 backdrop-blur-sm border-gray-800 p-6 text-center hover:bg-gray-800/50 transition-all duration-300 hover:scale-105">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500/20 to-green-500/20 rounded-sm flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-400 font-mono uppercase tracking-wider">{stat.label}</div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500/20 to-green-500/20 rounded-full px-4 py-2 backdrop-blur-sm border border-cyan-500/30 mb-6">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-mono text-cyan-400 tracking-wider">ABOUT ME</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Bridging <span className="text-cyan-400">Data</span> & 
                <span className="text-green-400"> Healthcare</span>
              </h2>
              
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  As a passionate pharmaceutical data analyst, I specialize in extracting meaningful 
                  insights from complex healthcare datasets to drive evidence-based decision making 
                  in the pharmaceutical industry.
                </p>
                <p>
                  My expertise spans across clinical trial analysis, drug safety monitoring, 
                  market research analytics, and regulatory compliance reporting. I leverage 
                  advanced statistical methods and machine learning techniques to uncover 
                  patterns that can accelerate drug development and improve patient care.
                </p>
                <p className="text-cyan-400 font-medium">
                  "Every dataset tells a story. My job is to listen carefully and translate 
                  that story into actionable pharmaceutical insights."
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-6">Technical Expertise</h3>
              {skills.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 font-mono text-sm uppercase tracking-wider">{skill.name}</span>
                    <span className="text-cyan-400 font-mono text-sm">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div 
                      className={`${skill.color} h-2 rounded-full transition-all duration-1000 ease-out`}
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your <span className="text-cyan-400">Pharmaceutical Data</span>?
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Let's collaborate on your next data-driven pharmaceutical project. 
              From clinical trials to market analysis, I bring precision and insight to every dataset.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Button className="bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-black font-mono px-8 py-3 rounded-sm transition-all duration-300 hover:scale-105">
                START A PROJECT
              </Button>
              <Button variant="outline" className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 font-mono px-8 py-3 rounded-sm">
                VIEW CASE STUDIES
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;