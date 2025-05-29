// Implemented Genkit flow to generate a short text summary of an image's content using AI.

'use server';

/**
 * @fileOverview Generates a short text summary of an image's content using AI.
 *
 * - generateImageSummary - A function that generates a summary of the image.
 * - ImageSummaryInput - The input type for the generateImageSummary function.
 * - ImageSummaryOutput - The return type for the generateImageSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ImageSummaryInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of something, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ImageSummaryInput = z.infer<typeof ImageSummaryInputSchema>;

const ImageSummaryOutputSchema = z.object({
  summary: z.string().describe('A short summary of the image.'),
});
export type ImageSummaryOutput = z.infer<typeof ImageSummaryOutputSchema>;

export async function generateImageSummary(input: ImageSummaryInput): Promise<ImageSummaryOutput> {
  return generateImageSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'imageSummaryPrompt',
  input: {schema: ImageSummaryInputSchema},
  output: {schema: ImageSummaryOutputSchema},
  prompt: `You are an expert image summarizer.  You will provide a concise summary of the key aspects of the image. Be brief and to the point.

Image: {{media url=photoDataUri}}`,
});

const generateImageSummaryFlow = ai.defineFlow(
  {
    name: 'generateImageSummaryFlow',
    inputSchema: ImageSummaryInputSchema,
    outputSchema: ImageSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
