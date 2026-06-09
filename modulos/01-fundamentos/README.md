# Módulo 01: Fundamentos de React

**Clase:** #08 — 02 de junio de 2026
**Duración estimada:** 120 minutos

---

## 🎯 Objetivos

- Comprender qué es React y por qué domina el mercado frontend
- Diferenciar programación imperativa vs declarativa
- Entender el concepto de Virtual DOM y sus ventajas
- Conocer la sintaxis JSX y sus reglas
- Crear componentes funcionales básicos
- Pasar datos entre componentes usando props
- Componer componentes para construir UIs complejas

## 📚 Secciones de la Guía

| Sección | Tema | Estado |
|---------|------|--------|
| 01 | ¿Qué es React.js? | ✅ Teoría |
| 02 | Virtual DOM | ✅ Teoría |
| 03 | JSX | ✅ Teoría + Práctica |
| 04 | MPA vs SPA | ✅ Teoría |
| 05 | Componentes y Props | ✅ Teoría + Práctica |

## 🛠️ Prerrequisitos

- JavaScript básico: funciones, arrays, objetos, arrow functions
- Node.js instalado (v18+)
- Navegador moderno (Chrome, Firefox, Edge)
- VS Code o editor similar
- Extensión: ES7+ React/Redux/React-Native snippets

## 📋 Actividades en Clase

| # | Actividad | Tipo | Duración |
|---|-----------|------|----------|
| 1 | ¿Qué es React? Contexto histórico y ventajas | Teoría | 15 min |
| 2 | Imperativo vs Declarativo + Virtual DOM | Teoría | 15 min |
| 3 | Configuración del entorno (Vite + React) | Hands-on | 20 min |
| 4 | JSX: reglas y ejemplos | Coding | 15 min |
| 5 | Tu primer componente + Props | Coding | 25 min |
| 6 | Ejercicios prácticos | Coding | 30 min |

## 💻 Resolución — Proyectos Independientes

Cada ejercicio tiene su propio proyecto Vite en [`resolucion/`](./resolucion/). Esto permite:

- Ejecutar CADA ejercicio por separado (`npm run dev`)
- Ver SOLO el código necesario para ese ejercicio
- Sin contaminación de otros módulos o ejercicios

### Cómo ejecutar un ejercicio

```bash
# 1. Entrá a la carpeta del ejercicio
cd modulos/01-fundamentos/resolucion/ejercicio-01

# 2. Instalá las dependencias (solo la primera vez)
npm install

# 3. Iniciá el servidor de desarrollo
npm run dev
```

### Ejercicios resueltos

| # | Ejercicio | Consigna | Resolución |
|---|-----------|----------|------------|
| 1 | Mi primer componente | [`01-mi-primer-componente.md`](./ejercicios/01-mi-primer-componente.md) | [`resolucion/ejercicio-01/`](./resolucion/ejercicio-01/) |
| 2 | Props y reutilización | [`02-props-y-reutilizacion.md`](./ejercicios/02-props-y-reutilizacion.md) | *(pendiente)* |

## 📖 Guía de Resolución Paso a Paso

📄 **[`resolucion-paso-a-paso.md`](./resolucion-paso-a-paso.md)**

Guía didáctica que acompaña al alumno desde la configuración de Vite hasta la composición de componentes con listas. Incluye explicaciones línea por línea, notas académicas con referencias oficiales, y checks de entendimiento.

## 📝 Criterios de Evaluación

- [ ] Crea componentes funcionales correctamente
- [ ] Usa JSX con las reglas adecuadas (className, llaves, fragmentos)
- [ ] Pasa y recibe props en componentes
- [ ] Compone componentes (componentes dentro de componentes)
- [ ] El proyecto corre con `npm run dev`

## 🔗 Recursos

- [React.dev — Learn](https://react.dev/learn)
- [Vite — Getting Started](https://vitejs.dev/guide/)
- [Guía didáctica — Introducción a React](../docs/apuntes/Introduccion_ReactJS%20-%20DS%20-%20C08.pdf)
