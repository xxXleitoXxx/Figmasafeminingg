import { Building2, Play, Users, ClipboardList } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { PageHeader, StatCard, StatusBadge, colors, Card } from "../shared";

const executionData = [
  { day: "May 1", sessions: 32 }, { day: "May 5", sessions: 45 }, { day: "May 8", sessions: 38 },
  { day: "May 12", sessions: 62 }, { day: "May 15", sessions: 55 }, { day: "May 18", sessions: 70 },
  { day: "May 22", sessions: 58 }, { day: "May 25", sessions: 83 }, { day: "May 26", sessions: 77 },
];

const companyData = [
  { company: "Minera Andina", sessions: 245 },
  { company: "Codelco Norte", sessions: 198 },
  { company: "Gold Field Chile", sessions: 167 },
  { company: "Antofagasta PLC", sessions: 134 },
  { company: "Anglo American", sessions: 98 },
];

const topSimulations = [
  { rank: 1, name: "Fire Evacuation – Underground", category: "Fire", executions: 432, approvalRate: 87, status: "active" },
  { rank: 2, name: "Energy Lockout/Tagout", category: "Energy", executions: 398, approvalRate: 79, status: "active" },
  { rank: 3, name: "Confined Space Entry", category: "Confined", executions: 312, approvalRate: 91, status: "active" },
  { rank: 4, name: "Chemical Spill Response", category: "Chemical", executions: 276, approvalRate: 73, status: "active" },
  { rank: 5, name: "Equipment Safety Checklist", category: "General", executions: 241, approvalRate: 95, status: "draft" },
];

const recentActivity = [
  { time: "Hace 2 min", text: "Nueva empresa registrada: Yamana Gold Chile" },
  { time: "Hace 14 min", text: "Usuario Juan Pérez completó simulación 'Evacuación de Incendios'" },
  { time: "Hace 1 hora", text: "Programa 'Básicos de Seguridad Q2' activado por Laura Gómez" },
  { time: "Hace 2 horas", text: "Certificado emitido a Ana Torres – Minera Andina" },
  { time: "Hace 3 horas", text: "Simulación 'Derrame Químico' actualizada a v2.1" },
  { time: "Hace 5 horas", text: "Copia de seguridad del sistema completada exitosamente" },
  { time: "Ayer", text: "Anglo American: 12 nuevos empleados inscritos" },
];

export function AdminDashboard() {
  return (
    <div>
      <PageHeader title="Panel del Sistema" subtitle="Resumen y análisis de toda la plataforma" />

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-5 mb-8">
        <StatCard label="Empresas Activas" value="24" icon={<Building2 size={22} />} trend={{ value: "+3 este mes", up: true }} />
        <StatCard label="Sesiones VR Totales" value="8,432" icon={<Play size={22} />} color={colors.secondary} trend={{ value: "+12% vs mes anterior", up: true }} />
        <StatCard label="Usuarios Activos" value="1,284" icon={<Users size={22} />} trend={{ value: "+87 este mes", up: true }} />
        <StatCard label="Programas en Progreso" value="63" icon={<ClipboardList size={22} />} trend={{ value: "-5 completados", up: false }} />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-3 gap-5 mb-8">
        <Card className="col-span-2">
          <h3 className="font-semibold mb-4" style={{ color: colors.textPrimary }}>Ejecuciones de Sesiones VR – Últimos 30 Días</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={executionData}>
              <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: colors.textSecondary }} />
              <YAxis tick={{ fontSize: 11, fill: colors.textSecondary }} />
              <Tooltip
                contentStyle={{ backgroundColor: "white", border: `1px solid ${colors.border}`, borderRadius: 8, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                labelStyle={{ color: colors.textPrimary, fontWeight: 600 }}
              />
              <Line type="monotone" dataKey="sessions" stroke={colors.primary} strokeWidth={2.5} dot={{ r: 3, fill: colors.primary }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h3 className="font-semibold mb-4" style={{ color: colors.textPrimary }}>Sesiones por Empresa</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={companyData} layout="vertical" margin={{ left: -10 }}>
              <XAxis type="number" tick={{ fontSize: 10, fill: colors.textSecondary }} />
              <YAxis type="category" dataKey="company" width={100} tick={{ fontSize: 10, fill: colors.textSecondary }} />
              <Tooltip
                contentStyle={{ backgroundColor: "white", border: `1px solid ${colors.border}`, borderRadius: 8 }}
              />
              <Bar dataKey="sessions" fill={colors.secondary} radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-3 gap-5">
        {/* Top Simulations Table */}
        <Card className="col-span-2">
          <h3 className="font-semibold mb-4" style={{ color: colors.textPrimary }}>Simulaciones Más Ejecutadas</h3>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
                {["#", "Simulación", "Categoría", "Ejecuciones", "Tasa de Aprobación", "Estado"].map(h => (
                  <th key={h} className="pb-2 text-left text-xs font-semibold uppercase" style={{ color: colors.textSecondary }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {topSimulations.map(sim => (
                <tr
                  key={sim.rank}
                  className="transition-colors"
                  style={{ borderBottom: `1px solid ${colors.border}` }}
                  onMouseEnter={e => (e.currentTarget as HTMLTableRowElement).style.backgroundColor = "#F8FAFC"}
                  onMouseLeave={e => (e.currentTarget as HTMLTableRowElement).style.backgroundColor = ""}
                >
                  <td className="py-2.5 pr-3">
                    <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}>{sim.rank}</span>
                  </td>
                  <td className="py-2.5 font-medium pr-4" style={{ color: colors.textPrimary }}>{sim.name}</td>
                  <td className="py-2.5 pr-4 text-xs" style={{ color: colors.textSecondary }}>{sim.category}</td>
                  <td className="py-2.5 pr-4 font-semibold" style={{ color: colors.textPrimary }}>{sim.executions}</td>
                  <td className="py-2.5 pr-4">
                    <span className="font-semibold" style={{ color: sim.approvalRate >= 85 ? colors.success : sim.approvalRate >= 70 ? colors.warning : colors.error }}>
                      {sim.approvalRate}%
                    </span>
                  </td>
                  <td className="py-2.5"><StatusBadge status={sim.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        {/* Recent Activity */}
        <Card>
          <h3 className="font-semibold mb-4" style={{ color: colors.textPrimary }}>Actividad Reciente</h3>
          <div className="space-y-3">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: i < 2 ? colors.secondary : colors.border }} />
                <div>
                  <p className="text-xs" style={{ color: colors.textPrimary }}>{item.text}</p>
                  <p className="text-xs mt-0.5" style={{ color: colors.textSecondary }}>{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
