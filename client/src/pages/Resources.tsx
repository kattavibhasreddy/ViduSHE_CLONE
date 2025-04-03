import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge'; 
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis';
import { indianWomenImages, indianDesignPatterns } from '@/assets/indian-women-images';

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoaded, setIsLoaded] = useState(false);
  const { startListening, stopListening, isListening } = useSpeechRecognition();
  const { speak } = useSpeechSynthesis();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  const categories = [
    { id: 'all', name: 'All Resources' },
    { id: 'career', name: 'Career' },
    { id: 'education', name: 'Education' },
    { id: 'technology', name: 'Technology' },
    { id: 'entrepreneurship', name: 'Entrepreneurship' },
    { id: 'wellbeing', name: 'Wellbeing' }
  ];

  const resources = [
    {
      id: 1,
      title: 'Resume Building Guide',
      description: 'A comprehensive guide to creating a standout resume that highlights your skills and experience effectively.',
      category: 'career'
    },
    {
      id: 2,
      title: 'Digital Literacy Basics',
      description: 'Learn essential digital skills from using computers and smartphones to navigating the internet safely.',
      category: 'technology'
    },
    {
      id: 3,
      title: 'Business Planning Template',
      description: 'A step-by-step guide to creating a comprehensive business plan for your new venture or existing business.',
      category: 'entrepreneurship'
    },
    {
      id: 4,
      title: 'Online Learning Platforms',
      description: 'A curated list of accessible learning platforms with courses specifically designed for women in technology.',
      category: 'education'
    },
    {
      id: 5,
      title: 'Networking Tips for Introverts',
      description: 'Practical strategies for building professional connections even if you identify as an introvert.',
      category: 'career'
    },
    {
      id: 6,
      title: 'Digital Marketing Essentials',
      description: 'Learn the fundamentals of promoting your business online through social media, email, and content marketing.',
      category: 'entrepreneurship'
    },
    {
      id: 7,
      title: 'Self-Care Guide for Busy Women',
      description: 'Simple wellness practices you can incorporate into even the busiest schedule to maintain physical and mental health.',
      category: 'wellbeing'
    },
    {
      id: 8,
      title: 'Cybersecurity Best Practices',
      description: 'Protect yourself and your information online with these essential security tips for everyday internet users.',
      category: 'technology'
    },
    {
      id: 9,
      title: 'Funding Resources for Women Entrepreneurs',
      description: 'A comprehensive guide to grants, loans, and investment opportunities specifically for women-owned businesses.',
      category: 'entrepreneurship'
    }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const activateVoiceSearch = () => {
    if (isListening) return;
    
    startListening({
      onResult: (result) => {
        setSearchTerm(result);
      },
      onEnd: () => {
        // Search functionality ends
      }
    });
  };

  const listenToResource = (resource: any) => {
    speak(`${resource.title}. ${resource.description}`);
  };

  return (
    <section id="resources" className="relative py-12 md:py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-primary opacity-5" 
           style={{
             backgroundImage: `url(${indianDesignPatterns.kolam})`,
             backgroundSize: 'cover',
             backgroundPosition: 'center',
             filter: 'blur(3px)'
           }}></div>
           
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2 relative inline-block">
            Indian Women's Resource Library
          </h1>
          <div className="w-64 h-1 bg-gradient-to-r from-[#DD6B20] to-primary rounded-full mb-2"></div>
          <p className="text-lg text-neutral-700 max-w-2xl mx-auto mt-4">
            Access our collection of voice-searchable resources designed specifically for Indian women to support your personal and professional journey.
          </p>
        </div>
        
        {/* Voice Search Bar with Indian design elements */}
        <div className="max-w-2xl mx-auto mb-12 relative">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary opacity-10 rounded-full -translate-y-1/2 translate-x-1/4"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-[#DD6B20] opacity-10 rounded-full translate-y-1/2 -translate-x-1/4"></div>
          
          <div className="relative bg-white shadow-lg rounded-xl p-2 border border-gray-100">
            <Input
              type="search"
              placeholder="Search resources using text or voice..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full px-4 py-4 pl-12 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            />
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <Button 
              onClick={activateVoiceSearch}
              aria-label="Search with voice"
              className={`absolute inset-y-0 right-2 my-auto h-10 flex items-center px-4 bg-gradient-to-r from-primary to-primary-dark text-white rounded-lg hover:opacity-90 transition-all ${isListening ? 'animate-pulse' : ''}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
              Voice Search
            </Button>
          </div>
        </div>
        
        {/* Filter Categories - Styled for Indian theme */}
        <div className={`flex flex-wrap justify-center gap-3 mb-10 transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {categories.map((category, index) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-5 py-2 rounded-full text-sm transition-all duration-300 shadow-sm ${
                selectedCategory === category.id
                  ? "bg-gradient-to-r from-primary to-[#DD6B20] text-white"
                  : "bg-white text-gray-700 hover:bg-primary hover:text-white border border-gray-200"
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {category.name}
            </Button>
          ))}
        </div>
        
        {/* Resource Cards - Indian style with animations */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource, index) => (
            <Card 
              key={resource.id} 
              className={`bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all overflow-hidden transform hover:-translate-y-1 duration-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="h-2 bg-gradient-to-r from-primary to-[#DD6B20]"></div>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <Badge 
                    className="bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full capitalize border-none"
                  >
                    {resource.category}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => listenToResource(resource)}
                    aria-label={`Listen to resource: ${resource.title}`}
                    className="text-primary hover:text-white hover:bg-primary transition-all rounded-full w-8 h-8 p-0 flex items-center justify-center group"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m-2.828-9.9a9 9 0 0112.728 0" />
                    </svg>
                  </Button>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-primary">{resource.title}</h3>
                <p className="text-neutral-700 text-sm mb-4">{resource.description}</p>
                <Button 
                  variant="link" 
                  className="text-[#DD6B20] hover:text-[#BA5A1A] font-medium text-sm flex items-center p-0 transition-all group"
                >
                  Access Resource
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Button>
              </CardContent>
            </Card>
          ))}

          {filteredResources.length === 0 && (
            <div className="col-span-full text-center py-8">
              <p className="text-neutral-700">No resources found. Try a different search term or category.</p>
            </div>
          )}
          
          {filteredResources.length > 0 && filteredResources.length < resources.length && (
            <div className="col-span-full flex justify-center mt-8">
              <Button 
                variant="outline"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="border border-primary text-primary hover:bg-primary hover:text-white font-medium flex items-center"
              >
                View All Resources
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Resources;
