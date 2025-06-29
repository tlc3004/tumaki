import { useEffect, useRef, useState } from "react";
import rollitoImg from "../image/rollito_animado.png";
import '../styles/RollitoAnimado.css'

function RollitoAnimado({ activo }) {
  const rollitoRef = useRef();
  const [fase, setFase] = useState("sale");

  useEffect(() => {
    if (activo) {
      setFase("entra");

      const saludarTimer = setTimeout(() => {
        setFase("saluda");
      }, 800);

      const salirTimer = setTimeout(() => {
        setFase("sale");
      }, 4900);

      return () => {
        clearTimeout(saludarTimer);
        clearTimeout(salirTimer);
      };
    } else {
      setFase("sale");
    }
  }, [activo]);

  return (
    <div className={`rollito_animado ${fase}`} ref={rollitoRef}>
      <img src={rollitoImg} alt="rollito_animado" style={{ width: "60px" }} />
      {fase === "saluda" && <span className="saludo">👋</span>}
    </div>
  );
}

export default RollitoAnimado;
