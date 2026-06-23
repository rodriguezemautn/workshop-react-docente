import ListaPosts from './components/ListaPosts'

function App() {
  return (
    <div>
      <header className="app-header">
        <h1>🧑‍🏫 Ejercicio 01: Consumir JSONPlaceholder</h1>
        <p>Módulo 07 — API y HTTP</p>
      </header>
      <main>
        <ListaPosts />
      </main>
    </div>
  )
}

export default App
