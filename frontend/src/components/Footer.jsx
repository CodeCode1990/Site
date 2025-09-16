import React from 'react';
import { Github, Linkedin, Mail, Twitter, Database, BarChart } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { name: 'LinkedIn', url: '#', icon: Linkedin, color: 'hover:text-blue-400' },
    { name: 'GitHub', url: '#', icon: Github, color: 'hover:text-white' },
    { name: 'Email', url: 'mailto:yash@example.com', icon: Mail, color: 'hover:text-green-400' },
    { name: 'Twitter', url: '#', icon: Twitter, color: 'hover:text-cyan-400' }
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 bg-black/90 backdrop-blur-sm border-t border-cyan-500/20 mt-20">
      <div className="container mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-green-400 rounded-sm flex items-center justify-center">
                <Database className="w-5 h-5 text-black" />
              </div>
              <span className="text-xl font-bold font-mono tracking-tight">
                YASH<span className="text-cyan-400">PATEL</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Pharmaceutical Data Analyst passionate about transforming healthcare data into actionable insights.
              Bridging the gap between complex analytics and real-world pharmaceutical applications.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white font-mono text-sm uppercase tracking-wider flex items-center space-x-2">
              <BarChart className="w-4 h-4 text-cyan-400" />
              <span>Expertise</span>
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="hover:text-cyan-400 transition-colors cursor-pointer">• Data Analysis & Visualization</li>
              <li className="hover:text-cyan-400 transition-colors cursor-pointer">• Pharmaceutical Research</li>
              <li className="hover:text-cyan-400 transition-colors cursor-pointer">• Statistical Modeling</li>
              <li className="hover:text-cyan-400 transition-colors cursor-pointer">• Clinical Data Analytics</li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-white font-mono text-sm uppercase tracking-wider">Connect</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    className={`w-10 h-10 bg-gray-800/50 rounded-sm flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-gray-700/50 ${social.color}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
            <p className="text-xs text-gray-500 mt-4">
              Available for pharmaceutical data consulting and collaborative research projects.
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-xs text-gray-500 font-mono">
            © {currentYear} Yash Patel. Crafted with precision and passion for data.
          </p>
          <div className="flex items-center space-x-4 text-xs text-gray-500">
            <span className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Available for Projects</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;