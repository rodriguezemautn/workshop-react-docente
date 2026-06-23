import { useState } from 'react'

function ListaCompras() {
  const [items, setItems] = useState([
    { id: 1, nombre: 'Leche', comprado: false },
    { id: 2, nombre: 'Pan', comprado: true },
    { id: 3, nombre: 'Huevos', comprado: false },
  ])

  const [nuevoNombre, setNuevoNombre] = useState('')

  function agregarItem(e) {
    e.preventDefault()
    if (!nuevoNombre.trim()) return

    setItems([
      ...items,
      { id: Date.now(), nombre: nuevoNombre.trim(), comprado: false },
    ])
    setNuevoNombre('')
  }

  function toggleItem(id) {
    setItems(items.map(item =>
      item.id === id ? { ...item, comprado: !item.comprado } : item
    ))
  }

  function eliminarItem(id) {
    setItems(items.filter(item => item.id !== id))
  }

  function limpiarComprados() {
    setItems(items.filter(item => !item.comprado))
  }

  const total = items.length
  const comprados = items.filter(i => i.comprado).length

  return (
    <div className="lista-compras">
      <h2 className="lista-compras__titulo">Lista de Compras</h2>

      <form onSubmit={agregarItem} className="lista-compras__form">
        <input
          className="lista-compras__input"
          type="text"
          placeholder="Agregar item..."
          value={nuevoNombre}
          onChange={e => setNuevoNombre(e.target.value)}
        />
        <button type="submit" className="lista-compras__btn-agregar">
          Agregar
        </button>
      </form>

      <p className="lista-compras__contador">
        {total} items | {comprados} comprados
      </p>

      {items.length === 0 ? (
        <p className="lista-compras__vacio">No hay items en la lista</p>
      ) : (
        <ul className="lista-compras__items">
          {items.map(item => (
            <li
              key={item.id}
              className={`lista-compras__item ${item.comprado ? 'lista-compras__item--comprado' : ''}`}
            >
              <input
                type="checkbox"
                className="lista-compras__checkbox"
                checked={item.comprado}
                onChange={() => toggleItem(item.id)}
              />
              <span className="lista-compras__nombre">{item.nombre}</span>
              <button
                className="lista-compras__btn-eliminar"
                onClick={() => eliminarItem(item.id)}
                title="Eliminar"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}

      {comprados > 0 && (
        <button className="lista-compras__btn-limpiar" onClick={limpiarComprados}>
          Limpiar comprados ({comprados})
        </button>
      )}
    </div>
  )
}

export default ListaCompras
