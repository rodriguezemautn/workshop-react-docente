/* =========================================================
   ProductoItem — Componente que renderiza un producto individual
   Módulo 01: Fundamentos de React
   =========================================================

   📖 ¿Qué es este componente?
   ────────────────────────────
   ProductoItem recibe las props de un producto y lo muestra
   visualmente. Es un componente PRESENTACIONAL: solo recibe
   datos y los renderiza, no tiene lógica de negocio.

   🔑 Concepto clave — RENDERIZADO CONDICIONAL:
   ────────────────────────────────────────────
   Usamos el operador ternario para mostrar "Agotado" cuando
   disponible es false. En React no se usan if/else dentro del
   JSX; se usan expresiones:
   
   {condicion ? <verdadero/> : <falso/>}
   
   También se puede usar el operador && para renderizar
   condicionalmente SIN else:
   
   {condicion && <elemento/>}
   
   (react.dev/learn/conditional-rendering)

   📚 Referencias:
   ────────────────
   - react.dev/learn/conditional-rendering
   - react.dev/learn/passing-props-to-a-component
   - developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Conditional_operator
   ========================================================= */

/**
 * ProductoItem - Muestra un producto individual
 * 
 * @param {string}  nombre      - Nombre del producto
 * @param {number}  precio      - Precio en pesos argentinos
 * @param {boolean} disponible  - true si hay stock, false si agotado
 * 
 * USO:
 *   <ProductoItem nombre="Notebook" precio={850000} disponible={true} />
 */
function ProductoItem({ nombre, precio, disponible }) {
  /* 
    Formateamos el precio con toLocaleString() para mostrar
    separadores de miles según la locale argentina.
    Esto es lógica de PRESENTACIÓN — aceptable en un componente.
  */
  const precioFormateado = `$ ${precio.toLocaleString('es-AR')}`

  return (
    <li className={`producto-item ${!disponible ? 'producto-item--agotado' : ''}`}>
      <div className="producto-item__info">
        <span className="producto-item__nombre">{nombre}</span>
        <span className="producto-item__precio">{precioFormateado}</span>
      </div>

      {/* 
        RENDERIZADO CONDICIONAL con operador ternario:
        - Si disponible es true  → muestra "✅ Disponible" en verde
        - Si disponible es false → muestra "❌ Agotado" en rojo
        
        Podríamos haber usado:
          {!disponible && <span className="agotado">❌ Agotado</span>}
        Pero el ternario es más explícito cuando tenemos dos estados.
      */}
      <span className={`producto-item__estado ${disponible ? 'disponible' : 'agotado'}`}>
        {disponible ? '✅ Disponible' : '❌ Agotado'}
      </span>
    </li>
  )
}

export default ProductoItem
