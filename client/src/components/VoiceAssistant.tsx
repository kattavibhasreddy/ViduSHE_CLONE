import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis';
import { useLocation } from 'wouter';
import { handleVoiceCommand } from '@/assets/speech-commands';

interface VoiceAssistantProps {
  onActivate?: () => void;
}

const VoiceAssistant = ({ onActivate }: VoiceAssistantProps) => {
  const [isActive, setIsActive] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [location, setLocation] = useLocation();
  const { startListening, stopListening, isListening } = useSpeechRecognition();
  const { speak, cancel } = useSpeechSynthesis();
  const feedbackRef = useRef<HTMLDivElement>(null);

  const toggleVoiceAssistant = () => {
    if (isActive) {
      setIsActive(false);
      setFeedback('');
      stopListening();
      cancel();
    } else {
      setIsActive(true);
      setFeedback('Listening...');
      if (onActivate) onActivate();
      
      startListening({
        onResult: (result) => {
          setFeedback(`"${result}"`);
          const action = handleVoiceCommand(result);
          
          if (action.type === 'navigate') {
            setLocation(action.path);
          } else if (action.type === 'read') {
            // Read the current page content
            const selector = action.selector || 'main';
            const elementToRead = document.querySelector(selector);
            if (elementToRead) {
              speak(elementToRead.textContent || 'No content to read');
            }
          } else if (action.type === 'stop') {
            cancel();
          } else if (action.type === 'search') {
            // Handle search
            const searchInput = document.querySelector('input[type="search"]') as HTMLInputElement;
            if (searchInput) {
              searchInput.value = action.query || '';
              searchInput.dispatchEvent(new Event('input', { bubbles: true }));
            }
          } else if (action.type === 'form') {
            // Fill form field
            const input = document.querySelector(`[name="${action.field}"]`) as HTMLInputElement;
            if (input) {
              input.value = action.value || '';
              input.dispatchEvent(new Event('input', { bubbles: true }));
            }
          }
        },
        onEnd: () => {
          setTimeout(() => {
            setFeedback('');
            setIsActive(false);
          }, 2000);
        }
      });
    }
  };

  useEffect(() => {
    // Show/hide feedback panel
    if (feedbackRef.current) {
      if (feedback) {
        feedbackRef.current.style.transform = 'scale(1)';
      } else {
        feedbackRef.current.style.transform = 'scale(0)';
      }
    }
  }, [feedback]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div 
        ref={feedbackRef}
        className="mb-4 bg-white rounded-lg shadow-lg p-4 max-w-xs transform transition-all scale-0 origin-bottom-right"
      >
        <p className="text-neutral-700 text-sm">{feedback}</p>
      </div>
      <Button
        onClick={toggleVoiceAssistant}
        className={`${isActive ? 'bg-[#F56565]' : 'bg-[#DD6B20]'} hover:bg-[#F18D4D] text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition-all ${isActive ? 'animate-pulse' : ''}`}
        aria-label="Voice assistant"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      </Button>
    </div>
  );
};

export default VoiceAssistant;
