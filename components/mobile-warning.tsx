"use client";

import { useState } from "react";
import { Monitor, X } from "lucide-react";

export function MobileWarning() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="lg:hidden fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-zinc-900 p-6">
      <button
        onClick={() => setIsVisible(false)}
        className="absolute top-4 right-4 p-2"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="text-center space-y-4">
        <h2 className="text-xl font-bold">Versão Desktop Recomendada</h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          Para uma melhor experiência, recomendamos acessar este sistema através
          de um computador.
        </p>
        <Monitor className="w-12 h-12 mx-auto text-zinc-400" />
        <button
          onClick={() => setIsVisible(false)}
          className="mt-4 px-4 py-2 bg-zinc-200 dark:bg-zinc-800 rounded-md"
        >
          Continuar mesmo assim
        </button>
      </div>
    </div>
  );
}
