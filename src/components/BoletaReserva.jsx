import { generarBoletaReserva } from "../service/getBoletaReserva";
import "../styles/Boleta.css";

function BoletaReserva({ reserva, onToastGlobal }) {
  // Por si no hay reserva
  if (!reserva) {
    return (
      <div className="boleta-vacia">
        <div>📅</div>
        <h3>No hay reserva para mostrar</h3>
        <p>Realiza una reserva desde nuestro formulario</p>
      </div>
    );
  }

  const boletaReserva = generarBoletaReserva(reserva);

  // Por si hay error al generar la boleta
  if (!boletaReserva) {
    return (
      <div className="boleta-error">
        <p className="boleta-error-text">Error al generar el comprobante</p>
      </div>
    );
  }

  const handleCancelarReserva = () => {
    onToastGlobal?.(`¿Seguro que deseas cancelar la reserva ?${boletaReserva.id}?`);
  };

  const handleDescargarComprobante = () => {
    console.log("Descargando comprobante:", boletaReserva);
    onToastGlobal?.("Comprobante Descargado Con Exito 📨 Lo Esperamos 🍣");
  };

  return (
    <div className="boleta-container">
      <div className="boleta-header">
        <h3 className="boleta-title">TUMAKI</h3>
        <p className="boleta-subtitle">Sushi-Bar Nikkei</p>
        <p className="boleta-info">Av. Principal 123, Centro Comercial Plaza</p>
        <p className="boleta-info">Reservas: +51 987 654 321</p>

        <div className="boleta-meta">
          <span>
            <strong>Reserva:</strong> {boletaReserva.id}
          </span>
          <span>
            <strong>Fecha:</strong> {boletaReserva.fechaReserva}
          </span>
        </div>
      </div>

      <div className="boleta-details">
        <h4>Detalle de la Reserva</h4>

        <div className="reserva-info-grid">
          <div className="reserva-info-row">
            <span>Nombre: </span>
            <span>{boletaReserva.nombre}</span>
          </div>
          <div className="reserva-info-row">
            <span>Contacto: </span>
            <span>{boletaReserva.telefono}</span>
          </div>
          <div className="reserva-info-row">
            <span>Email: </span>
            <span>{boletaReserva.email}</span>
          </div>
          <div className="reserva-info-row">
            <span>Fecha: </span>
            <span>{boletaReserva.fecha}</span>
          </div>
          <div className="reserva-info-row">
            <span>Hora: </span>
            <span>{boletaReserva.hora}</span>
          </div>
          <div className="reserva-info-row">
            <span>Personas: </span>
            <span>{boletaReserva.personas}</span>
          </div>
          {boletaReserva.comentarios && (
            <div className="reserva-info-row">
              <span>Comentarios: </span>
              <span>{boletaReserva.comentarios}</span>
            </div>
          )}
        </div>
      </div>

      <div className="boleta-totals">
        <div className="boleta-total">
          <span>Estado:</span>
          <span className="reserva-status">Confirmada</span>
        </div>
      </div>

      <div className="boleta-actions">
        <button
          onClick={handleDescargarComprobante}
          className="boleta-btn boleta-btn-secondary"
        >
          📤 Descargar comprobante
        </button>

        <button
          onClick={handleCancelarReserva}
          className="boleta-btn boleta-btn-cancel"
        >
          ✖ Cancelar
        </button>
      </div>

      <div className="boleta-footer">
        <p className="boleta-thanks">¡Gracias por tu reserva! 🍣</p>
        <p className="boleta-time">
          Por favor, presenta este comprobante al llegar al restaurante
        </p>
      </div>
    </div>
  );
}

export default BoletaReserva;