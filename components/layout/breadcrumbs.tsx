"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname?.split("/").filter(Boolean) || [];

  return (
    <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
      <Link
        href="/dashboard"
        className="hover:text-zinc-900 dark:hover:text-zinc-50"
      >
        Dashboard
      </Link>

      {segments.slice(1).map((segment, index) => (
        <div key={segment} className="flex items-center gap-2">
          <ChevronRight className="h-4 w-4" />
          <Link
            href={`/dashboard/${segments.slice(1, index + 2).join("/")}`}
            className="capitalize hover:text-zinc-900 dark:hover:text-zinc-50"
          >
            {segment}
          </Link>
        </div>
      ))}
    </div>
  );
}
