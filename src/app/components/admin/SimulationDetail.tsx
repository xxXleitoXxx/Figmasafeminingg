import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  Plus,
  Trash2,
  CheckCircle,
  AlertCircle,
  Check,
  X,
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

interface Metric {
  id: number;
  name: string;
  description: string;
  weight: number;
  threshold: number;
}

const DEFAULT_METRICS: Metric[] = [
  {
    id: 1,
    name: "Tiempo de Respuesta",
    description: "Tiempo para iniciar evacuación",
    weight: 30,
    threshold: 70,
  },
  {
    id: 2,
    name: "Cumplimiento de Procedimiento",
    description: "Pasos seguidos correctamente",
    weight: 40,
    threshold: 75,
  },
  {
    id: 3,
    name: "Uso de EPP",
    description: "Uso adecuado de equipo de protección",
    weight: 30,
    threshold: 80,
  },
];

const COMPANIES = [
  { id: 1, name: "Minera Andina S.A." },
  { id: 2, name: "Codelco Norte Ltda." },
  { id: 3, name: "Yamana Gold Chile" },
  { id: 4, name: "Anglo American" },
  { id: 5, name: "Minera Escondida" },
  { id: 6, name: "Antofagasta Minerals" },
  { id: 7, name: "Lundin Mining" },
  { id: 8, name: "Kinross Gold" },
];

