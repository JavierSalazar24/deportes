import { useLocation } from 'react-router'

export const TheadTable = ({ columns }) => {
  const { pathname } = useLocation()

  return (
    <thead className='bg-gray-50'>
      <tr>
        {columns.map((column) => (
          <th
            scope='col'
            className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
            key={column.key}
          >
            {column.name}
          </th>
        ))}
        {pathname !== '/compras' && pathname !== '/almacen' && (
          <th
            scope='col'
            className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
          >
            Acciones
          </th>
        )}
      </tr>
    </thead>
  )
}
