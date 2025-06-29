
//Solo me quede con getBoleta en service, lo demas lo puse aqui en componente, aqui esta lalogica tmb
import { generarBoleta } from "../service/getBoleta" //aqui traemos los calculos de la boleta
import "../styles/Boleta.css"

function Boleta({ pedido, onToastGlobal }) {
  //Por si no hay pedido
  if (!pedido || pedido.length === 0) {
    return (
      <div className="boleta-vacia">
        <div>🛒</div>
        <h3>No hay pedido para mostrar</h3>
        <p>Agrega algunos productos desde nuestro menú</p>
      </div>
    )
  }

  const boleta = generarBoleta(pedido)
//POr si no hay boleta
  if (!boleta) {
    return (
      <div className="boleta-error">
        <p className="boleta-error-text">Error al generar la boleta</p>
      </div>
    )
  }
//MDes pues de porcesar el pago, aun no hay funciones, solo alerta
  const handleProcederPago = () => {
    onToastGlobal?.(`Recibo por S/ ${boleta.total.toFixed(2)} Gracias por su Compra`)
    
  }
//Esto es por si añadimos la descarga de la boleta
  const handleDescargarBoleta = () => {
    console.log("Descargando boleta:", boleta)
    onToastGlobal?.("¿ Seguro deseas Cancelar su Pedido?")
  }

  return (

    //mostramos la boleta, la logica de suma depedidos y calculo, esta en getboleta
    <div className="boleta-container">
      <div className="boleta-header">
        <h3 className="boleta-title">TUMAKI</h3>
        <p className="boleta-subtitle">Sushi-Bar Nikkei</p>
        <p className="boleta-info">Av. Principal 123, Centro Comercial Plaza</p>
        <p className="boleta-info">RUC: 20123456789</p>

        <div className="boleta-meta">
          <span>
            <strong>Boleta:</strong> {boleta.id}
          </span>
          <span>
            <strong>Fecha:</strong> {boleta.fecha}
          </span>
        </div>
      </div>

      <div className="boleta-details">
        <h4>Detalle del Pedido</h4>

        <table className="boleta-table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cant.</th>
              <th>Precio</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {boleta.items.map((item) => (
              <tr key={item.id}>
                <td>{item.nombre}</td>
                <td>{item.cantidad}</td>
                <td>S/ {item.precio.toFixed(2)}</td>
                <td>S/ {(item.cantidad * item.precio).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="boleta-totals">
        <div className="boleta-subtotal">
          <span>Subtotal:</span>
          <span>S/ {boleta.subtotal.toFixed(2)}</span>
        </div>
        <div className="boleta-tax">
          <span>IGV (18%):</span>
          <span>S/ {boleta.igv.toFixed(2)}</span>
        </div>
        <div className="boleta-total">
          <span>TOTAL:</span>
          <span>S/ {boleta.total.toFixed(2)}</span>
        </div>
      </div>

      <div className="boleta-actions">
        <button onClick={handleDescargarBoleta} className="boleta-btn boleta-btn-secondary">
          ❌  Cancelar Pedido
        </button>

        <button onClick={handleProcederPago} className="boleta-btn boleta-btn-primary">
          💳 Proceder al Pago
        </button>
      </div>

      <div className="boleta-footer">
        <p className="boleta-thanks">¡Gracias por su preferencia! 🍣</p>
        <p className="boleta-time">Su pedido estará listo en aproximadamente 20-25 minutos</p>
      </div>
    </div>
  )
}

export default Boleta
