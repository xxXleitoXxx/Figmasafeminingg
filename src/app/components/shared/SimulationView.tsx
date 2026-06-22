import { useNavigate, useParams, useLocation } from "react-router";
import { Breadcrumb, PageHeader, PrimaryBtn, OutlinedBtn, Card, colors, SectionLabel } from "./index";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { AlertCircle, Check } from "lucide-react";

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

export function SimulationView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const basePath = location.pathname.split("/")[1]; // "admin", "company", "coordinator", "employee"
  const isAdmin = basePath === "admin";
  const isEmployee = basePath === "employee";

  // Mock data for the view
  const simulation = {
    name: "Evacuación de Incendios – Subterráneo",
    description: "Simulación inmersiva completa en VR de protocolos de evacuación de incendios en minas subterráneas.",
    category: "Fuego",
    difficulty: "Intermedio",
    duration: "14 minutos",
    version: "2.1",
    status: true,
    image: "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXJ0dWFsJTIwcmVhbGl0eSUyMG1pbmluZyUyMHNpbXVsYXRpb258ZW58MXx8fHwxNzgwOTkwMDE2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  };

  const selectedCompanies = [1, 3, 5];

  const breadcrumbItems = isEmployee ? [
    { label: "Programa", onClick: () => navigate(-1) },
    { label: simulation.name }
  ] : [
    { label: "Simulaciones", onClick: () => navigate(`/${basePath}/simulations`) },
    { label: simulation.name },
  ];

  return (
    <div>
      <Breadcrumb items={breadcrumbItems} />
      
      <PageHeader
        title={simulation.name}
        actions={
          <div className="flex gap-3">
            <OutlinedBtn onClick={() => navigate(-1)}>Volver</OutlinedBtn>
            {isAdmin && (
              <PrimaryBtn onClick={() => navigate(`/admin/simulations/${id}/edit`)}>
                Editar Simulación
              </PrimaryBtn>
            )}
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-20">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="w-full h-64 bg-gray-100 rounded-xl mb-6 overflow-hidden relative">
              <ImageWithFallback src={simulation.image} alt={simulation.name} className="w-full h-full object-cover" />
            </div>
            <SectionLabel>Información Básica</SectionLabel>
            <div className="mt-4">
              <p className="text-sm leading-relaxed mb-6" style={{ color: colors.textSecondary }}>
                {simulation.description}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div>
                  <span className="block text-xs font-semibold uppercase mb-1" style={{ color: colors.textSecondary }}>Categoría</span>
                  <span className="text-sm font-medium" style={{ color: colors.textPrimary }}>{simulation.category}</span>
                </div>
                <div>
                  <span className="block text-xs font-semibold uppercase mb-1" style={{ color: colors.textSecondary }}>Dificultad</span>
                  <span className="text-sm font-medium" style={{ color: colors.textPrimary }}>{simulation.difficulty}</span>
                </div>
                <div>
                  <span className="block text-xs font-semibold uppercase mb-1" style={{ color: colors.textSecondary }}>Duración</span>
                  <span className="text-sm font-medium" style={{ color: colors.textPrimary }}>{simulation.duration}</span>
                </div>
                <div>
                  <span className="block text-xs font-semibold uppercase mb-1" style={{ color: colors.textSecondary }}>Versión</span>
                  <span className="text-sm font-medium" style={{ color: colors.textPrimary }}>{simulation.version}</span>
                </div>
              </div>
            </div>
          </Card>

          {isAdmin && (
            <Card>
              <SectionLabel>Visibilidad en Empresas</SectionLabel>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {COMPANIES.filter(c => selectedCompanies.includes(c.id)).map(company => (
                  <div key={company.id} className="flex items-center gap-3 p-3 rounded-xl border bg-gray-50/50" style={{ borderColor: colors.border }}>
                    <div className="w-5 h-5 rounded-full flex items-center justify-center bg-blue-100 text-blue-600">
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <span className="text-sm font-medium" style={{ color: colors.textPrimary }}>{company.name}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 rounded-lg flex items-center gap-2 bg-blue-50/50 text-blue-800">
                <AlertCircle size={16} />
                <p className="text-xs font-medium">Esta información es visible únicamente para el Administrador del Sistema.</p>
              </div>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <SectionLabel>Métricas de Evaluación</SectionLabel>
            <div className="mt-4 space-y-4">
              <div className="p-3 rounded-lg border bg-gray-50/50" style={{ borderColor: colors.border }}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium" style={{ color: colors.textPrimary }}>Tiempo de Respuesta</span>
                  <span className="text-xs font-bold" style={{ color: colors.primary }}>30%</span>
                </div>
                <p className="text-xs" style={{ color: colors.textSecondary }}>Umbral: 70 puntos</p>
              </div>
              <div className="p-3 rounded-lg border bg-gray-50/50" style={{ borderColor: colors.border }}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium" style={{ color: colors.textPrimary }}>Cumplimiento de Proc.</span>
                  <span className="text-xs font-bold" style={{ color: colors.primary }}>40%</span>
                </div>
                <p className="text-xs" style={{ color: colors.textSecondary }}>Umbral: 75 puntos</p>
              </div>
              <div className="p-3 rounded-lg border bg-gray-50/50" style={{ borderColor: colors.border }}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium" style={{ color: colors.textPrimary }}>Uso de EPP</span>
                  <span className="text-xs font-bold" style={{ color: colors.primary }}>30%</span>
                </div>
                <p className="text-xs" style={{ color: colors.textSecondary }}>Umbral: 80 puntos</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}