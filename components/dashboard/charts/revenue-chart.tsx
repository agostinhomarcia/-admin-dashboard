import { Bar } from "react-chartjs-2";

export function RevenueChart() {
  const data = {
    labels: ["Produto A", "Produto B", "Produto C"],
    datasets: [
      {
        label: "Receita",
        data: [3000, 2000, 1500],
        backgroundColor: ["#4CAF50", "#FF9800", "#F44336"],
      },
    ],
  };

  return (
    <div className="p-6 bg-white dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800">
      <h2 className="text-lg font-semibold mb-4">Receita por Produto</h2>
      <Bar data={data} options={{ responsive: true }} />
    </div>
  );
}
