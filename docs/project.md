# Workshop React — Desarrollo de Software 2026 (Comisión 08)

## Contexto

Materia **"Desarrollo de Software"** — Clase #08 (2 de junio de 2026).
Primera clase de React para alumnos que vienen con JavaScript vanilla.

## Perfil del alumno

- Sin experiencia en React
- Conocen JavaScript básico (variables, funciones, arrays, objetos, DOM manipulation)
- No conocen herramientas de build (Vite, Webpack, etc.)
- No conocen TypeScript

## Objetivo del Workshop

Que los alumnos construyan una aplicación web funcional paso a paso mientras cursan las 10 secciones de la guía didáctica. El foco está en los **4 conceptos clave**: JSX, Componentes, Props y Estado.

## Proyecto: Taskify (Gestor de Tareas)

App de gestión de tareas que los alumnos construyen incrementalmente.

### Funcionalidades por etapa

| Etapa | Módulo | Conceptos | Funcionalidad |
|-------|--------|-----------|---------------|
| 1 | 01 - Fundamentos | Componentes, JSX, Props | Tarjeta personal con props |
| 2 | 02 - Estado y Eventos | useState, eventos | Contador + Formulario de registro con validación |
| 3 | 03 - Interactividad | useState avanzado, listas | Lista de compras CRUD + Buscador en tiempo real |
| 4 | 04 - Efectos y Persistencia | useEffect, localStorage, cleanup | Lista de compras persistente + Cronómetro |
| 5 | 05 - Contexto Global | useContext, createContext | Tema claro/oscuro global + Carrito de compras |
| 6 | 06 - Formularios | React Hook Form | Formulario de registro + Validación personalizada |
| 7 | 07 - API y HTTP | Axios, json-server | Posts desde JSONPlaceholder + CRUD con json-server |

### Stack Tecnológico

- **React 18+** con Vite
- **JavaScript** (sin TypeScript — reducir curva de aprendizaje)
- **CSS plano** o módulos CSS
- Sin librerías externas de estado ni routing

## Metodología

1. El docente explica el concepto (apoyado en la guía)
2. Los alumnos codifican el ejercicio en vivo
3. Cada clase deja una funcionalidad funcionando
4. Workshop 100% práctico — aprender haciendo

## Estructura del proyecto

```
workshop-react-docente/
├── CHANGELOG.md                    # Registro de cambios del proyecto
├── docs/                           # Material para el docente
│   ├── project.md                  # Este archivo (alcance y visión)
│   ├── react-summary.md            # Síntesis de conceptos React
│   └── apuntes/                    # Material didáctico PDF
│       ├── Introduccion_ReactJS - DS - C08.pdf
│       └── Desarrollo Frontend Moderno_ Introducción a React - DS - C08.pdf
├── modulos/                        # Material didáctico por módulo
│   ├── 01-fundamentos/
│   │   ├── ejercicios/             # Consignas .md para alumnos
│   │   ├── resolucion/             # Proyectos Vite independientes (resueltos)
│   │   │   └── ejercicio-01/       #   → npm install && npm run dev
│   │   ├── resolucion-paso-a-paso.md
│   │   └── README.md
│   ├── 02-estado-y-eventos/
│   │   ├── ejercicios/
│   │   ├── resolucion/
│   │   │   ├── ejercicio-01/       # ContadorLimitado
│   │   │   └── ejercicio-02/       # FormularioRegistro
│   │   └── README.md
│   ├── 03-interactividad/
│   │   ├── ejercicios/
│   │   ├── resolucion/
│   │   │   ├── ejercicio-01/       # ListaCompras CRUD
│   │   │   └── ejercicio-02/       # BuscadorPaises
│   │   └── README.md
│   ├── 04-efectos-y-persistencia/
│   │   ├── ejercicios/
│   │   ├── resolucion/
│   │   │   ├── ejercicio-01/       # ListaCompras + localStorage
│   │   │   └── ejercicio-02/       # Cronometro
│   │   └── README.md
│   ├── 05-contexto-global/
│   │   ├── ejercicios/
│   │   ├── resolucion/
│   │   │   ├── ejercicio-01/       # TemaContext claro/oscuro
│   │   │   └── ejercicio-02/       # CarritoContext
│   │   └── README.md
│   ├── 06-formularios/
│   │   ├── ejercicios/
│   │   ├── resolucion/
│   │   │   ├── ejercicio-01/       # Registro con RHF
│   │   │   └── ejercicio-02/       # Validación personalizada
│   │   └── README.md
│   ├── 07-api-y-http/
│   │   ├── ejercicios/
│   │   ├── resolucion/
│   │   │   ├── ejercicio-01/       # JSONPlaceholder + Axios
│   │   │   └── ejercicio-02/       # json-server CRUD
│   │   └── README.md
│   └── propuestas/                 # Propuestas de mejora SDD
├── src/                            # Código fuente (app integrada)
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
