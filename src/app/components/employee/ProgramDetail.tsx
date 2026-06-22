import { useNavigate, useParams } from "react-router";
import {
  Play,
  FileText,
  Lock,
  Award,
  CheckCircle,
  Clock,
} from "lucide-react";
import {
  Breadcrumb,
  StatusBadge,
  ProgressBar,
  colors,
  Card,
} from "../shared";

const PROGRAM = {
  name: "Seguridad y Evacuación de Incendios Q2 2025",
  description:
    "Entrenamiento completo sobre seguridad contra incendios que cubre procedimientos de evacuación, uso de extintores y protocolos de respuesta a emergencias.",
  status: "en progreso",
  startDate: "1 Abr, 2025",
  endDate: "30 Jun, 2025",
  coordinator: "Roberto Silva",
  overallProgress: 65,
  content: [
    {
      id: 1,
      type: "simulation",
      name: "Evacuación de Incendios – Subterráneo",
      status: "aprobado",
      attempts: 2,
      maxAttempts: 3,
      bestScore: 88,
      locked: false,
    },
    {
      id: 2,
      type: "simulation",
      name: "Respuesta a Derrame Químico",
      status: "en progreso",
      attempts: 1,
      maxAttempts: 3,
      bestScore: 62,
      locked: false,
    },
    {
      id: 3,
      type: "exam",
      name: "Examen Teórico de Seguridad contra Incendios",
      status: "pendiente",
      attempts: 0,
      maxAttempts: 3,
      bestScore: null,
      locked: false,
    },
    {
      id: 4,
      type: "simulation",
      name: "Evacuación de Incendios en Superficie",
      status: "bloqueado",
      attempts: 0,
      maxAttempts: 3,
      bestScore: null,
      locked: true,
    },
    {
      id: 5,
      type: "exam",
      name: "Evaluación Final",
      status: "bloqueado",
      attempts: 0,
      maxAttempts: 2,
      bestScore: null,
      locked: true,
    },
  ],
};

function ScoreCircle({
  score,
  size = 96,
}: {
  score: number;
  size?: number;
}) {
  const r = (size - 8) / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 75 ? colors.success : colors.error;

  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        style={{ transform: "rotate(-90deg)" }}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={colors.border}
          strokeWidth={6}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={6}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <span
        className="absolute font-bold text-xl"
        style={{ color }}
      >
        {score}%
      </span>
    </div>
  );
}

