import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis';

const Navigation = () => {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [voiceActive, setVoiceActive] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState('Voice Commands');
  const { startListening, stopListening, isListening } = useSpeechRecognition();
  const { speak } = useSpeechSynthesis();

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

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex flex-wrap items-center justify-between">
        <div className="flex items-center">
          <Link href="/">
            <a className="flex items-center">
              <svg className="h-10 w-10 mr-3 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" fill="currentColor" fillOpacity="0.2" />
                <path d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" 
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <h1 className="text-primary font-bold text-2xl">VoiceHer</h1>
            </a>
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMobileMenu}
          className="md:hidden flex items-center px-3 py-2 border rounded text-primary border-primary hover:text-primary-dark hover:border-primary-dark"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
        
        {/* Navigation Links */}
        <nav className={`${mobileMenuOpen ? 'block' : 'hidden'} md:flex w-full md:w-auto mt-4 md:mt-0`}>
          <ul className="flex flex-col md:flex-row md:items-center md:space-x-8 space-y-2 md:space-y-0">
            <li>
              <Link href="/">
                <a className={`${location === '/' ? 'text-primary-dark' : 'text-neutral-700'} hover:text-primary font-medium`}>
                  Home
                </a>
              </Link>
            </li>
            <li>
              <Link href="/services">
                <a className={`${location === '/services' ? 'text-primary-dark' : 'text-neutral-700'} hover:text-primary font-medium`}>
                  Services
                </a>
              </Link>
            </li>
            <li>
              <Link href="/resources">
                <a className={`${location === '/resources' ? 'text-primary-dark' : 'text-neutral-700'} hover:text-primary font-medium`}>
                  Resources
                </a>
              </Link>
            </li>
            <li>
              <Link href="/about">
                <a className={`${location === '/about' ? 'text-primary-dark' : 'text-neutral-700'} hover:text-primary font-medium`}>
                  About Us
                </a>
              </Link>
            </li>
            <li>
              <Link href="/contact">
                <a className={`${location === '/contact' ? 'text-primary-dark' : 'text-neutral-700'} hover:text-primary font-medium`}>
                  Contact
                </a>
              </Link>
            </li>
          </ul>
        </nav>
        
        {/* Voice Navigation Control */}
        <div className="ml-4 flex items-center">
          <Button 
            onClick={toggleVoiceControl}
            variant="outline"
            size="icon"
            className={`flex items-center justify-center p-2 rounded-full ${voiceActive ? 'bg-[#DD6B20]' : 'bg-primary'} text-white shadow-lg hover:bg-primary-dark transition-all ${voiceActive ? 'animate-pulse' : ''}`}
            aria-label="Activate voice commands"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </Button>
          <span className="ml-2 text-sm font-medium hidden md:inline">{voiceStatus}</span>
          <div className={`ml-2 w-3 h-3 rounded-full ${isListening ? 'bg-[#DD6B20]' : voiceActive ? 'bg-[#48BB78]' : 'bg-neutral-400'} voice-indicator hidden md:block`}></div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
