/* =========================================================
   ListaProductos — Componente que renderiza una lista de productos
   Módulo 01: Fundamentos de React
   =========================================================

   📖 ¿Qué es este componente?
   ────────────────────────────
   ListaProductos es un componente que recibe un ARRAY de
   productos y usa el método .map() para transformar cada
   elemento del array en un componente <ProductoItem />.

   🔑 Conceptos clave que muestra:
   ─────────────────────────────────
   1. COMPOSICIÓN: un componente que usa otros componentes
      (ListaProductos contiene múltiples ProductoItem).
      La composición es el patrón fundamental en React:
      componentes pequeños combinados forman UIs complejas.
      (react.dev/learn/importing-and-exporting-components)

   2. RENDERIZADO DE LISTAS con .map():
      En React, transformamos arrays en JSX usando .map().
      Esto reemplaza los bucles for tradicionales.
      (react.dev/learn/rendering-lists)

   3. La PROP "key":
      Cada elemento en una lista necesita una prop "key" única.
      Esto ayuda a React a identificar qué elemento cambió,
      se agregó o se eliminó, optimizando el re-renderizado.
      
      ✅ CORRECTO: usar el id del dato
         {items.map(item => <Item key={item.id} />)}
      
      ❌ INCORRECTO: usar el índice del array (solo si la
         lista es estática y nunca se reordena)
         {items.map((item, i) => <Item key={i} />)}
      
      Una key debe ser:
      - Única entre hermanos (no global)
      - Estable (no cambiar entre renders)
      - Inmutable (no cambiar con el tiempo)
      (react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key)

   4. RENDERIZADO CONDICIONAL para lista vacía:
      Si el array está vacío, mostramos un mensaje alternativo.
      Esto mejora la experiencia de usuario (UX).
      (react.dev/learn/conditional-rendering)

   📚 Referencias:
   ────────────────
   - react.dev/learn/rendering-lists
   - react.dev/learn/conditional-rendering
   - react.dev/learn/importing-and-exporting-components
   - developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/map
   ========================================================= */

import ProductoItem from './ProductoItem'

/**
 * ListaProductos - Recibe un array de productos y renderiza una lista
 * 
 * @param {Array} productos - Array de objetos { id, nombre, precio, disponible }
 * 
 * USO:
 *   const productos = [
 *     { id: 1, nombre: 'Notebook', precio: 850000, disponible: true },
 *     { id: 2, nombre: 'Mouse', precio: 15000, disponible: false },
 *   ]
 *   <ListaProductos productos={productos} />
 */
function ListaProductos({ productos }) {
  return (
    <section className="lista-productos">
      <h2 className="lista-productos__titulo">Lista de Productos</h2>

      {/*
        RENDERIZADO CONDICIONAL con lógica booleana (&&):
        - Si el array está vacío (length === 0), muestra el mensaje
        - Si tiene elementos, renderiza la lista con .map()
        
        En React se usa mucho este patrón:
          {condicion && <Componente />}
        Cuando la condición es true, se renderiza el componente.
        Cuando es false, React ignora el operando derecho.
      */}
      {productos.length === 0 ? (
        <p className="lista-productos__vacio">
          No hay productos disponibles
        </p>
      ) : (
        <ul className="lista-productos__items">
          {/*
            .map() recorre el array y retorna un JSX por cada elemento.
            Cada <ProductoItem> recibe sus props ESPECÍFICAS y la key ÚNICA.
            
            ⚠️ NOTA ACADÉMICA sobre la prop "key":
            Siempre usar el id como key cuando los datos tienen IDs.
            Si no hay IDs, se puede usar el índice SOLO si:
            - La lista es estática (nunca cambia)
            - Los items no tienen orden mutable
            - No hay reordenamiento ni filtrado
            
            En este caso usamos producto.id porque:
            - El id es único y estable
            - Si agregamos o quitamos productos, React
              puede rastrear cada elemento correctamente
          */}
          {productos.map((producto) => (
            <ProductoItem
              key={producto.id}
              nombre={producto.nombre}
              precio={producto.precio}
              disponible={producto.disponible}
            />
          ))}
        </ul>
      )}
    </section>
  )
}

export default ListaProductos
