
'use server';
/**
 * @fileOverview A CT scan analysis AI agent for lung cancer detection.
 *
 * - analyzeCTScan - A function that handles the CT scan analysis process.
 * - CTScanAnalysisInput - The input type for the analyzeCTScan function.
 * - CTScanAnalysisOutput - The return type for the analyzeCTScan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CTScanAnalysisInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A CT scan image, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type CTScanAnalysisInput = z.infer<typeof CTScanAnalysisInputSchema>;

const CTScanAnalysisOutputSchema = z.object({
  prediction: z.enum(["Normal", "Malignant", "Benign"])
    .describe("The AI's prediction for the CT scan: Normal, Malignant, or Benign."),
  explanation: z.string().optional().describe("A brief explanation supporting the prediction."),
  confidenceScore: z.number().min(0).max(1).optional()
    .describe("The AI's confidence in the prediction, from 0.0 to 1.0."),
  probabilities: z.object({
    normal: z.number().min(0).max(1).describe("Estimated probability of Normal."),
    malignant: z.number().min(0).max(1).describe("Estimated probability of Malignant."),
    benign: z.number().min(0).max(1).describe("Estimated probability of Benign."),
  }).optional().describe("Estimated probabilities for each class, ideally summing to 1.0."),
});
export type CTScanAnalysisOutput = z.infer<typeof CTScanAnalysisOutputSchema>;

export async function analyzeCTScan(input: CTScanAnalysisInput): Promise<CTScanAnalysisOutput> {
  return ctScanAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'ctScanAnalysisPrompt',
  input: {schema: CTScanAnalysisInputSchema},
  output: {schema: CTScanAnalysisOutputSchema},
  prompt: `You are a specialized medical AI assistant trained to analyze CT scan images for indications of lung cancer.
Based on the provided CT scan image:
1. Classify it into one of three categories: Normal, Malignant, or Benign. This is the 'prediction'.
2. Provide a brief 'explanation' for your classification.
3. Provide an overall 'confidenceScore' (a single number between 0.0 and 1.0) for your main prediction.
4. Estimate the 'probabilities' for each of the three categories (normal, malignant, benign). Ensure these probabilities sum to 1.0.

Image: {{media url=photoDataUri}}`,
});

const ctScanAnalysisFlow = ai.defineFlow(
  {
    name: 'ctScanAnalysisFlow',
    inputSchema: CTScanAnalysisInputSchema,
    outputSchema: CTScanAnalysisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error("AI failed to provide an output.");
    }
    
    const validationResult = CTScanAnalysisOutputSchema.safeParse(output);
    if (!validationResult.success) {
        console.error("AI output validation error:", validationResult.error);
        // Attempt to salvage what we can, or return a structured error
        // If prediction exists, use it, otherwise default
        const prediction = (output as any)?.prediction && ["Normal", "Malignant", "Benign"].includes((output as any).prediction) 
                           ? (output as any).prediction 
                           : "Normal";
        return {
            prediction: prediction,
            explanation: "AI output was not in the expected format. Some details might be missing. Please review the image manually or try again.",
            // Confidence and probabilities might be missing or malformed
        };
    }
    return validationResult.data;
  }
);
