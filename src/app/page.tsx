"use client";

import { useState, ChangeEvent } from "react";
import { generateImageSummary, type ImageSummaryInput, type ImageSummaryOutput } from "@/ai/flows/image-summary";
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

export default function ImageInsightsPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageDataUri, setImageDataUri] = useState<string | null>(null);
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);
  const [imageSummary, setImageSummary] = useState<string | null>(null);
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);
  const { toast } = useToast();

  const resetState = () => {
    setSelectedFile(null);
    setImageDataUri(null);
    setFileInfo(null);
    setImageSummary(null);
    // Clear the file input visually
    const fileInput = document.getElementById('imageUpload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid File Type",
          description: "Please select an image file (e.g., JPG, PNG, GIF).",
          variant: "destructive",
        });
        resetState();
        return;
      }

      setSelectedFile(file);
      setImageSummary(null);
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
            type: file.type,
            dimensions: `${img.naturalWidth} x ${img.naturalHeight} px`,
            lastModified: new Date(file.lastModified).toLocaleDateString(),
          });
        };
        img.onerror = () => {
          toast({ title: "Error", description: "Could not load image to get dimensions.", variant: "destructive" });
          setFileInfo({
            name: file.name,
            size: `${(file.size / 1024).toFixed(2)} KB`,
            type: file.type,
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
      toast({ title: "No Image", description: "Please select an image to analyze.", variant: "destructive" });
      return;
    }
    setIsLoadingSummary(true);
    setImageSummary(null);
    try {
      const input: ImageSummaryInput = { photoDataUri: imageDataUri };
      const result: ImageSummaryOutput = await generateImageSummary(input);
      setImageSummary(result.summary);
      toast({ title: "Analysis Complete", description: "Image summary generated successfully." });
    } catch (error) {
      console.error("AI Summary Error:", error);
      toast({ title: "AI Error", description: "Failed to generate image summary. Please try again.", variant: "destructive" });
      setImageSummary("Could not generate summary.");
    } finally {
      setIsLoadingSummary(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <div className="lg:col-span-1 space-y-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <UploadCloud className="w-5 h-5 text-primary" />
                Upload Image
              </CardTitle>
              <CardDescription>Select an image file from your device (PNG, JPG, GIF, etc.).</CardDescription>
            </CardHeader>
            <CardContent>
              <Input 
                id="imageUpload" 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange} 
                className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer" 
              />
            </CardContent>
          </Card>

          {selectedFile && imageDataUri && (
            <Button onClick={handleAnalyze} disabled={isLoadingSummary} className="w-full text-base py-6 shadow-md hover:shadow-lg transition-shadow">
              {isLoadingSummary ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <Search className="mr-2 h-5 w-5" />
              )}
              Analyze Image
            </Button>
          )}
        </div>

        <div className="lg:col-span-2">
          <ImageDisplay imageDataUri={imageDataUri} fileName={selectedFile?.name} />
          <AnalysisResults fileInfo={fileInfo} summary={imageSummary} isLoadingSummary={isLoadingSummary} />
        </div>
      </div>
    </div>
  );
}