export function ProgramDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const allMandatoryApproved = PROGRAM.content
    .filter((c) => !c.locked)
    .every((c) => c.status === "aprobado");

  return (
    <div>
      <Breadcrumb
        items={[
          {
            label: "Mi Entrenamiento",
            onClick: () => navigate("/employee"),
          },
          { label: PROGRAM.name },
        ]}
      />

      <div className="grid grid-cols-3 gap-6 mb-6">
        <Card className="col-span-2">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1
                className="text-xl font-bold mb-2"
                style={{ color: colors.textPrimary }}
              >
                {PROGRAM.name}
              </h1>
              <p
                className="text-sm mb-3"
                style={{ color: colors.textSecondary }}
              >
                {PROGRAM.description}
              </p>
              <div
                className="flex items-center gap-4 text-xs"
                style={{ color: colors.textSecondary }}
              >
                <div className="flex items-center gap-1">
                  <Clock size={12} /> {PROGRAM.startDate} →{" "}
                  {PROGRAM.endDate}
                </div>
                <div>
                  Coordinador:{" "}
                  <span className="font-medium">
                    {PROGRAM.coordinator}
                  </span>
                </div>
                <StatusBadge status={PROGRAM.status} />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1">
              <div className="flex justify-between text-xs mb-1">
                <span style={{ color: colors.textSecondary }}>
                  Progreso General
                </span>
                <span
                  className="font-semibold"
                  style={{ color: colors.textPrimary }}
                >
                  {PROGRAM.overallProgress}%
                </span>
              </div>
              <ProgressBar
                value={PROGRAM.overallProgress}
                color={colors.primary}
              />
            </div>
          </div>
        </Card>

        <Card className="flex flex-col items-center justify-center">
          <ScoreCircle
            score={PROGRAM.overallProgress}
            size={100}
          />
          <p
            className="text-sm font-medium mt-3"
            style={{ color: colors.textPrimary }}
          >
            Finalización General
          </p>
          <p
            className="text-xs mt-1"
            style={{ color: colors.textSecondary }}
          >
            {
              PROGRAM.content.filter(
                (c) => c.status === "aprobado",
              ).length
            }{" "}
            de {PROGRAM.content.filter((c) => !c.locked).length}{" "}
            elementos completados
          </p>
        </Card>
      </div>

      {/* Content List */}
      <Card className="mb-6">
        <h3
          className="font-semibold mb-4"
          style={{ color: colors.textPrimary }}
        >
          Contenido del Entrenamiento
        </h3>
        <div className="space-y-3">
          {PROGRAM.content.map((item, i) => (
            <div
              key={item.id}
              className="flex items-center gap-4 p-4 rounded-xl border"
              style={{
                borderColor: item.locked
                  ? colors.border
                  : item.status === "aprobado"
                    ? `${colors.success}30`
                    : colors.border,
                opacity: item.locked ? 0.6 : 1,
                backgroundColor:
                  item.status === "aprobado"
                    ? `${colors.success}05`
                    : "white",
              }}
            >
              {/* Order number */}
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0"
                style={{
                  backgroundColor:
                    item.status === "aprobado"
                      ? colors.success
                      : item.locked
                        ? colors.border
                        : `${colors.primary}15`,
                  color:
                    item.status === "aprobado"
                      ? "white"
                      : item.locked
                        ? colors.textSecondary
                        : colors.primary,
                }}
              >
                {item.status === "aprobado" ? (
                  <CheckCircle size={14} />
                ) : (
                  i + 1
                )}
              </div>

              {/* Icon */}
              <div
                className="p-2 rounded-lg flex-shrink-0"
                style={{
                  backgroundColor:
                    item.type === "simulation"
                      ? `${colors.primary}10`
                      : `${colors.secondary}10`,
                }}
              >
                {item.type === "simulation" ? (
                  <Play
                    size={16}
                    style={{
                      color: item.locked
                        ? colors.textSecondary
                        : colors.primary,
                    }}
                  />
                ) : (
                  <FileText
                    size={16}
                    style={{
                      color: item.locked
                        ? colors.textSecondary
                        : colors.secondary,
                    }}
                  />
                )}
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p
                    className="font-medium text-sm"
                    style={{
                      color: item.locked
                        ? colors.textSecondary
                        : colors.textPrimary,
                    }}
                  >
                    {item.name}
                  </p>
                  <span
                    className="text-xs px-1.5 py-0.5 rounded capitalize"
                    style={{
                      backgroundColor: colors.bg,
                      color: colors.textSecondary,
                    }}
                  >
                    {item.type === "simulation"
                      ? "simulación"
                      : "examen"}
                  </span>
                </div>
                <div
                  className="flex items-center gap-3 mt-1 text-xs"
                  style={{ color: colors.textSecondary }}
                >
                  {item.locked ? (
                    <span>
                      Completa los elementos anteriores primero
                    </span>
                  ) : (
                    <>
                      <span>
                        {item.attempts}/{item.maxAttempts}{" "}
                        intentos usados
                      </span>
                      {item.bestScore !== null && (
                        <span
                          className="font-semibold"
                          style={{
                            color:
                              item.bestScore >= 75
                                ? colors.success
                                : colors.error,
                          }}
                        >
                          Mejor: {item.bestScore}/100
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
                  <div
                    className="p-1.5 rounded-lg"
                    style={{ backgroundColor: colors.bg }}
                  >
                    <Lock
                      size={14}
                      style={{ color: colors.textSecondary }}
                    />
                  </div>
                ) : item.attempts >= item.maxAttempts &&
                  item.status !== "aprobado" ? (
                  <span
                    className="text-xs px-3 py-1.5 rounded-lg"
                    style={{
                      backgroundColor: `${colors.error}15`,
                      color: colors.error,
                    }}
                  >
                    Sin intentos restantes
                  </span>
                ) : item.type === "simulation" ? (
                  <button
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white"
                    style={{ backgroundColor: colors.primary }}
                    onClick={() => navigate(`/employee/simulations/${item.id}/view`)}
                  >
                    <FileText size={14} /> Ver Detalle
                  </button>
                ) : (
                  <button
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white"
                    style={{
                      backgroundColor: colors.secondary,
                    }}
                    onClick={() =>
                      navigate(`/employee/exam/${item.id}`)
                    }
                  >
                    <FileText size={14} /> Hacer Examen
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
            style={{
              backgroundColor: allMandatoryApproved
                ? `${colors.success}15`
                : colors.bg,
            }}
          >
            {allMandatoryApproved ? (
              <Award
                size={28}
                style={{ color: colors.success }}
              />
            ) : (
              <Lock
                size={24}
                style={{ color: colors.textSecondary }}
              />
            )}
          </div>
          <div className="flex-1">
            <h3
              className="font-semibold"
              style={{
                color: allMandatoryApproved
                  ? colors.success
                  : colors.textPrimary,
              }}
            >
              {allMandatoryApproved
                ? "¡Certificado Disponible!"
                : "Tu Certificado"}
            </h3>
            <p
              className="text-sm"
              style={{ color: colors.textSecondary }}
            >
              {allMandatoryApproved
                ? "¡Felicidades! Has completado todos los elementos obligatorios."
                : "Completa todos los elementos obligatorios para desbloquear tu certificado."}
            </p>
          </div>
          {allMandatoryApproved && (
            <button
              onClick={() => navigate("/employee/certificates")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-white"
              style={{ backgroundColor: colors.success }}
            >
              <Award size={16} /> Descargar Certificado
            </button>
          )}
        </div>
      </Card>
    </div>
  );
}