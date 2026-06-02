/* =========================================================
   Taskify — Punto de entrada principal
   =========================================================

   📖 ¿Qué hace este archivo?
   ───────────────────────────
   Es el punto de ENTRADA de la aplicación React.
   
   1. ReactDOM.createRoot() crea la raíz de React en el DOM
   2. .render() monta la aplicación dentro de <div id="root">
   3. <React.StrictMode> activa verificaciones en desarrollo
      (doble render, detección de efectos sin cleanup, etc.)
   
   🚀 ¿Por qué no escribimos HTML directamente?
   ────────────────────────────────────────────
   React NO trabaja con el DOM directamente. Usa un VIRTUAL DOM
   en memoria. main.jsx es el puente entre React y el DOM real.
   
   createRoot() (React 18+) reemplaza a ReactDOM.render():
   - Habilita el "concurrent mode" (renderizado interrumpible)
   - Mejor soporte para Suspense y transiciones
   (react.dev/reference/react-dom/client/createRoot)

   🧩 Providers (Módulo 05):
   ──────────────────────────
   Acá envolvemos la app con los Context Providers.
   Cada Provider agrega una capa de estado global accesible
   desde cualquier componente hijo.
   
   Orden de los Providers: el orden noImporta si no dependen
   entre sí, pero mantengo una jerarquía lógica.
   
   📚 Referencias:
   ────────────────
   - react.dev/reference/react-dom/client/createRoot
   - react.dev/reference/react/StrictMode
   - react.dev/learn/start-a-new-react-project
   ========================================================= */

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { TemaProvider } from './context/TemaContext'
import { CarritoProvider } from './context/CarritoContext'

/* 
  createRoot + render:
  - 'root' es el ID del div en index.html
  - StrictMode solo afecta en desarrollo (dev)
  - En producción, StrictMode no hace nada
*/
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/*
      ═══════════════════════════
      PROVEEDORES DE CONTEXTO
      ═══════════════════════════
      
      TemaProvider → tema claro/oscuro (useTema)
      CarritoProvider → carrito de compras (useCarrito)
      
      Ambos son independientes. El orden no importa.
      Podrían estar anidados en cualquier orden.
      
      Cualquier componente dentro de App puede
      usar useTema() y useCarrito() sin prop drilling.
    */}
    <TemaProvider>
      <CarritoProvider>
        <App />
      </CarritoProvider>
    </TemaProvider>
  </React.StrictMode>
)
