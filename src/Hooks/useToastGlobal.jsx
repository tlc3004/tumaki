// src/hooks/useToastGlobal.js
import { useState, useCallback } from "react";
import Toast from "../components/Toast";
import "../styles/Toast.css" 

export function useToastGlobal() {
  const [mensajeGlobal, setMensajeGlobal] = useState(null);
  const [onClickGlobal, setOnClickGlobal] = useState(()=> {})

  const setToastGlobal = useCallback((msg, onClick = () => {}) =>{
  setMensajeGlobal(msg);
  setOnClickGlobal(() => onClick);
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
