
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Target, Zap, HeartPulse, ShieldCheck, AlertTriangle } from 'lucide-react'; // Added AlertTriangle
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About Us - LungLens AI',
  description: 'Learn more about LungLens AI, our mission to aid in early lung cancer detection, the technology behind our CT scan analysis tool, and our commitment to data security.',
};

export default function AboutPage() {
  return (
    <div className="space-y-12">
      <section className="text-center py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-primary mb-4">
            About LungLens AI
          </h1>
          <p className="text-lg sm:text-xl text-foreground/80 max-w-3xl mx-auto">
            Our mission is to leverage artificial intelligence to provide a powerful, accessible tool for the preliminary analysis of CT scans, aiding in the early detection of lung cancer.
          </p>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4">
          <Card className="shadow-lg border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl text-primary">
                <AlertTriangle className="w-6 h-6 text-amber-500" />
                Important Medical Disclaimer
              </CardTitle>
            </CardHeader>
            <CardContent className="text-foreground/70 space-y-2">
              <p>
                LungLens AI is an informational tool and is <strong>not a substitute for professional medical advice, diagnosis, or treatment</strong>. The analyses provided by our AI are intended for preliminary informational purposes only and should be used to supplement, not replace, the judgment of qualified healthcare professionals.
              </p>
              <p>
                Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read or seen on this application. Reliance on any information provided by LungLens AI is solely at your own risk.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <Image
                src="https://placehold.co/600x400.png"
                alt="Medical research team"
                width={600}
                height={400}
                className="rounded-lg shadow-xl"
                data-ai-hint="medical research"
              />
            </div>
            <div className="space-y-6">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Target className="w-6 h-6 text-primary" />
                    Our Mission
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-foreground/70">
                  <p>
                    To empower healthcare professionals and researchers with advanced AI tools for CT scan analysis, facilitating earlier and more accurate identification of potential lung abnormalities. We aim to contribute to better patient outcomes through technology.
                  </p>
                </CardContent>
              </Card>
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Zap className="w-6 h-6 text-primary" />
                    Technology Stack
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-foreground/70">
                  <p>
                    LungLens AI is built with a modern tech stack to ensure robust performance, security, and a seamless user experience for medical image analysis:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Next.js for a responsive and fast frontend</li>
                    <li>React for dynamic user interface components</li>
                    <li>ShadCN UI and Tailwind CSS for a clean, professional design</li>
                    <li>Genkit (with Google AI) for sophisticated CT scan image analysis and classification</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4">
          <Card className="shadow-lg w-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <ShieldCheck className="w-6 h-6 text-primary" />
                Data Handling & Security
              </CardTitle>
            </CardHeader>
            <CardContent className="text-foreground/70 space-y-3">
              <p>We prioritize the security and privacy of your data. Here’s how we handle information:</p>
              <ul className="list-disc list-inside space-y-1.5 pl-4">
                <li>
                  <strong>Image Processing:</strong> Your CT scan images are processed in memory by our AI model to generate an analysis.
                </li>
                <li>
                  <strong>No Permanent Storage:</strong> We do not permanently store your uploaded CT scan images or any derived sensitive health information on our application servers once the analysis is complete and the results are provided to you.
                </li>
                <li>
                  <strong>Secure Communication:</strong> Communication between your browser and our backend services is encrypted and secured (using HTTPS and Next.js Server Actions) to protect your data during transmission.
                </li>
              </ul>
              <p className="mt-4 text-xs text-muted-foreground">
                Please note: The AI-driven analysis involves sending the image data to a third-party AI service (e.g., Google AI via Genkit). We recommend reviewing their respective data handling and privacy policies. LungLens AI acts as an interface to these services and does not control their data practices.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-12 bg-card rounded-xl shadow-sm">
        <div className="container mx-auto px-4 text-center">
           <h2 className="text-3xl font-semibold text-primary mb-6">Meet the Team (Placeholder)</h2>
           <p className="text-foreground/70 max-w-2xl mx-auto mb-8">
            LungLens AI is developed by a dedicated team of AI specialists, software engineers, and medical imaging enthusiasts passionate about advancing healthcare technology.
           </p>
           <div className="flex justify-center items-center space-x-4">
                <div className="flex flex-col items-center">
                    <Image src="https://placehold.co/100x100.png" alt="Team Member 1" width={100} height={100} className="rounded-full mb-2" data-ai-hint="scientist portrait"/>
                    <p className="font-semibold">AI Researcher</p>
                    <p className="text-sm text-muted-foreground">Lead AI & ML Developer</p>
                </div>
                 <div className="flex flex-col items-center">
                    <Image src="https://placehold.co/100x100.png" alt="Team Member 2" width={100} height={100} className="rounded-full mb-2" data-ai-hint="developer portrait"/>
                    <p className="font-semibold">Software Engineer</p>
                    <p className="text-sm text-muted-foreground">Full-Stack Developer</p>
                </div>
           </div>
        </div>
      </section>
    </div>
  );
}
