import React from 'react';
import { GraduationCap, Award, BookOpen, Calendar, ExternalLink, Star } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { mockEducation, mockCertifications, mockSkills } from '../data/mock';

const Education = () => {
  return (
    <div className="min-h-screen pt-24 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500/20 to-green-500/20 rounded-full px-4 py-2 backdrop-blur-sm border border-cyan-500/30 mb-6">
            <GraduationCap className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-mono text-cyan-400 tracking-wider">EDUCATION & SKILLS</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Academic <span className="text-cyan-400">Journey</span>
          </h1>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            A comprehensive overview of my educational background, certifications, and 
            continuously evolving skill set in pharmaceutical data analytics.
          </p>
        </div>

        {/* Education Timeline */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
            <GraduationCap className="w-8 h-8 text-cyan-400 mr-3" />
            Academic Background
          </h2>
          
          <div className="space-y-8">
            {mockEducation.map((edu, index) => (
              <Card key={index} className="bg-gray-900/50 backdrop-blur-sm border-gray-800 p-6 hover:bg-gray-800/50 transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{edu.degree}</h3>
                    <p className="text-cyan-400 font-medium mb-1">{edu.institution}</p>
                    <p className="text-gray-400 text-sm">{edu.location}</p>
                  </div>
                  <div className="text-right mt-4 md:mt-0">
                    <div className="flex items-center justify-end space-x-2 mb-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-300 font-mono text-sm">{edu.period}</span>
                    </div>
                    {edu.gpa && (
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        GPA: {edu.gpa}
                      </Badge>
                    )}
                  </div>
                </div>
                
                <p className="text-gray-300 leading-relaxed mb-4">{edu.description}</p>
                
                {edu.achievements && (
                  <div>
                    <h4 className="text-sm font-mono uppercase tracking-wider text-cyan-400 mb-2">Key Achievements:</h4>
                    <ul className="list-disc list-inside text-gray-400 text-sm space-y-1">
                      {edu.achievements.map((achievement, idx) => (
                        <li key={idx}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
            <Award className="w-8 h-8 text-green-400 mr-3" />
            Certifications & Credentials
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {mockCertifications.map((cert, index) => (
              <Card key={index} className="bg-gray-900/50 backdrop-blur-sm border-gray-800 p-6 hover:bg-gray-800/50 transition-all duration-300 group">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                      {cert.name}
                    </h3>
                    <p className="text-cyan-400 font-medium mb-1">{cert.issuer}</p>
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      <Calendar className="w-3 h-3" />
                      <span className="font-mono">{cert.date}</span>
                      {cert.expiry && (
                        <>
                          <span>•</span>
                          <span className="font-mono">Expires {cert.expiry}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500/20 to-cyan-500/20 rounded-sm flex items-center justify-center">
                    <Award className="w-6 h-6 text-green-400" />
                  </div>
                </div>
                
                <p className="text-gray-300 text-sm leading-relaxed mb-4">{cert.description}</p>
                
                {cert.skills && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {cert.skills.map((skill, idx) => (
                      <span 
                        key={idx}
                        className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-sm font-mono"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
                
                {cert.credentialUrl && (
                  <Button 
                    size="sm" 
                    className="w-full bg-gradient-to-r from-green-500/20 to-cyan-500/20 hover:from-green-500/30 hover:to-cyan-500/30 border border-green-500/30 text-green-400 font-mono text-xs"
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    VIEW CREDENTIAL
                  </Button>
                )}
              </Card>
            ))}
          </div>
        </section>

        {/* Skills Matrix */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
            <Star className="w-8 h-8 text-purple-400 mr-3" />
            Technical Skills Matrix
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {Object.entries(mockSkills).map(([category, skills]) => (
              <Card key={category} className="bg-gray-900/50 backdrop-blur-sm border-gray-800 p-6">
                <h3 className="text-xl font-bold text-white mb-6 capitalize flex items-center">
                  <BookOpen className="w-5 h-5 text-purple-400 mr-2" />
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
                        <div 
                          className="bg-gradient-to-r from-cyan-400 to-purple-400 h-1 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${(skill.level / 5) * 100}%` }}
                        ></div>
                      </div>
                      {skill.experience && (
                        <p className="text-xs text-gray-500 font-mono">{skill.experience}</p>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <Card className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-sm border-gray-700 p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Continuous <span className="text-cyan-400">Learning</span> Journey
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto">
              Stay updated with my latest certifications and skill developments in 
              pharmaceutical data analytics and emerging healthcare technologies.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Button className="bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-black font-mono px-8 py-3 rounded-sm transition-all duration-300 hover:scale-105">
                VIEW RECENT COURSES
              </Button>
              <Button variant="outline" className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 font-mono px-8 py-3 rounded-sm">
                SKILL RECOMMENDATIONS
              </Button>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Education;