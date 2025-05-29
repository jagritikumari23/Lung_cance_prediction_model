
"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, HistoryIcon, DatabaseZap, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { Skeleton } from '@/components/ui/skeleton';

type AnalysisPrediction = "Normal" | "Malignant" | "Benign";

interface HistoricalAnalysis {
  id: string; // Or number, depending on your DB
  date: string; // Or Date object, adjust formatting as needed
  imageName: string;
  prediction: AnalysisPrediction;
  confidence: number;
  // Potentially add other fields like patientId, notes, etc. from your DB
}

export default function HistoryPage() {
  const { user } = useAuth();
  const [analyses, setAnalyses] = useState<HistoricalAnalysis[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true); // For data fetching state

  useEffect(() => {
    document.title = 'Analysis History - LungLens AI';

    const fetchHistory = async () => {
      if (user) {
        setIsLoadingHistory(true);
        // In a real application, you would fetch historical data for the logged-in user here.
        // Example:
        // try {
        //   const response = await fetch('/api/history'); // Replace with your actual API endpoint
        //   if (!response.ok) {
        //     throw new Error('Failed to fetch history');
        //   }
        //   const data: HistoricalAnalysis[] = await response.json();
        //   setAnalyses(data);
        // } catch (error) {
        //   console.error("Error fetching history:", error);
        //   // Optionally, show a toast notification for the error
        // } finally {
        //   setIsLoadingHistory(false);
        // }

        // For now, we'll simulate a delay and then set to empty or some placeholder if needed
        // This example will just set loading to false after a delay, resulting in "No history found"
        setTimeout(() => {
          // setAnalyses([]); // Ensure it's empty if no data is fetched
          setIsLoadingHistory(false);
        }, 1500); // Simulate network delay
      } else {
        setIsLoadingHistory(false); // Not logged in, so not loading history
        setAnalyses([]);
      }
    };

    fetchHistory();
  }, [user]);

  const getPredictionBadgeVariant = (prediction: AnalysisPrediction) => {
    switch (prediction) {
      case 'Normal':
        return 'default';
      case 'Benign':
        return 'secondary';
      case 'Malignant':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const renderSkeletonRows = (count: number) => {
    return Array.from({ length: count }).map((_, index) => (
      <TableRow key={`skeleton-${index}`}>
        <TableCell><Skeleton className="h-4 w-24" /></TableCell>
        <TableCell><Skeleton className="h-4 w-40" /></TableCell>
        <TableCell><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
        <TableCell className="text-right"><Skeleton className="h-4 w-12" /></TableCell>
      </TableRow>
    ));
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
            This page currently displays mock data. For full functionality,
            a backend database is required to store and retrieve historical analysis results
            for each authenticated user.
          </p>
          <p className="mt-2">
            You'll need to implement API endpoints (e.g., <code>/api/history</code>) to save and fetch data,
            and then update this page to call those endpoints.
          </p>
        </CardContent>
      </Card>

      {isLoadingHistory ? (
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Loading Past Analyses...</CardTitle>
            <CardDescription>
              Fetching your historical CT scan analysis data.
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
                {renderSkeletonRows(3)}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : analyses.length > 0 ? (
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
            <div className="flex flex-col items-center justify-center text-muted-foreground py-12">
              <HistoryIcon className="w-16 h-16 mb-4 opacity-50" />
              <p className="text-lg font-semibold">No analysis history found.</p>
              <p className="text-sm">
                Once you analyze CT scans and the backend is integrated, your history will appear here.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
