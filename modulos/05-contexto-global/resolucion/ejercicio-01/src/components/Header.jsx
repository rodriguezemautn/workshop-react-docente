import { useTema } from '../context/TemaContext'

function Header() {
  const { tema, toggleTema } = useTema()

  return (
    <header className="header">
      <div className="header__contenido">
        <h1 className="header__titulo">🧑‍🏫 Ejercicio 01: Tema Claro/Oscuro</h1>
        <p className="header__modulo">Módulo 05 — Contexto Global</p>
      </div>

      <button
        className="header__toggle"
        onClick={toggleTema}
        title={`Cambiar a modo ${tema === 'claro' ? 'oscuro' : 'claro'}`}
      >
        {tema === 'claro' ? '🌙 Modo Oscuro' : '☀️ Modo Claro'}
      </button>
    </header>
  )
}

export default Header
