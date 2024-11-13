"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Plus, Pencil, Trash } from "lucide-react";
import { Product } from "@/types/product";
import { ProductModal } from "@/components/products/product-modal";
import { ConfirmModal } from "@/components/ui/confirm-modal";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>(
    undefined
  );

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data);
    } catch {
      toast.error("Erro ao carregar produtos");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (product?: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedProduct(undefined);
    setIsModalOpen(false);
    setEditingProduct(undefined);
  };

  const handleSubmit = async (data: any) => {
    try {
      const method = editingProduct ? "PUT" : "POST";
      const url = editingProduct
        ? `/api/products/${editingProduct.id}`
        : "/api/products";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(
          `Erro ao ${editingProduct ? "editar" : "criar"} produto`
        );
      }

      await fetchProducts();
      setIsModalOpen(false);
      toast.success(
        `Produto ${editingProduct ? "editado" : "criado"} com sucesso!`
      );
    } catch (error) {
      console.error("Erro:", error);
      toast.error(`Erro ao ${editingProduct ? "editar" : "criar"} produto`);
    }
  };

  const handleDeleteClick = (productId: string) => {
    setProductToDelete(productId);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;

    try {
      const response = await fetch(`/api/products/${productToDelete}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Erro ao excluir produto");

      await fetchProducts();
      toast.success("Produto excluído com sucesso!");
    } catch {
      toast.error("Erro ao excluir produto");
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold">Produtos</h1>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-zinc-900 text-zinc-50 rounded-md hover:bg-zinc-800"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Novo Produto</span>
        </button>
      </div>

      <div className="bg-white dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800">
        {/* Desktop Table View */}
        <div className="hidden md:block">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-800">
                <th className="text-left p-4 font-medium">Nome</th>
                <th className="text-left p-4 font-medium">Preço</th>
                <th className="text-left p-4 font-medium">Estoque</th>
                <th className="text-left p-4 font-medium">Data de Criação</th>
                <th className="text-right p-4 font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-zinc-200 dark:border-zinc-800"
                >
                  <td className="p-4">{product.name}</td>
                  <td className="p-4">
                    {product.price.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span>{product.stock}</span>
                      {product.stock < 100 ? (
                        <span className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded-full">
                          Baixo
                        </span>
                      ) : product.stock < 300 ? (
                        <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-full">
                          Médio
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                          Alto
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    {new Date(product.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(product.id)}
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

        {/* Mobile Card View */}
        <div className="md:hidden divide-y divide-zinc-200 dark:divide-zinc-800">
          {products.map((product) => (
            <div key={product.id} className="p-4 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {product.price.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(product.id)}
                    className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md text-red-500"
                  >
                    <Trash className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <span className="text-zinc-500 dark:text-zinc-400">
                  Estoque:
                </span>
                <div className="flex items-center gap-2">
                  <span>{product.stock}</span>
                  {product.stock < 100 ? (
                    <span className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded-full">
                      Baixo
                    </span>
                  ) : product.stock < 300 ? (
                    <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-full">
                      Médio
                    </span>
                  ) : (
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                      Alto
                    </span>
                  )}
                </div>
              </div>

              <div className="text-sm text-zinc-500 dark:text-zinc-400">
                Criado em: {new Date(product.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </div>

      <ProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        product={editingProduct}
      />

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Excluir Produto"
        message="Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita."
      />
    </div>
  );
}
