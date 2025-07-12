import { useEffect, useState } from "react";
// import { useImageModal } from "../Hooks/useImageModal";
import "../styles/Carta.css";

function Carta() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // const { setImage, ImageModal } = useImageModal();

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
          descripcion: `${item.descripcion}`
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

  return (
    <div className="carta-container">
      <h3>Nuestros Rolls Destacados 🍣</h3>

      {loading && <p>Cargando rolls...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="carta-grid">
        {pedidos.map((roll) => (
          <div key={roll.id} className="roll-card">
            <img
              src={roll.imagen}
              alt={roll.nombre}
              descripcion={roll.descripcion}
              className="img-roll"
              // onClick={() => setImage(roll.imagen, roll.descripcion)}
            />
            <p>{roll.nombre}</p>
            <p>{roll.descripcion}</p>
            
          </div>
        ))}
      </div>

      {/* <ImageModal /> */}
    </div>
  );
}

export default Carta;
