/* =========================================================
   FormularioRegistroRHF — Formulario con React Hook Form
   Módulo 06: Formularios
   =========================================================

   📖 ¿Qué es este componente?
   ────────────────────────────
   El mismo formulario de registro del Módulo 02, pero
   implementado con React Hook Form (RHF) en lugar de
   useState + onChange manual.

   🔑 ¿Por qué React Hook Form?
   ──────────────────────────────
   RHF es la librería de formularios más popular para React.
   Ventajas sobre useState manual:
   
   1. Menos código: register + handleSubmit reemplazan
      useState + onChange + validación manual
   
   2. Performance: los inputs se registran SIN re-renderizar
      el componente en cada pulsación (inputs no controlados
      por defecto). Solo se re-renderizan los errores.
   
   3. Validación declarativa: las reglas van en register():
      register('campo', { required: true, minLength: 3 })
   
   4. Integración con schemas: Zod, Yup, Joi (opcional)

   🔑 Conceptos clave de RHF:
   ────────────────────────────
   1. useForm() — Hook principal. Devuelve:
      - register: conecta un input al formulario
      - handleSubmit: maneja el submit CON validación
      - formState: { errors } — estado de validación
      - reset: limpia el formulario
      
   2. register(name, options) — Registra un input:
      - name: identificador único del campo
      - options: { required, minLength, maxLength, validate, ... }
      - Devuelve props: { onChange, onBlur, name, ref }
      - Se esparcen con {...register('nombre')}
      
   3. handleSubmit(onValid, onInvalid):
      - onValid: se ejecuta cuando NO hay errores
      - onInvalid: se ejecuta cuando HAY errores
      - Recibe los datos del formulario como objeto
      
   4. formState.errors — Objeto con errores de validación:
      { nombre: { type: 'required', message: '...' } }

   🚀 RHF vs useState manual:
   ──────────────────────────
   Con useState:  ~30 líneas de código por formulario
   Con RHF:      ~15 líneas de código por formulario
   
   RHF también maneja:
   - touched (campos tocados)
   - dirty (campos modificados)
   - isSubmitting (enviando...)
   - isValid (formulario válido)
   
   (react-hook-form.com/get-started)

   📚 Referencias:
   ────────────────
   - react-hook-form.com/docs/useform
   - react-hook-form.com/docs/useform/register
   - react-hook-form.com/docs/useform/handlesubmit
   - react-hook-form.com/docs/useform/formstate
   ========================================================= */

import { useForm } from 'react-hook-form'

