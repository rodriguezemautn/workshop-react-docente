/* =========================================================
   FormularioRegistro — Formulario controlado con validación
   Ejercicio 02: Formulario de Registro

   📖 ¿Qué hace?
   Un formulario con 3 campos controlados (nombre, email, password)
   que valida los datos antes de mostrarlos.

   🔑 Conceptos NUEVOS respecto al Módulo 01:
   
   1. INPUT CONTROLADO:
      El input NO maneja su propio estado interno. React controla
      el valor del input a través de useState.
      
      Patrón: value={valor} + onChange={manejador}
      
      ❌ Sin React: el input recuerda su valor solo (DOM)
      ✅ Con React: React recuerda el valor (estado) y el input
         solo muestra lo que React le dice
      
      react.dev/learn/controlled-inputs-with-state
   
   2. onChange:
      Evento que se dispara en CADA TECLA que el usuario escribe.
      Recibe un evento (e) del cual extraemos e.target.value.
      
      NOTA: onChange en React se comporta como onInput en HTML vanilla.
      Se dispara en cada cambio, no solo al perder el foco.
   
   3. onSubmit y e.preventDefault():
      El formulario HTML por defecto recarga la página al enviar.
      e.preventDefault() lo evita. React maneja el envío con JS.
   
   4. MÚLTIPLES ESTADOS:
      Pueden convivir varios useState en el mismo componente.
      Cada uno es independiente.
      - formData: los valores de los inputs
      - errores: mensajes de error por campo
      - enviado: flag para mostrar/ocultar datos enviados
      
      📚 NOTA: Cada vez que CUALQUIER setter se llama,
      React RE-RENDERIZA el componente COMPLETO.
   
   ========================================================= */

import { useState } from 'react'

