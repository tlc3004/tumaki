// src/hooks/useToastGlobal.js
import { useState, useCallback } from "react";
import Toast from "../components/Toast";
import "../styles/Toast.css" 

const reproducirSonido = () => {
  const audio = new Audio("/sounds/fluttering-bamboo-flute-transition-b-1-209650.mp3");
  audio.play().catch((e) => console.warn("No se pudo reproducir el sonido:", e));
};


export function useToastGlobal() {
  const [mensajeGlobal, setMensajeGlobal] = useState(null);
  const [onClickGlobal, setOnClickGlobal] = useState(()=> {})

  const setToastGlobal = useCallback((msg, onClick = () => {}) =>{
  setMensajeGlobal(msg);
  setOnClickGlobal(() => onClick);
  reproducirSonido();
  }, []);

  const cerrarToastGlobal = () => setMensajeGlobal(null);

  const ToastGlobal = () =>
    mensajeGlobal ? (
      <Toast
        mensaje={mensajeGlobal}
        onClick={() =>{
          onClickGlobal();
          cerrarToastGlobal();
        }}
        onClose={cerrarToastGlobal}
      />
    ) : null;

  return { setToastGlobal, ToastGlobal };
}
