import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import { toast } from 'sonner'
import dayjs from 'dayjs'

import { useState } from 'react'
import { getBanco } from '../api/bancos'
import {
  getEstadoCuentaBanco,
  getEstadoCuentaProveedor,
  getReporte
} from '../api/reportes'
import { getProveedor } from '../api/proveedores'
import { getJugadores } from '../api/jugadores'
import { getTemporada } from '../api/temporadas'

export const useReportes = () => {
  const [formReport, setFormReport] = useState({})
  const [estado, setEstado] = useState(null)

  const exportToExcel = (data, columns, sheetName, fileName) => {
    if (!data || data.length === 0) {
      toast.warning('No hay datos para exportar.')
      return
    }

    // Definir encabezados de la tabla
    const headers = [columns]

    // Crear hoja de Excel
    const worksheet = XLSX.utils.json_to_sheet(data)

    // Agregar los encabezados
    XLSX.utils.sheet_add_aoa(worksheet, headers, { origin: 'A1' })

    // 📌 Ajustar el ancho de las columnas al tamaño del texto
    worksheet['!cols'] = columns.map((col) => ({ wch: col.length + 5 })) // Ajusta el ancho sumando 5 caracteres extra

    // Crear libro de Excel y añadir la hoja
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName)

    // Generar el archivo Excel
    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array'
    })

    // Guardar el archivo
    const dataBlob = new Blob([excelBuffer], {
      type: 'application/octet-stream'
    })
    saveAs(dataBlob, fileName)
  }

  const handleInputChange = async (e, actionMeta) => {
    let name, value

    if (e.target) {
      ;({ name, value } = e.target)
    } else {
      name = actionMeta.name
      value = e || []
    }

    setFormReport((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const loadOptionsBancos = async (inputValue) => {
    try {
      if (!loadOptionsBancos.cachedData) {
        const response = await getBanco()
        const data = response.map((info) => ({
          value: info.id,
          label: info.nombre
        }))

        if (data.length > 0) data.unshift({ label: 'Todos', value: 'todos' })

        loadOptionsBancos.cachedData = data
      }

      if (!inputValue) return loadOptionsBancos.cachedData

      const filteredData = loadOptionsBancos.cachedData.filter((item) =>
        item.label.toLowerCase().includes(inputValue.toLowerCase())
      )

      return filteredData
    } catch (error) {
      console.error('Error cargando datos:', error)
      return []
    }
  }

  const loadOptionsProveedores = async (inputValue) => {
    try {
      if (!loadOptionsProveedores.cachedData) {
        const response = await getProveedor()
        const data = response.map((info) => ({
          value: info.id,
          label: info.nombre_empresa
        }))

        if (data.length > 0) data.unshift({ label: 'Todos', value: 'todos' })

        loadOptionsProveedores.cachedData = data
      }

      if (!inputValue) return loadOptionsProveedores.cachedData

      const filteredData = loadOptionsProveedores.cachedData.filter((item) =>
        item.label.toLowerCase().includes(inputValue.toLowerCase())
      )

      return filteredData
    } catch (error) {
      console.error('Error cargando datos:', error)
      return []
    }
  }

  const loadOptionsJugadores = async (inputValue) => {
    try {
      if (!loadOptionsJugadores.cachedData) {
        loadOptionsJugadores.cachedData = await getJugadores()
      }

      const filteredData = loadOptionsJugadores.cachedData.filter(
        (g) =>
          g.nombre_completo.toLowerCase().includes(inputValue.toLowerCase()) ||
          g.numero_empleado.toLowerCase().includes(inputValue.toLowerCase())
      )

      return filteredData.map((data) => ({
        value: data.id,
        label: data.nombre_completo
      }))
    } catch (error) {
      console.error('Error cargando datos:', error)
      return []
    }
  }

  const loadOptionsJugadoresTodos = async (inputValue) => {
    try {
      if (!loadOptionsJugadoresTodos.cachedData) {
        const response = await getJugadores()
        const data = response.map((data) => ({
          value: data.id,
          label: data.nombre_completo
        }))

        if (data.length > 0) data.unshift({ label: 'Todos', value: 'todos' })

        loadOptionsJugadoresTodos.cachedData = data
      }

      if (!inputValue) return loadOptionsJugadoresTodos.cachedData

      const filteredData = loadOptionsJugadoresTodos.cachedData.filter((item) =>
        item.label.toLowerCase().includes(inputValue.toLowerCase())
      )

      return filteredData
    } catch (error) {
      console.error('Error cargando datos:', error)
      return []
    }
  }

  const loadOptionsTemporadas = async (inputValue) => {
    try {
      if (!loadOptionsTemporadas.cachedData) {
        const response = await getTemporada()
        const data = response.map((data) => ({
          value: data.id,
          label: `${data.nombre} (${data.estatus})`
        }))

        if (data.length > 0) data.unshift({ label: 'Todas', value: 'todos' })

        loadOptionsTemporadas.cachedData = data
      }

      if (!inputValue) return loadOptionsTemporadas.cachedData

      const filteredData = loadOptionsTemporadas.cachedData.filter((item) =>
        item.label.toLowerCase().includes(inputValue.toLowerCase())
      )

      return filteredData
    } catch (error) {
      console.error('Error cargando datos:', error)
      return []
    }
  }

  const loadOptionsProveedoresUnico = async (inputValue) => {
    try {
      if (!loadOptionsProveedoresUnico.cachedData) {
        loadOptionsProveedoresUnico.cachedData = await getProveedor()
      }

      const filteredData = loadOptionsProveedoresUnico.cachedData.filter((g) =>
        g.nombre_empresa.toLowerCase().includes(inputValue.toLowerCase())
      )

      return filteredData.map((data) => ({
        value: data.id,
        label: data.nombre_empresa
      }))
    } catch (error) {
      console.error('Error cargando datos:', error)
      return []
    }
  }

  const loadOptionsBancosUnico = async (inputValue) => {
    try {
      if (!loadOptionsBancosUnico.cachedData) {
        loadOptionsBancosUnico.cachedData = await getBanco()
      }

      const filteredData = loadOptionsBancosUnico.cachedData.filter((g) =>
        g.nombre.toLowerCase().includes(inputValue.toLowerCase())
      )

      return filteredData.map((data) => ({
        value: data.id,
        label: data.nombre
      }))
    } catch (error) {
      console.error('Error cargando datos:', error)
      return []
    }
  }

  const generateReport = async (form) => {
    try {
      const response = await getReporte(form)

      // Mapeo de módulos a funciones de transformación
      const dataTransformers = {
        movimientos: transformMovimientData,
        'orden-compra': transformOrderData,
        compras: transformPayData,
        gastos: transformExpenseData,
        almacen: transformInventoryData,
        equipo: transformEquipmentData,
        'deudas-jugadores': transformDeudaData,
        'abonos-jugadores': transformAbonosData,
        'pagos-jugadores': transformPagoData
      }

      // Configuraciones de reporte por módulo
      const reportConfigs = {
        movimientos: {
          filename: 'Reporte de movimientos de banco',
          headers: [
            'Banco',
            'Tipo de movimiento',
            'Concepto',
            'Fecha del movimiento',
            'Referencia',
            'Método de pago',
            'Monto'
          ]
        },
        'orden-compra': {
          filename: 'Reporte de órdenes de compra',
          headers: [
            'Banco',
            'Proveedor',
            'Artículo',
            'Cantidad de artículos',
            'Precio x artículo',
            'Número de OC',
            'Total',
            'Estatus'
          ]
        },
        compras: {
          filename: 'Reporte de compras',
          headers: [
            'Banco',
            'Proveedor',
            'Artículo',
            'Cantidad de artículos',
            'Precio x artículo',
            'Número de OC',
            'Total',
            'Método de pago',
            'Referencia'
          ]
        },
        gastos: {
          filename: 'Reporte de gastos',
          headers: ['Banco', 'Concepto', 'Método de pago', 'Total']
        },
        almacen: {
          filename: 'Reporte de almacén',
          headers: [
            'Artículo',
            'Número de serie o de uniforme',
            'Fecha de entrada',
            'Fecha de salida',
            'Estatus',
            'Otra información'
          ]
        },
        equipo: {
          filename: 'Reporte de equipamiento',
          headers: [
            'Jugador',
            'Fecha de entrega',
            'Fecha de devolución',
            '¿Ya se regresó el equipo?',
            'Equipo asignado'
          ]
        },
        'deudas-jugadores': {
          filename: 'Reporte de deudas de jugadores',
          headers: [
            'Jugador',
            'Temporada',
            'Concepto',
            'Monto base',
            'Monto final',
            'Saldo restante',
            'Fecha de pago',
            'Fecha limite',
            'Estatus'
          ]
        },
        'abonos-jugadores': {
          filename: 'Reporte de abonos de jugadores',
          headers: [
            'Jugador',
            'Temporada',
            'Concepto',
            'Monto abonado',
            'Fecha del abono'
          ]
        },
        'pagos-jugadores': {
          filename: 'Reporte de pagos de juagadores',
          headers: [
            'Banco',
            'Jugador',
            'Temporada',
            'Concepto',
            'Monto pagado',
            'Método del pago',
            'Referencia',
            'Fecha del pago'
          ]
        }
      }

      // Transformar datos según el módulo
      const transformer = dataTransformers[form.modulo] || (() => [])
      const data = response.map(transformer)

      // Obtener configuración del reporte
      const config = reportConfigs[form.modulo] || {}

      // Generar nombre de archivo con fecha
      const filename = `${config.filename} ${dayjs().format('DD-MM-YYYY')}.xlsx`

      // Exportar a Excel
      exportToExcel(data, config.headers, config.filename, filename)
    } catch (error) {
      toast.warning(error.message)
      console.error('Error generating report:', error)
    }
  }

  const generateEstadoCuentaProveedor = async (form) => {
    const data = await getEstadoCuentaProveedor(form)
    setEstado(data)
  }

  const generateEstadoCuentaBanco = async (form) => {
    const data = await getEstadoCuentaBanco(form)
    setEstado(data)
  }

  // Funciones de transformación específicas por módulo
  function transformMovimientData(res) {
    return {
      banco: res.banco.nombre,
      tipo_movimiento: res.tipo_movimiento,
      concepto: res.concepto,
      fecha: formatDate(res.fecha),
      referencia: res.referencia || 'N/A',
      metodo_pago: res.metodo_pago,
      monto: formatCurrency(res.monto)
    }
  }

  function transformOrderData(res) {
    return {
      banco: res.banco.nombre,
      proveedor: res.proveedor.nombre_empresa,
      articulo: res.articulo.nombre,
      cantidad_articulo: res.cantidad_articulo,
      precio_articulo: formatCurrency(res.precio_articulo),
      numero_oc: res.numero_oc,
      total: formatCurrency(res.total),
      estatus: res.estatus
    }
  }

  function transformPayData(res) {
    return {
      banco: res.orden_compra.banco.nombre,
      proveedor: res.orden_compra.proveedor.nombre_empresa,
      articulo: res.orden_compra.articulo.nombre,
      cantidad_articulo: res.orden_compra.cantidad_articulo,
      precio_articulo: formatCurrency(res.orden_compra.precio_articulo),
      numero_oc: res.orden_compra.numero_oc,
      total: formatCurrency(res.orden_compra.total),
      metodo_pago: res.metodo_pago,
      referencia: res.referencia || 'N/A'
    }
  }

  function transformExpenseData(res) {
    return {
      banco: res.banco.nombre,
      concepto: res.concepto.nombre,
      metodo_pago: res.metodo_pago,
      referencia: res.referencia ?? 'N/A',
      total: formatCurrency(res.total)
    }
  }

  function transformInventoryData(res) {
    return {
      articulo: res.articulo.nombre,
      numero_serie: res.numero_serie,
      fecha_entrada: formatDate(res.fecha_entrada, 'Sin entrada a almacén'),
      fecha_salida: formatDate(res.fecha_salida, 'Sin salida de almacén'),
      estado: res.estado,
      otra_informacion: res.otra_informacion || 'N/A'
    }
  }

  function transformEquipmentData(res) {
    return {
      jugador: formatJugadornName(res.jugador),
      fecha_entrega: formatDate(res.fecha_entrega),
      fecha_devuelto: formatDate(res.fecha_devuelto, 'Sin devolver'),
      devuelto: res.devuelto,
      equipo_asignado: formatAssignedEquipment(res.detalles)
    }
  }

  function transformDeudaData(res) {
    return {
      jugador: formatJugadornName(res.jugador),
      temporada: res.costo_categoria.categoria.temporada.nombre,
      concepto: `${res.costo_categoria.concepto_cobro.nombre} (${res.costo_categoria.categoria.nombre})`,
      monto_base: formatCurrency(res.monto_base),
      monto_final: formatCurrency(res.monto_final),
      saldo_restante: formatCurrency(res.saldo_restante),
      fecha_pago: dayjs(res.fecha_pago).format('DD/MM/YYYY'),
      fecha_limite: dayjs(res.fecha_limite).format('DD/MM/YYYY'),
      estatus: res.estatus
    }
  }

  function transformAbonosData(res) {
    return {
      jugador: formatJugadornName(res.deuda_jugador.jugador),
      temporada: res.deuda_jugador.costo_categoria.categoria.temporada.nombre,
      concepto: `${res.deuda_jugador.costo_categoria.concepto_cobro.nombre} (${res.deuda_jugador.costo_categoria.categoria.nombre})`,
      monto_abonado: formatCurrency(res.monto),
      fecha_abono: dayjs(res.fecha).format('DD/MM/YYYY')
    }
  }

  function transformPagoData(res) {
    return {
      banco: res.banco.nombre,
      jugador: formatJugadornName(res.deuda_jugador.jugador),
      temporada: res.deuda_jugador.costo_categoria.categoria.temporada.nombre,
      concepto: `${res.deuda_jugador.costo_categoria.concepto_cobro.nombre} (${res.deuda_jugador.costo_categoria.categoria.nombre})`,
      monto_pagado: formatCurrency(res.deuda_jugador.monto_final),
      metodo_pago: res.metodo_pago,
      referencia: res.referencia ?? 'N/A',
      fecha_pagado: dayjs(res.fecha_pagado).format('DD/MM/YYYY')
    }
  }

  // Funciones utilitarias
  function formatCurrency(amount) {
    return `$${amount}`
  }

  function formatDate(date, fallback = 'N/A') {
    return date ? dayjs(date).format('DD/MM/YYYY') : fallback
  }

  function formatJugadornName(jugadorn) {
    if (!jugadorn) return 'N/A'
    return `${jugadorn.nombre} ${jugadorn.apellido_p} ${jugadorn.apellido_m}`.trim()
  }

  function formatAssignedEquipment(details) {
    if (!details || !details.length) return 'Ningún equipo asignado'
    return details
      .map((d) => `${d.articulo.nombre} (${d.numero_serie})`)
      .join(', ')
  }

  return {
    formReport,
    estado,
    handleInputChange,
    loadOptionsBancos,
    loadOptionsProveedores,
    loadOptionsJugadores,
    loadOptionsJugadoresTodos,
    loadOptionsProveedoresUnico,
    loadOptionsBancosUnico,
    loadOptionsTemporadas,
    generateReport,
    generateEstadoCuentaProveedor,
    generateEstadoCuentaBanco
  }
}
