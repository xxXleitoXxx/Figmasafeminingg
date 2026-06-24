# **Referencia de Pantallas (UI)**

Catálogo canónico alineado al prototipo Figma/React — 2.0 — Junio 2026. Los códigos COORD-xx reutilizan la misma UI que CEMP-xx donde se indica en la tabla de equivalencias.

## **Equivalencias y reutilización de UI**

**COORD-02 · CEMP-05 — Programs List**
Rutas: company: /company/programs | coordinator: /coordinator/programs

**COORD-03 · CEMP-14 — Exam Management**
Rutas: company: /company/exams | coordinator: /coordinator/exams

**COORD-04 · CEMP-15 — Create/Edit Exam**
Rutas: company: /company/exams/new | /company/exams/:id | coordinator: /coordinator/exams/new | /coordinator/exams/:id

**COORD-05 · CEMP-07 — Assign Program**
Rutas: company: /company/programs/:id/assign | coordinator: /coordinator/programs/:id/assign

**COORD-06 · CEMP-08 — Employee Progress (por programa)**
Rutas: company: /company/programs/:id/progress | coordinator: /coordinator/programs/:id/progress

**COORD-07 · CEMP-09 — Company/Coordinator Reports**
Rutas: company: /company/reports | coordinator: /coordinator/reports

**COORD-08 · CEMP-06 — Create/Edit Program (Asistente 4 pasos)**
Rutas: company: /company/programs/new | /company/programs/:id | coordinator: /coordinator/programs/new | /coordinator/programs/:id

**ADMIN-09 · CEMP-11 · COORD-11 · EMP-07 — Simulation View/Detail (Solo lectura)**
Rutas: admin: /admin/simulations/:id | /admin/simulations/:id/view | company: /company/simulations/:id | /company/simulations/:id/view | coordinator: /coordinator/simulations/:id | /coordinator/simulations/:id/view | employee: /employee/simulations/:id | /employee/simulations/:id/view

**CEMP-10 · COORD-10 — Simulations Catalog (Solo lectura)**
Rutas: company: /company/simulations | coordinator: /coordinator/simulations
_Admin Empresa y Coordinador ven el mismo catálogo que ADMIN-07, pero en modo solo lectura (sin alta/edición/baja)._

**ADMIN-14 · CEMP-12 — Audit Trail (componente compartido)**
Rutas: admin: /admin/audit (vista global completa) | company: /company/audit (restringida a registros de la propia empresa por aislamiento multiempresa)

**CEMP-13 · COORD-12 · EMP-08 — Help Center**
Rutas: company: /company/help | coordinator: /coordinator/help | employee: /employee/help
_Componente compartido; FAQs y manual se filtran según el rol del usuario autenticado._

**EMP-06 — My Profile**
Rutas: company: /company/profile | coordinator: /coordinator/profile | employee: /employee/profile
_Componente compartido (SharedProfile / MyProfile); mismo código EMP-06 para todos los roles._

## **AUTH**

**AUTH-01: Login —** /login — Email/contraseña, selector de rol (modo prototipo), mostrar/ocultar contraseña, botón Iniciar sesión, enlace Olvidé mi contraseña.

**AUTH-02: Forgot Password —** /forgot-password — Campo email, botón enviar enlace de restablecimiento, estado de éxito con ícono de check verde.

**AUTH-03: Reset Password —** /reset-password — Nueva contraseña y confirmación; requerido por T1-RF02.

**AUTH-04: Role Selection —** /role-selection — Pantalla post-login para usuarios con múltiples roles asignados. Grid de tarjetas por rol disponible (Administrador del Sistema, Administrador de Empresa, Coordinador, Empleado/Pasante) con ícono y descripción; la selección redirige al dashboard del rol elegido. Enlace Cerrar sesión en pie de pantalla.

## **ADMIN**

**ADMIN-01: System Dashboard —** /admin — KPIs (empresas activas, sesiones VR totales, usuarios activos, programas en progreso); gráfico de línea de ejecuciones últimos 30 días; gráfico de barras de sesiones por empresa; tabla de simulaciones más ejecutadas; feed de actividad reciente.

