/* =========================================================
   ListaCompras — CRUD completo de una lista de compras
   Módulo 03: Interactividad y Listas
   =========================================================

   📖 ¿Qué es este componente?
   ────────────────────────────
   Una lista de compras completamente funcional con las
   operaciones CRUD básicas:
   - CREATE: formulario para agregar items
   - READ: muestra la lista de items
   - UPDATE: checkbox para marcar como comprado
   - DELETE: botón para eliminar items + "Limpiar comprados"

   🔑 Conceptos clave que practica:
   ─────────────────────────────────
   1. useState con ARRAYS — Actualizar arrays inmutables:
      
      ❌ INCORRECTO: items.push(nuevo) — muta el array
      ✅ CORRECTO:   [...items, nuevo] — spread crea copia
      
      (react.dev/learn/updating-arrays-in-state)

   2. .map() — Actualizar un elemento específico:
      setItems(items.map(item =>
        item.id === id ? { ...item, comprado: !item.comprado } : item
      ))
      
   3. .filter() — Eliminar elementos:
      - Eliminar uno: items.filter(item => item.id !== id)
      - Eliminar varios: items.filter(item => !item.comprado)

   4. LIFTING STATE UP — El estado vive en el componente,
      las funciones de cambio se pasan como props a hijos.
      En este caso, TODO vive en ListaCompras (es autónomo).

   5. RENDERIZADO CONDICIONAL AVANZADO:
      - Estado vacío vs lista con items
      - Items comprados con estilo diferente
      - Botón "Limpiar comprados" visible solo si hay comprados

   📚 Referencias:
   ────────────────
   - react.dev/learn/updating-arrays-in-state
   - react.dev/learn/rendering-lists
   - react.dev/learn/conditional-rendering
   - react.dev/reference/react/useState
   ========================================================= */

import { useState } from 'react'

