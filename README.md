# Sistema de Gestión para Club Deportivo

**URL:** https://deportes.arcanix.com.mx/  
**Credenciales demo:**

- Correo: `deportes@arcanix.com.mx`
- Contraseña: `arcanix`

> Aplicación multiusuario con roles y permisos. Es **instalable** como PWA (app de escritorio y móvil) y se comporta como aplicación nativa cuando se “agrega a la pantalla de inicio” o se instala en el navegador.

---

## Tabla de contenido

- [Resumen](#resumen)
- [Tecnologías](#tecnologías)
- [Dominio y reglas de negocio](#dominio-y-reglas-de-negocio)
  - [Temporadas](#temporadas)
  - [Categorías](#categorías)
  - [Conceptos de cobro y costos](#conceptos-de-cobro-y-costos)
  - [Deudas de jugadores](#deudas-de-jugadores)
  - [Pagos y abonos](#pagos-y-abonos)
  - [Bancos y movimientos](#bancos-y-movimientos)
  - [Proveedores, compras y almacén](#proveedores-compras-y-almacén)
  - [Partidos y calendario](#partidos-y-calendario)
- [Módulos principales](#módulos-principales)
- [Consultas/agrupamientos relevantes (backend)](#consultasagrupamientos-relevantes-backend)
- [Semillas (seeders)](#semillas-seeders)
- [Front‑end (comportamientos clave)](#front-end-comportamientos-clave)
- [Reportes](#reportes)
- [Instalación rápida (guía genérica)](#instalación-rápida-guía-genérica)
- [Notas y buenas prácticas](#notas-y-buenas-prácticas)

---

## Resumen

Sistema integral para la administración de un club deportivo:

- Registro de jugadores, **utilería/asignación de equipo** (con PDF firmado).
- **Temporadas** (inicio/fin, estatus: _Activa_ o _Finalizada_).
- **Categorías** por rango de edad y género.
- **Tipos de cobro** (dinámicos) con **periodicidad** (Diario, Semanal, Quincenal, Mensual, Bimestral, Trimestral, Cuatrimestral, Semestral, Anual, Temporada).
- **Costos por categoría** (dinámicos, independientes, con control de cambios).
- **Gestión de partidos** y **calendario**.
- **Gestión de pagos**: creación automática de **deudas** por jugador según periodicidad y temporada; **abonos** parciales; **pagos** y conciliación bancaria.
- **Historial** completo de deudas, abonos y pagos de temporadas anteriores.
- **Proveedores, órdenes de compra y compras**, con **estado de cuenta** en PDF.
- **Artículos y almacén** (entradas/salidas), inventario y utilería asignada.
- **Gastos** y **bancos** con **movimientos** (ingresos/egresos), saldo inicial y actual; estados de cuenta (PDF).
- Exportaciones a **Excel**: movimientos bancarios, órdenes de compra, compras, gastos, almacén, equipo asignado, deudas, abonos y pagos.

---

## Tecnologías

- **Backend:** Laravel (PHP) + MariaDB/MySQL.
- **Frontend:** React, Tailwind CSS, TanStack Query, `react-big-calendar`, `dayjs`, `react-select`/`react-select/async`.
- **Autenticación/Autorización:** Roles y permisos por usuario.
- **Instalable:** PWA (instalación como app en escritorio/móvil).

---

## Dominio y reglas de negocio

### Temporadas

- Campos: `nombre`, `fecha_inicio`, `fecha_fin`, `estatus` (_Activa_ | _Finalizada_).
- La **temporada Activa** determina qué deudas/pagos/abonos se muestran en los módulos “operativos”.
- El **historial** incluye temporadas _Finalizadas_ (y puede mostrar todas si se requiere).

### Categorías

- Se parametrizan por **rango de edad** y **género**.
- Cada jugador pertenece a **una categoría** dentro de una temporada.

### Conceptos de cobro y costos

- **Conceptos de cobro** (ej. Inscripción, Uniforme, Entrenamiento, Viaje) definen la **periodicidad**.
- **Costos por categoría** unen _Categoría_ + _Concepto_ con un `monto_base` independiente y versionable.
- Restricciones únicas (ej.: `unique` por `categoria_id` + `concepto_cobro_id`).

### Deudas de jugadores

- Se generan **automáticamente al crear un jugador** según la **periodicidad** de cada costo de su categoría, **desde el día de alta** hasta el **fin de temporada**.
- **Regla de fechas:**
  - `fecha_pago = fecha_alta + 1 semana` **(si cruza de mes, usar último día del mes)**.
  - `fecha_limite = fecha_pago + 1 semana`.
- **No** se generan deudas retroactivas si el jugador entra a mitad de temporada.
- **Único por periodo:** `unique(jugador_id, costo_categoria_id, fecha_pago)`.
- Estados: `Pendiente | Parcial | Pagado | Cancelado`.
- Listados operativos: se muestran **solo las deudas** de la temporada _Activa_ con `estatus != Pagado`.  
  El **historial** agrupa y ordena por temporada (típicamente por `t.fecha_inicio desc`, jugador y fecha de pago).

### Pagos y abonos

- **PagoJugador** liquida una deuda (`Pagado`), y puede estar acompañado de **Abonos** (cuando hubo pagos parciales previos).
- **AbonoDeudaJugador** registra pagos parciales y se refleja en el `saldo_restante` y `estatus = Parcial`.
- Eliminación de pagos en temporadas **Finalizadas** limpia relaciones (abonos relacionados y sus movimientos bancarios) y borra el ticket de pago.
- En temporadas **Activas**, los pagos **no se eliminan** (regla de seguridad/contabilidad).

### Bancos y movimientos

- **MovimientoBancario** (`Ingreso`/`Egreso`) con **morphMany** (`origen_type`, `origen_id`) para vincularse con pagos, abonos, gastos y compras.
- **BancoService** centraliza la creación/reversión de movimientos.
  - `registrarIngreso/registrarEgreso()` graban el movimiento (fecha, método, referencia) y permiten enlazar el origen.
  - `revertirMovimiento()` elimina el movimiento asociado.
- Seed de **saldo inicial** por banco mediante `MovimientoBancario`.

### Proveedores, compras y almacén

- **Órdenes de compra** y **Compras** (pagadas) con vínculo a bancos/movimientos.
- **Estado de cuenta del proveedor** en PDF (rango de fechas, totales por estatus).
- **Artículos** y **Almacén** con entradas/salidas y **utilería** asignada a jugadores (PDF de entrega, costo por pérdida, firma).

### Partidos y calendario

- Módulo de **partidos** (vinculados a categoría) y **calendario** para visualizarlos.
- **Calendario de pagos** (deudas): cada **evento** representa “un jugador en una fecha”, y al abrir se listan **todas sus deudas** de ese día (con estatus y abonos).

---

## Módulos principales

- **Jugadores** (alta/edición con documentos e imágenes).
- **Utilería** (asignación y PDF).
- **Temporadas / Categorías**.
- **Tipos de cobros** y **Costos por categoría**.
- **Deudas, Abonos, Pagos**, con **Historial** por temporadas finalizadas o **todas**.
- **Caja** (quién cobró).
- **Proveedores, Órdenes de compra, Compras** y **Estado de cuenta** (PDF).
- **Artículos y Almacén** (inventario, entradas/salidas).
- **Gastos**.
- **Bancos y Movimientos** (saldo inicial/actual, estado de cuenta PDF).
- **Reportes** en Excel (bancos, órdenes, compras, gastos, almacén, equipo, deudas, abonos, pagos).

---

## Reportes

- **Excel:** movimientos bancarios, órdenes de compra, compras, gastos, almacén, equipo asignado, deudas, abonos, pagos.
- **PDF:** Utilería (entrega de equipo), Estado de cuenta de **Bancos**, Estado de cuenta de **Proveedores**.
