import { useState } from "react";
import { useNavigate } from "react-router";
import { Award, Clock, CheckCircle, PlayCircle } from "lucide-react";
import { PageHeader, StatusBadge, ProgressBar, colors, Card, Avatar } from "../shared";
import { useAuth } from "../../context/AuthContext";
import { TextField } from "@mui/material";

const PROGRAMS = [
  {
    id: 1,
    name: "Seguridad y Evacuación de Incendios Q2 2025",
    status: "en progreso",
    progress: 65,
    deadline: "30 Jun, 2025",
    daysLeft: 35,
    date: "2025-06-30",
  },
  {
    id: 2,
    name: "Procedimientos LOTO – Nivel 2",
    status: "no iniciado",
    progress: 0,
    deadline: "31 Mayo, 2025",
    daysLeft: 5,
    date: "2025-05-31",
  },
  {
    id: 3,
    name: "Inducción Básica de EPP",
    status: "completado",
    progress: 100,
    deadline: "31 Mar, 2025",
    daysLeft: null,
    date: "2025-03-31",
  },
];

export function EmployeeDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState("2025-01-01");
  const [endDate, setEndDate] = useState("2025-12-31");

  const filteredPrograms = PROGRAMS.filter(d => {
    if (startDate && d.date < startDate) return false;
    if (endDate && d.date > endDate) return false;
    return true;
  });

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Avatar name={user?.name ?? "Usuario"} size={52} />
        <div>
          <h1 className="text-2xl font-bold" style={{ color: colors.textPrimary }}>¡Bienvenido/a de nuevo, {user?.name?.split(" ")[0]}!</h1>
          <p className="text-sm" style={{ color: colors.textSecondary }}>{user?.company} · Continúa tu entrenamiento de seguridad</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border p-4 mb-6 flex items-center gap-4 flex-wrap" style={{ borderColor: colors.border }}>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium" style={{ color: colors.textSecondary }}>Rango de Fechas</label>
          <div className="flex gap-2 items-center">
            <TextField
              type="date"
              size="small"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{ '& .MuiInputBase-root': { fontSize: '0.875rem', borderRadius: '0.5rem', height: '34px' }, '& .MuiOutlinedInput-notchedOutline': { borderColor: colors.border } }}
            />
            <span className="text-xs" style={{ color: colors.textSecondary }}>a</span>
            <TextField
              type="date"
              size="small"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{ '& .MuiInputBase-root': { fontSize: '0.875rem', borderRadius: '0.5rem', height: '34px' }, '& .MuiOutlinedInput-notchedOutline': { borderColor: colors.border } }}
            />
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "Programas Completados", value: "1", icon: <CheckCircle size={20} />, color: colors.success },
          { label: "Simulaciones Pendientes", value: "3", icon: <PlayCircle size={20} />, color: colors.secondary },
          { label: "Certificados Obtenidos", value: "1", icon: <Award size={20} />, color: "#8B5CF6" },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border p-5 shadow-sm flex items-center gap-4" style={{ borderColor: colors.border }}>
            <div className="p-2.5 rounded-lg" style={{ backgroundColor: `${s.color}15` }}>
              <div style={{ color: s.color }}>{s.icon}</div>
            </div>
            <div>
              <div className="text-2xl font-bold" style={{ color: colors.textPrimary }}>{s.value}</div>
              <div className="text-xs" style={{ color: colors.textSecondary }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Programs */}
      <div>
        <h2 className="text-lg font-semibold mb-4" style={{ color: colors.textPrimary }}>Tus Programas</h2>
        <div className="space-y-4">
          {filteredPrograms.map(prog => (
            <Card key={prog.id} className="cursor-pointer transition-all hover:shadow-md" >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-semibold text-base" style={{ color: colors.textPrimary }}>{prog.name}</h3>
                    <StatusBadge status={prog.status} />
                  </div>
                  {prog.deadline && (
                    <div className="flex items-center gap-1.5">
                      <Clock size={12} style={{ color: colors.textSecondary }} />
                      <span className="text-xs" style={{ color: colors.textSecondary }}>Fecha límite: {prog.deadline}</span>
                      {prog.daysLeft !== null && prog.daysLeft <= 7 && (
                        <span
                          className="text-xs px-2 py-0.5 rounded-full font-semibold text-white"
                          style={{ backgroundColor: prog.daysLeft <= 3 ? colors.error : colors.secondary }}
                        >
                          ¡{prog.daysLeft}d rest!
                        </span>
                      )}
                    </div>
                  )}
                </div>
                {prog.status !== "completado" ? (
                  <button
                    onClick={() => navigate(`/employee/programs/${prog.id}`)}
                    className="px-4 py-2 rounded-lg text-sm font-semibold text-white"
                    style={{ backgroundColor: prog.status === "en progreso" ? colors.primary : colors.secondary }}
                  >
                    {prog.status === "en progreso" ? "Continuar →" : "Empezar →"}
                  </button>
                ) : (
                  <button
                    onClick={() => navigate("/employee/certificates")}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold"
                    style={{ backgroundColor: `${colors.success}15`, color: colors.success }}
                  >
                    <Award size={16} /> Ver Certificado
                  </button>
                )}
              </div>

              <div className="flex items-center gap-3">
                <div className="flex-1"><ProgressBar value={prog.progress} color={prog.status === "completado" ? colors.success : colors.primary} /></div>
                <span className="text-sm font-semibold w-10 text-right" style={{ color: colors.textPrimary }}>{prog.progress}%</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
