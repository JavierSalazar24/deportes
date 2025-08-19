import { useMemo } from 'react'
import { useTableStore } from '../store/useTableStore'

export const useTable = () => {
  const data = useTableStore((state) => state.data)
  const itemsPerPage = useTableStore((state) => state.itemsPerPage)
  const filterKeys = useTableStore((state) => state.filterKeys)
  const searchTerm = useTableStore((state) => state.searchTerm)
  const currentPage = useTableStore((state) => state.currentPage)
  const setData = useTableStore((state) => state.setData)
  const setSearchTerm = useTableStore((state) => state.setSearchTerm)
  const setCurrentPage = useTableStore((state) => state.setCurrentPage)

  // Filtrar los datos
  const filteredData = useMemo(() => {
    if (!searchTerm) return data
    return data.filter((item) =>
      filterKeys.some((key) =>
        item[key]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  }, [data, searchTerm, filterKeys])

  // Paginación
  const totalPages = useMemo(
    () => Math.ceil(filteredData?.length / itemsPerPage),
    [filteredData, itemsPerPage]
  )
  const indexOfLastItem = useMemo(
    () => currentPage * itemsPerPage,
    [currentPage, itemsPerPage]
  )
  const indexOfFirstItem = useMemo(
    () => indexOfLastItem - itemsPerPage,
    [indexOfLastItem, itemsPerPage]
  )
  const currentData = useMemo(
    () => filteredData?.slice(indexOfFirstItem, indexOfLastItem),
    [filteredData, indexOfFirstItem, indexOfLastItem]
  )

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const handleClass = (item, columnKey) => {
    const estatus = item[columnKey].toLowerCase()

    if (
      [
        'pagada',
        'si',
        'disponible',
        'pagado',
        'atendido',
        'activado',
        'activa'
      ].includes(estatus)
    ) {
      return 'bg-green-700'
    } else if (['pendiente', 'no', 'desactivado'].includes(estatus)) {
      return 'bg-red-600/80'
    } else if (['en proceso', 'parcial', 'finalizada'].includes(estatus)) {
      return 'bg-[#4682A9]'
    } else {
      return 'bg-[#EA7300]'
    }
  }

  return {
    setData,
    searchTerm,
    setSearchTerm,
    currentPage,
    totalPages,
    indexOfFirstItem,
    indexOfLastItem,
    currentData,
    filteredData,
    goToPage,
    setCurrentPage,
    handleClass
  }
}
