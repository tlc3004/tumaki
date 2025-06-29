
//aqui conseguimos todos los datos de la boleta, y obviamente lo retornamos

  export function generarBoleta(pedido) {
    if (!pedido || pedido.length === 0) {
      return null
    }

    const subtotal = pedido.reduce((sum, item) => sum + item.cantidad * item.precio, 0)
    const igv = subtotal * 0.18
    const total = subtotal + igv

    return {
      id: `BOLE-${Date.now()}`,
      fecha: new Date().toLocaleDateString(),
      hora: new Date().toLocaleTimeString(),
      items: pedido,
      subtotal: subtotal,
      igv: igv,
      total: total,
      estado: "generada",
    }
  }


