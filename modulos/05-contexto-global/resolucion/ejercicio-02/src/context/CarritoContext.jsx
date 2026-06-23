import { createContext, useContext, useState, useEffect, useCallback } from 'react'

/*
 * ============================================
 *  CarritoContext — Carrito de Compras Global
 * ============================================
 *
 * 📌 Conceptos clave que se practican acá:
 *   - Context con estado complejo (array de objetos)
 *   - Funciones del contexto: agregar, quitar, limpiar
 *   - Lógica de negocio: evitar duplicados (acumular cantidad)
 *   - Derived state: total calculado desde los items
 *   - Persistencia en localStorage
 *
 * 🏗️ Estructura del carrito:
 *   {
 *     items: [
 *       { id, nombre, precio, cantidad }
 *     ]
 *   }
 *
 *   NOTA: no guardamos 'total' en el estado porque es DERIVED STATE.
 *   El total se calcula siempre desde los items. Si guardáramos total
 *   y items por separado, podrían desincronizarse.
 *
 *   Regla de oro de React:
 *     "Si se puede calcular desde el estado existente, no es estado."
 */

const CarritoContext = createContext()

const STORAGE_KEY = 'mod05-carrito'

export function CarritoProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  // Persistir carrito en localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  /*
   * useCallback evita que la función se re-cree en cada render.
   * Como estas funciones se pasan a través del Context, sin useCallback
   * todos los componentes que consumen el contexto se re-renderizarían
   * aunque el carrito no hubiera cambiado.
   *
   * ¿Cuándo cambian? Solo cuando cambia la dependencia [setItems].
   * Como setItems es estable (viene de useState), estas funciones
   * son ESTABLES también — se crean una sola vez.
   */

  const agregarAlCarrito = useCallback((producto) => {
    setItems(itemsActuales => {
      // Buscamos si el producto ya está en el carrito
      const idx = itemsActuales.findIndex(i => i.id === producto.id)

      if (idx >= 0) {
        // Ya existe → aumentamos la cantidad
        const nuevo = [...itemsActuales]
        nuevo[idx] = {
          ...nuevo[idx],
          cantidad: nuevo[idx].cantidad + 1,
        }
        return nuevo
      }

      // No existe → lo agregamos con cantidad 1
      return [...itemsActuales, { ...producto, cantidad: 1 }]
    })
  }, [])

  const quitarDelCarrito = useCallback((id) => {
    setItems(itemsActuales => {
      const idx = itemsActuales.findIndex(i => i.id === id)
      if (idx < 0) return itemsActuales

      const item = itemsActuales[idx]

      if (item.cantidad > 1) {
        // Si hay más de 1, reducimos la cantidad
        const nuevo = [...itemsActuales]
        nuevo[idx] = { ...item, cantidad: item.cantidad - 1 }
        return nuevo
      }

      // Si cantidad es 1, eliminamos el item
      return itemsActuales.filter(i => i.id !== id)
    })
  }, [])

  const limpiarCarrito = useCallback(() => {
    setItems([])
  }, [])

  /*
   * Derived state — el total se calcula desde items.
   *
   * No usamos useState para esto porque:
   *   1. Total SIEMPRE depende de items
   *   2. Si items cambia, total debe recalcularse
   *   3. Un useState separado podría quedar desincronizado
   *
   * La desventaja? Se recalcula en cada render. Para un carrito
   * de estudio con pocos items, es perfecto. Para 10k items,
   * usaríamos un useMemo.
   */
  const total = items.reduce((sum, item) => sum + item.precio * item.cantidad, 0)

  const cantidadTotal = items.reduce((sum, item) => sum + item.cantidad, 0)

  return (
    <CarritoContext.Provider
      value={{
        items,
        total,
        cantidadTotal,
        agregarAlCarrito,
        quitarDelCarrito,
        limpiarCarrito,
      }}
    >
      {children}
    </CarritoContext.Provider>
  )
}

export function useCarrito() {
  const context = useContext(CarritoContext)
  if (!context) {
    throw new Error('useCarrito debe usarse dentro de un <CarritoProvider>')
  }
  return context
}
