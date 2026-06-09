import { useState } from "react";
import { Users, Briefcase, Award, TrendingUp } from "lucide-react";
import { TextField } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { PageHeader, StatCard, StatusBadge, ProgressBar, colors, Card, Avatar } from "../shared";
import { useAuth } from "../../context/AuthContext";

const programData = [
  { name: "Seguridad Incendios Q2", completion: 78, date: "2025-05-10" },
  { name: "Entrenamiento LOTO", completion: 54, date: "2025-05-15" },
  { name: "Espacios Confinados", completion: 91, date: "2025-05-20" },
  { name: "Básicos de EPP", completion: 100, date: "2025-05-22" },
  { name: "Seguridad Química", completion: 32, date: "2025-05-25" },
];

const failureData = [
  { name: "LOTO Energía", rate: 28 },
  { name: "Derrame Químico", rate: 24 },
  { name: "Entrada Confinado", rate: 19 },
  { name: "Evac Incendios", rate: 13 },
  { name: "Colocación EPP", rate: 8 },
];

const recentAssignments = [
  { name: "Juan Pérez", program: "Seguridad Incendios Q2", dateStr: "25 Mayo, 2025", date: "2025-05-25", status: "en progreso" },
  { name: "Ana Torres", program: "Entrenamiento LOTO", dateStr: "24 Mayo, 2025", date: "2025-05-24", status: "completado" },
  { name: "Carlos Ruiz", program: "Seguridad Química", dateStr: "23 Mayo, 2025", date: "2025-05-23", status: "no iniciado" },
  { name: "María López", program: "Espacios Confinados", dateStr: "22 Mayo, 2025", date: "2025-05-22", status: "en progreso" },
];

const pendingActions = [
  { name: "Roberto Silva", program: "Seguridad Incendios Q2", daysLeft: 3 },
  { name: "Elena Vega", program: "Entrenamiento LOTO", daysLeft: 5 },
  { name: "Pedro Rojas", program: "Seguridad Química", daysLeft: 6 },
];

export function CompanyDashboard() {
  const { user } = useAuth();
  const [startDate, setStartDate] = useState("2025-05-01");
  const [endDate, setEndDate] = useState("2025-05-31");

  const filteredProgramData = programData.filter(d => {
    if (startDate && d.date < startDate) return false;
    if (endDate && d.date > endDate) return false;
    return true;
  });

  const filteredAssignments = recentAssignments.filter(d => {
    if (startDate && d.date < startDate) return false;
    if (endDate && d.date > endDate) return false;
    return true;
  });

  return (
    <div>
      <PageHeader
        title={user?.company ?? "Panel de Empresa"}
        subtitle="Resumen de actividades de entrenamiento y progreso de empleados"
      />

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
        <StatCard label="Usuarios Activos" value="84" icon={<Users size={22} />} trend={{ value: "+5 este mes", up: true }} />
        <StatCard label="Programas Activos" value="7" icon={<Briefcase size={22} />} color={colors.secondary} />
        <StatCard label="Tasa de Finalización" value="72%" icon={<TrendingUp size={22} />} trend={{ value: "+8% vs mes anterior", up: true }} />
        <StatCard label="Certificados Emitidos" value="312" icon={<Award size={22} />} trend={{ value: "+28 este mes", up: true }} />
      </div>

      <div className="grid grid-cols-3 gap-5 mb-6">
        {/* Programs bar chart */}
        <Card className="col-span-2">
          <h3 className="font-semibold mb-4" style={{ color: colors.textPrimary }}>Resumen de Finalización de Programas</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={filteredProgramData} layout="vertical" margin={{ left: 20 }}>
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10, fill: colors.textSecondary }} />
              <YAxis type="category" dataKey="name" width={110} tick={{ fontSize: 10, fill: colors.textSecondary }} />
              <Tooltip formatter={(v) => [`${v}%`, "Finalización"]} contentStyle={{ backgroundColor: "white", border: `1px solid ${colors.border}`, borderRadius: 8 }} />
              <Bar dataKey="completion" fill={colors.primary} radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Pending actions */}
        <Card>
          <h3 className="font-semibold mb-4" style={{ color: colors.textPrimary }}>Acciones Pendientes</h3>
          <p className="text-xs mb-3" style={{ color: colors.textSecondary }}>Empleados con fechas límite próximas</p>
          <div className="space-y-3">
            {pendingActions.map((p, i) => (
              <div key={i} className="flex items-center justify-between p-2.5 rounded-lg" style={{ backgroundColor: colors.bg }}>
                <div className="flex items-center gap-2">
                  <Avatar name={p.name} size={28} />
                  <div>
                    <div className="text-xs font-medium" style={{ color: colors.textPrimary }}>{p.name}</div>
                    <div className="text-xs" style={{ color: colors.textSecondary }}>{p.program}</div>
                  </div>
                </div>
                <span
                  className="text-xs font-semibold px-2 py-0.5 rounded-full text-white"
                  style={{ backgroundColor: p.daysLeft <= 3 ? colors.error : colors.secondary }}
                >
                  {p.daysLeft}d restantes
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-3 gap-5">
        {/* Failure rate */}
        <Card>
          <h3 className="font-semibold mb-4" style={{ color: colors.textPrimary }}>Tasa de Fallos en Simulaciones</h3>
          <div className="space-y-3">
            {failureData.map((f, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs mb-1">
                  <span style={{ color: colors.textPrimary }}>{f.name}</span>
                  <span className="font-semibold" style={{ color: colors.secondary }}>{f.rate}%</span>
                </div>
                <ProgressBar value={f.rate} max={100} color={colors.secondary} />
              </div>
            ))}
          </div>
        </Card>

        {/* Recent assignments */}
        <Card className="col-span-2">
          <h3 className="font-semibold mb-4" style={{ color: colors.textPrimary }}>Asignaciones Recientes</h3>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
                {["Empleado", "Programa", "Asignado", "Estado"].map(h => (
                  <th key={h} className="pb-2 text-left text-xs font-semibold uppercase" style={{ color: colors.textSecondary }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredAssignments.map((a, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${colors.border}` }}
                  onMouseEnter={e => (e.currentTarget as HTMLTableRowElement).style.backgroundColor = "#F8FAFC"}
                  onMouseLeave={e => (e.currentTarget as HTMLTableRowElement).style.backgroundColor = ""}>
                  <td className="py-2.5">
                    <div className="flex items-center gap-2">
                      <Avatar name={a.name} size={28} />
                      <span className="text-sm font-medium" style={{ color: colors.textPrimary }}>{a.name}</span>
                    </div>
                  </td>
                  <td className="py-2.5 text-xs" style={{ color: colors.textSecondary }}>{a.program}</td>
                  <td className="py-2.5 text-xs" style={{ color: colors.textSecondary }}>{a.dateStr}</td>
                  <td className="py-2.5"><StatusBadge status={a.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}
