
"use client";

import type { ReactNode } from 'react';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  email: string;
  // Add other user properties if needed
}

interface AuthContextType {
  user: User | null;
  login: (email: string) => void; // Simplified login
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); // To handle initial auth check
  const router = useRouter();

  // Mock initial check (e.g., from localStorage, but keep it simple for now)
  useEffect(() => {
    // In a real app, you might check for a token in localStorage here
    setIsLoading(false);
  }, []);

  const login = (email: string) => {
    // In a real app, this would involve API calls, password verification, etc.
    const mockUser = { email };
    setUser(mockUser);
    router.push('/analysis'); // Redirect to a protected page after login
  };

  const logout = () => {
    setUser(null);
    router.push('/login'); // Redirect to login page after logout
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
