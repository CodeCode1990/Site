import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Calendar, CheckCircle, Github, Linkedin, Twitter } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { useToast } from '../hooks/use-toast';

const Connect = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    projectType: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Mock form submission
    setTimeout(() => {
      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for reaching out. I'll get back to you within 24 hours.",
      });
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: '',
        message: '',
        projectType: ''
      });
      setIsSubmitting(false);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'yash.patel@pharmanalysis.com',
      link: 'mailto:yash.patel@pharmanalysis.com',
      color: 'text-cyan-400'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+1 (555) 123-4567',
      link: 'tel:+15551234567',
      color: 'text-green-400'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Boston, MA, USA',
      link: null,
      color: 'text-purple-400'
    },
    {
      icon: Calendar,
      label: 'Response Time',
      value: 'Within 24 hours',
      link: null,
      color: 'text-orange-400'
    }
  ];

  const socialLinks = [
    { name: 'LinkedIn', url: '#', icon: Linkedin, color: 'hover:text-blue-400' },
    { name: 'GitHub', url: '#', icon: Github, color: 'hover:text-white' },
    { name: 'Twitter', url: '#', icon: Twitter, color: 'hover:text-cyan-400' }
  ];

  const projectTypes = [
    'Clinical Trial Analysis',
    'Market Research Analytics',
    'Drug Safety Monitoring',
    'Regulatory Compliance',
    'Data Visualization',
    'Custom Analytics Solution',
    'Consulting & Advisory',
    'Other'
  ];

  return (
    <div className="min-h-screen pt-24 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500/20 to-green-500/20 rounded-full px-4 py-2 backdrop-blur-sm border border-cyan-500/30 mb-6">
            <Mail className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-mono text-cyan-400 tracking-wider">GET IN TOUCH</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Let's <span className="text-cyan-400">Connect</span>
          </h1>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Ready to transform your pharmaceutical data into actionable insights? 
            Let's discuss how we can collaborate on your next project.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Contact Form */}
          <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800 p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Send className="w-6 h-6 text-cyan-400 mr-2" />
              Send Message
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-300 font-mono text-sm uppercase tracking-wider">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-cyan-500/20"
                    placeholder="Your full name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300 font-mono text-sm uppercase tracking-wider">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-cyan-500/20"
                    placeholder="your.email@company.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-gray-300 font-mono text-sm uppercase tracking-wider">
                    Company/Organization
                  </Label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-cyan-500/20"
                    placeholder="Your company name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="projectType" className="text-gray-300 font-mono text-sm uppercase tracking-wider">
                    Project Type
                  </Label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-sm text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-cyan-500/20 focus:outline-none"
                  >
                    <option value="">Select project type</option>
                    {projectTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject" className="text-gray-300 font-mono text-sm uppercase tracking-wider">
                  Subject *
                </Label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-cyan-500/20"
                  placeholder="Brief subject line"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-gray-300 font-mono text-sm uppercase tracking-wider">
                  Message *
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-cyan-500/20 resize-none"
                  placeholder="Tell me about your project, timeline, and specific requirements..."
                />
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-black font-mono py-3 rounded-sm transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                    <span>SENDING...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <Send className="w-4 h-4" />
                    <span>SEND MESSAGE</span>
                  </div>
                )}
              </Button>
            </form>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            
            {/* Contact Details */}
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
                            className={`text-white hover:${info.color.replace('text-', 'text-')} transition-colors font-medium`}
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

            {/* Social Links */}
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
                        <p className="text-gray-400 text-sm font-mono">@pharmanalysis-yashpatel</p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </Card>

            {/* Availability Status */}
            <Card className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 backdrop-blur-sm border-green-500/30 p-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <h3 className="text-xl font-bold text-white">Currently Available</h3>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">
                I'm currently accepting new pharmaceutical data analysis projects and consulting 
                opportunities. Let's discuss how I can help drive your healthcare initiatives forward.
              </p>
              <div className="flex items-center space-x-2 text-sm text-green-400">
                <CheckCircle className="w-4 h-4" />
                <span className="font-mono">Open for new projects</span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Connect;