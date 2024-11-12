"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function OverviewChart() {
  const data = {
    labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
    datasets: [
      {
        label: "Vendas",
        data: [65, 59, 80, 81, 56, 55],
        borderColor: "rgb(99, 102, 241)",
        tension: 0.3,
      },
      {
        label: "Visitas",
        data: [28, 48, 40, 19, 86, 27],
        borderColor: "rgb(248, 113, 113)",
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="p-6 bg-white dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800">
      <h2 className="text-lg font-semibold mb-4">Visão Geral</h2>
      <Line
        data={data}
        options={{
          responsive: true,
          interaction: {
            mode: "index" as const,
            intersect: false,
          },
          scales: {
            y: {
              grid: {
                color: "rgba(0, 0, 0, 0.1)",
              },
            },
            x: {
              grid: {
                display: false,
              },
            },
          },
        }}
      />
    </div>
  );
}
