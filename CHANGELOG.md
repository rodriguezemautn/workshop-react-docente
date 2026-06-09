# Changelog — Taskify Workshop React

Todas las modificaciones significativas en este proyecto serán documentadas aquí.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es/1.1.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
│   ├── 04-efectos-y-persistencia/
│   ├── 05-contexto-global/
│   ├── 06-formularios/
│   ├── 07-api-y-http/
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
