import { useState } from "react";
import { useNavigate } from "react-router";
import { Plus, Copy, Calendar, Users, Play, FileText } from "lucide-react";
import { PageHeader, PrimaryBtn, OutlinedBtn, StatusBadge, ProgressBar, colors } from "../shared";

const PROGRAMS = [
  {
    id: 1, name: "Seguridad y Evacuación de Incendios Q2 2025", status: "activo", created: "1 Abr, 2025",
    coordinator: "Roberto Silva", simulations: 3, exams: 1, enrolled: 24, completion: 78,
    startDate: "1 Abr, 2025", endDate: "30 Jun, 2025"
  },
  {
    id: 2, name: "Procedimientos LOTO – Nivel 2", status: "activo", created: "15 Mar, 2025",
    coordinator: "Elena Vega", simulations: 2, exams: 2, enrolled: 18, completion: 54,
    startDate: "15 Mar, 2025", endDate: "31 Mayo, 2025"
  },
  {
    id: 3, name: "Protocolo Entrada Espacio Confinado", status: "activo", created: "10 Ene, 2025",
    coordinator: "Roberto Silva", simulations: 4, exams: 1, enrolled: 12, completion: 91,
    startDate: "10 Ene, 2025", endDate: "31 Jul, 2025"
  },
  {
    id: 4, name: "Inducción Básica de EPP", status: "completado", created: "1 Feb, 2025",
    coordinator: "Elena Vega", simulations: 1, exams: 1, enrolled: 31, completion: 100,
    startDate: "1 Feb, 2025", endDate: "31 Mar, 2025"
  },
  {
    id: 5, name: "Seguridad de Manejo de Químicos", status: "borrador", created: "20 Mayo, 2025",
    coordinator: "Roberto Silva", simulations: 2, exams: 1, enrolled: 0, completion: 0,
    startDate: "1 Jun, 2025", endDate: "31 Ago, 2025"
  },
];

const STATUS_COLORS: Record<string, string> = { activo: colors.primary, active: colors.primary, completado: colors.success, completed: colors.success, borrador: "#94A3B8", draft: "#94A3B8", cerrado: "#6B7280", closed: "#6B7280" };

export function ProgramsList() {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState("todos");

  const filtered = PROGRAMS.filter(p => statusFilter === "todos" || p.status === statusFilter);

  return (
    <div>
      <PageHeader
        title="Programas de Entrenamiento"
        subtitle={`${PROGRAMS.length} programas`}
        actions={
          <div className="flex gap-2">
            <OutlinedBtn onClick={() => {}}><Copy size={16} /> Clonar Programa</OutlinedBtn>
            <PrimaryBtn onClick={() => navigate("/company/programs/new")}><Plus size={16} /> Nuevo Programa</PrimaryBtn>
          </div>
        }
      />

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {["todos", "borrador", "activo", "completado", "cerrado"].map(s => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className="px-3 py-1.5 rounded-lg text-sm font-medium capitalize"
            style={{ backgroundColor: statusFilter === s ? colors.primary : "white", color: statusFilter === s ? "white" : colors.textSecondary, border: `1px solid ${statusFilter === s ? colors.primary : colors.border}` }}
          >
            {s === "todos" ? "Todos los Programas" : s}
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-2 gap-5">
        {filtered.map(prog => (
          <div key={prog.id} className="bg-white rounded-xl border shadow-sm overflow-hidden" style={{ borderColor: colors.border }}>
            <div className="h-1.5" style={{ backgroundColor: STATUS_COLORS[prog.status] }} />
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-base leading-tight mb-1" style={{ color: colors.textPrimary }}>{prog.name}</h4>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={prog.status} />
                    <span className="text-xs" style={{ color: colors.textSecondary }}>Creado {prog.created}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
                <div className="flex items-center gap-1.5" style={{ color: colors.textSecondary }}>
                  <Users size={12} />
                  <span>{prog.coordinator}</span>
                </div>
                <div className="flex items-center gap-1.5" style={{ color: colors.textSecondary }}>
                  <Calendar size={12} />
                  <span>{prog.startDate} → {prog.endDate}</span>
                </div>
                <div className="flex items-center gap-1.5" style={{ color: colors.textSecondary }}>
                  <Play size={12} />
                  <span>{prog.simulations} simulaciones</span>
                </div>
                <div className="flex items-center gap-1.5" style={{ color: colors.textSecondary }}>
                  <FileText size={12} />
                  <span>{prog.exams} exámenes</span>
                </div>
              </div>

              {/* Enrollment + Progress */}
              <div className="flex items-center justify-between mb-1.5 text-xs">
                <span style={{ color: colors.textSecondary }}>{prog.enrolled} empleados inscritos</span>
                <span className="font-semibold" style={{ color: colors.textPrimary }}>{prog.completion}% completado</span>
              </div>
              <ProgressBar value={prog.completion} color={STATUS_COLORS[prog.status]} />

              {/* Actions */}
              <div className="flex gap-2 mt-4 flex-wrap">
                {prog.status === "borrador" && (
                  <button
                    onClick={() => navigate(`/company/programs/${prog.id}`)}
                    className="px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors"
                    style={{ borderColor: colors.border, color: colors.textSecondary }}
                  >
                    Editar
                  </button>
                )}
                {prog.status !== "cerrado" && (
                  <button
                    onClick={() => navigate(`/company/programs/${prog.id}/assign`)}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium text-white"
                    style={{ backgroundColor: colors.secondary }}
                  >
                    Asignar
                  </button>
                )}
                <button
                  onClick={() => navigate(`/company/programs/${prog.id}/progress`)}
                  className="px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors"
                  style={{ borderColor: colors.border, color: colors.textSecondary }}
                >
                  Ver Progreso
                </button>
                {prog.status === "activo" && (
                  <button className="px-3 py-1.5 rounded-lg border text-xs font-medium" style={{ borderColor: colors.error, color: colors.error }}>
                    Cerrar
                  </button>
                )}
                <button className="px-3 py-1.5 rounded-lg border text-xs font-medium" style={{ borderColor: colors.border, color: colors.textSecondary }}>
                  <Copy size={11} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
