/* =========================================================
   Tienda — Demo de catálogo + carrito con Context
   Módulo 05: Contexto Global (useContext)
   =========================================================

   📖 ¿Qué es este componente?
   ────────────────────────────
   Simula una tienda con productos que se pueden agregar al
   carrito. Usa useCarrito() para acceder al estado global
   del carrito y al carrito en sí.
   
   Este componente DEMUESTRA cómo dos partes separadas de
   la UI (catálogo y carrito) pueden compartir estado sin
   prop drilling gracias a Context.
   
   ┌─────────────────────────────────────────────────┐
   │  Header (badge carrito)  ←── useContext          │
   ├─────────────────────────────────────────────────┤
   │  Tienda:                                         │
   │  ┌─────────┐ ┌─────────┐ ┌─────────┐           │
   │  │ Prod 1  │ │ Prod 2  │ │ Prod 3  │ ←── useCarrito│
   │  │ [+ carr]│ │ [+ carr]│ │ [+ carr]│           │
   │  └─────────┘ └─────────┘ └─────────┘           │
   ├─────────────────────────────────────────────────┤
   │  Carrito (useCarrito)                            │
   │  - Item 1 x 2  $100   [-] [+] [✕]              │
   │  - Item 2 x 1  $50    [-] [+] [✕]              │
   │  Total: $150                                     │
   └─────────────────────────────────────────────────┘
   
   Header y Tienda/Carrito NO son padre-hijo directos.
   Gracias a Context, comparten el mismo estado sin props.
   ========================================================= */

import { useCarrito } from '../context/CarritoContext'

/* 
  Catálogo de productos mockeados.
  En una app real, estos vendrían de una API (Módulo 07).
*/
const PRODUCTOS = [
  { id: 1, nombre: 'Notebook', precio: 850000 },
  { id: 2, nombre: 'Mouse', precio: 15000 },
  { id: 3, nombre: 'Teclado', precio: 35000 },
  { id: 4, nombre: 'Monitor', precio: 220000 },
  { id: 5, nombre: 'Auriculares', precio: 45000 },
]

function Tienda() {
  /* 
    Extraemos solo lo que necesitamos del contexto.
    agregarAlCarrito es la única función que usa este componente.
    El carrito en sí lo usa el componente CarritoView más abajo.
  */
  const { agregarAlCarrito } = useCarrito()

  return (
    <section className="tienda">
      <h3 className="tienda__titulo">🛍️ Productos</h3>
      <div className="tienda__grid">
        {PRODUCTOS.map((producto) => (
          <article key={producto.id} className="tienda__producto">
            <div className="tienda__producto-emoji">
              {producto.id === 1 && '💻'}
              {producto.id === 2 && '🖱️'}
              {producto.id === 3 && '⌨️'}
              {producto.id === 4 && '🖥️'}
              {producto.id === 5 && '🎧'}
            </div>
            <h4 className="tienda__producto-nombre">{producto.nombre}</h4>
            <p className="tienda__producto-precio">
              $ {producto.precio.toLocaleString('es-AR')}
            </p>
            <button
              onClick={() => agregarAlCarrito(producto)}
              className="tienda__btn-agregar"
            >
              + Agregar al carrito
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}

function CarritoView() {
  /* 
    Mismo contexto, componentes diferentes.
    CarritoView extrae items, totales y funciones de modificación.
  */
  const {
    items,
    totalItems,
    totalPrecio,
    quitarDelCarrito,
    cambiarCantidad,
    limpiarCarrito,
  } = useCarrito()

  /* 
    Si el carrito está vacío, mostramos un mensaje amigable.
  */
  if (items.length === 0) {
    return (
      <section className="carrito-vista">
        <h3 className="carrito-vista__titulo">🛒 Tu Carrito</h3>
        <p className="carrito-vista__vacio">
          El carrito está vacío. Agregá productos desde la tienda.
        </p>
      </section>
    )
  }

  return (
    <section className="carrito-vista">
      <div className="carrito-vista__header">
        <h3 className="carrito-vista__titulo">🛒 Tu Carrito</h3>
        <button
          onClick={limpiarCarrito}
          className="carrito-vista__btn-limpiar"
        >
          🗑️ Vaciar carrito
        </button>
      </div>

      <ul className="carrito-vista__lista">
        {items.map((item) => (
          <li key={item.id} className="carrito-vista__item">
            <div className="carrito-vista__item-info">
              <span className="carrito-vista__item-nombre">{item.nombre}</span>
              <span className="carrito-vista__item-precio-unit">
                $ {item.precio.toLocaleString('es-AR')} c/u
              </span>
            </div>

            <div className="carrito-vista__item-controles">
              {/*
                Botones para cambiar cantidad.
                cambiarCantidad(id, delta) maneja + y -.
                Delta = -1: disminuye; Delta = +1: aumenta.
              */}
              <button
                onClick={() => cambiarCantidad(item.id, -1)}
                className="carrito-vista__btn-cant"
                aria-label="Disminuir cantidad"
              >
                −
              </button>

              <span className="carrito-vista__item-cantidad">
                {item.cantidad}
              </span>

              <button
                onClick={() => cambiarCantidad(item.id, 1)}
                className="carrito-vista__btn-cant"
                aria-label="Aumentar cantidad"
              >
                +
              </button>

              <span className="carrito-vista__item-subtotal">
                $ {(item.precio * item.cantidad).toLocaleString('es-AR')}
              </span>

              <button
                onClick={() => quitarDelCarrito(item.id)}
                className="carrito-vista__btn-quitar"
                title="Quitar del carrito"
              >
                ✕
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="carrito-vista__resumen">
        <p className="carrito-vista__total-items">
          {totalItems} {totalItems === 1 ? 'item' : 'items'}
        </p>
        <p className="carrito-vista__total-precio">
          Total: <strong>$ {totalPrecio.toLocaleString('es-AR')}</strong>
        </p>
      </div>
    </section>
  )
}

export { Tienda, CarritoView }
