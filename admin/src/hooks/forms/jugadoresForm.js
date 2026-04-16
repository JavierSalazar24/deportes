export const jugadoresForm = async ({ name, setFormData, value }) => {
  if (name === 'usuario_id') {
    setFormData('correo_tutor', value.correo)
    setFormData('telefono_tutor', value.telefono)
  }
}
