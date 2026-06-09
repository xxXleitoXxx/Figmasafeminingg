import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { Download, FileText } from "lucide-react";
import { TextField } from "@mui/material";
import { PageHeader, StatusBadge, ProgressBar, colors, Card } from "../shared";
import { Avatar } from "../shared";

const employeeData = [
  { name: "Ana Torres", sessions: 8, approved: 7, rate: 87, certs: 2 },
  { name: "Juan Pérez", sessions: 6, approved: 4, rate: 67, certs: 1 },
  { name: "María López", sessions: 5, approved: 3, rate: 60, certs: 1 },
  { name: "Roberto Silva", sessions: 12, approved: 11, rate: 92, certs: 3 },
  { name: "Elena Vega", sessions: 9, approved: 8, rate: 89, certs: 2 },
];

const programData = [
  { name: "Seguridad de Incendios Q2 2025", enrolled: 24, completed: 18, rate: 75 },
  { name: "Procedimientos LOTO", enrolled: 18, completed: 10, rate: 56 },
  { name: "Entrada a Espacio Confinado", enrolled: 12, completed: 11, rate: 92 },
  { name: "Inducción Básica de EPP", enrolled: 31, completed: 31, rate: 100 },
];

const simTrend = [
  { date: "2025-01-01", month: "Ene", sessions: 45 }, { date: "2025-02-01", month: "Feb", sessions: 52 }, { date: "2025-03-01", month: "Mar", sessions: 61 },
  { date: "2025-04-01", month: "Abr", sessions: 48 }, { date: "2025-05-01", month: "May", sessions: 77 },
];

export function CompanyReports() {
  const [activeTab, setActiveTab] = useState("employee");
  const [startDate, setStartDate] = useState("2025-01-01");
  const [endDate, setEndDate] = useState("2025-05-31");

  const filteredSimTrend = simTrend.filter(d => {
    if (startDate && d.date < startDate) return false;
    if (endDate && d.date > endDate) return false;
    return true;
  });

  return (
    <div>
      <PageHeader
        title="Reportes de Empresa"
        subtitle="Análisis de entrenamiento para Minera Andina S.A."
        actions={
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium" style={{ borderColor: colors.border, color: colors.textSecondary }}>
              <Download size={16} /> Exportar CSV
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium" style={{ borderColor: colors.border, color: colors.textSecondary }}>
              <FileText size={16} /> Exportar PDF
            </button>
          </div>
        }
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

      {/* Summary */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: "Sesiones Totales", value: "245", color: colors.primary },
          { label: "Tasa de Aprobación", value: "81%", color: colors.success },
          { label: "Programas Activos", value: "7", color: colors.secondary },
          { label: "Certificados Emitidos", value: "89", color: "#8B5CF6" },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border p-5 shadow-sm" style={{ borderColor: colors.border }}>
            <div className="text-3xl font-bold mb-1" style={{ color: s.color }}>{s.value}</div>
            <div className="text-sm" style={{ color: colors.textSecondary }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Trend chart */}
      <Card className="mb-6">
        <h3 className="font-semibold mb-4" style={{ color: colors.textPrimary }}>Tendencia Mensual de Sesiones</h3>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={filteredSimTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: colors.textSecondary }} />
            <YAxis tick={{ fontSize: 11, fill: colors.textSecondary }} />
            <Tooltip contentStyle={{ backgroundColor: "white", border: `1px solid ${colors.border}`, borderRadius: 8 }} />
            <Line type="monotone" dataKey="sessions" stroke={colors.primary} strokeWidth={2.5} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Tabs */}
      <div className="flex gap-1 mb-5 p-1 bg-white rounded-xl border w-fit" style={{ borderColor: colors.border }}>
        {[{ key: "employee", label: "Por Empleado" }, { key: "program", label: "Por Programa" }, { key: "simulation", label: "Por Simulación" }].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            style={{ backgroundColor: activeTab === tab.key ? colors.primary : "transparent", color: activeTab === tab.key ? "white" : colors.textSecondary }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "employee" && (
        <Card>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
                {["Empleado", "Sesiones", "Aprobados", "Tasa de Aprobación", "Certificados"].map(h => (
                  <th key={h} className="pb-2 text-left text-xs font-semibold uppercase tracking-wide" style={{ color: colors.textSecondary }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {employeeData.map((e, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${colors.border}` }}
                  onMouseEnter={el => (el.currentTarget as HTMLTableRowElement).style.backgroundColor = "#F8FAFC"}
                  onMouseLeave={el => (el.currentTarget as HTMLTableRowElement).style.backgroundColor = ""}>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <Avatar name={e.name} size={28} />
                      <span className="font-medium" style={{ color: colors.textPrimary }}>{e.name}</span>
                    </div>
                  </td>
                  <td className="py-3 font-semibold" style={{ color: colors.textPrimary }}>{e.sessions}</td>
                  <td className="py-3" style={{ color: colors.success }}>{e.approved}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <ProgressBar value={e.rate} color={e.rate >= 80 ? colors.success : e.rate >= 60 ? colors.warning : colors.error} />
                      <span className="text-xs font-semibold w-10" style={{ color: e.rate >= 80 ? colors.success : e.rate >= 60 ? colors.warning : colors.error }}>{e.rate}%</span>
                    </div>
                  </td>
                  <td className="py-3 font-semibold" style={{ color: "#8B5CF6" }}>{e.certs}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      {activeTab === "program" && (
        <Card>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
                {["Programa", "Inscritos", "Completados", "Tasa de Finalización"].map(h => (
                  <th key={h} className="pb-2 text-left text-xs font-semibold uppercase tracking-wide" style={{ color: colors.textSecondary }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {programData.map((p, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${colors.border}` }}>
                  <td className="py-3 font-medium" style={{ color: colors.textPrimary }}>{p.name}</td>
                  <td className="py-3" style={{ color: colors.textSecondary }}>{p.enrolled}</td>
                  <td className="py-3" style={{ color: colors.success }}>{p.completed}</td>
                  <td className="py-3 w-48">
                    <div className="flex items-center gap-2">
                      <div className="flex-1"><ProgressBar value={p.rate} color={p.rate === 100 ? colors.success : colors.primary} /></div>
                      <span className="text-xs font-semibold" style={{ color: colors.textPrimary }}>{p.rate}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      {activeTab === "simulation" && (
        <Card>
          <h3 className="font-semibold mb-4" style={{ color: colors.textPrimary }}>Sesiones por Simulación</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={[
              { name: "Evac Incendios", sessions: 98 },
              { name: "LOTO Energía", sessions: 72 },
              { name: "Espacio Confinado", sessions: 48 },
              { name: "Derrame Químico", sessions: 27 },
            ]} layout="vertical" margin={{ left: 20 }}>
              <XAxis type="number" tick={{ fontSize: 11, fill: colors.textSecondary }} />
              <YAxis type="category" dataKey="name" width={100} tick={{ fontSize: 11, fill: colors.textSecondary }} />
              <Tooltip contentStyle={{ backgroundColor: "white", border: `1px solid ${colors.border}`, borderRadius: 8 }} />
              <Bar dataKey="sessions" fill={colors.primary} radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      )}
    </div>
  );
}
