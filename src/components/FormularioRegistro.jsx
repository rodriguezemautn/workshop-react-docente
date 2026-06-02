/* =========================================================
   FormularioRegistro — Formulario controlado con validación
   Módulo 02: Estado y Eventos
   =========================================================

   📖 ¿Qué es este componente?
   ────────────────────────────
   Un formulario de registro con 3 campos controlados (nombre,
   email, contraseña), validación de campos vacíos, y muestra
   de datos ingresados al hacer submit.

   🔑 Conceptos clave que introduce:
   ─────────────────────────────────
   1. INPUT CONTROLADO — El input recibe su valor del estado
      y actualiza el estado cuando el usuario escribe:
      
      value = {nombre}          ← estado controla el input
      onChange = {e => ...}     ← input actualiza el estado
      
      Esto es el patrón FUNDAMENTAL de formularios en React.
      React es la "única fuente de verdad" (single source of truth).
      (react.dev/learn/reacting-to-input-with-state)
      
   2. MÚLTIPLES ESTADOS — Usamos objetos en el estado para
      agrupar datos relacionados:
      
      { nombre, email, password } — un estado, tres campos
      
      También tenemos estados separados para:
      - errores: objeto con mensajes por campo
      - enviado: muestra los datos después del submit
      
   3. onSubmit + e.preventDefault() — El evento submit del form
      dispara la validación. Prevenimos el comportamiento por
      defecto (recargar la página) con e.preventDefault().
      (react.dev/reference/react-dom/components/form)
      
   4. RENDERIZADO CONDICIONAL AVANZADO — Mostramos/ocultamos
      mensajes de error y datos enviados según el estado.

   📚 Referencias:
   ────────────────
   - react.dev/learn/reacting-to-input-with-state
   - react.dev/reference/react-dom/components/input
   - react.dev/reference/react-dom/components/form
   - react.dev/learn/updating-objects-in-state
   ========================================================= */

import { useState } from 'react'

/**
 * Estado inicial del formulario.
 * Separa la estructura de datos del valor inicial para
 * poder reusarlo al reiniciar el formulario.
 */
const FORMULARIO_VACIO = {
  nombre: '',
  email: '',
  password: '',
}

