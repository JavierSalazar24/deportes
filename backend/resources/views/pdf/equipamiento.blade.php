<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Acta de Entrega - Equipamiento Deportivo</title>
    <style>
        /* Reset básico compatible con CSS 2.5 */
        * {
            margin: 0;
            padding: 0;
        }

        body {
            font-family: Arial, sans-serif;
            font-size: 14px;
            line-height: 1.4;
            color: #000000;
            background-color: white;
        }

        .documento-container {
            width: 100%;
            background-color: white;
        }

        /* Propiedades de salto de página */
        .page-break {
            page-break-before: always;
        }

        .no-page-break {
            page-break-inside: avoid;
        }

        /* Header simplificado */
        .header {
            background-color: #d1160c;
            color: white;
            padding: 40px 30px;
            text-align: center;
            page-break-inside: avoid;
        }

        .header-border {
            height: 6px;
            background-color: #ff6b35;
            margin-bottom: 20px;
        }

        /* Logo del equipo */
        .logo-container {
            margin-bottom: 25px;
            text-align: center;
        }

        .logo-equipo {
            width: 100px;
            height: 100px;
            border: 3px solid white;
            background-color: white;
            border-radius: 50%;
        }

        .logo-placeholder {
            width: 100px;
            height: 100px;
            border: 3px solid white;
            background-color: white;
            color: #333333;
            font-size: 12px;
            font-weight: bold;
            text-align: center;
            display: table-cell;
            vertical-align: middle;
        }

        .header h1 {
            font-size: 28px;
            font-weight: bold;
            margin: 0 0 15px 0;
            text-transform: uppercase;
        }

        .header h2 {
            font-size: 20px;
            font-weight: normal;
            margin: 0 0 20px 0;
        }

        .header-divider {
            width: 100px;
            height: 4px;
            background-color: #ffd23f;
            margin: 20px auto;
        }

        .header p {
            font-size: 14px;
            margin: 0;
        }

        /* Contenido principal */
        .content {
            padding: 30px;
        }

        /* Secciones con bordes redondeados */
        .seccion {
            margin-bottom: 15px;
            background: white;
            page-break-inside: avoid;
            border-radius: 12px;
            -webkit-border-radius: 12px;
            -moz-border-radius: 12px;
            overflow: hidden;
            border: 1px solid #e0e0e0;
        }

        .section-content-equipamiento{
            border: 1px solid #e0e0e0;
            margin-bottom: 15px;
            border-bottom-right-radius: 12px;
            border-bottom-left-radius: 12px;
        }

        .seccion-header {
            color: white;
            padding: 18px 25px;
            font-size: 16px;
            font-weight: bold;
            text-transform: uppercase;
            margin-bottom: 0;
            border-radius: 12px 12px 0 0;
            -webkit-border-radius: 12px 12px 0 0;
            -moz-border-radius: 12px 12px 0 0;
        }

        .seccion-deportista .seccion-header {
            background-color: #ac1109;
        }

        .seccion-responsable .seccion-header {
            background-color: #ac1109;
        }

        .seccion-equipamiento .seccion-header {
            background-color: #ff6b35;
        }

        .seccion-terminos .seccion-header {
            background-color: #e53e3e;
        }

        .seccion-content {
            padding: 20px;
            background-color: #f8f9fa;
        }

        .seccion-content-equipamiento {
            padding: 15px;
            background-color: #f8f9fa;
        }

        /* Campos de formulario redondeados con espaciado corregido */
        .campo {
            margin-bottom: 15px;
        }

        .campo:last-child {
            margin-bottom: 0;
        }

        .campo label {
            font-size: 13px;
            font-weight: bold;
            color: #4a5568;
            display: block;
            margin-bottom: 8px;
            text-transform: uppercase;
        }

        .campo-input {
            border: 1px solid #e2e8f0;
            padding: 10px 10px;
            background-color: white;
            font-size: 14px;
            width: 95%;
            display: block;
            color: #2d3748;
            border-radius: 8px;
            -webkit-border-radius: 8px;
            -moz-border-radius: 8px;
            margin-right: 5%;
        }

        .campo-input.direccion {
            min-height: 30px;
        }

        .campo-deportista {
            border-left: 4px solid #3182ce;
        }

        .campo-curp {
            border-left: 4px solid #ed8936;
        }

        .campo-direccion {
            border-left: 4px solid #38a169;
        }

        .campo-responsable {
            border-left: 4px solid #3182ce;
        }

        .campo-telefono {
            border-left: 4px solid #ed8936;
        }

        .campo-correo {
            border-left: 4px solid #38a169;
        }

        /* Tabla de equipamiento redondeada */
        .tabla-container {
            border-radius: 10px;
            -webkit-border-radius: 10px;
            -moz-border-radius: 10px;
            overflow: hidden;
            border: 1px solid #e2e8f0;
            margin-right: 5%;
            width: 100%;
        }

        .tabla-equipamiento {
            width: 100%;
            border-collapse: collapse;
            background-color: white;
            border: none;
        }

        .tabla-equipamiento thead tr {
            background-color: #cc4514;
            color: white;
        }

        .tabla-equipamiento th {
            padding: 10px;
            text-align: center;
            font-size: 13px;
            font-weight: bold;
            text-transform: uppercase;
            border: none;
        }

        .tabla-equipamiento tbody tr {
            border: none;
            border-bottom: 1px solid #f7fafc;
        }

        .tabla-equipamiento tbody tr:nth-child(even) {
            background-color: #f8f9fa;
        }

        .tabla-equipamiento tbody tr:nth-child(odd) {
            background-color: white;
        }

        .tabla-equipamiento tbody tr:last-child {
            border-bottom: none;
        }

        .tabla-equipamiento td {
            padding: 8px;
            font-size: 13px;
            color: #2d3748;
            border: none;
            text-align: center;
        }

        /* Términos y condiciones redondeados */
        .termino-item {
            background-color: white;
            padding: 20px;
            border: 1px solid #fed7d7;
            margin-bottom: 15px;
            margin-right: 5%;
            width: 90%;
            border-radius: 10px;
            -webkit-border-radius: 10px;
            -moz-border-radius: 10px;
            border-left: 4px solid #fc8181;
        }

        .termino-item:last-child {
            margin-bottom: 0;
        }

        .termino-item h3 {
            margin: 0 0 12px 0;
            font-size: 14px;
            color: #c53030;
            font-weight: bold;
            text-transform: uppercase;
        }

        .termino-item p {
            margin: 0;
            font-size: 12px;
            color: #2d3748;
        }

        .precio-destacado {
            color: #c53030;
            font-weight: bold;
            background-color: #fed7d7;
            padding: 4px 8px;
            border-radius: 4px;
            -webkit-border-radius: 4px;
            -moz-border-radius: 4px;
        }

        /* Firmas con bordes redondeados */
        .firmas-container {
            margin-top: 40px;
            border-top: 2px solid #e2e8f0;
            padding-top: 30px;
            page-break-inside: avoid;
        }

        .firmas-titulo {
            text-align: center;
            font-size: 18px;
            color: #2d3748;
            margin: 0 0 30px 0;
            font-weight: bold;
            text-transform: uppercase;
        }

        .firmas-table {
            width: 95%;
            table-layout: fixed;
            margin: 80px auto;
        }

        .firma-cell {
            width: 45%;
            text-align: center;
            vertical-align: top;
            padding: 0 10px;
        }

        .firma-space {
            width: 10%;
        }

        .firma-linea {
            height: 80px;
            border-bottom: 2px solid #4a5568;
            margin-bottom: 15px;
            border-radius: 8px 8px 0 0;
            -webkit-border-radius: 8px 8px 0 0;
            -moz-border-radius: 8px 8px 0 0;
        }

        .firma-texto {
            font-size: 11px;
            color: #718096;
            font-weight: bold;
            margin-top: 5px;
        }

        .firma-info {
            background-color: #f8f9fa;
            padding: 15px;
            border: 1px solid #e2e8f0;
            margin-top: 15px;
            border-radius: 8px;
            -webkit-border-radius: 8px;
            -moz-border-radius: 8px;
        }

        .firma-info p {
            margin: 0 0 8px 0;
            font-size: 14px;
            font-weight: bold;
            color: #2d3748;
            text-transform: uppercase;
        }

        .firma-nombre {
            margin-top: 8px;
        }

        .firma-nombre p {
            margin: 0;
            font-size: 14px;
            font-weight: bold;
            font-style: italic;
            text-transform: none;
        }

        .firma-nota {
            margin-top: 10px;
            font-size: 11px;
            color: #718096;
            font-weight: normal;
        }

        /* Footer */
        .footer {
            margin-top: 40px;
            text-align: center;
            font-size: 12px;
            color: #718096;
            border-top: 1px solid #e2e8f0;
            padding-top: 20px;
            background-color: #f8f9fa;
            padding: 20px;
            margin-right: 5%;
            width: 90%;
            border-radius: 8px;
            -webkit-border-radius: 8px;
            -moz-border-radius: 8px;
            page-break-inside: avoid;
        }

        .footer p {
            margin: 0 0 5px 0;
            font-weight: bold;
        }

        .footer p:last-child {
            margin-bottom: 0;
            font-size: 11px;
            color: #a0aec0;
            font-weight: normal;
        }

        /* Utilidades para impresión y salto de página */
        @media print {
            .content {
                padding: 15px;
            }

            .header {
                padding: 25px 15px;
            }

            .logo-equipo, .logo-placeholder {
                width: 80px;
                height: 80px;
            }

            .seccion {
                page-break-inside: avoid;
            }

            .tabla-equipamiento {
                page-break-inside: auto;
            }

            .tabla-equipamiento thead {
                page-break-inside: avoid;
                page-break-after: avoid;
            }

            .tabla-equipamiento tbody tr {
                page-break-inside: avoid;
            }

            .firmas-container {
                page-break-inside: avoid;
            }

            .termino-item {
                page-break-inside: avoid;
            }
        }
    </style>
