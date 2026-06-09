import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Plus, Trash2, CheckCircle, AlertCircle } from "lucide-react";
import { PageHeader, PrimaryBtn, OutlinedBtn, InputField, SelectField, Toggle, SectionLabel, Breadcrumb, colors, Card, Toast } from "../shared";

interface Metric { id: number; name: string; description: string; weight: number; threshold: number; }

const DEFAULT_METRICS: Metric[] = [
  { id: 1, name: "Tiempo de Respuesta", description: "Tiempo para iniciar evacuación", weight: 30, threshold: 70 },
  { id: 2, name: "Cumplimiento de Procedimiento", description: "Pasos seguidos correctamente", weight: 40, threshold: 75 },
  { id: 3, name: "Uso de EPP", description: "Uso adecuado de equipo de protección", weight: 30, threshold: 80 },
];

export function SimulationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === "new";

  const [form, setForm] = useState({
    name: isNew ? "" : "Evacuación de Incendios – Subterráneo",
    description: isNew ? "" : "Simulación inmersiva completa en VR de protocolos de evacuación de incendios en minas subterráneas.",
    category: "Fuego",
    difficulty: "Intermedio",
    duration: "14",
    version: "2.1",
    sceneId: isNew ? "" : "unity_fire_evac_v21",
    assetUrl: isNew ? "" : "https://assets.safemining.vr/sims/fire-evac-v21.bundle",
    status: true,
  });

  const [metrics, setMetrics] = useState<Metric[]>(isNew ? [] : DEFAULT_METRICS);
  const [toast, setToast] = useState<string | null>(null);

  const totalWeight = metrics.reduce((sum, m) => sum + m.weight, 0);
  const weightOk = totalWeight === 100;

  const addMetric = () => {
    setMetrics(prev => [...prev, { id: Date.now(), name: "", description: "", weight: 0, threshold: 75 }]);
  };

  const removeMetric = (id: number) => setMetrics(prev => prev.filter(m => m.id !== id));

  const updateMetric = (id: number, field: keyof Metric, value: string | number) => {
    setMetrics(prev => prev.map(m => m.id === id ? { ...m, [field]: typeof value === "string" ? value : Number(value) } : m));
  };

  const handleSave = () => {
    if (metrics.length > 0 && !weightOk) { setToast("Los pesos de las métricas deben sumar 100%"); return; }
    setToast(isNew ? "Simulación creada exitosamente" : "Simulación guardada exitosamente");
    setTimeout(() => { setToast(null); navigate("/admin/simulations"); }, 2000);
  };

  return (
    <div>
      <Breadcrumb items={[
        { label: "Simulaciones", onClick: () => navigate("/admin/simulations") },
        { label: isNew ? "Nueva Simulación" : "Evacuación de Incendios – Subterráneo" }
      ]} />

      <PageHeader
        title={isNew ? "Nueva Simulación" : "Evacuación de Incendios – Subterráneo"}
        actions={
          <>
            <OutlinedBtn onClick={() => navigate("/admin/simulations")}>Cancelar</OutlinedBtn>
            <PrimaryBtn onClick={handleSave}>Guardar Simulación</PrimaryBtn>
          </>
        }
      />

      <div className="space-y-6">
        <Card>
          <SectionLabel>Información Básica</SectionLabel>
          <div className="grid grid-cols-2 gap-5">
            <InputField label="Nombre de la Simulación" value={form.name} onChange={v => setForm(p => ({ ...p, name: v }))} required className="col-span-2" />
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1" style={{ color: colors.textPrimary }}>Descripción</label>
              <textarea
                value={form.description}
                onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none resize-none"
                style={{ borderColor: colors.border, color: colors.textPrimary }}
                onFocus={e => { e.currentTarget.style.borderColor = colors.primary; e.currentTarget.style.boxShadow = `0 0 0 2px ${colors.primary}30`; }}
                onBlur={e => { e.currentTarget.style.borderColor = colors.border; e.currentTarget.style.boxShadow = "none"; }}
              />
            </div>
          
            <SelectField
              label="Dificultad"
              value={form.difficulty}
              onChange={v => setForm(p => ({ ...p, difficulty: v }))}
              options={["Básico", "Intermedio", "Avanzado"].map(v => ({ label: v, value: v }))}
            />
            <InputField label="Duración (minutos)" type="number" value={form.duration} onChange={v => setForm(p => ({ ...p, duration: v }))} />
            <InputField label="Versión" value={form.version} onChange={v => setForm(p => ({ ...p, version: v }))} placeholder="1.0" />
            <InputField label="ID de Escena Unity" value={form.sceneId} onChange={v => setForm(p => ({ ...p, sceneId: v }))} placeholder="unity_scene_id" />
          </div>
          <div className="mt-5">
            <Toggle label="Simulación activa" checked={form.status} onChange={v => setForm(p => ({ ...p, status: v }))} />
          </div>
        </Card>

        {/* Evaluation Metrics */}
      
      </div>

      {toast && <Toast message={toast} type={toast.includes("must") ? "error" : "success"} onClose={() => setToast(null)} />}
    </div>
  );
}
