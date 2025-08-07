// src/hooks/useAppLinks.js
import { useEffect, useState } from "react";

export function useAppData(fuente = "/data/apps.json") {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    async function cargar() {
      try {
        const res = await fetch(fuente);
        const data = await res.json();
        setApps(data);
      } catch (error) {
        console.error("❌ Error al cargar rutas de apps:", error);
      }
    }

    cargar();
  }, [fuente]);

  return apps;
}
