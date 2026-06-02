import { useNavigate, useParams } from "react-router";
import { Play, FileText, Lock, Award, CheckCircle, Clock } from "lucide-react";
import { Breadcrumb, StatusBadge, ProgressBar, colors, Card } from "../shared";

const PROGRAM = {
  name: "Fire Safety & Evacuation Q2 2025",
  description: "Comprehensive fire safety training covering evacuation procedures, fire extinguisher use, and emergency response protocols.",
  status: "in progress",
  startDate: "Apr 1, 2025",
  endDate: "Jun 30, 2025",
  coordinator: "Roberto Silva",
  overallProgress: 65,
  content: [
    { id: 1, type: "simulation", name: "Fire Evacuation – Underground", status: "approved", attempts: 2, maxAttempts: 3, bestScore: 88, locked: false },
    { id: 2, type: "simulation", name: "Chemical Spill Response", status: "in progress", attempts: 1, maxAttempts: 3, bestScore: 62, locked: false },
    { id: 3, type: "exam", name: "Fire Safety Theory Exam", status: "pending", attempts: 0, maxAttempts: 3, bestScore: null, locked: false },
    { id: 4, type: "simulation", name: "Surface Fire Evacuation", status: "locked", attempts: 0, maxAttempts: 3, bestScore: null, locked: true },
    { id: 5, type: "exam", name: "Final Assessment", status: "locked", attempts: 0, maxAttempts: 2, bestScore: null, locked: true },
  ],
};

function ScoreCircle({ score, size = 96 }: { score: number; size?: number }) {
  const r = (size - 8) / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 75 ? colors.success : colors.error;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={colors.border} strokeWidth={6} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={6}
          strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" />
      </svg>
      <span className="absolute font-bold text-xl" style={{ color }}>{score}%</span>
    </div>
  );
}