**ADMIN-02: Companies List —** /admin/companies — Búsqueda por texto, filtro por estado (activa/inactiva), tabla con razón social/CUIT/email/estado/nro. admins/fecha alta; acciones ver detalle/editar/toggle estado; paginación.

**ADMIN-03: Create Company —** /admin/companies/new — Formulario de alta de nueva empresa: razón social, nombre comercial, CUIT, email de contacto, toggle estado activo; sección de administradores asignados con agregar/quitar; panel resumen lateral.

**ADMIN-04: Company Detail/Edit —** /admin/companies/:id — Vista y edición de empresa existente con los mismos campos que ADMIN-03; sección de administradores asignados con agregar/quitar; panel resumen lateral con estadísticas de la empresa.

**ADMIN-05: Company Administrators List —** /admin/users — Tabla de Administradores de Empresa: nombre/email/empresa/estado/fecha alta; búsqueda por texto, filtro por estado; acciones editar (abre drawer) y toggle estado; botón Nueva Admin.

**ADMIN-06: Create/Edit Company Administrator —** (drawer en ADMIN-05) — Drawer de 480px: nombre, apellido, email, empresa (dropdown), toggle estado; se abre desde botón Nueva Admin o ícono lápiz en la tabla.

**ADMIN-07: VR Simulations Catalog —** /admin/simulations — Búsqueda por texto, filtros categoría/dificultad/estado; grid de tarjetas con miniatura/nombre/categoría/dificultad/duración/versión/estado; menú de tres puntos por tarjeta (editar/gestionar métricas/desactivar). Solo el Administrador del Sistema puede crear, editar y desactivar simulaciones.

**ADMIN-08: Create/Edit Simulation —** /admin/simulations/new | /admin/simulations/:id/edit — Formulario: nombre, descripción, categoría, dificultad, duración, versión, Unity Scene ID, Asset Bundle URL, estado; tabla de Métricas de Evaluación (nombre/descripción/peso/umbral) con validación en tiempo real de que la suma de pesos sea 100%.

**ADMIN-09: Simulation View/Detail —** /admin/simulations/:id | /admin/simulations/:id/view — Vista de solo lectura de una simulación: imagen de portada, información básica (categoría, dificultad, duración, versión), métricas de evaluación con pesos y umbrales; panel de Visibilidad en Empresas (solo visible para el Administrador del Sistema); botón Editar Simulación disponible únicamente para el Administrador del Sistema.

**ADMIN-10: Global Roles —** /admin/roles — Pestañas Roles Base / Roles Adicionales; permisos expandibles por módulo con checkboxes de habilitación.

**ADMIN-11: Global Reports —** /admin/reports — Filtros rango de fechas/empresa/categoría; KPIs de resumen; gráfico de área de tendencia temporal; tabla de rendimiento por empresa; exportar CSV/PDF.

**ADMIN-12: Configuration —** /admin/config — Pestañas: General (nombre de la plataforma, entidad emisora de certificados, logo, email de contacto) / Seguridad (duración JWT web en horas, duración JWT VR en horas, intentos de login antes de bloqueo, duración del bloqueo en minutos) / Plantilla de Certificado (texto introductorio, campos visibles en el certificado, firma digital, pie de página, modal de vista previa); secciones adicionales: Notificaciones (toggle por tipo de evento: asignación, aprobación, rechazo, vencimiento, certificado emitido; días de anticipación de alerta) y Defaults de Evaluación (umbral de aprobación por defecto).

**ADMIN-13: Help Management —** /admin/help — Gestión del contenido del Centro de Ayuda. Pestañas: Preguntas Frecuentes (tabla con columnas pregunta/roles destino/estado; acciones editar y dar de baja; dialog Nueva/Editar Pregunta con campos texto de pregunta, texto de respuesta, selector múltiple de roles destino y toggle estado activo) / Configuración del Manual (campo URL por cada rol —Administrador del Sistema, Administrador de Empresa, Coordinador, Empleado— con descripción; botón Guardar Cambios).

