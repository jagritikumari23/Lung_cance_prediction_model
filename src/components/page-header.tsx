
"use client";

import { Activity, Home, Info, UploadCloud, LogIn, LogOut, HistoryIcon } from "lucide-react"; // Added HistoryIcon
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";

export default function PageHeader() {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();

  const navItems = [
    { href: "/", label: "Home", icon: <Home className="h-4 w-4" />, public: true },
    { href: "/analysis", label: "Analyze Scan", icon: <UploadCloud className="h-4 w-4" />, public: false },
    { href: "/history", label: "History", icon: <HistoryIcon className="h-4 w-4" />, public: false }, // Added History link
    { href: "/about", label: "About", icon: <Info className="h-4 w-4" />, public: true },
  ];

  const handleLogout = async () => {
    logout();
    // router.push('/login') is handled by the logout function in auth-context
  };

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <header className="bg-card shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 text-xl font-semibold text-primary hover:opacity-90 transition-opacity">
          <Activity className="h-7 w-7" />
          <span>LungLens AI</span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          {navItems.map((item) => {
            if (!item.public && !user && !isLoading) return null; 
            if (!item.public && isLoading) { 
                 return (
                    <Button key={item.label} variant="ghost" disabled className="text-sm sm:text-base px-2 sm:px-3 py-1 sm:py-2">
                         <span className="w-4 h-4 mr-1.5 bg-muted-foreground/20 rounded animate-pulse"></span>
                         <span className="hidden sm:inline bg-muted-foreground/20 rounded h-4 w-16 animate-pulse"></span>
                    </Button>
                 );
            }
            return (
              <Button key={item.label} variant="ghost" asChild className="text-sm sm:text-base px-2 sm:px-3 py-1 sm:py-2">
                <Link href={item.href} className="flex items-center gap-1.5">
                  {item.icon}
                  <span className="hidden sm:inline">{item.label}</span>
                  <span className="sm:hidden sr-only">{item.label}</span>
                </Link>
              </Button>
            );
          })}
          {isLoading ? (
             <Button variant="outline" size="sm" disabled>
                <span className="w-4 h-4 mr-1.5 bg-muted-foreground/20 rounded animate-pulse"></span>
                <span className="bg-muted-foreground/20 rounded h-4 w-12 animate-pulse"></span>
            </Button>
          ) : user ? (
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="mr-1.5 h-4 w-4" /> Logout
            </Button>
          ) : (
            <Button variant="outline" size="sm" onClick={handleLogin}>
              <LogIn className="mr-1.5 h-4 w-4" /> Login
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
