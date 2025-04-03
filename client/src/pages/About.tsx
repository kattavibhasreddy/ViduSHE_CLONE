import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis';

const About = () => {
  const { speak, cancel } = useSpeechSynthesis();

  const listenToContent = (contentId: string) => {
    cancel(); // Cancel any ongoing speech

    const element = document.getElementById(contentId);
    if (element) {
      speak(element.textContent || '');
    }
  };

  return (
    <section className="py-12 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-2xl md:text-3xl font-bold text-primary mb-2 relative inline-block">About ViduSHE</h1>
            <div className="w-48 h-1 bg-gradient-to-r from-[#DD6B20] to-primary rounded-full mb-2 mx-auto"></div>
            <p className="text-lg text-neutral-700">Learn about our mission, vision, and the team behind our social enterprise.</p>
          </div>
          
          <Card className="bg-white mb-10">
            <CardContent className="p-6 md:p-8">
              <h2 className="text-xl font-semibold mb-4">Our Story</h2>
              <div id="story-content">
                <p className="text-neutral-700 mb-4">ViduSHE was founded in 2025 with a simple yet powerful mission: to make technology accessible to all women, regardless of their technical background, physical abilities, or geographic location.</p>
                <p className="text-neutral-700 mb-4">We recognized that voice technology offers a unique opportunity to break down barriers to digital inclusion. For women who face literacy challenges, physical disabilities, or time constraints, voice-enabled features provide a pathway to access resources, build skills, and connect with opportunities.</p>
                <p className="text-neutral-700">Our platform aims to serve thousands of women across countries, offering voice-enabled resources, training, and support services designed to empower women in their personal and professional lives.</p>
              </div>
              
              <div className="mt-6 flex justify-end">
                <Button 
                  variant="ghost"
                  onClick={() => listenToContent('story-content')}
                  aria-label="Listen to our story"
                  className="text-primary hover:text-primary-dark flex items-center transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m-2.828-9.9a9 9 0 0112.728 0" />
                  </svg>
                  Listen to our story
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-white">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Our Mission</h2>
                <div id="mission-content">
                  <p className="text-neutral-700">To empower women through accessible technology, using voice-enabled features to break down barriers to digital inclusion and create pathways to opportunity.</p>
                </div>
                <Button 
                  variant="ghost"
                  onClick={() => listenToContent('mission-content')}
                  aria-label="Listen to our mission"
                  className="mt-4 text-primary hover:text-primary-dark flex items-center transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m-2.828-9.9a9 9 0 0112.728 0" />
                  </svg>
                  Listen
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-white">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Our Vision</h2>
                <div id="vision-content">
                  <p className="text-neutral-700">A world where all women have equal access to technology, information, and opportunities, regardless of their physical abilities, technical background, or geographic location.</p>
                </div>
                <Button 
                  variant="ghost"
                  onClick={() => listenToContent('vision-content')}
                  aria-label="Listen to our vision"
                  className="mt-4 text-primary hover:text-primary-dark flex items-center transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m-2.828-9.9a9 9 0 0112.728 0" />
                  </svg>
                  Listen
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white mt-10">
            <CardContent className="p-6 md:p-8">
              <h2 className="text-xl font-semibold mb-4">Our Values</h2>
              <div id="values-content">
                <ul className="list-disc pl-6 space-y-2 text-neutral-700">
                  <li><strong>Accessibility:</strong> We believe technology should be accessible to everyone, regardless of physical ability or technical background.</li>
                  <li><strong>Empowerment:</strong> We're committed to providing tools and resources that help women build confidence and independence.</li>
                  <li><strong>Inclusion:</strong> We design our services to accommodate diverse needs, experiences, and perspectives.</li>
                  <li><strong>Innovation:</strong> We continuously explore new ways to leverage voice technology to break down barriers.</li>
                  <li><strong>Community:</strong> We foster a supportive network where women can connect, learn, and grow together.</li>
                </ul>
              </div>
              
              <div className="mt-6 flex justify-start">
                <Button 
                  variant="ghost"
                  onClick={() => listenToContent('values-content')}
                  aria-label="Listen to our values"
                  className="text-primary hover:text-primary-dark flex items-center transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m-2.828-9.9a9 9 0 0112.728 0" />
                  </svg>
                  Listen to our values
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;