**ADMIN-14: Audit Trail —** /admin/audit — Historial completo de eventos críticos del sistema. Sección de filtros: tipo de evento (ALTA / MODIFICACION / BAJA_LOGICA / ASIGNACION / REVOCACION / CLONACION / VERSIONADO / BLOQUEO / DESBLOQUEO / CIERRE), entidad afectada (Usuario / Rol / Permiso / Empresa / Simulación VR / Programa / Examen / Pregunta / Configuración / Sesión / Cuenta), empresa, usuario responsable, rango de fechas desde/hasta; buscador libre por ID, nombre de entidad, usuario afectado o detalle del evento. Tabla de registros: ID/fecha+hora/tipo de evento con badge de severidad (Informativo, Control, Crítico), entidad afectada/nombre/usuario afectado, empresa, responsable, columna "Cambio Registrado" con descripción genérica del tipo de evento y sub-grid atributo/valor anterior/valor nuevo. Botón Exportar CSV con los registros del filtro activo.

## **CEMP**

**CEMP-01: Company Dashboard —** /company — KPIs (usuarios activos, programas activos, tasa de completitud, certificados emitidos); gráfico de barras de completitud por programa; barras horizontales de tasa de fallo; tabla de asignaciones recientes; widget de acciones pendientes.

**CEMP-02: Users List —** /company/users — Pestañas Todos / Coordinadores / Empleados; selección masiva con checkbox; tabla con avatar/nombre/email/rol/estado/fecha de registro/última actividad; acciones editar (abre drawer CEMP-03) y toggle estado.

**CEMP-03: Create/Edit User —** (drawer en CEMP-02) — Drawer: nombre, apellido, email, dropdown de rol (Coordinador/Empleado), toggle estado activo; nota sobre envío automático de email de bienvenida.

**CEMP-04: Company Roles —** /company/roles — Roles estándar de la plataforma (solo lectura, descripción de permisos incluida) y roles personalizados de la empresa (editables); botón Nuevo Rol Personalizado abre modal con nombre, descripción y checkboxes de permisos agrupados por módulo.

**CEMP-05: Programs List —** /company/programs — Filtro por estado (borrador/activo/cerrado); tarjetas de programa con nombre/badge de estado/coordinador asignado/nro. simulaciones y exámenes/inscritos/barra de completitud; acciones editar/asignar/ver progreso/cerrar/clonar.

**CEMP-06: Create/Edit Program —** /company/programs/new | /company/programs/:id — Asistente de 4 pasos con stepper superior que indica el paso activo.

- **CEMP-06.1: Basic Info** — Nombre del programa, descripción, fecha de inicio y fecha de vencimiento.

- **CEMP-06.2: Content** — Agregar simulaciones VR y exámenes al programa (selección desde catálogo disponible); configurar máximo de intentos por ítem; reordenar ítems del programa mediante drag & drop (ícono de agarre).

- **CEMP-06.3: Settings** — Asignar coordinador responsable del programa (dropdown); configurar notificaciones del programa (toggles: asignación, aprobación, rechazo, vencimiento, certificado emitido).

- **CEMP-06.4: Review** — Resumen completo del programa (datos básicos, lista de contenidos, configuración de notificaciones); botones Guardar como Borrador o Activar Programa.

**CEMP-07: Assign Program —** /company/programs/:id/assign — Pestañas Individual / Masivo; selección de empleados con checkboxes; badges visuales en empleados ya asignados; panel resumen lateral con los seleccionados; modal de confirmación antes de asignar.

**CEMP-08: Employee Progress —** /company/programs/:id/progress — Tabla: empleado/estado/barra de progreso/nro. sesiones VR/nro. exámenes/última actividad/estado certificado; filas expandibles con detalle de avance por ítem del programa; botón descarga de certificado PDF.

**CEMP-09: Company Reports —** /company/reports — Pestañas Por Empleado / Por Programa / Por Simulación; estadísticas de resumen en KPIs; gráfico de tendencia; tabla de datos por la dimensión activa; exportar CSV/PDF.

**CEMP-10: Simulations Catalog (solo lectura) —** /company/simulations — Misma UI que ADMIN-07; el Admin Empresa puede buscar y filtrar el catálogo pero no puede crear, editar ni desactivar simulaciones (acciones de gestión ocultas).

