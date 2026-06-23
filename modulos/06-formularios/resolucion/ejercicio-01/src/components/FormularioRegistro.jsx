import { useState } from 'react'
import { useForm } from 'react-hook-form'

/*
 * ============================================
 *  FormularioRegistro — React Hook Form
 * ============================================
 *
 * 📌 Conceptos clave que se practican acá:
 *   - `useForm` con register, handleSubmit, watch, reset, formState
 *   - Validación declarativa en register (required, minLength, pattern)
 *   - Validación personalizada con `validate`
 *   - `watch()` para acceder al valor de otro campo
 *   - `reset()` para limpiar el formulario post-submit
 *
 * 🔍 Comparación con enfoque manual (Módulo 02):
 *   SIN RHF:                        CON RHF:
 *   - useState para cada campo      - register maneja todo
 *   - onChange manual               - onChange automático
 *   - if's para validar en submit   - reglas declarativas en register
 *   - errores en estado aparte      - formState.errors integrado
 *   - e.preventDefault() manual     - handleSubmit lo hace solo
 *
 * ⚠️ React Hook Form es UNCONTROLLED por defecto:
 *   No guarda el valor en React state. Usa refs para acceder
 *   al DOM directamente. Esto lo hace más RÁPIDO porque evita
 *   re-renders en cada tecla.
 *
 *   watch() es la excepción: causa re-renders cuando el campo
 *   observado cambia. Úsalo con moderación.
 */

function FormularioRegistro() {
  const [datosRegistro, setDatosRegistro] = useState(null)

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()

  // watch nos permite acceder al valor actual de password desde
  // la validación de confirmar contraseña
  const password = watch('password')

  function onSubmit(data) {
    // Simulamos una demora de red
    return new Promise(resolve => {
      setTimeout(() => {
        setDatosRegistro(data)
        reset() // limpia el formulario
        resolve()
      }, 1000)
    })
  }

  return (
    <div className="registro">
      <h2 className="registro__titulo">Crear Cuenta</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="registro__form" noValidate>
        {/* ---- NOMBRE ---- */}
        <div className="registro__campo">
          <label className="registro__label" htmlFor="nombre">
            Nombre
          </label>
          <input
            id="nombre"
            className={`registro__input ${errors.nombre ? 'registro__input--error' : ''}`}
            type="text"
            placeholder="Tu nombre"
            {...register('nombre', {
              required: 'El nombre es obligatorio',
              minLength: {
                value: 2,
                message: 'El nombre debe tener al menos 2 caracteres',
              },
            })}
          />
          {errors.nombre && (
            <span className="registro__error">{errors.nombre.message}</span>
          )}
        </div>

        {/* ---- EMAIL ---- */}
        <div className="registro__campo">
          <label className="registro__label" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            className={`registro__input ${errors.email ? 'registro__input--error' : ''}`}
            type="email"
            placeholder="email@ejemplo.com"
            {...register('email', {
              required: 'El email es obligatorio',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Email inválido',
              },
            })}
          />
          {errors.email && (
            <span className="registro__error">{errors.email.message}</span>
          )}
        </div>

        {/* ---- CONTRASEÑA ---- */}
        <div className="registro__campo">
          <label className="registro__label" htmlFor="password">
            Contraseña
          </label>
          <input
            id="password"
            className={`registro__input ${errors.password ? 'registro__input--error' : ''}`}
            type="password"
            placeholder="Mínimo 6 caracteres"
            {...register('password', {
              required: 'La contraseña es obligatoria',
              minLength: {
                value: 6,
                message: 'La contraseña debe tener al menos 6 caracteres',
              },
            })}
          />
          {errors.password && (
            <span className="registro__error">{errors.password.message}</span>
          )}
        </div>

        {/* ---- CONFIRMAR CONTRASEÑA ---- */}
        <div className="registro__campo">
          <label className="registro__label" htmlFor="confirmar">
            Confirmar Contraseña
          </label>
          <input
            id="confirmar"
            className={`registro__input ${errors.confirmar ? 'registro__input--error' : ''}`}
            type="password"
            placeholder="Repetí la contraseña"
            {...register('confirmar', {
              required: 'Debés confirmar la contraseña',
              validate: value =>
                value === password || 'Las contraseñas no coinciden',
            })}
          />
          {errors.confirmar && (
            <span className="registro__error">{errors.confirmar.message}</span>
          )}
        </div>

        <button
          type="submit"
          className="registro__btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Registrando...' : 'Registrarse'}
        </button>
      </form>

      {/* Tarjeta con datos ingresados */}
      {datosRegistro && (
        <div className="registro__resultado">
          <h3>✅ Registro exitoso</h3>
          <p><strong>Nombre:</strong> {datosRegistro.nombre}</p>
          <p><strong>Email:</strong> {datosRegistro.email}</p>
        </div>
      )}
    </div>
  )
}

export default FormularioRegistro
