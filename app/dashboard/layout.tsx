"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { MobileWarning } from "@/components/mobile-warning";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MobileWarning />
      <div className="flex min-h-screen lg:blur-none blur-sm">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-8 pt-20 lg:pt-8 min-h-screen w-full">
          {children}
        </main>
      </div>
    </>
  );
}
