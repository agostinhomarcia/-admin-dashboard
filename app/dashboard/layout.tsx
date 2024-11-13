"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { Menu } from "lucide-react";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex dark:bg-zinc-900">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <main className="flex-1 overflow-y-auto">
        <header className="h-16 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-4">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md"
          >
            <Menu className="h-5 w-5" />
          </button>
        </header>
        {children}
      </main>
    </div>
  );
}
