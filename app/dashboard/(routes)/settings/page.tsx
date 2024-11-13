"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Settings, Bell } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import { isValidEmail } from "@/lib/utils/validation";

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);
  const [backupLoading, setBackupLoading] = useState(false);
  const [lastBackupDate, setLastBackupDate] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
  });
  const [errors, setErrors] = useState({
    companyName: "",
    email: "",
  });

  const handleBackup = async () => {
    setBackupLoading(true);
    try {
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

  const handleSave = () => {
    if (!formData.companyName.trim()) {
      toast.error("Nome da empresa é obrigatório");
      return;
    }

    if (!formData.email.trim() || !isValidEmail(formData.email)) {
      toast.error("Email inválido");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      toast.success("Configurações salvas com sucesso!");
      setFormData({
        companyName: "",
        email: "",
      });
      setLoading(false);
    }, 1000);
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: "" });
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Configurações</h1>
        <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-400">
          Gerencie as configurações do sistema
        </p>
      </div>

      <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2">
        <div className="bg-white dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4 md:p-6">
          <div className="flex items-center gap-2 mb-4">
            <Settings className="h-5 w-5 text-zinc-500" />
            <h2 className="text-xl font-semibold">Configurações Gerais</h2>
          </div>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Nome da Empresa
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className={cn(
                  "w-full px-3 py-2 rounded-md border transition-colors",
                  errors.companyName
                    ? "border-red-500 focus:ring-red-200"
                    : "border-zinc-200 dark:border-zinc-800 focus:ring-blue-200"
                )}
                placeholder="Nome da sua empresa"
                value={formData.companyName}
                onChange={(e) => handleChange("companyName", e.target.value)}
              />
              {errors.companyName && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.companyName}
                </p>
              )}
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

        <div className="bg-white dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4 md:p-6">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="h-5 w-5 text-zinc-500" />
            <h2 className="text-xl font-semibold">Notificações</h2>
          </div>
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
      </div>

      <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2">
        <div className="bg-white dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4 md:p-6">
          <div className="flex items-center gap-2 mb-4">
            <Settings className="h-5 w-5 text-zinc-500" />
            <h2 className="text-xl font-semibold">Backup e Restauração</h2>
          </div>
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

      <div className="flex flex-col sm:flex-row justify-end gap-3 sm:space-x-4">
        <button
          className="w-full sm:w-auto px-4 py-2 border rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800"
          onClick={() => toast.error("Alterações canceladas")}
        >
          Cancelar
        </button>
        <button
          className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
          onClick={handleSave}
          disabled={loading || !formData.companyName || !formData.email}
        >
          {loading ? "Salvando..." : "Salvar Alterações"}
        </button>
      </div>
    </div>
  );
}
