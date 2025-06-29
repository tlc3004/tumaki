import "../styles/Informacion.css"

//Aqui solo añadi mas información, en diferentes secciones, para que se vea mas completo
//Los datos son aleatorios para que despues veamos co q rellenarlo o si no te gusta la idea, volver a lo simple
function Informacion() {
  return (
    <div className="informacion-container">
      <h3>Sobre TUMAKI</h3>
      {/* Añadi una seccion para la historia */}  
      <section className="historia">
        <h4>🍣 Nuestra Historia</h4>
        <p>
          Fundado en 2020, TUMAKI nace de la pasión por la fusión de la cocina japonesa tradicional con toques
          contemporáneos nikkei. Nuestro chef ejecutivo, con más de 15 años de experiencia en restaurantes de Tokio y
          Lima, ha creado un menú único que respeta la tradición mientras abraza la innovación culinaria.
        </p>
      </section>
     {/* Estaseccion para los horarios de atencion */}
      <section className="horarios">
        <h4>🕐 Horarios de Atención</h4>
        <ul>
          <li>
            <strong>Lunes a Jueves:</strong> 12:00 - 22:00
          </li>
          <li>
            <strong>Viernes y Sábado:</strong> 12:00 - 23:00
          </li>
          <li>
            <strong>Domingo:</strong> 12:00 - 21:00
          </li>
          <li>
            <em>Última orden 30 minutos antes del cierre</em>
          </li>
        </ul>
      </section>
      {/* Seccion para ubicacion y contacto*/}
      <section className="ubicacion">
        <h4>📍 Ubicación y Contacto</h4>
        <p>
          <strong>Dirección:</strong>
          <br />
          Av. Principal 123, Centro Comercial Plaza
          <br />
          Distrito Gourmet, Piso 2<br />
          <br />
          <strong>Teléfono:</strong> (123) 456-7890
          <br />
          <strong>WhatsApp:</strong> +1 (555) 123-SUSHI
          <br />
          <strong>Email:</strong> reservas@tumaki.com
        </p>
      </section>
      {/* Seccion para especialidades  */}
      <section className="especialidades">
        <h4>⭐ Nuestras Especialidades</h4>
        <ul>
          <li>
            <strong>Rolls Especiales TUMAKI</strong> - Creaciones únicas del chef
          </li>
          <li>
            <strong>Sashimi Premium</strong> - Pescado fresco importado diariamente
          </li>
          <li>
            <strong>Nigiris de Autor</strong> - Técnica tradicional con toque moderno
          </li>
          <li>
            <strong>Platos Calientes Nikkei</strong> - Fusión japonesa-peruana
          </li>
          <li>
            <strong>Sake Premium</strong> - Selección exclusiva de sakes artesanales
          </li>
        </ul>
      </section>
      {/* Por ultimo seccion para certificaciones o incluso de otro tema, me comentas igual */}
      <section className="certificaciones">
        <h4>🏆 Certificaciones y Reconocimientos</h4>
        <ul>
          <li>Certificación de Calidad Alimentaria ISO 22000</li>
          <li>Mejor Restaurante Nikkei 2023 - Guía Gastronómica</li>
          <li>Chef Certificado por la Asociación Culinaria Japonesa</li>
          <li>Ingredientes 100% Frescos - Certificación Orgánica</li>
        </ul>
      </section>
    </div>
  )
}

export default Informacion
