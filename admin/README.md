# Sistema de Gestión para Club Deportivo — Frontend

**URL:** https://deportes.arcanix.com.mx/  
**Credenciales demo:**

- Correo: `deportes@arcanix.com.mx`
- Contraseña: `arcanix`

> SPA multiusuario con roles y permisos. **Instalable como PWA** (escritorio y móvil) y se comporta como app nativa al instalarse desde el navegador.

---

## Tabla de contenido

- [Resumen](#resumen)
- [Tecnologías](#tecnologías)
- [Comportamientos clave](#comportamientos-clave)
- [Scripts](#scripts)
- [Instalación y uso](#instalación-y-uso)
- [Configuración](#configuración)
- [Notas y buenas prácticas](#notas-y-buenas-prácticas)
- [Licencia](#licencia)

---

## Resumen

Interfaz web para la administración de un club deportivo:

- Gestión de **jugadores** (alta/edición con documentos e imágenes).
- **Temporadas** y **categorías**.
- **Tipos de cobro** y **costos por categoría**.
- Operación de **deudas, abonos y pagos** (con vistas por temporada activa e historial).
- **Partidos** y **calendario** (incluye calendario de pagos/deudas).
- Módulos de **proveedores, compras, almacén, gastos, bancos**.
- Exportaciones y generación de PDFs (según endpoints del backend).
- **PWA**: instalación en escritorio/móvil, caché y experiencia tipo nativa (según configuración del proyecto).

---

## Tecnologías

- **React**
- **Tailwind CSS**
- **TanStack Query**
- **react-big-calendar**
- **dayjs**
- **react-select** / `react-select/async`
- **PWA** (service worker + manifest, según configuración del repo)

---

## Comportamientos clave

- **Roles y permisos**: renderizado condicional de rutas/acciones según permisos del usuario.
- **Temporada activa**:
  - Módulos “operativos” muestran información de la temporada activa.
  - El historial permite consultar temporadas finalizadas (o todas, según filtros).
- **Calendario de pagos/deudas**:
  - Cada evento representa “un jugador en una fecha”.
  - Al abrir el evento, se listan todas sus deudas de ese día (estatus y abonos).
- **UX de pagos**:
  - Abonos parciales reflejan saldo restante y estatus (`Parcial`).
  - Pagos liquidados se reflejan como `Pagado`.
- **PWA**:
  - Recomendada instalación para equipos de cobranza/operación que trabajan “tipo app”.

---

## Scripts

```bash
npm install
npm run dev
npm run build
npm run preview
```

---

## Instalación y uso

1. Instala dependencias:

```bash
npm install
```

2. Levanta en desarrollo:

```bash
npm run dev
```

3. Build de producción:

```bash
npm run build
```

4. Preview local del build:

```bash
npm run preview
```

---

## Configuración

> Los nombres exactos de variables dependen del proyecto; ajusta según tu `.env` / `.env.local`.

Recomendado:

- **URL base del API** (backend).
- Flags de entorno (modo demo, logs, etc.).
- Configuración de PWA (si aplica): nombre, íconos, scope, etc.

Ejemplo (orientativo):

```bash
# .env.local (ejemplo)
VITE_API_BASE_URL=http://localhost:8000
```

---

## Notas y buenas prácticas

- Mantén una sola “fuente de verdad” para:
  - Temporada activa (estado global o query cache).
  - Sesión/usuario/permisos (idealmente persistidos).
- En queries de TanStack Query:
  - Usa keys consistentes por temporada/filtros.
  - Invalida cache al guardar pagos/abonos/ediciones críticas.
- Calendarios:
  - Normaliza fechas con `dayjs` para evitar offsets por zona horaria.
- PWA:
  - Prueba “Add to Home Screen” en Android y la instalación en escritorio (Chrome/Edge).
  - Valida recursos estáticos y caching al hacer releases.

---

## Licencia

Este software puede ser licenciado por cliente con **código fuente completo**.  
El cliente es responsable del hosting, datos y uso del sistema.

Para más información o personalizaciones, contacta a: contacto@arcanix.com.mx

---

## Autor

Desarrollado por **Arcanix**.  
Soporte técnico o consultas: contacto@arcanix.com.mx — ARCANIX WEB: https://arcanix.com.mx/
