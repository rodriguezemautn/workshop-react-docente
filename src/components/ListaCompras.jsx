/* =========================================================
   ListaCompras — CRUD completo con persistencia localStorage
   Módulo 04: Efectos Secundarios y Persistencia
   =========================================================

   📖 ¿Qué es este componente?
   ────────────────────────────
   Una lista de compras completamente funcional con las
   operaciones CRUD básicas Y persistencia en localStorage.
   Los items sobreviven al cerrar y reabrir el navegador.

   🔑 Conceptos NUEVOS (Módulo 04):
   ─────────────────────────────────
   1. LAZY INITIALIZER en useState:
      useState(() => { ... }) — función que se ejecuta UNA
      SOLA VEZ al montar el componente. Ideal para lecturas
      costosas como localStorage.
      
      Sin lazy initializer:
        const [items, setItems] = useState(JSON.parse(localStorage.getItem(...)))
        ❌ Se ejecuta en CADA render (aunque React solo usa
           el valor en el primer render, igual se evalúa)
      
      Con lazy initializer:
        const [items, setItems] = useState(() => JSON.parse(...))
        ✅ Solo se ejecuta UNA vez
      
      (react.dev/reference/react/useState#parameters)

   2. useEffect — Sincronizar con sistemas EXTERNOS:
      - Escribir en localStorage
      - Llamadas a APIs (Módulo 07)
      - Timers (Ejercicio 02 de este módulo)
      - Suscripciones a eventos
      
      useEffect se ejecuta DESPUÉS del render, no durante.
      Las dependencias [items] controlan CUÁNDO se ejecuta.
      
      (react.dev/reference/react/useEffect)

   3. TRY/CATCH para localStorage corrupto:
      Si localStorage tiene datos inválidos (JSON mal formado),
      JSON.parse() lanza un error. Con try/catch la app no
      se rompe y arranca con lista vacía.

   🔑 Conceptos que se MANTIENEN (Módulo 03):
   ──────────────────────────────────────────
   - useState con arrays y actualización inmutable
   - .map() para toggle, .filter() para eliminar
   - Valores derivados (totalItems, itemsComprados)
   - Renderizado condicional avanzado

   🚀 Almacenamiento en el navegador:
   ──────────────────────────────────
   localStorage vs sessionStorage:
   - localStorage: persiste hasta que se borre manualmente
   - sessionStorage: se borra al cerrar la pestaña
   
   Ambos almacenan SOLO strings. Para guardar objetos/arrays
   usamos JSON.stringify() al guardar y JSON.parse() al leer.
   
   Límite: ~5MB por dominio.

   📚 Referencias:
   ────────────────
   - react.dev/reference/react/useEffect
   - react.dev/reference/react/useState
   - developer.mozilla.org/es/docs/Web/API/Window/localStorage
   - developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/JSON
   ========================================================= */

import { useState, useEffect } from 'react'

/* 
  Clave (key) para localStorage.
  Es buena práctica usar un prefijo único para evitar
  colisiones con otras apps en el mismo dominio.
*/
const STORAGE_KEY = 'taskify-lista-compras'

function ListaCompras() {
  /* 
    Estado PRINCIPAL con LAZY INITIALIZER:
    
    useState(() => { ... })
    
    La función se ejecuta UNA SOLA VEZ al montar el componente.
    Lee los datos guardados de localStorage.
    
    try/catch es CRUCIAL porque:
    - localStorage puede haber sido manipulado externamente
    - JSON.parse() lanza SyntaxError si el JSON es inválido
    - Sin try/catch, la app entera se rompe al cargar
    
    Flujo de inicialización:
    1. Componente se monta
    2. useState ejecuta la función lazy
    3. Busca en localStorage la clave STORAGE_KEY
    4. Si existe y es JSON válido → lo usa como estado inicial
    5. Si no existe o está corrupto → usa [] (lista vacía)
    
    (react.dev/reference/react/useState#avoiding-recreating-the-initial-state)
  */
  const [items, setItems] = useState(() => {
    try {
      const guardados = localStorage.getItem(STORAGE_KEY)
      /* 
        Si hay datos guardados → parseamos el JSON.
        Si no hay datos (null) → retornamos array vacío.
      */
      return guardados ? JSON.parse(guardados) : []
    } catch (error) {
      /* 
        localStorage corrupto → no rompemos la app.
        En producción se podría loguear el error.
        console.warn('localStorage corrupto:', error)
      */
      return []
    }
  })

  /* 
    Estado para el INPUT controlado del formulario.
    Texto que el usuario escribe para agregar un item.
  */
  const [nuevoItem, setNuevoItem] = useState('')

  /* 
    useEffect — GUARDAR en localStorage cuando items cambie.
    
    Se ejecuta DESPUÉS de cada render donde [items] haya
    cambiado. Esto asegura que localStorage esté siempre
    sincronizado con el estado.
    
    ⚠️ NO usamos useEffect para LEER (eso lo hace el lazy
    initializer). useEffect es para EFECTOS SECUNDARIOS:
    operaciones que ocurren "como consecuencia" del render.
    
    Dependencia [items]: solo se ejecuta cuando items cambia.
    Sin dependencias o con [] incorrecto, podríamos tener:
    - Sin array: loop infinito (render → efecto → setState → render → ...)
    - Array vacío: solo una vez al montar (no actualiza)
    
    (react.dev/reference/react/useEffect#parameters)
    
    Conversión de datos:
    - JSON.stringify(items) → convierte el array a string JSON
    - localStorage solo guarda strings
    - Ejemplo: [{id:1, nombre:"Leche"}] → '[{"id":1,"nombre":"Leche"}]'
  */
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

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
