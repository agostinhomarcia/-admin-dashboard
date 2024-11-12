"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { User } from "@/types/user";
import { toast } from "sonner";

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: User) => void;
  user?: User;
}

const initialFormData = {
  name: "",
  email: "",
  role: "user" as const,
};

export function UserModal({ isOpen, onClose, onSubmit, user }: UserModalProps) {
  const [formData, setFormData] = useState<Partial<User>>(initialFormData);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } else {
      setFormData(initialFormData);
    }
  }, [user, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    console.log("Dados sendo enviados do modal:", formData);

    try {
      const response = await fetch("/api/users", {
        method: user ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: user?.id,
          name: formData.name,
          email: formData.email,
          role: formData.role,
        }),
      });

      const data = await response.json();
      console.log("Resposta da API:", data);

      if (!response.ok) throw new Error(data.error);

      onSubmit(data);
      onClose();
    } catch (error) {
      console.error("Erro ao salvar:", error);
      toast.error("Erro ao salvar usuário");
    }
  };

  const handleClose = () => {
    setFormData(initialFormData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white dark:bg-zinc-950 p-6 rounded-lg w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">
            {user ? "Editar Usuário" : "Novo Usuário"}
          </h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nome</label>
              <input
                type="text"
                className="w-full p-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                className="w-full p-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Função</label>
              <select
                value={formData.role}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    role: e.target.value as "admin" | "user",
                  })
                }
                className="w-full p-2 border rounded-md bg-white"
              >
                <option value="" disabled>
                  Selecione uma função
                </option>
                <option value="admin">Administrador</option>
                <option value="user">Usuário</option>
              </select>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 border border-zinc-200 dark:border-zinc-800 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-zinc-900 text-zinc-50 rounded-md hover:bg-zinc-800"
              >
                Salvar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
