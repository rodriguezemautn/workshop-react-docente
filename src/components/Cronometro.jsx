/* =========================================================
   Cronometro — Temporizador con setInterval y cleanup
   Módulo 04: Efectos Secundarios y Persistencia
   =========================================================

   📖 ¿Qué es este componente?
   ────────────────────────────
   Un cronómetro con botones Iniciar, Pausar y Reiniciar.
   Muestra el tiempo en formato MM:SS:cs (minutos:segundos:
   centésimas). Usa setInterval dentro de useEffect con
   función de cleanup para evitar memory leaks.

   🔑 Conceptos clave que introduce:
   ─────────────────────────────────
   1. useEffect CON CLEANUP:
      
      useEffect(() => {
        const intervalo = setInterval(() => { ... }, 10)
        return () => clearInterval(intervalo) ← CLEANUP
      }, [condicion])
      
      La función de cleanup se ejecuta cuando:
      - El componente se DESMONTA (navegar a otra página)
      - Las dependencias CAMBIAN (antes del nuevo efecto)
      
      Sin cleanup, el setInterval sigue ejecutándose en
      memoria aunque el componente ya no exista.
      ¡ESTO ES UN MEMORY LEAK!
      
      (react.dev/reference/react/useEffect#cleaning-up-an-effect)

   2. DEPENDENCIAS CONDICIONALES:
      useEffect se ejecuta SOLO cuando corriendo es true.
      Si corriendo es false, el cleanup limpia el intervalo.
      
      Esto evita tener múltiples intervalos acumulados.

   3. useRef para VALORES QUE PERSISTEN ENTRE RENDERS:
      Aunque no lo usamos aquí (podríamos para el tiempo),
      useRef es la alternativa cuando necesitamos un valor
      que NO dispare re-renders al cambiar.
      
      (react.dev/reference/react/useRef)

   4. FORMATO DE TIEMPO:
      Trabajamos con milisegundos y formateamos a:
      - Centésimas: Math.floor((tiempo % 1000) / 10)
      - Segundos: Math.floor((tiempo / 1000) % 60)
      - Minutos: Math.floor(tiempo / 60000)
      
      Con padStart(2, '0') para mantener 2 dígitos.

   📚 Referencias:
   ────────────────
   - react.dev/reference/react/useEffect
   - react.dev/learn/synchronizing-with-effects
   - react.dev/learn/lifecycle-of-reactive-effects
   - developer.mozilla.org/es/docs/Web/API/setInterval
   - developer.mozilla.org/es/docs/Web/API/clearInterval
   ========================================================= */

import { useState, useEffect, useRef } from 'react'

