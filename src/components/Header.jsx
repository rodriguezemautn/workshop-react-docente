/* =========================================================
   Header — Barra superior de la aplicación
   Módulo 01/05: Componentes básicos + Toggle de tema
   =========================================================

   📖 ¿Qué es este componente?
   ────────────────────────────
   Muestra el título, subtítulo, contador de tareas pendientes
   y un botón para cambiar el tema (claro/oscuro).

   Props:
   - titulo: string
   - subtitulo: string
   - tareasPendientes: number

   useContext:
   - useTema(): tema actual + función para cambiarlo
   ========================================================= */

import { useTema } from '../context/TemaContext'
import { useCarrito } from '../context/CarritoContext'

function Header({ titulo, subtitulo, tareasPendientes }) {
  /* 
    useTema() es un CUSTOM HOOK que encapsula useContext.
    Devuelve { tema, cambiarTema } del TemaProvider.
    
    Esto NO necesita prop drilling — Header está dentro
    de <TemaProvider> en main.jsx y accede directamente.
  */
  const { tema, cambiarTema } = useTema()
  const { totalItems } = useCarrito()

  /* 
    Texto e ícono dinámico según el tema actual.
    Operador ternario: si tema es 'oscuro', muestra el sol.
  */
  const botonTema = {
    texto: tema === 'oscuro' ? '☀️ Claro' : '🌙 Oscuro',
    clase: tema === 'oscuro' ? 'header__tema--oscuro' : 'header__tema--claro',
  }

  return (
    <header className={`header header--${tema}`}>
      <div className="header__top">
        <div>
          <h1>{titulo}</h1>
          <p className="subtitulo">{subtitulo}</p>
        </div>

        {/*
          Botón de CAMBIO DE TEMA.
          Usa useContext para acceder al tema y la función.
          Sin Context, este botón tendría que recibir
          'tema' y 'cambiarTema' como props desde App,
          incluso si App no los necesita directamente.
        */}
        <button
          onClick={cambiarTema}
          className={`header__tema-btn ${botonTema.clase}`}
          aria-label={`Cambiar a modo ${tema === 'oscuro' ? 'claro' : 'oscuro'}`}
        >
          {botonTema.texto}
        </button>
      </div>

      {/* 
        Información del header: tareas pendientes + badge carrito.

        El badge del carrito usa useCarrito() para mostrar
        la cantidad total de items. Sin Context, esto sería
        prop drilling: App → Header → badge, aunque App
        no necesita saber nada del carrito.
      */}
      <div className="header__info">
        <p className="contador">
          Tareas pendientes: <strong>{tareasPendientes}</strong>
        </p>
        {totalItems > 0 && (
          <span className="header__badge-carrito">
            🛒 {totalItems}
          </span>
        )}
      </div>
    </header>
  )
}

export default Header
