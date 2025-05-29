
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BarChart2, Lightbulb, Zap } from "lucide-react";
import type { Metadata } from 'next';
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: 'Home - Image Insights',
  description: 'Welcome to Image Insights. Get AI-powered insights from your images and photos.',
};

export default function HomePage() {
  return (
    <div className="space-y-12">
      <section className="text-center py-12 lg:py-16 bg-gradient-to-br from-primary/10 via-background to-background rounded-xl shadow-sm">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-primary mb-6">
            Unlock Insights from Your Images
          </h1>
          <p className="text-lg sm:text-xl text-foreground/80 max-w-3xl mx-auto mb-8">
            Upload your images and let our advanced AI provide you with detailed analysis, summaries, and more. Simple, fast, and powerful.
          </p>
          <Link href="/analysis">
            <Button size="lg" className="text-lg py-7 px-10 shadow-lg hover:shadow-xl transition-shadow">
              Start Analyzing Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-10 text-foreground">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="items-center text-center">
                <div className="p-3 bg-primary/10 rounded-full mb-3">
                  <Zap className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Instant Analysis</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-foreground/70">
                Get quick and accurate AI-powered summaries and information about your uploaded images.
              </CardContent>
            </Card>
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="items-center text-center">
                <div className="p-3 bg-primary/10 rounded-full mb-3">
                  <Lightbulb className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Detailed Insights</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-foreground/70">
                Understand key elements, context, and details present within your images.
              </CardContent>
            </Card>
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="items-center text-center">
                <div className="p-3 bg-primary/10 rounded-full mb-3">
                  <BarChart2 className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl">File Information</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-foreground/70">
                View comprehensive details about your image files, including type, size, and dimensions.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      <section className="py-12 bg-card rounded-xl shadow-sm">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
             <Image
                src="https://placehold.co/600x400.png"
                alt="AI Analysis Illustration"
                width={600}
                height={400}
                className="rounded-lg shadow-md"
                data-ai-hint="technology abstract"
              />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-semibold text-primary mb-4">How It Works</h2>
            <p className="text-foreground/80 mb-3">
              Our platform uses state-of-the-art AI models to process and understand your images.
            </p>
            <ol className="list-decimal list-inside space-y-2 text-foreground/70">
              <li>Upload an image file from your device.</li>
              <li>Our AI model processes the image content.</li>
              <li>Receive a concise summary and detailed file information.</li>
              <li>Gain valuable insights from your visual data.</li>
            </ol>
            <Link href="/analysis" className="mt-6 inline-block">
               <Button variant="outline">
                Try the Analyzer
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
