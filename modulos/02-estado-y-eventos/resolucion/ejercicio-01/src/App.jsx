/* =========================================================
   App — Componente raíz del Ejercicio 01
   Módulo 02: Estado y Eventos
   
   Demuestra useState con un contador limitado.
   ========================================================= */

import ContadorLimitado from './ContadorLimitado'

function App() {
  return (
    <div>
      <header className="app-header">
        <h1>🧑‍🏫 Ejercicio 01: Contador con Límites</h1>
        <p>Módulo 02 — Estado y Eventos</p>
      </header>

      <main>
        <ContadorLimitado />
      </main>
    </div>
  )
}

export default App
