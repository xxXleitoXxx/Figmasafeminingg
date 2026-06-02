import { Download, Share2, Award } from "lucide-react";
import { PageHeader, colors, EmptyState } from "../shared";
import { useAuth } from "../../context/AuthContext";

const CERTIFICATES = [
  {
    id: 1,
    program: "PPE Basics Onboarding",
    company: "Minera Andina S.A.",
    completionDate: "March 31, 2025",
    score: 94,
    coordinator: "Elena Vega",
  },
  {
    id: 2,
    program: "Introduction to Mine Safety",
    company: "Minera Andina S.A.",
    completionDate: "December 15, 2024",
    score: 88,
    coordinator: "Roberto Silva",
  },
];

export function MyCertificates() {
  const { user } = useAuth();

  return (
    <div>
      <PageHeader title="My Certificates" subtitle={`${CERTIFICATES.length} certificates earned`} />

      {CERTIFICATES.length === 0 ? (
        <EmptyState
          title="No certificates yet"
          subtitle="Complete a training program to earn your first certificate of achievement."
        />
      ) : (
        <div className="grid grid-cols-2 gap-5">
          {CERTIFICATES.map(cert => (
            <div
              key={cert.id}
              className="bg-white rounded-2xl shadow-sm overflow-hidden border-2"
              style={{ borderColor: colors.primary }}
            >
              {/* Certificate header stripe */}
              <div className="h-1.5" style={{ background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})` }} />

              <div className="p-6">
                {/* Logo + branding */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white" style={{ backgroundColor: colors.secondary }}>⛏</div>
                    <div>
                      <div className="text-xs font-bold leading-tight" style={{ color: colors.primary }}>SafeMining VR</div>
                      <div className="text-xs" style={{ color: colors.textSecondary }}>Training Platform</div>
                    </div>
                  </div>
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${colors.success}15` }}
                  >
                    <Award size={20} style={{ color: colors.success }} />
                  </div>
                </div>

                {/* Certificate body */}
                <div
                  className="text-center p-5 rounded-xl mb-5"
                  style={{ border: `1px dashed ${colors.border}`, backgroundColor: colors.bg }}
                >
                  <p className="text-xs uppercase tracking-widest mb-1" style={{ color: colors.textSecondary }}>Certificate of Completion</p>
                  <p className="text-base font-bold mb-1" style={{ color: colors.textPrimary }}>{user?.name ?? "Employee"}</p>
                  <p className="text-xs mb-3" style={{ color: colors.textSecondary }}>has successfully completed</p>
                  <p className="text-sm font-semibold" style={{ color: colors.primary }}>{cert.program}</p>
                </div>

                {/* Meta */}
                <div className="grid grid-cols-2 gap-3 text-xs mb-5">
                  <div>
                    <p style={{ color: colors.textSecondary }}>Company</p>
                    <p className="font-medium" style={{ color: colors.textPrimary }}>{cert.company}</p>
                  </div>
                  <div>
                    <p style={{ color: colors.textSecondary }}>Completion Date</p>
                    <p className="font-medium" style={{ color: colors.textPrimary }}>{cert.completionDate}</p>
                  </div>
                  <div>
                    <p style={{ color: colors.textSecondary }}>Final Score</p>
                    <p className="font-semibold" style={{ color: colors.success }}>{cert.score}/100</p>
                  </div>
                  <div>
                    <p style={{ color: colors.textSecondary }}>Coordinator</p>
                    <p className="font-medium" style={{ color: colors.textPrimary }}>{cert.coordinator}</p>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center gap-2 pt-4 border-t" style={{ borderColor: colors.border }}>
                  <button
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white"
                    style={{ backgroundColor: colors.primary }}
                  >
                    <Download size={15} /> Download PDF
                  </button>
                  <button
                    className="p-2.5 rounded-xl border"
                    style={{ borderColor: colors.border, color: colors.textSecondary }}
                  >
                    <Share2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
