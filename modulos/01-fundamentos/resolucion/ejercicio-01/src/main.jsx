/* =========================================================
   main.jsx — Punto de entrada del Ejercicio 01
   Módulo 01: Fundamentos de React
   
   ReactDOM.createRoot() monta la app en el DOM.
   StrictMode activa verificaciones extra en desarrollo.
   ========================================================= */

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
