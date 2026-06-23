import { useMemo, useState } from "react";
import { Download, Filter, Lock, Search, ShieldCheck, SlidersHorizontal, History, Eye } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { Card, PageHeader, colors } from "../shared";

type AuditEventType = "ALTA" | "MODIFICACION" | "BAJA_LOGICA" | "ASIGNACION" | "REVOCACION" | "CLONACION" | "VERSIONADO" | "BLOQUEO" | "DESBLOQUEO" | "CIERRE";
type EntityType = "Usuario" | "Rol" | "Permiso" | "Empresa" | "Simulación VR" | "Programa" | "Examen" | "Pregunta" | "Configuración" | "Sesión" | "Cuenta";

interface AuditRecord {
  id: string;
  date: string;
  eventType: AuditEventType;
  entityType: EntityType;
  entityName: string;
  company: string;
  responsible: string;
  affectedUser?: string;
  attribute?: string;
  previousValue?: string;
  newValue?: string;
  detail: string;
  severity: "Informativo" | "Control" | "Crítico";
}

const records: AuditRecord[] = [
  { id: "AUD-000741", date: "2026-06-22T15:18:00", eventType: "REVOCACION", entityType: "Programa", entityName: "Operación Segura de Scooptram", company: "Minera Andina S.A.", responsible: "María Quispe", affectedUser: "Diego Salvatierra", attribute: "empleado_asignado", previousValue: "asignado", newValue: "revocado", detail: "Revocación de programa", severity: "Control" },
  { id: "AUD-000740", date: "2026-06-22T14:07:00", eventType: "VERSIONADO", entityType: "Examen", entityName: "Evaluación de Bloqueo y Etiquetado", company: "Minera Andina S.A.", responsible: "Andrea Torres", attribute: "version", previousValue: "v2", newValue: "v3", detail: "Creación de nueva versión de examen", severity: "Informativo" },
  { id: "AUD-000739", date: "2026-06-21T11:26:00", eventType: "CLONACION", entityType: "Programa", entityName: "Inducción Mina Subterránea 2026", company: "Cobre Norte Ltda.", responsible: "Carlos Mendoza", attribute: "programa_origen_destino", previousValue: "PRG-018", newValue: "PRG-044", detail: "Clonación de programa", severity: "Informativo" },
  { id: "AUD-000738", date: "2026-06-21T09:52:00", eventType: "MODIFICACION", entityType: "Configuración", entityName: "duracion_maxima_sesion", company: "Global", responsible: "Carlos Mendoza", attribute: "valorParametro", previousValue: "120 minutos", newValue: "90 minutos", detail: "Cambio de parámetro de configuración", severity: "Crítico" },
  { id: "AUD-000737", date: "2026-06-20T18:34:00", eventType: "BLOQUEO", entityType: "Cuenta", entityName: "r.rojas@andina.cl", company: "Minera Andina S.A.", responsible: "Sistema de Autenticación", affectedUser: "Raúl Rojas", attribute: "estado_cuenta", previousValue: "activa", newValue: "bloqueada", detail: "Bloqueo automático de cuenta", severity: "Crítico" },
  { id: "AUD-000736", date: "2026-06-20T10:12:00", eventType: "ASIGNACION", entityType: "Rol", entityName: "Coordinador de Faena", company: "Minera Andina S.A.", responsible: "María Quispe", affectedUser: "Andrea Torres", attribute: "rol_usuario", previousValue: "Empleado", newValue: "Coordinador de Faena", detail: "Asignación de rol a usuario", severity: "Control" },
  { id: "AUD-000735", date: "2026-06-19T17:40:00", eventType: "MODIFICACION", entityType: "Simulación VR", entityName: "Rescate en Galería con Baja Visibilidad", company: "Minera Andina S.A.", responsible: "Carlos Mendoza", attribute: "version", previousValue: "4", newValue: "5", detail: "Actualización de simulación VR", severity: "Control" },
  { id: "AUD-000734", date: "2026-06-19T12:05:00", eventType: "ALTA", entityType: "Empresa", entityName: "Litio Austral S.A.", company: "Litio Austral S.A.", responsible: "Carlos Mendoza", attribute: "estado", previousValue: "sin registro", newValue: "activa", detail: "Alta de nueva empresa", severity: "Control" },
  { id: "AUD-000733", date: "2026-06-18T08:36:00", eventType: "REVOCACION", entityType: "Permiso", entityName: "export_reports", company: "Cobre Norte Ltda.", responsible: "Carlos Mendoza", affectedUser: "Nicolás Pereira", attribute: "permiso_endpoint", previousValue: "GET /reports/export habilitado", newValue: "revocado", detail: "Revocación de permiso de acceso", severity: "Crítico" },
  { id: "AUD-000732", date: "2026-06-17T13:21:00", eventType: "MODIFICACION", entityType: "Pregunta", entityName: "Distancia mínima ante tronadura", company: "Minera Andina S.A.", responsible: "Andrea Torres", attribute: "respuesta_correcta", previousValue: "50 m", newValue: "100 m", detail: "Actualización de pregunta", severity: "Control" },
  { id: "AUD-000731", date: "2026-06-16T19:02:00", eventType: "DESBLOQUEO", entityType: "Cuenta", entityName: "j.arias@andina.cl", company: "Minera Andina S.A.", responsible: "María Quispe", affectedUser: "Javiera Arias", attribute: "estado_cuenta", previousValue: "bloqueada", newValue: "activa", detail: "Desbloqueo de cuenta", severity: "Crítico" },
  { id: "AUD-000730", date: "2026-06-15T10:55:00", eventType: "CIERRE", entityType: "Programa", entityName: "Manejo Defensivo en Rajo", company: "Litio Austral S.A.", responsible: "Sofía Herrera", attribute: "estado_programa", previousValue: "en progreso", newValue: "cerrado", detail: "Cierre de programa", severity: "Informativo" },
];

