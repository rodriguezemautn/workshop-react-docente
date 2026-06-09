# Changelog — Taskify Workshop React

Todas las modificaciones significativas en este proyecto serán documentadas aquí.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es/1.1.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] — 2026-06-09

### ✨ Añadido

#### Módulo 01: Fundamentos de React

- **Guía de resolución paso a paso** (`modulos/01-fundamentos/resolucion-paso-a-paso.md`)
  - 6 pasos progresivos desde la configuración de Vite hasta composición con listas
  - Explicación didáctica línea por línea de cada concepto
  - Notas académicas con referencias a documentación oficial
  - Código CSS completo para los ejercicios
  - Checks de entendimiento al final de cada paso
  - Ejercicios extras para práctica autónoma

#### Docs

- **`CHANGELOG.md`** — Registro de cambios del proyecto
- **`docs/project.md`** — Descripción del alcance y visión del workshop
- **`docs/react-summary.md`** — Síntesis de conceptos de React para el docente
- **`docs/apuntes/`** — Material didáctico en PDF (2 archivos)

### 🏗️ Implementado (sesiones anteriores)

- **Módulo 01** (`feat/mod-01-fundamentos`): Componentes, JSX, Props
  - Componentes: `Header`, `TaskCard`, `TarjetaPersonal`, `ListaProductos`, `ProductoItem`, `TaskList`
  - Datos estáticos, flujo unidireccional padre → hijo

- **Módulo 02** (`feat/mod-02-estado-y-eventos`): `useState`, Eventos
  - `ContadorLimitado` — estado numérico con límites
  - `FormularioRegistro` — inputs controlados con `onChange`

- **Módulo 03** (`feat/mod-03-interactividad`): CRUD de listas
  - `ListaCompras` — agregar, toggle, eliminar items
  - `BuscadorPaises` — filtrado en tiempo real con `.filter()`

- **Módulo 04** (`feat/mod-04-efectos-y-persistencia`): `useEffect`, `localStorage`
  - Persistencia de lista de compras
  - `Cronometro` — intervalos con cleanup

- **Módulo 05** (`feat/mod-05-contexto-global`): `useContext`
  - `TemaContext` — tema claro/oscuro con persistencia
  - `CarritoContext` — carrito de compras global

- **Módulo 06** (`feat/mod-06-formularios`): React Hook Form
  - `FormularioRegistroRHF` — `register`, `handleSubmit`, `errors`
  - `TaskFormRHF` — validación personalizada (título único)

- **Módulo 07** (`feat/mod-07-api-y-http`): Axios, json-server
  - `PostsAxios` — GET a JSONPlaceholder con loading/error
  - Servicio API con instancia de Axios
  - json-server para CRUD local

### 📁 Estructura del proyecto

```
workshop-react-docente/
├── CHANGELOG.md                     ← Este archivo
├── docs/                            # Material para el docente
│   ├── project.md                   # Visión y alcance del workshop
│   ├── react-summary.md             # Síntesis de conceptos React
│   └── apuntes/                     # PDFs de la guía didáctica
├── modulos/                         # Material didáctico por módulo
│   ├── 01-fundamentos/
│   │   ├── README.md                # Plan de clase
│   │   ├── presentacion.md          # Slides (formato Marp)
│   │   ├── presentacion.html        # Slides en HTML
│   │   ├── resolucion-paso-a-paso.md # 👈 Guía pedagógica (nueva)
│   │   └── ejercicios/              # Consignas para alumnos
│   ├── 02-estado-y-eventos/
│   ├── 03-interactividad/
│   ├── 04-efectos-y-persistencia/
│   ├── 05-contexto-global/
│   ├── 06-formularios/
│   ├── 07-api-y-http/
│   └── propuestas/                  # Propuestas de mejora SDD
├── src/                             # Código de la aplicación
│   ├── components/                  # Componentes React
│   ├── context/                     # Context providers
│   ├── services/                    # Servicios (Axios)
│   ├── App.jsx                      # Componente raíz
│   ├── main.jsx                     # Punto de entrada
│   ├── index.css                    # Estilos globales
│   └── db.json                      # Datos para json-server
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
