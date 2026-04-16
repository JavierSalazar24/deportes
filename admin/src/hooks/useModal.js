import { useLocation } from 'react-router'
import { useEffect, useState } from 'react'
import { useModalStore } from '../store/useModalStore'
import { useCalculosTotales } from './useCalculosTotales'
import { dispatchFormLogic } from './forms/formDispatcher'
import { equipoEffects } from './equipoEffects'
import { getFiltroCategoria } from '../api/categorias'
import { toast } from 'sonner'

export const useModal = () => {
  const { pathname } = useLocation()

  const [initialLoad, setInitialLoad] = useState(false)
  const [articulosDisponibles, setArticulosDisponibles] = useState({})
  const [categorias, setCategorias] = useState([
    { label: 'Selecciona una opción', value: '' }
  ])
  const [costosConcepto, setCostosConcepto] = useState([
    { label: 'Selecciona una opción', value: '' }
  ])
  const [reloadJugadores, setReloadJugadores] = useState(0)

  const getArtDis = useModalStore((state) => state.getArtDis)
  const modalType = useModalStore((state) => state.modalType)
  const setFormData = useModalStore((state) => state.setFormData)
  const formData = useModalStore((state) => state.formData)
  const openModal = useModalStore((state) => state.openModal)
  const closeModal = useModalStore((state) => state.closeModal)
  const currentItem = useModalStore((state) => state.currentItem)

  const view = modalType === 'view'
  const add = modalType === 'add'
  const edit = modalType === 'edit'
  const deleteModal = modalType === 'delete'
  const document = view || edit

  const { calcularTotalGastosCompras, actualizarTotal } = useCalculosTotales({
    formData,
    setFormData
  })

  const handleInputChange = async (e, actionMeta) => {
    let name, value

    if (e.target) {
      ;({ name, value } = e.target)
    } else {
      name = actionMeta.name
      value = e || []
    }

    setFormData(name, value)

    if (['temporada_id', 'genero', 'fecha_nacimiento'].includes(name)) {
      const temporada =
        name === 'temporada_id'
          ? value.value
          : formData.temporada_id?.value || null
      const fecha_nacimiento =
        name === 'fecha_nacimiento' ? value : formData.fecha_nacimiento
      const genero = name === 'genero' ? value : formData.genero

      if (temporada && fecha_nacimiento && genero) {
        setCategorias([{ label: 'Buscando...', value: '' }])

        const data = await getFiltroCategoria({
          temporada,
          fecha_nacimiento,
          genero
        })

        const categorias = data.map((categoria) => ({
          label: categoria.nombre,
          value: categoria.id
        }))

        if (categorias.length === 0) {
          categorias.push({ label: 'No se encontraron categorías', value: '' })
        }

        setCategorias(categorias)
      }
    }

    await dispatchFormLogic(pathname, {
      name,
      value,
      setFormData,
      formData,
      pathname,
      costosConcepto,
      setCostosConcepto,
      // Helpers de los forms
      actualizarTotal,
      calcularTotalGastosCompras,
      setReloadJugadores,
      setArticulosDisponibles
    })
  }

  const handleCheckboxChange = async (e) => {
    const { name, checked, value } = e.target
    setFormData(name, checked)

    if (pathname === '/equipo') {
      const [nombreArticulo, id] = value.split('-')
      const key = `articulo-${nombreArticulo}-${id}`
      const serieKey = `seleccionado-numero_serie-${id}`

      if (!checked) {
        setArticulosDisponibles((prev) => {
          const updated = { ...prev }
          delete updated[key]
          return updated
        })

        setFormData(serieKey, '')
        return
      }

      try {
        const disponibles = await getArtDis(id)
        if (disponibles.length === 0) {
          toast.warning('Artículo no disponible en almacén')
          setFormData(name, false)
          return
        }

        setArticulosDisponibles((prev) => ({
          ...prev,
          [key]: disponibles
        }))
      } catch (err) {
        console.error('Error al cargar artículos disponibles:', err)
        setFormData(name, false)
      }
    }
  }

  const handleFileChange = (e) => {
    const { name, files } = e.target
    if (!files.length) return

    const file = files[0]
    setFormData(name, file)

    const previewURL = URL.createObjectURL(file)
    setFormData('preview', previewURL)
  }

  const handleMultipleFilesChange = (e) => {
    const { name, files } = e.target
    if (!files.length) return

    const fileArray = Array.from(files)

    // Guardamos los archivos en el estado
    setFormData(name, fileArray)
  }

  useEffect(() => {
    if ((edit || view) && currentItem && pathname === '/equipo') {
      setInitialLoad(true)
    }
  }, [currentItem, edit, view, pathname])

  useEffect(() => {
    if (pathname === '/equipo') {
      equipoEffects({
        currentItem,
        pathname,
        setInitialLoad,
        initialLoad,
        setFormData,
        setArticulosDisponibles,
        getArtDis
      })
    }
  }, [initialLoad, pathname])

  useEffect(() => {
    if (pathname === '/deudas-jugadores' && (edit || view)) {
      setCostosConcepto([formData.costo_categoria_id])
    }
  }, [formData, view, edit, pathname])

  useEffect(() => {
    if (add && pathname === '/jugadores') {
      setCategorias([{ label: 'Selecciona una opción', value: '' }])
      setFormData('categoria', '')
    }
  }, [add, pathname, setFormData])

  return {
    view,
    add,
    edit,
    deleteModal,
    document,
    modalType,
    setFormData,
    formData,
    openModal,
    closeModal,
    currentItem,
    handleInputChange,
    handleFileChange,
    handleMultipleFilesChange,
    handleCheckboxChange,
    categorias,
    articulosDisponibles,
    reloadJugadores,
    costosConcepto
  }
}
