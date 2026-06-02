/* =========================================================
   Taskify — App principal
   Módulo 01: Fundamentos de React
   =========================================================

   📖 ¿Qué hace este archivo?
   ───────────────────────────
   App es el COMPONENTE RAÍZ de la aplicación. Es el punto
   de entrada donde comenzamos a componer nuestra UI.

   Aquí se aplica el concepto de COMPOSICIÓN: componentes
   pequeños (Header, TarjetaPersonal, ListaProductos, TaskList)
   se combinan para formar la UI completa.

   🔑 Flujo de datos:
   ──────────────────
   App (padre) ──props──> Header (hijo)
   App (padre) ──props──> TarjetaPersonal (hijo)
   App (padre) ──props──> ListaProductos (hijo)
   App (padre) ──props──> TaskList (hijo)
   
   Los datos SIEMPRE fluyen de PADRE a HIJO (unidireccional).

   🚀 NOTA ACADÉMICA: Iniciar un proyecto React con Vite
   ────────────────────────────────────────────────────────
   React Docs oficial recomienda estos frameworks:
   (react.dev/learn/start-a-new-react-project)
   
   Opción 1 — Vite (recomendado para SPAs):
     npm create vite@latest nombre-proyecto -- --template react
     cd nombre-proyecto
     npm install
     npm run dev
   
   Opción 2 — Next.js (full-stack con SSR):
     npx create-next-app@latest
   
   Opción 3 — Remix (full-stack con web standards):
     npx create-remix@latest
   
   Para este workshop usamos VITE porque:
   - Es la herramienta OFICIALMENTE recomendada para SPAs
   - Es ultra rápida (ESBuild para dev, Rollup para build)
   - Soporta React con HMR (Hot Module Replacement) nativo
   - Cero configuración para empezar

   📚 Referencias:
   ────────────────
   - react.dev/learn/start-a-new-react-project
   - vitejs.dev/guide/
   ========================================================= */

import Header from './components/Header'
import TaskList from './components/TaskList'
import TarjetaPersonal from './components/TarjetaPersonal'
import ListaProductos from './components/ListaProductos'
import ContadorLimitado from './components/ContadorLimitado'
import FormularioRegistro from './components/FormularioRegistro'

/* 
  Datos de ejemplo — tareas mockeadas.
  En React, los datos suelen venir de:
  1. Estado local (useState) → Módulo 02
  2. Prop del padre → Módulo 01
  3. API externa (fetch/axios) → Módulo 07
  
  Por ahora son datos estáticos. En etapas siguientes
  serán DINÁMICOS (el usuario podrá agregar, modificar, borrar).
*/
const tareasIniciales = [
  { id: 1, titulo: 'Aprender JSX', completada: false },
  { id: 2, titulo: 'Crear mi primer componente', completada: true },
  { id: 3, titulo: 'Entender las props', completada: false },
  { id: 4, titulo: 'Practicar composición', completada: false },
]

/* 
  Array de productos para el ejercicio de ListaProductos.
  Cada producto tiene:
  - id: número único (para la key de React)
  - nombre: string
  - precio: número (en ARS)
  - disponible: booleano
*/
const productos = [
  { id: 1, nombre: 'Notebook', precio: 850000, disponible: true },
  { id: 2, nombre: 'Mouse', precio: 15000, disponible: false },
  { id: 3, nombre: 'Teclado', precio: 35000, disponible: true },
  { id: 4, nombre: 'Monitor', precio: 220000, disponible: true },
  { id: 5, nombre: 'Auriculares', precio: 45000, disponible: false },
]

function App() {
  return (
    <div className="app">
      {/* 
        Header recibe props para personalizar su contenido.
        tareasPendientes se calcula con .filter() en tiempo real.
        FILTER: método inmutable que crea un nuevo array con
        los elementos que cumplen la condición.
      */}
      <Header
        titulo="Taskify"
        subtitulo="Workshop React — Desarrollo de Software 2026"
        tareasPendientes={tareasIniciales.filter(t => !t.completada).length}
      />

      {/* 
        ═══════════════════════════════════════════════
        EJERCICIO 01: TarjetaPersonal
        ═══════════════════════════════════════════════
        
        Usamos el mismo componente 3 VECES con diferentes props.
        Esto demuestra REUTILIZACIÓN: un componente puede
        renderizarse múltiples veces con diferentes datos.
        
        ¿Qué pasa si cambiamos las props? React actualiza
        solo la tarjeta que cambió (gracias al Virtual DOM).
      */}
      <section className="ejercicios-section">
        <h2 className="ejercicios-section__titulo">
          🧑‍🏫 Módulo 01 — Ejercicio 1: Tarjeta Personal
        </h2>
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
      </section>

      {/* 
        ═══════════════════════════════════════════════
        EJERCICIO 02: ListaProductos
        ═══════════════════════════════════════════════
        
        Pasamos un ARRAY COMPLETO como prop.
        ListaProductos internamente usa .map() para
        renderizar un ProductoItem por cada elemento.
        
        Este es el patrón típico en React para listas:
        padre tiene los datos → los pasa como array →
        componente hijo los itera con .map() →
        componente nieto recibe props individuales.
      */}
      <section className="ejercicios-section">
        <h2 className="ejercicios-section__titulo">
          🧑‍🏫 Módulo 01 — Ejercicio 2: Lista de Productos
        </h2>
        <ListaProductos productos={productos} />
      </section>

      {/* 
        ═══════════════════════════════════════════════
        MÓDULO 02: Estado y Eventos
        ═══════════════════════════════════════════════
        
        Estos componentes introducen:
        - useState para manejar datos que cambian
        - Eventos onClick, onChange, onSubmit
        - Inputs controlados (value + onChange)
        - Renderizado condicional de errores y datos
      */}

      <section className="ejercicios-section">
        <h2 className="ejercicios-section__titulo">
          🧑‍🏫 Módulo 02 — Ejercicio 1: Contador con Límites
        </h2>
        <ContadorLimitado />
      </section>

      <section className="ejercicios-section">
        <h2 className="ejercicios-section__titulo">
          🧑‍🏫 Módulo 02 — Ejercicio 2: Formulario de Registro
        </h2>
        <FormularioRegistro />
      </section>

      {/* TaskList con las tareas mockeadas de Taskify */}
      <TaskList tareas={tareasIniciales} />
    </div>
  )
}

export default App
