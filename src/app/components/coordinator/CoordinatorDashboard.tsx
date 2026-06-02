import { useNavigate } from "react-router";
import { Briefcase, Users, TrendingUp, Award, AlertTriangle } from "lucide-react";
import { PageHeader, StatCard, StatusBadge, ProgressBar, colors, Card, Avatar } from "../shared";
import { useAuth } from "../../context/AuthContext";

const MY_PROGRAMS = [
  { id: 1, name: "Fire Safety & Evacuation Q2 2025", status: "active", completion: 78, enrolled: 24 },
  { id: 2, name: "LOTO Procedures – Level 2", status: "active", completion: 54, enrolled: 18 },
  { id: 3, name: "Confined Space Entry Protocol", status: "active", completion: 91, enrolled: 12 },
];

const ATTENTION_NEEDED = [
  { name: "María López", issue: "Failed exam 3 times", program: "LOTO Procedures", urgency: "high" },
  { name: "Carlos Ruiz", issue: "Not started yet", program: "Fire Safety Q2", urgency: "medium" },
  { name: "Pedro Rojas", issue: "3 days until deadline", program: "Confined Space", urgency: "high" },
  { name: "Elena Torres", issue: "5 days until deadline", program: "Fire Safety Q2", urgency: "medium" },
];

export function CoordinatorDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div>
      <PageHeader title={`Welcome, ${user?.name}`} subtitle="Your active programs and employee status at a glance" />

      <div className="grid grid-cols-4 gap-5 mb-8">
        <StatCard label="My Programs" value="3" icon={<Briefcase size={22} />} />
        <StatCard label="Total Employees" value="54" icon={<Users size={22} />} color={colors.secondary} />
        <StatCard label="Avg Completion" value="74%" icon={<TrendingUp size={22} />} trend={{ value: "+6% this month", up: true }} />
        <StatCard label="Certificates Issued" value="89" icon={<Award size={22} />} trend={{ value: "+12 this month", up: true }} />
      </div>

      <div className="grid grid-cols-3 gap-5">
        {/* My Programs */}
        <Card className="col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold" style={{ color: colors.textPrimary }}>My Programs</h3>
            <button onClick={() => navigate("/coordinator/programs")} className="text-sm font-medium hover:underline" style={{ color: colors.primary }}>
              View all →
            </button>
          </div>
          <div className="space-y-4">
            {MY_PROGRAMS.map(prog => (
              <div
                key={prog.id}
                onClick={() => navigate("/coordinator/programs")}
                className="p-4 rounded-xl border cursor-pointer transition-colors hover:border-blue-200"
                style={{ borderColor: colors.border }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-medium text-sm" style={{ color: colors.textPrimary }}>{prog.name}</p>
                    <p className="text-xs mt-0.5" style={{ color: colors.textSecondary }}>{prog.enrolled} employees enrolled</p>
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
            <h3 className="font-semibold" style={{ color: colors.textPrimary }}>Needs Attention</h3>
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
