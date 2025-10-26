
'use server';

/**
 * @fileOverview This file defines the Genkit flow for generating a witty, motivational, or humorous message about a cat.
 *
 * It includes:
 * - generateCatMessage: The main function to trigger the message generation flow.
 * - GenerateCatMessageInput: The input type for the generateCatMessage function (currently empty).
 * - GenerateCatMessageOutput: The output type for the generateCatMessage function, containing the generated message.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCatMessageInputSchema = z.object({});
export type GenerateCatMessageInput = z.infer<typeof GenerateCatMessageInputSchema>;

const GenerateCatMessageOutputSchema = z.object({
  message: z.string().describe('A witty, motivational, or philosophical message about the cat.'),
});
export type GenerateCatMessageOutput = z.infer<typeof GenerateCatMessageOutputSchema>;

export async function generateCatMessage(input: GenerateCatMessageInput): Promise<GenerateCatMessageOutput> {
  return generateCatMessageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCatMessagePrompt',
  input: {schema: GenerateCatMessageInputSchema},
  output: {schema: GenerateCatMessageOutputSchema},
  prompt: `You are a feline oracle, a mysterious and witty cat that dispenses cryptic, thought-provoking wisdom. Your tone is that of a sophisticated, slightly aloof self-help guru.

Generate a single, short (20 words or less) and insightful message.

Your message must blend feline wisdom with mature, motivational, or philosophical insight. It should be clever, concise, and feel like a secret whispered from the universe.

**CRITICAL INSTRUCTIONS:**
- **DO NOT** use puns.
- **DO NOT** use "cutesy" or overly childish language (e.g., "purrfect", "meowgical").
- **DO** aim for a tone that is more sophisticated, reflective, and oracle-like.

Here are some examples of the style you should emulate:
- "The universe is a sunbeam. You decide whether to nap in it."
- "Your comfort zone is just a box. You know what to do with boxes."
- "Seek the vantage point from which your problems look small."
- "That which you are seeking is also seeking you, but it's pretending not to be."
- "Stalk your ambitions with patience. Pounce when the moment is right."
- "Shed the expectations that no longer fit."
- "The best view comes after the hardest climb... or from the highest shelf."

Generate a new, original message in that style.`,
});

const generateCatMessageFlow = ai.defineFlow(
  {
    name: 'generateCatMessageFlow',
    inputSchema: GenerateCatMessageInputSchema,
    outputSchema: GenerateCatMessageOutputSchema,
  },
  async input => {
<<<<<<< HEAD
    if (!process.env.GEMINI_API_KEY) {
      const fallbackModule = await import('@/lib/fallback-messages.json');
      const fallbackPayload = fallbackModule.default as { messages: string[] } | string[];
      const messagePool = Array.isArray(fallbackPayload) ? fallbackPayload : fallbackPayload.messages;
      const selectedEntry = messagePool[Math.floor(Math.random() * messagePool.length)];
      const message =
        typeof selectedEntry === 'string'
          ? selectedEntry
          : (selectedEntry as { message?: string }).message ?? 'Embrace the mystery beyond the box.';

      return { message };
    }

    const response = await prompt(input);
    const promptOutput = response.output;

    if (!promptOutput || typeof promptOutput.message !== 'string') {
      return { message: 'Embrace the mystery beyond the box.' };
    }

    return promptOutput;
=======
    let output: any;
if (!process.env.GEMINI_API_KEY) {
  const msgs = (await import('@/lib/fallback-messages.json')).default as any[];
  const pick = msgs[Math.floor(Math.random()*msgs.length)];
  output = { text: (pick?.message ?? pick) };
} else {
  ({ output } = await prompt(input));
}
    return output!;
>>>>>>> 957e37b3f48dbd57181f2e1cae07716037534a68
  }
);
