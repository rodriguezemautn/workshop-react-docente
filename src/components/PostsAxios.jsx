/* =========================================================
   PostsAxios — Consumir JSONPlaceholder con Axios
   Módulo 07: API y HTTP
   =========================================================

   📖 ¿Qué es este componente?
   ────────────────────────────
   Obtiene posts de JSONPlaceholder (API gratuita) usando
   Axios. Muestra loading → data → error según el estado.

   🔑 Conceptos clave:
   ────────────────────
   1. useEffect para llamadas API:
      Las peticiones HTTP son EFECTOS SECUNDARIOS.
      Van dentro de useEffect con dependencia [] (una vez al montar).
      (react.dev/reference/react/useEffect#fetching-data)

   2. PATRÓN LOADING / ERROR / DATA:
      Siempre que llamamos a una API, manejamos 3 estados:
      
      - cargando: true → mostrar "Cargando..."
      - error: string → mostrar mensaje de error
      - data: array → mostrar los datos
      
      Inicializamos cargando en true porque al montar el
      componente, los datos NO están disponibles todavía.

   3. async/await con try/catch:
      - async: la función puede usar await
      - await: espera la promesa de axios.get()
      - try: bloque donde puede ocurrir el error
      - catch: captura el error (red, timeout, 4xx, 5xx)
      - finally: se ejecuta SIEMPRE (éxito o error)
      
      Sin async/await:
        axios.get(url).then(res => ...).catch(err => ...)
      
      Con async/await (más legible):
        const res = await axios.get(url)
      
      (developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/async_function)

   4. JSONPlaceholder:
      API gratuita para pruebas: jsonplaceholder.typicode.com
      Endpoints: /posts, /users, /comments, /albums, /photos
      No requiere autenticación.
      _limit=10 → limita a 10 resultados.

   📚 Referencias:
   ────────────────
   - axios-http.com/docs/example
   - jsonplaceholder.typicode.com
   - react.dev/reference/react/useEffect#fetching-data
   - developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/try...catch
   ========================================================= */

import { useState, useEffect } from 'react'
import axios from 'axios'

function PostsAxios() {
  /* 
    Los 3 estados de una petición API:
    
    1. data: los posts que se mostrarán
    2. cargando: true mientras esperamos la respuesta
    3. error: null (sin error) o string (mensaje de error)
    
    Inicializamos cargando en true porque al montar
    el componente, todavía no tenemos datos.
  */
  const [data, setData] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  /* 
    useEffect con [] — SOLO se ejecuta al MONTAR el componente.
    
    Esto es importante porque:
    - Sin [] → se ejecuta en CADA render (loop infinito)
    - Con [dependencia] → se ejecuta cuando la dependencia cambia
    - Con [] → se ejecuta UNA VEZ (ideal para carga inicial)
    
    (react.dev/reference/react/useEffect#parameters)
    
    ⚠️ NOTA: En React 18 con StrictMode, los efectos se EJECUTAN
    DOS VECES en desarrollo (para detectar problemas de cleanup).
    Esto no afecta en producción.
  */
  useEffect(() => {
    /* 
      Función ASÍNCRONA dentro de useEffect.
      No podemos hacer el useEffect directamente async porque
      useEffect espera que devuelva una función de cleanup,
      no una promesa.
      
      Solución: definir una función async DENTRO y llamarla.
    */
    async function fetchPosts() {
      try {
        /* 
          axios.get() devuelve una PROMESA.
          await espera a que se resuelva.
          
          res.data contiene los datos YA PARSADOS.
          A diferencia de fetch(), no necesitamos llamar .json().
          
          _limit=10: JSONPlaceholder devuelve 100 posts por defecto.
          Con _limit=10, solo obtenemos 10.
        */
        const res = await axios.get(
          'https://jsonplaceholder.typicode.com/posts?_limit=10'
        )

        setData(res.data)
        setError(null) // Limpiamos errores previos
      } catch (err) {
        /* 
          catch captura TANTO errores de red como HTTP 4xx/5xx.
          Axios los trata igual (a diferencia de fetch, que solo
          rechaza en errores de red).
          
          err.message: mensaje genérico del error
          err.response?.status: código HTTP si el server respondió
        */
        setError(
          err.response?.status
            ? `Error ${err.response.status}: ${err.response.statusText}`
            : 'Error al cargar los posts. ¿Estás conectado a internet?'
        )
      } finally {
        /* 
          finally se ejecuta SIEMPRE:
          - Si try se completó (éxito)
          - Si catch capturó un error
          
          Es el lugar ideal para ocultar el loading.
        */
        setCargando(false)
      }
    }

    fetchPosts()
  }, []) // Solo al montar

  /* 
    RENDERIZADO CONDICIONAL — Los 3 estados:
    
    1. cargando === true → spinner/mensaje
    2. error !== null → mensaje de error
    3. data.length > 0 → lista de posts
  */

  if (cargando) {
    return (
      <section className="posts-axios">
        <div className="posts-axios__loading">
          <div className="posts-axios__spinner" />
          <p>Cargando posts...</p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="posts-axios">
        <div className="posts-axios__error">
          <p>⚠️ {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="posts-axios__btn-reintentar"
          >
            Reintentar
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="posts-axios">
      <h3 className="posts-axios__titulo">
        📝 Posts desde JSONPlaceholder ({data.length})
      </h3>

      <div className="posts-axios__grid">
        {data.map((post) => (
          <article key={post.id} className="posts-axios__post">
            <span className="posts-axios__post-id">#{post.id}</span>
            <h4 className="posts-axios__post-titulo">{post.title}</h4>
            <p className="posts-axios__post-body">{post.body}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default PostsAxios
