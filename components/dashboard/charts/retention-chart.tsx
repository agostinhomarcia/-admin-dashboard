import { Doughnut } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { ChartData } from "chart.js";

export function RetentionChart() {
  const [data, setData] = useState<ChartData<"doughnut">>({
    labels: [],
    datasets: [
      {
        label: "Vendas",
        data: [],
      },
    ],
  });

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/sales");
      const result = await response.json();
      setData(result);
    }
    fetchData();
  }, []);

  return (
    <div className="p-6 bg-white dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800">
      <h2 className="text-lg font-semibold mb-4">Retenção de Usuários</h2>
      <Doughnut data={data} options={{ responsive: true }} />
    </div>
  );
}
