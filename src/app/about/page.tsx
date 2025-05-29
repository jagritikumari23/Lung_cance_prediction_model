
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Target, Zap } from 'lucide-react';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About Us - Image Insights',
  description: 'Learn more about the Image Insights project, its mission, and the technology behind it.',
};

export default function AboutPage() {
  return (
    <div className="space-y-12">
      <section className="text-center py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-primary mb-4">
            About Image Insights
          </h1>
          <p className="text-lg sm:text-xl text-foreground/80 max-w-3xl mx-auto">
            Discover the story behind Image Insights, our mission, and the innovative technology that powers our platform.
          </p>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <Image
                src="https://placehold.co/600x400.png"
                alt="Team working on project"
                width={600}
                height={400}
                className="rounded-lg shadow-xl"
                data-ai-hint="team collaboration"
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
                    Our mission is to provide an accessible and powerful tool for users to gain meaningful insights from their images. We believe in leveraging cutting-edge AI to simplify complex image analysis, making it available to everyone, from casual users to professionals.
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
                    Image Insights is built with a modern tech stack to ensure performance, scalability, and a great user experience. We utilize:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Next.js for the frontend framework</li>
                    <li>React for building dynamic user interfaces</li>
                    <li>ShadCN UI components and Tailwind CSS for styling</li>
                    <li>Genkit for integrating powerful AI capabilities</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-card rounded-xl shadow-sm">
        <div className="container mx-auto px-4 text-center">
           <h2 className="text-3xl font-semibold text-primary mb-6">Meet the Team (Placeholder)</h2>
           <p className="text-foreground/70 max-w-2xl mx-auto mb-8">
            Image Insights is developed by a dedicated team of AI enthusiasts and software engineers passionate about making technology accessible.
           </p>
           <div className="flex justify-center items-center space-x-4">
                <div className="flex flex-col items-center">
                    <Image src="https://placehold.co/100x100.png" alt="Team Member 1" width={100} height={100} className="rounded-full mb-2" data-ai-hint="person portrait"/>
                    <p className="font-semibold">AI Developer</p>
                    <p className="text-sm text-muted-foreground">Lead AI Engineer</p>
                </div>
                 <div className="flex flex-col items-center">
                    <Image src="https://placehold.co/100x100.png" alt="Team Member 2" width={100} height={100} className="rounded-full mb-2" data-ai-hint="person portrait"/>
                    <p className="font-semibold">App Prototyper</p>
                    <p className="text-sm text-muted-foreground">Frontend Specialist</p>
                </div>
           </div>
        </div>
      </section>
    </div>
  );
}
