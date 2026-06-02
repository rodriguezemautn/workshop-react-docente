/* =========================================================
   BuscadorPaises — Filtro en tiempo real con .filter()
   Módulo 03: Interactividad y Listas
   =========================================================

   📖 ¿Qué es este componente?
   ────────────────────────────
   Un buscador que filtra una lista de 20 países mientras
   el usuario escribe. El filtro es "case insensitive"
   (no distingue mayúsculas/minúsculas) y se actualiza
   en CADA pulsación de tecla.

   🔑 Conceptos clave que practica:
   ─────────────────────────────────
   1. FILTRADO EN TIEMPO REAL — El estado de búsqueda se
      actualiza en cada onChange y el filtro se recalcula
      en cada render:
      
      const filtrados = paises.filter(p =>
        p.toLowerCase().includes(busqueda.toLowerCase())
      )
      
      Esto es posible porque React re-renderiza el componente
      cada vez que el estado cambia (setBusqueda actualiza
      el valor → re-render → filtro se recalcula).

   2. .filter() + .toLowerCase() + .includes():
      - toLowerCase(): normaliza a minúsculas (case insensitive)
      - includes(): verifica si la cadena contiene el texto
      (developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

   3. VALORES DERIVADOS — La lista filtrada NO es estado,
      es calculada en cada render. Esto evita estados
      redundantes y bugs de sincronización.

   4. RENDERIZADO CONDICIONAL — Mostrar "Sin resultados"
      cuando el filtro no coincide con ningún país.

   📚 Referencias:
   ────────────────
   - react.dev/learn/rendering-lists#filtering-arrays-of-items
   - react.dev/learn/choosing-the-state-structure
   - react.dev/learn/reacting-to-input-with-state
   - developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String/includes
   ========================================================= */

import { useState } from 'react'

/* 
  LISTA DE 20 PAÍSES — hardcodeada para el ejercicio.
  
  En una aplicación real, estos datos vendrían de una API
  (como REST Countries: https://restcountries.com).
  Pero para practicar filter(), tenerlos hardcodeados
  es suficiente y evita depender de una conexión externa.
  
  (Módulo 07: aprenderemos a obtener datos de APIs).
*/
const PAISES = [
  'Argentina',
  'Bolivia',
  'Brasil',
  'Chile',
  'Colombia',
  'Costa Rica',
  'Cuba',
  'Ecuador',
  'El Salvador',
  'España',
  'Francia',
  'Guatemala',
  'Honduras',
  'México',
  'Nicaragua',
  'Panamá',
  'Paraguay',
  'Perú',
  'Uruguay',
  'Venezuela',
]

