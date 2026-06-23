import React from 'react'
import ReactDOM from 'react-dom/client'
import { TemaProvider } from './context/TemaContext'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TemaProvider>
      <App />
    </TemaProvider>
  </React.StrictMode>
)
