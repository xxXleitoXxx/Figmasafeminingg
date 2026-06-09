import { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Download, FileText } from "lucide-react";
import { PageHeader, StatusBadge, colors, Card } from "../shared";
import { TextField } from "@mui/material";

const sessionData = [
  { month: "Nov", sessions: 280, date: "2024-11-01" }, { month: "Dic", sessions: 320, date: "2024-12-01" }, { month: "Ene", sessions: 410, date: "2025-01-01" },
  { month: "Feb", sessions: 380, date: "2025-02-01" }, { month: "Mar", sessions: 450, date: "2025-03-01" }, { month: "Abr", sessions: 520, date: "2025-04-01" },
  { month: "May", sessions: 495, date: "2025-05-01" },
];

const companyPerf = [
  { company: "Minera Andina S.A.", sessions: 245, approved: 198, rejected: 47, rate: 81, avgAttempts: 1.4 },
  { company: "Codelco Norte", sessions: 198, approved: 172, rejected: 26, rate: 87, avgAttempts: 1.2 },
  { company: "Gold Field Chile", sessions: 167, approved: 142, rejected: 25, rate: 85, avgAttempts: 1.5 },
  { company: "Antofagasta PLC", sessions: 134, approved: 98, rejected: 36, rate: 73, avgAttempts: 1.8 },
  { company: "Anglo American", sessions: 98, approved: 88, rejected: 10, rate: 90, avgAttempts: 1.1 },
];

export function GlobalReports() {
  const [startDate, setStartDate] = useState("2024-11-01");
  const [endDate, setEndDate] = useState("2025-05-31");

  const filteredSessionData = sessionData.filter(d => {
    if (startDate && d.date < startDate) return false;
    if (endDate && d.date > endDate) return false;
    return true;
  });

  return (
    <div>
      <PageHeader
        title="Reportes Globales"
        subtitle="Métricas de rendimiento y análisis de toda la plataforma"
        actions={
          <div className="flex gap-2">
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-colors"
              style={{ borderColor: colors.border, color: colors.textSecondary }}
            >
              <Download size={16} /> Exportar CSV
            </button>
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-colors"
              style={{ borderColor: colors.border, color: colors.textSecondary }}
            >
              <FileText size={16} /> Exportar PDF
            </button>
          </div>
        }
      />

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
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium" style={{ color: colors.textSecondary }}>Empresa</label>
          <select className="px-3 py-1.5 rounded-lg border text-sm outline-none" style={{ borderColor: colors.border }}>
            <option>Todas las empresas</option>
            <option>Minera Andina S.A.</option>
            <option>Codelco Norte</option>
            <option>Gold Field Chile</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium" style={{ color: colors.textSecondary }}>Categoría</label>
          <select className="px-3 py-1.5 rounded-lg border text-sm outline-none" style={{ borderColor: colors.border }}>
            <option>Todas las categorías</option>
            <option>Evacuación de Incendios</option>
            <option>Bloqueo de Energía</option>
            <option>Espacios Confinados</option>
          </select>
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: "Sesiones Totales", value: "2,855", color: colors.primary },
          { label: "Tasa de Aprobación", value: "83.6%", color: colors.success },
          { label: "Empresas Activas", value: "24", color: colors.secondary },
          { label: "Certificados Emitidos", value: "1,428", color: "#8B5CF6" },
        ].map(stat => (
          <div key={stat.label} className="bg-white rounded-xl border p-5 shadow-sm" style={{ borderColor: colors.border }}>
            <div className="text-3xl font-bold mb-1" style={{ color: stat.color }}>{stat.value}</div>
            <div className="text-sm" style={{ color: colors.textSecondary }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Area Chart */}
      <Card className="mb-6">
        <h3 className="font-semibold mb-4" style={{ color: colors.textPrimary }}>Ejecuciones de Simulación – Últimos 7 Meses</h3>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={filteredSessionData}>
            <defs>
              <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colors.primary} stopOpacity={0.3} />
                <stop offset="95%" stopColor={colors.primary} stopOpacity={0.03} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: colors.textSecondary }} />
            <YAxis tick={{ fontSize: 12, fill: colors.textSecondary }} />
            <Tooltip contentStyle={{ backgroundColor: "white", border: `1px solid ${colors.border}`, borderRadius: 8, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
            <Area type="monotone" dataKey="sessions" stroke={colors.primary} strokeWidth={2.5} fill="url(#grad)" />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      {/* Performance table */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold" style={{ color: colors.textPrimary }}>Rendimiento por Empresa</h3>
          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium" style={{ borderColor: colors.border, color: colors.textSecondary }}>
              <Download size={13} /> CSV
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium" style={{ borderColor: colors.border, color: colors.textSecondary }}>
              <FileText size={13} /> PDF
            </button>
          </div>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
              {["Empresa", "Sesiones", "Aprobados", "Rechazados", "Tasa de Aprobación", "Intentos Promedio"].map(h => (
                <th key={h} className="pb-2 text-left text-xs font-semibold uppercase tracking-wide" style={{ color: colors.textSecondary }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {companyPerf.map((c, i) => (
              <tr
                key={i}
                style={{ borderBottom: `1px solid ${colors.border}` }}
                onMouseEnter={e => (e.currentTarget as HTMLTableRowElement).style.backgroundColor = "#F8FAFC"}
                onMouseLeave={e => (e.currentTarget as HTMLTableRowElement).style.backgroundColor = ""}
              >
                <td className="py-3 font-medium" style={{ color: colors.textPrimary }}>{c.company}</td>
                <td className="py-3 font-semibold" style={{ color: colors.textPrimary }}>{c.sessions}</td>
                <td className="py-3" style={{ color: colors.success }}>{c.approved}</td>
                <td className="py-3" style={{ color: colors.error }}>{c.rejected}</td>
                <td className="py-3">
                  <span className="font-semibold" style={{ color: c.rate >= 85 ? colors.success : c.rate >= 70 ? colors.warning : colors.error }}>
                    {c.rate}%
                  </span>
                </td>
                <td className="py-3" style={{ color: colors.textSecondary }}>{c.avgAttempts.toFixed(1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
