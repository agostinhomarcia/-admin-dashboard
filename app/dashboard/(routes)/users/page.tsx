"use client";

import { useState } from "react";
import { Plus, Pencil, Trash } from "lucide-react";
import { UserModal } from "@/components/users/user-modal";
import { User } from "@/types/user";
import { toast } from "sonner";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      createdAt: "2024-01-01",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      role: "User",
      createdAt: "2024-01-02",
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | undefined>();

  const handleOpenModal = (user?: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(undefined);
    setIsModalOpen(false);
  };

  const handleSubmit = (data: User) => {
    const emailExists = users.some(
      (user) => user.email === data.email && user.id !== data.id
    );

    if (emailExists) {
      toast.error("Este email já está em uso por outro usuário.");
      return;
    }

    if (selectedUser) {
      setUsers(
        users.map((user) =>
          user.id === selectedUser.id ? { ...user, ...data } : user
        )
      );
      toast.success("Usuário atualizado com sucesso!");
    } else {
      setUsers([
        ...users,
        {
          ...data,
          id: String(Date.now()),
          createdAt: new Date().toISOString().split("T")[0],
        },
      ]);
      toast.success("Usuário criado com sucesso!");
    }
    handleCloseModal();
  };

  const handleDelete = (userId: string) => {
    if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
      setUsers(users.filter((user) => user.id !== userId));
      toast.success("Usuário excluído com sucesso!");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Usuários</h1>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2 bg-zinc-900 text-zinc-50 rounded-md hover:bg-zinc-800"
        >
          <Plus className="h-4 w-4" />
          Novo Usuário
        </button>
      </div>

      <div className="bg-white dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800">
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
                className="border-b border-zinc-200 dark:border-zinc-800"
              >
                <td className="p-4">{user.name}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">{user.role}</td>
                <td className="p-4">{user.createdAt}</td>
                <td className="p-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleOpenModal(user)}
                      className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md text-red-500"
                    >
                      <Trash className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <UserModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        user={selectedUser}
      />
    </div>
  );
}