const all = "Todos";
const eventTypes = [all, "ALTA", "MODIFICACION", "BAJA_LOGICA", "ASIGNACION", "REVOCACION", "CLONACION", "VERSIONADO", "BLOQUEO", "DESBLOQUEO", "CIERRE"];
const entityTypes = [all, "Usuario", "Rol", "Permiso", "Empresa", "Simulación VR", "Programa", "Examen", "Pregunta", "Configuración", "Sesión", "Cuenta"];
const companies = [all, "Minera Andina S.A.", "Cobre Norte Ltda.", "Litio Austral S.A.", "Global"];

const formatDate = (value: string) => new Intl.DateTimeFormat("es-CL", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));

export function AuditTrail() {
  const { user } = useAuth();
  const isCompanyAdmin = user?.role === "company";
  const companyScope = user?.company ?? "Minera Andina S.A.";
  const [eventType, setEventType] = useState(all);
  const [entityType, setEntityType] = useState(all);
  const [company, setCompany] = useState(isCompanyAdmin ? companyScope : all);
  const [responsible, setResponsible] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [query, setQuery] = useState("");

  const visibleRecords = useMemo(() => records.filter((record) => {
    if (isCompanyAdmin && record.company !== companyScope) return false;
    if (eventType !== all && record.eventType !== eventType) return false;
    if (entityType !== all && record.entityType !== entityType) return false;
    if (!isCompanyAdmin && company !== all && record.company !== company) return false;
    if (responsible && !record.responsible.toLowerCase().includes(responsible.toLowerCase())) return false;
    if (from && record.date.slice(0, 10) < from) return false;
    if (to && record.date.slice(0, 10) > to) return false;
    const haystack = `${record.id} ${record.entityName} ${record.detail} ${record.affectedUser ?? ""}`.toLowerCase();
    return !query || haystack.includes(query.toLowerCase());
  }), [company, companyScope, entityType, eventType, from, isCompanyAdmin, query, responsible, to]);

  const exportCsv = () => {
    const header = ["ID", "Fecha", "Tipo", "Entidad", "Nombre", "Empresa", "Responsable", "Usuario afectado", "Atributo", "Valor anterior", "Valor nuevo", "Detalle"];
    const rows = visibleRecords.map((r) => [r.id, formatDate(r.date), r.eventType, r.entityType, r.entityName, r.company, r.responsible, r.affectedUser ?? "", r.attribute ?? "", r.previousValue ?? "", r.newValue ?? "", r.detail]);
    const csv = [header, ...rows].map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `auditoria-safemining-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const severityClass = (severity: AuditRecord["severity"]) => severity === "Crítico" ? "bg-red-50 text-red-700 border-red-200" : severity === "Control" ? "bg-orange-50 text-orange-700 border-orange-200" : "bg-slate-50 text-slate-700 border-slate-200";

  return (
    <div className="space-y-6">
      <PageHeader
        title="Auditoría y Trazabilidad"
        subtitle={isCompanyAdmin ? `Consulta limitada a registros de ${companyScope} según aislamiento multiempresa.` : "Historial completo de eventos críticos del sistema, seguridad, administración y entidades de negocio."}
        actions={<button onClick={exportCsv} className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-90" style={{ backgroundColor: colors.secondary }}><Download size={17} />Exportar CSV</button>}
      />

      <Card>
        <div className="mb-5 flex items-center gap-2"><SlidersHorizontal size={19} className="text-slate-700" /><h2 className="text-lg font-semibold text-slate-900">Filtros de consulta</h2></div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
          <FilterSelect label="Tipo de evento" value={eventType} onChange={setEventType} options={eventTypes} />
          <FilterSelect label="Entidad afectada" value={entityType} onChange={setEntityType} options={entityTypes} />
          <FilterSelect label="Empresa" value={company} onChange={setCompany} options={isCompanyAdmin ? [companyScope] : companies} disabled={isCompanyAdmin} />
          <FilterInput label="Usuario responsable" value={responsible} onChange={setResponsible} placeholder="Ej. Carlos" />
          <FilterInput label="Desde" type="date" value={from} onChange={setFrom} />
          <FilterInput label="Hasta" type="date" value={to} onChange={setTo} />
        </div>
        <div className="mt-4 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5"><Search size={18} className="text-slate-400" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar por ID, entidad, usuario afectado o detalle del evento" className="w-full bg-transparent text-sm outline-none" /></div>
      </Card>

      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1120px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-5 py-3">Evento</th><th className="px-5 py-3">Entidad</th><th className="px-5 py-3">Empresa</th><th className="px-5 py-3">Responsable</th><th className="px-5 py-3">Cambio registrado</th></tr></thead>
            <tbody className="divide-y divide-slate-100">
              {visibleRecords.map((record) => (
                <tr key={record.id} className="align-top hover:bg-orange-50/30">
                  <td className="px-5 py-4"><p className="font-semibold text-slate-900">{record.id}</p><p className="text-xs text-slate-500">{formatDate(record.date)}</p><span className={`mt-2 inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${severityClass(record.severity)}`}>{record.eventType.replace("_", " ")}</span></td>
                  <td className="px-5 py-4"><p className="font-semibold text-slate-900">{record.entityType}</p><p className="max-w-[220px] text-slate-600">{record.entityName}</p>{record.affectedUser && <p className="mt-1 text-xs text-slate-500">Afectado: {record.affectedUser}</p>}</td>
                  <td className="px-5 py-4 text-slate-700">{record.company}</td>
                  <td className="px-5 py-4 text-slate-700">{record.responsible}</td>
                  <td className="px-5 py-4"><p className="max-w-[360px] text-slate-700">{record.detail}</p>{record.attribute && <div className="mt-2 grid grid-cols-[110px_1fr] gap-y-1 text-xs"><span className="text-slate-500">Atributo</span><span>{record.attribute}</span><span className="text-slate-500">Anterior</span><span>{record.previousValue}</span><span className="text-slate-500">Nuevo</span><span className="font-semibold text-slate-900">{record.newValue}</span></div>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function FilterSelect({ label, value, onChange, options, disabled }: { label: string; value: string; onChange: (v: string) => void; options: string[]; disabled?: boolean }) {
  return <label className="space-y-1 text-sm"><span className="font-medium text-slate-700">{label}</span><select value={value} onChange={(e) => onChange(e.target.value)} disabled={disabled} className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100 disabled:bg-slate-100 disabled:text-slate-500">{options.map((option) => <option key={option} value={option}>{option}</option>)}</select></label>;
}

function FilterInput({ label, value, onChange, placeholder, type = "text" }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return <label className="space-y-1 text-sm"><span className="font-medium text-slate-700">{label}</span><input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100" /></label>;
}
