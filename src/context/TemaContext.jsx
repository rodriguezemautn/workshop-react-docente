/* =========================================================
   TemaContext — Contexto de tema claro/oscuro
   Módulo 05: Contexto Global (useContext)
   =========================================================

   📖 ¿Qué es este archivo?
   ─────────────────────────
   Define un CONTEXTO de React para el tema de la aplicación
   (claro/oscuro). Incluye el Provider que envuelve la app y
   un custom hook useTema() para consumir el contexto desde
   cualquier componente.

   🔑 Conceptos clave:
   ────────────────────
   1. createContext — Crea un contenedor de estado global.
      Devuelve un objeto con dos componentes:
      - Provider: envuelve componentes hijos y provee el valor
      - Consumer: consume el valor (no lo usamos, usamos useContext)
      (react.dev/reference/react/createContext)

   2. useContext — Hook que ACCEDE al valor del contexto.
      Reemplaza al Consumer. Se usa DENTRO del componente.
      (react.dev/reference/react/useContext)

   3. Provider — Componente que envuelve la app y "provee"
      el valor del contexto a TODOS los componentes hijos,
      sin importar qué tan profundos estén.
      (react.dev/learn/passing-data-deeply-with-context)

   4. Custom Hook — useTema() encapsula useContext y evita
      importar TemaContext y useContext en cada componente.
      Es más limpio y facilita cambiar la implementación.

   5. Prop Drilling vs Context:
      Sin Context: pasar tema como prop por 5 niveles de componentes
      Con Context: cualquier componente lee el tema directamente
      
      ⚠️ Context NO reemplaza a props. Usar Context para:
      ✓ Tema, usuario, idioma, config global
      ✗ Estado local de 1-2 componentes (props es mejor)

   📚 Referencias:
   ────────────────
   - react.dev/reference/react/createContext
   - react.dev/reference/react/useContext
   - react.dev/learn/passing-data-deeply-with-context
   - react.dev/learn/scaling-up-with-reducer-and-context
   ========================================================= */

import { createContext, useContext, useState, useEffect } from 'react'

/* 
  PASO 1: Crear el contexto con createContext.
  
  createContext(valorInicial):
  - valorInicial: se usa cuando un componente consume el contexto
    pero NO tiene un Provider por encima en el árbol.
  - null es un buen valor por defecto porque fuerza a los
    componentes a verificar que el Provider existe.
  
  createContext devuelve un objeto con dos propiedades:
  - Provider: componente que provee el valor
  - Consumer: (obsoleto, usamos useContext)
  
  (react.dev/reference/react/createContext)
*/
const TemaContext = createContext(null)

/* 
  Clave para persistir el tema en localStorage.
  Usamos el mismo prefijo que otros componentes de Taskify.
*/
const STORAGE_KEY_TEMA = 'taskify-tema'

/* 
  PASO 2: TemaProvider — Componente que envuelve la app.
  
  Este componente:
  1. Mantiene el ESTADO del tema (claro/oscuro)
  2. Provee el tema y la función para cambiarlo
  3. Persiste el tema en localStorage
  4. Aplica la clase 'oscuro' al <body> cuando corresponde
  
  Cualquier componente dentro de <TemaProvider> puede
  acceder al tema con useTema().
*/
function TemaProvider({ children }) {
  /* 
    Inicializamos el tema con Lazy Initializer.
    Lee de localStorage o usa 'claro' por defecto.
    (mismo patrón que Módulo 04)
  */
  const [tema, setTema] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY_TEMA) || 'claro'
    } catch {
      return 'claro'
    }
  })

  /* 
    useEffect: sincroniza el tema con:
    1. localStorage — para persistir
    2. document.body — para aplicar clases globales
    
    document.body.classList es una forma de aplicar estilos
    globales sin depender de un componente específico.
    Alternativa: CSS variables en :root.
    
    Ejemplo de classList:
      add('oscuro') → <body class="oscuro">
      remove('oscuro') → <body class="">
  */
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_TEMA, tema)

    if (tema === 'oscuro') {
      document.body.classList.add('tema-oscuro')
    } else {
      document.body.classList.remove('tema-oscuro')
    }
  }, [tema])

  /* 
    Función que ALTERNAR entre claro y oscuro.
    Usa la forma FUNCIÓN de setState para basarse en
    el valor anterior.
  */
  const cambiarTema = () => {
    setTema((prev) => (prev === 'claro' ? 'oscuro' : 'claro'))
  }

  /* 
    PASO 3: Proveer el valor a los hijos.
    
    value={{ tema, cambiarTema }} — cualquier componente
    que llame a useTema() recibe estos dos valores.
    
    El value se pasa por REFERENCIA. Si cambia (por setTema),
    TODOS los componentes que usan useContext se re-renderizan.
  */
  return (
    <TemaContext.Provider value={{ tema, cambiarTema }}>
      {children}
    </TemaContext.Provider>
  )
}

/* 
  PASO 4: Custom Hook — useTema()
  
  Este hook encapsula useContext + validación.
  Beneficios:
  1. No necesitamos importar TemaContext y useContext en c/componente
  2. Podemos agregar lógica extra (validación, transformación)
  3. Si cambia la implementación, solo cambiamos este hook
  
  Validación: si useTema() se llama fuera de un Provider,
  lanza un error claro. Esto es mejor que un error críptico
  de "cannot read properties of null".
*/
function useTema() {
  const context = useContext(TemaContext)

  if (!context) {
    throw new Error(
      'useTema() debe usarse dentro de un <TemaProvider>. ' +
        'Envolvé tu app con <TemaProvider> en main.jsx'
    )
  }

  return context
}

export { TemaProvider, useTema }
