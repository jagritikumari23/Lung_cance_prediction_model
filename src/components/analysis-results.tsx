
"use client";

import type { CTScanAnalysisOutput } from "@/ai/flows/ct-scan-analysis-flow";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { FileText, Brain, AlertTriangle } from "lucide-react"; // Brain for AI, AlertTriangle for errors

interface FileInfo {
  name: string;
  size: string;
  type: string;
  dimensions: string;
  lastModified: string;
}

interface AnalysisResultsProps {
  fileInfo: FileInfo | null;
  analysisResult: CTScanAnalysisOutput | null;
  isLoadingAnalysis: boolean;
}

export default function AnalysisResults({ fileInfo, analysisResult, isLoadingAnalysis }: AnalysisResultsProps) {
  
  const getPredictionColor = (prediction?: "Normal" | "Malignant" | "Benign") => {
    if (!prediction) return "text-foreground";
    switch (prediction) {
      case "Normal":
        return "text-green-600 dark:text-green-500";
      case "Benign":
        return "text-yellow-600 dark:text-yellow-500";
      case "Malignant":
        return "text-red-600 dark:text-red-500";
      default:
        return "text-foreground";
    }
  };

  const isErrorResult = analysisResult?.explanation?.startsWith("Error during analysis");

  return (
    <div className="mt-6 sm:mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-primary tracking-tight">Analysis & Details</h2>
      <div className="space-y-6">
        {fileInfo && (
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <FileText className="w-5 h-5 text-primary" />
                File Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1.5 text-sm">
              <div className="flex justify-between">
                <span className="font-medium text-muted-foreground">Name:</span>
                <span className="text-right truncate">{fileInfo.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-muted-foreground">Size:</span>
                <span>{fileInfo.size}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-muted-foreground">Type:</span>
                <span>{fileInfo.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-muted-foreground">Dimensions:</span>
                <span>{fileInfo.dimensions}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-muted-foreground">Last Modified:</span>
                <span>{fileInfo.lastModified}</span>
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              {isErrorResult ? <AlertTriangle className="w-5 h-5 text-destructive" /> : <Brain className="w-5 h-5 text-primary" />}
              AI Prediction & Explanation
            </CardTitle>
            {!fileInfo && (
                <CardDescription>Upload a CT scan image to generate an analysis.</CardDescription>
            )}
            {fileInfo && analysisResult === null && !isLoadingAnalysis && (
              <CardDescription>Click 'Analyze Scan' to generate a prediction.</CardDescription>
            )}
          </CardHeader>
          <CardContent className="min-h-[80px] space-y-3"> {/* Ensure minimum height for content area */}
            {isLoadingAnalysis ? (
              <div className="space-y-2 pt-1">
                <Skeleton className="h-5 w-1/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ) : analysisResult ? (
              <>
                <div>
                  <span className="font-semibold text-muted-foreground">Prediction: </span>
                  <span className={`font-bold text-lg ${getPredictionColor(analysisResult.prediction)}`}>
                    {analysisResult.prediction}
                  </span>
                </div>
                {analysisResult.explanation && (
                  <div>
                    <span className="font-semibold text-muted-foreground">Explanation: </span>
                    <p className={`text-sm leading-relaxed ${isErrorResult ? 'text-destructive' : ''}`}>{analysisResult.explanation}</p>
                  </div>
                )}
                {analysisResult.prediction && !isErrorResult && (
                   <p className="text-xs text-muted-foreground pt-2">
                     Disclaimer: This AI prediction is for informational purposes only and not a substitute for professional medical advice. Consult with a qualified healthcare provider for any health concerns or before making any decisions related to your health or treatment.
                   </p>
                )}
              </>
            ) : (
              fileInfo && <p className="text-sm text-muted-foreground">No analysis generated yet.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
