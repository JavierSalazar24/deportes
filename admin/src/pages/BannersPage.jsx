import { BaseForm } from '../components/BaseForm'
import { BaseTable } from '../components/BaseTable'
import { ModalDelete } from '../components/ModalDelete'
import { useModal } from '../hooks/useModal'
import { useBanners } from '../hooks/useBanners'
import { FormBanners } from '../components/modals/FormBanners'

const columns = [{ key: 'nombre', name: 'Nombre' }]

export default function BannersPage() {
  const {
    modalType,
    add,
    closeModal,
    openModal,
    formData,
    currentItem,
    view,
    handleInputChange,
    handleFileChange
  } = useModal()

  const { data, isLoading, isError, error, handleSubmit, handleDelete } =
    useBanners()

  if (isError) return <div>{error.message}</div>

  return (
    <div className='md:p-4 bg-gray-100'>
      <BaseTable
        columns={columns}
        data={data || []}
        title='Banners de patrocinadores'
        loading={isLoading}
        openModal={openModal}
      />

      {(modalType === 'add' ||
        modalType === 'edit' ||
        modalType === 'view') && (
        <BaseForm
          handleSubmit={handleSubmit}
          view={view}
          add={add}
          closeModal={closeModal}
          Inputs={
            <FormBanners
              view={view}
              formData={formData}
              handleInputChange={handleInputChange}
              handleFileChange={handleFileChange}
            />
          }
        />
      )}

      {modalType === 'delete' && currentItem && (
        <ModalDelete
          handleDelete={handleDelete}
          closeModal={closeModal}
          formData={formData}
        />
      )}
    </div>
  )
}
