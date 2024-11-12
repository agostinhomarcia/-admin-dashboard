import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Bem-vindo ao Sistema</h1>

      <Link
        href="/dashboard"
        className="bg-zinc-900 text-zinc-50 px-6 py-3 rounded-md hover:bg-zinc-800 transition-colors"
      >
        Acessar Dashboard
      </Link>

      {/* Você pode adicionar mais conteúdo aqui se desejar */}
      <div className="mt-8 text-center text-zinc-600">
        <p>Sistema de Gerenciamento de Usuários</p>
      </div>
    </div>
  );
}
