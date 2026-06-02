import { Users, Briefcase, Award, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { PageHeader, StatCard, StatusBadge, ProgressBar, colors, Card, Avatar } from "../shared";
import { useAuth } from "../../context/AuthContext";

const programData = [
  { name: "Fire Safety Q2", completion: 78 },
  { name: "LOTO Training", completion: 54 },
  { name: "Confined Spaces", completion: 91 },
  { name: "PPE Basics", completion: 100 },
  { name: "Chemical Safety", completion: 32 },
];

const failureData = [
  { name: "Energy LOTO", rate: 28 },
  { name: "Chemical Spill", rate: 24 },
  { name: "Confined Entry", rate: 19 },
  { name: "Fire Evac", rate: 13 },
  { name: "PPE Donning", rate: 8 },
];

const recentAssignments = [
  { name: "Juan Pérez", program: "Fire Safety Q2", date: "May 25, 2025", status: "in progress" },
  { name: "Ana Torres", program: "LOTO Training", date: "May 24, 2025", status: "completed" },
  { name: "Carlos Ruiz", program: "Chemical Safety", date: "May 23, 2025", status: "not started" },
  { name: "María López", program: "Confined Spaces", date: "May 22, 2025", status: "in progress" },
];

const pendingActions = [
  { name: "Roberto Silva", program: "Fire Safety Q2", daysLeft: 3 },
  { name: "Elena Vega", program: "LOTO Training", daysLeft: 5 },
  { name: "Pedro Rojas", program: "Chemical Safety", daysLeft: 6 },
];

export function CompanyDashboard() {
  const { user } = useAuth();

  return (
    <div>
      <PageHeader
        title={user?.company ?? "Company Dashboard"}
        subtitle="Overview of training activities and employee progress"
      />

      <div className="grid grid-cols-4 gap-5 mb-8">
        <StatCard label="Active Users" value="84" icon={<Users size={22} />} trend={{ value: "+5 this month", up: true }} />
        <StatCard label="Active Programs" value="7" icon={<Briefcase size={22} />} color={colors.secondary} />
        <StatCard label="Completion Rate" value="72%" icon={<TrendingUp size={22} />} trend={{ value: "+8% vs last month", up: true }} />
        <StatCard label="Certificates Issued" value="312" icon={<Award size={22} />} trend={{ value: "+28 this month", up: true }} />
      </div>

      <div className="grid grid-cols-3 gap-5 mb-6">
        {/* Programs bar chart */}
        <Card className="col-span-2">
          <h3 className="font-semibold mb-4" style={{ color: colors.textPrimary }}>Program Completion Overview</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={programData} layout="vertical" margin={{ left: 20 }}>
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10, fill: colors.textSecondary }} />
              <YAxis type="category" dataKey="name" width={110} tick={{ fontSize: 10, fill: colors.textSecondary }} />
              <Tooltip formatter={(v) => [`${v}%`, "Completion"]} contentStyle={{ backgroundColor: "white", border: `1px solid ${colors.border}`, borderRadius: 8 }} />
              <Bar dataKey="completion" fill={colors.primary} radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Pending actions */}
        <Card>
          <h3 className="font-semibold mb-4" style={{ color: colors.textPrimary }}>Pending Actions</h3>
          <p className="text-xs mb-3" style={{ color: colors.textSecondary }}>Employees with expiring deadlines</p>
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
                  {p.daysLeft}d left
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-3 gap-5">
        {/* Failure rate */}
        <Card>
          <h3 className="font-semibold mb-4" style={{ color: colors.textPrimary }}>Simulation Failure Rate</h3>
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
          <h3 className="font-semibold mb-4" style={{ color: colors.textPrimary }}>Recent Assignments</h3>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
                {["Employee", "Program", "Assigned", "Status"].map(h => (
                  <th key={h} className="pb-2 text-left text-xs font-semibold uppercase" style={{ color: colors.textSecondary }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentAssignments.map((a, i) => (
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
                  <td className="py-2.5 text-xs" style={{ color: colors.textSecondary }}>{a.date}</td>
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
