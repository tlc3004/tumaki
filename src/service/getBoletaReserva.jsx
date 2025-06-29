
export function generarBoletaReserva(reserva) {
  if (!reserva) return null;

  const fechaActual = new Date();
  

  const opcionesFecha = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  
  const opcionesFechaHora = {
    ...opcionesFecha,
    hour: '2-digit',
    minute: '2-digit'
  };

  return {
    id: reserva.id,
    nombre: reserva.nombre,
    telefono: reserva.telefono,
    email: reserva.email,
    fecha: new Date(reserva.fecha).toLocaleDateString('es-ES', opcionesFecha),
    fechaReserva: fechaActual.toLocaleDateString('es-ES', opcionesFechaHora),
    hora: reserva.hora,
    personas: `${reserva.personas} ${reserva.personas === "1" ? "persona" : "personas"}`,
    comentarios: reserva.comentarios || "Ninguno"
  };
}   