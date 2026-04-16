import { BaseTable } from '../components/BaseTable'
import { useCompras } from '../hooks/useCompras'

const columns = [
  { key: 'banco', name: 'Banco' },
  { key: 'proveedor', name: 'Proveedor' },
  { key: 'numero_oc', name: '# OC' },
  { key: 'articulo', name: 'Artículo' },
  { key: 'metodo_pago', name: 'Método de pago' },
  { key: 'total', name: 'Total' },
  { key: 'fecha', name: 'Fecha' },
  { key: 'estatus', name: 'Estatus' }
]

export default function MovimientosBancariosPage() {
  const { data, isLoading, isError, error } = useCompras()

  if (isError) return <div>{error.message}</div>

  return (
    <div className='md:p-4 bg-gray-100'>
      <BaseTable
        columns={columns}
        data={data || []}
        title='Compras'
        loading={isLoading}
      />
    </div>
  )
}
