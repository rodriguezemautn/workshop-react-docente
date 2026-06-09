# Resolución Paso a Paso — Módulo 01: Fundamentos de React

**Duración estimada:** 60-90 minutos
**Dificultad:** Básica — No se requiere experiencia previa en React
**Requisito:** JavaScript básico (variables, funciones, arrays, objetos, arrow functions)

> 💡 **Proyecto de resolución:** Cada ejercicio tiene su propio proyecto Vite independiente
> en la carpeta [`resolucion/`](./resolucion/). Para ver el ejercicio 01 funcionando:
> ```bash
> cd resolucion/ejercicio-01
> npm install    # solo la primera vez
> npm run dev
> ```

---

## 📋 Índice

- [Paso 0: Configuración del Proyecto con Vite](#paso-0-configuración-del-proyecto-con-vite)
- [Paso 1: JSX — Tu Primer Contacto con React](#paso-1-jsx--tu-primer-contacto-con-react)
- [Paso 2: Props — Datos que Viajan entre Componentes](#paso-2-props--datos-que-viajan-entre-componentes)
- [Paso 3: Composición — Componentes dentro de Componentes](#paso-3-composición--componentes-dentro-de-componentes)
- [Paso 4: Ejercicio 1 — TarjetaPersonal](#paso-4-ejercicio-1--tarjetapersonal)
- [Paso 5: Ejercicio 2 — ListaProductos + ProductoItem](#paso-5-ejercicio-2--listaproductos--productoitem)

---

## 🔰 Paso 0: Configuración del Proyecto con Vite

### 🎯 Objetivo

Crear un proyecto React desde cero usando Vite, la herramienta de build oficialmente recomendada por el equipo de React.

### 📚 Nota Académica — ¿Por qué Vite?

> Históricamente, Create React App (CRA) era la herramienta estándar para iniciar proyectos React. Sin embargo, CRA fue oficialmente deprecada y **Vite es ahora la herramienta recomendada** por la documentación oficial de React (ver [Start a New React Project](https://react.dev/learn/start-a-new-react-project)).
>
> Vite usa **ESBuild** para desarrollo (velocidad extrema) y **Rollup** para producción (build optimizado). Ofrece HMR (Hot Module Replacement) nativo: los cambios en el código se ven al instante sin recargar la página.

### 👣 Instrucciones

**Paso 0.1** — Abrí la terminal y ejecutá:

```bash
npm create vite@latest taskify -- --template react
```

**Explicación línea por línea:**
- `npm create vite@latest` → descarga y ejecuta el scaffolding de Vite
- `taskify` → nombre del proyecto (crea la carpeta `taskify/`)
- `--template react` → usa la plantilla de React (podría ser `react-ts` si usáramos TypeScript)

**📚 Referencia:** [Vite — Getting Started](https://vitejs.dev/guide/)

---

**Paso 0.2** — Entrá a la carpeta e instalá las dependencias:

```bash
cd taskify
npm install
```

**¿Qué pasó acá?**
- `npm install` lee `package.json` y descarga todas las dependencias (react, react-dom, vite, etc.) a la carpeta `node_modules/`
- Apareció un archivo `package-lock.json` que "congela" las versiones exactas instaladas

---

**Paso 0.3** — Abrí el proyecto en tu editor y examiná la estructura:

```
taskify/
├── index.html              # ← Punto de entrada HTML (NO es un SPA framework sin esto)
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx            # ← Conecta React con el DOM
│   ├── App.jsx             # ← Componente raíz de la aplicación
│   └── App.css             # ← Estilos
└── public/
```

**📚 Nota Académica — ¿Por qué un `index.html` en la raíz?**

> A diferencia de frameworks como Next.js, Vite NO oculta el HTML. El `index.html` en la raíz es el **punto de entrada real**. Vite lo trata como parte del build y lo procesa:
> - Inyecta el `<script type="module" src="/src/main.jsx">` automáticamente
> - Agrega los hashes de caché en producción
> - Permite modificar meta tags, fonts, etc. sin plugins

---

**Paso 0.4** — Arrancá el servidor de desarrollo:

```bash
npm run dev
```

Abrí el navegador en la URL que muestra la terminal (generalmente `http://localhost:5173`).

**¿Qué deberías ver?** La página por defecto de Vite + React con el logo giratorio y un contador. Eso significa que:
1. ✅ Node.js sirve correctamente los archivos
2. ✅ Vite compila JSX sin problemas
3. ✅ React renderiza en el navegador

---

**Paso 0.5** — Limpiá el boilerplate para empezar desde cero.

Abrí `src/App.jsx` y **reemplazá TODO su contenido** por:

```jsx
function App() {
  return (
    <div>
      <h1>Taskify</h1>
      <p>Workshop React — Desarrollo de Software 2026</p>
    </div>
  )
}

export default App
```

Luego abrí `src/App.css` y **borrá todo** (dejalo vacío o borrá el archivo).

**¿Qué pasó acá?**
- Eliminamos el código de ejemplo de Vite para construir nuestra propia app
- `App` ahora es una función que retorna JSX simple
- `export default App` hace que otros archivos puedan importarlo

> 🧠 **Check de entendimiento:** Si ahora mirás el navegador, deberías ver solo "Taskify" y el subtítulo. Sin logo, sin contador. Si ves eso, ¡estamos listos!

---

## 📖 Paso 1: JSX — Tu Primer Contacto con React

### 🎯 Objetivo

Entender qué es JSX y crear tu primer componente funcional.

### 📚 Nota Académica — ¿Qué es JSX?

> JSX significa **JavaScript XML**. Es una extensión de sintaxis para JavaScript que permite escribir HTML dentro de JavaScript. Fue creada por Meta (Facebook) para React.
>
> ⚠️ **JSX NO es HTML.** Es azúcar sintáctico que se transforma en llamadas a `React.createElement()`.
>
> ```jsx
> // Esto que escribís:
> const elemento = <h1 className="titulo">Hola</h1>
>
> // Se transforma en esto:
> const elemento = React.createElement('h1', { className: 'titulo' }, 'Hola')
> ```
>
> **Referencia:** [react.dev/learn/writing-markup-with-jsx](https://react.dev/learn/writing-markup-with-jsx)

### 👣 Las 4 Reglas de Oro de JSX

| # | Regla | ❌ Incorrecto | ✅ Correcto |
|---|-------|--------------|-------------|
| 1 | **Un solo elemento raíz** | Dos `<div>` hermanos | `<>... </>` Fragment |
| 2 | **`className` en vez de `class`** | `<div class="...">` | `<div className="...">` |
| 3 | **Expresiones JS con `{}`** | `Hola nombre` | `Hola {nombre}` |
| 4 | **Todas las etiquetas se cierran** | `<br>` | `<br />` o `<br></br>` |

---

### 👣 Creá tu primer componente: `Header`

**Paso 1.1** — Creá la carpeta `src/components/` y dentro un archivo `Header.jsx`:

```jsx
function Header() {
  return (
    <header>
      <h1>Taskify</h1>
      <p>Workshop React — Desarrollo de Software 2026</p>
    </header>
  )
}

export default Header
```

**¿Qué pasó acá? — Explicación línea por línea:**

```jsx
function Header() {          // 1. Declaramos una función. El nombre en PascalCase.
  return (                   // 2. Toda función componente DEBE retornar JSX.
    <header>                 // 3. Un solo elemento raíz (la etiqueta <header>).
      <h1>Taskify</h1>       // 4. JSX se ve como HTML, pero es JavaScript.
      <p>...</p>             // 5. Podemos escribir etiquetas HTML normales.
    </header>                // 6. Cerramos el elemento raíz.
  )                          // 7. Los paréntesis permiten escribir JSX multi-línea.
}                            // 8. Fin de la función.

export default Header        // 9. Exportamos para que otros archivos puedan usarlo.
```

**📚 Nota Académica — PascalCase en componentes:**

> Los nombres de componentes SIEMPRE van en **PascalCase** (primera letra mayúscula de cada palabra). Esto los diferencia de las etiquetas HTML nativas (`div`, `h1`, `header`). Si usaras `header` (minúscula), React pensaría que es la etiqueta HTML `<header>`, no tu componente.
>
> **Referencia:** [react.dev/learn/your-first-component](https://react.dev/learn/your-first-component)

---

**Paso 1.2** — Importá y usá `Header` desde `App.jsx`:

```jsx
import Header from './components/Header'

function App() {
  return (
    <div>
      <Header />
    </div>
  )
}

export default App
```

**¿Qué pasó acá?**
- `import Header from './components/Header'` → trae el componente
- `<Header />` → lo usa como una etiqueta (se cierra sola)
- `Header` retorna `<header><h1>Taskify</h1>...</header>`, que React inserta dentro del `<div>`

> 🧠 **Check de entendimiento:** Si mirás el navegador, ves el mismo texto que antes, PERO ahora viene del componente `Header`. La diferencia es invisible para el usuario, pero enorme para nosotros: ahora tenemos un componente REUTILIZABLE. Podríamos usar `<Header />` en varias páginas y mostraría lo mismo.

---

## 📦 Paso 2: Props — Datos que Viajan entre Componentes

### 🎯 Objetivo

Entender cómo pasar datos de un componente PADRE a un componente HIJO usando PROPS.

### 📚 Nota Académica — ¿Qué son las Props?

> **Props** (de "properties") es el mecanismo de React para pasar datos de un componente padre a un componente hijo.
>
> 🔑 **Características fundamentales de las props:**
>
> 1. **Flujo unidireccional**: los datos SIEMPRE fluyen de padre → hijo. Nunca al revés.
> 2. **Solo lectura**: el hijo NUNCA modifica las props que recibe. Las props son inmutables.
> 3. **Cualquier valor**: strings, números, booleanos, arrays, objetos, funciones, incluso otros componentes.
>
> ```jsx
> // El padre PASA datos:
> <Header titulo="Taskify" tareasPendientes={5} />
>
> // El hijo RECIBE datos:
> function Header({ titulo, tareasPendientes }) { ... }
> ```
>
> **Referencia:** [react.dev/learn/passing-props-to-a-component](https://react.dev/learn/passing-props-to-a-component)

---

### 👣 Modificá `Header` para que reciba props

**Paso 2.1** — Reemplazá el contenido de `src/components/Header.jsx`:

```jsx
function Header({ titulo, subtitulo }) {
  return (
    <header>
      <h1>{titulo}</h1>
      <p>{subtitulo}</p>
    </header>
  )
}

export default Header
```

**¿Qué cambió? — Explicación:**

```jsx
function Header({ titulo, subtitulo }) {
  //             ^^^^^^^^^^^^^^^^^^^^
  // 1. Destructuring del objeto props.
  //    Es equivalente a: function Header(props) {
  //                        const titulo = props.titulo
  //                        const subtitulo = props.subtitulo
  //
  //    El destructuring es una feature de ES6 (JavaScript moderno)
  //    que permite extraer propiedades de un objeto en variables.

  return (
    <header>
      <h1>{titulo}</h1>
      {/*   ^^^^^^^^
        2. Las llaves {} en JSX significan "evaluá esta expresión JS".
           {titulo} toma el valor de la variable y lo muestra.
           Sin llaves, mostraría el texto LITERAL "titulo".
      */}
      <p>{subtitulo}</p>
    </header>
  )
}
```

**📚 Nota Académica — `{}` en JSX:**

> Cualquier expresión de JavaScript puede ir dentro de `{}` en JSX. Ejemplos válidos:
> - `{nombre}` → muestra el valor de la variable
> - `{2 + 2}` → muestra 4
> - `{nombre.toUpperCase()}` → llama a un método
> - `{condicion ? 'Sí' : 'No'}` → operador ternario
>
> Lo que NO puede ir: declaraciones (`if`, `for`, `while`). S
> olo EXPRESIONES (algo que produce un valor).
>
> **Referencia:** [react.dev/learn/javascript-in-jsx-with-curly-braces](https://react.dev/learn/javascript-in-jsx-with-curly-braces)

---

**Paso 2.2** — Ahora actualizá `App.jsx` para pasar las props:

```jsx
import Header from './components/Header'

function App() {
  return (
    <div>
      <Header
        titulo="Taskify"
        subtitulo="Workshop React — Desarrollo de Software 2026"
      />
    </div>
  )
}

export default App
```

**¿Qué pasó acá?**
- `<Header titulo="Taskify" subtitulo="..."/>` → le estamos pasando DOS props a Header
- `titulo="Taskify"` → el valor es un string (las comillas indican string)
- React recolecta todas las props en un objeto: `{ titulo: 'Taskify', subtitulo: '...' }`
- Ese objeto se pasa como argumento a la función `Header`
- `{titulo}` en el JSX se evalúa como `'Taskify'`

**💡 Tip:** Podrías pasar cualquier tipo de dato:
- `contador={5}` → número (con llaves)
- `activo={true}` → booleano (con llaves)
- `usuarios={['Ana', 'Luis']}` → array (con llaves)
- `onClick={handleClick}` → función (con llaves)

> 🧠 **Check de entendimiento:** Si todo funciona, el navegador muestra exactamente lo mismo que antes. La diferencia es CONCEPTUAL: ahora `Header` no tiene datos fijos, sino que RECIBE datos desde `App`. Esto permite reutilizar `Header` con diferentes títulos.

---

### 👣 Creá un segundo componente con props: `TaskCard`

**Paso 2.3** — Creá `src/components/TaskCard.jsx`:

```jsx
function TaskCard({ titulo, completada }) {
  return (
    <li>
      <span>{completada ? '✅' : '⬜'}</span>
      <span>{titulo}</span>
    </li>
  )
}

export default TaskCard
```

**¿Qué hay de nuevo acá?**

```jsx
<span>{completada ? '✅' : '⬜'}</span>
//            ^^^^^^^^^^^^^^^^^^^^^^^^
// OPERADOR TERNARIO dentro de JSX.
// Si completada es true → muestra ✅
// Si completada es false → muestra ⬜
//
// El ternario es la forma de hacer "if/else" dentro de JSX.
// No podemos usar if porque es una DECLARACIÓN, no una expresión.
//
// Sintaxis: condicion ? valor_si_true : valor_si_false
```

**📚 Nota Académica — Renderizado Condicional:**

> En React no se pueden usar `if`, `for`, `switch` directamente dentro del JSX. Solo EXPRESIONES. Las herramientas disponibles son:
>
> 1. **Operador ternario**: `{cond ? <A /> : <B />}` → elige entre dos opciones
> 2. **AND lógico**: `{cond && <A />}` → muestra A solo si cond es true (sin "else")
> 3. **Variable con if**: calculás un valor antes del return y lo usás
>
> ```jsx
> // Opción 3 — calcular antes del return:
> function Saludo({ usuario }) {
>   let mensaje
>   if (usuario) {
>     mensaje = <p>Bienvenido {usuario}</p>
>   } else {
>     mensaje = <p>Bienvenido invitado</p>
>   }
>   return <div>{mensaje}</div>
> }
> ```
>
> **Referencia:** [react.dev/learn/conditional-rendering](https://react.dev/learn/conditional-rendering)

---

**Paso 2.4** — Usá `TaskCard` desde `App.jsx` para probarlo:

```jsx
import Header from './components/Header'
import TaskCard from './components/TaskCard'

function App() {
  return (
    <div>
      <Header
        titulo="Taskify"
        subtitulo="Workshop React — Desarrollo de Software 2026"
      />

      <h2>Mis tareas</h2>

      <ul>
        <TaskCard titulo="Aprender JSX" completada={false} />
        <TaskCard titulo="Crear mi primer componente" completada={true} />
      </ul>
    </div>
  )
}

export default App
```

> 🧠 **Check de entendimiento:** En el navegador deberías ver dos tareas: una sin completar (⬜) y una completada (✅). Fijate cómo `TaskCard` se usa DOS VECES con diferentes props. Eso es REUTILIZACIÓN.

---

## 🧩 Paso 3: Composición — Componentes dentro de Componentes

### 🎯 Objetivo

Aprender el patrón de composición: un componente que contiene a otros componentes. Este es el fundamento de toda UI en React.

### 📚 Nota Académica — ¿Qué es Composición?

> **Composición** es el patrón de construir UIs complejas combinando componentes más pequeños. En React, TODO es composición. No hay herencia (como en OOP clásico).
>
> ```
> App
>  ├── Header (props: titulo, subtitulo)
>  └── TaskList (props: tareas)
>       ├── TaskCard (props: titulo, completada)
>       ├── TaskCard (props: titulo, completada)
>       └── TaskCard (props: titulo, completada)
> ```
>
> Cada componente se enfoca en UNA sola responsabilidad. TaskList no sabe cómo se ve una TaskCard individual. Solo sabe que tiene una lista de tareas y que cada una se renderiza con TaskCard.
>
> **Referencia:** [react.dev/learn/importing-and-exporting-components](https://react.dev/learn/importing-and-exporting-components)

---

### 👣 Creá `TaskList` que compone múltiples `TaskCard`

**Paso 3.1** — Creá `src/components/TaskList.jsx`:

```jsx
import TaskCard from './TaskCard'

function TaskList({ tareas }) {
  return (
    <section>
      <h2>Mis tareas</h2>

      {tareas.length === 0 ? (
        <p>No hay tareas todavía.</p>
      ) : (
        <ul>
          {tareas.map((tarea) => (
            <TaskCard
              key={tarea.id}
              titulo={tarea.titulo}
              completada={tarea.completada}
            />
          ))}
        </ul>
      )}
    </section>
  )
}

export default TaskList
```

**¿Qué pasó acá? — Explicación DETALLADA de cada concepto nuevo:**

```jsx
function TaskList({ tareas }) {
  // 1. Recibe un ARRAY de tareas como prop.
  //    tareas = [
  //      { id: 1, titulo: 'Aprender JSX', completada: false },
  //      { id: 2, titulo: 'Crear componente', completada: true },
  //    ]

  return (
    <section>
      <h2>Mis tareas</h2>

      {/* 2. RENDERIZADO CONDICIONAL con ternario:
            ¿El array está vacío? Si sí → mensaje. Si no → lista. */}
      {tareas.length === 0 ? (
        <p>No hay tareas todavía.</p>
      ) : (
        <ul>
          {/* 3. .map() transforma CADA elemento del array en JSX.
                Es como un forEach que devuelve un nuevo array. */}
          {tareas.map((tarea) => (
            <TaskCard              // Por cada tarea, creamos un TaskCard
              key={tarea.id}       // key ÚNICA para que React pueda rastrearlo
              titulo={tarea.titulo} // pasamos el título como prop
              completada={tarea.completada} // pasamos el estado como prop
            />
          ))}
        </ul>
      )}
    </section>
  )
}
```

**📚 Nota Académica — `.map()` en React:**

> `.map()` es el método de arrays de JavaScript que usamos en React para transformar datos en JSX. NO uses `forEach` (no retorna nada) ni bucles `for` (no se pueden usar dentro de JSX).
>
> ```jsx
// ❌ ESTO NO FUNCIONA:
// {forEach(item => <Componente />)}
// ❌ ESTO TAMPOCO:
// {for (let i = 0; i < items.length; i++) { ... }}
// ✅ ESTO SÍ:
// {items.map(item => <Componente key={item.id} />)}
> ```
>
> **Referencia:** [react.dev/learn/rendering-lists](https://react.dev/learn/rendering-lists)

**📚 Nota Académica — La prop `key`:**

> Cada vez que renderizás una lista, React necesita identificar qué elementos cambiaron, se agregaron o se eliminaron. La prop `key` le da a React esa información.
>
> ✅ **Usá el ID del dato:** `key={producto.id}`
> ❌ **No uses el índice del array:** `key={index}` (salvo que la lista sea estática y nunca se reordene)
>
> Sin una `key` adecuada, React podría:
> - Re-renderizar todos los items en lugar de solo el que cambió
> - Mezclar el estado interno de los componentes
> - Causar bugs sutiles en animaciones y formularios
>
> **Referencia:** [react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key](https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key)

---

**Paso 3.2** — Ahora actualizá `App.jsx` para usar `TaskList` con datos:

```jsx
import Header from './components/Header'
import TaskList from './components/TaskList'

const tareasIniciales = [
  { id: 1, titulo: 'Aprender JSX', completada: false },
  { id: 2, titulo: 'Crear mi primer componente', completada: true },
  { id: 3, titulo: 'Entender las props', completada: false },
  { id: 4, titulo: 'Practicar composición', completada: false },
]

function App() {
  return (
    <div>
      <Header
        titulo="Taskify"
        subtitulo="Workshop React — Desarrollo de Software 2026"
      />
      <TaskList tareas={tareasIniciales} />
    </div>
  )
}

export default App
```

**¿Qué pasó acá?**

1. Definimos `tareasIniciales` como un array de objetos AFUERA del componente (es un dato estático)
2. Lo pasamos a `TaskList` como prop: `<TaskList tareas={tareasIniciales} />`
3. `TaskList` recibe el array, usa `.map()` para transformar cada tarea en un `TaskCard`
4. El flujo completo: `App` → `TaskList` → `TaskCard` (datos fluyen de padre a hijo)

**💡 ¿Por qué `tareasIniciales` está fuera del componente?**

> Porque es un dato estático que no cambia. Si lo definiéramos DENTRO de `App`, se recrearía en CADA renderizado (una operación innecesaria). Para datos que cambian, usamos `useState` (lo veremos en el Módulo 02).

> 🧠 **Check de entendimiento:** En el navegador ves 4 tareas, cada una con su checkbox visual (⬜ o ✅). TaskList compone 4 instancias de TaskCard. Si cambiaras el array `tareasIniciales`, la UI se actualizaría automáticamente. ¡Eso es React!

---

## 🏋️ Paso 4: Ejercicio 1 — TarjetaPersonal

### 🎯 Objetivo

Crear un componente que reciba props y demuestre REUTILIZACIÓN: usar el mismo componente múltiples veces con diferentes datos.

### 📚 Nota Académica — Componentes Puros (Stateless/Dumb)

> `TarjetaPersonal` es un **componente puro** o **presentacional**:
> - No tiene estado interno (no usa `useState`)
> - Solo recibe props y renderiza
> - Dado el mismo input (props), produce el mismo output (JSX)
> - Es predecible, testeable y fácil de entender
>
> Este es el tipo de componente que debería ser la MAYORÍA de tu aplicación. Mantener la lógica de negocio separada de la presentación es una de las claves de una arquitectura React escalable.
>
> **Referencia:** [react.dev/learn/your-first-component](https://react.dev/learn/your-first-component)

---

### 👣 Resolución

> 💡 **Solución de referencia:** [`resolucion/ejercicio-01/`](./resolucion/ejercicio-01/)
> Si te trabás, entrá a esa carpeta, corré `npm install && npm run dev` y
> explorá el código en `src/TarjetaPersonal.jsx`.

**Paso 4.1** — Creá `src/components/TarjetaPersonal.jsx`:

```jsx
function TarjetaPersonal({ nombre, edad, ciudad }) {
  return (
    <article>
      <header>
        <span>👤</span>
        <h3>{nombre}</h3>
      </header>

      <ul>
        <li>
          <span>Edad:</span>
          <span>{edad} años</span>
        </li>
        <li>
          <span>Ciudad:</span>
          <span>{ciudad}</span>
        </li>
      </ul>
    </article>
  )
}

export default TarjetaPersonal
```

**Explicación:**

```jsx
function TarjetaPersonal({ nombre, edad, ciudad }) {
  // Recibimos 3 props: nombre (string), edad (number), ciudad (string)
  //
  // DESTRUCTURING: en lugar de escribir:
  //   function TarjetaPersonal(props) {
  //     const nombre = props.nombre
  //     const edad = props.edad
  //     const ciudad = props.ciudad
  //
  // Extraemos directamente en los parámetros de la función.
  // Es más limpio y legible.

  return (
    <article>
      {/* <article> es una etiqueta semántica de HTML5.
          Representa contenido autocontenido (como una tarjeta).
          Los buscadores y lectores de pantalla la interpretan
          mejor que un <div> genérico. */}
      <header>
        <span>👤</span>
        <h3>{nombre}</h3>
      </header>

      <ul>
        <li>
          <span>Edad:</span>
          <span>{edad} años</span>
          {/*             ^^^^^
            Concatenamos "años" al valor de {edad}.
            Como está dentro de JSX, necesitamos llaves {}
            para que React evalúe la variable.
            El resultado es "25 años".
          */}
        </li>
        <li>
          <span>Ciudad:</span>
          <span>{ciudad}</span>
        </li>
      </ul>
    </article>
  )
}
```

---

**Paso 4.2** — Importalo y usalo 3 veces en `App.jsx`:

```jsx
import Header from './components/Header'
import TaskList from './components/TaskList'
import TarjetaPersonal from './components/TarjetaPersonal'

const tareasIniciales = [
  { id: 1, titulo: 'Aprender JSX', completada: false },
  { id: 2, titulo: 'Crear mi primer componente', completada: true },
  { id: 3, titulo: 'Entender las props', completada: false },
  { id: 4, titulo: 'Practicar composición', completada: false },
]

function App() {
  return (
    <div>
      <Header
        titulo="Taskify"
        subtitulo="Workshop React — Desarrollo de Software 2026"
      />

      <section>
        <h2>🧑‍🏫 Ejercicio 1: Tarjeta Personal</h2>

        <div className="tarjetas-container">
          <TarjetaPersonal
            nombre="Ana García"
            edad={25}
            ciudad="Buenos Aires"
          />

          <TarjetaPersonal
            nombre="Luis Pérez"
            edad={30}
            ciudad="Córdoba"
          />

          <TarjetaPersonal
            nombre="María López"
            edad={22}
            ciudad="Rosario"
          />
        </div>
      </section>

      <TaskList tareas={tareasIniciales} />
    </div>
  )
}

export default App
```

**¿Qué demuestra esto?**

```jsx
<TarjetaPersonal nombre="Ana García" edad={25} ciudad="Buenos Aires" />
<TarjetaPersonal nombre="Luis Pérez" edad={30} ciudad="Córdoba" />
<TarjetaPersonal nombre="María López" edad={22} ciudad="Rosario" />
```

El MISMO componente, 3 veces, con DIFERENTES props → 3 tarjetas distintas.

**📚 Nota Académica — Reutilización:**

> Este es el poder de los componentes. Un componente bien diseñado puede renderizarse N veces con diferentes datos. Piensa en:
> - Una lista de productos: usás el mismo `ProductoItem` para cada producto
> - Una grilla de fotos: usás el mismo `FotoCard` para cada foto
> - Un muro de tweets: usás el mismo `Tweet` para cada tweet
>
> En cada caso, el componente es el mismo, pero las props cambian. Esto es COMPOSICIÓN + REUTILIZACIÓN, los pilares de React.

---

### 💅 Paso 4.3 — Agregá estilos básicos

Agregá estos estilos a `src/index.css` (o al archivo de estilos que estés usando):

```css
/* ==============================================
   Estilos Básicos — Módulo 01
   ============================================== */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  background-color: #f0f2f5;
  color: #1a1a2e;
  line-height: 1.6;
  padding: 2rem;
}

#root {
  max-width: 720px;
  margin: 0 auto;
}

/* --- Header --- */
header {
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid #e2e8f0;
}

header h1 {
  font-size: 2.5rem;
  color: #2563eb;
  font-weight: 800;
}

header p {
  color: #94a3b8;
  font-size: 0.95rem;
  margin-top: 0.25rem;
}

/* --- TaskList --- */
section {
  background: #ffffff;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

section h2 {
  font-size: 1.25rem;
  margin-bottom: 1rem;
}

section ul {
  list-style: none;
}

section ul li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: #f8fafc;
  border-radius: 8px;
  margin-bottom: 0.5rem;
}

/* --- Tarjetas --- */
.tarjetas-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.tarjetas-container article {
  background: #f8fafc;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  border: 1px solid #e2e8f0;
  transition: transform 0.2s ease;
}

.tarjetas-container article:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.tarjetas-container article span {
  font-size: 2.5rem;
  display: block;
  margin-bottom: 0.5rem;
}

.tarjetas-container article h3 {
  font-size: 1.2rem;
  margin-bottom: 0.75rem;
}

.tarjetas-container article ul {
  list-style: none;
  text-align: left;
  font-size: 0.9rem;
}

.tarjetas-container article ul li {
  padding: 0.35rem 0;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px dashed #e2e8f0;
  background: transparent;
}

.tarjetas-container article ul li:last-child {
  border-bottom: none;
}
```

> 🧠 **Check de entendimiento:** Ahora tenés una sección con 3 tarjetas visuales mostrando los datos de 3 personas distintas. Cada tarjeta es una instancia independiente de `TarjetaPersonal`. Si cambiaras los datos de una, las otras no se verían afectadas.

---

## 🏋️ Paso 5: Ejercicio 2 — ListaProductos + ProductoItem

### 🎯 Objetivo

Aplicar composición de componentes con listas: crear un componente que recibe un array y renderiza múltiples componentes hijos usando `.map()` con `key`.

**Conceptos nuevos:**
- Composición a 2 niveles: `App` → `ListaProductos` → `ProductoItem`
- Prop `key` obligatoria en listas
- Renderizado condicional para lista vacía y producto agotado

---

### 👣 Resolución

**Paso 5.1** — Creá `src/components/ProductoItem.jsx`:

```jsx
function ProductoItem({ nombre, precio, disponible }) {
  const precioFormateado = `$ ${precio.toLocaleString('es-AR')}`

  return (
    <li>
      <div>
        <span>{nombre}</span>
        <span>{precioFormateado}</span>
      </div>

      <span>
        {disponible ? '✅ Disponible' : '❌ Agotado'}
      </span>
    </li>
  )
}

export default ProductoItem
```

**Explicación:**

```jsx
const precioFormateado = `$ ${precio.toLocaleString('es-AR')}`
//                          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// TEMPLATE STRING (ES6): permite interpolar variables con ${}.
// toLocaleString('es-AR') formatea el número con separadores
// de miles según el formato argentino.
//
// 850000 → "$ 850.000"
// 15000  → "$ 15.000"

return (
  <li>
    <div>
      <span>{nombre}</span>
      <span>{precioFormateado}</span>
    </div>

    <span>
      {disponible ? '✅ Disponible' : '❌ Agotado'}
      // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      // TERNARIO: elige qué mostrar según el valor de disponible.
      // Esto es RENDERIZADO CONDICIONAL.
    </span>
  </li>
)
```

---

**Paso 5.2** — Creá `src/components/ListaProductos.jsx`:

```jsx
import ProductoItem from './ProductoItem'

function ListaProductos({ productos }) {
  return (
    <section>
      <h2>Lista de Productos</h2>

      {productos.length === 0 ? (
        <p>No hay productos disponibles</p>
      ) : (
        <ul>
          {productos.map((producto) => (
            <ProductoItem
              key={producto.id}
              nombre={producto.nombre}
              precio={producto.precio}
              disponible={producto.disponible}
            />
          ))}
        </ul>
      )}
    </section>
  )
}

export default ListaProductos
```

**Explicación detallada — ¿Qué hace CADA línea?**

```jsx
function ListaProductos({ productos }) {
  // 1. Recibe un array de objetos producto como prop.
  //    Cada producto tiene: { id, nombre, precio, disponible }

  return (
    <section>
      <h2>Lista de Productos</h2>

      {productos.length === 0 ? (
        // 2. GUARDA: si la lista está vacía, mostramos un mensaje
        //    Esto es MEJOR UX que mostrar una lista vacía sin texto.
        //    El usuario entiende que no hay productos, no que "no cargó".
        <p>No hay productos disponibles</p>
      ) : (
        <ul>
          {productos.map((producto) => (
            // 3. .map() recorre CADA elemento del array.
            //    Para CADA producto, crea un <ProductoItem />.
            //
            //    ¿Cómo funciona .map() en detalle?
            //    productos = [
            //      { id: 1, nombre: 'Notebook', precio: 850000, disponible: true },
            //      { id: 2, nombre: 'Mouse', precio: 15000, disponible: false },
            //    ]
            //
            //    productos.map(producto => ...) retorna:
            //    [
            //      <ProductoItem key={1} nombre="Notebook" precio={850000} disponible={true} />,
            //      <ProductoItem key={2} nombre="Mouse" precio={15000} disponible={false} />,
            //    ]
            //
            //    React toma ese ARRAY DE JSX y lo renderiza.

            <ProductoItem
              key={producto.id}       // ← OBLIGATORIO. Único, estable, inmutable.
              nombre={producto.nombre} // ← Cada cosa que pasamos es una PROP individual.
              precio={producto.precio}
              disponible={producto.disponible}
            />
          ))}
        </ul>
      )}
    </section>
  )
}
```

---

**Paso 5.3** — Integrá todo en `App.jsx`. El archivo completo queda así:

```jsx
import Header from './components/Header'
import TaskList from './components/TaskList'
import TarjetaPersonal from './components/TarjetaPersonal'
import ListaProductos from './components/ListaProductos'

const tareasIniciales = [
  { id: 1, titulo: 'Aprender JSX', completada: false },
  { id: 2, titulo: 'Crear mi primer componente', completada: true },
  { id: 3, titulo: 'Entender las props', completada: false },
  { id: 4, titulo: 'Practicar composición', completada: false },
]

const productos = [
  { id: 1, nombre: 'Notebook', precio: 850000, disponible: true },
  { id: 2, nombre: 'Mouse', precio: 15000, disponible: false },
  { id: 3, nombre: 'Teclado', precio: 35000, disponible: true },
  { id: 4, nombre: 'Monitor', precio: 220000, disponible: true },
  { id: 5, nombre: 'Auriculares', precio: 45000, disponible: false },
]

function App() {
  return (
    <div>
      <Header
        titulo="Taskify"
        subtitulo="Workshop React — Desarrollo de Software 2026"
      />

      {/* ════════════════════════════════════════
          EJERCICIO 1: TarjetaPersonal
          ════════════════════════════════════════ */}
      <section>
        <h2>🧑‍🏫 Módulo 01 — Ejercicio 1: Tarjeta Personal</h2>
        <div className="tarjetas-container">
          <TarjetaPersonal
            nombre="Ana García"
            edad={25}
            ciudad="Buenos Aires"
          />
          <TarjetaPersonal
            nombre="Luis Pérez"
            edad={30}
            ciudad="Córdoba"
          />
          <TarjetaPersonal
            nombre="María López"
            edad={22}
            ciudad="Rosario"
          />
        </div>
      </section>

      {/* ════════════════════════════════════════
          EJERCICIO 2: ListaProductos
          ════════════════════════════════════════ */}
      <section>
        <h2>🧑‍🏫 Módulo 01 — Ejercicio 2: Lista de Productos</h2>
        <ListaProductos productos={productos} />
      </section>

      {/* ════════════════════════════════════════
          TASKIFY: Lista de tareas principal
          ════════════════════════════════════════ */}
      <TaskList tareas={tareasIniciales} />
    </div>
  )
}

export default App
```

**¿Qué pasó acá?**

- `App` es el componente RAÍZ que ORQUESTA todo
- `Header` muestra el título
- Sección 1: `TarjetaPersonal` x3 → demuestra REUTILIZACIÓN con props
- Sección 2: `ListaProductos` recibe `productos` array → internamente usa `.map()` → renderiza `ProductoItem`
- Sección 3: `TaskList` recibe `tareasIniciales` → internamente usa `.map()` → renderiza `TaskCard`

**El flujo de datos completo:**

```
App (dueña de los datos)
 │
 ├── Header ← props: { titulo, subtitulo }
 │
 ├── TarjetaPersonal ← props: { nombre, edad, ciudad }  (x3)
 │
 ├── ListaProductos ← props: { productos: [...] }
 │    └── ProductoItem ← props: { nombre, precio, disponible }  (x5)
 │
 └── TaskList ← props: { tareas: [...] }
      └── TaskCard ← props: { titulo, completada }  (x4)
```

---

### 💅 Paso 5.4 — Estilos para la lista de productos

Agregá estos estilos adicionales al CSS:

```css
/* --- ListaProductos + ProductoItem --- */
section ul li div {
  display: flex;
  gap: 1rem;
  align-items: center;
}

section ul li div span:last-child {
  color: #475569;
  font-size: 0.9rem;
}

section ul li > span:last-child {
  font-size: 0.85rem;
  font-weight: 500;
  margin-left: auto;
}

/* --- Etiquetas de estado --- */
.disponible {
  color: #16a34a;
}

.agotado {
  color: #dc2626;
}
```

---

## ✅ Resumen del Módulo 01

### Conceptos aprendidos

| Concepto | Explicación | Lo viste en |
|----------|-------------|-------------|
| **JSX** | JavaScript + XML. Escribís HTML dentro de JS. | Paso 1 — Header |
| **Componente funcional** | Función que retorna JSX. Bloque fundamental de React. | Paso 1 — Header |
| **Props** | Datos que el padre pasa al hijo. Son de solo lectura. | Paso 2 — Header con props |
| **Destructuring** | Extraer propiedades de objetos en variables. | Paso 2 — `{ titulo, subtitulo }` |
| **Expresiones en JSX** | Usar `{}` para evaluar JS dentro del JSX. | Paso 2 — `{titulo}`, `{edad} años` |
| **Renderizado condicional** | Ternario: `{cond ? <A/> : <B/>}`. AND: `{cond && <A/>}`. | Paso 2 — TaskCard, ProductoItem |
| **Composición** | Componentes dentro de componentes. | Paso 3 — TaskList contiene TaskCard |
| **`.map()`** | Transformar arrays en listas de JSX. | Paso 3 — TaskList, Paso 5 — ListaProductos |
| **Prop `key`** | Identificador único para cada elemento de una lista. | Paso 3 — `key={tarea.id}` |
| **Reutilización** | Mismo componente, diferentes props, diferentes resultados. | Paso 4 — TarjetaPersonal x3 |

### 📚 Referencias del Módulo

| Tema | Link |
|------|------|
| Empezar un proyecto React | [react.dev/learn/start-a-new-react-project](https://react.dev/learn/start-a-new-react-project) |
| Tu primer componente | [react.dev/learn/your-first-component](https://react.dev/learn/your-first-component) |
| JSX | [react.dev/learn/writing-markup-with-jsx](https://react.dev/learn/writing-markup-with-jsx) |
| JS en JSX con `{}` | [react.dev/learn/javascript-in-jsx-with-curly-braces](https://react.dev/learn/javascript-in-jsx-with-curly-braces) |
| Props | [react.dev/learn/passing-props-to-a-component](https://react.dev/learn/passing-props-to-a-component) |
| Renderizado condicional | [react.dev/learn/conditional-rendering](https://react.dev/learn/conditional-rendering) |
| Renderizado de listas | [react.dev/learn/rendering-lists](https://react.dev/learn/rendering-lists) |
| Importar y exportar componentes | [react.dev/learn/importing-and-exporting-components](https://react.dev/learn/importing-and-exporting-components) |
| Vite | [vitejs.dev/guide](https://vitejs.dev/guide/) |
| `Array.map()` | [MDN — map](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/map) |
| Template strings | [MDN — Template literals](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Template_literals) |
| Operador ternario | [MDN — Conditional operator](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Conditional_operator) |

---

### 🚀 Para seguir practicando

1. Agregá una nueva tarjeta a `TarjetaPersonal` con una prop `email`
2. Hacé que `ProductoItem` muestre el precio en dólares además de pesos
3. Agregá un nuevo producto al array y fijate cómo se renderiza automáticamente
4. Cambiá una prop de una tarjeta sin tocar las otras (ej: cambiá solo la edad de Ana)
5. Ordená los productos por precio antes de pasarlos a `ListaProductos`

---

> **Fin del Módulo 01.** Cuando el alumno llegue acá, debería tener:
> - Una app React funcionando con Vite
> - Componentes funcionales con props
> - Composición de componentes
> - Listas renderizadas con `.map()` y `key`
> - Renderizado condicional con ternarios
> - Capacidad de leer y entender código JSX básico
