import { useState } from 'react'
import TaskForm from './components/TaskForm'

/*
 * Lista de tareas iniciales para que el alumno pueda probar
 * la validación de título repetido inmediatamente.
 */
const TAREAS_INICIALES = [
  'Estudiar React',
  'Hacer los ejercicios del Módulo 06',
  'Preparar el mate',
]

function App() {
  const [tareas, setTareas] = useState(TAREAS_INICIALES)

  function agregarTarea(titulo) {
    setTareas([...tareas, titulo])
  }

  function eliminarTarea(index) {
    setTareas(tareas.filter((_, i) => i !== index))
  }

  return (
    <div>
      <header className="app-header">
        <h1>🧑‍🏫 Ejercicio 02: Validación Personalizada</h1>
        <p>Módulo 06 — Formularios</p>
      </header>

      <main className="contenido">
        <TaskForm
          tareasExistentes={tareas}
          onAgregarTarea={agregarTarea}
        />

        <section className="lista-tareas">
          <h2 className="lista-tareas__titulo">
            Tareas ({tareas.length})
          </h2>

          {tareas.length === 0 ? (
            <p className="lista-tareas__vacio">No hay tareas todavía</p>
          ) : (
            <ul className="lista-tareas__lista">
              {tareas.map((tarea, i) => (
                <li key={i} className="lista-tareas__item">
                  <span>{tarea}</span>
                  <button
                    className="lista-tareas__btn-eliminar"
                    onClick={() => eliminarTarea(i)}
                    title="Eliminar tarea"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  )
}

export default App
