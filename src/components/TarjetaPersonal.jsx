/* =========================================================
   TarjetaPersonal — Componente funcional básico con props
   Módulo 01: Fundamentos de React
   =========================================================

   📖 ¿Qué es este componente?
   ────────────────────────────
   "TarjetaPersonal" es un componente FUNCIONAL que recibe
   datos a través de PROPS y los renderiza con JSX.
   
   Es el componente más simple posible en React:
   - Es una función que retorna JSX
   - Recibe un objeto 'props' como argumento
   - NO tiene estado interno (componente "stateless" o "dumb")
   - Es puro: mismo input → mismo output

   🔑 Conceptos clave que muestra:
   ─────────────────────────────────
   1. COMPONENTE FUNCIONAL: función que retorna JSX.
      Los componentes son los bloques de construcción de
      cualquier UI en React (react.dev/learn/your-first-component).
   
   2. PROPS: objeto que recibe datos del componente padre.
      Las props son de SOLO LECTURA (inmutables).
      El flujo de datos en React es UNIDIRECCIONAL:
      siempre de PADRE → HIJO (react.dev/learn/passing-props-to-a-component).
   
   3. DESTRUCTURING: extraemos las props directamente
      en los parámetros: { nombre, edad, ciudad }
      Es una forma más limpia que props.nombre.

   4. JSX: JavaScript + XML. Permite escribir HTML dentro
      de JavaScript. Reglas clave:
      - Un solo elemento raíz (usamos <>...</> fragment)
      - className en vez de class
      - Expresiones JS con llaves { }
      - Todas las etiquetas deben cerrarse (react.dev/learn/writing-markup-with-jsx)

   🚀 ¿Cómo crear una app React desde cero?
   ─────────────────────────────────────────
   Paso 1: npm create vite@latest taskify -- --template react
   Paso 2: cd taskify && npm install
   Paso 3: npm run dev (abre http://localhost:5173)
   
   Vite es la herramienta oficial recomendada por React
   (react.dev/learn/start-a-new-react-project).
   Next.js y Remix también son opciones recomendadas para
   apps full-stack, pero Vite es la ideal para empezar.

   📚 Referencias:
   ────────────────
   - react.dev/learn/your-first-component
   - react.dev/learn/passing-props-to-a-component
   - react.dev/learn/writing-markup-with-jsx
   - vitejs.dev/guide/
   ========================================================= */

/**
 * TarjetaPersonal - Muestra datos de una persona en una tarjeta
 * 
 * @param {string}  nombre   - Nombre completo (ej: "Ana García")
 * @param {number}  edad     - Edad en años (ej: 25)
 * @param {string}  ciudad   - Ciudad de residencia (ej: "Buenos Aires")
 * 
 * @returns {JSX.Element} Tarjeta visual con los datos personales
 * 
 * USO:
 *   <TarjetaPersonal
 *     nombre="Ana García"
 *     edad={25}
 *     ciudad="Buenos Aires"
 *   />
 */
function TarjetaPersonal({ nombre, edad, ciudad }) {
  return (
    <article className="tarjeta-personal">
      <header className="tarjeta-personal__header">
        {/* 🧑 Emoji representativo — detalle visual sin lógica */}
        <span className="tarjeta-personal__avatar" role="img" aria-label="avatar">
          👤
        </span>
        <h3 className="tarjeta-personal__nombre">{nombre}</h3>
      </header>

      <ul className="tarjeta-personal__datos">
        {/* 
          Mostramos edad en formato "X años".
          Notar las llaves {} para evaluar expresiones JS dentro de JSX.
          {edad} es una expresión que React evalúa y convierte a string.
        */}
        <li className="tarjeta-personal__item">
          <span className="tarjeta-personal__label">Edad:</span>
          <span>{edad} años</span>
        </li>
        <li className="tarjeta-personal__item">
          <span className="tarjeta-personal__label">Ciudad:</span>
          <span>{ciudad}</span>
        </li>
      </ul>
    </article>
  )
}

export default TarjetaPersonal
