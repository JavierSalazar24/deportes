import { Edit, Eye, FileText, Printer, Trash2 } from 'lucide-react'
import { useLocation } from 'react-router'
import { useAuth } from '../context/AuthContext'
import { hasPermission } from '../helpers/permissions'
import { isExcluded } from '../utils/routeUtils'
import {
  EXCLUDE_DELETE,
  EXCLUDE_EDIT,
  EXCLUDE_GENERAL
} from '../routes/exclusiones'
import { API_HOST } from '../config'

export const ActionButtons = ({ data, openModal }) => {
  const { user } = useAuth()
  const { pathname } = useLocation()

  return (
    <div className='flex justify-center space-x-2'>
      {/* Ver */}
      {hasPermission(user, pathname, 'consultar') && (
        <button
          title='Ver registro'
          onClick={() => openModal('view', data)}
          className='text-indigo-600 hover:text-indigo-900 p-1 rounded-md hover:bg-indigo-50 cursor-pointer transition-all'
        >
          <Eye className='h-5 w-5' />
        </button>
      )}
      {!isExcluded(pathname, EXCLUDE_GENERAL) && (
        <>
          {/* Editar */}
          {hasPermission(user, pathname, 'actualizar') &&
            !isExcluded(pathname, EXCLUDE_EDIT) && (
              <button
                title='Editar registro'
                onClick={() => openModal('edit', data)}
                className='text-green-600 hover:text-green-900 p-1 rounded-md hover:bg-green-50 cursor-pointer transition-all'
              >
                <Edit className='h-5 w-5' />
              </button>
            )}
          {/* Eliminar */}
          {hasPermission(user, pathname, 'eliminar') &&
            !isExcluded(pathname, EXCLUDE_DELETE) && (
              <button
                title='Eliminar registro'
                onClick={() => openModal('delete', data)}
                className='text-red-600 hover:text-red-900 p-1 rounded-md hover:bg-red-50 cursor-pointer transition-all'
              >
                <Trash2 className='h-5 w-5' />
              </button>
            )}
        </>
      )}

      {pathname === '/equipo' && (
        <a
          title='Imprimir documento'
          target='_blank'
          href={`${API_HOST}/api/pdf/equipamiento/${data.id}`}
          className='text-yellow-600 hover:text-yellow-900 p-1 rounded-md hover:bg-red-50 cursor-pointer transition-all'
          rel='noopener noreferrer'
        >
          <Printer className='h-5 w-5' />
        </a>
      )}

      {pathname === '/documentos' && (
        <a
          title='Ver documento PDF'
          target='_blank'
          href={data.documento_url}
          className='text-yellow-600 hover:text-yellow-900 p-1 rounded-md hover:bg-red-50 cursor-pointer transition-all'
          rel='noopener noreferrer'
        >
          <FileText className='h-5 w-5' />
        </a>
      )}
    </div>
  )
}
