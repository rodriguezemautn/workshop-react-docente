import Header from './components/Header'
import { useTema } from './context/TemaContext'

function Contenido() {
  const { tema } = useTema()

  return (
    <main className="contenido">
      <section className="tarjeta">
        <h2>¿Qué es React Context?</h2>
        <p>
          Context nos permite compartir datos entre componentes sin tener
          que pasarlos explícitamente por props en cada nivel del árbol.
          Es ideal para datos globales como el tema, el usuario autenticado,
          o el idioma de la aplicación.
        </p>
      </section>

      <section className="tarjeta">
        <h2>¿Cómo funciona este ejercicio?</h2>
        <p>
          El tema ({tema}) se guarda en un Context y cualquier componente
          puede leerlo o modificarlo usando el custom hook <code>useTema</code>.
          Además, el tema elegido persiste en localStorage para que no se
          pierda al recargar la página.
        </p>
      </section>

      <section className="tarjeta">
        <h2>Componentes que reaccionan al tema</h2>
        <p>
          Todos los componentes de esta página usan las variables CSS
          definidas en <code>:root</code> y <code>[data-tema="oscuro"]</code>.
          Cuando cambiás el tema, el <code>data-tema</code> en el &lt;html&gt;
          se actualiza y todos los estilos cambian automáticamente.
        </p>
      </section>
    </main>
  )
}

function App() {
  return (
    <div className="app">
      <Header />
      <Contenido />
    </div>
  )
}

export default App
