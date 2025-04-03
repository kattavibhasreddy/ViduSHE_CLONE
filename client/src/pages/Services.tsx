import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis';

const Services = () => {
  const { speak, cancel } = useSpeechSynthesis();
  const [activeService, setActiveService] = useState<number | null>(null);

  const services = [
    {
      id: 1,
      title: "Digital Literacy Training",
      description: "Learn essential digital skills with our voice-guided training programs designed specifically for women with varying levels of tech experience.",
      longDescription: "Our Digital Literacy Training provides comprehensive instruction on foundational technology skills. The program is designed to be fully accessible through voice commands, allowing participants to learn at their own pace. Topics include basic computer skills, internet navigation, online safety, email communication, and introduction to productivity software. All materials are available in audio format and can be navigated using simple voice commands.",
      image: "https://images.unsplash.com/photo-1571974599782-fac5395259ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=350&q=80"
    },
    {
      id: 2,
      title: "Career Development",
      description: "Access voice-searchable job resources, resume assistance, and interview preparation designed to help women advance professionally.",
      longDescription: "Our Career Development service offers voice-enabled access to job listings, resume building tools, interview preparation resources, and personalized career coaching. Using voice commands, women can search for jobs, dictate resume content, practice interview questions, and receive feedback on their responses. Our career coaches provide guidance specifically tailored to overcoming barriers women face in various professional fields.",
      image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=350&q=80"
    },
    {
      id: 3,
      title: "Entrepreneurship Support",
      description: "Get voice-guided assistance for starting and growing your business, including resources for funding, marketing, and operations.",
      longDescription: "VoiceHer's Entrepreneurship Support program provides comprehensive resources for women business owners. Through voice-enabled tools, women can access step-by-step guidance on business planning, funding opportunities, marketing strategies, financial management, and operational best practices. The platform includes voice-searchable databases of grants and loans specifically for women entrepreneurs, and connects users with mentors who have successfully built businesses in similar fields.",
      image: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=350&q=80"
    },
    {
      id: 4,
      title: "Mentorship Programs",
      description: "Connect with experienced mentors through our voice-enabled platform, making mentorship accessible regardless of location or schedule.",
      longDescription: "Our Mentorship Programs provide one-on-one guidance from experienced professionals in various fields. The voice-enabled platform allows mentees to schedule sessions, prepare questions, and engage in conversations with mentors regardless of geographic location. Mentors are trained to provide support that addresses the unique challenges women face in their professional journeys. Sessions can be conducted entirely through voice interface, making the program accessible to women with physical disabilities or those who are visually impaired.",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=350&q=80"
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
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-2xl md:text-3xl font-bold text-primary mb-4">Our Services</h1>
            <p className="text-lg text-neutral-700 max-w-2xl mx-auto">
              We offer a range of services designed to empower women through accessible technology.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {services.map((service) => (
              <Card key={service.id} className="bg-white overflow-hidden transition-all hover:shadow-lg flex flex-col md:flex-row">
                <div className="md:w-1/3 h-48 md:h-auto">
                  <img src={service.image} alt={service.title} className="h-full w-full object-cover" />
                </div>
                <div className="p-6 md:w-2/3">
                  <h3 className="text-xl font-semibold mb-3 text-neutral-900">{service.title}</h3>
                  <p className="text-neutral-700 mb-4">{service.description}</p>
                  <div className="flex items-center">
                    <Button 
                      variant="ghost" 
                      onClick={() => handleLearnMore(service.id)}
                      className="text-[#DD6B20] hover:text-[#BA5A1A] font-medium flex items-center"
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
                      className="ml-4 text-primary hover:text-primary-dark"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m-2.828-9.9a9 9 0 0112.728 0" />
                      </svg>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Details Modal */}
      {activeService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-primary">{services[activeService - 1].title}</h2>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setActiveService(null)}
                  className="text-neutral-500 hover:text-neutral-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </Button>
              </div>
              <div className="mb-6">
                <img 
                  src={services[activeService - 1].image} 
                  alt={services[activeService - 1].title}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
              <p className="text-neutral-700 mb-6">{services[activeService - 1].longDescription}</p>
              <div className="flex justify-between">
                <Button 
                  onClick={() => listenToDescription(services[activeService - 1].longDescription)}
                  className="flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m-2.828-9.9a9 9 0 0112.728 0" />
                  </svg>
                  Listen to Description
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setActiveService(null)}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Services;