**CEMP-11: Simulation View/Detail —** /company/simulations/:id | /company/simulations/:id/view — Misma UI que ADMIN-09; sin panel de Visibilidad en Empresas ni botón Editar Simulación.

**CEMP-12: Audit Trail —** /company/audit — Misma UI que ADMIN-14, restringida automáticamente a los registros de la propia empresa por aislamiento multiempresa; el filtro de empresa está fijo y deshabilitado; el subtítulo de la pantalla indica el alcance de la consulta.

**CEMP-13: Help Center —** /company/help — Misma UI que EMP-08; buscador de preguntas frecuentes; FAQs filtradas para el rol Admin Empresa en acordeones expandibles; sección Manual de Usuario con vista previa y botón Ver Manual (abre URL externa configurada para el rol).

## **COORD**

**COORD-01: Coordinator Dashboard —** /coordinator — KPIs (mis programas, total empleados a cargo, completitud promedio, certificados emitidos); lista de programas del coordinador con estado y barra de completitud; widget de empleados que requieren atención (bajo progreso o próximos vencimientos).

**COORD-02: My Programs —** /coordinator/programs — Misma UI que CEMP-05; alcance limitado a los programas asignados al coordinador autenticado.

**COORD-03: Exam Management —** /coordinator/exams — Pestañas Exámenes / Banco de Preguntas; tabla de exámenes (nombre/nro. preguntas/intentos permitidos/programas donde se usa/estado); tabla de banco de preguntas; drawer Nueva Pregunta (texto de la pregunta, 2 a 5 opciones con botón agregar/eliminar, radio para marcar respuesta correcta, categoría de la pregunta).

**COORD-04: Create/Edit Exam —** (desde COORD-03) — Nombre del examen, descripción, selección de preguntas desde el banco con posibilidad de reordenar; toggle orden fijo / aleatorio de preguntas.

**COORD-05: Assign Program —** /coordinator/programs/:id/assign — Misma UI que CEMP-07.

**COORD-06: Employee Progress (por programa) —** /coordinator/programs/:id/progress — Misma UI que CEMP-08; alcance limitado a los empleados del coordinador en el programa seleccionado.

**COORD-07: Reports —** /coordinator/reports — Misma UI que CEMP-09; datos acotados a la cartera de empleados y programas del coordinador autenticado.

**COORD-08: Create/Edit Program —** /coordinator/programs/new | /coordinator/programs/:id — Misma UI que CEMP-06; asistente de 4 pasos.

- **COORD-08.1: Basic Info** — (igual que CEMP-06.1)

- **COORD-08.2: Content** — (igual que CEMP-06.2)

- **COORD-08.3: Settings** — (igual que CEMP-06.3)

- **COORD-08.4: Review** — (igual que CEMP-06.4)

**COORD-09: My Employees —** /coordinator/employees — Misma UI que CEMP-08; vista global de todos los empleados de la cartera del coordinador sin estar acotada a un programa específico; permite ver el progreso general de cada empleado.

**COORD-10: Simulations Catalog (solo lectura) —** /coordinator/simulations — Misma UI que CEMP-10 y ADMIN-07; el Coordinador puede consultar el catálogo sin acciones de gestión.

**COORD-11: Simulation View/Detail —** /coordinator/simulations/:id | /coordinator/simulations/:id/view — Misma UI que ADMIN-09; sin panel de Visibilidad en Empresas ni botón Editar Simulación.

**COORD-12: Help Center —** /coordinator/help — Misma UI que EMP-08; FAQs filtradas para el rol Coordinador y enlace al manual de usuario del rol correspondiente.

## **EMP**

**EMP-01: Dashboard / My Training —** /employee — Saludo personalizado al usuario; tarjetas de programas asignados con nombre/badge de estado/barra de progreso/cuenta regresiva de plazo de vencimiento; estadísticas rápidas (programas completados, pendientes, certificados obtenidos).

**EMP-02: Program Detail —** /employee/programs/:id — Encabezado con nombre del programa/descripción/badge de estado/fechas/coordinador asignado; gráfico donut de progreso general; lista de contenidos del programa con ícono de tipo (VR/Examen)/nombre/estado/intentos realizados/mejor puntaje/botones de acción (Iniciar VR / Tomar Examen / bloqueado según requisitos); panel de certificado al pie (disponible al completar).