function FormularioRegistro() {
  /* 
    Estado 1: datos del formulario.
    Un solo objeto con 3 campos nos evita tener 3 useState separados.
    
    📚 NOTA: No confundir con un formulario NO controlado.
    Esto es CONTROLADO porque React controla el valor con useState.
  */
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
  })

  /* 
    Estado 2: errores de validación.
    Cada campo puede tener un mensaje de error o null/undefined.
    Si errores.email tiene valor, mostramos ese mensaje.
    Si errores.email es undefined, no mostramos nada.
  */
  const [errores, setErrores] = useState({})

  /* 
    Estado 3: flag que indica si el formulario fue enviado.
    Cuando es true, mostramos los datos debajo del formulario.
    Esto es un booleano, no un string.
  */
  const [enviado, setEnviado] = useState(false)

  /*
    Manejador GENÉRICO para TODOS los inputs.
    
    ¿Cómo sabe qué campo actualizar?
    Usamos e.target.name para identificar el campo.
    
    Esto requiere que cada input tenga un atributo "name"
    que coincida con la clave en formData.
    
    Patrón:
    <input name="nombre" /> → e.target.name = "nombre"
    <input name="email" />  → e.target.name = "email"
    
    spread operator (...formData):
    Copiamos TODAS las propiedades existentes del objeto.
    Luego SOBREESCRIBIMOS solo la que cambió.
    
    📚 NOTA: ¡NUNCA hagas formData[e.target.name] = e.target.value!
    Eso MUTA el estado directamente. React no detecta la mutación
    y NO re-renderiza.
    
    Siempre crear un NUEVO objeto con los cambios.
    react.dev/learn/updating-objects-in-state
  */
  function handleChange(e) {
    const { name, value } = e.target   // destructuring del evento

    setFormData({
      ...formData,                    // copiamos TODAS las propiedades
      [name]: value,                  // actualizamos SOLO la que cambió
    })
  }

  /*
    Validación del formulario.
    Recorre cada campo y verifica que no esté vacío.
    Para email, verifica también que contenga @ y .
    
    Devuelve un objeto con mensajes de error.
    Si no hay errores, devuelve objeto vacío {}.
  */
  function validar() {
    const nuevosErrores = {}

    if (!formData.nombre.trim()) {
      nuevosErrores.nombre = 'El nombre es obligatorio'
    }

    if (!formData.email.trim()) {
      nuevosErrores.email = 'El email es obligatorio'
    } else if (!formData.email.includes('@') || !formData.email.includes('.')) {
      nuevosErrores.email = 'Email inválido'
    }

    if (!formData.password.trim()) {
      nuevosErrores.password = 'La contraseña es obligatoria'
    }

    return nuevosErrores
  }

  /*
    Manejador de envío del formulario.
    
    1. e.preventDefault() → evita la recarga de página
    2. Validamos los datos
    3. Si hay errores, actualizamos estado de errores y salimos
    4. Si no hay errores, mostramos datos y limpiamos
    
    📚 NOTA: onSubmit se dispara tanto al hacer clic en
    <button type="submit"> como al presionar Enter dentro
    de un input. Esto es comportamiento HTML estándar.
  */
  function handleSubmit(e) {
    e.preventDefault()    // ← ¡IMPORTANTE! Sin esto, la página recarga.

    const erroresValidacion = validar()

    if (Object.keys(erroresValidacion).length > 0) {
      // Hay errores → los mostramos
      setErrores(erroresValidacion)
      setEnviado(false)
    } else {
      // Todo bien → mostramos datos y limpiamos
      setErrores({})
      setEnviado(true)

      // Limpiamos el formulario (volvemos a valores iniciales)
      setFormData({
        nombre: '',
        email: '',
        password: '',
      })
    }
  }

  return (
    <div className="formulario-registro">
      <h2 className="formulario-registro__titulo">Formulario de Registro</h2>

      {/*
        onSubmit se ejecuta cuando el usuario intenta enviar.
        handleSubmit recibe el evento del formulario.
        NO ejecutamos handleSubmit() nosotros — React lo hace.
      */}
      <form onSubmit={handleSubmit} className="formulario-registro__form">
        {/* ───── Campo: Nombre ───── */}
        <div className="formulario-registro__campo">
          <label htmlFor="nombre">Nombre</label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            placeholder="Tu nombre"
            /*
              value={formData.nombre}
              El input muestra lo que dice el estado, no lo que
              el usuario escribió "realmente". Si el estado dice
              "Ana", el input muestra "Ana".

              onChange={handleChange}
              Cada tecla → handleChange → actualiza formData →
              React re-renderiza → input muestra nuevo valor.
            */
            value={formData.nombre}
            onChange={handleChange}
            className={errores.nombre ? 'input--error' : ''}
          />
          {/*
            Renderizado condicional: si existe errores.nombre,
            mostramos el mensaje. Si es undefined, no mostramos nada.
            
            {condicion && <elemento />} → AND lógico en JSX.
            Si condicion es falsy, React ignora el operando derecho.
          */}
          {errores.nombre && (
            <p className="formulario-registro__error">{errores.nombre}</p>
          )}
        </div>

        {/* ───── Campo: Email ───── */}
        <div className="formulario-registro__campo">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="email@ejemplo.com"
            value={formData.email}
            onChange={handleChange}
            className={errores.email ? 'input--error' : ''}
          />
          {errores.email && (
            <p className="formulario-registro__error">{errores.email}</p>
          )}
        </div>

        {/* ───── Campo: Contraseña ───── */}
        <div className="formulario-registro__campo">
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            className={errores.password ? 'input--error' : ''}
          />
          {errores.password && (
            <p className="formulario-registro__error">{errores.password}</p>
          )}
        </div>

        <button type="submit" className="formulario-registro__btn">
          Registrarse
        </button>
      </form>

      {/*
        Renderizado condicional: si enviado es true,
        mostramos un resumen con los datos ingresados.
        
        Esto aparece DESPUÉS del submit exitoso, no antes.
      */}
      {enviado && (
        <div className="formulario-registro__enviado">
          <h4>✅ Registro exitoso</h4>
          <p><strong>Nombre:</strong> {formData.nombre}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Contraseña:</strong> {'•'.repeat(formData.password.length)}</p>
        </div>
      )}
    </div>
  )
}

export default FormularioRegistro
