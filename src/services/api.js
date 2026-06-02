/* =========================================================
   api.js — Instancia de Axios configurada
   Módulo 07: API y HTTP
   =========================================================

   📖 ¿Qué es este archivo?
   ─────────────────────────
   Crea y exporta una INSTANCIA de Axios con configuración
   compartida (baseURL, headers, timeout).

   🔑 ¿Por qué una instancia en lugar de axios.get() directo?
   ──────────────────────────────────────────────────────────
   1. baseURL centralizado — Si la API cambia de URL, solo
      cambiamos UN archivo.
   2. Headers por defecto — Content-Type, Authorization, etc.
   3. Timeout global — Todas las peticiones comparten el límite.
   4. Interceptores — Podemos agregar logging, refresh tokens,
      manejo global de errores.
   
   Sin instancia:
     axios.get('http://localhost:3001/tareas')
     axios.post('http://localhost:3001/tareas', data)
   
   Con instancia:
     api.get('/tareas')
     api.post('/tareas', data)

   🔑 fetch nativo vs Axios:
   ──────────────────────────
   | Característica        | fetch                     | Axios                |
   |-----------------------|---------------------------|----------------------|
   | Parseo JSON           | Manual (.json())          | Automático (res.data)|
   | Errores HTTP 4xx/5xx  | No van al catch           | Van al catch         |
   | Timeout               | AbortController manual    | timeout en config    |
   | baseURL               | No soporta                | Soporta              |
   | Interceptores         | No soporta                | Soporta              |
   
   (axios-http.com/docs/instance)

   📚 Referencias:
   ────────────────
   - axios-http.com/docs/instance
   - axios-http.com/docs/req_config
   - axios-http.com/docs/interceptors
   ========================================================= */

import axios from 'axios'

/* 
  Creamos una instancia de Axios con configuración BASE.
  
  baseURL: 'http://localhost:3001'
  - Es la URL raíz de la API (json-server en este caso)
  - Todas las peticiones usarán esta base:
    api.get('/tareas') → GET http://localhost:3001/tareas
    api.post('/tareas') → POST http://localhost:3001/tareas
  
  timeout: 5000
  - 5 segundos máximo de espera por petición
  - Si la API no responde en 5s, la petición falla
  - Sin timeout, una petición podría quedar colgada para siempre
  
  headers:
  - Content-Type: indica que enviamos JSON
  - Se podría agregar Authorization para tokens JWT
*/
const api = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})

/* 
  Interceptor de PETICIONES (REQUEST).
  Se ejecuta ANTES de cada petición.
  Útil para: logger, agregar tokens, modificar headers.
  
  Ejemplo de token JWT:
    api.interceptors.request.use((config) => {
      const token = localStorage.getItem('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    })
*/
api.interceptors.request.use(
  (config) => {
    /* 
      En desarrollo, podemos loguear cada petición.
      En producción, esto se eliminaría o sería condicional.
    */
    console.log(`🚀 ${config.method?.toUpperCase()} ${config.url}`)
    return config
  },
  (error) => {
    console.error('❌ Error en petición:', error)
    return Promise.reject(error)
  }
)

/* 
  Interceptor de RESPUESTAS (RESPONSE).
  Se ejecuta DESPUÉS de cada respuesta.
  Útil para: manejo global de errores, refresh tokens.
*/
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      /* 
        El servidor respondió con un error HTTP.
        error.response.status → 404, 500, etc.
        error.response.data → mensaje del servidor
      */
      console.error(`❌ Error ${error.response.status}:`, error.response.data)
    } else if (error.request) {
      /* 
        La petición se hizo pero no hubo respuesta.
        Generalmente: timeout o red caída.
      */
      console.error('❌ Sin respuesta del servidor:', error.message)
    }
    return Promise.reject(error)
  }
)

export default api
