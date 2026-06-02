/* =========================================================
   ContadorLimitado — Contador interactivo con límites
   Módulo 02: Estado y Eventos
   =========================================================

   📖 ¿Qué es este componente?
   ────────────────────────────
   Un contador con botones + y - que no permite bajar de 0
   ni superar 10. Los botones se deshabilitan en los extremos
   y el color del número cambia según se acerque al límite.

   🔑 Conceptos clave que introduce:
   ─────────────────────────────────
   1. useState — El hook FUNDAMENTAL de React para estado.
      useState devuelve un par: [valor, funcionActualizadora].
      El estado es INMUTABLE: nunca lo modificamos directamente.
      (react.dev/reference/react/useState)
      
   2. Manejo de EVENTOS con onClick.
      En React, los eventos se pasan como props: onClick, onChange, etc.
      Se pasan funciones, NO strings (a diferencia de HTML).
      (react.dev/learn/responding-to-events)
      
   3. La prop disabled en botones — vinculada al estado.
      Cuando el contador está en 0, el botón "-" está disabled.
      Cuando está en 10, el botón "+" está disabled.
      Esto mejora la UX al evitar acciones inválidas.

   4. ESTILOS DINÁMICOS según el estado.
      Usamos className condicional para cambiar el color:
      - Verde (< 5): seguro
      - Amarillo (5-8):接近 al límite
      - Rojo (9-10): cerca del máximo
      Esto se logra con operadores ternarios y lógica booleana.

   📚 Referencias:
   ────────────────
   - react.dev/reference/react/useState
   - react.dev/learn/responding-to-events
   - react.dev/learn/state-a-components-memory
   - react.dev/learn/conditional-rendering
   ========================================================= */

import { useState } from 'react'

/**
 * ContadorLimitado - Contador con límite mínimo (0) y máximo (10)
 * 
 * Estado interno:
 *   - cuenta: number — valor actual del contador
 *   - setCuenta: función que actualiza el estado
 * 
 * NO recibe props. El estado es INTERNO del componente.
 * Esto es "estado local" vs "props" que vienen del padre.
 * 
 * USO:
 *   <ContadorLimitado />
 */
function ContadorLimitado() {
  /* 
    useState(0) — Inicializamos el estado con valor 0.
    
    📚 NOTA ACADÉMICA:
    El argumento de useState es el VALOR INICIAL.
    Solo se usa en el PRIMER render. En renders
    siguientes, React ignora el valor inicial y
    usa el valor actual del estado.
    
    Alternativa: función lazy initializer:
      useState(() => {
        // Cálculo costoso — solo se ejecuta UNA vez
        return valorCalculado
      })
    
    Esta forma es útil cuando el valor inicial requiere
    un cálculo pesado (como leer de localStorage).
    (react.dev/reference/react/useState#parameters)
  */
  const [cuenta, setCuenta] = useState(0)

  /* 
    Límites del contador.
    Están hardcodeados, pero podrían ser props si
    quisieramos un contador reutilizable con límites
    configurables.
  */
  const MIN = 0
  const MAX = 10

  /* 
    Botones deshabilitados según el valor actual.
    Usamos valores booleanos que vinculamos a la prop
    disabled de los botones HTML.
  */
  const estaEnMinimo = cuenta === MIN
  const estaEnMaximo = cuenta === MAX

  /* 
    Función para incrementar el contador.
    Se ejecuta cuando el usuario hace clic en "+".
    
    ⚠️ NOTA ACADÉMICA — INMUTABILIDAD:
    
    ❌ INCORRECTO: cuenta++  (muta el valor)
    ❌ INCORRECTO: setCuenta(cuenta++)  (muta y actualiza)
    
    ✅ CORRECTO: setCuenta(cuenta + 1)  (nuevo valor)
    ✅ CORRECTO: setCuenta(prev => prev + 1)  (callback con valor previo)
    
    La forma con callback (prev => prev + 1) es más segura
    cuando la nueva dependencia del valor ANTERIOR, porque
    React garantiza que 'prev' es el valor más actualizado
    (útil en actualizaciones rápidas y consecutivas).
  */
  function incrementar() {
    if (!estaEnMaximo) {
      // Pasamos un nuevo valor — NO mutamos el estado
      setCuenta(cuenta + 1)
    }
  }

  function decrementar() {
    if (!estaEnMinimo) {
      setCuenta(cuenta - 1)
    }
  }

  function reiniciar() {
    /* 
      setCuenta(0) — valor fijo.
      No necesitamos callback porque el nuevo valor
      no depende del valor anterior.
    */
    setCuenta(0)
  }

  /* 
    Color dinámico según el valor del contador.
    Esto es lógica de PRESENTACIÓN que determina
    una clase CSS según el estado.
    
    Patrón común en React: función que mapea estado → clase.
  */
  function obtenerColor() {
    if (cuenta < 5) return 'contador--seguro'
    if (cuenta <= 8) return 'contador--atencion'
    return 'contador--peligro'
  }

  return (
    <section className="contador-limitado">
      <h3 className="contador-limitado__titulo">Contador Limitado</h3>

      {/* 
        Muestra el valor actual con clase dinámica de color.
        La clase se evalúa en CADA render, por lo que el color
        se actualiza automáticamente al cambiar la cuenta.
      */}
      <p className={`contador-limitado__numero ${obtenerColor()}`}>
        {cuenta}
      </p>

      <p className="contador-limitado__info">
        Límites: {MIN} — {MAX}
      </p>

      <div className="contador-limitado__botones">
        {/* 
          Botón "-" se deshabilita cuando cuenta === MIN.
          La prop disabled es booleana: true/false.
          Cuando está deshabilitado, el cursor cambia a not-allowed
          y el click no dispara el evento.
        */}
        <button
          onClick={decrementar}
          disabled={estaEnMinimo}
          className="contador-limitado__btn contador-limitado__btn--menos"
          aria-label="Decrementar"
        >
          −
        </button>

        {/* 
          Botón "+" se deshabilita cuando cuenta === MAX.
        */}
        <button
          onClick={incrementar}
          disabled={estaEnMaximo}
          className="contador-limitado__btn contador-limitado__btn--mas"
          aria-label="Incrementar"
        >
          +
        </button>

        {/* 
          Botón Reiniciar — siempre habilitado.
          No necesita disabled porque reiniciar siempre es válido.
        */}
        <button
          onClick={reiniciar}
          className="contador-limitado__btn contador-limitado__btn--reiniciar"
        >
          Reiniciar
        </button>
      </div>
    </section>
  )
}

export default ContadorLimitado
