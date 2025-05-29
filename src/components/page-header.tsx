import { Image as ImageIcon } from "lucide-react";
import Link from "next/link";

export default function PageHeader() {
  return (
    <header className="bg-card shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 text-xl font-semibold text-primary hover:opacity-90 transition-opacity">
          <ImageIcon className="h-7 w-7" />
          <span>Image Insights</span>
        </Link>
        {/* Future navigation items can be added here */}
      </div>
    </header>
  );
}
