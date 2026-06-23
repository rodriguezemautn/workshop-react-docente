# Changelog — Taskify Workshop React

Todas las modificaciones significativas en este proyecto serán documentadas aquí.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es/1.1.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.2.0] — 2026-06-23

### ✨ Añadido

#### Módulo 03: Interactividad y Listas (`feat/03_interactividad` → PR #9)

- **Ejercicio 01 resuelto** — `modulos/03-interactividad/resolucion/ejercicio-01/`
  - `ListaCompras` con CRUD completo: agregar, toggle comprado/no comprado, eliminar
  - Contador de items y comprados, botón "Limpiar comprados"
  - Estado vacío con mensaje informativo
  - BEM classes para estilos

- **Ejercicio 02 resuelto** — `modulos/03-interactividad/resolucion/ejercicio-02/`
  - `BuscadorPaises` con filtro en tiempo real
  - Array de 20 países, filtro case-insensitive con `.filter()` + `.includes()`
  - Resaltado de texto coincidente con `<mark>` (sin bug de lastIndex)
  - Resultados ordenados alfabéticamente, contador de resultados

#### Módulo 04: Efectos y Persistencia (`feat/04_efectos_y_persistencia` → PR #10)

- **Ejercicio 01 resuelto** — `modulos/04-efectos-y-persistencia/resolucion/ejercicio-01/`
  - `ListaCompras` persistente con localStorage
  - `useState` con lazy initializer para leer datos guardados al montar
  - `useEffect` con `[items]` para guardar cambios automáticamente
  - `try/catch` para manejar localStorage corrupto

- **Ejercicio 02 resuelto** — `modulos/04-efectos-y-persistencia/resolucion/ejercicio-02/`
  - `Cronometro` con `setInterval` cada 10ms y cleanup en `useEffect`
  - `useRef` para mantener el ID del intervalo entre renders
  - Formato `MM:SS:ss` con `padStart(2, '0')`
  - Botones Iniciar/Reanudar, Pausar, Reiniciar con `disabled` según estado
  - Display verde (corriendo) / rojo (pausado)

#### Módulo 05: Contexto Global (`feat/05_contexto_global` → PR #11)

- **Ejercicio 01 resuelto** — `modulos/05-contexto-global/resolucion/ejercicio-01/`
  - `TemaContext` con `createContext` + `Provider` + custom hook `useTema`
  - Validación de uso fuera del Provider (error claro)
  - Variables CSS con `[data-tema="oscuro"]` en el `<html>`
  - Persistencia en localStorage, transición suave en colores

- **Ejercicio 02 resuelto** — `modulos/05-contexto-global/resolucion/ejercicio-02/`
  - `CarritoContext` con agregar, quitar (decrementar), limpiar carrito
  - Acumulación por producto con `findIndex` + aumentar cantidad
  - Derived state para total y cantidad total (sin duplicar estado)
  - `useCallback` para estabilidad de funciones del contexto
  - Badge animado en Header, layout de dos columnas

#### Módulo 06: Formularios (`feat/06_formularios` → PR #12)

- **Ejercicio 01 resuelto** — `modulos/06-formularios/resolucion/ejercicio-01/`
  - `FormularioRegistro` con React Hook Form
  - `register`, `handleSubmit`, `watch`, `reset`, `formState`
  - Validaciones declarativas: required, minLength, pattern, custom validate
  - `watch('password')` para validación cruzada de confirmar contraseña
  - `isSubmitting` con simulación de delay, `reset()` post-submit

- **Ejercicio 02 resuelto** — `modulos/06-formularios/resolucion/ejercicio-02/`
  - `TaskForm` con validación personalizada vía `validate` como objeto
  - Validaciones: no solo espacios, título único contra tareas existentes
  - Contador de caracteres en tiempo real con `watch`
  - Simulación de validación asíncrona con `setTimeout`

#### Módulo 07: API y HTTP (`feat/07_api_y_http` → PR #13)

- **Ejercicio 01 resuelto** — `modulos/07-api-y-http/resolucion/ejercicio-01/`
  - `ListaPosts` consumiendo JSONPlaceholder con Axios
  - 3 estados mutuamente excluyentes: loading (spinner), error (con reintentar), data
  - Expandir posts para ver body completo con toggle animado
  - `async/await` con `try/catch/finally`

- **Ejercicio 02 resuelto** — `modulos/07-api-y-http/resolucion/ejercicio-02/`
  - CRUD completo contra json-server: GET, POST, PATCH, DELETE
  - Instancia de Axios configurada en `services/api.js` (baseURL, timeout)
  - Optimistic UI en toggle y delete con rollback automático en catch
  - Toast de notificaciones con auto-destrucción vía `useEffect` cleanup
  - Script `npm run server` para json-server en puerto 3001

---

## [1.1.0] — 2026-06-09

### ✨ Añadido

#### Nueva estructura: Proyectos Vite independientes por ejercicio

Cada ejercicio ahora es un proyecto Vite autónomo dentro de `modulos/*/resolucion/ejercicio-XX/`.
Se ejecuta con `npm run dev` sin dependencias de otros módulos ni del `src/` principal.

