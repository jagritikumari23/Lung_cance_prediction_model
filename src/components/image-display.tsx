"use client";

import NextImage from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { ImageIcon as ImageIconLucide } from "lucide-react";

interface ImageDisplayProps {
  imageDataUri: string | null;
  fileName?: string | null;
}

export default function ImageDisplay({ imageDataUri, fileName }: ImageDisplayProps) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-primary tracking-tight">Image Preview</h2>
      <Card className="overflow-hidden shadow-lg">
        <CardContent className="p-2 sm:p-4">
          {imageDataUri ? (
            <div className="relative aspect-video w-full bg-muted/30 rounded-md">
              <NextImage
                src={imageDataUri}
                alt={fileName || "Preview"}
                layout="fill"
                objectFit="contain"
                className="rounded-md"
                data-ai-hint="uploaded image"
              />
            </div>
          ) : (
            <div className="aspect-video bg-muted/50 rounded-md flex flex-col items-center justify-center text-muted-foreground p-4">
              <ImageIconLucide className="w-16 h-16 sm:w-20 sm:h-20 mb-3 opacity-70" />
              <p className="text-sm sm:text-base text-center">No image selected for preview</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
