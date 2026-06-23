import { useEffect } from 'react'

/*
 * Toast — notificación temporal para feedback visual.
 *
 * Recibe un mensaje y se auto-destruye después de 2 segundos.
 * El padre controla cuándo mostrar el toast seteando el mensaje,
 * y este componente notifica al padre cuando debe ocultarse.
 */
function Toast({ mensaje, onCerrar }) {
  useEffect(() => {
    if (!mensaje) return

    const timer = setTimeout(onCerrar, 2000)
    return () => clearTimeout(timer)
  }, [mensaje, onCerrar])

  if (!mensaje) return null

  return (
    <div className="toast toast--visible">
      {mensaje}
    </div>
  )
}

export default Toast
