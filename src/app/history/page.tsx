
"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, HistoryIcon, DatabaseZap } from 'lucide-react'; // Added DatabaseZap
import { useAuth } from '@/contexts/auth-context';
import type { Metadata } from 'next'; // Cannot be used in client components directly

// Mock data for historical analyses
const mockAnalyses = [
  {
    id: '1',
    date: '2024-07-28',
    imageName: 'scan_001.png',
    prediction: 'Normal' as const,
    confidence: 0.95,
  },
  {
    id: '2',
    date: '2024-07-27',
    imageName: 'patient_x_ct.dcm',
    prediction: 'Malignant' as const,
    confidence: 0.88,
  },
  {
    id: '3',
    date: '2024-07-26',
    imageName: 'lung_series_abc.jpg',
    prediction: 'Benign' as const,
    confidence: 0.75,
  },
  {
    id: '4',
    date: '2024-07-25',
    imageName: 'chest_scan_final.png',
    prediction: 'Normal' as const,
    confidence: 0.99,
  },
];

type AnalysisPrediction = "Normal" | "Malignant" | "Benign";

interface HistoricalAnalysis {
  id: string;
  date: string;
  imageName: string;
  prediction: AnalysisPrediction;
  confidence: number;
}

// Note: Metadata should be defined in a server component or layout if dynamic,
// or set via useEffect for client components if static and for browser tab only.
// export const metadata: Metadata = { // This will not work in "use client" component for Next.js metadata
//   title: 'Analysis History - LungLens AI',
//   description: 'View your past CT scan analysis results.',
// };


export default function HistoryPage() {
  const { user } = useAuth(); // Assuming you might want to fetch user-specific history later
  const [analyses, setAnalyses] = useState<HistoricalAnalysis[]>([]);

  useEffect(() => {
    document.title = 'Analysis History - LungLens AI';
    // In a real application, you would fetch historical data for the logged-in user here.
    // For now, we're using mock data.
    if (user) {
      setAnalyses(mockAnalyses);
    }
  }, [user]);

  const getPredictionBadgeVariant = (prediction: AnalysisPrediction) => {
    switch (prediction) {
      case 'Normal':
        return 'default'; // Or a custom "success" variant if defined
      case 'Benign':
        return 'secondary'; // Or a custom "warning" variant
      case 'Malignant':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-primary flex items-center justify-center gap-2">
          <HistoryIcon className="w-8 h-8" />
          Analysis History
        </h1>
        <p className="text-muted-foreground">
          Review your previously analyzed CT scans.
        </p>
      </div>

      <Card className="shadow-lg mb-6 border-blue-500/30 bg-blue-500/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg text-blue-700 dark:text-blue-400">
            <DatabaseZap className="w-5 h-5" />
            Developer Note: Backend Required
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-blue-600 dark:text-blue-300">
          <p>
            This page currently displays <strong>mock data</strong>. For full functionality,
            a backend database is required to store and retrieve historical analysis results
            for each authenticated user.
          </p>
        </CardContent>
      </Card>

      {analyses.length > 0 ? (
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Your Past Analyses</CardTitle>
            <CardDescription>
              A list of CT scans you have analyzed previously.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Image Name</TableHead>
                  <TableHead>Prediction</TableHead>
                  <TableHead className="text-right">Confidence</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {analyses.map((analysis) => (
                  <TableRow key={analysis.id}>
                    <TableCell>{new Date(analysis.date).toLocaleDateString()}</TableCell>
                    <TableCell className="font-medium truncate max-w-xs">{analysis.imageName}</TableCell>
                    <TableCell>
                      <Badge variant={getPredictionBadgeVariant(analysis.prediction)}>
                        {analysis.prediction}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">{(analysis.confidence * 100).toFixed(1)}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <Card className="shadow-md">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center text-muted-foreground py-8">
              <HistoryIcon className="w-16 h-16 mb-4 opacity-50" />
              <p className="text-lg">No analysis history found.</p>
              <p className="text-sm">Upload and analyze a CT scan to see it here.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
