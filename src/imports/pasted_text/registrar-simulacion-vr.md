HU-061 – Registrar nueva simulación VR en el catálogo
ID
HU-061
Módulo
F2
Requisito Funcional
F2-RF01, F2-RF02, F2-RF06
Descripción
Como Administrador del Sistema, quiero registrar una nueva simulación VR en ADMIN-08 (modo alta), definiendo metadatos, recurso Unity/bundle, métricas de evaluación y asignación de visibilidad a empresas, para incorporar un entorno inmersivo al catálogo global de capacitación.
Conversación
Pantalla/contexto: ADMIN-08 Simulation Detail en modo alta (/admin/simulations/new); breadcrumb "Simulaciones → Nueva Simulación".
 Entidades del modelo de datos: EntornoVR, CAPACITACION, OBJETIVOSCapacitacion, Empresa, CAPACITACION-EMPRESA, CAPACITACION_HISTORIAL (auditoría).
Criterios de Aceptación
Descripción
Pantalla/s
Criterios de Aceptación
CA1: Cuando navego desde ADMIN-07 (Simulations Catalog) presionando "Nueva Simulación", espero acceder a ADMIN-08 con breadcrumb "Simulaciones → Nueva Simulación", título "Nueva Simulación", y los botones "Cancelar" (OutlinedBtn que retorna a /admin/simulations) y "Guardar Simulación" (PrimaryBtn).
El back valida que el usuario autenticado tenga rol Administrador del Sistema; si no, retorna HTTP 403. Renderiza el formulario vacío sin persistir ningún dato.
ADMIN-08
CA2: Cuando completo la tarjeta "Información Básica", espero ver los campos: "Nombre de la Simulación" , "Descripción" (textarea de 3 filas), "Dificultad" (SelectField: Básico / Intermedio / Avanzado), "Duración (minutos)" (InputField numérico), "Versión" (InputField texto, placeholder "1.0"), "ID de Escena Unity" (InputField, placeholder "unity_scene_id"), y el Toggle "Simulación activa" activo por defecto.
El back no realiza validaciones hasta que el usuario interactúa con cada campo. El toggle "Simulación activa" se envía como true por defecto.
ADMIN-08
CA3: Cuando completo todos los campos obligatorios con valores válidos, configuro las métricas de evaluación y presiono "Guardar Simulación", espero ver un toast "Simulación creada exitosamente", redirección a ADMIN-07 tras aproximadamente 2 segundos y la nueva tarjeta visible en el catálogo.
El back crea un nuevo registro en la entidad EntornoVR y su correspondiente CAPACITACION con los metadatos proporcionados. Crea los registros de OBJETIVOSCapacitacion asociados con los nombres, descripciones, pesos y umbrales definidos, validando que la suma de los pesos sea exactamente 100. Si se seleccionaron empresas en la sección "Asignación a Empresas", crea los registros en CAPACITACION-EMPRESA para cada empresa seleccionada, estableciendo la fecha de inicio y el usuario responsable. Registra un evento de auditoría en CAPACITACION_HISTORIAL con tipoEvento "ALTA", la versión inicial creada y el usuario responsable.
ADMIN-08
CA4: Cuando dejo "Nombre de la Simulación" vacío o ingreso valores inválidos en los campos, espero ver mensajes de validación en español por campo que impidan guardar (RNF13).
El back valida que el nombre no esté vacío. Si se detectan campos obligatorios vacíos o valores inválidos, retorna errores de validación específicos sin persistir ningún dato.
ADMIN-08
CA5: Cuando presiono "Cancelar" durante la creación de una simulación, espero volver a ADMIN-07 (Simulations Catalog) sin persistir ningún dato.
El back descarta todos los datos ingresados en el formulario. No se realiza ninguna operación de persistencia ni se registra evento de auditoría.
ADMIN-08
CA6: Cuando un Administrador de Empresa o Coordinador intenta acceder a POST /api/admin/simulations, espero recibir HTTP 403 y que la operación sea rechazada.
El back valida el rol del usuario autenticado. Si el rol no es Administrador del Sistema, retorna HTTP 403 sin procesar la solicitud.
ADMIN-08
CA7: Cuando falla el guardado por un error de red o del servidor, espero conservar los valores ingresados en el formulario y visualizar un mensaje de error recuperable que permita reintentar.
El back no persiste ningún dato si ocurre un error durante la transacción. El registro de auditoría tampoco se crea, garantizando la consistencia transaccional (RNF10.2).
ADMIN-08
CA8: Cuando modifico el campo "Nombre de la Simulación", espero que el título principal de la pantalla se actualice reflejando el texto ingresado en tiempo real.
El back no interviene en esta actualización visual, ya que es un cambio del lado del frontend. El back solo recibe el valor final al guardar.
ADMIN-08
CA9: Cuando hago clic en el enlace "Simulaciones" dentro del breadcrumb, espero volver a ADMIN-07 descartando los cambios no guardados, previa confirmación si hay datos sin guardar.
El back no realiza ninguna operación. La navegación y confirmación de cambios no guardados se maneja del lado del frontend.
ADMIN-07, ADMIN-08
CA10: Cuando visualizo el formulario de creación, espero ver una sección "Asignación a Empresas" con un listado tipo checklist de todas las empresas registradas en el sistema, cada una con un checkbox para seleccionarla.
El back consulta el listado de todas las empresas activas registradas en la entidad Empresa y las retorna para que el frontend las renderice como opciones seleccionables.
ADMIN-08
CA11: Cuando selecciono una o más empresas del checklist y guardo la simulación con éxito, espero que la nueva simulación quede habilitada y visible únicamente para las empresas seleccionadas.
El back crea los registros en CAPACITACION-EMPRESA para cada empresa seleccionada, asociando la simulación a cada empresa con la fecha de inicio y el usuario que realizó la asignación. La simulación será visible únicamente en los catálogos de esas empresas (CEMP-10, COORD-10).
ADMIN-08
CA12: Cuando no selecciono ninguna empresa en el checklist y guardo la simulación, espero que la simulación se cree correctamente pero no sea visible para ninguna empresa hasta que se le asigne visibilidad en una edición futura.
El back crea la simulación sin crear registros en CAPACITACION-EMPRESA. La simulación queda en el catálogo global pero no aparece en los catálogos de ninguna empresa hasta que se le asigne visibilidad mediante una edición posterior.
ADMIN-08
CA13: Cuando la lista de empresas es muy extensa, espero contar con los botones "Seleccionar todas" y "Desmarcar todas" para facilitar la selección masiva de empresas.
El back recibe el listado completo de empresas seleccionadas enviado por el frontend. Los botones de seleccionar/deseleccionar todas son una funcionalidad del lado del frontend; el back procesa únicamente la lista final de empresas enviada al guardar.
ADMIN-08
US Relacionadas
HU-062, HU-067, HU-068, HU-060

 
