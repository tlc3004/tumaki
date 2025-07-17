import { useState } from "react";

export function useImageSlider(pedidos) {
  const [indice, setIndice] = useState(0);

  const siguiente = () => {
    setIndice((prev) => (prev + 1) % pedidos.length);
  };

  const anterior = () => {
    setIndice((prev) => (prev - 1 + pedidos.length) % pedidos.length);
  };

  return {
    rollActual: pedidos[indice],
    siguiente,
    anterior,
  };
}
