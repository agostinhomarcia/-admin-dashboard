"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);
  const [backupLoading, setBackupLoading] = useState(false);
  const [lastBackupDate, setLastBackupDate] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
  });

  // Função para validar email
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Função para formatar a data
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  // Função para lidar com o backup
  const handleBackup = async () => {
    setBackupLoading(true);
    try {
      // Simular processo de backup
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const currentDate = new Date();
      setLastBackupDate(formatDate(currentDate));
      toast.success("Backup realizado com sucesso!");
    } catch (error) {
      toast.error("Erro ao realizar backup");
    } finally {
      setBackupLoading(false);
    }
  };

  // Função para salvar as alterações
  const handleSave = () => {
    if (!formData.companyName.trim()) {
      toast.error("Nome da empresa é obrigatório");
      return;
    }

    if (!formData.email.trim()) {
      toast.error("Email é obrigatório");
      return;
    }

    if (!isValidEmail(formData.email)) {
      toast.error("Email inválido");
      return;
    }

    setLoading(true);
    // Simular salvamento
    setTimeout(() => {
      toast.success("Configurações salvas com sucesso!");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Configurações</h1>
        <p className="text-zinc-500 dark:text-zinc-400">
          Gerencie as configurações do sistema
        </p>
      </div>

      <div className="bg-white dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800">
        <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
          <h2 className="text-xl font-semibold mb-4">Configurações Gerais</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Nome da Empresa
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                placeholder="Nome da sua empresa"
                value={formData.companyName}
                onChange={(e) =>
                  setFormData({ ...formData, companyName: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Email de Contato
              </label>
              <input
                type="email"
                className="w-full p-2 border rounded-md"
                placeholder="contato@empresa.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
          </form>
        </div>

        <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
          <h2 className="text-xl font-semibold mb-4">Notificações</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Notificações por Email</h3>
                <p className="text-sm text-zinc-500">
                  Receba atualizações importantes por email
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Notificações do Sistema</h3>
                <p className="text-sm text-zinc-500">
                  Notificações sobre atualizações do sistema
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
          <h2 className="text-xl font-semibold mb-4">Backup e Restauração</h2>
          <div className="space-y-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
              onClick={handleBackup}
              disabled={backupLoading}
            >
              {backupLoading ? "Realizando backup..." : "Fazer Backup"}
            </button>
            <div>
              <p className="text-sm text-zinc-500 mt-2">
                Último backup: {lastBackupDate || "Nunca"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          className="px-4 py-2 border rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800"
          onClick={() => toast.error("Alterações canceladas")}
        >
          Cancelar
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
          onClick={handleSave}
          disabled={loading || !formData.companyName || !formData.email}
        >
          {loading ? "Salvando..." : "Salvar Alterações"}
        </button>
      </div>
    </div>
  );
}
