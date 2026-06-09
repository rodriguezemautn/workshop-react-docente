/* =========================================================
   App — Componente raíz del Ejercicio 01
   
   Usa TarjetaPersonal 3 veces con diferentes props para
   demostrar REUTILIZACIÓN de componentes.
   ========================================================= */

import TarjetaPersonal from './TarjetaPersonal'

function App() {
  return (
    <div>
      <header className="app-header">
        <h1>🧑‍🏫 Ejercicio 01: Tarjeta Personal</h1>
        <p>Módulo 01 — Fundamentos de React</p>
      </header>

      <main>
        <h2 className="seccion-titulo">Mis tarjetas</h2>

        <div className="tarjetas-container">
          <TarjetaPersonal
            nombre="Ana García"
            edad={25}
            ciudad="Buenos Aires"
          />

          <TarjetaPersonal
            nombre="Luis Pérez"
            edad={30}
            ciudad="Córdoba"
          />

          <TarjetaPersonal
            nombre="María López"
            edad={22}
            ciudad="Rosario"
          />
        </div>
      </main>
    </div>
  )
}

export default App
