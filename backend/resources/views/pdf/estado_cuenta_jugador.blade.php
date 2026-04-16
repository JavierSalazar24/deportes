@php
    use Carbon\Carbon;
@endphp

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Estado de Cuenta - {{ $data['jugador']['nombre'] }} {{ $data['jugador']['apellido_p'] }} {{ $data['jugador']['apellido_m'] }}</title>
    <style>
        body {
            font-family: 'DejaVu Sans', sans-serif;
            font-size: 11px;
            color: #1a202c;
            line-height: 1.4;
            margin: 0;
            padding: 10px;
            background-color: white;
        }

        /* Header Styles */
        .header {
            background: #d1160c;
            color: white;
            padding: 25px;
            margin: -20px -20px 30px -20px;
            text-align: center;
            border-bottom: 4px solid #e1251b;
        }

        .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .header .subtitle {
            margin-top: 8px;
            font-size: 14px;
            opacity: 0.9;
        }

        .logo-container {
            margin: 15px 0 10px 0;
            text-align: center;
        }

        .logo {
            max-height: 120px;
            max-width: 300px;
            height: auto;
            width: auto;
            border: 2px solid white;
            border-radius: 8px;
            background: white;
            padding: 5px;
        }

        /* Bank Info Card */
        .bank-info {
            background: white;
            border: 2px solid #d1160c;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 25px;
            box-shadow: 0 2px 4px rgba(26, 54, 93, 0.1);
        }

        .bank-info-grid {
            display: table;
            width: 100%;
        }

        .bank-info-row {
            display: table-row;
        }

        .bank-info-cell {
            display: table-cell;
            padding: 8px 15px;
            border-bottom: 1px solid #e2e8f0;
            vertical-align: middle;
        }

        .bank-info-cell:first-child {
            background-color: #d1160c;
            color: white;
            font-weight: bold;
            width: 25%;
            text-align: center;
        }

        .bank-info-cell:last-child {
            background-color: white;
            color: #2d3748;
        }

        /* Section Styles */
        .section {
            margin-bottom: 25px;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(26, 54, 93, 0.08);
            page-break-inside: avoid;
        }

        .section-header {
            background: #d1160c;
            color: white;
            padding: 15px 20px;
            margin: 0;
            font-size: 16px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .section-content {
            /* padding: 20px; */
            margin-bottom: 20px;
        }

        /* Table Styles */
        .table {
            width: 100%;
            border-collapse: collapse;
            margin: 0;
            background: white;
            font-size: 9px;
            table-layout: fixed;
            margin-top: 10px;
        }

        .table thead {
            background: #e1251b;
            color: white;
        }

        .table th {
            padding: 8px 4px;
            text-align: center;
            font-weight: bold;
            font-size: 8px;
            text-transform: uppercase;
            letter-spacing: 0.2px;
            border-right: 1px solid #d1160c;
            word-wrap: break-word;
        }

        .table th:last-child {
            border-right: none;
        }

        .table td {
            padding: 6px 4px;
            text-align: center;
            font-size: 8px;
            border-bottom: 1px solid #e2e8f0;
            border-right: 1px solid #e2e8f0;
            word-wrap: break-word;
            overflow: hidden;
        }

        .table td:last-child {
            border-right: none;
        }

        .table tbody tr:nth-child(even) {
            background-color: #f8fafc;
        }

        .table tbody tr:hover {
            background-color: #edf2f7;
        }

        .t-abonos td {
            font-size: 10px;
        }

        .t-abonos .amount {
            font-size: 10px;
        }

        /* Amount Styling */
        .amount {
            font-weight: bold;
            font-family: 'Courier New', monospace;
        }

        .amount.positive {
            color: #38a169;
        }

        .amount.negative {
            color: #e53e3e;
        }

        /* Status and Type Badges */
        .badge {
            padding: 4px 8px;
            border-radius: 9px;
            font-size: 9px;
            font-weight: bold;
            text-transform: uppercase;
        }

        .badge.ingreso {
            background-color: #c6f6d5;
            color: #22543d;
        }

        .badge.egreso {
            background-color: #fed7d7;
            color: #742a2a;
        }

        .badge-pagos {
            padding: 4px 5px;
            border-radius: 5px;
            font-size: 7px;
            font-weight: bold;
            text-transform: uppercase;
        }

        .badge-pagos.pagado {
            background-color: #c6f6d5;
            color: #22543d;
        }

        .badge-pagos.pendiente {
            background-color: #fed7d7;
            color: #742a2a;
        }

        .badge-pagos.cancelado {
            background-color: #f7fed7;
            color: #73742a;
        }

        .badge-pagos.parcial {
            background-color: #e0e0e0;
            color: #363636;
        }

        /* Summary Section */
        .resumen {
            background: #d1160c;
            color: white;
            text-align: center;
            padding: 30px;
            margin-top: 30px;
        }

        .resumen h2 {
            margin: 0 0 25px 0;
            font-size: 20px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .summary-grid {
            display: table;
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
        }

        .summary-row {
            display: table-row;
        }

        .summary-cell {
            display: table-cell;
            padding: 15px;
            text-align: center;
            border: 2px solid #e1251b;
            background: white;
            color: #001a38;
        }

        .summary-label {
            font-size: 14px;
            margin-bottom: 8px;
            opacity: 0.9;
        }

        .summary-amount {
            font-size: 18px;
            font-weight: bold;
            font-family: 'Courier New', monospace;
        }

        .summary-amount.pagos {
            color: #38a169;
        }

        .summary-amount.deudas {
            color: #d1160c;
        }

        .summary-amount.abonos {
            color: #27548A;
        }

        /* Empty State */
        .empty-state {
            text-align: center;
            padding: 40px 20px;
            color: #718096;
            font-style: italic;
        }

        .empty-state::before {
            content: "📋";
            display: block;
            font-size: 32px;
            margin-bottom: 10px;
        }

        /* Utility Classes */
        .text-center { text-align: center; }
        .text-right { text-align: right; }
        .font-bold { font-weight: bold; }
        .uppercase { text-transform: uppercase; }

        /* Print Optimizations */
        @media print {
            body {
                background-color: white;
                padding: 10px;
            }

            .section {
                box-shadow: none;
                border: 1px solid #d1160c;
            }
        }

        /* Tabla de movimientos bancarios */
        .movimientos-table th:nth-child(1) { width: 10%; }
        .movimientos-table th:nth-child(2) { width: 20%; }
        .movimientos-table th:nth-child(3) { width: 15%; }
        .movimientos-table th:nth-child(4) { width: 12%; }
        .movimientos-table th:nth-child(5) { width: 12%; }
        .movimientos-table th:nth-child(6) { width: 15%; }
        .movimientos-table th:nth-child(7) { width: 12%; }
        .movimientos-table th:nth-child(8) { width: 12%; }
        .movimientos-table th:nth-child(9) { width: 12%; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Estado de Cuenta de Jugador</h1>
        <div class="logo-container">
            <img src="{{ public_path('logo/logo2.png') }}" alt="Logo de la empresa" class="logo" />
        </div>
        <div class="subtitle">Reporte Financiero del Jugador</div>
    </div>

    <div class="bank-info">
        <div class="bank-info-grid">
            <div class="bank-info-row">
                <div class="bank-info-cell">Nombre</div>
                <div class="bank-info-cell">{{ $data['jugador']['nombre'] }} {{ $data['jugador']['apellido_p'] }} {{ $data['jugador']['apellido_m'] }}</div>
            </div>
            <div class="bank-info-row">
                <div class="bank-info-cell">Fecha de nacimiento</div>
                <div class="bank-info-cell">{{ Carbon::parse($data['jugador']['fecha_nacimiento'])->format('d/m/Y') }}</div>
            </div>
            <div class="bank-info-row">
                <div class="bank-info-cell">CURP</div>
                <div class="bank-info-cell">{{ $data['jugador']['curp'] }}</div>
            </div>
            <div class="bank-info-row">
                <div class="bank-info-cell">Categoría</div>
                <div class="bank-info-cell">{{ $data['jugador']['categoria']['nombre'] }}</div>
            </div>
            <div class="bank-info-row">
                <div class="bank-info-cell">Padre/Madre/Tutor</div>
                <div class="bank-info-cell">{{ $data['jugador']['usuario']['nombre_completo'] }}</div>
            </div>
            <div class="bank-info-row">
                <div class="bank-info-cell">Período</div>
                <div class="bank-info-cell">{{ Carbon::parse($data['periodo']['inicio'])->format('d/m/Y') }} al {{ Carbon::parse($data['periodo']['fin'])->format('d/m/Y') }}</div>
            </div>
        </div>
    </div>

    <div class="section">
        <h3 class="section-header">⚠️ Deudas</h3>
        <div class="section-content">
            @if(count($data['deudas']) > 0)
                <table class="table movimientos-table">
                    <thead>
                        <tr>
                            <th>Fecha a pagar</th>
                            <th>Concepto</th>
                            <th>Monto base</th>
                            <th>Costo extra</th>
                            <th>Descuento</th>
                            <th>Monto final</th>
                            <th>Saldo restante</th>
                            <th>Total en abonos</th>
                            <th>Estatus</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($data['deudas'] as $deuda)
                            <tr>
                                <td>{{ Carbon::parse($deuda['fecha_pago'])->format('d/m/Y') }}</td>
                                <td>{{ $deuda['concepto'] }}</td>
                                <td class="amount">${{ number_format($deuda['monto_base'], 2) }}</td>
                                <td>${{ number_format($deuda['extra'], 2) }}</td>
                                <td>${{ number_format($deuda['descuento'], 2) }}</td>
                                <td class="amount">${{ number_format($deuda['monto_final'], 2) }}</td>
                                <td>${{ number_format($deuda['saldo_restante'], 2) }}</td>
                                <td>${{ number_format($deuda['total_abonado'], 2) }}</td>
                                <td><span class="badge-pagos {{ strtolower( $deuda['estatus']) }}">{{  $deuda['estatus'] }}</span></td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            @else
                <div class="empty-state">
                    No hay deudas registradas en este periodo.
                </div>
            @endif
        </div>
    </div>

    <div class="section">
        <h3 class="section-header">💵 Abonos a Deudas</h3>
        <div class="section-content">
            @if(count($data['abonos']) > 0)
                <table class="table ordenes-table">
                    <thead>
                        <tr>
                            <th>Fecha abono</th>
                            <th>Concepto</th>
                            <th>Monto</th>
                            <th>Método pago</th>
                            <th>Referencia</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($data['abonos'] as $abono)
                            <tr>
                                <td>{{ Carbon::parse($abono['fecha'])->format('d/m/Y') }}</td>
                                <td>{{ $abono['concepto'] }}</td>
                                <td class="amount">${{ number_format($abono['monto'], 2) }}</td>
                                <td>{{ $abono['metodo_pago'] }}</td>
                                <td>{{ $abono['referencia'] }}</td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            @else
                <div class="empty-state">
                    No hay abonos registrados en este periodo.
                </div>
            @endif
        </div>
    </div>

    <div class="section">
        <h3 class="section-header">💰 Pagos</h3>
        <div class="section-content">
            @if(count($data['pagos']) > 0)
                <table class="table">
                    <thead>
                        <tr>
                            <th>Fecha del pago</th>
                            <th>Concepto</th>
                            <th>Monto pagado</th>
                            <th>Método pago</th>
                            <th>Referencia</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($data['pagos'] as $pago)
                            <tr>
                                <td>{{ Carbon::parse($pago['fecha_pagado'])->format('d/m/Y') }}</td>
                                <td>{{ $pago['concepto'] }}</td>
                                <td class="amount">${{ number_format($pago['monto_final'], 2) }}</td>
                                <td>{{ $pago['metodo_pago'] }}</td>
                                <td>{{ $pago['referencia'] }}</td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            @else
                <div class="empty-state">
                    No hay pagos registrados en este periodo.
                </div>
            @endif
        </div>
    </div>

    <div class="section resumen">
        <h2>📈 Resumen Financiero</h2>
        <div class="summary-grid">
            <div class="summary-row">
                <div class="summary-cell">
                    <div class="summary-label" style="margin: 0">
                        Deudas totales
                    </div>
                    <div class="summary-label" style="font-size: 10px;">
                        (Saldo restante)
                    </div>
                    <div class="summary-amount deudas">${{ number_format($data['resumen']['total_deuda'], 2) }} MXN</div>
                </div>
                <div class="summary-cell">
                    <div class="summary-label">Abonos totales</div>
                    <div class="summary-amount abonos">${{ number_format($data['resumen']['total_abonos'], 2) }} MXN</div>
                </div>
                <div class="summary-cell">
                    <div class="summary-label">Pagos realizados</div>
                    <div class="summary-amount pagos">${{ number_format($data['resumen']['total_pagado'], 2) }} MXN</div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
