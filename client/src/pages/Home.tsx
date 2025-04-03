import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis';
import HeroAnimation from '@/components/HeroAnimation';
import { indianWomenImages } from '@/assets/indian-women-images';
import heroSvg from '@/assets/indian-women-hero.svg';

const Home = () => {
  const { speak, cancel } = useSpeechSynthesis();
  const [isLoaded, setIsLoaded] = useState(false);

  const features = [
    {
      title: "Voice Navigation",
      description: "Navigate our website hands-free with simple voice commands, making technology accessible for everyone.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
        </svg>
      )
    },
    {
      title: "Text-to-Speech",
      description: "Have content read aloud to you, making information accessible for those with visual impairments or reading difficulties.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      )
    },
    {
      title: "Voice Input",
      description: "Use your voice to fill out forms, search for resources, and interact with our platform without typing.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
      )
    }
  ];

  const impactStats = [
    { number: "5K+", label: "Women Empowered" },
    { number: "200+", label: "Voice Resources" },
    { number: "50+", label: "Community Partners" },
    { number: "15", label: "States Reached" }
  ];

  // Simulate loading effect for hero animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    
    return () => {
      clearTimeout(timer);
      cancel();
    };
  }, [cancel]);

  const readHeroSection = () => {
    const heroText = "Empowering Women of India Through Voice Technology. Our mission is to provide accessible technology solutions that help women overcome barriers and find their voice in today's digital world.";
    speak(heroText);
  };

  const activateVoiceTour = () => {
    speak("Welcome to VoiceHer. We are on a mission to empower women of India through voice technology. You can navigate this website using voice commands. Try saying 'go to services' or 'read this page'.");
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative text-white overflow-hidden" style={{ minHeight: '650px' }}>
        {/* Background SVG with Animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-800 to-primary opacity-90 z-0">
          <div className="absolute inset-0 z-0">
            <img 
              src={indianWomenImages.hero.main} 
              alt="Indian women" 
              className="absolute inset-0 w-full h-full object-cover opacity-25 transition-opacity duration-1000"
              style={{ opacity: isLoaded ? 0.25 : 0 }}
              onLoad={() => setIsLoaded(true)}
            />
          </div>
          <HeroAnimation className="opacity-40" />
          <img 
            src={heroSvg} 
            alt="Women of India illustration" 
            className={`absolute inset-0 w-full h-full object-contain transition-all duration-1000 transform ${isLoaded ? 'scale-100 opacity-80' : 'scale-95 opacity-0'}`}
          />
        </div>

        <div className="container mx-auto px-4 py-20 md:py-28 lg:py-32 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className={`transition-all duration-700 delay-300 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-yellow-100">
                Empowering Women of India Through Voice Technology
              </h1>
              <p className="text-lg md:text-xl mb-8">
                Our mission is to provide accessible technology solutions that help women overcome barriers and find their voice in today's digital world.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button 
                  size="lg"
                  onClick={readHeroSection}
                  className="bg-[#DD6B20] hover:bg-[#F18D4D] text-white font-medium py-3 px-6 rounded-lg shadow-lg transition-all hover:shadow-xl hover:-translate-y-1"
                >
                  Learn More
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={activateVoiceTour}
                  className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-white/30 font-medium py-3 px-6 rounded-lg shadow-lg flex items-center justify-center transition-all hover:shadow-xl hover:-translate-y-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m-2.828-9.9a9 9 0 0112.728 0" />
                  </svg>
                  Voice Tour
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">How Voice Technology Helps</h2>
            <p className="text-lg text-neutral-700 max-w-2xl mx-auto">Our platform uses voice technology to break down barriers and create more accessible digital experiences.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-gray-50 hover:shadow-lg transition-all">
                <CardContent className="p-6 text-center">
                  <div className="bg-primary bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-neutral-900">{feature.title}</h3>
                  <p className="text-neutral-700">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-12 md:py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Impact</h2>
            <p className="text-lg max-w-2xl mx-auto opacity-90">We're committed to creating meaningful change through accessible technology.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {impactStats.map((stat, index) => (
              <div key={index} className="p-4">
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                <p className="text-sm md:text-base opacity-90">{stat.label}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-16 max-w-3xl mx-auto bg-white bg-opacity-10 rounded-lg p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/4 mb-6 md:mb-0 flex justify-center">
                <div className="rounded-full w-24 h-24 bg-white bg-opacity-20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
              </div>
              <div className="md:w-3/4 md:pl-8">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#DD6B20] opacity-80 mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-lg mb-4 italic">"As someone with visual impairments, this voice-enabled platform has been a game-changer for me. I can now access resources, build my skills, and connect with opportunities independently."</p>
                <p className="font-medium">Sarah Johnson, Digital Skills Graduate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">Ready to Explore Our Services?</h2>
          <div className="w-48 h-1 bg-gradient-to-r from-[#DD6B20] to-primary rounded-full mb-4 mx-auto"></div>
          <p className="text-lg text-neutral-700 max-w-2xl mx-auto mb-8">Discover how our voice-enabled platform can help you break barriers and access opportunities.</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/services">
              <Button size="lg" className="bg-primary hover:bg-primary-dark text-white">
                View Services
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-white">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
