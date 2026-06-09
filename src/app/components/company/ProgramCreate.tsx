import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  Plus,
  Trash2,
  GripVertical,
  Play,
  FileText,
  Check,
  ChevronRight,
} from "lucide-react";
import {
  PageHeader,
  PrimaryBtn,
  OutlinedBtn,
  InputField,
  SelectField,
  Toggle,
  SectionLabel,
  Breadcrumb,
  colors,
  Card,
  Toast,
} from "../shared";

interface ContentItem {
  id: number;
  type: "simulation" | "exam";
  name: string;

  maxAttempts: number;
}

const AVAILABLE_SIMS = [
  {
    id: 1,
    name: "Evacuación de Incendio – Subterráneo",
    category: "Fuego",
    duration: "~14 min",
  },
  {
    id: 2,
    name: "Bloqueo/Etiquetado de Energía",
    category: "Energía",
    duration: "~18 min",
  },
  {
    id: 3,
    name: "Entrada a Espacios Confinados",
    category: "Confinados",
    duration: "~22 min",
  },
  {
    id: 4,
    name: "Respuesta a Derrames Químicos",
    category: "Químicos",
    duration: "~12 min",
  },
];

const AVAILABLE_EXAMS = [
  { id: 10, name: "Examen Teórico de Seguridad contra Incendios", questions: 15 },
  { id: 11, name: "Evaluación de Conocimientos LOTO", questions: 20 },
  { id: 12, name: "Prueba de Identificación de EPP", questions: 10 },
];

const STEPS = ["Información Básica", "Contenido", "Ajustes", "Revisión"];

