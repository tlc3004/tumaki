
//Aqui es donde hice mas cambios, queria crear un formulario mas completo y q se me sale de las manos
//Tratare de comentar lo mas rapido posible

import { useState, useEffect } from "react";
import "../styles/Reservas.css"; 
import salon from "../image/salon.png";
import slider from "../image/slider.png";
import salon1 from "../image/salon_1.png";
import slider1 from "../image/slider_1.png";
import salon2 from "../image/salon_2.png";
import slider2 from "../image/slider_2.png";
import salon3 from "../image/salon_3.png";
import slider3 from "../image/slider_3.png";
import salon4 from "../image/salon_4.png";
import slider4 from "../image/slider_4.png";
import salon5 from "../image/salon_5.png";
import slider5 from "../image/slider_5.png";
import salon6 from "../image/salon_6.png";
import slider6 from "../image/slider_6.png";



const reproducirSonido = () => {
  const audio = new Audio("sounds/chimes-sound-effects-hq-325255.mp3");
  audio.play().catch((e) => console.warn("Error al reproducir sonido:", e));
};


import { useSlider } from "../Hooks/useSlider";

function Reservas({onReservaConfirmada}) {

  useEffect(() => {
    reproducirSonido();
  },[]);

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    fecha: "",
    hora: "",
    personas: "2",
    comentarios: "",
  });

  // Aqui el estado para manejar el envío del formulario
  const [isSubmitting, setIsSubmitting] = useState(false);

 

  // Aqui manejamos el cambio de cualquier campo del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Aqui se maneja el envío pero no el cambio del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Esta es una pequeña simulacion para el envio del formulario, si el proyecto crece, lo cambiamos por una API real
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Datos de reserva:", formData);

    // Generamos un código de reserva aleatorio simple, esto podriamos mejorarlo, para q sea ordenado, no aleatorio
    const reserva = {
      ...formData,
      id: "RES-" + Math.floor(Math.random() * 5000),
    };

    console.log("Datos de reserva:", reserva);

    if (onReservaConfirmada) {
      onReservaConfirmada(reserva);
    }

    setIsSubmitting(false);
  };

  // Aqui reseteamos el formulario despues del envio, lo limpiamos
  

  // Puse una fecha mínima para el selector de fecha basandonnos en la fecha actual
  const today = new Date().toISOString().split("T")[0];

  const imagenes = [
      
     salon,
     slider,
     salon1,
     slider1,
     salon2,
     slider2,
     salon3,
     slider3,
     salon4,
     slider4,
     salon5,
     slider5,
     salon6,
     slider6,
    ];

   const {imagenActual, animacion} = useSlider(imagenes, 5000);


   
  return (
    <div className="reservas-container">
      <h3>Reserva tu Mesa</h3>


     
        

      <div className="reserva-image-container">
       <img
          src={imagenActual}
          alt=""
          className={animacion}
          style={{
            width: "95%",        
            height: "400px",
            objectFit: "cover",
            borderRadius: "8px",
            transition: "opacity 0.5s ease-in-out"
          }}
        />
        {/* Un parrafito para rellenar más, con sus estilos correspondientes */}
        <p className="reserva-image-description">
          Disfruta de una experiencia única en nuestro acogedor ambiente japonés
        </p>
      </div>

      {/* Y aqui ya esta el formulario completo, y me di la molestia de ponerlo con validaciones basicas ya */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre completo *</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            placeholder="Ingresa tu nombre completo"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Correo electrónico *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="tu@email.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="telefono">Teléfono *</label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            required
            placeholder="+1 (555) 123-4567"
          />
        </div>

        {/* Aqui la fecha y hora con layout en dos columnas */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="fecha">Fecha *</label>
            <input
              type="date"
              id="fecha"
              name="fecha"
              value={formData.fecha}
              onChange={handleChange}
              required
              min={today}
            />
          </div>

          <div className="form-group">
            <label htmlFor="hora">Hora *</label>
            <select id="hora" name="hora" value={formData.hora} onChange={handleChange} required>
              <option value="">Selecciona una hora</option>
              <option value="12:00">12:00 PM</option>
              <option value="12:30">12:30 PM</option>
              <option value="13:00">1:00 PM</option>
              <option value="13:30">1:30 PM</option>
              <option value="14:00">2:00 PM</option>
              <option value="18:00">6:00 PM</option>
              <option value="18:30">6:30 PM</option>
              <option value="19:00">7:00 PM</option>
              <option value="19:30">7:30 PM</option>
              <option value="20:00">8:00 PM</option>
              <option value="20:30">8:30 PM</option>
              <option value="21:00">9:00 PM</option>
            </select>
          </div>
        </div>

        {/* Aqui para las personas */}
        <div className="form-group">
          <label htmlFor="personas">Número de personas *</label>
          <select
            id="personas"
            name="personas"
            value={formData.personas}
            onChange={handleChange}
            required
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <option key={num} value={num}>
                {num} {num === 1 ? "persona" : "personas"}
              </option>
            ))}
          </select>
        </div>

        {/* Comentarios adicionales */}
        <div className="form-group">
          <label htmlFor="comentarios">Comentarios adicionales</label>
          <textarea
            id="comentarios"
            name="comentarios"
            value={formData.comentarios}
            onChange={handleChange}
            placeholder="Especificaciones especiales, alergias, celebraciones, etc."
            rows={4}
          ></textarea>
        </div>

        {/* Aqui el boton en estado de Procesando, para mayor dinamismo */}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Procesando..." : "Confirmar Reserva"}
        </button>
      </form>

    </div>
  );
}

export default Reservas;