export function ProgramDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const allMandatoryApproved = PROGRAM.content
    .filter(c => !c.locked)
    .every(c => c.status === "approved");

  return (
    <div>
      <Breadcrumb items={[
        { label: "My Training", onClick: () => navigate("/employee") },
        { label: PROGRAM.name }
      ]} />

      <div className="grid grid-cols-3 gap-6 mb-6">
        <Card className="col-span-2">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-xl font-bold mb-2" style={{ color: colors.textPrimary }}>{PROGRAM.name}</h1>
              <p className="text-sm mb-3" style={{ color: colors.textSecondary }}>{PROGRAM.description}</p>
              <div className="flex items-center gap-4 text-xs" style={{ color: colors.textSecondary }}>
                <div className="flex items-center gap-1"><Clock size={12} /> {PROGRAM.startDate} → {PROGRAM.endDate}</div>
                <div>Coordinator: <span className="font-medium">{PROGRAM.coordinator}</span></div>
                <StatusBadge status={PROGRAM.status} />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1">
              <div className="flex justify-between text-xs mb-1">
                <span style={{ color: colors.textSecondary }}>Overall Progress</span>
                <span className="font-semibold" style={{ color: colors.textPrimary }}>{PROGRAM.overallProgress}%</span>
              </div>
              <ProgressBar value={PROGRAM.overallProgress} color={colors.primary} />
            </div>
          </div>
        </Card>

        <Card className="flex flex-col items-center justify-center">
          <ScoreCircle score={PROGRAM.overallProgress} size={100} />
          <p className="text-sm font-medium mt-3" style={{ color: colors.textPrimary }}>Overall Completion</p>
          <p className="text-xs mt-1" style={{ color: colors.textSecondary }}>
            {PROGRAM.content.filter(c => c.status === "approved").length} of {PROGRAM.content.filter(c => !c.locked).length} items completed
          </p>
        </Card>
      </div>

      {/* Content List */}
      <Card className="mb-6">
        <h3 className="font-semibold mb-4" style={{ color: colors.textPrimary }}>Training Content</h3>
        <div className="space-y-3">
          {PROGRAM.content.map((item, i) => (
            <div
              key={item.id}
              className="flex items-center gap-4 p-4 rounded-xl border"
              style={{ borderColor: item.locked ? colors.border : item.status === "approved" ? `${colors.success}30` : colors.border, opacity: item.locked ? 0.6 : 1, backgroundColor: item.status === "approved" ? `${colors.success}05` : "white" }}
            >
              {/* Order number */}
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0"
                style={{ backgroundColor: item.status === "approved" ? colors.success : item.locked ? colors.border : `${colors.primary}15`, color: item.status === "approved" ? "white" : item.locked ? colors.textSecondary : colors.primary }}
              >
                {item.status === "approved" ? <CheckCircle size={14} /> : i + 1}
              </div>

              {/* Icon */}
              <div className="p-2 rounded-lg flex-shrink-0" style={{ backgroundColor: item.type === "simulation" ? `${colors.primary}10` : `${colors.secondary}10` }}>
                {item.type === "simulation"
                  ? <Play size={16} style={{ color: item.locked ? colors.textSecondary : colors.primary }} />
                  : <FileText size={16} style={{ color: item.locked ? colors.textSecondary : colors.secondary }} />
                }
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-sm" style={{ color: item.locked ? colors.textSecondary : colors.textPrimary }}>{item.name}</p>
                  <span className="text-xs px-1.5 py-0.5 rounded capitalize" style={{ backgroundColor: colors.bg, color: colors.textSecondary }}>{item.type}</span>
                </div>
                <div className="flex items-center gap-3 mt-1 text-xs" style={{ color: colors.textSecondary }}>
                  {item.locked ? (
                    <span>Complete previous items first</span>
                  ) : (
                    <>
                      <span>{item.attempts}/{item.maxAttempts} attempts used</span>
                      {item.bestScore !== null && (
                        <span className="font-semibold" style={{ color: item.bestScore >= 75 ? colors.success : colors.error }}>
                          Best: {item.bestScore}/100
                        </span>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Status + Action */}
              <div className="flex items-center gap-3 flex-shrink-0">
                <StatusBadge status={item.status} />
                {item.locked ? (
                  <div className="p-1.5 rounded-lg" style={{ backgroundColor: colors.bg }}>
                    <Lock size={14} style={{ color: colors.textSecondary }} />
                  </div>
                ) : item.attempts >= item.maxAttempts && item.status !== "approved" ? (
                  <span className="text-xs px-3 py-1.5 rounded-lg" style={{ backgroundColor: `${colors.error}15`, color: colors.error }}>No attempts left</span>
                ) : item.type === "simulation" ? (
                  <button
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white"
                    style={{ backgroundColor: colors.primary }}
                    onClick={() => {}}
                  >
                    <Play size={14} /> Launch VR
                  </button>
                ) : (
                  <button
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white"
                    style={{ backgroundColor: colors.secondary }}
                    onClick={() => navigate(`/employee/exam/${item.id}`)}
                  >
                    <FileText size={14} /> Take Exam
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Certificate panel */}
      <Card>
        <div className="flex items-center gap-4">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: allMandatoryApproved ? `${colors.success}15` : colors.bg }}
          >
            {allMandatoryApproved ? (
              <Award size={28} style={{ color: colors.success }} />
            ) : (
              <Lock size={24} style={{ color: colors.textSecondary }} />
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold" style={{ color: allMandatoryApproved ? colors.success : colors.textPrimary }}>
              {allMandatoryApproved ? "Certificate Available!" : "Your Certificate"}
            </h3>
            <p className="text-sm" style={{ color: colors.textSecondary }}>
              {allMandatoryApproved
                ? "Congratulations! You've completed all mandatory items."
                : "Complete all mandatory items to unlock your certificate of completion."}
            </p>
          </div>
          {allMandatoryApproved && (
            <button
              onClick={() => navigate("/employee/certificates")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-white"
              style={{ backgroundColor: colors.success }}
            >
              <Award size={16} /> Download Certificate
            </button>
          )}
        </div>
      </Card>
    </div>
  );
}
