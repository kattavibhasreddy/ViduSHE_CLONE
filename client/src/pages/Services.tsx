import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis';
import { indianWomenImages } from '@/assets/indian-women-images';

const Services = () => {
  const { speak, cancel } = useSpeechSynthesis();
  const [activeService, setActiveService] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  const services = [
    {
      id: 1,
      title: "Digital Literacy Training",
      description: "Learn essential digital skills with our voice-guided training programs designed specifically for women with varying levels of tech experience.",
      longDescription: "Our Digital Literacy Training provides comprehensive instruction on foundational technology skills. The program is designed to be fully accessible through voice commands, allowing participants to learn at their own pace. Topics include basic computer skills, internet navigation, online safety, email communication, and introduction to productivity software. All materials are available in audio format and can be navigated using simple voice commands.",
      image: indianWomenImages.services.digitalLiteracy
    },
    {
      id: 2,
      title: "Career Development",
      description: "Access voice-searchable job resources, resume assistance, and interview preparation designed to help women advance professionally.",
      longDescription: "Our Career Development service offers voice-enabled access to job listings, resume building tools, interview preparation resources, and personalized career coaching. Using voice commands, women can search for jobs, dictate resume content, practice interview questions, and receive feedback on their responses. Our career coaches provide guidance specifically tailored to overcoming barriers women face in various professional fields.",
      image: indianWomenImages.services.careerDevelopment
    },
    {
      id: 3,
      title: "Entrepreneurship Support",
      description: "Get voice-guided assistance for starting and growing your business, including resources for funding, marketing, and operations.",
      longDescription: "VoiceHer's Entrepreneurship Support program provides comprehensive resources for women business owners. Through voice-enabled tools, women can access step-by-step guidance on business planning, funding opportunities, marketing strategies, financial management, and operational best practices. The platform includes voice-searchable databases of grants and loans specifically for women entrepreneurs, and connects users with mentors who have successfully built businesses in similar fields.",
      image: indianWomenImages.services.entrepreneurship
    },
    {
      id: 4,
      title: "Mentorship Programs",
      description: "Connect with experienced mentors through our voice-enabled platform, making mentorship accessible regardless of location or schedule.",
      longDescription: "Our Mentorship Programs provide one-on-one guidance from experienced professionals in various fields. The voice-enabled platform allows mentees to schedule sessions, prepare questions, and engage in conversations with mentors regardless of geographic location. Mentors are trained to provide support that addresses the unique challenges women face in their professional journeys. Sessions can be conducted entirely through voice interface, making the program accessible to women with physical disabilities or those who are visually impaired.",
      image: indianWomenImages.services.mentorship
    }
  ];

  const handleLearnMore = (serviceId: number) => {
    setActiveService(serviceId);
  };

  const listenToDescription = (description: string) => {
    cancel(); // Cancel any ongoing speech
    speak(description);
  };

  return (
    <>
      <section className="relative py-12 md:py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-primary opacity-5" 
             style={{
               backgroundImage: `url(${indianWomenImages.hero.secondary})`,
               backgroundSize: 'cover',
               backgroundPosition: 'center',
               filter: 'blur(8px)'
             }}></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2 relative inline-block">
              Our Services
            </h1>
            <div className="w-48 h-1 bg-gradient-to-r from-[#DD6B20] to-primary rounded-full mb-2"></div>
            <p className="text-lg text-neutral-700 max-w-2xl mx-auto mt-6">
              We offer a range of services designed to empower women of India through accessible voice technology.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {services.map((service, index) => (
              <Card 
                key={service.id} 
                className={`bg-white overflow-hidden transition-all hover:shadow-xl flex flex-col md:flex-row border border-gray-200 rounded-lg transform hover:-translate-y-1 duration-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="md:w-2/5 h-48 md:h-auto relative overflow-hidden">
                  <div className="absolute inset-0 bg-primary opacity-20 z-10"></div>
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-110" 
                  />
                  <div className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full z-20">
                    Service {service.id}
                  </div>
                </div>
                <div className="p-6 md:w-3/5">
                  <h3 className="text-xl font-semibold mb-3 text-primary">{service.title}</h3>
                  <p className="text-neutral-700 mb-4">{service.description}</p>
                  <div className="flex items-center mt-auto">
                    <Button 
                      variant="ghost" 
                      onClick={() => handleLearnMore(service.id)}
                      className="text-[#DD6B20] hover:text-white hover:bg-[#DD6B20] font-medium flex items-center transition-colors"
                    >
                      Learn more
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </Button>
                    <Button 
                      variant="ghost"
                      onClick={() => listenToDescription(service.description)}
                      aria-label={`Listen to description of ${service.title}`}
                      className="ml-4 text-primary hover:text-white hover:bg-primary transition-colors group"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m-2.828-9.9a9 9 0 0112.728 0" />
                      </svg>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <Button 
              className="bg-gradient-to-r from-primary to-[#DD6B20] hover:from-[#DD6B20] hover:to-primary text-white px-8 py-3 rounded-lg shadow-lg transform transition-all hover:-translate-y-1 hover:shadow-xl"
              onClick={() => speak("Our services are designed to be fully accessible and voice-enabled, allowing all women to participate regardless of their technological background or physical abilities.")}
            >
              Learn About Our Approach
            </Button>
          </div>
        </div>
      </section>

      {/* Service Details Modal */}
      {activeService && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 backdrop-blur-sm transition-all duration-300">
          <div 
            className="bg-white rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-auto transform transition-all duration-500"
            style={{ 
              animation: 'modalFadeIn 0.4s ease-out forwards',
            }}
          >
            <div className="relative">
              <div className="h-56 md:h-64 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/50 z-10"></div>
                <img 
                  src={services[activeService - 1].image} 
                  alt={services[activeService - 1].title}
                  className="w-full h-full object-cover"
                />
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setActiveService(null)}
                  className="absolute top-4 right-4 text-white hover:bg-white/20 z-20 rounded-full p-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </Button>
              </div>

              <div className="p-6 md:p-8 -mt-10 bg-white rounded-t-3xl relative z-20">
                <div className="flex flex-col">
                  <span className="inline-block bg-primary text-white text-xs font-bold px-3 py-1 rounded-full mb-4 self-start">
                    Voice-Enabled Service
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2 relative inline-block">
                    {services[activeService - 1].title}
                  </h2>
                  <div className="w-32 h-1 bg-gradient-to-r from-[#DD6B20] to-primary rounded-full mb-4"></div>
                </div>
                
                <div className="prose prose-lg max-w-none mt-6">
                  <p className="text-neutral-700">{services[activeService - 1].longDescription}</p>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8">
                  <Button 
                    onClick={() => listenToDescription(services[activeService - 1].longDescription)}
                    className="flex items-center bg-gradient-to-r from-primary to-primary-dark text-white w-full sm:w-auto justify-center hover:opacity-90 transition-opacity"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m-2.828-9.9a9 9 0 0112.728 0" />
                    </svg>
                    Listen to Full Description
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setActiveService(null)}
                    className="border-primary text-primary hover:bg-primary hover:text-white transition-colors w-full sm:w-auto"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes modalFadeIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        `
      }} />
    </>
  );
};

export default Services;
