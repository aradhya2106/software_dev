import OpenAI from 'openai';
import { fallbackResponses } from './fallbackResponses';

// Mock responses for when the OpenAI API is unavailable or quota is exceeded
export const mockResponses = {
  // General greeting responses
  greeting: [
    "Hello! I'm here to help with your career questions. What would you like to discuss today?",
    "Welcome! I'm your AI career counselor. How can I assist with your career journey?",
    "Hi there! I'd be happy to discuss your career goals and options. What's on your mind?"
  ],
  
  // Resume and job application responses
  resume: fallbackResponses.resume,
  
  // Interview preparation responses
  interview: fallbackResponses.interview,
  
  // Career change advice
  careerChange: fallbackResponses.careerTransition,
  
  // Job search strategies
  jobSearch: [
    "Diversify your job search beyond just online applications. Networking, industry events, and direct outreach can be more effective strategies.",
    "Customize your application materials for each position. Generic applications are often quickly identified and overlooked by hiring managers.",
    "Consider working with a recruiter who specializes in your industry. They often have access to positions that aren't publicly advertised."
  ],
  
  // Skill development advice
  skillDevelopment: [
    "Continuous learning is essential in today's rapidly changing job market. Consider what skills are becoming more valuable in your field.",
    "Online platforms like Coursera, LinkedIn Learning, and edX offer courses in virtually any skill you might want to develop.",
    "Don't overlook soft skills like communication, leadership, and adaptability - they're increasingly valued across all industries."
  ],
  
  // Computer Science specific career advice
  computerScience: fallbackResponses.computerScience,
  
  // Programming language advice
  programmingLanguages: fallbackResponses.programmingLanguages,
  
  // Remote work advice
  remoteWork: fallbackResponses.remoteWork,
  
  // Leadership and management
  leadership: fallbackResponses.leadership,
  
  // Salary negotiation
  salaryNegotiation: fallbackResponses.salaryNegotiation,
  
  // Default responses for when no specific topic is identified
  default: [
    "That's an interesting question about your career path. I'd recommend considering both your skills and passions when making decisions.",
    "Career development is a journey rather than a destination. Regular reflection on your goals and progress can help guide your path.",
    "It's important to balance immediate opportunities with long-term career goals. What are you hoping to achieve in the next few years?"
  ]
};