**EMP-03: Exam Interface —** /employee/exam/:id — Pantalla completa fuera del AppShell; barra superior con nombre del examen/temporizador/contador de preguntas (actual/total)/barra de progreso; tarjeta central con texto de la pregunta y opciones de respuesta; navegación Anterior / Siguiente / Enviar; validación de respuesta antes de avanzar.

**EMP-04: Exam Results —** /employee/exam/:id/results — Pantalla completa fuera del AppShell; círculo de puntaje con color (verde = aprobado, rojo = reprobado); estado APROBADO / NO APROBADO en destacado; intentos restantes; desglose de respuestas por pregunta; botones Volver al Programa / Reintentar Examen.

**EMP-05: My Certificates —** /employee/certificates — Grid de tarjetas de certificados con nombre del programa/empresa/fecha de emisión; botón Descargar PDF y botón Compartir por tarjeta.

**EMP-06: My Profile —** /employee/profile (y /company/profile, /coordinator/profile) — Dos columnas: izquierda (avatar, nombre, apellido, email en solo lectura, empresa en solo lectura, badge de rol activo); derecha (formulario de cambio de contraseña: contraseña actual/nueva/confirmación; sección de actividad de la cuenta).

**EMP-07: Simulation View/Detail —** /employee/simulations/:id | /employee/simulations/:id/view — Misma UI que ADMIN-09; vista de solo lectura de una simulación accesible desde el detalle de un programa; sin panel de Visibilidad en Empresas ni botón de edición; el breadcrumb regresa al programa de origen.

**EMP-08: Help Center —** /employee/help | /company/help | /coordinator/help — Buscador de texto sobre preguntas frecuentes; sección Preguntas Frecuentes con acordeones expandibles (contenido filtrado automáticamente según el rol del usuario autenticado); sección Manual de Usuario con vista previa de portada del PDF y botón Ver Manual (abre en nueva pestaña la URL configurada para el rol en ADMIN-13).

---

## SCREENS (from the Figma/React project)

AUTH:

- AUTH-01: Login — email/contraseña, selector de rol (prototipo), mostrar/ocultar contraseña, botón iniciar sesión, enlace olvidé mi contraseña
- AUTH-02: Forgot Password — campo email, botón enviar enlace de restablecimiento, estado de éxito con check verde
- AUTH-03: Reset Password — campos nueva contraseña y confirmación
- AUTH-04: Role Selection — tarjetas de rol disponible (Administrador del Sistema, Administrador de Empresa, Coordinador, Empleado/Pasante) con ícono y descripción; redirige al dashboard del rol seleccionado; enlace cerrar sesión

ADMIN (System Administrator):

