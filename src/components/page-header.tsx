
import { Image as ImageIcon, Home, Info, BarChartHorizontalBig } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PageHeader() {
  const navItems = [
    { href: "/", label: "Home", icon: <Home className="h-4 w-4" /> },
    { href: "/analysis", label: "Analysis", icon: <BarChartHorizontalBig className="h-4 w-4" /> },
    { href: "/about", label: "About", icon: <Info className="h-4 w-4" /> },
  ];

  return (
    <header className="bg-card shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 text-xl font-semibold text-primary hover:opacity-90 transition-opacity">
          <ImageIcon className="h-7 w-7" />
          <span>Image Insights</span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          {navItems.map((item) => (
            <Button key={item.label} variant="ghost" asChild className="text-sm sm:text-base px-2 sm:px-3 py-1 sm:py-2">
              <Link href={item.href} className="flex items-center gap-1.5">
                {item.icon}
                <span className="hidden sm:inline">{item.label}</span>
                <span className="sm:hidden sr-only">{item.label}</span>
              </Link>
            </Button>
          ))}
        </nav>
      </div>
    </header>
  );
}
