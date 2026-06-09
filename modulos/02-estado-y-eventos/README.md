# Módulo 02: Estado y Eventos

**Clase:** #09
**Duración estimada:** 120 minutos

---

## 🎯 Objetivos

- Entender qué son los hooks y por qué existen
- Usar `useState` para manejar datos que cambian
- Manejar eventos del usuario (click, change, submit)
- Crear formularios controlados con inputs
- Actualizar correctamente arrays y objetos en el estado

## 📚 Secciones de la Guía

| Sección | Tema | Estado |
|---------|------|--------|
| 06 | Hooks — Introducción | ✅ Teoría |
| 07 | useState | ✅ Teoría + Práctica |

## 🛠️ Prerrequisitos

- Componentes funcionales y JSX (Módulo 01)
- Manejo de eventos en JavaScript vanilla (addEventListener)

## 📋 Actividades en Clase

| # | Actividad | Tipo | Duración |
|---|-----------|------|----------|
| 1 | ¿Qué son los hooks? Reglas y tabla | Teoría | 15 min |
| 2 | useState: contador, toggle, input controlado | Coding | 30 min |
| 3 | Taskify: formulario para agregar tareas | Coding | 30 min |
| 4 | Inmutabilidad: arrays y objetos | Teoría | 10 min |
| 5 | Ejercicios prácticos | Coding | 35 min |

## 💻 Resolución — Proyectos Independientes

Cada ejercicio tiene su propio proyecto Vite en [`resolucion/`](./resolucion/). Se ejecutan por separado para evitar contaminación entre ejercicios.

### Cómo ejecutar

```bash
# Ejercicio 01
cd modulos/02-estado-y-eventos/resolucion/ejercicio-01
npm install
npm run dev

# Ejercicio 02 (en otra terminal)
cd modulos/02-estado-y-eventos/resolucion/ejercicio-02
npm install
npm run dev
```

### Ejercicios resueltos

| # | Ejercicio | Consigna | Resolución | Conceptos |
|---|-----------|----------|------------|-----------|
| 1 | Contador con Límites | [`01-contador-con-limites.md`](./ejercicios/01-contador-con-limites.md) | [`resolucion/ejercicio-01/`](./resolucion/ejercicio-01/) | `useState`, eventos `onClick`, `disabled`, color condicional |
| 2 | Formulario de Registro | [`02-formulario-registro.md`](./ejercicios/02-formulario-registro.md) | [`resolucion/ejercicio-02/`](./resolucion/ejercicio-02/) | Inputs controlados, `onSubmit`, validación, `e.preventDefault()` |

## 📝 Criterios de Evaluación

- [ ] Usa `useState` correctamente (lectura + actualización)
- [ ] Maneja eventos `onChange`, `onClick`, `onSubmit`
- [ ] Implementa inputs controlados (value + onChange)
- [ ] Actualiza arrays con spread operator (no push)
- [ ] Evita mutar el estado directamente
