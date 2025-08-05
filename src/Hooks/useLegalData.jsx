import { useEffect, useState } from "react";

export default function useLegalData(clave, fuente = "/data/legalData.json") {
  const [contenido, setContenido] = useState("");

  useEffect(() => {
    async function cargar() {
      try {
        const res = await fetch(fuente);
        const data = await res.json();
        const entry = data[clave];

        if (!entry?.ruta) return;

        const texto = await fetch(entry.ruta).then(r => r.text());
        setContenido(texto);
      } catch (error) {
        console.error("❌ Error al cargar contenido legal:", error);
      }
    }

    cargar();
  }, [clave, fuente]);

  return contenido;
}
