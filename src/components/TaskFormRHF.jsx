/* =========================================================
   TaskFormRHF — Formulario de tareas con React Hook Form
   Módulo 06: Formularios
   =========================================================

   📖 ¿Qué es este componente?
   ────────────────────────────
   Reimplementa el TaskForm (formulario de agregar tareas)
   usando React Hook Form con validación avanzada:
   - Título requerido (mín 3, máx 50 caracteres)
   - Validación personalizada: título ÚNICO
   - Contador de caracteres en tiempo real

   🔑 Conceptos avanzados de RHF:
   ─────────────────────────────────
   1. VALIDACIÓN PERSONALIZADA con validate:
      La opción validate recibe una FUNCIÓN que debe
      retornar true (válido) o un string (error).
      
      register('titulo', {
        validate: (value) => {
          if (condicion) return 'Mensaje de error'
          return true
        }
      })

   2. VALIDACIÓN ASÍNCRONA (simulada):
      validate puede ser ASÍNCRONA:
      
      validate: async (value) => {
        const disponible = await verificarDisponibilidad(value)
        return disponible || 'No disponible'
      }

   3. watch() — Observar cambios en tiempo real:
      const titulo = watch('titulo')
      Se actualiza en CADA cambio y se puede usar para
      mostrar contadores, previews, etc.
      
      ⚠️ watch CAUSA re-renders (a diferencia de register
      solo). Usar con cuidado en formularios grandes.

   4. Limpiar errores al escribir (mode: 'onChange'):
      Por defecto RHF valida en onSubmit. Pero podemos
      configurarlo para validar en onChange (cada tecla)
      o onBlur (al salir del campo).

   📚 Referencias:
   ────────────────
   - react-hook-form.com/docs/useform/register
   - react-hook-form.com/docs/useform/watch
   - react-hook-form.com/docs/useform/formstate
   - react-hook-form.com/docs/useform/clearerrors
   ========================================================= */

import { useForm } from 'react-hook-form'

/**
 * TaskFormRHF - Formulario de tareas con RHF + validación personalizada
 * 
 * @param {Function} onAgregar   - Callback para agregar tarea
 * @param {Array}    tareas      - Tareas existentes (para validar unicidad)
 * 
 * USO:
 *   <TaskFormRHF onAgregar={agregarTarea} tareas={tareas} />
 */
