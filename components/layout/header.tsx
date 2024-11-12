import { Bell, User, Search } from "lucide-react";

export function Header() {
  return (
    <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 h-14 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500 dark:text-zinc-400" />
          <input
            type="text"
            placeholder="Buscar..."
            className="pl-9 pr-4 py-2 text-sm bg-zinc-100 dark:bg-zinc-800 rounded-md border border-transparent focus:border-zinc-300 dark:focus:border-zinc-700 focus:outline-none w-64"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        <button className="flex items-center gap-2 p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md">
          <User className="h-5 w-5" />
          <span className="text-sm font-medium">Perfil</span>
        </button>
      </div>
    </header>
  );
}
