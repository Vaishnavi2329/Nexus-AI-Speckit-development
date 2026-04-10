"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "@/components/ui/providers";

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        {children}
      </div>
    </ThemeProvider>
  );
}
