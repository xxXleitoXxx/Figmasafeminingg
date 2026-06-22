import { useState } from "react";
import { useNavigate } from "react-router";
import { Plus, Search, MoreVertical, Flame, Zap, Wind, Shield } from "lucide-react";
import { PageHeader, PrimaryBtn, StatusBadge, colors } from "../shared";

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  "Fuego": <Flame size={24} />,
  "Energía": <Zap size={24} />,
  "Confinado": <Wind size={24} />,
  "General": <Shield size={24} />,
  "Químico": <Flame size={24} />,
  "Fire": <Flame size={24} />,
  "Energy": <Zap size={24} />,
  "Confined": <Wind size={24} />,
  "Chemical": <Flame size={24} />,
};

const CATEGORY_COLORS: Record<string, string> = {
  "Fuego": "#EF4444",
  "Energía": "#EAB308",
  "Confinado": "#3B82F6",
  "General": "#22C55E",
  "Químico": "#F97316",
  "Fire": "#EF4444",
  "Energy": "#EAB308",
  "Confined": "#3B82F6",
  "Chemical": "#F97316",
};

const SIMULATIONS = [
  { id: 1, name: "Evacuación de Incendios – Subterráneo", category: "Fuego", difficulty: "Intermedio", duration: "~14 min", version: "v2.1", status: "activo" },
  { id: 2, name: "Bloqueo de Energía (LOTO)", category: "Energía", difficulty: "Avanzado", duration: "~18 min", version: "v1.5", status: "activo" },
  { id: 3, name: "Protocolo de Espacio Confinado", category: "Confinado", difficulty: "Avanzado", duration: "~22 min", version: "v1.3", status: "activo" },
  { id: 4, name: "Respuesta a Derrame Químico", category: "Químico", difficulty: "Intermedio", duration: "~12 min", version: "v2.0", status: "activo" },
  { id: 5, name: "Checklist de Seguridad de Equipos", category: "General", difficulty: "Básico", duration: "~8 min", version: "v1.0", status: "borrador" },
  { id: 6, name: "Evacuación de Incendios Superficie", category: "Fuego", difficulty: "Básico", duration: "~10 min", version: "v1.2", status: "activo" },
  { id: 7, name: "Básicos de Seguridad Eléctrica", category: "Energía", difficulty: "Básico", duration: "~9 min", version: "v1.1", status: "activo" },
  { id: 8, name: "Rescate en Espacios Confinados", category: "Confinado", difficulty: "Avanzado", duration: "~25 min", version: "v1.0", status: "borrador" },
  { id: 9, name: "Colocación de EPP", category: "General", difficulty: "Básico", duration: "~6 min", version: "v2.2", status: "activo" },
];

const DIFF_COLORS: Record<string, string> = {
  Básico: "#22C55E",
  Intermedio: "#EAB308",
  Avanzado: "#EF4444",
  Basic: "#22C55E",
  Intermediate: "#EAB308",
  Advanced: "#EF4444",
};

