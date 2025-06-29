import { useEffect, useState } from "react";

function useRollitoAnimado() {
  const [fase, setFase] = useState("sale");

  useEffect(() => {
    let timer;
    if (fase === "sale") {
      timer = setTimeout(() => setFase("entra"), 9000); // empieza
    } else if (fase === "entra") {
      timer = setTimeout(() => setFase("saluda"), 5000); // se detiene después de entrar
    } else if (fase === "saluda") {
      timer = setTimeout(() => setFase("sale"), 9000); // luego de saludar se va
    }

    return () => clearTimeout(timer);
  }, [fase]);

  return fase;
}

export default useRollitoAnimado;
