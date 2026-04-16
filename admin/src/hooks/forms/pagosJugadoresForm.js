export const pagosJugadoresForm = async ({ name, setFormData, value }) => {
  if (name === 'deuda_jugador_id') {
    setFormData('nombre_jugador', value.jugador)
    setFormData('monto', value.monto)
  }
}
