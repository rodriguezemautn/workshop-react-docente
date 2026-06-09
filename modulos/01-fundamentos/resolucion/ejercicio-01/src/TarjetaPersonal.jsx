/* =========================================================
   TarjetaPersonal — Componente funcional con props
   Ejercicio 01: Mi Primer Componente
   
   📖 ¿Qué hace?
   Recibe 3 props (nombre, edad, ciudad) y las muestra
   en una tarjeta visual.
   
   🔑 Conceptos:
   - Componente funcional: función que retorna JSX
   - Props: datos que llegan del padre (solo lectura)
   - Destructuring: extraemos props en los parámetros
   - JSX: { } para evaluar expresiones JS
   ========================================================= */

function TarjetaPersonal({ nombre, edad, ciudad }) {
  return (
    <article className="tarjeta-personal">
      <span className="tarjeta-personal__avatar" role="img" aria-label="avatar">
        👤
      </span>
      <h3 className="tarjeta-personal__nombre">{nombre}</h3>
      <p className="tarjeta-personal__dato">Edad: {edad} años</p>
      <p className="tarjeta-personal__dato">Ciudad: {ciudad}</p>
    </article>
  )
}

export default TarjetaPersonal
