import { useState, useEffect, useCallback } from 'react'
import api from '../services/api'

/*
 * ============================================
 *  ListaTareas — CRUD Completo con json-server
 * ============================================
 *
 * 📌 Conceptos clave que se practican acá:
 *   - Las 4 operaciones CRUD con Axios: GET, POST, PATCH, DELETE
 *   - Instancia de Axios configurada (services/api.js)
 *   - useEffect para cargar datos al montar
 *   - Optimistic UI vs API-first
 *   - Feedback visual con Toast
 *   - Manejo de errores por operación
 *
 * 🔍 Las 4 operaciones:
 *   GET    → useEffect al montar
 *   POST   → al crear tarea
 *   PATCH  → al toggle completada
 *   DELETE → al eliminar tarea
 */

function ListaTareas() {
  const [tareas, setTareas] = useState([])
  const [loading, setLoading] = useState(true)
  const [nuevoTitulo, setNuevoTitulo] = useState('')
  const [toast, setToast] = useState(null)
  const [operando, setOperando] = useState(false)

  /*
   * Mostrar toast y ocultarlo después de 2 segundos.
   * El componente Toast maneja el timer vía useEffect.
   */
  const mostrarToast = useCallback((mensaje) => {
    setToast(mensaje)
  }, [])

  const cerrarToast = useCallback(() => {
    setToast(null)
  }, [])

  // ========== GET: Cargar tareas al montar ==========
  useEffect(() => {
    async function cargarTareas() {
      try {
        setLoading(true)
        const res = await api.get('/tareas')
        setTareas(res.data)
      } catch {
        mostrarToast('Error al cargar las tareas')
      } finally {
        setLoading(false)
      }
    }

    cargarTareas()
  }, [mostrarToast])

  // ========== POST: Crear tarea ==========
  async function agregarTarea(e) {
    e.preventDefault()
    if (!nuevoTitulo.trim()) return

    setOperando(true)
    try {
      const res = await api.post('/tareas', {
        titulo: nuevoTitulo.trim(),
        completada: false,
      })

      /*
       * API-first: esperamos la respuesta del servidor y usamos
       * el ID que json-server asignó. Esto asegura que el estado
       * de React siempre coincida con el servidor.
       *
       * Alternativa (Optimistic UI): agregar la tarea al estado
       * INMEDIATAMENTE sin esperar la respuesta, y revertir si
       * falla. Mejor UX pero más complejo.
       */
      setTareas(t => [...t, res.data])
      setNuevoTitulo('')
      mostrarToast('✅ Tarea creada')
    } catch {
      mostrarToast('Error al crear la tarea')
    } finally {
      setOperando(false)
    }
  }

  // ========== PATCH: Toggle completada ==========
  async function toggleTarea(id, completada) {
    /*
     * Optimistic UI: actualizamos la UI INMEDIATAMENTE
     * antes de que el servidor responda. Si la API falla,
     * revertimos.
     *
     * Esto hace que la app se sienta instantánea.
     */
    setTareas(t =>
      t.map(tarea =>
        tarea.id === id ? { ...tarea, completada: !completada } : tarea
      )
    )

    try {
      await api.patch(`/tareas/${id}`, { completada: !completada })
    } catch {
      // Revertir si falla
      setTareas(t =>
        t.map(tarea =>
          tarea.id === id ? { ...tarea, completada } : tarea
        )
      )
      mostrarToast('Error al actualizar la tarea')
    }
  }

  // ========== DELETE: Eliminar tarea ==========
  async function eliminarTarea(id) {
    const tareaEliminada = tareas.find(t => t.id === id)
    if (!tareaEliminada) return

    // Optimistic UI: eliminamos de la vista
    setTareas(t => t.filter(tarea => tarea.id !== id))

    try {
      await api.delete(`/tareas/${id}`)
      mostrarToast(`🗑️ "${tareaEliminada.titulo}" eliminada`)
    } catch {
      // Revertir si falla
      setTareas(t => [...t, tareaEliminada])
      mostrarToast('Error al eliminar la tarea')
    }
  }

  // ========== Render ==========
  if (loading) {
    return (
      <div className="tareas tareas--cargando">
        <div className="tareas__spinner" />
        <p>Cargando tareas...</p>
      </div>
    )
  }

  return (
    <div className="tareas">
      <Toast mensaje={toast} onCerrar={cerrarToast} />

      <h2 className="tareas__titulo">Taskify CRUD</h2>
      <p className="tareas__subtitulo">
        API: <code>json-server</code> en <code>localhost:3001</code>
      </p>

      {/* Formulario para crear tareas */}
      <form onSubmit={agregarTarea} className="tareas__form">
        <input
          className="tareas__input"
          type="text"
          placeholder="Nueva tarea..."
          value={nuevoTitulo}
          onChange={e => setNuevoTitulo(e.target.value)}
          disabled={operando}
        />
        <button
          type="submit"
          className="tareas__btn-crear"
          disabled={operando || !nuevoTitulo.trim()}
        >
          {operando ? 'Agregando...' : 'Agregar'}
        </button>
      </form>

      {/* Lista de tareas */}
      {tareas.length === 0 ? (
        <p className="tareas__vacio">No hay tareas. ¡Creá una!</p>
      ) : (
        <ul className="tareas__lista">
          {tareas.map(tarea => (
            <li
              key={tarea.id}
              className={`tareas__item ${tarea.completada ? 'tareas__item--completada' : ''}`}
            >
              <input
                type="checkbox"
                className="tareas__checkbox"
                checked={tarea.completada}
                onChange={() => toggleTarea(tarea.id, tarea.completada)}
              />
              <span className="tareas__item-titulo">{tarea.titulo}</span>
              <button
                className="tareas__btn-eliminar"
                onClick={() => eliminarTarea(tarea.id)}
                title="Eliminar tarea"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ListaTareas
