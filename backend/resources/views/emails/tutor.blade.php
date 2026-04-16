<!doctype html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmación de Cita Médica</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f0f4f8; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">

    <!-- Container Principal -->
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f0f4f8; padding: 40px 20px;">
        <tr>
            <td align="center">
                <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">

                    <!-- Header con gradiente -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #234c34 0%, #2a372f 100%); padding: 40px 40px 30px; text-align: center;">
                            <div style="width: 80px; margin: 0 auto 10px; border: 2px solid #ffffff; padding: 4px; border-radius: 12px; background-color: #ffffff;">
                                <img src="{{ asset('logo/logo.png') }}" alt="Logo Club de Fútbol Arcanix" width="100%">
                            </div>
                            <h1 style="color: #ffffff; margin: 0; font-size: 26px; font-weight: 600; letter-spacing: -0.5px;">
                                Bienvenido(a) a Club de Fútbol Arcanix
                            </h1>
                        </td>
                    </tr>

                    <!-- Saludo -->
                    <tr>
                        <td style="padding: 35px 40px 20px;">
                            <p style="margin: 0; color: #374151; font-size: 16px; line-height: 1.6;">
                                Hola, <strong style="color: #234c34;">{{ $usuario->nombre_completo }}</strong>
                            </p>
                            <p style="margin: 12px 0 0; color: #6b7280; font-size: 15px; line-height: 1.6;">
                                Gracias por ser parte del equipo del Club de Fútbol Arcanix. Hemos guardado sus datos correctamente y estamos emocionados de tenerle con nosotros. A continuación, encontrará un resumen de la información proporcionada:
                            </p>
                        </td>
                    </tr>

                    <!-- Tarjeta de Detalles de la Cita -->
                    <tr>
                        <td style="padding: 0 40px 25px;">
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: linear-gradient(135deg, #f0fdfa 0%, #ecfeff 100%); border-radius: 12px; border: 1px solid #99f6e4;">
                                <tr>
                                    <td style="padding: 25px;">
                                        <!-- Teléfono -->
                                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 18px;">
                                            <tr>
                                                <td width="44" valign="top">
                                                    <div style="width: 40px; height: 40px; background-color: #e6f006; border-radius: 10px; text-align: center; line-height: 40px;">
                                                        <span style="font-size: 18px;">📱</span>
                                                    </div>
                                                </td>
                                                <td style="padding-left: 14px;" valign="middle">
                                                    <p style="margin: 0; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Celular</p>
                                                    <p style="margin: 4px 0 0; color: #134e4a; font-size: 17px; font-weight: 700;">
                                                        {{ $usuario->telefono }}
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>

                                        <!-- Correo -->
                                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                                            <tr>
                                                <td width="44" valign="top">
                                                    <div style="width: 40px; height: 40px; background-color: #e6f006; border-radius: 10px; text-align: center; line-height: 40px;">
                                                        <span style="font-size: 18px;">@️</span>
                                                    </div>
                                                </td>
                                                <td style="padding-left: 14px;" valign="middle">
                                                    <p style="margin: 0; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Correo</p>
                                                    <p style="margin: 4px 0 0; color: #134e4a; font-size: 16px; font-weight: 600;">
                                                        {{ $usuario->email }}
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Contraseña -->
                    <tr>
                        <td style="padding: 0 40px 25px;">
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #fef3c7; border-radius: 10px; border-left: 4px solid #f59e0b;">
                                <tr>
                                    <td style="padding: 20px; text-align: center;">
                                        <h3 style="color: #2a372f; margin-top: 0; margin-bottom: 15px;">Su contraseña</h3>
                                        <p style="font-size: 14px; margin-bottom: 15px;">Hemos generado una contraseña automáticamente para su cuenta:</p>
                                        <div style="background-color: #ffffff; border: 2px dashed #2a372f; padding: 15px; font-size: 20px; font-weight: bold; letter-spacing: 1px; display: inline-block;">
                                            {{$password}}
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Separador -->
                    <tr>
                        <td style="padding: 0 40px;">
                            <hr style="border: none; height: 1px; background-color: #e5e7eb; margin: 0;">
                        </td>
                    </tr>

                    <!-- Contacto -->
                    <tr>
                        <td style="padding: 30px 40px; text-align: center;">
                            <p style="margin: 0 0 14px; color: #1f2937; font-size: 15px; font-weight: 600;">
                                ¿Tienes alguna duda? Contáctanos
                            </p>
                            <table role="presentation" cellspacing="0" cellpadding="0" align="center">
                                <tr>
                                    <td style="padding-right: 24px;">
                                        <a href="tel:8116251019" style="color: #0d9488; text-decoration: none; font-size: 14px; font-weight: 500;">
                                            📞811-625-1019
                                        </a>
                                    </td>
                                    <td>
                                        <a href="mailto:contacto@arcanix.com.mx" style="color: #0d9488; text-decoration: none; font-size: 14px; font-weight: 500;">
                                            ✉️ contacto@arcanix.com.mx
                                        </a>
                                    </td>
                                </tr>
                            </table>
                            <p style="margin: 12px 0 0; color: #9ca3af; font-size: 13px;">
                                Nuestro equipo está para ayudarte.
                            </p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f9fafb; padding: 25px 40px; text-align: center; border-top: 1px solid #e5e7eb;">
                            <p style="margin: 0 0 4px; color: #374151; font-size: 14px;">
                                Saludos cordiales,
                            </p>
                            <p style="margin: 0; color: #0d9488; font-size: 16px; font-weight: 700;">
                                Equipo Club de Fútbol Arcanix
                            </p>
                            <p style="margin: 16px 0 0; color: #9ca3af; font-size: 11px;">
                                © 2026 Club de Fútbol Arcanix. Todos los derechos reservados.
                            </p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>

</body>
</html>