</head>
<body>
    <div class="documento-container">
        <!-- Header -->
        <div class="header no-page-break">

            <!-- Logo del Equipo -->
            <div class="logo-container">
                <img src="{{ public_path('logo/logo2.png') }}" alt="Logo del Club" class="logo-equipo">
            </div>

            <h1>ENTREGA DEL EQUIPO</h1>
            <div class="header-divider"></div>
            <p>Documento oficial de asignación y responsabilidad</p>
        </div>

        <div class="content">
            <!-- Información del Deportista -->
            <div class="seccion seccion-deportista no-page-break">
                <div class="seccion-header">
                    Datos del Deportista
                </div>
                <div class="seccion-content">
                    <div class="campo">
                        <label>Nombre Completo:</label>
                        <div class="campo-input campo-deportista">
                            {{$jugador->nombre}} {{$jugador->apellido_p}} {{$jugador->apellido_m}}
                        </div>
                    </div>

                    <div class="campo">
                        <label>CURP:</label>
                        <div class="campo-input campo-curp">
                            {{ $jugador->curp }}
                        </div>
                    </div>

                    <div class="campo">
                        <label>Dirección Completa:</label>
                        <div class="campo-input campo-direccion direccion">
                            {{ $jugador->direccion }}
                        </div>
                    </div>
                </div>
            </div>

            <!-- Información del Responsable -->
            <div class="seccion seccion-responsable">
                <div class="seccion-header">
                    Datos del Responsable
                </div>
                <div class="seccion-content">
                    <div class="campo">
                        <label>Nombre del Responsable:</label>
                        <div class="campo-input campo-responsable">
                            {{ $responsable->nombre_completo }}
                        </div>
                    </div>

                    <div class="campo">
                        <label>Número de Teléfono:</label>
                        <div class="campo-input campo-telefono">
                            {{ $responsable->telefono }}
                        </div>
                    </div>

                    <div class="campo">
                        <label>Correo Electrónico:</label>
                        <div class="campo-input campo-correo">
                            {{ $responsable->email }}
                        </div>
                    </div>
                </div>
            </div>

            <!-- Equipamiento Asignado -->
            <div class="seccion-equipamiento">
                <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:32px;">
                    <tr>
                        <td style="background:#ff6b35; color:white; font-weight:bold; font-size:18px; border-radius:12px 12px 0 0; text-align:center; padding:22px 0;">
                            Equipamiento Deportivo Asignado
                        </td>
                    </tr>
                </table>
                <div class="seccion-content-equipamiento section-content-equipamiento">
                    <div class="tabla-container">
                        <table class="tabla-equipamiento">
                            <thead>
                                <tr>
                                    <th>Nombre del Equipo</th>
                                    <th>Número de Serie o de uniforme</th>
                                </tr>
                            </thead>
                            <tbody>
                                @if(isset($detalles) && count($detalles) > 0)
                                    @foreach($detalles as $item)
                                    <tr>
                                        <td>{{ $item->articulo->nombre }}</td>
                                        <td>{{ $item->numero_serie }}</td>
                                    </tr>
                                    @endforeach
                                @else
                                    <tr>
                                        <td colspan="2">Sin equipamiento asignado</td>
                                    </tr>
                                @endif
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- Términos y Condiciones -->
            <div class="seccion-terminos">
                <div class="termino-item no-page-break">
                    <h3>Política de No Devolución</h3>
                    <p>
                        En caso de <strong>NO ENTREGAR</strong> el equipamiento deportivo asignado al finalizar la temporada o
                        al darse de baja del club, se aplicará automáticamente un cargo de
                        <span class="precio-destacado">${{ number_format($cantidad, 2) }}</span> ({{ $cantidadLetras }}) por concepto de reposición del equipamiento completo.
                    </p>
                </div>

                <div class="termino-item no-page-break">
                    <h3>Política de Daños y Deterioro</h3>
                    <p>
                        Si el equipamiento se entrega con <strong>daños, deterioro excesivo o en condiciones no aptas para su reutilización</strong>,
                        se cobrará una cantidad proporcional al daño ocasionado. El monto será determinado por la dirección técnica del
                        club deportivo y podrá variar según la gravedad del daño presentado en cada artículo.
                    </p>
                </div>

                <table class="firmas-table">
                    <tr>
                        <td class="firma-cell">
                            <div class="firma-linea"></div>
                            <div class="firma-texto">FIRMA DEL RESPONSABLE</div>
                            <div class="firma-nombre">
                                <p>{{ $responsable->nombre_completo }}</p>
                            </div>
                        </td>
                        <td class="firma-space"></td>
                        <td class="firma-cell">
                            <div class="firma-linea"></div>
                            <div class="firma-texto">FIRMA DEL RESPONSABLE DEL CLUB</div>
                            <div class="firma-nombre">
                                <p>Dirección Técnica y Administrativa</p>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</body>
</html>