function Cronometro() {
  /* 
    Estado del cronómetro.
    En vez de tener múltiples estados (tiempo, corriendo),
    agrupamos en un objeto para mantenerlo cohesivo.
    
    Estructura:
    - tiempo: number — milisegundos transcurridos
    - corriendo: boolean — true si está activo
  */
  const [estado, setEstado] = useState({
    tiempo: 0,
    corriendo: false,
  })

  /* 
    useRef para persistir el ID del intervalo entre renders.
    
    ¿Por qué useRef y no useState?
    - El ID del intervalo NO afecta la UI
    - Cambiar useRef NO dispara re-renders
    - El valor persiste entre renders (como useState)
    - Es la herramienta correcta para "valores mutables
      que no afectan el output visual"
    
    (react.dev/reference/react/useRef)
  */
  const intervaloRef = useRef(null)

  /* 
    useEffect con DEPENDENCIA CONDICIONAL.
    
    Se ejecuta cuando estado.corriendo cambia:
    - Si pasa a true → inicia el intervalo (cada 10ms)
    - Si pasa a false → limpia el intervalo
    
    ⚠️ La función de cleanup (return) es la que previene
    memory leaks. Sin ella, al pausar/reiniciar se acumularían
    intervalos en memoria.
    
    (react.dev/reference/react/useEffect#cleaning-up-an-effect)
  */
  useEffect(() => {
    if (estado.corriendo) {
      /* 
        setInterval cada 10ms para capturar centésimas.
        1000ms / 10ms = 100 frames (suficiente para centésimas).
        
        IMPORTANTE: usamos la forma FUNCIÓN de setEstado para
        actualizar el tiempo:
          setEstado(prev => ({ ...prev, tiempo: prev.tiempo + 10 }))
        
        Esto garantiza que siempre tomamos el VALOR MÁS RECIENTE
        de tiempo, incluso si hay múltiples actualizaciones rápidas.
        
        Si usáramos estado.tiempo directamente, tomaría el valor
        del momento en que se CREÓ el intervalo (stale closure).
        (react.dev/learn/queueing-a-series-of-state-updates)
      */
      intervaloRef.current = setInterval(() => {
        setEstado((prev) => ({
          ...prev,
          tiempo: prev.tiempo + 10, // 10ms por tick
        }))
      }, 10) // Cada 10 milisegundos
    }

    /* 
      CLEANUP: se ejecuta al desmontar O al cambiar dependencias.
      Sin esto, al poner pausa el intervalo sigue activo.
    */
    return () => {
      if (intervaloRef.current) {
        clearInterval(intervaloRef.current)
        intervaloRef.current = null
      }
    }
  }, [estado.corriendo]) // Solo se re-ejecuta cuando 'corriendo' cambia

  /* 
    Iniciar el cronómetro.
    Solo funciona si NO está corriendo (evita intervalos duplicados).
  */
  function iniciar() {
    if (!estado.corriendo) {
      setEstado((prev) => ({ ...prev, corriendo: true }))
    }
  }

  /* 
    Pausar el cronómetro.
    Solo funciona si ESTÁ corriendo.
    El cleanup del useEffect se encarga de limpiar el intervalo.
  */
  function pausar() {
    if (estado.corriendo) {
      setEstado((prev) => ({ ...prev, corriendo: false }))
    }
  }

  /* 
    Reiniciar el cronómetro.
    Detiene y vuelve el tiempo a 0.
    El cleanup del useEffect limpia el intervalo automáticamente.
  */
  function reiniciar() {
    setEstado({ tiempo: 0, corriendo: false })
  }

  /* 
    Formateo del tiempo.
    
    Calculamos minutos, segundos y centésimas a partir de
    los milisegundos totales.
    
    Fórmulas:
    - Centésimas: (tiempo % 1000) / 10
      Tomamos el resto de dividir por 1000 (milisegundos
      sobrantes) y dividimos por 10 para convertir a centésimas.
    
    - Segundos: (tiempo / 1000) % 60
      Convertimos a segundos y tomamos el módulo 60 para
      obtener solo los segundos (no minutos).
    
    - Minutos: tiempo / 60000
      Dividimos por 60000 (60s * 1000ms).
    
    padStart(2, '0') asegura que siempre haya 2 dígitos:
    5 → "05", 23 → "23", 0 → "00"
  */
  const centesimas = Math.floor((estado.tiempo % 1000) / 10)
  const segundos = Math.floor((estado.tiempo / 1000) % 60)
  const minutos = Math.floor(estado.tiempo / 60000)

  const tiempoFormateado = [
    String(minutos).padStart(2, '0'),
    String(segundos).padStart(2, '0'),
    String(centesimas).padStart(2, '0'),
  ].join(':') // "MM:SS:cs"

  return (
    <section className="cronometro">
      <h3 className="cronometro__titulo">Cronómetro</h3>

      {/* 
        Display del tiempo con clase dinámica de color.
        - Verde: corriendo
        - Rojo: pausado
      */}
      <p
        className={`cronometro__display ${
          estado.corriendo ? 'cronometro--activo' : 'cronometro--pausado'
        }`}
      >
        {tiempoFormateado}
      </p>

      <div className="cronometro__botones">
        {/* 
          Botón INICIAR.
          Se deshabilita cuando ya está corriendo para
          evitar intervalos duplicados.
        */}
        <button
          onClick={iniciar}
          disabled={estado.corriendo}
          className="cronometro__btn cronometro__btn--iniciar"
        >
          {estado.tiempo === 0 ? '▶ Iniciar' : '▶ Reanudar'}
        </button>

        {/* 
          Botón PAUSAR.
          Solo visible/habilitado cuando está corriendo.
        */}
        <button
          onClick={pausar}
          disabled={!estado.corriendo}
          className="cronometro__btn cronometro__btn--pausar"
        >
          ⏸ Pausar
        </button>

        {/* 
          Botón REINICIAR.
          Siempre visible, pero se deshabilita si ya está en 0.
        */}
        <button
          onClick={reiniciar}
          disabled={estado.tiempo === 0}
          className="cronometro__btn cronometro__btn--reiniciar"
        >
          ↺ Reiniciar
        </button>
      </div>

      {/* 
        NOTA ACADÉMICA sobre cleanup visible.
        Al desmontar este componente (ej: cambiando de pestaña),
        el cleanup se ejecuta automáticamente.
        Podés probarlo: inicia el cronómetro y descomenta esto:
      */}
      {/* <p className="cronometro__nota">
        💡 Probá cambiar de vista mientras corre.
        useEffect cleanup evita el memory leak.
      </p> */}
    </section>
  )
}

export default Cronometro
