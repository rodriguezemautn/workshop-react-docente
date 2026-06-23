import React from 'react'
import ReactDOM from 'react-dom/client'
import { CarritoProvider } from './context/CarritoContext'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CarritoProvider>
      <App />
    </CarritoProvider>
  </React.StrictMode>
)
