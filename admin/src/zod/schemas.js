import { z } from 'zod'

export const jugadorSchema = z.object({
  nombre: z
    .string({ required_error: 'El nombre del jugador es requerido' })
    .min(1, 'El nombre del jugador es requerido')
    .regex(
      /^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]+$/,
      'El nombre del jugador solo puede contener letras'
    ),
  apellido_p: z
    .string({ required_error: 'El apellido paterno es requerido' })
    .min(1, 'El apellido paterno es requerido')
    .regex(
      /^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]+$/,
      'El apellido paterno solo puede contener letras'
    ),
  apellido_m: z
    .string({ required_error: 'El apellido materno es requerido' })
    .min(1, 'El apellido materno es requerido')
    .regex(
      /^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]+$/,
      'El apellido materno solo puede contener letras'
    ),
  telefono: z
    .string({ required_error: 'El teléfono del jugador es requerido' })
    .min(10, 'El teléfono del jugador debe tener al menos 10 dígitos')
    .max(15, 'El teléfono del jugador debe tener máximo 15 dígitos')
})

export const proveedorSchema = z.object({
  nombre_contacto: z
    .string({ required_error: 'El nombre de contacto es requerido' })
    .min(1, 'El nombre de contacto es requerido')
    .regex(
      /^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]+$/,
      'El nombre de contacto solo puede contener letras'
    ),
  telefono_contacto: z
    .string({ required_error: 'El teléfono de contacto es requerido' })
    .min(10, 'El teléfono de contacto debe tener al menos 10 dígitos')
    .max(15, 'El teléfono de contacto debe tener máximo 15 dígitos'),
  correo_contacto: z
    .string({ required_error: 'El correo de contacto es requerido' })
    .email('El correo de contacto no es válido'),
  cp: z.preprocess(
    (val) =>
      typeof val === 'number' ? String(val).padStart(5, '0') : String(val),
    z
      .string({
        required_error: 'El código postal es requerido',
        invalid_type_error: 'El código postal debe ser un string válido'
      })
      .regex(/^\d{5}$/, {
        message: 'El código postal debe tener exactamente 5 dígitos'
      })
  ),
  telefono_empresa: z
    .string({ required_error: 'El teléfono de la empresa es requerido' })
    .min(10, 'El teléfono de la empresa debe tener al menos 10 dígitos')
    .max(15, 'El teléfono de la empresa debe tener máximo 15 dígitos'),
  rfc: z
    .string({ required_error: 'El RFC es requerida' })
    .min(12, 'El RFC debe tener mínimo 12 caracteres')
    .max(13, 'El RFC debe tener máximo 13 caracteres')
})

export const usuarioSchema = z.object({
  nombre_completo: z
    .string({ required_error: 'El nombre es requerido' })
    .min(1, 'El nombre es requerido')
    .regex(/^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]+$/, 'El nombre solo puede contener letras'),
  telefono: z
    .string({ required_error: 'El teléfono del jugador es requerido' })
    .min(10, 'El teléfono del jugador debe tener al menos 10 dígitos')
    .max(15, 'El teléfono del jugador debe tener máximo 15 dígitos'),
  email: z
    .string({ required_error: 'El correo es requerido' })
    .email('El correo no es válido'),
  password: z
    .string({ required_error: 'La contraseña es requerida' })
    .min(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    .optional()
})