export function SimulationsCatalog() {
  const navigate = useNavigate();
  const location = window.location;
  const basePath = location.pathname.split("/")[1]; // "admin", "company", "coordinator"
  const isAdmin = basePath === "admin";
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  const categories = ["Todas", "Fuego", "Energía", "Confinado", "General", "Químico"];
  const difficulties = ["Todas", "Básico", "Intermedio", "Avanzado"];

  const filtered = SIMULATIONS.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = categoryFilter === "Todas" || s.category === categoryFilter;
    const matchDiff = difficultyFilter === "Todas" || s.difficulty === difficultyFilter;
    return matchSearch && matchCat && matchDiff;
  });

  return (
    <div>
      <PageHeader
        title="Simulaciones VR"
        subtitle={`${SIMULATIONS.length} simulaciones en el catálogo`}
        actions={isAdmin && <PrimaryBtn onClick={() => navigate("/admin/simulations/new")}><Plus size={16} /> Nueva Simulación</PrimaryBtn>}
      />

      {/* Filters */}
      <div className="bg-white rounded-xl border p-4 mb-6 space-y-3" style={{ borderColor: colors.border }}>
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: colors.textSecondary }} />
          <input
            placeholder="Buscar simulaciones..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg border text-sm outline-none"
            style={{ borderColor: colors.border }}
          />
        </div>
        <div className="flex gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium" style={{ color: colors.textSecondary }}>Categoría:</span>
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setCategoryFilter(c)}
                className="px-2.5 py-1 rounded-lg text-xs font-medium"
                style={{ backgroundColor: categoryFilter === c ? colors.primary : "transparent", color: categoryFilter === c ? "white" : colors.textSecondary, border: `1px solid ${categoryFilter === c ? colors.primary : colors.border}` }}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium" style={{ color: colors.textSecondary }}>Dificultad:</span>
            {difficulties.map(d => (
              <button
                key={d}
                onClick={() => setDifficultyFilter(d)}
                className="px-2.5 py-1 rounded-lg text-xs font-medium"
                style={{ backgroundColor: difficultyFilter === d ? colors.primary : "transparent", color: difficultyFilter === d ? "white" : colors.textSecondary, border: `1px solid ${difficultyFilter === d ? colors.primary : colors.border}` }}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-5">
        {filtered.map(sim => (
          <div
            key={sim.id}
            className="bg-white rounded-xl border shadow-sm overflow-hidden"
            style={{ borderColor: colors.border }}
          >
            {/* Thumbnail */}
            <div
              className="h-36 flex flex-col items-center justify-center relative"
              style={{ background: `linear-gradient(135deg, ${CATEGORY_COLORS[sim.category]}20, ${CATEGORY_COLORS[sim.category]}40)` }}
            >
              <div style={{ color: CATEGORY_COLORS[sim.category] }}>{CATEGORY_ICONS[sim.category]}</div>
              <div className="absolute top-3 right-3">
                <div className="relative">
                  <button
                    onClick={() => setOpenMenu(openMenu === sim.id ? null : sim.id)}
                    className="p-1.5 rounded-lg bg-white/80 hover:bg-white transition-colors"
                  >
                    <MoreVertical size={14} style={{ color: colors.textSecondary }} />
                  </button>
                  {openMenu === sim.id && (
                    <>
                      <div className="fixed inset-0 z-30" onClick={() => setOpenMenu(null)} />
                      <div className="absolute right-0 top-8 z-40 bg-white rounded-lg shadow-lg border py-1 w-36" style={{ borderColor: colors.border }}>
                        <button
                          onClick={() => { setOpenMenu(null); navigate(`/${basePath}/simulations/${sim.id}/view`); }}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
                          style={{ color: colors.textPrimary }}
                        >
                          Ver detalle
                        </button>
                        {isAdmin && ["Editar", "Gestionar Métricas", "Desactivar"].map(action => (
                          <button
                            key={action}
                            onClick={() => { setOpenMenu(null); if (action === "Editar") navigate(`/${basePath}/simulations/${sim.id}/edit`); }}
                            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
                            style={{ color: action === "Desactivar" ? colors.error : colors.textPrimary }}
                          >
                            {action}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
              <span
                className="absolute bottom-3 left-3 text-xs font-medium px-2 py-0.5 rounded-full text-white"
                style={{ backgroundColor: CATEGORY_COLORS[sim.category] }}
              >
                {sim.category}
              </span>
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-sm leading-tight" style={{ color: colors.textPrimary }}>{sim.name}</h4>
              </div>
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span
                  className="text-xs font-medium px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: `${DIFF_COLORS[sim.difficulty]}20`, color: DIFF_COLORS[sim.difficulty] }}
                >
                  {sim.difficulty}
                </span>
                <span className="text-xs" style={{ color: colors.textSecondary }}>{sim.duration}</span>
                <span className="text-xs" style={{ color: colors.textSecondary }}>{sim.version}</span>
              </div>
              <div className="flex items-center justify-between mt-4">
                <StatusBadge status={sim.status} />
                <button
                  onClick={() => navigate(`/${basePath}/simulations/${sim.id}/view`)}
                  className="text-xs font-medium hover:underline"
                  style={{ color: colors.primary }}
                >
                  Ver detalle →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
