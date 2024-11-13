"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Plus, Pencil, Trash } from "lucide-react";
import { User } from "@/lib/types";
import { UserModal } from "@/components/users/user-modal";
import { ConfirmModal } from "@/components/ui/confirm-modal";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | undefined>();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setUsers(data);
    } catch {
      toast.error("Erro ao carregar usuários");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (user?: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(undefined);
    setIsModalOpen(false);
  };

  const handleSubmit = async (data: User) => {
    try {
      const emailExists = users.some(
        (user) => user.email === data.email && user.id !== data.id
      );

      if (emailExists) {
        toast.error("Este email já está em uso");
        return;
      }

      const response = await fetch("/api/users", {
        method: data.id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Erro ao salvar usuário");

      await fetchUsers();
      toast.success("Usuário salvo com sucesso!");
      handleCloseModal();
    } catch {
      toast.error("Erro ao salvar usuário");
    }
  };

  const handleDeleteClick = (userId: string) => {
    setUserToDelete(userId);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!userToDelete) return;

    try {
      const response = await fetch(`/api/users/${userToDelete}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Erro ao excluir usuário");

      await fetchUsers();
      toast.success("Usuário excluído com sucesso!");
    } catch {
      toast.error("Erro ao excluir usuário");
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="h-8 w-48 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
          <div className="h-10 w-32 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
        </div>
        <div className="bg-white dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-16 bg-zinc-100 dark:bg-zinc-900 rounded-md mb-2 animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] space-y-4">
        <div className="text-zinc-500 dark:text-zinc-400">
          Nenhum usuário encontrado
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2 bg-zinc-900 text-zinc-50 rounded-md hover:bg-zinc-800"
        >
          <Plus className="h-4 w-4" />
          Novo Usuário
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold">Usuários</h1>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-zinc-900 text-zinc-50 rounded-md hover:bg-zinc-800"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Novo Usuário</span>
        </button>
      </div>

      <div className="bg-white dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800">
        <div className="hidden md:block">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-800">
                <th className="text-left p-4 font-medium">Nome</th>
                <th className="text-left p-4 font-medium">Email</th>
                <th className="text-left p-4 font-medium">Função</th>
                <th className="text-left p-4 font-medium">Data de Criação</th>
                <th className="text-right p-4 font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                >
                  <td className="p-4">{user.name}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">{user.role}</td>
                  <td className="p-4">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenModal(user)}
                        className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors group"
                        title="Editar"
                      >
                        <Pencil className="h-4 w-4 text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-50" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(user.id)}
                        className="p-2 hover:bg-red-50 dark:hover:bg-red-950 rounded-md transition-colors group"
                        title="Excluir"
                      >
                        <Trash className="h-4 w-4 text-red-500 group-hover:text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="md:hidden divide-y divide-zinc-200 dark:divide-zinc-800">
          {users.map((user) => (
            <div key={user.id} className="p-4 space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium">{user.name}</div>
                  <div className="text-sm text-zinc-500 dark:text-zinc-400">
                    {user.email}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenModal(user)}
                    className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors group"
                    title="Editar"
                  >
                    <Pencil className="h-4 w-4 text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-50" />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(user.id)}
                    className="p-2 hover:bg-red-50 dark:hover:bg-red-950 rounded-md transition-colors group"
                    title="Excluir"
                  >
                    <Trash className="h-4 w-4 text-red-500 group-hover:text-red-600" />
                  </button>
                </div>
              </div>
              <div className="text-sm grid grid-cols-2 gap-2">
                <div>
                  <span className="text-zinc-500 dark:text-zinc-400">
                    Função:{" "}
                  </span>
                  {user.role}
                </div>
                <div>
                  <span className="text-zinc-500 dark:text-zinc-400">
                    Criado em:{" "}
                  </span>
                  {new Date(user.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <UserModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        user={selectedUser}
      />

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Excluir Usuário"
        message="Tem certeza que deseja excluir este usuário? Esta ação não pode ser desfeita."
      />
    </div>
  );
}
