import { useState, useEffect, useRef } from 'react'

/*
 * ============================================
 *  Cronometro — setInterval con cleanup
 * ============================================
 *
 * 📌 Conceptos clave que se practican acá:
 *   - `useEffect` con `setInterval` para actualizaciones periódicas
 *   - Función de cleanup: `return () => clearInterval(id)`
 *   - `useRef` para preservar el ID del intervalo entre renders
 *   - Estados de botones (disabled según el estado)
 *   - Formateo de tiempo desde milisegundos
 *
 * 🔍 Flujo de datos:
 *   1. Usuario hace clic en "Iniciar"
 *   2. Se setea `corriendo: true`
 *   3. El useEffect detecta que corriendo cambió a true
 *   4. Arranca un setInterval cada 10ms
 *   5. Cada tick suma 10ms al tiempo
 *   6. Al hacer clic en "Pausar", corriendo → false
 *   7. El cleanup del useEffect mata el intervalo
 *   8. Al hacer clic en "Reiniciar", tiempo → 0 y corriendo → false
 *
 * ⚠️ Por qué usamos useRef para el intervalo:
 *   Si guardáramos el intervalId en una variable común, se perdería
 *   en cada re-render. useRef nos da una "caja" que persiste entre
 *   renders sin causar re-renders cuando cambia.
 *
 * ⚠️ Por qué separamos corriendo y tiempo:
 *   Si usáramos un solo objeto { corriendo, tiempo }, al actualizar
 *   tendríamos que pensar en merges. Con dos estados separados,
 *   cada uno se actualiza independientemente y es más fácil de
 *   razonar.
 */

function Cronometro() {
  const [corriendo, setCorriendo] = useState(false)
  const [tiempo, setTiempo] = useState(0) // en milisegundos

  /*
   * useRef para mantener el ID del intervalo.
   *
   * No usamos esto como dependencia del efecto porque justamente
   * queremos que el intervalo NO cambie cuando el ref cambia.
   * El ref es transparente para React — cambiar .current NO
   * causa re-renders y NO dispara efectos.
   */
  const intervaloRef = useRef(null)

  /*
   * useEffect que maneja el ciclo de vida del intervalo.
   *
   * Este es el corazón del ejercicio. Notá:
   *   - Dependencia: [corriendo] — solo se ejecuta cuando cambia
   *   - Si corriendo es true, ARRANCA el intervalo
   *   - Si corriendo es false, el cleanup (que siempre corre) lo mata
   *   - El return es la función de cleanup, que se ejecuta:
   *       a) Cuando el componente se desmonta (previene memory leaks)
   *       b) Antes de re-ejecutar el efecto si cambia la dependencia
   *
   * 🧪 Probá descomentar el return y fijate qué pasa cuando
   *    cambiás de página con el cronómetro corriendo — el intervalo
   *    sigue ejecutándose en memoria. Eso es un MEMORY LEAK.
   */
  useEffect(() => {
    if (corriendo) {
      intervaloRef.current = setInterval(() => {
        setTiempo(t => t + 10) // actualización cada 10ms
      }, 10)
    }

    // CLEANUP: se ejecuta al desmontar o antes de re-ejecutar
    return () => {
      if (intervaloRef.current) {
        clearInterval(intervaloRef.current)
        intervaloRef.current = null
      }
    }
  }, [corriendo])

  function iniciar() {
    setCorriendo(true)
  }

  function pausar() {
    setCorriendo(false)
  }

  function reiniciar() {
    setCorriendo(false)
    setTiempo(0)
  }

  /*
   * Formateo del tiempo desde milisegundos a MM:SS:cc
   *
   *   - minutos: tiempo / 60000 (1 min = 60000ms)
   *   - segundos: (tiempo / 1000) % 60
   *   - centésimas: (tiempo % 1000) / 10
   *
   * padStart(2, '0') asegura que siempre tenga 2 dígitos,
   * así evitamos cosas como "1:2:3" en vez de "01:02:03"
   */
  const centesimas = String(Math.floor((tiempo % 1000) / 10)).padStart(2, '0')
  const segundos = String(Math.floor((tiempo / 1000) % 60)).padStart(2, '0')
  const minutos = String(Math.floor(tiempo / 60000)).padStart(2, '0')

  return (
    <div className="cronometro">
      <h2 className="cronometro__titulo">Cronómetro</h2>

      {/* 
        El color del tiempo cambia según el estado:
        - Verde: corriendo
        - Rojo: pausado
      */}
      <div
        className={`cronometro__display ${corriendo ? 'cronometro__display--corriendo' : ''}`}
      >
        {minutos}:{segundos}:{centesimas}
      </div>

      <div className="cronometro__botones">
        <button
          className="cronometro__btn cronometro__btn--iniciar"
          onClick={iniciar}
          disabled={corriendo}
        >
          {tiempo === 0 ? 'Iniciar' : 'Reanudar'}
        </button>

        <button
          className="cronometro__btn cronometro__btn--pausar"
          onClick={pausar}
          disabled={!corriendo}
        >
          Pausar
        </button>

        <button
          className="cronometro__btn cronometro__btn--reiniciar"
          onClick={reiniciar}
        >
          Reiniciar
        </button>
      </div>
    </div>
  )
}

export default Cronometro