```
modulos/*/resolucion/ejercicio-XX/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── Componente.jsx      ← componente del ejercicio
    └── index.css
```

#### Módulo 01: Fundamentos de React

- **Guía de resolución paso a paso** (`modulos/01-fundamentos/resolucion-paso-a-paso.md`)
  - 6 pasos progresivos desde la configuración de Vite hasta composición con listas
  - Explicación didáctica línea por línea de cada concepto
  - Notas académicas con referencias a documentación oficial
  - Código CSS completo para los ejercicios
  - Checks de entendimiento al final de cada paso
  - Ejercicios extras para práctica autónoma

- **Ejercicio 01 resuelto** — `modulos/01-fundamentos/resolucion/ejercicio-01/`
  - `TarjetaPersonal` con props (nombre, edad, ciudad)
  - Reutilización: 3 instancias con diferentes datos
  - BEM CSS con grid responsivo y hover

#### Módulo 02: Estado y Eventos (`feat/02_estados_y_eventos`)

- **Ejercicio 01 resuelto** — `modulos/02-estado-y-eventos/resolucion/ejercicio-01/`
  - `ContadorLimitado` con useState (límites 0-10)
  - Botones +/- con `disabled` condicional
  - Color dinámico: verde (<5), amarillo (5-8), rojo (9-10)

- **Ejercicio 02 resuelto** — `modulos/02-estado-y-eventos/resolucion/ejercicio-02/`
  - `FormularioRegistro` con 3 inputs controlados (nombre, email, password)
  - Validación con mensajes de error por campo (vacío, email inválido)
  - `e.preventDefault()` + `onSubmit`
  - Spread operator para inmutabilidad del estado
  - Ocultar contraseña con `{'•'.repeat()}`

#### Docs

- **`CHANGELOG.md`** — Registro de cambios del proyecto
- **`docs/project.md`** — Descripción del alcance y visión del workshop
- **`docs/react-summary.md`** — Síntesis de conceptos de React para el docente
- **`docs/apuntes/`** — Material didáctico en PDF (2 archivos)

### 📁 Estructura del proyecto

```
workshop-react-docente/
├── CHANGELOG.md                     ← Registro de cambios
├── docs/                            ← Material para el docente
│   ├── project.md
│   ├── react-summary.md
│   └── apuntes/
├── modulos/                         ← Material didáctico por módulo
│   ├── 01-fundamentos/
│   │   ├── README.md                ← Plan de clase + tabla de ejercicios
│   │   ├── presentacion.md / .html  ← Slides (Marp)
│   │   ├── resolucion-paso-a-paso.md← Guía pedagógica
│   │   ├── ejercicios/              ← Consignas .md para alumnos
│   │   └── resolucion/              ← Proyectos Vite independientes
│   │       └── ejercicio-01/        ← TarjetaPersonal
│   ├── 02-estado-y-eventos/
│   │   ├── README.md
│   │   ├── presentacion.md / .html
│   │   ├── ejercicios/
│   │   └── resolucion/
│   │       ├── ejercicio-01/        ← ContadorLimitado
│   │       └── ejercicio-02/        ← FormularioRegistro
│   ├── 03-interactividad/
│   │   ├── README.md
│   │   ├── presentacion.md / .html
│   │   ├── ejercicios/
│   │   └── resolucion/
│   │       ├── ejercicio-01/        ← ListaCompras CRUD
│   │       └── ejercicio-02/        ← BuscadorPaises
│   ├── 04-efectos-y-persistencia/
│   │   ├── README.md
│   │   ├── presentacion.md / .html
│   │   ├── ejercicios/
│   │   └── resolucion/
│   │       ├── ejercicio-01/        ← ListaCompras + localStorage
│   │       └── ejercicio-02/        ← Cronometro
│   ├── 05-contexto-global/
│   │   ├── README.md
│   │   ├── presentacion.md / .html
│   │   ├── ejercicios/
│   │   └── resolucion/
│   │       ├── ejercicio-01/        ← TemaContext claro/oscuro
│   │       └── ejercicio-02/        ← CarritoContext
│   ├── 06-formularios/
│   │   ├── README.md
│   │   ├── presentacion.md / .html
│   │   ├── ejercicios/
│   │   └── resolucion/
│   │       ├── ejercicio-01/        ← Registro con RHF
│   │       └── ejercicio-02/        ← Validación personalizada
│   ├── 07-api-y-http/
│   │   ├── README.md
│   │   ├── presentacion.md / .html
│   │   ├── ejercicios/
│   │   └── resolucion/
│   │       ├── ejercicio-01/        ← JSONPlaceholder + Axios
│   │       └── ejercicio-02/        ← json-server CRUD
│   └── propuestas/
├── src/                             ← App integrada (todos los módulos)
│   ├── components/
│   ├── context/
│   ├── services/
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   └── db.json
├── index.html
├── package.json
└── vite.config.js
```

---

## [0.1.0] — 2026-06-02

### 🎉 Inicio del proyecto

- Creación del repositorio
- Configuración inicial con Vite + React
- Scaffolding de los 7 módulos
- Implementación inicial de todos los módulos con feature branches
- Merge a `main` con PRs y conventional commits
