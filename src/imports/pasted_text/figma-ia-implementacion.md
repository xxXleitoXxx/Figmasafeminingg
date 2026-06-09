# Instrucciones de Implementación para IA de Figma (y Desarrollo)

Este documento detalla todos los cambios realizados en el proyecto de **Safe Mining** relacionados con la traducción de la interfaz al español (permisos de roles, estados y fechas) y la adición de filtros de fecha interactivos utilizando **Material-UI (MUI)**.

El objetivo es permitir que una IA de Figma (o un desarrollador) pueda replicar con precisión estas modificaciones en el diseño o en el código fuente.

---

## 📌 Resumen General de Cambios

1. **Traducción e Internacionalización**:
   - **Centralización**: Se crearon diccionarios de traducción en `src/app/components/shared/index.tsx` para evitar traducciones duplicadas o dispersas.
   - **Permisos de Roles**: Traducidos de identificadores internos (`view_users`, `create_users`, etc.) a texto legible en español.
   - **Estados del Sistema**: Traducidos de inglés a español (`active` -> `activo`, `in progress` -> `en progreso`, `failed` -> `reprobado`, etc.).
   - **Formato de Fechas**: Se cambió la configuración regional de `"en-US"` a `"es-ES"` para el formateo dinámico de fechas, y se tradujeron los meses en los datos estáticos (ej. "May" -> "Mayo").

2. **Filtros de Fecha con Material-UI (MUI)**:
   - Se agregaron campos de filtrado ("Fecha Desde" y "Fecha Hasta") utilizando el componente **`TextField`** de Material-UI configurado como `type="date"`.
   - Se implementó la lógica de estado de React (`startDate`, `endDate`) y lógica de filtrado de datos antes de renderizar los gráficos (Recharts) o tablas en todos los paneles y reportes.

---

## 🛠️ Detalle de Archivos Modificados y Cambios

### 1. `src/app/components/shared/index.tsx`
* **Cambios**:
  - Se agregaron los diccionarios de traducción `statusTranslations` y `permissionTranslations`.
  - Se actualizó el componente `StatusBadge` para que traduzca automáticamente el valor de entrada usando el diccionario y aplique estilos de color acordes en español.
* **Mapeo de Estados (`statusTranslations`)**:
  ```typescript
  export const statusTranslations: Record<string, string> = {
    active: "activo",
    inactive: "inactivo",
    pending: "pendiente",
    approved: "aprobado",
    rejected: "rechazado",
    draft: "borrador",
    closed: "cerrado",
    completed: "completado",
    failed: "reprobado",
    "in progress": "en progreso",
    "not started": "no iniciado",
    locked: "bloqueado",
    // ... mapeos reversos y soporte nativo en español
  };
  ```
* **Mapeo de Permisos (`permissionTranslations`)**:
  ```typescript
  export const permissionTranslations: Record<string, string> = {
    view_users: "Ver usuarios",
    create_users: "Crear usuarios",
    edit_users: "Editar usuarios",
    delete_users: "Eliminar usuarios",
    assign_roles: "Asignar roles",
    view_companies: "Ver empresas",
    create_companies: "Crear empresas",
    edit_companies: "Editar empresas",
    deactivate_companies: "Desactivar empresas",
    view_simulations: "Ver simulaciones",
    create_simulations: "Crear simulaciones",
    edit_simulations: "Editar simulaciones",
    manage_metrics: "Gestionar métricas",
    view_programs: "Ver programas",
    create_programs: "Crear programas",
    assign_programs: "Asignar programas",
    close_programs: "Cerrar programas",
    view_global_reports: "Ver reportes globales",
    view_company_reports: "Ver reportes de empresa",
    export_reports: "Exportar reportes",
    edit_configuration: "Editar configuración",
    manage_templates: "Gestionar plantillas",
    view_audit_log: "Ver registro de auditoría",
    create_user_employee: "Crear usuario empleado",
    view_reports: "Ver reportes",
    view_settings: "Ver ajustes",
  };
  ```

---

### 2. Módulos de Roles (Traducción de Permisos)
#### 📂 `src/app/components/admin/RolesScreen.tsx`
* **Cambios**: Importación de `permissionTranslations` y traducción de la visualización del permiso en el panel del administrador de sistemas:
  ```tsx
  <span className="text-xs" style={{ color: colors.textPrimary }}>
    {permissionTranslations[perm] ?? perm.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase())}
  </span>
  ```