function TaskFormRHF({ onAgregar, tareas = [] }) {
  /* 
    useForm con opciones:
    - mode: 'onChange' → valida en CADA cambio (no solo en submit)
      Esto permite que los errores aparezcan/desaparezcan mientras
      el usuario escribe, mejorando la UX.
    
    Sin mode, la validación solo ocurre en handleSubmit.
    Con 'onChange', cada tecla dispara validación.
    
    (react-hook-form.com/docs/useform#mode)
  */
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      titulo: '',
    },
  })

  /* 
    watch('titulo') → observa el valor ACTUAL del campo.
    Se usa para mostrar el contador de caracteres.
    
    Cada vez que el usuario escribe, el contador se actualiza.
    ⚠️ watch CAUSA re-renders. Para formularios grandes con
    muchos campos, considerar useWatch() que es más selectivo.
  */
  const tituloActual = watch('titulo')
  const caracteresActuales = tituloActual?.length || 0
  const MAX_CARACTERES = 50

  /* 
    onSubmit — Solo se ejecuta si todas las validaciones pasan.
    
    RHF ya validó:
    - required → no vacío
    - minLength → al menos 3 caracteres
    - maxLength → máximo 50 caracteres
    - validate → título único
    
    Si llegamos acá, todo OK.
  */
  function onSubmit(data) {
    onAgregar({
      id: Date.now(),
      titulo: data.titulo.trim(),
      completada: false,
    })
    reset() // Limpia el formulario
  }

  return (
    <section className="formulario-rhf">
      <h3 className="formulario-rhf__titulo">
        ✏️ Nueva Tarea (React Hook Form)
      </h3>

      <form className="formulario-rhf__form" onSubmit={handleSubmit(onSubmit)}>
        <div className="formulario-rhf__campo">
          <div className="formulario-rhf__label-row">
            <label htmlFor="task-titulo">Título de la tarea</label>
            {/*
              Contador de caracteres en tiempo real.
              Muestra "5/50" mientras el usuario escribe.
              Si se acerca al límite, cambia de color.
              
              Sin RHF, necesitaríamos un estado extra:
                const [caracteres, setCaracteres] = useState(0)
                onChange={(e) => setCaracteres(e.target.value.length)}
              
              Con RHF y watch, es automático.
            */}
            <span
              className={`formulario-rhf__contador ${
                caracteresActuales > MAX_CARACTERES - 10
                  ? 'formulario-rhf__contador--alerta'
                  : ''
              } ${caracteresActuales >= MAX_CARACTERES ? 'formulario-rhf__contador--limite' : ''}`}
            >
              {caracteresActuales}/{MAX_CARACTERES}
            </span>
          </div>

          <input
            id="task-titulo"
            type="text"
            placeholder="¿Qué tenés que hacer? (ej: Estudiar useEffect)"
            className={errors.titulo ? 'input--error' : ''}
            {...register('titulo', {
              /* 
                Reglas de validación ESTÁNDAR:
                - required: campo obligatorio
                - minLength: longitud mínima
                - maxLength: longitud máxima
              */
              required: 'El título es obligatorio',
              minLength: {
                value: 3,
                message: 'El título debe tener al menos 3 caracteres',
              },
              maxLength: {
                value: MAX_CARACTERES,
                message: `Máximo ${MAX_CARACTERES} caracteres`,
              },
              /* 
                VALIDACIÓN PERSONALIZADA — validate
                
                Recibe el valor actual del campo.
                Debe retornar:
                - true → pasa (válido)
                - string → mensaje de error
                
                Acá verificamos:
                1. Que no sea solo espacios (trim + length > 3)
                2. Que no exista ya (comparación case-insensitive)
                
                ⚠️ NOTA: tareas se pasa como prop desde App.
                Si el array es muy grande (10k+), esta validación
                podría ser lenta. En producción se usaría una
                búsqueda optimizada o validación del lado del servidor.
              */
              validate: (value) => {
                // Validación 1: no solo espacios
                if (!value.trim()) {
                  return 'El título no puede ser solo espacios'
                }

                // Validación 2: título único (case insensitive)
                const tituloRepetido = tareas.some(
                  (t) => t.titulo.toLowerCase() === value.trim().toLowerCase()
                )
                if (tituloRepetido) {
                  return 'Esta tarea ya existe'
                }

                // Todo OK
                return true
              },
            })}
          />

          {/*
            Renderizado de errores.
            errors.titulo tiene:
            - type: 'required' | 'minLength' | 'maxLength' | 'validate'
            - message: string que definimos en la regla
            
            Mostramos SOLO el primer error (porque los validamos
            en orden y el primero que falla es el que se muestra).
          */}
          {errors.titulo && (
            <span className="formulario-rhf__error">
              {/* 
                ⚠️ Múltiples errores? RHF muestra SOLO el primero
                que falla. Si required falla, no muestra minLength.
                Si required pasa pero minLength falla, muestra ese.
              */}
              {errors.titulo.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="formulario-rhf__btn"
          disabled={!isValid || isSubmitting}
        >
          {isSubmitting ? 'Agregando...' : '+ Agregar tarea'}
        </button>
      </form>

      {/* 
        NOTA ACADÉMICA: ¿Cuándo usar RHF vs useState?
        
        USAR RHF cuando:
        - 3+ campos en un formulario
        - Validación compleja (cruzada, asíncrona)
        - Necesitás performance (inputs que no re-renderizan)
        - Formularios dinámicos (arrays de campos)
        
        USAR useState cuando:
        - 1-2 campos simples
        - No necesitás validación
        - El formulario es parte de un componente más grande
          y no vale la pena agregar la dependencia
      */}
    </section>
  )
}

export default TaskFormRHF
