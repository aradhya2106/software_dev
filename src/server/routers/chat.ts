import { z } from 'zod';
import { router, publicProcedure } from '../trpc';
import { prisma } from '../db';
import { openai, isOpenAIConfigured, getAIResponse, handleOpenAIError, isInFallbackMode } from '../ai';

export const chatRouter = router({
  getSessions: publicProcedure.query(async () => {
    return prisma.chatSession.findMany({
      include: { messages: true },
      orderBy: { createdAt: 'desc' },
    });
  }),
  getSession: publicProcedure.input(z.string()).query(async ({ input: sessionId }) => {
    return prisma.chatSession.findUnique({
      where: { id: sessionId },
      include: { messages: true },
    });
  }),
  createSession: publicProcedure.input(z.object({ topic: z.string(), userId: z.string().optional() })).mutation(async ({ input }) => {
    const { topic, userId } = input;
    return prisma.chatSession.create({
      data: { topic, userId },
    });
  }),
  addMessage: publicProcedure.input(z.object({ sessionId: z.string(), sender: z.string(), content: z.string() })).mutation(async ({ input }) => {
    const { sessionId, sender, content } = input;
    // Save user message
    const userMsg = await prisma.message.create({
      data: { sessionId, sender, content },
    });

    // If sender is user, get AI response
    if (sender === 'user') {
      // Get previous messages for context
      const messages = await prisma.message.findMany({
        where: { sessionId },
        orderBy: { timestamp: 'asc' },
      });
      const history = messages.map(m => `${m.sender === 'user' ? 'User' : 'AI'}: ${m.content}`).join('\n');

      let aiMsg = '';
      
      try {
        // Get the last few messages to avoid repetitive responses
        const recentMessages = messages.slice(-3);
        const lastAiMessage = recentMessages.find(m => m.sender === 'ai')?.content || '';
        
        // Check if we recently gave a generic greeting and the user is asking a specific question
        const isRecentlyGreeted = lastAiMessage.includes('Welcome') || lastAiMessage.includes('How can I assist') || lastAiMessage.includes('Hello');
        const userHasSpecificQuestion = content.length > 15 || content.includes('?');
        
        // Use the query directly if it's a specific question after a greeting
        const prompt = isRecentlyGreeted && userHasSpecificQuestion 
          ? content 
          : history + '\nUser: ' + content;
        
        console.log('Processing prompt:', prompt);
        
        // Use the new getAIResponse function which handles fallback mode
        aiMsg = await getAIResponse(prompt);
        
        // Add an indicator if we're in fallback mode
        if (isInFallbackMode()) {
          // We're using mock mode - prepend an indicator to the message
          aiMsg = "[DEMO MODE] " + aiMsg;
        }
      } catch (error) {
        console.error('Error generating AI response:', error);
        aiMsg = 'Sorry, there was an error generating a response. The system is now in fallback mode.';
      }

      // Save AI message
      await prisma.message.create({
        data: { sessionId, sender: 'ai', content: aiMsg },
      });
    }

    return userMsg;
  }),
});
