import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis';

const Navigation = () => {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [voiceActive, setVoiceActive] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState('Voice Commands');
  const [isLoaded, setIsLoaded] = useState(false);
  const { startListening, stopListening, isListening } = useSpeechRecognition();
  const { speak } = useSpeechSynthesis();

  useEffect(() => {
    // Simulate a loading effect for a smoother experience
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 200);
    
    return () => clearTimeout(timer);
  }, []);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleVoiceControl = () => {
    if (voiceActive) {
      stopListening();
      setVoiceActive(false);
      setVoiceStatus('Voice Commands');
    } else {
      setVoiceActive(true);
      setVoiceStatus('Listening...');
      startListening({
        onResult: (result) => {
          // Process voice commands
          const command = result.toLowerCase();
          
          if (command.includes('home') || command.includes('go home')) {
            window.location.href = '/';
          } else if (command.includes('services') || command.includes('go to services')) {
            window.location.href = '/services';
          } else if (command.includes('resources') || command.includes('go to resources')) {
            window.location.href = '/resources';
          } else if (command.includes('about') || command.includes('go to about')) {
            window.location.href = '/about';
          } else if (command.includes('contact') || command.includes('go to contact')) {
            window.location.href = '/contact';
          } else if (command.includes('read page') || command.includes('read this page')) {
            // Get the main content of the page and read it
            const mainContent = document.querySelector('main')?.textContent;
            if (mainContent) {
              speak(mainContent);
            }
          }
        },
        onEnd: () => {
          setVoiceActive(false);
          setVoiceStatus('Voice Commands');
        }
      });
    }
  };

  // Navigation items with Indian-inspired design
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/resources', label: 'Resources' },
    { path: '/about', label: 'About Us' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <header className="bg-white shadow-lg relative z-20">
      {/* Decorative top border with Indian flag colors */}
      <div className="h-1 w-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808]"></div>
      
      <div className="container mx-auto px-4 py-4 flex flex-wrap items-center justify-between">
        <div className="flex items-center">
          <Link href="/">
            <div className={`flex items-center transition-transform hover:scale-105 ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`} style={{ transitionDuration: '0.5s' }}>
              <div className="relative mr-3">
                {/* Woman silhouette logo instead of microphone */}
                <svg className="h-12 w-12 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C9.79086 2 8 3.79086 8 6V8C8 10.2091 9.79086 12 12 12C14.2091 12 16 10.2091 16 8V6C16 3.79086 14.2091 2 12 2Z" fill="currentColor" fillOpacity="0.7"/>
                  <path d="M5 14.5C5 11.4624 7.46243 9 10.5 9H13.5C16.5376 9 19 11.4624 19 14.5V19C19 20.1046 18.1046 21 17 21H7C5.89543 21 5 20.1046 5 19V14.5Z" fill="currentColor" fillOpacity="0.4"/>
                  <path d="M7 18C7 17.4477 7.44772 17 8 17H16C16.5523 17 17 17.4477 17 18C17 18.5523 16.5523 19 16 19H8C7.44772 19 7 18.5523 7 18Z" fill="currentColor" fillOpacity="0.8"/>
                </svg>
                {/* Decorative elements suggesting Indian design */}
                <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#FF9933] opacity-80"></div>
                <div className="absolute -bottom-1 -left-1 w-3 h-3 rounded-full bg-[#138808] opacity-70"></div>
              </div>
              <div>
                <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#DD6B20] font-bold text-2xl">ViduSHE</h1>
                <p className="text-xs text-gray-600 -mt-1 italic">SHE got Voice</p>
              </div>
            </div>
          </Link>
        </div>
        
        {/* Mobile Menu Button with Indian styling */}
        <button 
          onClick={toggleMobileMenu}
          className="md:hidden flex items-center px-3 py-2 border-2 rounded-lg text-primary border-primary hover:text-white hover:bg-primary transition-colors duration-300"
          aria-label="Toggle menu"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
        
        {/* Navigation Links with Indian-inspired styling */}
        <nav className={`${mobileMenuOpen ? 'block' : 'hidden'} md:flex w-full md:w-auto mt-4 md:mt-0`}>
          <ul className="flex flex-col md:flex-row md:items-center md:space-x-1 space-y-2 md:space-y-0">
            {navItems.map((item, index) => (
              <li key={item.path} className={`transition-all duration-500 ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`} style={{ transitionDelay: `${index * 100}ms` }}>
                <Link href={item.path}>
                  <div className={`px-4 py-2 rounded-full cursor-pointer transition-all duration-300 ${
                    location === item.path 
                      ? 'bg-gradient-to-r from-primary/10 to-[#DD6B20]/10 text-primary font-medium' 
                      : 'text-neutral-700 hover:bg-gray-100'
                  }`}>
                    {item.label}
                    {location === item.path && (
                      <div className="h-0.5 w-full bg-gradient-to-r from-primary to-[#DD6B20] mt-0.5 rounded-full"></div>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Voice Navigation Control with Indian-inspired design */}
        <div className="ml-4 flex items-center">
          <Button 
            onClick={toggleVoiceControl}
            variant="outline"
            size="icon"
            className={`flex items-center justify-center p-2 rounded-full ${voiceActive ? 'bg-[#DD6B20]' : 'bg-gradient-to-r from-primary to-[#DD6B20]'} text-white shadow-lg hover:opacity-90 transition-all ${voiceActive ? 'animate-pulse' : ''} ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
            aria-label="Activate voice commands"
            style={{ transitionDuration: '0.5s', transitionDelay: '0.4s' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </Button>
          <span className={`ml-2 text-sm font-medium hidden md:inline transition-all duration-500 ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`}>{voiceStatus}</span>
          <div className={`ml-2 w-3 h-3 rounded-full ${isListening ? 'bg-[#DD6B20]' : voiceActive ? 'bg-[#48BB78]' : 'bg-neutral-400'} voice-indicator hidden md:block`}></div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
