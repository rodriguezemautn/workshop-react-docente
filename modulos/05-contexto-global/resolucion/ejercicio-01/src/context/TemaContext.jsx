import { createContext, useContext, useState, useEffect } from 'react'

/*
 * ============================================
 *  TemaContext — Tema Claro / Oscuro Global
 * ============================================
 *
 * 📌 Conceptos clave que se practican acá:
 *   - `createContext` + `useContext` para estado global
 *   - Provider que envuelve toda la app en main.jsx
 *   - Custom hook `useTema` que encapsula useContext
 *   - Persistencia del tema en localStorage
 *
 * 🔍 Flujo de datos:
 *   1. TemaProvider se monta y lee el tema de localStorage
 *   2. Si no hay nada guardado, usa 'claro' por defecto
 *   3. Cualquier componente hijo puede leer el tema con useTema()
 *   4. El toggle cambia el tema y useEffect lo persiste
 *   5. Al recargar la página, se recupera el tema guardado
 *
 * 🏗️ Estructura:
 *   TemaContext.jsx
 *     ├── TemaContext      ← createContext
 *     ├── TemaProvider      ← componente que envuelve la app
 *     └── useTema           ← custom hook (la API pública)
 */

const TemaContext = createContext()

const STORAGE_KEY = 'mod05-tema'

export function TemaProvider({ children }) {
  const [tema, setTema] = useState(() => {
    // Lazy initializer: leemos de localStorage UNA SOLA VEZ
    // Si no hay nada guardado, asumimos 'claro'
    return localStorage.getItem(STORAGE_KEY) || 'claro'
  })

  // Persistimos el tema cada vez que cambia
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, tema)
  }, [tema])

  // También aplicamos la clase al <html> para que funcione con
  // variables CSS globales definidas en :root / [data-tema="oscuro"]
  useEffect(() => {
    document.documentElement.setAttribute('data-tema', tema)
  }, [tema])

  function toggleTema() {
    setTema(t => (t === 'claro' ? 'oscuro' : 'claro'))
  }

  return (
    <TemaContext.Provider value={{ tema, toggleTema }}>
      {children}
    </TemaContext.Provider>
  )
}

/*
 * Custom hook useTema — la UNICA forma de acceder al contexto.
 *
 * ¿Por qué obligamos a usar esto y no useContext(TemaContext) directo?
 *   1. Encapsulación: si después cambiamos la implementación interna,
 *      solo tocamos este hook, no 20 componentes.
 *   2. Validación: si alguien usa useTema() fuera del Provider,
 *      tiramos un error claro en vez de un crash críptico.
 *   3. Consistencia: el equipo siempre importa useTema, no useContext.
 *
 * Este es el patrón RECOMENDADO por la documentación oficial de React:
 * https://react.dev/reference/react/useContext#custom-hook
 */
export function useTema() {
  const context = useContext(TemaContext)
  if (!context) {
    throw new Error('useTema debe usarse dentro de un <TemaProvider>')
  }
  return context
}
