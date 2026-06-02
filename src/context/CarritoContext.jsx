/* =========================================================
   CarritoContext — Carrito de compras global con Context
   Módulo 05: Contexto Global (useContext)
   =========================================================

   📖 ¿Qué es este archivo?
   ─────────────────────────
   Define un CONTEXTO para el carrito de compras. Permite
   agregar/quitar productos desde cualquier componente,
   ver el total y la cantidad de items en un badge.

   🔑 Conceptos adicionales:
   ──────────────────────────
   1. Estado COMPLEJO en Context:
      El carrito no es un string o booleano simple. Es un
      objeto con items y funciones. El Context maneja estado
      complejo con múltiples operaciones.

   2. ESTRUCTURA DEL CARRITO:
      {
        items: [
          { id, nombre, precio, cantidad }
        ],
        total: number (calculado, no guardado)
      }
      
      La cantidad EVITA duplicados: si se agrega el mismo
      producto 2 veces, en vez de tener 2 entradas, sumamos
      la cantidad a 2.

   3. FALTA DE PERSISTENCIA (intencional):
      Este ejercicio NO persiste en localStorage.
      Se podría agregar (ver Módulo 04) pero el foco aquí
      es entender Context.

   📚 Referencias:
   ────────────────
   - react.dev/reference/react/useContext
   - react.dev/learn/passing-data-deeply-with-context
   - react.dev/learn/scaling-up-with-reducer-and-context
   ========================================================= */

import { createContext, useContext, useState } from 'react'

const CarritoContext = createContext(null)

function CarritoProvider({ children }) {
  /* 
    Estado del carrito: array de objetos { id, nombre, precio, cantidad }.
    
    NO guardamos el total en el estado (es un VALOR DERIVADO).
    El total se calcula en cada render sumando precio * cantidad
    de cada item. Esto evita tener estado redundante.
    
    (react.dev/learn/choosing-the-state-structure)
  */
  const [items, setItems] = useState([])

  /* 
    AGREGAR producto al carrito.
    
    Lógica:
    1. Buscamos si el producto YA EXISTE en el carrito
       con .findIndex().
    2. Si existe → aumentamos su cantidad en 1.
    3. Si no existe → lo agregamos con cantidad 1.
    
    findIndex devuelve -1 si no encuentra el producto.
    Es mejor que find() porque necesitamos el índice.
  */
  function agregarAlCarrito(producto) {
    setItems((prev) => {
      const indiceExistente = prev.findIndex((item) => item.id === producto.id)

      if (indiceExistente >= 0) {
        /* 
          Producto ya estaba en el carrito.
          Usamos .map() para crear un nuevo array y SOLO
          modificar el que encontramos.
        */
        const nuevosItems = prev.map((item, i) =>
          i === indiceExistente
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
        return nuevosItems
      }

      /* 
        Producto NUEVO → lo agregamos con cantidad 1.
        Spread operator mantiene los items existentes.
      */
      return [
        ...prev,
        {
          id: producto.id,
          nombre: producto.nombre,
          precio: producto.precio,
          cantidad: 1,
        },
      ]
    })
  }

  /* 
    QUITAR producto del carrito (eliminar completamente).
    .filter() devuelve todos los items EXCEPTO el que
    coincide con el id recibido.
  */
  function quitarDelCarrito(id) {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  /* 
    CAMBIAR CANTIDAD de un producto en el carrito.
    
    Si la nueva cantidad es 0 o menos, eliminamos el producto.
    Si es positiva, actualizamos la cantidad.
    
    delta: +1 (aumentar) o -1 (disminuir)
  */
  function cambiarCantidad(id, delta) {
    setItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, cantidad: Math.max(0, item.cantidad + delta) }
            : item
        )
        .filter((item) => item.cantidad > 0) // Eliminar si llega a 0
    )
  }

  /* 
    LIMPIAR carrito.
    Vacía todos los items.
  */
  function limpiarCarrito() {
    setItems([])
  }

  /* 
    VALORES DERIVADOS (calculados, no en estado).
    
    totalItems: suma de todas las cantidades.
    totalPrecio: suma de precio * cantidad de cada item.
    
    reduce() recorre el array y acumula un valor.
    (developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
  */
  const totalItems = items.reduce((sum, item) => sum + item.cantidad, 0)
  const totalPrecio = items.reduce(
    (sum, item) => sum + item.precio * item.cantidad,
    0
  )

  return (
    <CarritoContext.Provider
      value={{
        items,
        totalItems,
        totalPrecio,
        agregarAlCarrito,
        quitarDelCarrito,
        cambiarCantidad,
        limpiarCarrito,
      }}
    >
      {children}
    </CarritoContext.Provider>
  )
}

/* 
  Custom Hook — useCarrito()
  Misma validación que useTema() para errores claros.
*/
function useCarrito() {
  const context = useContext(CarritoContext)

  if (!context) {
    throw new Error(
      'useCarrito() debe usarse dentro de un <CarritoProvider>.'
    )
  }

  return context
}

export { CarritoProvider, useCarrito }
