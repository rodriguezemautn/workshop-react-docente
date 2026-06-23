import { useCarrito } from '../context/CarritoContext'

/*
 * Array de productos mockeados — simula una base de datos.
 *
 * En una app real, estos datos vendrían de una API. Pero para
 * practicar Context, tenerlos hardcodeados en un componente
 * nos permite concentrarnos en la lógica del carrito.
 */
const PRODUCTOS = [
  { id: 1, nombre: 'Notebook', precio: 850000 },
  { id: 2, nombre: 'Mouse', precio: 15000 },
  { id: 3, nombre: 'Teclado', precio: 45000 },
  { id: 4, nombre: 'Monitor 27"', precio: 320000 },
  { id: 5, nombre: 'Auriculares', precio: 28000 },
  { id: 6, nombre: 'Webcam HD', precio: 35000 },
]

/*
 * Formatea un número a pesos argentinos.
 *
 * toLocaleString('es-AR') ya le pone los puntos de miles
 * y el signo $ automáticamente. No reinventemos la rueda.
 */
function formatearPrecio(precio) {
  return precio.toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
  })
}

function Productos() {
  const { agregarAlCarrito } = useCarrito()

  return (
    <section className="productos">
      <h2 className="productos__titulo">Productos</h2>

      <div className="productos__grid">
        {PRODUCTOS.map(producto => (
          <article key={producto.id} className="producto">
            <h3 className="producto__nombre">{producto.nombre}</h3>
            <p className="producto__precio">{formatearPrecio(producto.precio)}</p>
            <button
              className="producto__btn"
              onClick={() => agregarAlCarrito(producto)}
            >
              Agregar al carrito
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Productos
