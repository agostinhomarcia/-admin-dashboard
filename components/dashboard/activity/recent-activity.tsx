import { Clock } from "lucide-react";

const activities = [
  {
    id: 1,
    description: "Novo pedido realizado",
    time: "há 5 minutos",
    type: "order",
  },
  {
    id: 2,
    description: "Novo usuário registrado",
    time: "há 2 horas",
    type: "user",
  },
  {
    id: 3,
    description: "Produto atualizado",
    time: "há 4 horas",
    type: "product",
  },
  // Adicione mais atividades conforme necessário
];

export function RecentActivity() {
  return (
    <div className="p-6 bg-white dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800">
      <h2 className="text-lg font-semibold mb-4">Atividades Recentes</h2>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center gap-4 text-sm">
            <div className="flex-shrink-0">
              <Clock className="h-5 w-5 text-zinc-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {activity.description}
              </p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
