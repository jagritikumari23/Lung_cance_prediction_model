
"use client";

import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton'; // For loading state

export default function HistoryLayout({ children }: { children: ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/login?redirect=/history'); // Redirect to login if not authenticated
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    // Show a loading skeleton or spinner while checking auth state
    return (
      <div className="space-y-8 p-4">
        <Skeleton className="h-12 w-1/3" />
        <div className="space-y-4">
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  if (!user) {
    // This will be briefly shown before redirection, or if redirection fails.
    return (
         <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
            <p className="text-lg text-muted-foreground">Redirecting to login...</p>
        </div>
    );
  }

  return <>{children}</>;
}
