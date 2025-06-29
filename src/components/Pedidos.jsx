import { useState, useEffect } from "react";
import "../styles/Pedidos.css";

function Pedidos({ onBoletaPedido }) {
  // Estados
  const [imageErrors, setImageErrors] = useState({});
  const [pedido, setPedido] = useState([]);
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
 

  // Carga de productos
  useEffect(() => {
    const cargarProductos = async () => {
      try {
        setLoading(true); 
        const response = await fetch("/data/pedidos.json");
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const data = await response.json();
        
        const productosFormateados = data.map((item) => ({
          ...item,  
          precio: parseFloat(item.precio),
          imagen: `/images/${item.imagen}`,
        }));
        
        setProductos(productosFormateados);
      } catch (err) {
        setError("No se pudieron cargar los productos."); 
        console.error("Error al cargar productos:", err);
      } finally {
        setLoading(false);
      }
    };

    cargarProductos();
  }, []);

  // Handlers
  const handleImageError = (id) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  const agregarPedido = (item) => {
    setPedido((prevPedido) => {
      const existe = prevPedido.find((p) => p.id === item.id);
      return existe
        ? prevPedido.map((p) =>
            p.id === item.id ? { ...p, cantidad: p.cantidad + 1 } : p
          )
        : [...prevPedido, { ...item, cantidad: 1 }];
    });
  };

  const quitarDelPedido = (id) => {
    setPedido((prevPedido) =>
      prevPedido
        .map((p) =>
          p.id === id ? { ...p, cantidad: p.cantidad - 1 } : p
        )
        .filter((p) => p.cantidad > 0) 
    );
  };

  const eliminarDelPedido = (id) => {
    setPedido((prevPedido) => prevPedido.filter((p) => p.id !== id));
  };

  const finalizarPedido = () => {
    if (pedido.length === 0) {
      alert("No hay productos en el pedido");
      return;
    }
    onBoletaPedido(pedido);
    setPedido([]);
    setMostrarCarrito(false);
  };

  // Cálculos
  const totalPedido = pedido.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
  const totalItems = pedido.reduce((sum, item) => sum + item.cantidad, 0);

  // Estados de carga y error
  if (loading) {
    return (
      <div className="galeria-pedidos">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando menú...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="galeria-pedidos">
        <div className="loading-container">
          <div className="error-container">
            <h3 className="error-title">Error</h3>
            <p>{error}</p>
            <button className="retry-button" onClick={() => window.location.reload()}>
              Reintentar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="galeria-pedidos" >
      <h3>Nuestros Rolls Especiales</h3>
      <p className="galeria-description">
        Cada roll es preparado al momento con ingredientes frescos de la más alta calidad.
      </p>

      <div className="contenedor-pedidos" >
        {productos.map((item) => (
          <div key={item.id} className="card-pedido">
            <div className="image-container">
              <img
                src={imageErrors[item.id] ? "/placeholder.svg?height=200&width=280&text=Imagen+no+disponible" : item.imagen}
                alt={item.nombre}
                onError={() => handleImageError(item.id)} 
                loading="lazy" 
                className="product-image"
              />
              <div className="image-overlay" onClick={() => agregarPedido(item)}>
                <button className="overlay-add-button">+</button>
              </div>
            </div>
            <div className="card-content">
              <h4>{item.nombre}</h4>
              <p className="precio">S/ {item.precio.toFixed(2)}</p>
              <p className="descripcion">{item.descripcion}</p>
              <button className="add-to-cart-button" onClick={() => agregarPedido(item)}>
                Agregar al pedido
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        className="floating-cart-button"
        onClick={() => setMostrarCarrito(true)}
        title="Abrir carrito"
      >
        🛒
        {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
      </button>

      <div className={`sidebar-carrito ${mostrarCarrito ? "activo" : ""}`}>
        <div className="sidebar-header">
          <h4>Tu Pedido ({totalItems} items)</h4>
          <button onClick={() => setMostrarCarrito(false)}>✕</button>
        </div>

        <div className="sidebar-content">
          {pedido.length === 0 ? (
            <p className="carrito-empty">No hay productos en el pedido</p>
          ) : (
            pedido.map((item) => (
              <div key={item.id} className="carrito-item">
                <img
                  src={imageErrors[item.id] ? "/placeholder.svg?height=50&width=50&text=NA" : item.imagen}
                  alt={item.nombre}
                  className="carrito-item-image"
                />
                <div className="carrito-item-info">
                  <h5>{item.nombre}</h5>
                  <p className="carrito-item-price">S/ {item.precio.toFixed(2)}</p>
                </div>
                <div className="carrito-item-controls">
                  <button className="quantity-button" onClick={() => quitarDelPedido(item.id)}>-</button>
                  <span className="quantity-display">{item.cantidad}</span>
                  <button className="quantity-button" onClick={() => agregarPedido(item)}>+</button>
                  <button className="remove-item-button" onClick={() => eliminarDelPedido(item.id)}>×</button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="sidebar-footer">
          <div className="carrito-total">
            <span>Total:</span>
            <span>S/ {totalPedido.toFixed(2)}</span>
          </div>
          <button 
            className="finalize-order-button" 
            onClick={finalizarPedido} 
            disabled={pedido.length === 0}
          >
            Finalizar Pedido
          </button>
        </div>
      </div>

    </div>
  );
}

export default Pedidos;