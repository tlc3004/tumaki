import { useState } from "react";
import Header from "./components/Header";
import Modal from "./components/Modal";
import Carta from "./components/Carta";
import Pedidos from "./components/Pedidos";
import Reservas from "./components/Reservas";
import Informacion from "./components/Informacion";
import Boleta from "./components/Boleta";
import BoletaReserva from "./components/BoletaReserva";
import Toast from "./components/Toast";
import RollitoAnimado from "./components/RollitoAnimado";
import { useToastGlobal } from "./Hooks/useToastGlobal"; 

export default function Home() {
  const [modalInfo, setModalInfo] = useState(null);
  const [pedidoBoleta, setPedidoBoleta] = useState([]);
  const [reservaBoleta, setReservaBoleta] = useState([]);
  const [mostrarToast, setMostrarToast] = useState(false);
  const [toastMensaje, setToastMensaje] = useState("");
  const [toastAction, setToastAction] = useState(null);

  // ✅ Aquí es la única vez que se llama
  const { ToastGlobal, setToastGlobal } = useToastGlobal();

  const openModal = (section) => {
    const title = section;
    let content;

    switch (section) {
      case "Carta":
        content = <Carta />;
        break;
      case "Pedidos":
        content = <Pedidos onBoletaPedido={handleBoletaPedido} />;
        break;
      case "Reservas":
        content = <Reservas onReservaConfirmada={handleReservaConfirmada} />;
        break;
      case "Boleta":
        content = <Boleta pedido={pedidoBoleta} onToastGlobal={(msg) =>setToastGlobal(msg, closeModal)} />;
        break;
      case "Boleta Reserva":
        content = (
          <BoletaReserva
            reserva={reservaBoleta}
            onToastGlobal={ (msg)=>setToastGlobal(msg, closeModal)} 
          />
        );
        break;
      case "Informacion":
        content = <Informacion />;
        break;
      default:
        content = null;
    }

    setModalInfo({ title, content });
  };

  const closeModal = () => setModalInfo(null);

  const handleBoletaPedido = (pedido) => {
    setPedidoBoleta(pedido);
    closeModal();
    setToastMensaje("🍣 ¡Su pedido está listo!");
    setToastAction("pedido");
    setMostrarToast(true);
  };

  const handleReservaConfirmada = (reserva) => {
    setReservaBoleta(reserva);
    closeModal();
    setToastMensaje("📅 ¡Reserva confirmada!");
    setToastAction("reserva");
    setMostrarToast(true);
  };

  const handleToastClick = () => {
    setMostrarToast(false);
    if (toastAction === "pedido") {
      openModal("Boleta");
    } else if (toastAction === "reserva") {
      openModal("Boleta Reserva");
    }
  };

  return (
    <>
      <Header openModal={openModal} />

      {modalInfo && (
        <Modal
          title={modalInfo.title}
          content={modalInfo.content}
          onClose={closeModal}
        />
      )}

      {/* Toast LOCAL con Rollito */}
      {mostrarToast && (
        <>
          <Toast
            mensaje={toastMensaje}
            onClick={handleToastClick}
            onClose={() => setMostrarToast(false)}
          />
          <RollitoAnimado activo={mostrarToast} mensaje={toastMensaje} />
        </>
      )}

      {/* Solo para cosas como la descarga */}
      <ToastGlobal onClose={closeModal} />
    </>
  );
}
