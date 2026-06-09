import { useState } from "react";
import { useNavigate } from "react-router";
import { Briefcase, Users, TrendingUp, Award, AlertTriangle } from "lucide-react";
import { TextField } from "@mui/material";
import { PageHeader, StatCard, StatusBadge, ProgressBar, colors, Card, Avatar } from "../shared";
import { useAuth } from "../../context/AuthContext";

const MY_PROGRAMS = [
  { id: 1, name: "Seguridad y Evacuación de Incendios Q2 2025", status: "activo", completion: 78, enrolled: 24, date: "2025-05-15" },
  { id: 2, name: "Procedimientos LOTO – Nivel 2", status: "activo", completion: 54, enrolled: 18, date: "2025-05-20" },
  { id: 3, name: "Protocolo de Entrada a Espacio Confinado", status: "activo", completion: 91, enrolled: 12, date: "2025-05-25" },
];

const ATTENTION_NEEDED = [
  { name: "María López", issue: "Falló examen 3 veces", program: "Procedimientos LOTO", urgency: "high" },
  { name: "Carlos Ruiz", issue: "Aún no ha comenzado", program: "Seguridad Incendios Q2", urgency: "medium" },
  { name: "Pedro Rojas", issue: "3 días para fecha límite", program: "Espacio Confinado", urgency: "high" },
  { name: "Elena Torres", issue: "5 días para fecha límite", program: "Seguridad Incendios Q2", urgency: "medium" },
];

export function CoordinatorDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState("2025-05-01");
  const [endDate, setEndDate] = useState("2025-05-31");

  const filteredPrograms = MY_PROGRAMS.filter(p => {
    if (startDate && p.date < startDate) return false;
    if (endDate && p.date > endDate) return false;
    return true;
  });

  return (
    <div>
      <PageHeader title={`Bienvenido, ${user?.name}`} subtitle="Tus programas activos y estado de empleados en un vistazo" />

      <div className="flex gap-4 mb-6">
        <TextField
          label="Fecha Desde"
          type="date"
          size="small"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: '0.5rem', height: '34px', backgroundColor: 'white' }, '& .MuiOutlinedInput-notchedOutline': { borderColor: '#E2E8F0' } }}
        />
        <TextField
          label="Fecha Hasta"
          type="date"
          size="small"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: '0.5rem', height: '34px', backgroundColor: 'white' }, '& .MuiOutlinedInput-notchedOutline': { borderColor: '#E2E8F0' } }}
        />
      </div>

      <div className="grid grid-cols-4 gap-5 mb-8">
        <StatCard label="Mis Programas" value="3" icon={<Briefcase size={22} />} />
        <StatCard label="Total Empleados" value="54" icon={<Users size={22} />} color={colors.secondary} />
        <StatCard label="Finalización Promedio" value="74%" icon={<TrendingUp size={22} />} trend={{ value: "+6% este mes", up: true }} />
        <StatCard label="Certificados Emitidos" value="89" icon={<Award size={22} />} trend={{ value: "+12 este mes", up: true }} />
      </div>

      <div className="grid grid-cols-3 gap-5">
        {/* My Programs */}
        <Card className="col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold" style={{ color: colors.textPrimary }}>Mis Programas</h3>
            <button onClick={() => navigate("/coordinator/programs")} className="text-sm font-medium hover:underline" style={{ color: colors.primary }}>
              Ver todos →
            </button>
          </div>
          <div className="space-y-4">
            {filteredPrograms.map(prog => (
              <div
                key={prog.id}
                onClick={() => navigate("/coordinator/programs")}
                className="p-4 rounded-xl border cursor-pointer transition-colors hover:border-blue-200"
                style={{ borderColor: colors.border }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-medium text-sm" style={{ color: colors.textPrimary }}>{prog.name}</p>
                    <p className="text-xs mt-0.5" style={{ color: colors.textSecondary }}>{prog.enrolled} empleados inscritos</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusBadge status={prog.status} />
                    <span className="font-semibold text-sm" style={{ color: colors.textPrimary }}>{prog.completion}%</span>
                  </div>
                </div>
                <ProgressBar value={prog.completion} />
              </div>
            ))}
          </div>
        </Card>

        {/* Employees Requiring Attention */}
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle size={16} style={{ color: colors.secondary }} />
            <h3 className="font-semibold" style={{ color: colors.textPrimary }}>Requiere Atención</h3>
          </div>
          <div className="space-y-3">
            {ATTENTION_NEEDED.map((a, i) => (
              <div key={i} className="p-3 rounded-lg border" style={{ borderColor: a.urgency === "high" ? `${colors.error}40` : colors.border, backgroundColor: a.urgency === "high" ? "#FFF5F5" : colors.bg }}>
                <div className="flex items-center gap-2 mb-1">
                  <Avatar name={a.name} size={24} />
                  <span className="text-sm font-medium" style={{ color: colors.textPrimary }}>{a.name}</span>
                </div>
                <p className="text-xs" style={{ color: a.urgency === "high" ? colors.error : colors.textSecondary }}>{a.issue}</p>
                <p className="text-xs mt-0.5" style={{ color: colors.textSecondary }}>{a.program}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
