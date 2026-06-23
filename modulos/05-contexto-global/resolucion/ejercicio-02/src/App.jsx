import Header from './components/Header'
import Productos from './components/Productos'
import Carrito from './components/Carrito'

function App() {
  return (
    <div className="app">
      <Header />
      <main className="contenido">
        <Productos />
        <Carrito />
      </main>
    </div>
  )
}

export default App
