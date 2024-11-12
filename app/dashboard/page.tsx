import { SalesChart } from "@/components/dashboard/charts/sales-chart";
import { ActiveUsersChart } from "@/components/dashboard/charts/active-users-chart";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SalesChart />
        <ActiveUsersChart />
      </div>
    </div>
  );
}
