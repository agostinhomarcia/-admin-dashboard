"use client";

import { useState } from "react";
import { Product } from "@/types/product";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Product) => void;
  product?: Product;
}

export function ProductModal({
  isOpen,
  onClose,
  onSubmit,
  product,
}: ProductModalProps) {
  const [formData, setFormData] = useState({
    name: product?.name || "",
    price: product?.price || 0,
    stock: product?.stock || 0,
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: product?.id || "",
      ...formData,
      createdAt: product?.createdAt || new Date().toISOString(),
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {product ? "Editar Produto" : "Novo Produto"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Nome</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Preço</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: Number(e.target.value) })
              }
              className="w-full p-2 border rounded-md"
              required
              min="0"
              step="0.01"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Estoque</label>
            <input
              type="number"
              value={formData.stock}
              onChange={(e) =>
                setFormData({ ...formData, stock: Number(e.target.value) })
              }
              className="w-full p-2 border rounded-md"
              required
              min="0"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-zinc-900 text-zinc-50 rounded-md"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
