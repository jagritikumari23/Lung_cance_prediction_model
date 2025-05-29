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
Based on the provided CT scan image, classify it into one of three categories: Normal, Malignant, or Benign.
Provide a brief explanation for your classification.

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
    // Ensure the output conforms to the schema, especially the enum for prediction
    const validationResult = CTScanAnalysisOutputSchema.safeParse(output);
    if (!validationResult.success) {
        // Fallback or error handling if the model doesn't strictly adhere to the enum
        console.error("AI output validation error:", validationResult.error);
        // Attempt to provide a default or error state if prediction is not one of the enum values
        // This is a basic fallback, more sophisticated handling might be needed
        return {
            prediction: "Normal", // Default or indicate error
            explanation: "AI output was not in the expected format. Please review the image manually or try again.",
        };
    }
    return validationResult.data;
  }
);