- ADMIN-01: System Dashboard — KPI cards (Empresas Activas, Sesiones VR Totales, Usuarios Activos, Programas en Progreso), gráfico de línea ejecuciones 30 días, gráfico de barras por empresa, tabla de simulaciones más ejecutadas, feed de actividad reciente
- ADMIN-02: Companies List — búsqueda, filtro por estado, tabla con razón social/CUIT/email/estado/admins/fecha, acciones (ver/editar/toggle estado), paginación
- ADMIN-03: Create Company — formulario alta (Razón Social, Nombre Comercial, CUIT, Email, toggle activo), sección admins asignados agregar/quitar, panel resumen lateral
- ADMIN-04: Company Detail/Edit — mismos campos que ADMIN-03 en modo edición para empresa existente, sección admins asignados, panel resumen lateral con estadísticas
- ADMIN-05: Company Administrators List — tabla nombre/email/empresa/estado/fecha, búsqueda, filtro, acciones (editar/toggle); botón Nueva Admin
- ADMIN-06: Create/Edit Company Administrator — drawer 480px: Nombre, Apellido, Email, dropdown Empresa, toggle Estado; desde botón Nueva Admin o ícono lápiz
- ADMIN-07: VR Simulations Catalog — búsqueda, filtros categoría/dificultad/estado, grid tarjetas (miniatura/nombre/categoría/dificultad/duración/versión/estado), menú tres puntos (editar/gestionar métricas/desactivar)
- ADMIN-08: Create/Edit Simulation — formulario: Nombre, Descripción, Categoría, Dificultad, Duración, Versión, Unity Scene ID, Asset Bundle URL, Estado; tabla Métricas de Evaluación (nombre/descripción/peso/umbral), validación suma pesos 100%
- ADMIN-09: Simulation View/Detail — solo lectura: imagen de portada, info básica (categoría/dificultad/duración/versión), métricas de evaluación, panel Visibilidad en Empresas (solo admin sistema); botón Editar solo para admin sistema
- ADMIN-10: Global Roles — pestañas Roles Base / Roles Adicionales, checkboxes de permisos expandibles por módulo
- ADMIN-11: Global Reports — filtros rango de fechas/empresa/categoría, KPIs resumen, gráfico área, tabla rendimiento por empresa, exportar CSV/PDF
- ADMIN-12: Configuration — pestañas General (nombre plataforma, entidad emisora, logo, email contacto) / Seguridad (JWT web horas, JWT VR horas, intentos login, duración bloqueo) / Plantilla Certificado (texto introductorio, campos visibles, firma digital, pie de página, modal preview); secciones Notificaciones y Defaults Evaluación
- ADMIN-13: Help Management — pestaña Preguntas Frecuentes (tabla pregunta/roles destino/estado, acciones editar/dar de baja; dialog crear/editar pregunta con texto, respuesta, roles destino multiselect, toggle activo) / pestaña Configuración del Manual (campos URL del manual por rol, botón Guardar Cambios)
- ADMIN-14: Audit Trail — filtros: tipo evento, entidad afectada, empresa, usuario responsable, fechas desde/hasta; buscador libre; tabla ID/fecha/tipo evento/badge severidad/entidad/empresa/responsable/cambio registrado con sub-grid atributo-valor anterior-valor nuevo; botón Exportar CSV

COMPANY (Company Administrator):

- CEMP-01: Company Dashboard — KPIs (Usuarios Activos, Programas Activos, Tasa Completitud, Certificados), gráfico barras completitud por programa, barras horizontales tasa de fallo, tabla asignaciones recientes, widget acciones pendientes
- CEMP-02: Users List — pestañas Todos/Coordinadores/Empleados, selección masiva, tabla avatar/nombre/email/rol/estado/fecha registro/última actividad, acciones (editar/toggle)
- CEMP-03: Create/Edit User — drawer: Nombre, Apellido, Email, dropdown Rol, toggle Estado, nota email bienvenida
- CEMP-04: Company Roles — roles estándar (solo lectura) y personalizados (editables), modal Nuevo Rol Personalizado con nombre/descripción/checkboxes permisos por módulo
- CEMP-05: Programs List — filtro por estado, tarjetas programa con nombre/estado/coordinador/sims+exámenes/inscritos/completitud/acciones (editar/asignar/progreso/cerrar/clonar)
- CEMP-06: Create/Edit Program — asistente 4 pasos: 1.Basic Info (nombre, descripción, fechas) → 2.Content (agregar sims/exámenes, intentos, drag para reordenar) → 3.Settings (coordinador, notificaciones) → 4.Review (resumen, guardar borrador o activar)
  - CEMP-06.1: Basic Info
  - CEMP-06.2: Content
  - CEMP-06.3: Settings
  - CEMP-06.4: Review
