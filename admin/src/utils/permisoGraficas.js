export const tienePermiso = (user, moduloNombre, accion = 'consultar') => {
  return user?.rol?.permisos?.some(
    (permiso) =>
      permiso?.modulo?.ruta === moduloNombre && permiso?.[accion] === 1
  )
}
