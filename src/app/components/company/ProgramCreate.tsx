import { useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import {
  Plus,
  Trash2,
  GripVertical,
  Play,
  FileText,
  Check,
  ChevronRight,
  User,
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
import { useAuth } from "../../context/AuthContext";

interface ContentItem {
  id: number;
  type: "simulation" | "exam";
  name: string;
  maxAttempts: number;
  isMandatory?: boolean;
  weight?: number;
  passingScore?: number;
  objectives?: {
    id: string;
    name: string;
    weight: number;
    isMandatory: boolean;
  }[];
}

const AVAILABLE_SIMS = [
  {
    id: 1,
    name: "Evacuación de Incendio – Subterráneo",
    category: "Fuego",
    duration: "~14 min",
    objectives: [
      { id: "obj-1-1", name: "Uso correcto del extintor", weight: 40, isMandatory: true },
      { id: "obj-1-2", name: "Tiempo de evacuación < 3m", weight: 60, isMandatory: false }
    ]
  },
  {
    id: 2,
    name: "Bloqueo/Etiquetado de Energía",
    category: "Energía",
    duration: "~18 min",
    objectives: [
      { id: "obj-2-1", name: "Identificación de fuentes de energía", weight: 50, isMandatory: true },
      { id: "obj-2-2", name: "Colocación de candado de seguridad", weight: 50, isMandatory: true }
    ]
  },
  {
    id: 3,
    name: "Entrada a Espacios Confinados",
    category: "Confinados",
    duration: "~22 min",
    objectives: [
      { id: "obj-3-1", name: "Medición de gases antes de entrar", weight: 100, isMandatory: true }
    ]
  },
  {
    id: 4,
    name: "Respuesta a Derrames Químicos",
    category: "Químicos",
    duration: "~12 min",
    objectives: [
      { id: "obj-4-1", name: "Uso de EPP adecuado", weight: 30, isMandatory: true },
      { id: "obj-4-2", name: "Contención del derrame", weight: 70, isMandatory: false }
    ]
  },
];

const AVAILABLE_EXAMS = [
  { id: 10, name: "Examen Teórico de Seguridad contra Incendios", questions: 15 },
  { id: 11, name: "Evaluación de Conocimientos LOTO", questions: 20 },
  { id: 12, name: "Prueba de Identificación de EPP", questions: 10 },
];

const STEPS = ["Información Básica", "Contenido", "Ajustes", "Revisión"];

const AVAILABLE_COORDINATORS = [
  { id: 1, name: "Roberto Silva" },
  { id: 2, name: "Elena Vega" },
  { id: 3, name: "Marco Torres" },
  { id: 4, name: "Lucía Méndez" },
];

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
  const { user } = useAuth();
  const isNew = !id || id === "new";
  const isCoordinator = user?.role === "coordinator";

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
            isMandatory: true,
            weight: 50,
            passingScore: 80,
            objectives: [
              { id: "obj-1-1", name: "Uso correcto del extintor", weight: 40, isMandatory: true },
              { id: "obj-1-2", name: "Tiempo de evacuación < 3m", weight: 60, isMandatory: false }
            ]
          },
          {
            id: 10,
            type: "exam",
            name: "Examen Teórico de Seguridad contra Incendios",
            maxAttempts: 2,
            isMandatory: true,
            weight: 50,
            passingScore: 70
          },
        ],
  );

  const [activeContentTab, setActiveContentTab] = useState<
    "sims" | "exams"
  >("sims");

  const [settings, setSettings] = useState({
    coordinators: isCoordinator ? [user?.name || ""] : ["Roberto Silva"],
    assignNow: false,
    notifyOnAssign: true,
    notifyOnExpiry: true,
  });

  const addContent = (
    item: { id: number; name: string; objectives?: any[] },
    type: "simulation" | "exam",
  ) => {
    if (!content.find((c) => c.id === item.id)) {
      setContent((prev) => [
        ...prev,
        { 
          id: item.id, 
          type, 
          name: item.name, 
          maxAttempts: 3,
          isMandatory: true,
          weight: 0,
          passingScore: 70,
          objectives: type === "simulation" && item.objectives 
            ? [...item.objectives] 
            : undefined
        },
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

  const updateObjective = (
    contentId: number,
    objId: string,
    field: "weight" | "isMandatory",
    value: unknown
  ) => {
    setContent(prev => prev.map(c => {
      if (c.id === contentId && c.objectives) {
        return {
          ...c,
          objectives: c.objectives.map(o => o.id === objId ? { ...o, [field]: value } : o)
        }
      }
      return c;
    }));
  };

  const toggleCoordinator = (name: string) => {
    if (isCoordinator) return;
    setSettings(prev => {
      const isSelected = prev.coordinators.includes(name);
      return {
        ...prev,
        coordinators: isSelected 
          ? prev.coordinators.filter(c => c !== name)
          : [...prev.coordinators, name]
      };
    });
  };

  const handleSave = (activate = false) => {
    setToast(
      activate
        ? "¡Programa activado!"
        : "Programa guardado como borrador",
    );
    setTimeout(() => {
      setToast(null);
      // Ensure we navigate to the correct role path
      const basePath = window.location.pathname.startsWith("/coordinator") ? "/coordinator" : "/company";
      navigate(`${basePath}/programs`);
    }, 2000);
  };

  return (
    <div>
      <Breadcrumb
        items={[
          {
            label: "Programas",
            onClick: () => {
              const basePath = window.location.pathname.startsWith("/coordinator") ? "/coordinator" : "/company";
              navigate(`${basePath}/programs`);
            },
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
                className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none resize-none transition-all focus:border-blue-900 focus:ring-1 focus:ring-blue-900"
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
                    <div className="flex items-center gap-2">
                      {activeContentTab === "sims" && (
                        <button
                          onClick={() =>
                            window.open(
                              `/company/simulations/${item.id}/view`,
                              "_blank",
                            )
                          }
                          className="text-xs px-2 py-1 rounded-lg hover:bg-gray-100 transition-colors"
                          style={{ color: colors.primary }}
                          type="button"
                        >
                          Ver detalle
                        </button>
                      )}
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
                      <div className="flex items-center gap-2">
                        {item.type === "simulation" && (
                          <button
                            onClick={() =>
                              window.open(
                                `/company/simulations/${item.id}/view`,
                                "_blank",
                              )
                            }
                            className="text-xs hover:underline"
                            style={{ color: colors.primary }}
                            type="button"
                          >
                            Ver detalle
                          </button>
                        )}
                        <button
                          onClick={() => removeContent(item.id)}
                          type="button"
                        >
                          <Trash2
                            size={14}
                            style={{ color: colors.error }}
                          />
                        </button>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-100 flex flex-col gap-3">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="flex flex-col gap-1">
                          <label className="text-xs" style={{ color: colors.textSecondary }}>Intentos máx.</label>
                          <input
                            type="number"
                            value={item.maxAttempts}
                            min={1}
                            max={10}
                            onChange={(e) => updateContent(item.id, "maxAttempts", Number(e.target.value))}
                            className="w-full px-2 py-1 rounded border text-sm"
                            style={{ borderColor: colors.border }}
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-xs" style={{ color: colors.textSecondary }}>Nota mínima (%)</label>
                          <input
                            type="number"
                            value={item.passingScore || 70}
                            min={0}
                            max={100}
                            onChange={(e) => updateContent(item.id, "passingScore", Number(e.target.value))}
                            className="w-full px-2 py-1 rounded border text-sm"
                            style={{ borderColor: colors.border }}
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-xs" style={{ color: colors.textSecondary }}>Ponderación (%)</label>
                          <input
                            type="number"
                            value={item.weight || 0}
                            min={0}
                            max={100}
                            onChange={(e) => updateContent(item.id, "weight", Number(e.target.value))}
                            className="w-full px-2 py-1 rounded border text-sm"
                            style={{ borderColor: colors.border }}
                          />
                        </div>
                        <div className="flex items-end pb-1">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={item.isMandatory !== false}
                              onChange={(e) => updateContent(item.id, "isMandatory", e.target.checked)}
                              className="w-4 h-4 text-blue-900 border-gray-300 rounded focus:ring-blue-900"
                            />
                            <span className="text-sm font-medium" style={{ color: colors.textPrimary }}>Obligatorio</span>
                          </label>
                        </div>
                      </div>

                      {item.type === "simulation" && item.objectives && item.objectives.length > 0 && (
                        <div className="mt-2 pl-3 border-l-2 border-gray-200">
                          <p className="text-xs font-semibold mb-2" style={{ color: colors.textPrimary }}>Objetivos de la Simulación</p>
                          <div className="space-y-2">
                            {item.objectives.map(obj => (
                              <div key={obj.id} className="flex items-center gap-3 bg-gray-50 p-2 rounded">
                                <span className="flex-1 text-xs" style={{ color: colors.textSecondary }}>{obj.name}</span>
                                <div className="flex items-center gap-1.5">
                                  <label className="text-[10px] text-gray-500">Peso %</label>
                                  <input
                                    type="number"
                                    value={obj.weight}
                                    onChange={(e) => updateObjective(item.id, obj.id, "weight", Number(e.target.value))}
                                    className="w-12 px-1 py-0.5 rounded border text-xs text-center"
                                    style={{ borderColor: colors.border }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
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
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-3" style={{ color: colors.textPrimary }}>
                Asignación de Coordinador(es)
              </label>
              
              {isCoordinator ? (
                <div className="flex items-center gap-3 p-3 rounded-lg border bg-gray-50 border-gray-200">
                  <div className="w-8 h-8 rounded-full bg-blue-900/10 flex items-center justify-center">
                    <User size={16} className="text-blue-900" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium" style={{ color: colors.textPrimary }}>{user?.name}</p>
                    <p className="text-xs text-gray-500">Auto-asignado (Propietario)</p>
                  </div>
                  <div className="px-2 py-1 bg-gray-200 rounded text-[10px] font-bold text-gray-600 uppercase">Fijo</div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {AVAILABLE_COORDINATORS.map(coord => {
                    const isSelected = settings.coordinators.includes(coord.name);
                    return (
                      <label 
                        key={coord.id}
                        className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${isSelected ? 'border-blue-900 bg-blue-50/50' : 'border-gray-200 hover:border-gray-300'}`}
                      >
                        <div 
                          className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isSelected ? 'bg-blue-900 border-blue-900' : 'bg-white border-gray-300'}`}
                        >
                          {isSelected && <Check size={14} className="text-white" strokeWidth={3} />}
                          <input 
                            type="checkbox" 
                            className="hidden" 
                            checked={isSelected}
                            onChange={() => toggleCoordinator(coord.name)}
                          />
                        </div>
                        <span className="text-sm font-medium" style={{ color: isSelected ? colors.primary : colors.textPrimary }}>
                          {coord.name}
                        </span>
                      </label>
                    );
                  })}
                </div>
              )}
              {!isCoordinator && (
                <p className="mt-2 text-xs text-gray-500">
                  Seleccione uno o más coordinadores para supervisar este programa.
                </p>
              )}
            </div>

            <div className="pt-4 border-t border-gray-100 space-y-4">
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
              
            </div>
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
              <div className="space-y-1">
                {content.map((c) => (
                  <div
                    key={c.id}
                    className="flex items-center gap-2 text-sm"
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
                    <span style={{ color: colors.textPrimary }}>{c.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div
              className="p-4 rounded-lg"
              style={{ backgroundColor: colors.bg }}
            >
              <p
                className="text-xs font-semibold uppercase tracking-wide mb-2"
                style={{ color: colors.textSecondary }}
              >
                {settings.coordinators.length > 1 ? "Coordinadores Asignados" : "Coordinador Asignado"}
              </p>
              <p
                className="text-sm"
                style={{ color: colors.textPrimary }}
              >
                {settings.coordinators.join(", ")}
              </p>
            </div>
            <div className="flex gap-3 pt-2">
              <OutlinedBtn className="flex-1" onClick={() => handleSave(false)}>
                Guardar como Borrador
              </OutlinedBtn>
              <PrimaryBtn className="flex-1" onClick={() => handleSave(true)}>
                Activar Programa
              </PrimaryBtn>
            </div>
          </div>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <OutlinedBtn
          onClick={() => {
            if (step === 0) {
              const basePath = window.location.pathname.startsWith("/coordinator") ? "/coordinator" : "/company";
              navigate(`${basePath}/programs`);
            } else {
              setStep((s) => s - 1);
            }
          }}
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
