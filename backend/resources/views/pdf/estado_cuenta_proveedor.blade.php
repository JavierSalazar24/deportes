@php
    use Carbon\Carbon;
@endphp

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Estado de Cuenta - Proveedor {{ $data['proveedor']['nombre_empresa'] }}</title>
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
            max-height: 60px;
            max-width: 200px;
            height: auto;
            width: auto;
            border: 2px solid white;
            border-radius: 8px;
            background: white;
            padding: 5px;
        }

        /* Provider Info Card */
        .provider-info {
            background: white;
            border: 2px solid #d1160c;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 25px;
            box-shadow: 0 2px 4px rgba(26, 54, 93, 0.1);
        }

        .provider-info-grid {
            display: table;
            width: 100%;
        }

        .provider-info-row {
            display: table-row;
        }

        .provider-info-cell {
            display: table-cell;
            padding: 8px 15px;
            border-bottom: 1px solid #e2e8f0;
            vertical-align: middle;
        }

        .provider-info-cell:first-child {
            background-color: #d1160c;
            color: white;
            font-weight: bold;
            width: 25%;
            text-align: center;
        }

        .provider-info-cell:last-child {
            background-color: white;
            color: #2d3748;
        }

        /* Section Styles */
        .section {
            background: white;
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
            padding: 20px;
        }

        .section-content-table {
            padding: 10px;
        }

        /* Provider Details */
        .provider-details {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 6px;
            padding: 20px;
            margin: 0;
        }

        .detail-row {
            display: table;
            width: 100%;
            margin-bottom: 12px;
        }

        .detail-row:last-child {
            margin-bottom: 0;
        }

        .detail-label {
            display: table-cell;
            font-weight: bold;
            color: #d1160c;
            width: 40%;
            padding-right: 15px;
            vertical-align: top;
        }

        .detail-value {
            display: table-cell;
            color: #2d3748;
            vertical-align: top;
        }

        /* Table Styles */
        .table {
            width: 100%;
            border-collapse: collapse;
            margin: 15px 0 0 0;
            background: white;
            font-size: 8px;
            table-layout: fixed;
        }

        .table thead {
            background: #e1251b;
            color: white;
        }

        .table th {
            padding: 8px 4px;
            text-align: center;
            font-weight: bold;
            font-size: 7px;
            text-transform: uppercase;
            letter-spacing: 0.2px;
            word-wrap: break-word;
        }

        .table th:last-child {
            border-right: none;
        }

        .table td {
            padding: 6px 4px;
            text-align: center;
            font-size: 7px;
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

        /* Status Badges */
        .badge {
            padding: 3px 6px;
            border-radius: 10px;
            font-size: 7px;
            font-weight: bold;
            text-transform: uppercase;
        }

        .badge.pagada {
            background-color: #c6f6d5;
            color: #22543d;
        }

        .badge.pendiente {
            background-color: #fef5e7;
            color: #744210;
        }

        .badge.vencida {
            background-color: #fed7d7;
            color: #742a2a;
        }

        .badge.cancelada {
            background-color: #e2e8f0;
            color: #4a5568;
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

        .summary-section {
            background: white;
            color: #2d3748;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 20px;
            text-align: left;
        }

        .summary-section:last-child {
            margin-bottom: 0;
        }

        .summary-title {
            font-size: 14px;
            font-weight: bold;
            color: #d1160c;
            margin-bottom: 15px;
            text-transform: uppercase;
        }

        .summary-list {
            list-style: none;
            padding: 0;
            margin: 0;
        }

        .summary-list li {
            padding: 8px 0;
            border-bottom: 1px solid #e2e8f0;
            display: table;
            width: 100%;
        }

        .summary-list li:last-child {
            border-bottom: none;
        }

        .summary-label {
            display: table-cell;
            font-weight: bold;
        }

        .summary-value {
            display: table-cell;
            text-align: right;
            font-family: 'Courier New', monospace;
            font-weight: bold;
            font-size: 16px;
        }

        .summary-value.success {
            color: #38a169;
        }

        .summary-value.danger {
            color: #e53e3e;
        }

        .summary-value.warning {
            color: #d69e2e;
        }

        .summary-value.total {
            color: #d1160c;
        }

        .summary-highlight {
            background: #d1160c;
            color: white;
            padding: 15px;
            border-radius: 8px;
            text-align: center;
            margin-top: 20px;
        }

        .summary-highlight-amount {
            font-size: 18px;
            font-weight: bold;
            font-family: 'Courier New', monospace;
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

        /* Table Column Widths */
        .ordenes-table th:nth-child(1) { width: 8%; }   /* # OC */
        .ordenes-table th:nth-child(2) { width: 8%; }   /* Fecha */
        .ordenes-table th:nth-child(3) { width: 9%; }  /* Art. */
        .ordenes-table th:nth-child(4) { width: 5%; }   /* Cant. */
        .ordenes-table th:nth-child(5) { width: 8%; }   /* Precio U. */
        .ordenes-table th:nth-child(6) { width: 8%; }   /* Subt. */
        .ordenes-table th:nth-child(7) { width: 8%; }   /* Total */
        .ordenes-table th:nth-child(8) { width: 6%; }   /* IVA */
        .ordenes-table th:nth-child(9) { width: 8%; }  /* Pago */
        .ordenes-table th:nth-child(10) { width: 10%; }  /* Banco */
        .ordenes-table th:nth-child(11) { width: 10%; }  /* Estatus */
        .ordenes-table th:nth-child(12) { width: 9%; }  /* Vencim. */
    </style>
</head>
<body>
    <div class="header">
        <h1>Estado de Cuenta del Proveedor</h1>
        <div class="logo-container">
            <img src="{{ public_path('logo/logo2.png') }}" alt="Logo de la empresa" class="logo" />
        </div>
        <div class="subtitle">Reporte Financiero del Proveedor</div>
    </div>

    <div class="provider-info">
        <div class="provider-info-grid">
            <div class="provider-info-row">
                <div class="provider-info-cell">Proveedor</div>
                <div class="provider-info-cell">{{ $data['proveedor']['nombre_empresa'] }}</div>
            </div>
            <div class="provider-info-row">
                <div class="provider-info-cell">Período</div>
                <div class="provider-info-cell">{{ Carbon::parse($data['periodo']['inicio'])->format('d/m/Y') }} al {{ Carbon::parse($data['periodo']['fin'])->format('d/m/Y') }}</div>
            </div>
        </div>
    </div>

    <div class="section">
        <h3 class="section-header">🏢 Datos del Proveedor</h3>
        <div class="section-content">
            <div class="provider-details">
                <div class="detail-row">
                    <div class="detail-label">RFC:</div>
                    <div class="detail-value">{{ $data['proveedor']['rfc'] }}</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">Razón Social:</div>
                    <div class="detail-value">{{ $data['proveedor']['razon_social'] }}</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">Dirección:</div>
                    <div class="detail-value">{{ $data['proveedor']['calle'] }} {{ $data['proveedor']['numero'] }}, {{ $data['proveedor']['colonia'] }}, {{ $data['proveedor']['municipio'] }}, {{ $data['proveedor']['estado'] }}, CP: {{ $data['proveedor']['cp'] }}, {{ $data['proveedor']['pais'] }}</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">Teléfono de la empresa:</div>
                    <div class="detail-value">{{ $data['proveedor']['telefono_empresa'] }} Ext: {{ $data['proveedor']['extension_empresa'] }}</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">Contacto:</div>
                    <div class="detail-value">{{ $data['proveedor']['nombre_contacto'] }} | {{ $data['proveedor']['telefono_contacto'] }} | Teléfono: {{ $data['proveedor']['telefono_contacto'] }}</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">Correo:</div>
                    <div class="detail-value">{{ $data['proveedor']['correo_contacto'] }}</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">Días de crédito:</div>
                    <div class="detail-value">{{ $data['proveedor']['credito_dias'] ?? 'No definido' }}</div>
                </div>
            </div>
        </div>
    </div>

    <div class="section">
        <h3 class="section-header">📦 Órdenes de Compra</h3>
        <div class="section-content-table">
            @if(count($data['ordenes']) > 0)
                <table class="table ordenes-table">
                    <thead>
                        <tr>
                            <th># OC</th>
                            <th>Fecha</th>
                            <th>Art.</th>
                            <th>Cant.</th>
                            <th>Precio U.</th>
                            <th>Subtotal</th>
                            <th>Total</th>
                            <th>IVA</th>
                            <th>Pago</th>
                            <th>Banco</th>
                            <th>Estatus</th>
                            <th>Venc.</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($data['ordenes'] as $orden)
                            <tr>
                                <td class="font-bold">{{ $orden['numero_oc'] }}</td>
                                <td>{{ $orden['fecha'] }}</td>
                                <td>{{ $orden['articulo'] }}</td>
                                <td>{{ $orden['cantidad'] }}</td>
                                <td class="amount">${{ number_format($orden['precio'], 2) }}</td>
                                <td class="amount">${{ number_format($orden['subtotal'], 2) }}</td>
                                <td class="amount font-bold">${{ number_format($orden['total'], 2) }}</td>
                                <td>{{ $orden['impuesto'] }}%</td>
                                <td>
                                    @if($orden['metodo_pago'] === 'Transferencia bancaria')
                                        Transferencia
                                    @elseif($orden['metodo_pago'] === 'Tarjeta de crédito/débito')
                                        Tarjeta
                                    @else
                                        {{ $orden['metodo_pago'] ?? '-' }}
                                    @endif
                                </td>
                                <td>{{ $orden['banco'] }}</td>
                                <td><span class="badge {{ strtolower($orden['estatus']) }}">{{ $orden['estatus'] }}</span></td>
                                <td>{{ $orden['fecha_vencimiento'] }}</td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            @else
                <div class="empty-state">
                    No hay órdenes de compra en este período.
                </div>
            @endif
        </div>
    </div>

    <div class="section resumen">
        <h2>📊 Resumen General</h2>

        <div class="summary-section">
            <div class="summary-title">Estado de Órdenes de Compra</div>
            <ul class="summary-list">
                <li>
                    <span class="summary-label">Pagadas:</span>
                    <span class="summary-value success">${{ number_format($data['resumen']['pagadas'], 2) }} MXN</span>
                </li>
                <li>
                    <span class="summary-label">Pendientes:</span>
                    <span class="summary-value danger">${{ number_format($data['resumen']['pendientes'], 2) }} MXN</span>
                </li>
                <li>
                    <span class="summary-label">Vencidas:</span>
                    <span class="summary-value danger">${{ number_format($data['resumen']['vencidas'], 2) }} MXN</span>
                </li>
                <li>
                    <span class="summary-label">Canceladas:</span>
                    <span class="summary-value warning">${{ number_format($data['resumen']['canceladas'], 2) }} MXN</span>
                </li>
                <li>
                    <span class="summary-label">Total de Órdenes:</span>
                    <span class="summary-value total">${{ number_format($data['resumen']['total'], 2) }} MXN</span>
                </li>
            </ul>

            <div class="summary-highlight">
                <div>Total por Pagar (Pendientes + Vencidas)</div>
                <div class="summary-highlight-amount">${{ number_format($data['resumen']['por_pagar'], 2) }} MXN</div>
            </div>
        </div>
    </div>
</body>
</html>
