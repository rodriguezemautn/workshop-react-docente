import axios from 'axios'

/*
 * ============================================
 *  Instancia de Axios configurada
 * ============================================
 *
 * En lugar de usar axios.get() directamente en cada componente,
 * creamos una INSTANCIA con la URL base pre-configurada.
 *
 * Ventajas:
 *   1. Si la API cambia de URL, solo tocamos este archivo
 *   2. Podemos agregar interceptors (auth tokens, logging, etc.)
 *   3. Código más limpio en los componentes
 *
 * Para arrancar json-server:
 *   npm run server
 *
 * json-server va a servir:
 *   GET    /tareas       → obtener todas
 *   POST   /tareas       → crear una
 *   PATCH  /tareas/:id   → actualizar parcialmente
 *   DELETE /tareas/:id   → eliminar
 */

const api = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
})

export default api
