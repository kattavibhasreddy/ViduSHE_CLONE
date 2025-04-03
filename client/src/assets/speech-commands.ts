interface NavigateAction {
  type: 'navigate';
  path: string;
}

interface ReadAction {
  type: 'read';
  selector?: string;
}

interface SearchAction {
  type: 'search';
  query: string;
}

interface FormAction {
  type: 'form';
  field: string;
  value: string;
}

interface StopAction {
  type: 'stop';
}

interface UnknownAction {
  type: 'unknown';
}

type VoiceAction = 
  | NavigateAction
  | ReadAction
  | SearchAction
  | FormAction
  | StopAction
  | UnknownAction;

export const handleVoiceCommand = (command: string): VoiceAction => {
  const lowerCommand = command.toLowerCase().trim();
  
  // Navigation commands
  if (lowerCommand.includes('go to home') || lowerCommand.includes('navigate to home') || lowerCommand === 'home') {
    return { type: 'navigate', path: '/' };
  }
  
  if (lowerCommand.includes('go to services') || lowerCommand.includes('navigate to services') || lowerCommand === 'services') {
    return { type: 'navigate', path: '/services' };
  }
  
  if (lowerCommand.includes('go to resources') || lowerCommand.includes('navigate to resources') || lowerCommand === 'resources') {
    return { type: 'navigate', path: '/resources' };
  }
  
  if (lowerCommand.includes('go to about') || lowerCommand.includes('navigate to about') || lowerCommand === 'about') {
    return { type: 'navigate', path: '/about' };
  }
  
  if (lowerCommand.includes('go to contact') || lowerCommand.includes('navigate to contact') || lowerCommand === 'contact') {
    return { type: 'navigate', path: '/contact' };
  }
  
  // Reading commands
  if (lowerCommand.includes('read page') || lowerCommand.includes('read this page')) {
    return { type: 'read', selector: 'main' };
  }
  
  if (lowerCommand.includes('read section')) {
    return { type: 'read', selector: '.section-content' };
  }
  
  if (lowerCommand.includes('read paragraph')) {
    return { type: 'read', selector: 'p' };
  }
  
  // Stop reading
  if (lowerCommand.includes('stop reading') || lowerCommand.includes('stop speaking') || lowerCommand === 'stop') {
    return { type: 'stop' };
  }
  
  // Search commands
  if (lowerCommand.includes('search for')) {
    const query = lowerCommand.split('search for')[1].trim();
    return { type: 'search', query };
  }
  
  // Form filling commands
  if (lowerCommand.includes('fill name')) {
    const value = lowerCommand.split('fill name')[1].trim();
    return { type: 'form', field: 'name', value };
  }
  
  if (lowerCommand.includes('fill email')) {
    const value = lowerCommand.split('fill email')[1].trim();
    return { type: 'form', field: 'email', value };
  }
  
  if (lowerCommand.includes('fill message')) {
    const value = lowerCommand.split('fill message')[1].trim();
    return { type: 'form', field: 'message', value };
  }
  
  // If no command matches
  return { type: 'unknown' };
};
