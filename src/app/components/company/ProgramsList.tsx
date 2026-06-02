import { useState } from "react";
import { useNavigate } from "react-router";
import { Plus, Copy, Calendar, Users, Play, FileText } from "lucide-react";
import { PageHeader, PrimaryBtn, OutlinedBtn, StatusBadge, ProgressBar, colors } from "../shared";

const PROGRAMS = [
  {
    id: 1, name: "Fire Safety & Evacuation Q2 2025", status: "active", created: "Apr 1, 2025",
    coordinator: "Roberto Silva", simulations: 3, exams: 1, enrolled: 24, completion: 78,
    startDate: "Apr 1, 2025", endDate: "Jun 30, 2025"
  },
  {
    id: 2, name: "LOTO Procedures – Level 2", status: "active", created: "Mar 15, 2025",
    coordinator: "Elena Vega", simulations: 2, exams: 2, enrolled: 18, completion: 54,
    startDate: "Mar 15, 2025", endDate: "May 31, 2025"
  },
  {
    id: 3, name: "Confined Space Entry Protocol", status: "active", created: "Jan 10, 2025",
    coordinator: "Roberto Silva", simulations: 4, exams: 1, enrolled: 12, completion: 91,
    startDate: "Jan 10, 2025", endDate: "Jul 31, 2025"
  },
  {
    id: 4, name: "PPE Basics Onboarding", status: "completed", created: "Feb 1, 2025",
    coordinator: "Elena Vega", simulations: 1, exams: 1, enrolled: 31, completion: 100,
    startDate: "Feb 1, 2025", endDate: "Mar 31, 2025"
  },
  {
    id: 5, name: "Chemical Handling Safety", status: "draft", created: "May 20, 2025",
    coordinator: "Roberto Silva", simulations: 2, exams: 1, enrolled: 0, completion: 0,
    startDate: "Jun 1, 2025", endDate: "Aug 31, 2025"
  },
];

const STATUS_COLORS: Record<string, string> = { active: colors.primary, completed: colors.success, draft: "#94A3B8", closed: "#6B7280" };

export function ProgramsList() {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = PROGRAMS.filter(p => statusFilter === "all" || p.status === statusFilter);

  return (
    <div>
      <PageHeader
        title="Training Programs"
        subtitle={`${PROGRAMS.length} programs`}
        actions={
          <div className="flex gap-2">
            <OutlinedBtn onClick={() => {}}><Copy size={16} /> Clone Program</OutlinedBtn>
            <PrimaryBtn onClick={() => navigate("/company/programs/new")}><Plus size={16} /> New Program</PrimaryBtn>
          </div>
        }
      />

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {["all", "draft", "active", "completed", "closed"].map(s => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className="px-3 py-1.5 rounded-lg text-sm font-medium capitalize"
            style={{ backgroundColor: statusFilter === s ? colors.primary : "white", color: statusFilter === s ? "white" : colors.textSecondary, border: `1px solid ${statusFilter === s ? colors.primary : colors.border}` }}
          >
            {s === "all" ? "All Programs" : s}
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
                    <span className="text-xs" style={{ color: colors.textSecondary }}>Created {prog.created}</span>
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
                  <span>{prog.simulations} simulations</span>
                </div>
                <div className="flex items-center gap-1.5" style={{ color: colors.textSecondary }}>
                  <FileText size={12} />
                  <span>{prog.exams} exams</span>
                </div>
              </div>

              {/* Enrollment + Progress */}
              <div className="flex items-center justify-between mb-1.5 text-xs">
                <span style={{ color: colors.textSecondary }}>{prog.enrolled} employees enrolled</span>
                <span className="font-semibold" style={{ color: colors.textPrimary }}>{prog.completion}% complete</span>
              </div>
              <ProgressBar value={prog.completion} color={STATUS_COLORS[prog.status]} />

              {/* Actions */}
              <div className="flex gap-2 mt-4 flex-wrap">
                {prog.status === "draft" && (
                  <button
                    onClick={() => navigate(`/company/programs/${prog.id}`)}
                    className="px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors"
                    style={{ borderColor: colors.border, color: colors.textSecondary }}
                  >
                    Edit
                  </button>
                )}
                {prog.status !== "closed" && (
                  <button
                    onClick={() => navigate(`/company/programs/${prog.id}/assign`)}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium text-white"
                    style={{ backgroundColor: colors.secondary }}
                  >
                    Assign
                  </button>
                )}
                <button
                  onClick={() => navigate(`/company/programs/${prog.id}/progress`)}
                  className="px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors"
                  style={{ borderColor: colors.border, color: colors.textSecondary }}
                >
                  View Progress
                </button>
                {prog.status === "active" && (
                  <button className="px-3 py-1.5 rounded-lg border text-xs font-medium" style={{ borderColor: colors.error, color: colors.error }}>
                    Close
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
