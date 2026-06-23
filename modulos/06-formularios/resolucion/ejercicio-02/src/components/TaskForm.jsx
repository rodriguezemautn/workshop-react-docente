import { useState } from 'react'
import { useForm } from 'react-hook-form'

/*
 * ============================================
 *  TaskForm — Validación Personalizada con RHF
 * ============================================
 *
 * 📌 Conceptos clave que se practican acá:
 *   - Validación personalizada con `validate`
 *   - Validación cruzada contra datos existentes (props)
 *   - `watch` para contador de caracteres en tiempo real
 *   - `maxLength` con mensaje de error
 *   - Simulación de validación asíncrona
 *
 * 📋 Reglas de validación:
 *   1. Título requerido + mínimo 3 caracteres
 *   2. Título único (no puede repetirse con tareas existentes)
 *   3. No solo espacios
 *   4. Máximo 50 caracteres
 *   5. Contador "X/50" en tiempo real
 */

function TaskForm({ tareasExistentes, onAgregarTarea }) {
  const [validando, setValidando] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm()

  const titulo = watch('titulo', '')

  /*
   * onSubmit con validación asíncrona simulada.
   *
   * La validación asíncrona es útil para checkear disponibilidad
   * en un servidor (ej: nombre de usuario, email). Acá simulamos
   * con un setTimeout de 500ms.
   *
   * En un caso real usarías validate async en register:
   *   validate: async (value) => {
   *     const res = await fetch(`/api/disponible?q=${value}`)
   *     return res.ok || 'No disponible'
   *   }
   */
  async function onSubmit(data) {
    setValidando(true)

    // Simulamos validación asíncrona contra un servidor
    await new Promise(resolve => setTimeout(resolve, 500))

    onAgregarTarea(data.titulo)
    reset()
    setValidando(false)
  }

  return (
    <div className="task-form">
      <h2 className="task-form__titulo">Agregar Tarea</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="task-form__form" noValidate>
        <div className="task-form__campo">
          <label className="task-form__label" htmlFor="titulo">
            Título
          </label>

          <input
            id="titulo"
            className={`task-form__input ${errors.titulo ? 'task-form__input--error' : ''}`}
            type="text"
            placeholder="Ej: Estudiar React"
            maxLength={50}
            {...register('titulo', {
              required: 'El título es obligatorio',
              minLength: {
                value: 3,
                message: 'El título debe tener al menos 3 caracteres',
              },
              maxLength: {
                value: 50,
                message: 'Máximo 50 caracteres',
              },
              /*
               * validate recibe una FUNCIÓN que retorna:
               *   - true → válido
               *   - string → mensaje de error
               *
               * Podemos encadenar múltiples validaciones chequeando
               * condiciones una por una.
               */
              validate: {
                noSoloEspacios: value =>
                  value.trim().length > 0 || 'El título no puede ser solo espacios',

                tituloUnico: value => {
                  if (!value.trim()) return true // ya lo valida 'required'
                  const existe = tareasExistentes.some(
                    t => t.toLowerCase() === value.trim().toLowerCase()
                  )
                  return !existe || 'Esta tarea ya existe'
                },
              },
            })}
          />

          {/* Contador de caracteres en tiempo real */}
          <div className="task-form__contador">
            {titulo.length}/50
          </div>

          {errors.titulo && (
            <span className="task-form__error">{errors.titulo.message}</span>
          )}
        </div>

        <button
          type="submit"
          className="task-form__btn"
          disabled={validando}
        >
          {validando ? 'Verificando...' : 'Agregar Tarea'}
        </button>
      </form>
    </div>
  )
}

export default TaskForm
