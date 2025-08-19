// Helper para obtener el nombre de módulo desde el pathname
function getModuleNameFromPath(pathname) {
  // Esto toma solo la primera parte del path. Ej: '/jugadores/123/editar' => 'jugadores'
  const parts = pathname.split('/').filter(Boolean)
  return parts[0] || ''
}

// Función general para checar permiso
export function hasPermission(user, pathname, action = 'consultar') {
  if (!user?.rol?.permisos) return false
  const moduloName = getModuleNameFromPath(pathname)
  if (!moduloName) return false

  const permiso = user.rol.permisos.find((p) => p.modulo.ruta === moduloName)
  if (!permiso) return false

  return Boolean(permiso[action])
}