- CEMP-07: Assign Program — pestañas Individual/Masivo, selección empleados con checkboxes, badges ya-asignado, panel resumen lateral, modal confirmación
- CEMP-08: Employee Progress — tabla empleado/estado/barra progreso/sesiones VR/exámenes/última actividad/certificado, filas expandibles con detalle por ítem, descarga certificado PDF
- CEMP-09: Company Reports — pestañas Por Empleado/Por Programa/Por Simulación, KPIs resumen, gráfico tendencia, exportar CSV/PDF
- CEMP-10: Simulations Catalog (solo lectura) — misma UI que ADMIN-07 sin acciones de gestión (no crea/edita/desactiva)
- CEMP-11: Simulation View/Detail — misma UI que ADMIN-09 sin panel Visibilidad en Empresas ni botón Editar
- CEMP-12: Audit Trail — misma UI que ADMIN-14, restringida automáticamente a registros de la empresa del admin; filtro empresa fijo y deshabilitado
- CEMP-13: Help Center — misma UI que EMP-08; FAQs y manual filtrados para rol Admin Empresa
- CEMP-14: Exam Management — misma UI que COORD-03; pestañas Exámenes/Banco de Preguntas, tabla exámenes y tabla banco de preguntas, drawer Nueva Pregunta
- CEMP-15: Create/Edit Exam — misma UI que COORD-04; selección de preguntas desde el banco, configuración de orden y detalles del examen

COORDINATOR:

- COORD-01: Dashboard — KPIs (Mis Programas, Total Empleados, Completitud Promedio, Certificados), lista programas con estado/completitud, widget empleados que requieren atención
- COORD-02: My Programs — misma UI que CEMP-05, alcance programas del coordinador
- COORD-03: Exam Management — pestañas Exámenes/Banco de Preguntas, tabla exámenes (nombre/preguntas/intentos/usado en/estado), tabla banco de preguntas, drawer Nueva Pregunta (texto, 2-5 opciones, radio respuesta correcta, categoría)
- COORD-04: Create/Edit Exam — nombre, descripción, selección preguntas desde banco, reordenable, toggle orden fijo/aleatorio
- COORD-05: Assign Program — misma UI que CEMP-07
- COORD-06: Employee Progress (por programa) — misma UI que CEMP-08, alcance programas del coordinador
- COORD-07: Reports — misma UI que CEMP-09, datos acotados a cartera del coordinador
- COORD-08: Create/Edit Program — misma UI que CEMP-06; asistente 4 pasos
  - COORD-08.1: Basic Info
  - COORD-08.2: Content
  - COORD-08.3: Settings
  - COORD-08.4: Review
- COORD-09: My Employees — misma UI que CEMP-08; vista global de todos los empleados del coordinador sin acotarse a un programa específico
- COORD-10: Simulations Catalog (solo lectura) — misma UI que CEMP-10 sin acciones de gestión
- COORD-11: Simulation View/Detail — misma UI que ADMIN-09 sin panel Visibilidad en Empresas ni botón Editar
- COORD-12: Help Center — misma UI que EMP-08; FAQs y manual filtrados para rol Coordinador

EMPLOYEE:

- EMP-01: Dashboard/My Training — saludo personalizado, tarjetas programa con nombre/estado/progreso/cuenta regresiva plazo, estadísticas rápidas (completados/pendientes/certificados)
- EMP-02: Program Detail — encabezado nombre/descripción/estado/fechas/coordinador, donut progreso, lista contenidos con ícono/nombre/estado/intentos/mejor puntaje/botones acción (Iniciar VR / Tomar Examen / bloqueado), panel certificado al pie
- EMP-03: Exam Interface — pantalla completa fuera AppShell; barra superior nombre examen/temporizador/contador preguntas/barra progreso; tarjeta pregunta con opciones; navegación Anterior/Siguiente/Enviar; validación respuesta
- EMP-04: Exam Results — pantalla completa fuera AppShell; círculo puntaje (verde/rojo); APROBADO/NO APROBADO; intentos restantes; desglose por pregunta; botones Volver al Programa / Reintentar Examen
- EMP-05: My Certificates — grid tarjetas con programa/empresa/fecha/Descargar PDF/Compartir
- EMP-06: My Profile — dos columnas: izquierda (avatar, nombre, apellido, email solo lectura, empresa solo lectura, badge rol); derecha (cambio contraseña: actual/nueva/confirmar; actividad de cuenta)
- EMP-07: Simulation View/Detail — misma UI que ADMIN-09 sin panel Visibilidad en Empresas ni botón Editar; breadcrumb regresa al programa de origen
- EMP-08: Help Center — buscador FAQs; acordeones expandibles con preguntas filtradas por rol; sección Manual de Usuario con vista previa PDF y botón Ver Manual (abre URL externa según rol configurado en ADMIN-13)