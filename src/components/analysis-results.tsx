
"use client";

import type { CTScanAnalysisOutput } from "@/ai/flows/ct-scan-analysis-flow";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { FileText, Brain, AlertTriangle, Percent, BarChartBig, Download } from "lucide-react"; 
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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
  const { toast } = useToast();
  
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

  const isErrorResult = analysisResult?.explanation?.startsWith("Error during analysis") || 
                        analysisResult?.explanation?.startsWith("AI output was not in the expected format");

  const renderProbability = (label: string, value?: number) => {
    if (value === undefined || value === null) return null;
    const percentage = value * 100;
    return (
      <div className="mb-2">
        <div className="flex justify-between text-sm mb-0.5">
          <span>{label}</span>
          <span className="font-medium">{percentage.toFixed(1)}%</span>
        </div>
        <Progress value={percentage} className="h-2" />
      </div>
    );
  };

  const handleExportResults = async () => {
    if (!analysisResult || !fileInfo) {
      toast({
        title: "Cannot Export",
        description: "No analysis results or file information available to export.",
        variant: "destructive",
      });
      return;
    }

    const resultsElement = document.getElementById('exportable-results-area');
    if (!resultsElement) {
      toast({
        title: "Export Error",
        description: "Could not find the results content to export. Please try again.",
        variant: "destructive",
      });
      console.error("Exportable results area not found");
      return;
    }

    try {
      const canvas = await html2canvas(resultsElement, {
        scale: 2, // Increase scale for better resolution
        useCORS: true, 
        backgroundColor: window.getComputedStyle(document.documentElement).getPropertyValue('--background').trim() === '231 48% 12%' ? '#1e293b' : '#f0f4fa', // Match light/dark theme bg for canvas
        onclone: (document) => {
          // Ensure text colors are visible for PDF export regardless of theme
          // This is a bit hacky, better would be to have export-specific styles
          // For simplicity, forcing a light theme text color scheme on the cloned document
          document.querySelectorAll('#exportable-results-area *').forEach((el) => {
            (el as HTMLElement).style.color = 'hsl(231 48% 15%)'; // Dark text
          });
          document.querySelectorAll('#exportable-results-area .text-muted-foreground').forEach((el) => {
            (el as HTMLElement).style.color = 'hsl(231 48% 40%)'; // Muted dark text
          });
          const predictionEl = document.querySelector('#exportable-results-area .font-bold.text-lg');
          if (predictionEl) {
            const prediction = analysisResult.prediction;
            let color = 'hsl(231 48% 15%)'; // Default dark
            if (prediction === "Normal") color = "rgb(22 163 74)"; // Green
            else if (prediction === "Benign") color = "rgb(202 138 4)"; // Yellow
            else if (prediction === "Malignant") color = "rgb(220 38 38)"; // Red
             (predictionEl as HTMLElement).style.color = color;
          }
        }
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'a4',
      });

      const margin = 40; // points
      const pdfPageWidth = pdf.internal.pageSize.getWidth();
      const pdfPageHeight = pdf.internal.pageSize.getHeight();
      const contentWidth = pdfPageWidth - 2 * margin;
      const contentHeight = pdfPageHeight - 2 * margin;

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const aspectRatio = canvasWidth / canvasHeight;

      let finalImgWidth = contentWidth;
      let finalImgHeight = finalImgWidth / aspectRatio;

      if (finalImgHeight > contentHeight) {
        finalImgHeight = contentHeight;
        finalImgWidth = finalImgHeight * aspectRatio;
      }

      const xOffset = margin + (contentWidth - finalImgWidth) / 2;
      const yOffset = margin; // Align to top margin

      pdf.addImage(imgData, 'PNG', xOffset, yOffset, finalImgWidth, finalImgHeight);
      
      const safeFileName = fileInfo.name.replace(/[^a-z0-9_.-]/gi, '_').toLowerCase();
      pdf.save(`lunglens_analysis_${safeFileName}.pdf`);
      toast({
        title: "Export Successful",
        description: "Results downloaded as PDF.",
      });

    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "PDF Generation Error",
        description: "Could not generate PDF. Please try again or contact support.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="mt-6 sm:mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-primary tracking-tight">Analysis & Details</h2>
        {analysisResult && fileInfo && !isLoadingAnalysis && !isErrorResult && (
          <Button variant="outline" size="sm" onClick={handleExportResults}>
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        )}
      </div>
      <div id="exportable-results-area" className="space-y-6">
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
          <CardContent className="min-h-[80px] space-y-4">
            {isLoadingAnalysis ? (
              <div className="space-y-2 pt-1">
                <Skeleton className="h-5 w-1/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-5 w-1/4 mt-2" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-3 w-1/2" />
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
                    <p className={`text-sm leading-relaxed ${isErrorResult ? 'text-destructive' : 'text-foreground/80'}`}>{analysisResult.explanation}</p>
                  </div>
                )}

                {analysisResult.confidenceScore !== undefined && analysisResult.confidenceScore !== null && (
                  <div className="pt-2">
                    <div className="flex items-center gap-2 text-md font-semibold">
                       <Percent className="w-4 h-4 text-primary" />
                       <span>Overall Confidence</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                       <Progress value={analysisResult.confidenceScore * 100} className="w-2/3 h-2.5" />
                       <span className="text-sm font-medium text-foreground/90">
                         {(analysisResult.confidenceScore * 100).toFixed(1)}%
                       </span>
                    </div>
                  </div>
                )}

                {analysisResult.probabilities && (
                  <div className="pt-2">
                    <div className="flex items-center gap-2 text-md font-semibold mb-2">
                      <BarChartBig className="w-4 h-4 text-primary" />
                      <span>Probability Breakdown</span>
                    </div>
                    {renderProbability("Normal", analysisResult.probabilities.normal)}
                    {renderProbability("Benign", analysisResult.probabilities.benign)}
                    {renderProbability("Malignant", analysisResult.probabilities.malignant)}
                  </div>
                )}

                {analysisResult.prediction && !isErrorResult && (
                   <p className="text-xs text-muted-foreground pt-3">
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
