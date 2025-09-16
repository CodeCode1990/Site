import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTransition } from './PageTransition';
import { Home, FolderOpen, GraduationCap, MessageCircle } from 'lucide-react';

const TransitionLink = ({ to, children, className, onClick, ...props }) => {
  const navigate = useNavigate();
  const { triggerTransition } = useTransition();

  const getRouteIcon = (pathname) => {
    switch (pathname) {
      case '/': return Home;
      case '/projects': return FolderOpen;
      case '/education': return GraduationCap;
      case '/connect': return MessageCircle;
      default: return Home;
    }
  };

  const getRouteColor = (pathname) => {
    switch (pathname) {
      case '/': return 'cyan';
      case '/projects': return 'green';
      case '/education': return 'purple';
      case '/connect': return 'orange';
      default: return 'cyan';
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    
    const icon = getRouteIcon(to);
    const color = getRouteColor(to);
    
    triggerTransition(icon, color);
    
    // Navigate after a delay to allow transition to start
    setTimeout(() => {
      navigate(to);
    }, 300);
    
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <Link 
      to={to} 
      className={className} 
      onClick={handleClick}
      {...props}
    >
      {children}
    </Link>
  );
};

export default TransitionLink;