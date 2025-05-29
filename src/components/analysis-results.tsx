"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { FileText, ListChecks } from "lucide-react";

interface FileInfo {
  name: string;
  size: string;
  type: string;
  dimensions: string;
  lastModified: string;
}

interface AnalysisResultsProps {
  fileInfo: FileInfo | null;
  summary: string | null;
  isLoadingSummary: boolean;
}

export default function AnalysisResults({ fileInfo, summary, isLoadingSummary }: AnalysisResultsProps) {
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
              <ListChecks className="w-5 h-5 text-primary" />
              AI Generated Summary
            </CardTitle>
            {!fileInfo && (
                <CardDescription>Upload an image to generate a summary.</CardDescription>
            )}
            {fileInfo && summary === null && !isLoadingSummary && (
              <CardDescription>Click 'Analyze Image' to generate a summary.</CardDescription>
            )}
          </CardHeader>
          <CardContent className="min-h-[60px]"> {/* Ensure minimum height for content area */}
            {isLoadingSummary ? (
              <div className="space-y-2 pt-1">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ) : summary ? (
              summary === "Could not generate summary." ? (
                 <p className="text-sm text-destructive">{summary}</p>
              ) : (
                <p className="text-sm leading-relaxed">{summary}</p>
              )
            ) : (
              fileInfo && <p className="text-sm text-muted-foreground">No summary generated yet.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
