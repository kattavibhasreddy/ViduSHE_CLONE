import { useState, useEffect, useCallback } from 'react';

interface SpeechRecognitionOptions {
  onResult?: (result: string) => void;
  onEnd?: () => void;
  continuous?: boolean;
  language?: string;
}

export const useSpeechRecognition = () => {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);

  let recognition: SpeechRecognition | null = null;

  useEffect(() => {
    // Check if the browser supports the Web Speech API
    if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      setError('Speech recognition is not supported in this browser');
      return;
    }
    
    // Clean up
    return () => {
      if (recognition) {
        recognition.onresult = null;
        recognition.onend = null;
        recognition.onerror = null;
        recognition.abort();
      }
    };
  }, []);

  const startListening = useCallback(({
    onResult,
    onEnd,
    continuous = false,
    language = 'en-US'
  }: SpeechRecognitionOptions = {}) => {
    if (error) return;

    // Initialize the SpeechRecognition object
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    
    // Configure the recognition
    recognition.lang = language;
    recognition.continuous = continuous;
    recognition.interimResults = false;
    
    // Set up event handlers
    recognition.onresult = (event) => {
      const result = event.results[0][0].transcript;
      if (onResult) onResult(result);
    };
    
    recognition.onend = () => {
      setIsListening(false);
      if (onEnd) onEnd();
    };
    
    recognition.onerror = (event) => {
      setError(event.error);
      setIsListening(false);
      if (onEnd) onEnd();
    };
    
    // Start listening
    try {
      recognition.start();
      setIsListening(true);
    } catch (err) {
      setError('Failed to start speech recognition');
      setIsListening(false);
    }
  }, [error]);
  
  const stopListening = useCallback(() => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  }, []);

  return {
    isListening,
    error,
    startListening,
    stopListening
  };
};