// Function to get a random response from a category
export const getMockResponse = (message: string): string => {
  const lowerMsg = message.toLowerCase();
  console.log("Processing message:", lowerMsg);
  
  // Computer science career paths
  if (lowerMsg.includes('computer science degree') || 
      lowerMsg.includes('career path') ||
      (lowerMsg.includes('computer') && lowerMsg.includes('science')) ||
      (lowerMsg.includes('computer') && lowerMsg.includes('degree')) ||
      (lowerMsg.includes('cs') && lowerMsg.includes('degree')) ||
      (lowerMsg.includes('career') && lowerMsg.includes('options'))) {
    console.log("Matched: Computer Science career paths");
    return getRandomFromArray(mockResponses.computerScience);
  }
  
  // Resume improvement
  else if ((lowerMsg.includes('resume') || lowerMsg.includes('cv')) && 
          (lowerMsg.includes('improve') || lowerMsg.includes('tech') || lowerMsg.includes('better'))) {
    console.log("Matched: Resume advice");
    return getRandomFromArray(mockResponses.resume);
  }
  
  // Programming languages
  else if (lowerMsg.includes('programming language') || 
           lowerMsg.includes('coding language') || 
           lowerMsg.includes('learn to code') ||
           (lowerMsg.includes('which') && lowerMsg.includes('language'))) {
    console.log("Matched: Programming languages");
    return getRandomFromArray(mockResponses.programmingLanguages);
  }
  
  // Interview preparation
  else if (lowerMsg.includes('interview') || 
           (lowerMsg.includes('prepare') && lowerMsg.includes('job')) ||
           (lowerMsg.includes('technical') && lowerMsg.includes('question'))) {
    console.log("Matched: Interview preparation");
    return getRandomFromArray(mockResponses.interview);
  }
  
  // Career transitions
  else if (lowerMsg.includes('change career') || 
           lowerMsg.includes('switch job') || 
           lowerMsg.includes('transition') ||
           lowerMsg.includes('pivot career')) {
    console.log("Matched: Career transitions");
    return getRandomFromArray(mockResponses.careerChange);
  }
  
  // Leadership and management
  else if (lowerMsg.includes('leadership') || 
           lowerMsg.includes('management') || 
           lowerMsg.includes('manage team') ||
           lowerMsg.includes('lead developer')) {
    console.log("Matched: Leadership");
    return getRandomFromArray(mockResponses.leadership);
  }
  
  // Remote work
  else if (lowerMsg.includes('remote') || 
           lowerMsg.includes('work from home') || 
           lowerMsg.includes('virtual job') ||
           lowerMsg.includes('telework')) {
    console.log("Matched: Remote work");
    return getRandomFromArray(mockResponses.remoteWork);
  }
  
  // Salary negotiation
  else if (lowerMsg.includes('salary') || 
           lowerMsg.includes('compensation') || 
           lowerMsg.includes('pay') ||
           lowerMsg.includes('negotiate')) {
    console.log("Matched: Salary negotiation");
    return getRandomFromArray(mockResponses.salaryNegotiation);
  }
  
  // Job search
  else if (lowerMsg.includes('find job') || 
           lowerMsg.includes('job search') || 
           lowerMsg.includes('looking for work') ||
           lowerMsg.includes('job hunt')) {
    console.log("Matched: Job search");
    return getRandomFromArray(mockResponses.jobSearch);
  }
  
  // Skill development
  else if (lowerMsg.includes('learn') || 
           lowerMsg.includes('skill') || 
           lowerMsg.includes('improve') ||
           lowerMsg.includes('develop') ||
           lowerMsg.includes('study')) {
    console.log("Matched: Skill development");
    return getRandomFromArray(mockResponses.skillDevelopment);
  }
  
  // Greeting messages
  else if (lowerMsg.includes('hello') || 
           lowerMsg.includes('hi') || 
           lowerMsg.includes('hey') || 
           lowerMsg.length < 10) {
    console.log("Matched: Greeting");
    return getRandomFromArray(mockResponses.greeting);
  }
  
  // Default response if no category matches
  console.log("No specific match found, using default response");
  return getRandomFromArray(mockResponses.default);
};

// Helper to get a random item from an array
function getRandomFromArray<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

// Initialize OpenAI client with fallback for development or when key is not available
const apiKey = process.env.OPENAI_API_KEY || 'dummy-key-for-development';

export const openai = new OpenAI({
  apiKey,
});

// Track if we've detected a quota exceeded error
let quotaExceeded = false;

// Helper function to check if OpenAI is properly configured
export const isOpenAIConfigured = () => {
  if (quotaExceeded) return false;
  return process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'dummy-key-for-development';
};

// Function to handle API errors and mark quota as exceeded if needed
export const handleOpenAIError = (error: any): void => {
  console.error('OpenAI API error:', error);
  
  // Check for quota exceeded error
  if (error?.status === 429 || 
      (typeof error?.message === 'string' && 
       (error.message.includes('exceeded your current quota') || 
        error.message.includes('insufficient_quota')))) {
    console.log('API quota exceeded, enabling fallback mode');
    quotaExceeded = true;
  }
};

// Function to check if we're in fallback mode
export const isInFallbackMode = (): boolean => {
  return quotaExceeded || !isOpenAIConfigured();
};

// Function to get appropriate response (real or mock)
export async function getAIResponse(prompt: string): Promise<string> {
  // Extract the most recent user message for better keyword matching
  const userMessageMatch = prompt.match(/User: (.*?)(?:\n|$)/);
  const lastUserMessage = userMessageMatch ? userMessageMatch[1] : prompt;
  
  // If we're in fallback mode, return a mock response
  if (isInFallbackMode()) {
    // Pass only the most recent user message for better keyword matching
    return getMockResponse(lastUserMessage);
  }
  
  // Otherwise attempt to get a real response
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful career counselor.' },
        { role: 'user', content: prompt }
      ],
    });
    
    return response.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
  } catch (error) {
    // Handle any errors (including quota exceeded)
    handleOpenAIError(error);
    
    // Return a mock response since we encountered an error
    return getMockResponse(lastUserMessage);
  }
}
