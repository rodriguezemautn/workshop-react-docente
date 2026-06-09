/* =========================================================
   App — Componente raíz del Ejercicio 02
   Módulo 02: Estado y Eventos
   
   Demuestra formulario controlado con validación.
   ========================================================= */

import FormularioRegistro from './FormularioRegistro'

function App() {
  return (
    <div>
      <header className="app-header">
        <h1>🧑‍🏫 Ejercicio 02: Formulario de Registro</h1>
        <p>Módulo 02 — Estado y Eventos</p>
      </header>

      <main>
        <FormularioRegistro />
      </main>
    </div>
  )
}

export default App
