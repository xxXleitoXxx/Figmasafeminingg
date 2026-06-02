import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Download, ChevronDown, ChevronUp } from "lucide-react";
import { Breadcrumb, PageHeader, StatusBadge, ProgressBar, Avatar, colors, Card } from "../shared";

const EMPLOYEES = [
  {
    id: 1, name: "Juan Pérez", status: "in progress", progress: 65, sessions: 4, exams: 1, lastActivity: "May 25, 2025", hasCert: false,
    details: [
      { name: "Fire Evacuation – Underground", type: "VR Sim", status: "approved", attempts: 2, bestScore: 88, lastAttempt: "May 22, 2025" },
      { name: "Fire Safety Theory Exam", type: "Exam", status: "in progress", attempts: 1, bestScore: 64, lastAttempt: "May 25, 2025" },
    ]
  },
  {
    id: 2, name: "Ana Torres", status: "completed", progress: 100, sessions: 5, exams: 2, lastActivity: "May 20, 2025", hasCert: true,
    details: [
      { name: "Fire Evacuation – Underground", type: "VR Sim", status: "approved", attempts: 1, bestScore: 94, lastAttempt: "May 18, 2025" },
      { name: "Fire Safety Theory Exam", type: "Exam", status: "approved", attempts: 1, bestScore: 87, lastAttempt: "May 20, 2025" },
    ]
  },
  {
    id: 3, name: "Carlos Ruiz", status: "not started", progress: 0, sessions: 0, exams: 0, lastActivity: "—", hasCert: false,
    details: [
      { name: "Fire Evacuation – Underground", type: "VR Sim", status: "pending", attempts: 0, bestScore: null, lastAttempt: "—" },
      { name: "Fire Safety Theory Exam", type: "Exam", status: "locked", attempts: 0, bestScore: null, lastAttempt: "—" },
    ]
  },
  {
    id: 4, name: "María López", status: "failed", progress: 40, sessions: 3, exams: 3, lastActivity: "May 19, 2025", hasCert: false,
    details: [
      { name: "Fire Evacuation – Underground", type: "VR Sim", status: "approved", attempts: 2, bestScore: 76, lastAttempt: "May 15, 2025" },
      { name: "Fire Safety Theory Exam", type: "Exam", status: "rejected", attempts: 3, bestScore: 58, lastAttempt: "May 19, 2025" },
    ]
  },
];

export function EmployeeProgress() {
  const navigate = useNavigate();
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <div>
      <Breadcrumb items={[
        { label: "Programs", onClick: () => navigate("/company/programs") },
        { label: "Fire Safety & Evacuation Q2 2025", onClick: () => navigate("/company/programs") },
        { label: "Employee Progress" }
      ]} />

      <PageHeader
        title="Employee Progress"
        subtitle="Fire Safety & Evacuation Q2 2025"
      />

      <div className="bg-white rounded-xl border overflow-hidden shadow-sm" style={{ borderColor: colors.border }}>
        <table className="w-full text-sm">
          <thead style={{ backgroundColor: colors.bg, borderBottom: `1px solid ${colors.border}` }}>
            <tr>
              {["Employee", "Status", "Progress", "VR Sessions", "Exams", "Last Activity", "Certificate", "Actions"].map(h => (
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
                      <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: colors.textSecondary }}>Progress Details</p>
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
                            <span className="text-xs" style={{ color: colors.textSecondary }}>{d.attempts} attempt{d.attempts !== 1 ? "s" : ""}</span>
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
