"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [loading] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Configurações</h1>
        <p className="text-zinc-500 dark:text-zinc-400">
          Gerencie as configurações do sistema
        </p>
      </div>

      <div className="bg-white dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800">
        {/* Configurações Gerais */}
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
              />
            </div>
          </form>
        </div>

        {/* Configurações de Notificações */}
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

        {/* Configurações de Backup */}
        <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
          <h2 className="text-xl font-semibold mb-4">Backup e Restauração</h2>
          <div className="space-y-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              onClick={() => alert("Backup iniciado")}
            >
              Fazer Backup
            </button>
            <div>
              <p className="text-sm text-zinc-500 mt-2">Último backup: Nunca</p>
            </div>
          </div>
        </div>
      </div>

      {/* Botões de Ação */}
      <div className="flex justify-end space-x-4">
        <button
          className="px-4 py-2 border rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800"
          onClick={() => alert("Alterações canceladas")}
        >
          Cancelar
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={() => alert("Configurações salvas")}
          disabled={loading}
        >
          {loading ? "Salvando..." : "Salvar Alterações"}
        </button>
      </div>
    </div>
  );
}
