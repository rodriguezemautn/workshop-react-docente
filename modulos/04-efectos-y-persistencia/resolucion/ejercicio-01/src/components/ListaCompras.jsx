import { useState, useEffect } from 'react'

/*
 * ============================================
 *  ListaCompras con persistencia en localStorage
 * ============================================
 *
 * 📌 Conceptos nuevos que se practican acá:
 *   - `useEffect` para sincronizar estado con localStorage
 *   - `useState` con función inicializadora (lazy initializer)
 *   - Manejo de errores con try/catch para datos corruptos
 *   - Persistencia: los datos sobreviven al F5
 *
 * 🔍 Flujo de datos:
 *   1. Al montar el componente → useState() ejecuta la función
 *      inicializadora que lee de localStorage
 *   2. Cada vez que items cambia → useEffect() guarda en localStorage
 *   3. Si localStorage está corrupto → try/catch devuelve []
 *
 * ⚠️ Patrón importante:
 *   El guardado va en un useEffect SEPARADO, no en el evento.
 *   ¿Por qué? Porque así nos aseguramos de que el localStorage
 *   SIEMPRE refleje el estado actual, sin importar cómo cambie
 *   (por formulario, por limpiar comprados, o por cualquier
 *   otra función que modifique items).
 *
 *   Esto es el patrón "single source of truth":
 *   - React state = la fuente de verdad durante la ejecución
 *   - localStorage = la fuente de verdad para persistencia
 *   - useEffect = el puente sincronizador entre ambos
 */

const STORAGE_KEY = 'mod04-lista-compras'

function ListaCompras() {
  /*
   * Lazy initializer — useState recibe una FUNCIÓN en vez de un valor.
   *
   * Esto es clave porque:
   *   - Solo se ejecuta UNA VEZ, cuando el componente se monta
   *   - No se ejecuta en re-renders posteriores
   *   - Ideal para operaciones costosas como leer de localStorage
   *
   * Si pasáramos directamente localStorage.getItem(), se ejecutaría
   * en CADA render. Con la función, solo en el primero.
   */
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved === null) return [] // primera vez que se abre

      const parsed = JSON.parse(saved)
      // Validación mínima: debe ser un array
      return Array.isArray(parsed) ? parsed : []
    } catch {
      // Si localStorage está corrupto (JSON mal formado, etc.)
      // no queremos que la app explote. Devolvemos array vacío.
      console.warn('localStorage corrupto, iniciando con lista vacía')
      return []
    }
  })

  const [nuevoNombre, setNuevoNombre] = useState('')

  /*
   * useEffect para persistir — se ejecuta DESPUÉS del render.
   *
   * [items] en las dependencias significa:
   *   "ejecutá este efecto cada vez que items cambie"
   *
   * En cada cambio serializamos el array completo y lo guardamos.
   * Esto es deliberado: es más simple que hacer un diff y guardar
   * solo lo que cambió, y para listas chicas (< 100 items) el
   * performance es idéntico.
   */
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  function agregarItem(e) {
    e.preventDefault()
    if (!nuevoNombre.trim()) return

    setItems([
      ...items,
      { id: Date.now(), nombre: nuevoNombre.trim(), comprado: false },
    ])
    setNuevoNombre('')
  }

  function toggleItem(id) {
    setItems(items.map(item =>
      item.id === id ? { ...item, comprado: !item.comprado } : item
    ))
  }

  function eliminarItem(id) {
    setItems(items.filter(item => item.id !== id))
  }

  function limpiarComprados() {
    setItems(items.filter(item => !item.comprado))
  }

  const total = items.length
  const comprados = items.filter(i => i.comprado).length

  return (
    <div className="lista-compras">
      <h2 className="lista-compras__titulo">Lista de Compras</h2>
      <p className="lista-compras__persistencia">
        💾 Los datos se guardan automáticamente en localStorage
      </p>

      <form onSubmit={agregarItem} className="lista-compras__form">
        <input
          className="lista-compras__input"
          type="text"
          placeholder="Agregar item..."
          value={nuevoNombre}
          onChange={e => setNuevoNombre(e.target.value)}
        />
        <button type="submit" className="lista-compras__btn-agregar">
          Agregar
        </button>
      </form>

      <p className="lista-compras__contador">
        {total} items | {comprados} comprados
      </p>

      {items.length === 0 ? (
        <p className="lista-compras__vacio">No hay items en la lista</p>
      ) : (
        <ul className="lista-compras__items">
          {items.map(item => (
            <li
              key={item.id}
              className={`lista-compras__item ${item.comprado ? 'lista-compras__item--comprado' : ''}`}
            >
              <input
                type="checkbox"
                className="lista-compras__checkbox"
                checked={item.comprado}
                onChange={() => toggleItem(item.id)}
              />
              <span className="lista-compras__nombre">{item.nombre}</span>
              <button
                className="lista-compras__btn-eliminar"
                onClick={() => eliminarItem(item.id)}
                title="Eliminar"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}

      {comprados > 0 && (
        <button className="lista-compras__btn-limpiar" onClick={limpiarComprados}>
          Limpiar comprados ({comprados})
        </button>
      )}
    </div>
  )
}

export default ListaCompras
