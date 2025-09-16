import React, { useEffect, useState } from 'react';
import { ChevronDown, Database, BarChart3, Activity, TrendingUp, Zap, Code2, Star, Award } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { motion } from 'framer-motion';
import { mockSkills } from '../data/mock';

const Home = () => {
  const [typedText, setTypedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const fullText = "Data Analyst & Problem Solver";

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
    { label: 'Projects Completed', value: '25+', icon: Database, color: 'cyan' },
    { label: 'Data Points Analyzed', value: '2M+', icon: BarChart3, color: 'green' },
    { label: 'Research Papers', value: '8', icon: Activity, color: 'purple' },
    { label: 'Years Experience', value: '3+', icon: TrendingUp, color: 'orange' }
  ];

  const skills = [
    { name: 'Python & R', level: 95, color: 'bg-cyan-400' },
    { name: 'SQL & Database Management', level: 90, color: 'bg-green-400' },
    { name: 'Statistical Analysis', level: 88, color: 'bg-blue-400' },
    { name: 'Data Visualization', level: 92, color: 'bg-purple-400' },
    { name: 'Machine Learning', level: 85, color: 'bg-orange-400' },
    { name: 'Business Analytics', level: 88, color: 'bg-pink-400' }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Senior Data Manager",
      company: "TechCorp Solutions",
      text: "Yash's analytical skills and attention to detail are exceptional. He transformed our complex datasets into clear, actionable insights.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Research Director",  
      company: "Analytics Pro",
      text: "Working with Yash was a game-changer for our research projects. His expertise in statistical modeling is outstanding.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Project Manager",
      company: "DataTech Inc",
      text: "Yash consistently delivers high-quality analysis and presents findings in a way that's easy for stakeholders to understand.",
      rating: 5
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      cyan: 'from-cyan-500/20 to-cyan-500/5 border-cyan-500/30',
      green: 'from-green-500/20 to-green-500/5 border-green-500/30',
      purple: 'from-purple-500/20 to-purple-500/5 border-purple-500/30',
      orange: 'from-orange-500/20 to-orange-500/5 border-orange-500/30'
    };
    return colors[color];
  };

  const getIconColor = (color) => {
    const colors = {
      cyan: 'text-cyan-400',
      green: 'text-green-400',  
      purple: 'text-purple-400',
      orange: 'text-orange-400'
    };
    return colors[color];
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500/20 to-green-500/20 rounded-full px-4 py-2 backdrop-blur-sm border border-cyan-500/30 mb-6">
              <Code2 className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-mono text-cyan-400 tracking-wider">DATA ANALYTICS</span>
            </div>
            
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-white">YASH </span>
              <span className="bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
                PATEL
              </span>
            </motion.h1>
            
            <div className="text-2xl md:text-3xl text-gray-300 mb-8 h-12 font-mono">
              <span className="text-cyan-400">{typedText}</span>
              <span className="animate-pulse text-green-400">|</span>
            </div>
            
            <motion.p 
              className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Transforming complex data into actionable insights that drive 
              <span className="text-cyan-400"> innovation</span>, enhance 
              <span className="text-green-400"> decision making</span>, and accelerate 
              <span className="text-purple-400"> business growth</span>.
            </motion.p>
          </motion.div>

          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button className="bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-black font-mono px-8 py-3 rounded-sm transition-all duration-300 hover:scale-105">
              VIEW MY PROJECTS
            </Button>
            <Button variant="outline" className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 font-mono px-8 py-3 rounded-sm">
              DOWNLOAD CV
            </Button>
          </motion.div>

          <motion.div 
            className="animate-bounce"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <ChevronDown className="w-6 h-6 text-gray-400 mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className={`bg-gradient-to-br ${getColorClasses(stat.color)} backdrop-blur-sm border p-6 text-center hover:scale-105 transition-all duration-300`}>
                    <div className={`w-12 h-12 bg-gradient-to-r ${getColorClasses(stat.color)} rounded-sm flex items-center justify-center mx-auto mb-4`}>
                      <Icon className={`w-6 h-6 ${getIconColor(stat.color)}`} />
                    </div>
                    <div className="text-2xl font-bold text-white mb-2">{stat.value}</div>
                    <div className="text-sm text-gray-400 font-mono uppercase tracking-wider">{stat.label}</div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500/20 to-green-500/20 rounded-full px-4 py-2 backdrop-blur-sm border border-cyan-500/30 mb-6">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-mono text-cyan-400 tracking-wider">ABOUT ME</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Bridging <span className="text-cyan-400">Data</span> & 
                <span className="text-green-400"> Business</span>
              </h2>
              
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  As a passionate data analyst, I specialize in transforming complex datasets 
                  into meaningful insights that drive strategic business decisions across 
                  various industries and domains.
                </p>
                <p>
                  My expertise spans statistical analysis, predictive modeling, data visualization, 
                  and machine learning. I leverage cutting-edge analytical tools and methodologies 
                  to uncover patterns that can accelerate growth and improve operational efficiency.
                </p>
                <p className="text-cyan-400 font-medium">
                  "Every dataset tells a story. My job is to listen carefully and translate 
                  that story into actionable business insights."
                </p>
              </div>
            </motion.div>

            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-white mb-6">Technical Expertise</h3>
              {skills.map((skill, index) => (
                <motion.div 
                  key={index} 
                  className="space-y-2"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 font-mono text-sm uppercase tracking-wider">{skill.name}</span>
                    <span className="text-cyan-400 font-mono text-sm">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <motion.div 
                      className={`${skill.color} h-2 rounded-full`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    ></motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technical Skills Matrix */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-4 flex items-center justify-center">
              <Star className="w-8 h-8 text-purple-400 mr-3" />
              Technical Skills Matrix
            </h2>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {Object.entries(mockSkills).map(([category, skills], categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800 p-6">
                  <h3 className="text-xl font-bold text-white mb-6 capitalize flex items-center">
                    <Award className="w-5 h-5 text-purple-400 mr-2" />
                    {category.replace('-', ' & ')}
                  </h3>
                  
                  <div className="space-y-4">
                    {skills.map((skill, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300 font-mono text-sm">{skill.name}</span>
                          <div className="flex items-center space-x-2">
                            <div className="flex space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`w-3 h-3 ${
                                    i < skill.level 
                                      ? 'text-cyan-400 fill-current' 
                                      : 'text-gray-600'
                                  }`} 
                                />
                              ))}
                            </div>
                            <span className="text-cyan-400 font-mono text-xs">
                              {skill.level}/5
                            </span>
                          </div>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-1">
                          <motion.div 
                            className="bg-gradient-to-r from-cyan-400 to-purple-400 h-1 rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${(skill.level / 5) * 100}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                            viewport={{ once: true }}
                          ></motion.div>
                        </div>
                        {skill.experience && (
                          <p className="text-xs text-gray-500 font-mono">{skill.experience}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">What Clients Say</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Feedback from professionals I've had the privilege to work with
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800 p-6 h-full">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-6 leading-relaxed">"{testimonial.text}"</p>
                  <div className="mt-auto">
                    <p className="text-white font-medium">{testimonial.name}</p>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                    <p className="text-xs text-cyan-400 font-mono">{testimonial.company}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div 
            className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your <span className="text-cyan-400">Data</span>?
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Let's collaborate on your next data-driven project. 
              From analysis to insights, I bring precision and clarity to every dataset.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Button className="bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-black font-mono px-8 py-3 rounded-sm transition-all duration-300 hover:scale-105">
                START A PROJECT
              </Button>
              <Button variant="outline" className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 font-mono px-8 py-3 rounded-sm">
                VIEW CASE STUDIES
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;