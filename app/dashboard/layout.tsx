"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    router.push("/login");
  };

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: "📊" },
    { name: "Usuários", path: "/dashboard/users", icon: "👥" },
    { name: "Produtos", path: "/dashboard/products", icon: "📦" },
    { name: "Configurações", path: "/dashboard/settings", icon: "⚙️" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-4 border-b">
            <span className="text-xl font-bold">Dashboard</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className={`flex items-center p-2 rounded-lg ${
                      pathname === item.path
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              className="w-full flex items-center p-2 text-red-500 hover:bg-red-50 rounded-lg"
            >
              <span className="mr-3">🚪</span>
              <span>Sair</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold text-gray-900">
                {navItems.find((item) => item.path === pathname)?.name ||
                  "Dashboard"}
              </h1>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-4">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
