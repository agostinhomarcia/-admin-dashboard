"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Definir interface para as props
interface ActiveUsersChartProps {
  data?: number[];
  labels?: string[];
}

export function ActiveUsersChart({
  data = [200, 300, 400, 500, 600, 700], // valores default
  labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
}: ActiveUsersChartProps) {
  const chartData = {
    labels,
    datasets: [
      {
        label: "Usuários Ativos",
        data,
        backgroundColor: "rgb(248, 113, 113)",
        borderRadius: 6,
        hoverBackgroundColor: "rgb(239, 68, 68)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.parsed.y} usuários`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          callback: (value: number) =>
            value >= 1000 ? `${value / 1000}k` : value,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="p-6 bg-white dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800">
      <h2 className="text-lg font-semibold mb-4">Usuários Ativos Mensais</h2>
      <Bar data={chartData} options={options as any} />
    </div>
  );
}
