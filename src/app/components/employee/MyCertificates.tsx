import { Download, Share2, Award } from "lucide-react";
import { PageHeader, colors, EmptyState } from "../shared";
import { useAuth } from "../../context/AuthContext";

const CERTIFICATES = [
  {
    id: 1,
    program: "Inducción Básica de EPP",
    company: "Minera Andina S.A.",
    completionDate: "31 de marzo, 2025",
    score: 94,
    coordinator: "Elena Vega",
  },
  {
    id: 2,
    program: "Introducción a la Seguridad Minera",
    company: "Minera Andina S.A.",
    completionDate: "15 de diciembre, 2024",
    score: 88,
    coordinator: "Roberto Silva",
  },
];

export function MyCertificates() {
  const { user } = useAuth();

  return (
    <div>
      <PageHeader title="Mis Certificados" subtitle={`${CERTIFICATES.length} certificados obtenidos`} />

      {CERTIFICATES.length === 0 ? (
        <EmptyState
          title="Aún no hay certificados"
          subtitle="Completa un programa de entrenamiento para obtener tu primer certificado de logro."
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
                      <div className="text-xs" style={{ color: colors.textSecondary }}>Plataforma de Entrenamiento</div>
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
                  <p className="text-xs uppercase tracking-widest mb-1" style={{ color: colors.textSecondary }}>Certificado de Finalización</p>
                  <p className="text-base font-bold mb-1" style={{ color: colors.textPrimary }}>{user?.name ?? "Empleado"}</p>
                  <p className="text-xs mb-3" style={{ color: colors.textSecondary }}>ha completado exitosamente</p>
                  <p className="text-sm font-semibold" style={{ color: colors.primary }}>{cert.program}</p>
                </div>

                {/* Meta */}
                <div className="grid grid-cols-2 gap-3 text-xs mb-5">
                  <div>
                    <p style={{ color: colors.textSecondary }}>Empresa</p>
                    <p className="font-medium" style={{ color: colors.textPrimary }}>{cert.company}</p>
                  </div>
                  <div>
                    <p style={{ color: colors.textSecondary }}>Fecha de Finalización</p>
                    <p className="font-medium" style={{ color: colors.textPrimary }}>{cert.completionDate}</p>
                  </div>
                  <div>
                    <p style={{ color: colors.textSecondary }}>Puntuación Final</p>
                    <p className="font-semibold" style={{ color: colors.success }}>{cert.score}/100</p>
                  </div>
                  <div>
                    <p style={{ color: colors.textSecondary }}>Coordinador</p>
                    <p className="font-medium" style={{ color: colors.textPrimary }}>{cert.coordinator}</p>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center gap-2 pt-4 border-t" style={{ borderColor: colors.border }}>
                  <button
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white"
                    style={{ backgroundColor: colors.primary }}
                  >
                    <Download size={15} /> Descargar PDF
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