#### 📂 `src/app/components/company/CompanyRoles.tsx`
* **Cambios**: Traducción de permisos al listarlos y al seleccionarlos en la interfaz del Administrador de la Empresa:
  ```tsx
  <span className="text-xs" style={{ color: colors.textPrimary }}>
    {permissionTranslations[p] ?? p.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase())}
  </span>
  ```

---

### 3. Formato y Traducción de Fechas
#### 📂 `src/app/components/admin/AdminUsersScreen.tsx`
* **Cambios**: Cambio de la visualización dinámica de la fecha de creación de usuarios a localización española:
  ```tsx
  // Antes: .toLocaleDateString("en-US", ...)
  // Ahora:
  new Date(u.createdAt).toLocaleDateString("es-ES", { year: "numeric", month: "short", day: "numeric" })
  ```

#### 📂 `src/app/components/company/ProgramsList.tsx`
* **Cambios**: Traducción manual de fechas estáticas en la lista de programas de entrenamiento para evitar el inglés:
  - Cambiado `"15 Mar, 2025"` a `"15 Mar, 2025"` y `"31 May, 2025"` a `"31 Mayo, 2025"`.
  - Cambiado `"20 May, 2025"` a `"20 Mayo, 2025"`.

---

### 4. Paneles y Reportes (Filtros de Fecha Funcionales y Material-UI)
Se modificaron **6 componentes principales** para incorporar el filtro de fecha mediante Material-UI y actualizar los gráficos o listas. El patrón de diseño implementado es el siguiente:

#### Patrón de Diseño del Filtro (Figma & MUI)
* **Componente MUI**: `TextField` con propiedad `type="date"`, `size="small"` e `InputLabelProps={{ shrink: true }}`.
* **Diseño Visual**: Estilo redondeado e integrado con la paleta de colores del proyecto (`colors.border`).
* **Lógica React**: Estado local `startDate` y `endDate`, y filtrado en línea de los datos de prueba (`mock data`) que alimentan gráficos y tablas.

#### 📂 `src/app/components/admin/AdminDashboard.tsx`
* **Lógica**: Filtra los datos de ejecuciones de sesiones VR (`executionData`) del último mes.
* **Estructura Agregada**:
  ```tsx
  import { TextField } from "@mui/material";
  // ...
  const [startDate, setStartDate] = useState("2025-05-01");
  const [endDate, setEndDate] = useState("2025-05-31");

  const filteredExecutionData = executionData.filter(d => {
    if (startDate && d.date < startDate) return false;
    if (endDate && d.date > endDate) return false;
    return true;
  });
  ```

#### 📂 `src/app/components/admin/GlobalReports.tsx`
* **Lógica**: Filtra los datos agregados de sesiones VR mensuales por rango de fechas y actualiza el gráfico de área principal.
* **Componente de Interfaz**: Se reemplazaron los inputs nativos `<input type="date">` por componentes `TextField` de Material-UI.

#### 📂 `src/app/components/company/CompanyDashboard.tsx`
* **Lógica**: Se agregaron los campos MUI y se implementó el filtrado en el gráfico de rendimiento y la lista de actividades recientes de la empresa.

#### 📂 `src/app/components/company/CompanyReports.tsx`
* **Lógica**: Filtra los datos de sesiones mensuales (`sessionData`) y la tabla de resultados de los empleados basándose en el rango seleccionado en los filtros MUI.

#### 📂 `src/app/components/coordinator/CoordinatorDashboard.tsx`
* **Lógica**: Permite filtrar el rendimiento de los programas de entrenamiento virtuales asignados y la lista de sesiones de usuarios por rango de fechas.

#### 📂 `src/app/components/employee/EmployeeDashboard.tsx`
* **Lógica**: Permite al empleado filtrar su propio historial de simulaciones en el gráfico de progreso y en la tabla histórica de ejecuciones.

---

## 🎨 Guía de Estilo Visual para Figma

Al recrear estos componentes en Figma:
1. **Inputs de Fecha (Material-UI)**:
   - Utilizar el diseño estándar de Material-UI Outline Input.
   - **Altura**: `34px`.
   - **Esquinas redondeadas**: `8px` (`borderRadius: '0.5rem'`).
   - **Color de Borde**: Gris claro (`#E2E8F0`).
   - **Icono de Calendario**: Icono nativo de selector de fecha a la derecha.
   - **Etiqueta**: Flotante/reducida permanentemente (`shrink: true`).
2. **Textos traducidos**:
   - Reemplazar todas las etiquetas de estados en las tarjetas de información y tablas a su equivalente en español.
   - Reemplazar las descripciones de los permisos en el configurador de roles a sus nombres en español según el mapeo de este documento.