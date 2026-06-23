import { useCarrito } from '../context/CarritoContext'

function Header() {
  const { cantidadTotal } = useCarrito()

  return (
    <header className="header">
      <div className="header__contenido">
        <h1 className="header__titulo">🧑‍🏫 Ejercicio 02: Carrito de Compras</h1>
        <p className="header__modulo">Módulo 05 — Contexto Global</p>
      </div>

      <div className="header__carrito-icono">
        <span className="header__carrito-emoji">🛒</span>
        {cantidadTotal > 0 && (
          <span className="header__badge">{cantidadTotal}</span>
        )}
      </div>
    </header>
  )
}

export default Header
