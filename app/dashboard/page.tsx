"use client";

import { useState, useEffect } from "react";
import { SalesChart } from "@/components/dashboard/charts/sales-chart";
import { ActiveUsersChart } from "@/components/dashboard/charts/active-users-chart";

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState("6");
  const [chartType, setChartType] = useState<"line" | "bar" | "area">("line");
  const [compareMode, setCompareMode] = useState(false);
  const [salesData, setSalesData] = useState([{ date: "Jan", value: 65 }]);
  const [usersData, setUsersData] = useState([{ date: "Jan", value: 200 }]);

  useEffect(() => {
    const generateData = () => {
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

      // Dados de vendas - padrão de curva com pico em Mar/Apr
      const salesValues = [65, 58, 80, 82, 56, 55];
      const sales = months.map((month, index) => ({
        date: month,
        value: salesValues[index],
      }));

      // Dados de usuários - crescimento progressivo
      const userValues = [200, 300, 400, 500, 600, 700];
      const users = months.map((month, index) => ({
        date: month,
        value: userValues[index],
      }));

      setSalesData(sales);
      setUsersData(users);
    };

    generateData();
    const interval = setInterval(generateData, 60000); // Atualiza a cada 1 minuto
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[calc(100vh-80px)] p-4 flex flex-col gap-4">
      {/* Header - Mais compacto */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-zinc-500">
            Acompanhe seus principais indicadores
          </p>
        </div>

        <div className="flex gap-2">
          <select
            className="px-2 py-1 text-sm border rounded-md dark:bg-zinc-800"
            onChange={(e) => setTimeRange(e.target.value)}
            value={timeRange}
          >
            <option value="7">7 dias</option>
            <option value="30">30 dias</option>
            <option value="90">3 meses</option>
          </select>

          <button
            onClick={() => setCompareMode(!compareMode)}
            className={`px-2 py-1 text-sm border rounded-md ${
              compareMode ? "bg-zinc-100 dark:bg-zinc-800" : ""
            }`}
          >
            Comparar
          </button>
        </div>
      </div>

      {/* Grid principal - Usando grid-rows para controle vertical */}
      <div className="flex-1 grid grid-rows-[auto_1fr] gap-4">
        {/* Cards em uma única linha */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
            <span className="text-sm text-zinc-500">Vendas Hoje</span>
            <h3 className="text-xl font-bold">R$ 12.589,00</h3>
            <span className="text-sm text-green-500">+15% vs ontem</span>
          </div>
          {/* ... outros cards ... */}
        </div>

        {/* Gráficos lado a lado com altura fixa */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h2 className="font-semibold">Vendas Mensais</h2>
                <p className="text-xs text-zinc-500">
                  Comparativo dos últimos 6 meses
                </p>
              </div>
            </div>
            <div className="h-[calc(100%-60px)]">
              <SalesChart data={salesData} />
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h2 className="font-semibold">Usuários Ativos</h2>
                <p className="text-xs text-zinc-500">
                  Crescimento mensal de usuários
                </p>
              </div>
            </div>
            <div className="h-[calc(100%-60px)]">
              <ActiveUsersChart data={usersData.map((item) => item.value)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
