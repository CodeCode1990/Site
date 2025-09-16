import React, { useState } from 'react';
import { ExternalLink, Github, Database, BarChart3, Microscope, Calendar, Tag } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { mockProjects } from '../data/mock';

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [hoveredProject, setHoveredProject] = useState(null);

  const categories = [
    { id: 'all', name: 'All Projects', count: mockProjects.length },
    { id: 'clinical', name: 'Clinical Trials', count: mockProjects.filter(p => p.category === 'clinical').length },
    { id: 'market', name: 'Market Analysis', count: mockProjects.filter(p => p.category === 'market').length },
    { id: 'drug-discovery', name: 'Drug Discovery', count: mockProjects.filter(p => p.category === 'drug-discovery').length },
    { id: 'safety', name: 'Drug Safety', count: mockProjects.filter(p => p.category === 'safety').length }
  ];

  const filteredProjects = filter === 'all' 
    ? mockProjects 
    : mockProjects.filter(project => project.category === filter);

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'clinical': return Microscope;
      case 'market': return BarChart3;
      case 'drug-discovery': return Database;
      case 'safety': return Tag;
      default: return Database;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'clinical': return 'text-cyan-400 border-cyan-400/30 bg-cyan-400/10';
      case 'market': return 'text-green-400 border-green-400/30 bg-green-400/10';
      case 'drug-discovery': return 'text-purple-400 border-purple-400/30 bg-purple-400/10';
      case 'safety': return 'text-orange-400 border-orange-400/30 bg-orange-400/10';
      default: return 'text-gray-400 border-gray-400/30 bg-gray-400/10';
    }
  };

  return (
    <div className="min-h-screen pt-24 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500/20 to-green-500/20 rounded-full px-4 py-2 backdrop-blur-sm border border-cyan-500/30 mb-6">
            <Database className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-mono text-cyan-400 tracking-wider">PORTFOLIO</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Featured <span className="text-cyan-400">Projects</span>
          </h1>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Explore my data-driven pharmaceutical projects that showcase the power of analytics 
            in healthcare innovation and drug development.
          </p>
        </div>

        {/* Filter Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setFilter(category.id)}
              className={`px-6 py-3 rounded-sm font-mono text-sm uppercase tracking-wider transition-all duration-300 border ${
                filter === category.id
                  ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400'
                  : 'bg-gray-800/50 border-gray-700 text-gray-400 hover:bg-gray-700/50 hover:text-white'
              }`}
            >
              {category.name}
              <span className="ml-2 text-xs opacity-70">({category.count})</span>
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => {
            const CategoryIcon = getCategoryIcon(project.category);
            return (
              <Card 
                key={project.id}
                className="bg-gray-900/50 backdrop-blur-sm border-gray-800 overflow-hidden hover:bg-gray-800/50 transition-all duration-300 hover:scale-105 group"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Project Image/Thumbnail */}
                <div className="relative h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-green-500/20 opacity-50"></div>
                  <CategoryIcon className="w-12 h-12 text-cyan-400 z-10" />
                  <div className={`absolute inset-0 transition-all duration-300 ${
                    hoveredProject === project.id ? 'bg-black/20' : 'bg-black/40'
                  }`}></div>
                </div>

                <div className="p-6">
                  {/* Category Badge */}
                  <Badge className={`mb-3 font-mono text-xs uppercase tracking-wider ${getCategoryColor(project.category)}`}>
                    {project.category.replace('-', ' ')}
                  </Badge>

                  {/* Project Title */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech, idx) => (
                      <span 
                        key={idx}
                        className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-sm font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-gray-700 text-gray-400 text-xs rounded-sm font-mono">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Metrics */}
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span className="font-mono">{project.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <BarChart3 className="w-3 h-3" />
                      <span className="font-mono">{project.impact}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      className="flex-1 bg-gradient-to-r from-cyan-500/20 to-green-500/20 hover:from-cyan-500/30 hover:to-green-500/30 border border-cyan-500/30 text-cyan-400 font-mono text-xs"
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      VIEW DETAILS
                    </Button>
                    {project.githubUrl && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="border-gray-600 text-gray-400 hover:bg-gray-700/50 hover:text-white"
                      >
                        <Github className="w-3 h-3" />
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Load More Section */}
        <div className="text-center mt-16">
          <Button className="bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-black font-mono px-8 py-3 rounded-sm transition-all duration-300 hover:scale-105">
            LOAD MORE PROJECTS
          </Button>
          <p className="text-gray-500 text-sm mt-4 font-mono">
            Showing {filteredProjects.length} of {mockProjects.length} total projects
          </p>
        </div>
      </div>
    </div>
  );
};

export default Projects;