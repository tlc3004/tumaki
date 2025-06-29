/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react"
import "../styles/Toast.css" 


function Toast({ mensaje, onClick, onClose }) {
  // Aqui el estado para controlar la visibilidad del toast (para animaciones de entrada/salida)
  const [isVisible, setIsVisible] = useState(true)

  // Aqui el estado para manejar la barra de progreso visual
  const [progress, setProgress] = useState(100)

  // Aqui el efecto que maneja el cierre automático del toast después de 5 segundos
  useEffect(() => {
    // Timer principal: cierra el toast automáticamente en 5s
    const timer = setTimeout(() => {
      handleClose()
    }, 5000)

 
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) return 0
        return prev - 2 // Le resto 2 unidades cada 100ms (por eso dura aprox 5s)
      })
    }, 100)

    // Limpiamos ambos timers 
    return () => {
      clearTimeout(timer)
      clearInterval(progressInterval)
    }
  }, [])

  // Aqui la función que cierra el toast manualmente (cuando el usuario da clic en cerrar)
  const handleClose = (e) => {
    if (e) e.stopPropagation() // Para que el clic no propague a otros elementos
    setIsVisible(false) // Ocultamos el toast 
    setTimeout(() => {
      onClose() // Ejecutamos la función que nos pasaron al cerrarse definitivamente
    }, 300) // Dejamos 300ms para la animación de salida
  }

  return (
    <div className={`toast ${isVisible ? "toast-visible" : "toast-hidden"}`} onClick={onClick}>
      {/* Aqui el header del toast con icono, titulo y boton de cerrar */}
      <div className="toast-header">
        <div className="toast-brand">
          <div className="toast-icon">🍣</div>
          <div>
            <h4 className="toast-title">TUMAKI</h4>
            <p className="toast-subtitle">Notificación</p>
          </div>
        </div>
        <button onClick={handleClose} className="toast-close">
          
        </button>
      </div>

      {/* Aqui el cuerpo del toast, con el mensaje que recibimos por props */}
      <div className="toast-body">
        <p className="toast-message">{mensaje}</p>
        <div className="toast-action">
          <span>Haz Click </span>
        </div>
      </div>
     
      {/* Aqui la barra de progreso que se va reduciendo visualmente */}
      <div className="toast-progress">
        <div className="toast-progress-bar" style={{ width: `${progress}%` }} />
      </div>
    </div>
  )
}

export default Toast;
