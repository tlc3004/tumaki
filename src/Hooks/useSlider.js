/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

export function useSlider(imagenes = [], intervalo = 5000) {
  const [indice, setIndice] = useState(0);
  const [animado, setAnimado] = useState(false);

  useEffect(() => {
    if (imagenes.length === 0) return;

    const timer = setInterval(() => {
      setIndice((prev) => (prev + 1) % imagenes.length);
    }, intervalo);

    return () => clearInterval(timer);
  }, [imagenes, intervalo]);

  useEffect(() => {
    if (imagenes.length === 0) return;

    setAnimado(true);
    const timeout = setTimeout(() => setAnimado(false), 2000); 
    return () => clearTimeout(timeout);
  }, [indice]);

  const imagenActual = imagenes[indice];
  const animacion = animado ? "animando-slider" : "";

  return { imagenActual, animacion };
}
