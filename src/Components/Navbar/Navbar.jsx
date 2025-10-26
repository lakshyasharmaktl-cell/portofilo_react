import React, { useState, useEffect, useRef } from 'react';
import { Github, Instagram, Linkedin, Download, Mail, Code, Palette, Zap } from 'lucide-react';

export default function Portfolio() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [animatedText, setAnimatedText] = useState('');
  const [currentLine, setCurrentLine] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [navVisible, setNavVisible] = useState(false);
  
  const textLines = [
    "Full Stack Developer & Designer",
    "A genius boy who loves to code and design things with passion", 
    "I hope you like my portfolio ❤️",
    "Full Stack Developer & Designer",
    "A genius boy who loves to code and design things with passion",
    "I hope you like my portfolio ❤️"
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    
    // Trigger navbar animation after component mount
    const timer = setTimeout(() => {
      setNavVisible(true);
    }, 300);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timer);
    };
  }, []);

  // Typewriter animation effect
  useEffect(() => {
    if (currentLine < textLines.length) {
      const currentText = textLines[currentLine];
      
      if (charIndex < currentText.length) {
        const timer = setTimeout(() => {
          setAnimatedText(prev => prev + currentText.charAt(charIndex));
          setCharIndex(charIndex + 1);
        }, 50); // Typing speed
        
        return () => clearTimeout(timer);
      } else {
        // Move to next line after a pause
        const lineTimer = setTimeout(() => {
          setAnimatedText(prev => prev + '\n');
          setCurrentLine(currentLine + 1);
          setCharIndex(0);
        }, 1000); // Pause between lines
        
        return () => clearTimeout(lineTimer);
      }
    } else {
      // Restart animation after completion
      const restartTimer = setTimeout(() => {
        setAnimatedText('');
        setCurrentLine(0);
        setCharIndex(0);
      }, 3000); // Pause before restarting
        
      return () => clearTimeout(restartTimer);
    }
  }, [currentLine, charIndex, textLines]);

  const socialLinks = [
    { icon: Github, link: "#", color: "from-gray-700 to-gray-900", name: "GitHub" },
    { icon: Instagram, link: "#", color: "from-pink-500 to-purple-600", name: "Instagram" },
    { icon: Linkedin, link: "#", color: "from-blue-500 to-blue-700", name: "LinkedIn" },
    { icon: Mail, link: "#", color: "from-green-500 to-teal-600", name: "Email" },
  ];

  const skills = [
    { icon: Code, label: "Development", delay: 0 },
    { icon: Palette, label: "Design", delay: 0.1 },
    { icon: Zap, label: "Performance", delay: 0.2 },
  ];

  const SnakeIcon = ({ item, index, total }) => {
    const IconComponent = item.icon;
    const angle = (index / total) * Math.PI * 2;
    const radius = 120;
    const centerX = typeof window !== 'undefined' ? window.innerWidth / 2 : 0;
    const centerY = 400;
    
    const baseX = centerX + Math.cos(angle) * radius;
    const baseY = centerY + Math.sin(angle) * radius;
    
    const dx = mousePosition.x - baseX;
    const dy = mousePosition.y - baseY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const maxDistance = 200;
    
    const influence = Math.max(0, 1 - distance / maxDistance);
    const offsetX = dx * influence * 0.3;
    const offsetY = dy * influence * 0.3;

    return (
      <div
        className="absolute transition-all duration-300 ease-out h-screen"
        style={{
          left: `${baseX + offsetX}px`,
          top: `${baseY + offsetY}px`,
          transform: 'translate(-50%, -50%)',
        }}
        onMouseEnter={() => setHoveredIcon(index)}
        onMouseLeave={() => setHoveredIcon(null)}
      >
        <a
          href={item.link}
          className={`relative flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} text-white shadow-lg hover:shadow-2xl transition-all duration-300 group`}
          style={{
            transform: hoveredIcon === index ? 'scale(1.2) rotate(5deg)' : 'scale(1)',
          }}
        >
          <IconComponent 
            size={28} 
            className="transition-transform duration-300 group-hover:rotate-12"
          />
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            <span className="text-xs font-semibold text-gray-700 bg-white px-2 py-1 rounded shadow">
              {item.name}
            </span>
          </div>
        </a>
        
        {/* Trailing effect */}
        <div
          className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${item.color} opacity-20 blur-xl transition-all duration-500`}
          style={{
            transform: hoveredIcon === index ? 'scale(1.5)' : 'scale(0.8)',
          }}
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Animated Navigation */}
      <nav 
        className={`relative flex justify-between items-center py-6 px-8 backdrop-blur-sm bg-white/70 shadow-sm transform transition-all duration-700 ease-out ${
          navVisible 
            ? 'translate-y-0 opacity-100' 
            : '-translate-y-full opacity-0'
        }`}
      >
        {/* Logo with staggered animation */}
        <div 
          className={`transform transition-all duration-600 ease-out ${
            navVisible 
              ? 'translate-y-0 opacity-100 scale-100' 
              : '-translate-y-10 opacity-0 scale-90'
          }`}
          style={{ transitionDelay: '100ms' }}
        >
          <h1 className="text-gray-800 text-3xl font-bold cursor-pointer hover:scale-110 transition-transform duration-300">
            LS
          </h1>
        </div>

        {/* Download button with staggered animation */}
        <div 
          className={`transform transition-all duration-600 ease-out ${
            navVisible 
              ? 'translate-y-0 opacity-100 scale-100' 
              : '-translate-y-10 opacity-0 scale-90'
          }`}
          style={{ transitionDelay: '300ms' }}
        >
          <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-xl hover:scale-105 transition-all duration-300">
            <Download size={18} />
            Download Resume
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative flex flex-col items-center justify-center pt-20 pb-32">
        {/* Profile Picture with Animated Border */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-lg opacity-75 animate-pulse" />
          <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-2xl">
            <img
              src="https://static-cse.canva.com/blob/2199415/1600w-z_r_KC1WlmU.jpg"
              alt="Profile"
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
            />
          </div>
          {/* Floating particles around image */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"
              style={{
                top: `${20 + Math.sin(i * Math.PI / 3) * 80}px`,
                left: `${20 + Math.cos(i * Math.PI / 3) * 80}px`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>

        {/* Name and Title */}
        <h2 className="text-5xl font-bold text-gray-900 mb-4 animate-fade-in">
          Laxxy
        </h2>
        
        {/* Animated Text Section */}
        <div className="max-w-2xl text-center mb-8">
          <div className="text-xl text-gray-600 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <pre className="font-sans whitespace-pre-wrap text-center leading-relaxed">
              {animatedText}
              <span className="inline-block w-2 h-6 bg-blue-500 ml-1 animate-pulse"></span>
            </pre>
          </div>
        </div>

        {/* Skills */}
        <div className="flex gap-6 mb-16">
          {skills.map((skill, index) => {
            const SkillIcon = skill.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-5 py-3 rounded-full shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${skill.delay}s both`,
                }}
              >
                <SkillIcon size={20} className="text-blue-600" />
                <span className="text-sm font-semibold text-gray-700">{skill.label}</span>
              </div>
            );
          })}
        </div>

        {/* Snake Animation Social Icons */}
        <div className="relative w-full h-96">
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="text-sm font-semibold text-gray-500 text-center mb-4">
              Connect with me
            </div>
          </div>
          {socialLinks.map((item, index) => (
            <SnakeIcon
              key={index}
              item={item}
              index={index}
              total={socialLinks.length}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInUpLines {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideDown {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        .animate-fade-in {
          animation: fadeInUp 0.8s ease-out both;
        }
        
        .animate-fade-in-line {
          animation: fadeInUpLines 0.8s ease-out both;
        }
        
        .animate-slide-down {
          animation: slideDown 0.8s ease-out both;
        }
        
        /* Blinking cursor effect */
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}