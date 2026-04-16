import { useEffect } from 'react'
import { useTable } from '../hooks/useTable'
import { Pagination } from './Pagination'
import { SearchBar } from './SearchBar'
import { TheadTable } from './TheadTable'
import { TbodyTable } from './TbodyTable'

export const BaseTable = ({
  columns,
  data,
  title,
  loading,
  openModal,
  filterTemporada = false,
  handleFiltro = () => {},
  filtro = false,

  filterPeriodo = false,
  periodicidad = []
}) => {
  const {
    currentData,
    setData,
    handleClass,
    indexOfFirstItem,
    indexOfLastItem,
    filteredData,
    currentPage,
    totalPages,
    goToPage,
    searchTerm,
    setSearchTerm,
    setCurrentPage
  } = useTable()

  useEffect(() => {
    setData(
      data,
      columns.map((col) => col.key)
    )
  }, [data, columns, setData])

  return (
    <>
      <SearchBar
        title={title}
        data={data}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setCurrentPage={setCurrentPage}
        openModal={openModal}
      />

      <div className='bg-white shadow rounded-lg overflow-hidden'>
        {filterPeriodo && periodicidad.length > 0 && (
          <div className='p-5'>
            <h3 className='text-center font-semibold text-2xl'>
              Filtro del periodo de pagos
            </h3>
            <div className='flex sm:gap-3 flex-col sm:flex-row flex-wrap mt-5'>
              {periodicidad.map((periodo) => (
                <button
                  key={periodo.key}
                  onClick={() => handleFiltro(periodo.key)}
                  className={`px-3 py-2 border-2 border-[#FF3F33] rounded-md cursor-pointer hover:bg-[#FF3F33] hover:text-white transition-all text-sm sm:text-base mb-2 sm:mb-0 ${
                    filtro === periodo.key
                      ? 'bg-[#FF3F33] text-white'
                      : 'bg-transparent'
                  }`}
                >
                  {periodo.name}
                </button>
              ))}
            </div>
          </div>
        )}
        {filterTemporada && (
          <div className='p-5 flex sm:justify-center sm:gap-3 flex-col sm:flex-row'>
            <button
              onClick={handleFiltro}
              className={`px-3 py-2 border-2 border-[#3674B5] rounded-md cursor-pointer hover:bg-[#3674B5] hover:text-white transition-all text-sm sm:text-base mb-2 sm:mb-0 ${
                filtro ? 'bg-[#3674B5] text-white' : 'bg-transparent'
              }`}
            >
              Filtrar por temporada finalizada (por defecto)
            </button>
            <button
              onClick={handleFiltro}
              className={`px-3 py-2 border-2 border-[#3674B5] rounded-md cursor-pointer hover:bg-[#3674B5] hover:text-white transition-all text-sm sm:text-base mb-2 sm:mb-0 ${
                !filtro ? 'bg-[#3674B5] text-white' : 'bg-transparent'
              }`}
            >
              Filtrar por todas las temporadas
            </button>
          </div>
        )}
        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y divide-gray-200'>
            <TheadTable columns={columns} />
            <TbodyTable
              loading={loading}
              columns={columns}
              currentData={currentData}
              handleClass={handleClass}
              openModal={openModal}
            />
          </table>
        </div>

        <Pagination
          indexOfFirstItem={indexOfFirstItem}
          indexOfLastItem={indexOfLastItem}
          filteredData={filteredData}
          currentPage={currentPage}
          totalPages={totalPages}
          goToPage={goToPage}
        />
      </div>
    </>
  )
}
