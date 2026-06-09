import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Download, ChevronDown, ChevronUp } from "lucide-react";
import { Breadcrumb, PageHeader, StatusBadge, ProgressBar, Avatar, colors, Card } from "../shared";

const EMPLOYEES = [
  {
    id: 1, name: "Juan Pérez", status: "en progreso", progress: 65, sessions: 4, exams: 1, lastActivity: "25 Mayo, 2025", hasCert: false,
    details: [
      { name: "Evacuación Incendios – Subterráneo", type: "Sim VR", status: "aprobado", attempts: 2, bestScore: 88, lastAttempt: "22 Mayo, 2025" },
      { name: "Examen Teórico Seguridad", type: "Examen", status: "en progreso", attempts: 1, bestScore: 64, lastAttempt: "25 Mayo, 2025" },
    ]
  },
  {
    id: 2, name: "Ana Torres", status: "completado", progress: 100, sessions: 5, exams: 2, lastActivity: "20 Mayo, 2025", hasCert: true,
    details: [
      { name: "Evacuación Incendios – Subterráneo", type: "Sim VR", status: "aprobado", attempts: 1, bestScore: 94, lastAttempt: "18 Mayo, 2025" },
      { name: "Examen Teórico Seguridad", type: "Examen", status: "aprobado", attempts: 1, bestScore: 87, lastAttempt: "20 Mayo, 2025" },
    ]
  },
  {
    id: 3, name: "Carlos Ruiz", status: "no iniciado", progress: 0, sessions: 0, exams: 0, lastActivity: "—", hasCert: false,
    details: [
      { name: "Evacuación Incendios – Subterráneo", type: "Sim VR", status: "pendiente", attempts: 0, bestScore: null, lastAttempt: "—" },
      { name: "Examen Teórico Seguridad", type: "Examen", status: "bloqueado", attempts: 0, bestScore: null, lastAttempt: "—" },
    ]
  },
  {
    id: 4, name: "María López", status: "fallido", progress: 40, sessions: 3, exams: 3, lastActivity: "19 Mayo, 2025", hasCert: false,
    details: [
      { name: "Evacuación Incendios – Subterráneo", type: "Sim VR", status: "aprobado", attempts: 2, bestScore: 76, lastAttempt: "15 Mayo, 2025" },
      { name: "Examen Teórico Seguridad", type: "Examen", status: "rechazado", attempts: 3, bestScore: 58, lastAttempt: "19 Mayo, 2025" },
    ]
  },
];

export function EmployeeProgress() {
  const navigate = useNavigate();
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <div>
      <Breadcrumb items={[
        { label: "Programas", onClick: () => navigate("/company/programs") },
        { label: "Seguridad y Evacuación de Incendios Q2 2025", onClick: () => navigate("/company/programs") },
        { label: "Progreso de Empleados" }
      ]} />

      <PageHeader
        title="Progreso de Empleados"
        subtitle="Seguridad y Evacuación de Incendios Q2 2025"
      />

      <div className="bg-white rounded-xl border overflow-hidden shadow-sm" style={{ borderColor: colors.border }}>
        <table className="w-full text-sm">
          <thead style={{ backgroundColor: colors.bg, borderBottom: `1px solid ${colors.border}` }}>
            <tr>
              {["Empleado", "Estado", "Progreso", "Sesiones VR", "Exámenes", "Última Actividad", "Certificado", "Acciones"].map(h => (
                <th key={h} className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: colors.textSecondary }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {EMPLOYEES.map((emp, i) => (
              <>
                <tr
                  key={emp.id}
                  className="cursor-pointer transition-colors"
                  style={{ borderBottom: `1px solid ${colors.border}`, backgroundColor: expandedId === emp.id ? "#F0F9FF" : "" }}
                  onClick={() => setExpandedId(expandedId === emp.id ? null : emp.id)}
                  onMouseEnter={e => { if (expandedId !== emp.id) (e.currentTarget as HTMLTableRowElement).style.backgroundColor = "#F8FAFC"; }}
                  onMouseLeave={e => { if (expandedId !== emp.id) (e.currentTarget as HTMLTableRowElement).style.backgroundColor = ""; }}
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <Avatar name={emp.name} size={32} />
                      <span className="font-medium" style={{ color: colors.textPrimary }}>{emp.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5"><StatusBadge status={emp.status} /></td>
                  <td className="px-5 py-3.5 w-40">
                    <div className="flex items-center gap-2">
                      <div className="flex-1"><ProgressBar value={emp.progress} /></div>
                      <span className="text-xs font-medium w-8 text-right" style={{ color: colors.textSecondary }}>{emp.progress}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 font-semibold" style={{ color: colors.textPrimary }}>{emp.sessions}</td>
                  <td className="px-5 py-3.5 font-semibold" style={{ color: colors.textPrimary }}>{emp.exams}</td>
                  <td className="px-5 py-3.5 text-xs" style={{ color: colors.textSecondary }}>{emp.lastActivity}</td>
                  <td className="px-5 py-3.5">
                    {emp.hasCert ? (
                      <button className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium text-white" style={{ backgroundColor: colors.success }}>
                        <Download size={11} /> PDF
                      </button>
                    ) : (
                      <span className="text-xs" style={{ color: colors.textSecondary }}>—</span>
                    )}
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      {expandedId === emp.id ? <ChevronUp size={16} style={{ color: colors.textSecondary }} /> : <ChevronDown size={16} style={{ color: colors.textSecondary }} />}
                    </div>
                  </td>
                </tr>

                {expandedId === emp.id && (
                  <tr key={`${emp.id}-detail`} style={{ backgroundColor: "#F8FAFC", borderBottom: `1px solid ${colors.border}` }}>
                    <td colSpan={8} className="px-8 py-4">
                      <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: colors.textSecondary }}>Detalles de Progreso</p>
                      <div className="space-y-2">
                        {emp.details.map((d, di) => (
                          <div key={di} className="flex items-center gap-4 bg-white p-3 rounded-lg border" style={{ borderColor: colors.border }}>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium" style={{ color: colors.textPrimary }}>{d.name}</span>
                                <span className="text-xs px-1.5 py-0.5 rounded" style={{ backgroundColor: colors.bg, color: colors.textSecondary }}>{d.type}</span>
                              </div>
                            </div>
                            <StatusBadge status={d.status} />
                            <span className="text-xs" style={{ color: colors.textSecondary }}>{d.attempts} intento{d.attempts !== 1 ? "s" : ""}</span>
                            {d.bestScore !== null ? (
                              <span className="font-semibold text-sm" style={{ color: d.bestScore >= 75 ? colors.success : colors.error }}>{d.bestScore}/100</span>
                            ) : (
                              <span className="text-xs" style={{ color: colors.textSecondary }}>—</span>
                            )}
                            <span className="text-xs" style={{ color: colors.textSecondary }}>{d.lastAttempt}</span>
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
