import { useEffect, useState } from "react";
import { useImageSlider } from "../Hooks/useImageSlider";
import "../styles/Carta.css";

function Carta() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const cargarPedidos = async () => {
      try {
        setLoading(true);
        const response = await fetch("/data/pedidos.json");
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const data = await response.json();

        const pedidosFormateados = data.map((item) => ({
          ...item,
          imagen: `/images/${item.imagen}`,
          descripcion: item.descripcion,
          nombre: item.nombre,
        }));

        setPedidos(pedidosFormateados);
      } catch (err) {
        console.error("Error al cargar pedidos:", err);
        setError("No se pudieron cargar los rolls");
      } finally {
        setLoading(false);
      }
    };

    cargarPedidos();
  }, []);

  const { rollActual, siguiente, anterior } = useImageSlider(pedidos);

  return (
    <div className="carta-container">
      <h3>Nuestros Rolls Destacados 🍣</h3>

      {loading && <p>Cargando rolls...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Mostrar solo el slider con 1 roll a la vez */}
      {rollActual && (
        <div className="slider-contenedor">
          <img src={rollActual.imagen} alt={rollActual.nombre} className="slider-img" />
          <div className="slider-info">
            <h4>{rollActual.nombre}</h4>
            <p>{rollActual.descripcion}</p>
          </div>
          <div className="slider-botones">
            <button className="btn-carta" onClick={anterior}>⬅️</button>
            <button className="btn-carta" onClick={siguiente}>➡️</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Carta;
