import React from 'react';
import { Mail, MapPin, Phone, CheckCircle, Github, Linkedin, FileText } from 'lucide-react';
import { Card } from '../components/ui/card';
import profilePhoto from '../assets/profile.jpg'; // <-- Import image here

const RESUME_PDF_URL = '/Yash_Resume.pdf'; // static resume file in public folder

const Connect = () => {
const contactInfo = [
{
icon: Mail,
label: 'Email',
value: 'yashpatel183@gmail.com',
link: 'mailto:yashpatel183@gmail.com',
color: 'text-cyan-400'
},
{
icon: Phone,
label: 'Phone',
value: 'Available on request',
link: null,
color: 'text-green-400'
},
{
icon: MapPin,
label: 'Location',
value: 'Ontario, CA',
link: null,
color: 'text-purple-400'
}
];

const socialLinks = [
{ name: 'LinkedIn', url: 'https://www.linkedin.com/in/yash-patel-7a0713154/', icon: Linkedin, color: 'hover:text-blue-400', tag: '@pharmanalysis-yashpatel' },
{ name: 'GitHub', url: 'https://github.com/CodeCode1990', icon: Github, color: 'hover:text-white', tag: 'CodeCode1990' }
];

return (
<div className="min-h-screen pt-24 px-6 lg:px-8">
<div className="max-w-6xl mx-auto">

text

    {/* Header with photo on right side */}
    <div className="flex items-center justify-center mb-8 space-x-6">
      <h1 className="text-4xl md:text-6xl font-bold text-white">
        Let's <span className="text-cyan-400">Connect</span>
      </h1>
      <img
        src={profilePhoto}
        alt="Profile"
        className="w-36 h-36 rounded-full object-cover bg-white/20 bg-opacity-50 shadow-lg"
        style={{ opacity: 0.8, border: '3px solid rgba(94,234,212,0.7)', backgroundColor: 'rgba(45,212,191,0.06)' }}
      />
    </div>

    <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-12 text-center">
      Ready to transform your data into actionable insights?
      Let's discuss how we can collaborate on your next project.
    </p>

    {/* Two-column layout */}
    <div className="grid lg:grid-cols-2 gap-12">

      {/* Contact Information - Left */}
      <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800 p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
        <div className="space-y-6">
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <div key={index} className="flex items-center space-x-4">
                <div className={`w-12 h-12 bg-gray-800/50 rounded-sm flex items-center justify-center ${info.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-gray-400 font-mono text-xs uppercase tracking-wider">
                    {info.label}
                  </p>
                  {info.link ? (
                    <a
                      href={info.link}
                      className="text-white hover:underline transition-colors font-medium"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-white font-medium">{info.value}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Follow My Work with Resume - Right */}
      <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800 p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Follow My Work</h2>
        <div className="space-y-4">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.name}
                href={social.url}
                className={`flex items-center space-x-4 p-4 bg-gray-800/30 rounded-sm transition-all duration-300 hover:bg-gray-700/50 ${social.color} group`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="w-10 h-10 bg-gray-700/50 rounded-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-white font-medium">{social.name}</p>
                  <p className="text-gray-400 text-sm font-mono">{social.tag}</p>
                </div>
              </a>
            );
          })}
          {/* Resume as part of this section */}
          <a
            href={RESUME_PDF_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-4 p-4 bg-gray-800/30 rounded-sm transition-all duration-300 hover:bg-gray-700/50 hover:text-cyan-400 group"
            download
          >
            <div className="w-10 h-10 bg-gray-700/50 rounded-sm flex items-center justify-center group-hover:scale-110 transition-transform">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <p className="text-white font-medium">Resume</p>
              <p className="text-gray-400 text-sm font-mono">Static PDF Download</p>
            </div>
          </a>
        </div>
      </Card>
    </div>

    {/* Availability full-width underneath */}
    <div className="mt-12">
      <Card className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 backdrop-blur-sm border-green-500/30 p-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          <h3 className="text-xl font-bold text-white">Currently Available</h3>
        </div>
        <p className="text-gray-300 leading-relaxed mb-4">
          I'm open to work on new data analysis projects and consulting
          opportunities. Let's discuss how I can help drive your data forward.
        </p>
        <div className="flex items-center space-x-2 text-sm text-green-400">
          <CheckCircle className="w-4 h-4" />
          <span className="font-mono">Open for new projects</span>
        </div>
      </Card>
    </div>
  </div>
</div>
);
};

export default Connect;