import { useState, useEffect } from 'react'
import axios from 'axios'

/*
 * ============================================
 *  ListaPosts — Consumir JSONPlaceholder con Axios
 * ============================================
 *
 * 📌 Conceptos clave que se practican acá:
 *   - `useEffect` para hacer fetch al montar el componente
 *   - `axios.get()` para GET requests
 *   - Manejo de 3 estados: loading, error, data
 *   - Expansión de items (toggle de detalle)
 *
 * 🔍 Flujo de datos:
 *   1. El componente se monta → useEffect se ejecuta
 *   2. Iniciamos con loading = true, error = null
 *   3. Hacemos GET a JSONPlaceholder
 *   4a. Éxito → guardamos posts, loading = false
 *   4b. Error → guardamos mensaje, loading = false
 *   5. Renderizamos según el estado actual
 *
 * ⚠️ Patrón importante:
 *   Los 3 estados (loading, error, data) son MUTUAMENTE EXCLUYENTES.
 *   Solo uno está activo a la vez, y cada uno renderiza algo distinto.
 *   Esto se llama "state machine pattern" y es la forma correcta
 *   de manejar fetch en React.
 */

const API_URL = 'https://jsonplaceholder.typicode.com/posts?_limit=10'

function ListaPosts() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [expandido, setExpandido] = useState(null) // ID del post expandido

  useEffect(() => {
    /*
     * Función async auto-ejecutable dentro del efecto.
     *
     * No podemos pasar async directamente a useEffect porque
     * useEffect espera que la función devuelva OTRRA función
     * (el cleanup) o undefined. async siempre devuelve una
     * Promise, y React no sabe qué hacer con eso.
     *
     * La solución es definir la async ADENTRO y llamarla.
     */
    async function cargarPosts() {
      try {
        setLoading(true)
        setError(null)

        const respuesta = await axios.get(API_URL)
        setPosts(respuesta.data)
      } catch {
        setError('Error al cargar los posts')
      } finally {
        setLoading(false)
      }
    }

    cargarPosts()
  }, []) // Array vacío → solo al montar

  function toggleExpandir(id) {
    setExpandido(expandido === id ? null : id)
  }

  // Estado 1: CARGANDO
  if (loading) {
    return (
      <div className="posts posts--cargando">
        <div className="posts__spinner" />
        <p>Cargando posts...</p>
      </div>
    )
  }

  // Estado 2: ERROR
  if (error) {
    return (
      <div className="posts posts--error">
        <p className="posts__error-msg">⚠️ {error}</p>
        <button className="posts__reintentar" onClick={() => window.location.reload()}>
          Reintentar
        </button>
      </div>
    )
  }

  // Estado 3: DATOS
  return (
    <div className="posts">
      <h2 className="posts__titulo">Últimos Posts</h2>
      <p className="posts__fuente">
        Fuente: <code>jsonplaceholder.typicode.com</code>
      </p>

      <div className="posts__lista">
        {posts.map(post => (
          <article
            key={post.id}
            className={`posts__post ${expandido === post.id ? 'posts__post--expandido' : ''}`}
          >
            <div
              className="posts__post-header"
              onClick={() => toggleExpandir(post.id)}
            >
              <h3 className="posts__post-titulo">
                {post.id}. {post.title}
              </h3>
              <span className="posts__expandir-icono">
                {expandido === post.id ? '▲' : '▼'}
              </span>
            </div>

            {expandido === post.id && (
              <div className="posts__post-body">
                <p>{post.body}</p>
                <span className="posts__post-user">Usuario ID: {post.userId}</span>
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  )
}

export default ListaPosts
