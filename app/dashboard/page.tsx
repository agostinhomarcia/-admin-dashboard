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
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-zinc-500 mt-1">
            Acompanhe seus principais indicadores
          </p>
        </div>

        {/* Filtros */}
        <div className="flex gap-3">
          <select
            className="px-3 py-2 border rounded-md text-sm dark:bg-zinc-800"
            onChange={(e) => setTimeRange(e.target.value)}
            value={timeRange}
          >
            <option value="7">Última semana</option>
            <option value="30">Último mês</option>
            <option value="90">Últimos 3 meses</option>
            <option value="180">Últimos 6 meses</option>
            <option value="365">Último ano</option>
          </select>

          <button
            onClick={() => setCompareMode(!compareMode)}
            className={`px-3 py-2 text-sm border rounded-md ${
              compareMode ? "bg-zinc-100 dark:bg-zinc-800" : ""
            }`}
          >
            Comparar Períodos
          </button>
        </div>
      </div>

      {/* Cards principais - 4 colunas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-sm">
          <span className="text-sm text-zinc-500">Vendas Hoje</span>
          <h3 className="text-2xl font-bold mt-1">R$ 12.589,00</h3>
          <span className="text-sm text-green-500">+15% vs ontem</span>
        </div>
        {/* Mais 3 cards similares */}
      </div>

      {/* Gráficos principais */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold">Vendas Mensais</h2>
              <p className="text-sm text-zinc-500">
                Comparativo dos últimos 6 meses
              </p>
            </div>
            {/* Legenda do gráfico */}
          </div>
          <SalesChart data={salesData} />
        </div>

        <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold">Usuários Ativos</h2>
              <p className="text-sm text-zinc-500">
                Crescimento mensal de usuários
              </p>
            </div>
          </div>
          <ActiveUsersChart data={usersData.map((item) => item.value)} />
        </div>
      </div>
    </div>
  );
}