function ListaCompras() {
  /* 
    Estado PRINCIPAL: array de items de la compra.
    
    Cada item tiene la estructura:
    {
      id: number,        // Date.now() — timestamp único
      nombre: string,    // texto ingresado por el usuario
      comprado: boolean  // false inicialmente
    }
    
    ⚠️ NOTA sobre Date.now() como ID:
    Es suficientemente único para fines educativos.
    En producción se usaría UUID o IDs del backend.
    Si se agregan 2 items en el mismo milisegundo,
    compartirían ID (poco probable pero posible).
  */
  const [items, setItems] = useState([])

  /* 
    Estado para el INPUT controlado del formulario.
    Texto que el usuario escribe para agregar un item.
  */
  const [nuevoItem, setNuevoItem] = useState('')

  /* 
    Función: AGREGAR item (CREATE)
    
    1. Validamos que no esté vacío (trim elimina espacios)
    2. Spread operator: [...items, nuevoItem] crea un NUEVO
       array con todos los items anteriores + el nuevo
    3. Limpiamos el input
  */
  function agregarItem(e) {
    e.preventDefault()
    const nombre = nuevoItem.trim()
    if (!nombre) return // No agregar vacíos

    setItems([
      ...items,
      {
        id: Date.now(),
        nombre,
        comprado: false,
      },
    ])
    setNuevoItem('') // Limpiamos input
  }

  /* 
    Función: TOGGLE comprado (UPDATE)
    
    .map() recorre todos los items y SOLO modifica el que
    coincide con el id recibido. Los demás quedan igual.
    
    Esta función es "inmutable": crea un nuevo array con
    los cambios, no modifica el original.
    
    El spread { ...item, comprado: !item.comprado } copia
    todas las propiedades del item y sobreescribe comprado.
  */
  function toggleComprado(id) {
    setItems(
      items.map((item) =>
        item.id === id
          ? { ...item, comprado: !item.comprado }
          : item
      )
    )
  }

  /* 
    Función: ELIMINAR item (DELETE)
    
    .filter() crea un NUEVO array con TODOS los items
    EXCEPTO el que tiene el id recibido.
    
    Es como decir: "dame todos los items cuyo id sea
    diferente del que quiero borrar".
  */
  function eliminarItem(id) {
    setItems(items.filter((item) => item.id !== id))
  }

  /* 
    Función: LIMPIAR COMPRADOS (DELETE múltiple)
    
    Filtra para quedarse solo con los NO comprados.
    Los items comprados desaparecen de la lista.
  */
  function limpiarComprados() {
    setItems(items.filter((item) => !item.comprado))
  }

  /* 
    Valores DERIVADOS (calculados a partir del estado).
    No son estado — se recalculan en cada render.
    
    Esto evita tener estados redundantes. Si calculamos
    totalItems y comprados en lugar de guardarlos en el
    estado, nos aseguramos de que SIEMPRE estén sincronizados.
    
    (react.dev/learn/choosing-the-state-structure)
  */
  const totalItems = items.length
  const itemsComprados = items.filter((item) => item.comprado).length
  const hayComprados = itemsComprados > 0

  return (
    <section className="lista-compras">
      <h3 className="lista-compras__titulo">Lista de Compras</h3>

      {/* 
        FORMULARIO — Input controlado + botón Agregar
        
        El formulario usa onSubmit en lugar del botón con onClick.
        Esto permite enviar con Enter además del clic.
      */}
      <form className="lista-compras__form" onSubmit={agregarItem}>
        <input
          type="text"
          className="lista-compras__input"
          placeholder="Agregar item... (ej: Leche)"
          value={nuevoItem}
          onChange={(e) => setNuevoItem(e.target.value)}
        />
        <button type="submit" className="lista-compras__btn-agregar">
          Agregar
        </button>
      </form>

      {/* 
        CONTADOR — Muestra total y comprados.
        Solo se muestra si hay al menos 1 item.
      */}
      {totalItems > 0 && (
        <p className="lista-compras__contador">
          {totalItems} items | {itemsComprados} comprados
        </p>
      )}

      {/* 
        LISTA DE ITEMS — o mensaje de vacío
        Renderizado condicional: si no hay items, mostramos mensaje.
      */}
      {totalItems === 0 ? (
        <p className="lista-compras__vacio">
          No hay items en la lista. ¡Agregá tus compras!
        </p>
      ) : (
        <ul className="lista-compras__items">
          {/*
            .map() recorre items y renderiza un elemento por cada uno.
            key={item.id} — React identifica cada elemento de la lista.
            
            NOTA: la clase 'comprado' se agrega condicionalmente
            cuando item.comprado es true. CSS aplica tachado y opacidad.
          */}
          {items.map((item) => (
            <li
              key={item.id}
              className={`lista-compras__item ${item.comprado ? 'lista-compras__item--comprado' : ''}`}
            >
              {/* 
                CHECKBOX — toggle comprado/no comprado
                checked está sincronizado con el estado.
                onChange ejecuta toggleComprado con el id del item.
              */}
              <input
                type="checkbox"
                checked={item.comprado}
                onChange={() => toggleComprado(item.id)}
                className="lista-compras__checkbox"
              />

              {/* 
                Nombre del item.
                Si está comprado, el CSS lo muestra tachado.
              */}
              <span className="lista-compras__nombre">{item.nombre}</span>

              {/* 
                Botón ELIMINAR — rojo, con hover oscuro.
                Llama a eliminarItem con el id del item.
              */}
              <button
                onClick={() => eliminarItem(item.id)}
                className="lista-compras__btn-eliminar"
                title="Eliminar item"
                aria-label={`Eliminar ${item.nombre}`}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* 
        BOTÓN "LIMPIAR COMPRADOS"
        Solo visible cuando hay al menos 1 item comprado.
        Renderizado condicional con && (corto-circuito):
        Si hayComprados es true → renderiza el botón.
        Si es false → React ignora el operando derecho.
      */}
      {hayComprados && (
        <button
          onClick={limpiarComprados}
          className="lista-compras__btn-limpiar"
        >
          🗑️ Limpiar comprados
        </button>
      )}
    </section>
  )
}

export default ListaCompras