function FormularioRegistro() {
  /* 
    Estado PRINCIPAL: objeto con los 3 campos del formulario.
    
    ⚠️ NOTA ACADÉMICA — ESTADO CON OBJETOS:
    Cuando el estado es un objeto, NUNCA mutamos propiedades.
    
    ❌ INCORRECTO: formData.nombre = 'Ana'; setFormData(formData)
    ✅ CORRECTO:   setFormData({ ...formData, nombre: 'Ana' })
    
    El spread operator (...formData) copia TODAS las propiedades
    del objeto original, y luego sobreescribimos SOLO la que
    cambia. Esto crea un NUEVO objeto (inmutable).
    (react.dev/learn/updating-objects-in-state)
  */
  const [formData, setFormData] = useState({ ...FORMULARIO_VACIO })

  /* 
    Estado para mensajes de error.
    Cada campo puede tener un mensaje o null.
    Inicializamos todo null (sin errores).
  */
  const [errores, setErrores] = useState({
    nombre: null,
    email: null,
    password: null,
  })

  /* 
    Estado que guarda los datos enviados para mostrarlos.
    Solo se actualiza cuando el submit es EXITOSO (sin errores).
    Es null inicialmente (no se ha enviado nada).
  */
  const [enviado, setEnviado] = useState(null)

  /* 
    Función genérica para manejar cambios en CUALQUIER input.
    
    Recibe el evento (e) del onChange.
    e.target = el input que disparó el evento
    e.target.name = el atributo "name" del input (nombre, email, password)
    e.target.value = el valor actual del input
    
    Esta función es REUTILIZABLE para todos los inputs porque
    usamos el nombre del campo para determinar qué propiedad
    actualizar en el objeto formData.
    
    Patrón: [e.target.name]: e.target.value
    Esto es "computed property name" de JavaScript.
    (developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#computed_property_names)
  */
  function handleChange(e) {
    const { name, value } = e.target

    /* 
      Actualizamos SOLO el campo que cambió.
      Spread operator (...) mantiene los otros campos intactos.
    */
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  /* 
    Validación de todos los campos.
    Devuelve un objeto con mensajes de error.
    Si un campo está vacío (o solo espacios), tiene error.
    También validamos formato de email.
    
    Esta función es PURA: recibe datos, devuelve errores.
    No modifica estado ni tiene efectos secundarios.
  */
  function validarFormulario() {
    const nuevosErrores = {}

    /* 
      Validación: campo requerido (no vacío).
      .trim() elimina espacios al inicio y final.
      Si después de trim() está vacío, es inválido.
    */
    if (!formData.nombre.trim()) {
      nuevosErrores.nombre = 'El nombre es obligatorio'
    }

    if (!formData.email.trim()) {
      nuevosErrores.email = 'El email es obligatorio'
    } else if (!formData.email.includes('@') || !formData.email.includes('.')) {
      /* 
        Validación simple de email: debe contener "@" y ".".
        
        ⚠️ NOTA: Esta validación es básica para el ejercicio.
        En producción se usaría una expresión regular más
        robusta o una librería como validator.js.
      */
      nuevosErrores.email = 'Email inválido (debe contener @ y .)'
    }

    if (!formData.password.trim()) {
      nuevosErrores.password = 'La contraseña es obligatoria'
    } else if (formData.password.length < 6) {
      /* 
        Validación adicional: mínimo 6 caracteres.
        Esto muestra que podemos tener múltiples reglas
        por campo.
      */
      nuevosErrores.password = 'Mínimo 6 caracteres'
    }

    return nuevosErrores
  }

  /* 
    handleSubmit — Se ejecuta al enviar el formulario.
    
    1. e.preventDefault() — Evita que el navegador recargue
       la página (comportamiento por defecto de los forms).
    
    2. Validamos todos los campos.
    
    3. Si hay errores → actualizamos estado de errores, NO enviamos.
    4. Si NO hay errores → guardamos datos, limpiamos formulario.
    
    (react.dev/reference/react-dom/components/form#handle-submit-event)
  */
  function handleSubmit(e) {
    e.preventDefault()

    const erroresEncontrados = validarFormulario()

    if (Object.keys(erroresEncontrados).length > 0) {
      /* 
        Hay errores — actualizamos estado y NO enviamos.
        El formulario permanece como está para que el
        usuario corrija los errores.
      */
      setErrores(erroresEncontrados)
      setEnviado(null) // Limpiamos datos previos si los había
    } else {
      /* 
        ✅ Todo OK — guardamos datos y limpiamos.
        
        1. Guardamos los datos en 'enviado' para mostrarlos
        2. Limpiamos errores (ya no hay)
        3. Reiniciamos formData al valor inicial
        4. El usuario ve los datos y el formulario limpio
      */
      setEnviado({ ...formData })
      setErrores({ nombre: null, email: null, password: null })
      setFormData({ ...FORMULARIO_VACIO })
    }
  }

  return (
    <section className="formulario-registro">
      <h3 className="formulario-registro__titulo">Formulario de Registro</h3>

      {/* 
        El formulario usa onSubmit (NO onClick en el botón).
        Esto permite:
        - Enviar con Enter desde cualquier campo
        - Accesibilidad (screen readers)
        - Comportamiento estándar HTML
      */}
      <form className="formulario-registro__form" onSubmit={handleSubmit}>
        {/* 
          ════════════════════════
          Campo: Nombre
          ════════════════════════
          
          Patrón INPUT CONTROLADO:
          - value={formData.nombre} — React controla el valor
          - onChange={handleChange} — Input notifica cambios
          - name="nombre" — Identifica el campo (usa handleChange)
          
          La conexión value + onChange es lo que hace que
          React controle el input, no al revés.
        */}
        <div className="formulario-registro__campo">
          <label htmlFor="reg-nombre">Nombre</label>
          <input
            id="reg-nombre"
            type="text"
            name="nombre"
            placeholder="Tu nombre completo"
            value={formData.nombre}
            onChange={handleChange}
            className={errores.nombre ? 'input--error' : ''}
          />
          {/* 
            Mostramos error SOLO si existe para este campo.
            Renderizado condicional con && :
            Si errores.nombre es truthy → muestra el <span>
            Si es falsy (null) → React no renderiza nada
          */}
          {errores.nombre && (
            <span className="formulario-registro__error">{errores.nombre}</span>
          )}
        </div>

        {/* 
          ════════════════════════
          Campo: Email
          ════════════════════════
          
          Mismo patrón que nombre.
          type="email" da validación semántica HTML además
          de nuestra validación en JavaScript.
        */}
        <div className="formulario-registro__campo">
          <label htmlFor="reg-email">Email</label>
          <input
            id="reg-email"
            type="email"
            name="email"
            placeholder="tu@email.com"
            value={formData.email}
            onChange={handleChange}
            className={errores.email ? 'input--error' : ''}
          />
          {errores.email && (
            <span className="formulario-registro__error">{errores.email}</span>
          )}
        </div>

        {/* 
          ════════════════════════
          Campo: Contraseña
          ════════════════════════
          
          type="password" oculta los caracteres.
          En producción se agregaría "ver contraseña" toggle.
        */}
        <div className="formulario-registro__campo">
          <label htmlFor="reg-password">Contraseña</label>
          <input
            id="reg-password"
            type="password"
            name="password"
            placeholder="Mínimo 6 caracteres"
            value={formData.password}
            onChange={handleChange}
            className={errores.password ? 'input--error' : ''}
          />
          {errores.password && (
            <span className="formulario-registro__error">{errores.password}</span>
          )}
        </div>

        <button type="submit" className="formulario-registro__btn">
          Registrarse
        </button>
      </form>

      {/* 
        ════════════════════════
        Datos enviados
        ════════════════════════
        
        Solo se muestra cuando 'enviado' NO es null.
        Renderizado condicional:
        {enviado && (...)} 
        
        Si enviado es null → no renderiza nada (corto-circuito)
        Si enviado tiene datos → renderiza la sección
      */}
      {enviado && (
        <div className="formulario-registro__enviado">
          <h4>✅ Datos registrados:</h4>
          <p><strong>Nombre:</strong> {enviado.nombre}</p>
          <p><strong>Email:</strong> {enviado.email}</p>
          <p><strong>Contraseña:</strong> {'•'.repeat(enviado.password.length)}</p>
        </div>
      )}
    </section>
  )
}

export default FormularioRegistro