export function SimulationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === "new";

  const [form, setForm] = useState({
    name: isNew ? "" : "Evacuación de Incendios – Subterráneo",
    description: isNew
      ? ""
      : "Simulación inmersiva completa en VR de protocolos de evacuación de incendios en minas subterráneas.",
    category: "Fuego",
    difficulty: "Intermedio",
    duration: "14",
    version: "2.1",
    sceneId: isNew ? "" : "unity_fire_evac_v21",
    assetUrl: isNew
      ? ""
      : "https://assets.safemining.vr/sims/fire-evac-v21.bundle",
    status: true,
  });

  const [metrics, setMetrics] = useState<Metric[]>(
    isNew ? [] : DEFAULT_METRICS,
  );
  const [selectedCompanies, setSelectedCompanies] = useState<
    number[]
  >([]);
  const [toast, setToast] = useState<string | null>(null);

  const totalWeight = metrics.reduce(
    (sum, m) => sum + m.weight,
    0,
  );
  const weightOk = totalWeight === 100;

  const addMetric = () => {
    setMetrics((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: "",
        description: "",
        weight: 0,
        threshold: 75,
      },
    ]);
  };

  const removeMetric = (id: number) =>
    setMetrics((prev) => prev.filter((m) => m.id !== id));

  const updateMetric = (
    id: number,
    field: keyof Metric,
    value: string | number,
  ) => {
    setMetrics((prev) =>
      prev.map((m) =>
        m.id === id
          ? {
              ...m,
              [field]:
                typeof value === "string"
                  ? value
                  : Number(value),
            }
          : m,
      ),
    );
  };

  const toggleCompany = (id: number) => {
    setSelectedCompanies((prev) =>
      prev.includes(id)
        ? prev.filter((c) => c !== id)
        : [...prev, id],
    );
  };

  const selectAll = () =>
    setSelectedCompanies(COMPANIES.map((c) => c.id));
  const deselectAll = () => setSelectedCompanies([]);

  const handleSave = () => {
    if (metrics.length > 0 && !weightOk) {
      setToast("Los pesos de las métricas deben sumar 100%");
      return;
    }

    // CA11, CA12: Logic for company assignment would happen here on backend
    const companyMsg =
      selectedCompanies.length > 0
        ? `Asignada a ${selectedCompanies.length} empresas`
        : "No asignada a ninguna empresa";

    setToast(
      `${isNew ? "Simulación creada" : "Simulación guardada"} exitosamente. ${companyMsg}`,
    );
    setTimeout(() => {
      setToast(null);
      navigate("/admin/simulations");
    }, 2000);
  };

  return (
    <div>
      <Breadcrumb
        items={[
          {
            label: "Simulaciones",
            onClick: () => navigate("/admin/simulations"),
          },
          {
            label: isNew
              ? "Nueva Simulación"
              : "Evacuación de Incendios – Subterráneo",
          },
        ]}
      />

      <PageHeader
        title={
          isNew
            ? "Nueva Simulación"
            : "Evacuación de Incendios – Subterráneo"
        }
        actions={
          <>
            <OutlinedBtn
              onClick={() => navigate("/admin/simulations")}
            >
              Cancelar
            </OutlinedBtn>
            <PrimaryBtn onClick={handleSave}>
              Guardar Simulación
            </PrimaryBtn>
          </>
        }
      />

      <div className="space-y-6 pb-20">
        <Card>
          <SectionLabel>Información Básica</SectionLabel>
          <div className="grid grid-cols-2 gap-5">
            <InputField
              label="Nombre de la Simulación"
              value={form.name}
              onChange={(v) =>
                setForm((p) => ({ ...p, name: v }))
              }
              required
              className="col-span-2"
            />
            <div className="col-span-2">
              <label
                className="block text-sm font-medium mb-1"
                style={{ color: colors.textPrimary }}
              >
                Descripción
              </label>
              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    description: e.target.value,
                  }))
                }
                rows={3}
                className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none resize-none transition-all"
                style={{
                  borderColor: colors.border,
                  color: colors.textPrimary,
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor =
                    colors.primary;
                  e.currentTarget.style.boxShadow = `0 0 0 2px ${colors.primary}30`;
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor =
                    colors.border;
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </div>

            <SelectField
              label="Dificultad"
              value={form.difficulty}
              onChange={(v) =>
                setForm((p) => ({ ...p, difficulty: v }))
              }
              options={["Básico", "Intermedio", "Avanzado"].map(
                (v) => ({ label: v, value: v }),
              )}
            />
            <InputField
              label="Duración (minutos)"
              type="number"
              value={form.duration}
              onChange={(v) =>
                setForm((p) => ({ ...p, duration: v }))
              }
            />
            <InputField
              label="Versión"
              value={form.version}
              onChange={(v) =>
                setForm((p) => ({ ...p, version: v }))
              }
              placeholder="1.0"
            />
            <InputField
              label="ID de Escena Unity"
              value={form.sceneId}
              onChange={(v) =>
                setForm((p) => ({ ...p, sceneId: v }))
              }
              placeholder="unity_scene_id"
            />
          </div>
          {!isNew && (
            <div className="mt-5">
              <Toggle
                label="Simulación activa"
                checked={form.status}
                onChange={(v) =>
                  setForm((p) => ({ ...p, status: v }))
                }
              />
            </div>
          )}
        </Card>

        {/* CA10: Checklist of companies */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <SectionLabel>Asignación a Empresas</SectionLabel>
            {/* CA13: Select/Deselect all buttons */}
            <div className="flex items-center gap-1">
              <button
                onClick={selectAll}
                className="text-xs font-semibold px-2 py-1.5 rounded-md hover:bg-gray-100 transition-colors"
                style={{ color: colors.primary }}
              >
                Seleccionar todas
              </button>
              <span className="text-gray-200">|</span>
              <button
                onClick={deselectAll}
                className="text-xs font-semibold px-2 py-1.5 rounded-md hover:bg-gray-100 transition-colors"
                style={{ color: colors.textSecondary }}
              >
                Desmarcar todas
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {COMPANIES.map((company) => {
              const isSelected = selectedCompanies.includes(
                company.id,
              );
              return (
                <label
                  key={company.id}
                  className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all hover:shadow-sm ${isSelected ? "bg-blue-50/30" : "bg-white"}`}
                  style={{
                    borderColor: isSelected
                      ? colors.primary
                      : colors.border,
                  }}
                >
                  <div
                    className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isSelected ? "bg-blue-900 border-blue-900" : "bg-white border-gray-300"}`}
                    style={{
                      backgroundColor: isSelected
                        ? colors.primary
                        : "",
                      borderColor: isSelected
                        ? colors.primary
                        : "",
                    }}
                  >
                    {isSelected && (
                      <Check
                        size={14}
                        className="text-white"
                        strokeWidth={3}
                      />
                    )}
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={isSelected}
                      onChange={() => toggleCompany(company.id)}
                    />
                  </div>
                  <span
                    className="text-sm font-medium"
                    style={{
                      color: isSelected
                        ? colors.primary
                        : colors.textPrimary,
                    }}
                  >
                    {company.name}
                  </span>
                </label>
              );
            })}
          </div>

          <div
            className="mt-4 p-3 rounded-lg flex items-center gap-2"
            style={{ backgroundColor: colors.bg }}
          >
            <AlertCircle
              size={16}
              style={{ color: colors.textSecondary }}
            />
            <p
              className="text-xs"
              style={{ color: colors.textSecondary }}
            >
              {selectedCompanies.length === 0
                ? "CA12: La simulación no será visible para ninguna empresa hasta que se le asigne visibilidad."
                : `CA11: Simulación habilitada y visible únicamente para las ${selectedCompanies.length} empresas seleccionadas.`}
            </p>
          </div>
        </Card>

        {/* Evaluation Metrics */}
      </div>

      {toast && (
        <Toast
          message={toast}
          type={
            toast.includes("must") || toast.includes("pesos")
              ? "error"
              : "success"
          }
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}