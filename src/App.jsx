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
import useLegalData from "./Hooks/useLegalData";
import { useAppData } from "./Hooks/useAppData";

export default function Home() {
  const [modalInfo, setModalInfo] = useState(null);
  const [pedidoBoleta, setPedidoBoleta] = useState([]);
  const [reservaBoleta, setReservaBoleta] = useState([]);
  const [mostrarToast, setMostrarToast] = useState(false);
  const [toastMensaje, setToastMensaje] = useState("");
  const [toastAction, setToastAction] = useState(null);
  const [mostrarLegal, setMostrarLegal] = useState(false);

  const { ToastGlobal, setToastGlobal } = useToastGlobal();
  const contenidoLegal = useLegalData("terminos");
  const apps = useAppData();

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
        content = (
          <Boleta
            pedido={pedidoBoleta}
            onToastGlobal={(msg) => setToastGlobal(msg, closeModal)}
          />
        );
        break;
      case "Boleta Reserva":
        content = (
          <BoletaReserva
            reserva={reservaBoleta}
            onToastGlobal={(msg) => setToastGlobal(msg, closeModal)}
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

      <ToastGlobal onClose={closeModal} />

      
      <div className="fixed top-1/2 -translate-y-1/2 left-2 flex flex-col gap-4 z-50">
        {apps.map((app, i) => (
          <a key={i} href={app.url} >
            <img
              src={app.logo}
              alt={app.nombre}
              className="logos w-10 h-10 hover:scale-110 transition-transform"
              title={app.nombre}
            />
          </a>
        ))}
      </div>


    {/* Footer fijo con botón legal */}
<div className="fixed bottom-0 w-full  text-center py-2  shadow-sm">
  <button
    onClick={() => setMostrarLegal(true)}
    className="text-sm text-blue-600 underline hover:text-blue-800 transition"
  >
    Términos y Condiciones
  </button>
</div>


      {/* ⬇️ Modal legal */}
      {mostrarLegal && (
        <Modal
          title="Términos y Condiciones"
          content={
            <div className="max-h-[400px] whitespace-pre-wrap px-2 text-left text-gray-800">
              {contenidoLegal || "Cargando..."}
            </div>
          }
          onClose={() => setMostrarLegal(false)}
        />
      )}
    </>
  );
}
