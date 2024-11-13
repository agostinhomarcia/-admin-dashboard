"use client";

import { useState } from "react";
import { Product } from "@/types/product";
import { toast } from "sonner";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Product) => void;
  product?: Product;
}

const formatPrice = (value: string) => {
  const numbers = value.replace(/\D/g, "");

  const price = Number(numbers) / 100;

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);
};

export function ProductModal({
  isOpen,
  onClose,
  onSubmit,
  product,
}: ProductModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: product?.name || "",
    price: product?.price || "",
    stock: product?.stock || 0,
  });

  if (!isOpen) return null;

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    const formattedPrice = formatPrice(value);
    setFormData({ ...formData, price: formattedPrice });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const priceValue =
        typeof formData.price === "string"
          ? formData.price.replace(/\D/g, "")
          : String(formData.price).replace(/\D/g, "");
      const price = Number(priceValue) / 100;

      await onSubmit({
        id: product?.id || "",
        ...formData,
        price,
        createdAt: product?.createdAt || new Date().toISOString(),
      });

      toast.success("Produto salvo com sucesso!");
      onClose();
    } catch (error) {
      toast.error("Erro ao salvar produto");
    } finally {
      setLoading(false);
    }
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
          <div className="space-y-2">
            <label>Preço</label>
            <input
              type="text"
              value={formData.price}
              onChange={handlePriceChange}
              className="w-full p-2 border rounded-md"
              placeholder="R$ 0,00"
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
              onClick={handleSubmit}
              disabled={loading}
              className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
