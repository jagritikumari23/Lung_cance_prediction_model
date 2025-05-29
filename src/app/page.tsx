
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Target, SearchCheck, ShieldCheck } from "lucide-react"; // Updated icons
import type { Metadata } from 'next';
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: 'Home - LungLens AI',
  description: 'Welcome to LungLens AI. AI-powered analysis of CT scans for early lung cancer detection.',
};

export default function HomePage() {
  return (
    <div className="space-y-12">
      <section className="text-center py-12 lg:py-16 bg-gradient-to-br from-primary/10 via-background to-background rounded-xl shadow-sm">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-primary mb-6">
            Advanced CT Scan Analysis for Lung Health
          </h1>
          <p className="text-lg sm:text-xl text-foreground/80 max-w-3xl mx-auto mb-8">
            Upload your CT scans and let our AI provide predictions for Normal, Malignant, or Benign changes, aiding in early lung cancer detection.
          </p>
          <Link href="/analysis">
            <Button size="lg" className="text-lg py-7 px-10 shadow-lg hover:shadow-xl transition-shadow">
              Analyze CT Scan Now <ArrowRight className="ml-2 h-5 w-5" />
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
                  <SearchCheck className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl">AI-Powered Detection</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-foreground/70">
                Leverage cutting-edge AI to analyze CT scan images for potential lung nodules and classify them.
              </CardContent>
            </Card>
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="items-center text-center">
                <div className="p-3 bg-primary/10 rounded-full mb-3">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Three-Class Prediction</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-foreground/70">
                Receive clear predictions: Normal, Malignant, or Benign, to help inform further medical review.
              </CardContent>
            </Card>
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="items-center text-center">
                <div className="p-3 bg-primary/10 rounded-full mb-3">
                  <ShieldCheck className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Secure & Informative</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-foreground/70">
                Your data is processed securely. Get detailed file information alongside AI analysis.
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
                alt="CT Scan Analysis Illustration"
                width={600}
                height={400}
                className="rounded-lg shadow-md"
                data-ai-hint="ct scan lungs"
              />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-semibold text-primary mb-4">How It Works</h2>
            <p className="text-foreground/80 mb-3">
              Our platform uses state-of-the-art AI models to analyze CT scan images for early signs of lung cancer.
            </p>
            <ol className="list-decimal list-inside space-y-2 text-foreground/70">
              <li>Upload a DICOM or other standard CT image file.</li>
              <li>Our AI model processes the scan to identify and classify abnormalities.</li>
              <li>Receive a prediction (Normal, Malignant, Benign) and an explanation.</li>
              <li>Use the insights as a supplementary tool for medical professionals.</li>
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