function StepIndicator({ step }: { step: number }) {
  return (
    <div className="flex items-center gap-0 mb-8">
      {STEPS.map((s, i) => (
        <div key={i} className="flex items-center">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors"
              style={{
                backgroundColor:
                  i < step
                    ? colors.success
                    : i === step
                      ? colors.primary
                      : "white",
                color:
                  i <= step ? "white" : colors.textSecondary,
                border: `2px solid ${i < step ? colors.success : i === step ? colors.primary : colors.border}`,
              }}
            >
              {i < step ? <Check size={14} /> : i + 1}
            </div>
            <span
              className="text-sm font-medium"
              style={{
                color:
                  i === step
                    ? colors.textPrimary
                    : colors.textSecondary,
              }}
            >
              {s}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div
              className="mx-4 flex-1 h-0.5 w-12"
              style={{
                backgroundColor:
                  i < step ? colors.success : colors.border,
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export function ProgramCreate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = !id || id === "new";

  const [step, setStep] = useState(0);
  const [toast, setToast] = useState<string | null>(null);

  const [basicInfo, setBasicInfo] = useState({
    name: isNew ? "" : "Seguridad y Evacuación de Incendios Q2 2025",
    description: isNew
      ? ""
      : "Entrenamiento integral de seguridad contra incendios para operaciones subterráneas.",
    startDate: isNew ? "" : "2025-04-01",
    endDate: isNew ? "" : "2025-06-30",
    status: "draft",
  });

  const [content, setContent] = useState<ContentItem[]>(
    isNew
      ? []
      : [
          {
            id: 1,
            type: "simulation",
            name: "Evacuación de Incendio – Subterráneo",
            maxAttempts: 3,
          },
          {
            id: 10,
            type: "exam",
            name: "Examen Teórico de Seguridad contra Incendios",
            maxAttempts: 2,
          },
        ],
  );

  const [activeContentTab, setActiveContentTab] = useState<
    "sims" | "exams"
  >("sims");

  const [settings, setSettings] = useState({
    coordinators: ["Roberto Silva"],
    assignNow: false,
    notifyOnAssign: true,
    notifyOnExpiry: true,
  });

  const addContent = (
    item: { id: number; name: string },
    type: "simulation" | "exam",
  ) => {
    if (!content.find((c) => c.id === item.id)) {
      setContent((prev) => [
        ...prev,
        { id: item.id, type, name: item.name, maxAttempts: 3 },
      ]);
    }
  };

  const removeContent = (id: number) =>
    setContent((prev) => prev.filter((c) => c.id !== id));
  const updateContent = (
    id: number,
    field: keyof ContentItem,
    value: unknown,
  ) => {
    setContent((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, [field]: value } : c,
      ),
    );
  };

  const handleSave = (activate = false) => {
    setToast(
      activate
        ? "¡Programa activado!"
        : "Programa guardado como borrador",
    );
    setTimeout(() => {
      setToast(null);
      navigate("/company/programs");
    }, 2000);
  };

  return (
    <div>
      <Breadcrumb
        items={[
          {
            label: "Programas",
            onClick: () => navigate("/company/programs"),
          },
          { label: isNew ? "Nuevo Programa" : "Editar Programa" },
        ]}
      />
      <PageHeader
        title={
          isNew ? "Crear Programa de Entrenamiento" : "Editar Programa"
        }
      />

      <StepIndicator step={step} />

      {/* Step 0: Basic Info */}
      {step === 0 && (
        <Card className="max-w-2xl">
          <SectionLabel>Información Básica</SectionLabel>
          <div className="space-y-4">
            <InputField
              label="Nombre del Programa"
              value={basicInfo.name}
              onChange={(v) =>
                setBasicInfo((p) => ({ ...p, name: v }))
              }
            />
            <div>
              <label
                className="block text-sm font-medium mb-1"
                style={{ color: colors.textPrimary }}
              >
                Descripción
              </label>
              <textarea
                value={basicInfo.description}
                onChange={(e) =>
                  setBasicInfo((p) => ({
                    ...p,
                    description: e.target.value,
                  }))
                }
                rows={3}
                className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none resize-none"
                style={{ borderColor: colors.border }}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="Fecha de Inicio"
                type="date"
                value={basicInfo.startDate}
                onChange={(v) =>
                  setBasicInfo((p) => ({ ...p, startDate: v }))
                }
              />
              <InputField
                label="Fecha de Fin"
                type="date"
                value={basicInfo.endDate}
                onChange={(v) =>
                  setBasicInfo((p) => ({ ...p, endDate: v }))
                }
              />
            </div>
          </div>
        </Card>
      )}

      {/* Step 1: Content */}
      {step === 1 && (
        <div className="grid grid-cols-2 gap-6">
          <Card>
            <SectionLabel>Contenido Disponible</SectionLabel>
            <div className="flex gap-1 mb-4">
              {[
                { key: "sims", label: "Simulaciones VR" },
                { key: "exams", label: "Exámenes" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() =>
                    setActiveContentTab(
                      tab.key as "sims" | "exams",
                    )
                  }
                  className="flex-1 py-2 rounded-lg text-sm font-medium transition-colors"
                  style={{
                    backgroundColor:
                      activeContentTab === tab.key
                        ? colors.primary
                        : "transparent",
                    color:
                      activeContentTab === tab.key
                        ? "white"
                        : colors.textSecondary,
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="space-y-2">
              {(activeContentTab === "sims"
                ? AVAILABLE_SIMS
                : AVAILABLE_EXAMS
              ).map((item) => {
                const already = content.find(
                  (c) => c.id === item.id,
                );
                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 rounded-lg border"
                    style={{ borderColor: colors.border }}
                  >
                    <div>
                      <p
                        className="text-sm font-medium"
                        style={{ color: colors.textPrimary }}
                      >
                        {item.name}
                      </p>
                      <p
                        className="text-xs"
                        style={{ color: colors.textSecondary }}
                      >
                        {"category" in item
                          ? `${item.category} · ${item.duration}`
                          : `${item.questions} preguntas`}
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        addContent(
                          item,
                          activeContentTab === "sims"
                            ? "simulation"
                            : "exam",
                        )
                      }
                      disabled={!!already}
                      className="p-1.5 rounded-lg transition-colors"
                      style={{
                        backgroundColor: already
                          ? colors.bg
                          : `${colors.success}15`,
                        color: already
                          ? colors.textSecondary
                          : colors.success,
                      }}
                    >
                      {already ? (
                        <Check size={14} />
                      ) : (
                        <Plus size={14} />
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card>
            <SectionLabel>Estructura del Programa</SectionLabel>
            {content.length === 0 ? (
              <p
                className="text-sm text-center py-8"
                style={{ color: colors.textSecondary }}
              >
                Añadir contenido desde el panel izquierdo
              </p>
            ) : (
              <div className="space-y-3">
                {content.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-lg border"
                    style={{ borderColor: colors.border }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <GripVertical
                        size={14}
                        style={{ color: colors.textSecondary }}
                        className="cursor-grab"
                      />
                      <div
                        className="p-1.5 rounded"
                        style={{
                          backgroundColor:
                            item.type === "simulation"
                              ? `${colors.primary}15`
                              : `${colors.secondary}15`,
                        }}
                      >
                        {item.type === "simulation" ? (
                          <Play
                            size={12}
                            style={{ color: colors.primary }}
                          />
                        ) : (
                          <FileText
                            size={12}
                            style={{ color: colors.secondary }}
                          />
                        )}
                      </div>
                      <div className="flex-1">
                        <p
                          className="text-sm font-medium"
                          style={{ color: colors.textPrimary }}
                        >
                          {item.name}
                        </p>
                        <p
                          className="text-xs"
                          style={{
                            color: colors.textSecondary,
                          }}
                        >
                          {item.type === "simulation" ? "Simulación" : "Examen"}
                        </p>
                      </div>
                      <button
                        onClick={() => removeContent(item.id)}
                      >
                        <Trash2
                          size={14}
                          style={{ color: colors.error }}
                        />
                      </button>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex items-center gap-1.5">
                        <span
                          className="text-xs"
                          style={{
                            color: colors.textSecondary,
                          }}
                        >
                          Intentos máx:
                        </span>
                        <input
                          type="number"
                          value={item.maxAttempts}
                          min={1}
                          max={10}
                          onChange={(e) =>
                            updateContent(
                              item.id,
                              "maxAttempts",
                              Number(e.target.value),
                            )
                          }
                          className="w-14 px-2 py-1 rounded border text-xs text-center"
                          style={{ borderColor: colors.border }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      )}

      {/* Step 2: Settings */}
      {step === 2 && (
        <Card className="max-w-2xl">
          <SectionLabel>Ajustes del Programa</SectionLabel>
          <div className="space-y-5">
            <SelectField
              label="Coordinador Asignado"
              value={settings.coordinators[0]}
              onChange={(v) =>
                setSettings((p) => ({
                  ...p,
                  coordinators: [v],
                }))
              }
              options={["Roberto Silva", "Elena Vega"].map(
                (c) => ({ label: c, value: c }),
              )}
            />
            <Toggle
              label="Asignar a todos los empleados activos inmediatamente"
              checked={settings.assignNow}
              onChange={(v) =>
                setSettings((p) => ({ ...p, assignNow: v }))
              }
            />
            <Toggle
              label="Notificar a los empleados al asignar"
              checked={settings.notifyOnAssign}
              onChange={(v) =>
                setSettings((p) => ({
                  ...p,
                  notifyOnAssign: v,
                }))
              }
            />
            <Toggle
              label="Enviar notificación de advertencia de caducidad"
              checked={settings.notifyOnExpiry}
              onChange={(v) =>
                setSettings((p) => ({
                  ...p,
                  notifyOnExpiry: v,
                }))
              }
            />
          </div>
        </Card>
      )}

      {/* Step 3: Review */}
      {step === 3 && (
        <Card className="max-w-2xl">
          <SectionLabel>Revisar y Confirmar</SectionLabel>
          <div className="space-y-5">
            <div
              className="p-4 rounded-lg"
              style={{ backgroundColor: colors.bg }}
            >
              <p
                className="text-xs font-semibold uppercase tracking-wide mb-2"
                style={{ color: colors.textSecondary }}
              >
                Info Básica
              </p>
              <p
                className="font-semibold"
                style={{ color: colors.textPrimary }}
              >
                {basicInfo.name || "(sin nombre)"}
              </p>
              <p
                className="text-sm mt-1"
                style={{ color: colors.textSecondary }}
              >
                {basicInfo.description || "(sin descripción)"}
              </p>
              {basicInfo.startDate && (
                <p
                  className="text-xs mt-1"
                  style={{ color: colors.textSecondary }}
                >
                  {basicInfo.startDate} →{" "}
                  {basicInfo.endDate || "Sin fecha de fin"}
                </p>
              )}
            </div>
            <div
              className="p-4 rounded-lg"
              style={{ backgroundColor: colors.bg }}
            >
              <p
                className="text-xs font-semibold uppercase tracking-wide mb-2"
                style={{ color: colors.textSecondary }}
              >
                Contenido ({content.length} elementos)
              </p>
              {content.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center gap-2 text-sm mb-1"
                >
                  {c.type === "simulation" ? (
                    <Play
                      size={12}
                      style={{ color: colors.primary }}
                    />
                  ) : (
                    <FileText
                      size={12}
                      style={{ color: colors.secondary }}
                    />
                  )}
                </div>
              ))}
            </div>
            <div
              className="p-4 rounded-lg"
              style={{ backgroundColor: colors.bg }}
            >
              <p
                className="text-xs font-semibold uppercase tracking-wide mb-2"
                style={{ color: colors.textSecondary }}
              >
                Coordinador
              </p>
              <p
                className="text-sm"
                style={{ color: colors.textPrimary }}
              >
                {settings.coordinators.join(", ")}
              </p>
            </div>
            <div className="flex gap-3">
              <OutlinedBtn onClick={() => handleSave(false)}>
                Guardar como Borrador
              </OutlinedBtn>
              <PrimaryBtn onClick={() => handleSave(true)}>
                Activar Programa
              </PrimaryBtn>
            </div>
          </div>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <OutlinedBtn
          onClick={() =>
            step === 0
              ? navigate("/company/programs")
              : setStep((s) => s - 1)
          }
        >
          {step === 0 ? "Cancelar" : "← Atrás"}
        </OutlinedBtn>
        {step < 3 && (
          <PrimaryBtn onClick={() => setStep((s) => s + 1)}>
            Siguiente <ChevronRight size={16} />
          </PrimaryBtn>
        )}
      </div>

      {toast && (
        <Toast
          message={toast}
          type="success"
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}