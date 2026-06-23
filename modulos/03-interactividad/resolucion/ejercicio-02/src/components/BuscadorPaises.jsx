import { useState } from 'react'

/*
 * ============================================
 *  BuscadorPaises — Filtro en Tiempo Real
 * ============================================
 *
 * 📌 Conceptos clave que se practican acá:
 *   - `useState` para el término de búsqueda
 *   - Input controlado (value + onChange)
 *   - `.filter()` + `.toLowerCase()` + `.includes()` para filtrar
 *   - Renderizado condicional para el estado "sin resultados"
 *   - Resaltado del texto coincidente con <mark>
 *
 * 🔍 Flujo de datos:
 *   1. El usuario escribe en el input → onChange actualiza el estado `busqueda`
 *   2. Cada vez que `busqueda` cambia, el componente se re-renderiza
 *   3. En el render, filtramos el array de países con el término actual
 *   4. Mostramos los resultados filtrados (o el mensaje "sin resultados")
 *
 * ⚠️ Dato importante:
 *   No necesitamos un estado separado para "resultados filtrados" porque
 *   el filtrado se hace DIRECTAMENTE en el render (derived state).
 *   Es más simple, menos propenso a bugs, y React lo optimiza solo.
 */

// Array de 20 países hardcodeados
// Se declara FUERA del componente para no recrearlo en cada render
const PAISES = [
  'Argentina',
  'Brasil',
  'Chile',
  'Colombia',
  'Ecuador',
  'España',
  'Estados Unidos',
  'Francia',
  'Italia',
  'Japón',
  'México',
  'Nueva Zelanda',
  'Países Bajos',
  'Perú',
  'Portugal',
  'Reino Unido',
  'Corea del Sur',
  'Suecia',
  'Uruguay',
  'Venezuela',
]

/*
 * resaltarCoincidencia — helper para resaltar texto
 *
 * Toma un texto y un término de búsqueda, y devuelve un array de
 * fragments donde la parte coincidente está envuelta en <mark>.
 *
 * Ejemplo:
 *   resaltarCoincidencia('Argentina', 'ar')
 *   → ['', <mark>Ar</mark>, 'gentina']
 *
 * El primer elemento vacío es porque 'Ar' está al inicio.
 * Si no hay coincidencia, devuelve el texto original sin <mark>.
 */
function resaltarCoincidencia(texto, busqueda) {
  if (!busqueda.trim()) return texto

  // Escapamos caracteres especiales de regex para que el usuario pueda
  // buscar cualquier texto sin romper la expresión regular
  const escaped = busqueda.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(`(${escaped})`, 'gi')
  const partes = texto.split(regex)

  if (partes.length === 1) return texto // no hubo coincidencia

  // Cuando split() se usa con un grupo de captura, los matches están
  // en los índices IMPARES (1, 3, 5...). Usamos esto en lugar de
  // regex.test() porque el flag /g mantiene estado interno (lastIndex)
  // que causaría resultados incorrectos.
  return partes.map((parte, i) =>
    i % 2 === 1
      ? <mark key={i}>{parte}</mark>
      : parte
  )
}

function BuscadorPaises() {
  const [busqueda, setBusqueda] = useState('')

  // Filtramos los países EN TIEMPO REAL mientras el usuario escribe
  // Esto es DERIVED STATE — no necesitamos un useState para los filtrados
  const filtrados = PAISES
    .filter(pais =>
      pais.toLowerCase().includes(busqueda.toLowerCase())
    )
    .sort() // SHOULD: ordenados alfabéticamente

  const sinResultados = busqueda.trim() !== '' && filtrados.length === 0

  return (
    <div className="buscador">
      <h2 className="buscador__titulo">Buscador de Países</h2>

      <input
        className="buscador__input"
        type="text"
        placeholder="Escribí para buscar países..."
        value={busqueda}
        onChange={e => setBusqueda(e.target.value)}
        autoFocus
      />

      <p className="buscador__contador">
        {filtrados.length} de {PAISES.length} países
      </p>

      {sinResultados ? (
        <p className="buscador__sin-resultados">
          No se encontraron resultados para &ldquo;{busqueda}&rdquo;
        </p>
      ) : (
        <ul className="buscador__lista">
          {filtrados.map(pais => (
            <li key={pais} className="buscador__item">
              {resaltarCoincidencia(pais, busqueda)}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default BuscadorPaises
