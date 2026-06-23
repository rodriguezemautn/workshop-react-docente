import { useCarrito } from '../context/CarritoContext'

function formatearPrecio(precio) {
  return precio.toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
  })
}

function Carrito() {
  const { items, total, cantidadTotal, quitarDelCarrito, limpiarCarrito } = useCarrito()

  return (
    <section className="carrito">
      <h2 className="carrito__titulo">
        Carrito {cantidadTotal > 0 && `(${cantidadTotal} items)`}
      </h2>

      {items.length === 0 ? (
        <p className="carrito__vacio">Carrito vacío</p>
      ) : (
        <>
          <ul className="carrito__lista">
            {items.map(item => (
              <li key={item.id} className="carrito__item">
                <div className="carrito__item-info">
                  <span className="carrito__item-nombre">{item.nombre}</span>
                  <span className="carrito__item-cantidad">
                    {item.cantidad} × {formatearPrecio(item.precio)}
                  </span>
                </div>

                <div className="carrito__item-acciones">
                  <span className="carrito__item-subtotal">
                    {formatearPrecio(item.precio * item.cantidad)}
                  </span>
                  <button
                    className="carrito__btn-quitar"
                    onClick={() => quitarDelCarrito(item.id)}
                    title="Quitar uno"
                  >
                    −
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="carrito__footer">
            <p className="carrito__total">
              Total: <strong>{formatearPrecio(total)}</strong>
            </p>
            <button className="carrito__btn-limpiar" onClick={limpiarCarrito}>
              Vaciar carrito
            </button>
          </div>
        </>
      )}
    </section>
  )
}

export default Carrito
