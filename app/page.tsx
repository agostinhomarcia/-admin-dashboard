export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        {/* Cards de estatísticas */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-gray-500">Total Usuários</h2>
          <p className="text-3xl font-bold">1,234</p>
        </div>
        {/* Adicione mais cards aqui */}
      </div>
    </div>
  );
}
