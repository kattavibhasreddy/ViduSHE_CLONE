import { useState, useEffect } from 'react';
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { IndianStatesSelect } from '../components/IndianStatesSelect';

const SafeSpace = () => {
  const [activeTab, setActiveTab] = useState('legal');
  const [selectedState, setSelectedState] = useState<string>('');
  const [isAnimated, setIsAnimated] = useState(false);
  const { speak, cancel } = useSpeechSynthesis();
  const { startListening, stopListening, isListening } = useSpeechRecognition();
  
  // Quick escape functionality
  const handleQuickEscape = () => {
    window.location.href = 'https://google.com';
  };

  // Safety tips that can be read aloud
  const safetyTips = [
    "Create a safety plan with trusted friends or family members",
    "Keep important documents and emergency money in a safe, accessible place",
    "Have a code word with trusted people to indicate you need help",
    "Learn about local shelters or safe houses in your area",
    "Delete browser history after visiting support websites if your device is monitored",
    "Use a different device or public computer if your activities are being monitored"
  ];

  // Legal resources by category
  const legalResources = [
    {
      category: "Domestic Violence",
      resources: [
        {
          title: "Protection of Women from Domestic Violence Act, 2005",
          description: "Provides protection against physical, sexual, verbal, emotional, and economic abuse. Victims can seek protection orders, residence orders, monetary relief, and custody orders.",
          contact: "National Commission for Women: 011-26942369, 26944754"
        },
        {
          title: "Free Legal Aid",
          description: "Every woman has the right to free legal aid under the Legal Services Authorities Act. Contact your nearest District Legal Services Authority.",
          contact: "National Legal Aid Helpline: 15100"
        }
      ]
    },
    {
      category: "Sexual Harassment",
      resources: [
        {
          title: "Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013",
          description: "Protects women from sexual harassment at the workplace, both in public and private sectors. Every organization must have an Internal Complaints Committee.",
          contact: "Ministry of Women and Child Development: 1800-111-363"
        },
        {
          title: "Indian Penal Code Sections",
          description: "Sections 354A, 354B, 354C, and 354D of the IPC cover sexual harassment, disrobing, voyeurism, and stalking.",
          contact: "Women Helpline (All India): 1091"
        }
      ]
    },
    {
      category: "Cybercrime",
      resources: [
        {
          title: "Information Technology Act Sections",
          description: "Sections 66E, 67, 67A of the IT Act cover privacy violations and publishing/sharing obscene material online.",
          contact: "National Cyber Crime Reporting Portal: cybercrime.gov.in"
        },
        {
          title: "Online Reporting",
          description: "Report online harassment, stalking, or obscene content through the National Cyber Crime Reporting Portal.",
          contact: "Cyber Crime Helpline: 1930"
        }
      ]
    }
  ];

  // Support organizations
  const supportOrganizations = [
    {
      name: "National Commission for Women",
      description: "Government body dedicated to advocating for women's rights and addressing gender inequality issues.",
      contact: "011-26942369, 26944754",
      website: "http://ncw.nic.in/"
    },
    {
      name: "Shakti Shalini",
      description: "Provides shelter, legal aid, counseling, and support to women and children facing violence.",
      contact: "011-24373737",
      website: "http://shaktishalini.org/"
    },
    {
      name: "SNEHA",
      description: "Works on prevention of violence against women and children through direct service, research, and advocacy.",
      contact: "022-24042627, 24040045",
      website: "https://snehamumbai.org/"
    },
    {
      name: "Jagori",
      description: "Women's resource center that runs a crisis intervention and counseling center for women facing violence.",
      contact: "011-26692700",
      website: "http://jagori.org/"
    },
    {
      name: "Swayam",
      description: "Support and resource center for women facing any form of violence in their lives.",
      contact: "033-24863367, 24863368",
      website: "https://www.swayam.info/"
    }
  ];

  // Emergency helplines
  const emergencyHelplines = [
    { name: "Women Helpline (All India)", number: "1091" },
    { name: "Women Helpline (Domestic Abuse)", number: "181" },
    { name: "Police", number: "100" },
    { name: "National Commission for Women", number: "011-26942369" },
    { name: "Ambulance", number: "102" }
  ];

  // State-specific resources
  const stateResources = {
    "Delhi": [
      { name: "Delhi Commission for Women", contact: "011-23379181", website: "http://dcw.delhigovt.nic.in/" },
      { name: "Saheli Women's Resource Centre", contact: "011-24616485", website: "https://saheliwomen.org/" }
    ],
    "Maharashtra": [
      { name: "Maharashtra State Commission for Women", contact: "022-26592707", website: "https://mscw.maharashtra.gov.in/" },
      { name: "Special Cell for Women and Children", contact: "022-22621679", website: "https://www.tiss.edu/view/6/mumbai-campus/special-cell-for-women-and-children/about-us-6/" }
    ],
    "Karnataka": [
      { name: "Karnataka State Women's Commission", contact: "080-22100435", website: "https://kswc.karnataka.gov.in/" },
      { name: "Vimochana", contact: "080-25492781", website: "http://vimochana.co.in/" }
    ],
    "Tamil Nadu": [
      { name: "Tamil Nadu State Commission for Women", contact: "044-28551155", website: "http://www.tnsocialwelfare.org/pages/display/women-development" },
      { name: "International Foundation for Crime Prevention and Victim Care", contact: "044-43111143", website: "https://www.pcvconline.org/" }
    ],
    "West Bengal": [
      { name: "West Bengal Commission for Women", contact: "033-22499594", website: "https://www.wbcw.in/" },
      { name: "Swayam", contact: "033-24863367", website: "https://www.swayam.info/" }
    ]
  };

  // Read aloud functionality
  const readText = (text: string) => {
    cancel(); // Cancel any ongoing speech
    speak(text);
  };

  useEffect(() => {
    // Animation effect when component mounts
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  // Handle voice commands specific to this page
  const activateVoiceAssistant = () => {
    if (isListening) {
      stopListening();
      return;
    }

    startListening({
      onResult: (result) => {
        const command = result.toLowerCase();
        
        if (command.includes('legal resources') || command.includes('legal help')) {
          setActiveTab('legal');
        } else if (command.includes('support') || command.includes('organizations')) {
          setActiveTab('support');
        } else if (command.includes('safety') || command.includes('tips')) {
          setActiveTab('safety');
        } else if (command.includes('emergency') || command.includes('helpline')) {
          setActiveTab('emergency');
        } else if (command.includes('read safety tips')) {
          readText(safetyTips.join(". "));
        } else if (command.includes('escape') || command.includes('leave page')) {
          handleQuickEscape();
        }
      },
      onEnd: () => {
        // Voice recognition ends
      }
    });
  };

  // Get state-specific resources based on selection
  const getStateSpecificResources = () => {
    if (!selectedState || !stateResources[selectedState as keyof typeof stateResources]) {
      return null;
    }

    const resources = stateResources[selectedState as keyof typeof stateResources];
    
    return (
      <div className="mt-6 space-y-4">
        <h3 className="text-lg font-medium">Resources in {selectedState}</h3>
        {resources.map((resource, index) => (
          <Card key={index} className="border-l-4 border-l-primary">
            <CardContent className="p-4">
              <h4 className="font-medium">{resource.name}</h4>
              <p className="text-sm mt-1">Contact: {resource.contact}</p>
              <a href={resource.website} target="_blank" rel="noopener noreferrer" className="text-sm text-primary mt-1 block">
                Visit Website
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Quick Escape Button */}
        <div className="flex justify-end mb-6">
          <Button 
            onClick={handleQuickEscape}
            variant="destructive"
            className="font-semibold flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Quick Escape
          </Button>
        </div>

        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">Safe Space</h1>
          <div className="w-48 h-1 bg-gradient-to-r from-[#DD6B20] to-primary rounded-full mb-4 mx-auto"></div>
          <p className="text-lg text-neutral-700 max-w-3xl mx-auto">
            A private and safe environment with resources and support for women experiencing harassment, abuse, or domestic violence.
          </p>
          
          {/* Voice assistant for this specific page */}
          <Button 
            onClick={activateVoiceAssistant}
            variant="outline"
            className={`mt-4 ${isListening ? 'bg-[#DD6B20] text-white animate-pulse' : 'bg-white text-primary'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
            {isListening ? 'Listening...' : 'Voice Assistant'}
          </Button>
        </div>

        {/* Safety Alert */}
        <Alert className="mb-8 border-amber-300 bg-amber-50">
          <AlertDescription className="flex items-center text-amber-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>
              <strong>Your safety is important:</strong> If you think someone might be monitoring your device, consider using a public computer or incognito mode. You can press the "Quick Escape" button at any time to quickly exit this page.
            </span>
          </AlertDescription>
        </Alert>

        {/* Main Content Tabs */}
        <Tabs defaultValue="legal" value={activeTab} onValueChange={setActiveTab} className="max-w-5xl mx-auto">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="legal" className="text-sm md:text-base py-3">Legal Resources</TabsTrigger>
            <TabsTrigger value="support" className="text-sm md:text-base py-3">Support Organizations</TabsTrigger>
            <TabsTrigger value="safety" className="text-sm md:text-base py-3">Safety Tips</TabsTrigger>
            <TabsTrigger value="emergency" className="text-sm md:text-base py-3">Emergency Helplines</TabsTrigger>
          </TabsList>
          
          {/* Legal Resources Tab */}
          <TabsContent value="legal" className={`transition-all duration-500 ${isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-semibold mb-6 text-primary">Legal Resources</h2>
                <p className="mb-6 text-neutral-700">
                  Understanding your legal rights is crucial when facing harassment, abuse, or violence. 
                  Below are key laws and resources that offer protection and support.
                </p>
                
                <Accordion type="single" collapsible className="mb-8">
                  {legalResources.map((category, idx) => (
                    <AccordionItem key={idx} value={`item-${idx}`}>
                      <AccordionTrigger className="text-left">{category.category}</AccordionTrigger>
                      <AccordionContent>
                        {category.resources.map((resource, resourceIdx) => (
                          <div key={resourceIdx} className="mb-4 pb-4 border-b border-gray-100 last:border-0">
                            <h4 className="font-medium text-primary">{resource.title}</h4>
                            <p className="mt-1 text-sm text-neutral-700">{resource.description}</p>
                            <p className="mt-1 text-sm"><span className="font-medium">Contact:</span> {resource.contact}</p>
                            
                            {/* Voice reading for each resource */}
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => readText(`${resource.title}. ${resource.description}`)}
                              className="mt-2 text-primary hover:text-primary-dark hover:bg-primary-50"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m-2.828-9.9a9 9 0 0112.728 0" />
                              </svg>
                              Listen
                            </Button>
                          </div>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
              
              <div>
                <h2 className="text-2xl font-semibold mb-6 text-primary">State-Specific Resources</h2>
                <p className="mb-6 text-neutral-700">
                  Select your state to find local resources, organizations, and support services that can provide more targeted assistance.
                </p>
                
                <div className="mb-6">
                  <IndianStatesSelect value={selectedState} onChange={setSelectedState} />
                </div>
                
                {getStateSpecificResources()}
              </div>
            </div>
          </TabsContent>
          
          {/* Support Organizations Tab */}
          <TabsContent value="support" className={`transition-all duration-500 ${isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <h2 className="text-2xl font-semibold mb-6 text-primary">Support Organizations</h2>
            <p className="mb-6 text-neutral-700">
              These organizations provide various forms of support including counseling, shelter, legal aid, and other assistance to women facing difficult situations.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              {supportOrganizations.map((org, idx) => (
                <Card key={idx} className="overflow-hidden border-gray-200 hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-primary">{org.name}</h3>
                    <p className="text-neutral-700 mb-4">{org.description}</p>
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <div>
                          <p className="font-medium">Contact</p>
                          <p className="text-neutral-700">{org.contact}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mt-1 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                          <p className="font-medium">Website</p>
                          <a 
                            href={org.website} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-primary hover:underline"
                          >
                            {org.website.replace(/(^\w+:|^)\/\//, '').replace(/\/$/, '')}
                          </a>
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => readText(`${org.name}. ${org.description}. Contact: ${org.contact}`)}
                      className="mt-4 text-primary hover:text-primary-dark hover:bg-primary-50"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m-2.828-9.9a9 9 0 0112.728 0" />
                      </svg>
                      Listen
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* Safety Tips Tab */}
          <TabsContent value="safety" className={`transition-all duration-500 ${isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-semibold mb-6 text-primary">Safety Planning</h2>
                <p className="mb-6 text-neutral-700">
                  Safety planning is about creating strategies to increase your safety in difficult situations. 
                  These tips can help you prepare for and respond to situations that might be dangerous.
                </p>
                
                <Card className="mb-6 bg-gray-50">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4 text-primary">Essential Safety Tips</h3>
                    <ul className="space-y-4">
                      {safetyTips.map((tip, idx) => (
                        <li key={idx} className="flex">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      onClick={() => readText("Essential Safety Tips: " + safetyTips.join(". "))}
                      className="mt-6 bg-primary hover:bg-primary-dark text-white"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m-2.828-9.9a9 9 0 0112.728 0" />
                      </svg>
                      Listen to All Tips
                    </Button>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <h2 className="text-2xl font-semibold mb-6 text-primary">Digital Safety</h2>
                <p className="mb-6 text-neutral-700">
                  In today's digital world, it's important to protect your privacy and safety online, 
                  especially if someone might be monitoring your activities.
                </p>
                
                <Card className="mb-6 bg-gray-50">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4 text-primary">Digital Safety Tips</h3>
                    <ul className="space-y-4">
                      <li className="flex">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <span>Use private browsing or incognito mode when searching for help</span>
                      </li>
                      <li className="flex">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <span>Check your device for spyware or monitoring software</span>
                      </li>
                      <li className="flex">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <span>Create new email accounts that your abuser doesn't know about</span>
                      </li>
                      <li className="flex">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <span>Use strong, unique passwords for all accounts</span>
                      </li>
                      <li className="flex">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <span>Be cautious about location sharing on social media and apps</span>
                      </li>
                      <li className="flex">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <span>Consider using a VPN for added privacy protection</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Alert className="border-primary/20 bg-primary/5">
                  <AlertDescription className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>
                      Remember that complete digital privacy can be difficult to achieve if someone has access to your devices. When seeking help, consider using a device that the abuser doesn't have access to, such as a public computer at a library.
                    </span>
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          </TabsContent>
          
          {/* Emergency Helplines Tab */}
          <TabsContent value="emergency" className={`transition-all duration-500 ${isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <h2 className="text-2xl font-semibold mb-6 text-primary">Emergency Helplines</h2>
            <p className="mb-6 text-neutral-700">
              These national helplines are available 24/7 to provide immediate assistance in emergency situations.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {emergencyHelplines.map((helpline, idx) => (
                <Card key={idx} className={`border-l-4 ${idx === 0 ? 'border-l-red-500' : idx === 1 ? 'border-l-purple-500' : 'border-l-primary'}`}>
                  <CardContent className="p-5">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{helpline.name}</h3>
                        <p className="text-xl font-bold text-primary mt-1">{helpline.number}</p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-primary hover:bg-primary/10"
                        onClick={() => readText(`${helpline.name}: ${helpline.number.split('').join(' ')}`)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m-2.828-9.9a9 9 0 0112.728 0" />
                        </svg>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Alert className="mt-8 border-amber-300 bg-amber-50">
              <AlertDescription className="flex items-center text-amber-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>
                  In case of immediate danger, always call 100 for police assistance first. These helplines are available for advice, support, and intervention, but emergency services should be contacted in life-threatening situations.
                </span>
              </AlertDescription>
            </Alert>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default SafeSpace;