function BuscadorPaises() {
  /* 
    Estado: texto de búsqueda.
    Inicialmente vacío — muestra todos los países.
  */
  const [busqueda, setBusqueda] = useState('')

  /* 
    VALOR DERIVADO: países filtrados según la búsqueda.
    
    Esto NO es estado (no usamos useState). Se recalcula
    en CADA render. Es más simple y evita bugs.
    
    Flujo:
    1. Usuario escribe "ar" en el input
    2. onChange → setBusqueda("ar") → re-render
    3. paisesFiltrados se recalcula con "ar"
    4. React actualiza el DOM con los países filtrados
    
    (react.dev/learn/choosing-the-state-structure#avoid-redundant-state)
    
    ⚠️ NOTA: .toLowerCase() en ambas cadenas garantiza
    que "ARG" → "arg" matchee "Argentina" → "argentina".
    Sin esto, "ARG" no matchearía "argentina".
  */
  const paisesFiltrados = PAISES.filter((pais) =>
    pais.toLowerCase().includes(busqueda.toLowerCase())
  )

  /* 
    Ordenamos alfabéticamente los resultados.
    .sort() modifica el array original, pero filter() ya
    creó uno nuevo, así que es seguro.
    
    localeCompare() ordena correctamente con acentos y ñ:
    "Argentina" < "Brasil" < "Chile" < "Costa Rica"
    (esto no funcionaría bien con .sort() simple)
  */
  paisesFiltrados.sort((a, b) => a.localeCompare(b))

  return (
    <section className="buscador-paises">
      <h3 className="buscador-paises__titulo">Buscador de Países</h3>

      {/* 
        INPUT DE BÚSQUEDA — Input controlado
        value={busqueda} → React controla el valor
        onChange → actualiza busqueda en cada tecla
        
        placeholder guía al usuario sobre qué hacer.
      */}
      <div className="buscador-paises__input-wrapper">
        <span className="buscador-paises__icono" aria-hidden="true">
          🔍
        </span>
        <input
          type="text"
          className="buscador-paises__input"
          placeholder="Buscar país... (ej: ar)"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          autoFocus
        />
        {/* 
          Si hay texto en la búsqueda, mostramos un botón
          para LIMPIAR el filtro y volver a ver todos.
        */}
        {busqueda && (
          <button
            className="buscador-paises__limpiar"
            onClick={() => setBusqueda('')}
            aria-label="Limpiar búsqueda"
          >
            ✕
          </button>
        )}
      </div>

      {/* 
        CONTADOR DE RESULTADOS
        Muestra cuántos países coinciden con la búsqueda.
        Si no hay búsqueda, muestra el total.
      */}
      <p className="buscador-paises__resultados">
        {busqueda
          ? `${paisesFiltrados.length} de ${PAISES.length} países`
          : `${PAISES.length} países`}
      </p>

      {/* 
        LISTA DE PAÍSES FILTRADOS
        Renderizado condicional:
        - Si hay filtrados → muestra la lista
        - Si no hay → muestra "Sin resultados"
      */}
      {paisesFiltrados.length > 0 ? (
        <ul className="buscador-paises__lista">
          {paisesFiltrados.map((pais, indice) => (
            <li key={pais} className="buscador-paises__item">
              {/* 
                RESALTADO DE TEXTO COINCIDENTE
                Separamos el nombre del país en partes:
                - Parte antes del match
                - El texto que coincide (con <mark>)
                - Parte después del match
                
                Esto mejora la experiencia visual mostrando
                qué parte de la búsqueda coincide.
              */}
              {busqueda ? (
                <span className="buscador-paises__item-texto">
                  {resaltarCoincidencia(pais, busqueda)}
                </span>
              ) : (
                <span>{pais}</span>
              )}

              {/* 
                Número de orden usando el índice.
                NOTA: el índice como key NO es recomendado,
                pero aquí usamos el nombre del país como key
                (pais es único), y el índice SOLO para display.
              */}
              <span className="buscador-paises__item-numero">
                #{indice + 1}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        /* 
          Estado SIN RESULTADOS — se muestra cuando el
          filtro no coincide con ningún país.
        */
        <div className="buscador-paises__sin-resultados">
          <p>No se encontraron resultados para "<strong>{busqueda}</strong>"</p>
          <button
            className="buscador-paises__btn-reintentar"
            onClick={() => setBusqueda('')}
          >
            Mostrar todos los países
          </button>
        </div>
      )}
    </section>
  )
}

/* 
  Función de utilidad: resalta el texto coincidente.
  
  Recibe el texto completo y la búsqueda, y devuelve
  fragmentos de JSX con la parte coincidente envuelta
  en una etiqueta <mark> (resaltado HTML nativo).
  
  NOTA: Esta función NO es un componente — es una función
  helper. No usa hooks ni retorna un componente completo.
  Simplemente procesa strings y retorna JSX.
  
  Patrón: split + map para dividir y marcar coincidencias.
  
  Ejemplo:
    resaltarCoincidencia("Argentina", "ar")
    → ["<span>", <mark>Ar</mark>, "gentina</span>"]
  
  (developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String/split)
*/
function resaltarCoincidencia(texto, busqueda) {
  if (!busqueda) return texto

  const regex = new RegExp(`(${escapeRegex(busqueda)})`, 'gi')
  const partes = texto.split(regex)

  return partes.map((parte, i) =>
    regex.test(parte)
      ? <mark key={i} className="buscador-paises__resaltado">{parte}</mark>
      : parte
  )
}

/* 
  Escapa caracteres especiales en la búsqueda para usarlos
  en una expresión regular. Sin esto, si el usuario escribe
  un punto (.), se interpretaría como "cualquier caracter".
  
  Caracteres especiales: . * + ? [ ] ( ) { } | ^ $ \
  
  Ejemplo:
    escapeRegex("hola.mundo") → "hola\\.mundo"
    escapeRegex("(test)") → "\\(test\\)"
  
  (developer.mozilla.org/es/docs/Web/JavaScript/Guide/Regular_Expressions#escaping)
*/
function escapeRegex(cadena) {
  return cadena.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export default BuscadorPaises
