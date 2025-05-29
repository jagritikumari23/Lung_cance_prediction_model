
"use client";

import { useState, ChangeEvent, useEffect } from "react";
import { analyzeCTScan, type CTScanAnalysisInput, type CTScanAnalysisOutput } from "@/ai/flows/ct-scan-analysis-flow";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { UploadCloud, Loader2, Search } from "lucide-react";

import ImageDisplay from "@/components/image-display";
import AnalysisResults from "@/components/analysis-results";

interface FileInfo {
  name: string;
  size: string;
  type: string;
  dimensions: string;
  lastModified: string;
}

export default function AnalysisPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageDataUri, setImageDataUri] = useState<string | null>(null);
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);
  const [analysisResult, setAnalysisResult] = useState<CTScanAnalysisOutput | null>(null);
  const [isLoadingAnalysis, setIsLoadingAnalysis] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    document.title = 'Analyze CT Scan - LungLens AI';
  }, []);

  const resetState = () => {
    setSelectedFile(null);
    setImageDataUri(null);
    setFileInfo(null);
    setAnalysisResult(null);
    const fileInput = document.getElementById('ctScanUpload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/") && !file.name.toLowerCase().endsWith('.dcm')) {
        toast({
          title: "Invalid File Type",
          description: "Please select an image file (e.g., JPG, PNG, DICOM).",
          variant: "destructive",
        });
        resetState();
        return;
      }

      setSelectedFile(file);
      setAnalysisResult(null);
      setFileInfo(null); 

      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUri = e.target?.result as string;
        setImageDataUri(dataUri);

        const img = new window.Image();
        img.onload = () => {
          setFileInfo({
            name: file.name,
            size: `${(file.size / 1024).toFixed(2)} KB`,
            type: file.type || "N/A",
            dimensions: `${img.naturalWidth} x ${img.naturalHeight} px`,
            lastModified: new Date(file.lastModified).toLocaleDateString(),
          });
        };
        img.onerror = () => {
          toast({ title: "Image Load Error", description: "Could not load image to get dimensions. Analysis may still proceed.", variant: "default" });
          setFileInfo({ 
            name: file.name,
            size: `${(file.size / 1024).toFixed(2)} KB`,
            type: file.type || "N/A",
            dimensions: "N/A",
            lastModified: new Date(file.lastModified).toLocaleDateString(),
          });
        };
        img.src = dataUri;
      };
      reader.onerror = () => {
        toast({ title: "Error", description: "Failed to read file.", variant: "destructive" });
        resetState();
      };
      reader.readAsDataURL(file);
    } else {
      resetState();
    }
  };

  const handleAnalyze = async () => {
    if (!imageDataUri) {
      toast({ title: "No Image", description: "Please select a CT scan image to analyze.", variant: "destructive" });
      return;
    }
    setIsLoadingAnalysis(true);
    setAnalysisResult(null);
    try {
      const input: CTScanAnalysisInput = { photoDataUri: imageDataUri };
      const result: CTScanAnalysisOutput = await analyzeCTScan(input);
      setAnalysisResult(result);
      toast({ title: "Analysis Complete", description: "CT scan analysis finished successfully." });
    } catch (error) {
      console.error("AI Analysis Error:", error);
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
      toast({ title: "AI Error", description: `Failed to analyze CT scan: ${errorMessage}`, variant: "destructive" });
      setAnalysisResult({ prediction: "Normal", explanation: "Error during analysis. Could not generate prediction." });
    } finally {
      setIsLoadingAnalysis(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-primary">CT Scan Analysis</h1>
        <p className="text-muted-foreground">Upload a CT scan image (e.g., PNG, JPG, DICOM) for AI-powered lung cancer preliminary assessment.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <div className="lg:col-span-1 space-y-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <UploadCloud className="w-5 h-5 text-primary" />
                Upload CT Scan
              </CardTitle>
              <CardDescription>Choose a CT scan image (PNG, JPG, or DICOM) to begin. Ensure the image is clear for optimal analysis.</CardDescription>
            </CardHeader>
            <CardContent>
              <Input 
                id="ctScanUpload" 
                type="file" 
                accept="image/*,.dcm"
                onChange={handleFileChange} 
                className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer" 
              />
            </CardContent>
          </Card>

          {selectedFile && imageDataUri && (
            <Button onClick={handleAnalyze} disabled={isLoadingAnalysis} className="w-full text-base py-6 shadow-md hover:shadow-lg transition-shadow">
              {isLoadingAnalysis ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <Search className="mr-2 h-5 w-5" />
              )}
              Analyze Scan
            </Button>
          )}
        </div>

        <div className="lg:col-span-2">
          <ImageDisplay imageDataUri={imageDataUri} fileName={selectedFile?.name} />
          <AnalysisResults fileInfo={fileInfo} analysisResult={analysisResult} isLoadingAnalysis={isLoadingAnalysis} />
        </div>
      </div>
    </div>
  );
}