function FormularioRegistroRHF() {
  /* 
    useForm() — Inicializamos el formulario.
    
    Podemos pasar opciones como:
    - defaultValues: valores iniciales
    - mode: cuándo validar ('onChange', 'onBlur', 'onSubmit')
    - resolver: integración con Zod/Yup
    
    useForm devuelve MÁS de lo que necesitamos acá:
    - register, handleSubmit, formState: { errors }
    - reset, watch, getValues, setValue, etc.
    
    (react-hook-form.com/docs/useform)
  */
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nombre: '',
      email: '',
      password: '',
    },
  })

  /* 
    onSubmit — Se ejecuta SOLO si la validación pasa.
    
    A diferencia de useState manual:
    - NO necesitamos e.preventDefault() — RHF lo hace
    - NO necesitamos validar manualmente — register lo hace
    - Los datos (data) YA vienen validados
    - NO necesitamos manejar onChange — register lo hace
    
    data es: { nombre: 'Ana', email: 'ana@email.com', password: '123456' }
  */
  function onSubmit(data) {
    alert(`✅ Registrado:\n${data.nombre}\n${data.email}`)
    reset() // Limpia el formulario
  }

  return (
    <section className="formulario-rhf">
      <h3 className="formulario-rhf__titulo">
        📋 Registro con React Hook Form
      </h3>

      {/*
        handleSubmit recibe la función que se ejecuta
        cuando la validación ES EXITOSA.
        
        Envolvemos onSubmit con handleSubmit:
          <form onSubmit={handleSubmit(onSubmit)}>
        
        handleSubmit previene el submit por defecto,
        ejecuta todas las validaciones registradas,
        y si todo está OK, llama a onSubmit.
      */}
      <form className="formulario-rhf__form" onSubmit={handleSubmit(onSubmit)}>
        {/* 
          ═══════════════
          Campo: NOMBRE
          ═══════════════
          
          {...register('nombre', { ... })}
          
          register devuelve: { onChange, onBlur, name, ref }
          El spread operator (...) los asigna como props del input.
          
          Equivalente manual:
            <input
              onChange={...}
              onBlur={...}
              name="nombre"
              ref={...}
            />
          
          Opciones de validación:
          - required: 'Mensaje de error' (true o string)
          - minLength: { value: 3, message: '...' }
          - maxLength: { value: 50, message: '...' }
          
          El mensaje de error se guarda en:
            errors.nombre?.message
        */}
        <div className="formulario-rhf__campo">
          <label htmlFor="rhf-nombre">Nombre</label>
          <input
            id="rhf-nombre"
            type="text"
            placeholder="Tu nombre completo"
            className={errors.nombre ? 'input--error' : ''}
            {...register('nombre', {
              required: 'El nombre es obligatorio',
              minLength: {
                value: 3,
                message: 'Mínimo 3 caracteres',
              },
              maxLength: {
                value: 50,
                message: 'Máximo 50 caracteres',
              },
            })}
          />
          {/*
            errors.nombre existe SOLO si la validación falló.
            errors.nombre.message es el string que pusimos
            en la opción de validación.
            
            Sin RHF, tendríamos que tener:
            - Estado errores: { nombre: null, email: null, ... }
            - Validar manualmente en submit
            - Setear errores manualmente
            
            Con RHF: register + errors, todo declarativo.
          */}
          {errors.nombre && (
            <span className="formulario-rhf__error">{errors.nombre.message}</span>
          )}
        </div>

        {/* 
          ═══════════════
          Campo: EMAIL
          ═══════════════
          
          Mismo patrón. RHF maneja la validación declarativa.
          
          pattern: expresión regular para validar formato.
          Si no coincide, muestra el mensaje.
        */}
        <div className="formulario-rhf__campo">
          <label htmlFor="rhf-email">Email</label>
          <input
            id="rhf-email"
            type="email"
            placeholder="tu@email.com"
            className={errors.email ? 'input--error' : ''}
            {...register('email', {
              required: 'El email es obligatorio',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Formato de email inválido',
              },
            })}
          />
          {errors.email && (
            <span className="formulario-rhf__error">{errors.email.message}</span>
          )}
        </div>

        {/* 
          ═══════════════════
          Campo: CONTRASEÑA
          ═══════════════════
          
          validate es una FUNCIÓN PERSONALIZADA.
          Recibe el valor del campo y debe retornar:
          - true → válido
          - string → mensaje de error
          
          Esto es para validaciones que no entran en
          las reglas estándar (required, minLength, etc.).
        */}
        <div className="formulario-rhf__campo">
          <label htmlFor="rhf-password">Contraseña</label>
          <input
            id="rhf-password"
            type="password"
            placeholder="Mínimo 6 caracteres"
            className={errors.password ? 'input--error' : ''}
            {...register('password', {
              required: 'La contraseña es obligatoria',
              minLength: {
                value: 6,
                message: 'Mínimo 6 caracteres',
              },
              /* 
                validate: función personalizada.
                Podemos hacer validaciones arbitrarias:
                - Que no sea solo números
                - Que tenga al menos una mayúscula
                - Que coincida con otro campo
                
                Recibe el VALOR del campo y debe retornar:
                - true → pasa validación
                - string → mensaje de error
              */
              validate: (value) =>
                value === value.toLowerCase()
                  ? 'Debe contener al menos una mayúscula'
                  : true,
            })}
          />
          {errors.password && (
            <span className="formulario-rhf__error">
              {errors.password.message}
            </span>
          )}
        </div>

        <button type="submit" className="formulario-rhf__btn">
          Registrarse
        </button>
      </form>

      {/* 
        NOTA: Comparación con Módulo 02.
        
        FormularioRegistro (Módulo 02) = ~90 líneas
        FormularioRegistroRHF (Módulo 06) = ~60 líneas
        
        Y RHF ofrece MUCHO más:
        - No re-renderiza en cada tecla
        - Maneja touched/dirty/submitting
        - Fácil de integrar con schemas
        - Soporta arrays de campos (useFieldArray)
      */}
    </section>
  )
}

export default FormularioRegistroRHF
