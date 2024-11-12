import { ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string;
  trend?: string;
  trendDirection?: "up" | "down";
}

export function StatsCard({
  title,
  value,
  trend,
  trendDirection,
}: StatsCardProps) {
  return (
    <div className="p-6 bg-white dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800">
      <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
        {title}
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <div className="text-2xl font-semibold">{value}</div>
        {trend && (
          <div
            className={cn(
              "flex items-center text-sm",
              trendDirection === "up" ? "text-green-500" : "text-red-500"
            )}
          >
            {trendDirection === "up" ? (
              <ArrowUp className="h-4 w-4" />
            ) : (
              <ArrowDown className="h-4 w-4" />
            )}
            {trend}
          </div>
        )}
      </div>
    </div>
  );
}
