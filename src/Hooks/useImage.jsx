import { useEffect, useState } from "react";
import "../styles/Pedidos.css";
import "../styles/Modal.css";

export function useImage(){
    const[productos, setProductos]= useState([]);
    const[productoActivo, setProductoActivo]=useState(null);

    useEffect(()=>{
        const cargarDatos=async()=>{
            try{
                const response=await fetch("/data/pedidos.json");
                if(!response.ok)throw new Error("Error al caragr datos");
                const data=await response.json();

                const formateados= data.map((item) =>({
                    ...item,
                    precio: parseFloat(item.precio),
                    imagen: `/images/${item.imagen}`,
                }));

                setProductos(formateados);
                }catch(error){
                    console.error("Error", error);
                }
        };
        cargarDatos();
    },[]);

    const abrirModal = (producto) =>{
        setProductoActivo(producto);
    };

    const cerrarModal=()=>{
        setProductoActivo(null);
    };

    return(
        <>
        <div className="contenedor-pedidos solo-imagenes">
            {productos.map((item) =>(
                <div
                key={item.id}
                className="card-pedido solo-hover"
                onClick={() =>abrirModal(item)}
                >
                    <div className="image-container">
                        <img
                        src={item.imagen}
                        alt={item.nombre}
                        className="product-image"
                        loading="lazy"
                        />
                        <div className="image-overlay">
                            <span className="image-title">{item.nombre}</span>
                        </div>
                    </div>
                    </div>
                ))}
            </div>

                {productoActivo &&(
                    <div className="modal-overlay" onClick={cerrarModal}>
                        <div className="modal" onClick={(e) => e.stopPropagation()}>
                            <img
                            src={productoActivo.imagen}
                            alt={productoActivo.nombre}
                            className="modal-image"/>
                               <h3>{productoActivo.nombre}</h3>
                                 <p>{productoActivo.descripcion}</p>
                                 <p><strong>Precio:</strong> S/ {productoActivo.precio.toFixed(2)}</p>
                                 <button className="close-btn" onClick={cerrarModal}>x</button>
                        </div>
                    </div>
                )}
                </>
    );






};

