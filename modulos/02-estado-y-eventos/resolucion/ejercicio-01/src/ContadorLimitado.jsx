/* =========================================================
   ContadorLimitado — useState con límites y color condicional
   Ejercicio 01: Contador con Límites

   📖 ¿Qué hace?
   Muestra un número que se incrementa/decrementa con botones
   respetando límites (0-10). Cambia de color según el valor.

   🔑 Conceptos NUEVOS:
   - useState: hook que agrega estado a un componente funcional
     Recibe un valor inicial y devuelve [valor, setter]
     Cuando el estado cambia, React RE-RENDERIZA el componente
   - Eventos: onClick en botones, onChange en inputs
   - Renderizado condicional con operador ternario
   - Prop disabled: deshabilita botones cuando corresponde
   
   📚 Referencias:
   - react.dev/learn/state-a-components-memory
   - react.dev/reference/react/useState
   - react.dev/learn/responding-to-events
   ========================================================= */

import { useState } from 'react'

/* 
   useState es un HOOK de React.
   Reglas de hooks:
   1. Solo se llaman en componentes funcionales (no en funciones comunes)
   2. Solo se llaman en el NIVEL MÁS ALTO (no dentro de if, for, funciones anidadas)
   3. El orden de llamada debe ser el MISMO en cada render
   
   react.dev/reference/react#rules-of-hooks
*/

function ContadorLimitado() {
  /* 
    useState(valorInicial) devuelve un array con 2 elementos:
    [0] → el VALOR ACTUAL del estado
    [1] → una FUNCIÓN para actualizarlo (setter)
    
    const [cuenta, setCuenta] = useState(0)
    //  cuenta = 0       ← valor actual
    //  setCuenta(5)     ← actualiza el estado a 5
    //
    // Cuando se llama a setCuenta(5):
    // 1. React actualiza el estado internamente
    // 2. React RE-RENDERIZA el componente
    // 3. cuenta ahora ES 5 en el nuevo render
    //
    // 📚 NOTA: el estado es INMUTABLE. No hacemos cuenta = 5.
    // Solo se actualiza con el setter.
  */
  const [cuenta, setCuenta] = useState(0)

  const MIN = 0
  const MAX = 10

  /*
    Función que incrementa la cuenta.
    Solo si no hemos alcanzado el máximo.
    
    📚 NOTA: ¿Por qué usamos una función en setCuenta?
    setCuenta(prev => prev + 1)
    
    Cuando el nuevo estado DEPENDE del anterior,
    es más seguro pasar una FUNCIÓN ACTUALIZADORA.
    Esto evita bugs con "stale closures" cuando hay
    múltiples actualizaciones en el mismo render.
    
    En este caso, podríamos usar setCuenta(cuenta + 1)
    porque la actualización es simple. Pero es buena
    práctica usar la función actualizadora cuando
    el nuevo valor deriva del anterior.
  */
  function incrementar() {
    if (cuenta < MAX) {
      setCuenta(c => c + 1)
    }
  }

  function decrementar() {
    if (cuenta > MIN) {
      setCuenta(c => c - 1)
    }
  }

  function reiniciar() {
    setCuenta(0)
  }

  /*
    Determinamos la clase de color según el valor de cuenta.
    Esto se recalcula en CADA render (cuando cambia el estado).
    
    Regla de color:
    - Verde (< 5): seguro
    - Amarillo (5-8): atención
    - Rojo (9-10): peligro
  */
  let claseColor = 'contador--seguro'
  if (cuenta >= 9) {
    claseColor = 'contador--peligro'
  } else if (cuenta >= 5) {
    claseColor = 'contador--atencion'
  }

  return (
    <div className="contador-limitado">
      <h2 className="contador-limitado__titulo">Contador con Límites</h2>

      {/* 
        className dinámico: concatenamos la clase base + la clase de color.
        Si cuenta es 5, el className será "contador-limitado__numero contador--atencion".
      */}
      <p className={`contador-limitado__numero ${claseColor}`}>
        {cuenta}
      </p>

      <p className="contador-limitado__info">
        Límite: {MIN} – {MAX}
      </p>

      <div className="contador-limitado__botones">
        {/*
          Botón "-": deshabilitado cuando cuenta === MIN.
          disabled={true} → el botón no responde clics.
          disabled={false} → el botón funciona normalmente.
        */}
        <button
          onClick={decrementar}
          disabled={cuenta === MIN}
          className="contador-limitado__btn contador-limitado__btn--menos"
          aria-label="Decrementar"
        >
          –
        </button>

        <button
          onClick={reiniciar}
          className="contador-limitado__btn contador-limitado__btn--reiniciar"
          aria-label="Reiniciar"
        >
          Reiniciar
        </button>

        {/*
          Botón "+": deshabilitado cuando cuenta === MAX.
        */}
        <button
          onClick={incrementar}
          disabled={cuenta === MAX}
          className="contador-limitado__btn contador-limitado__btn--mas"
          aria-label="Incrementar"
        >
          +
        </button>
      </div>
    </div>
  )
}

export default ContadorLimitado
