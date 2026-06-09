import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { X, UserPlus } from "lucide-react";
import { PageHeader, PrimaryBtn, OutlinedBtn, InputField, Toggle, SectionLabel, Avatar, colors, Card, Breadcrumb, Toast } from "../shared";

const MOCK_ADMINS = [
  { id: 1, name: "Laura Gómez", email: "laura@andina.com" },
  { id: 2, name: "Diego Torres", email: "diego@andina.com" },
];

const AVAILABLE_ADMINS = [
  { id: 3, name: "María Rodríguez", email: "maria@safemining.com" },
  { id: 4, name: "Carlos Ruiz", email: "carlos@safemining.com" },
];

export function CompanyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === "new";

  const [form, setForm] = useState({
    razonSocial: isNew ? "" : "Minera Andina S.A.",
    tradeName: isNew ? "" : "Andina Mining",
    cuit: isNew ? "" : "30-71234567-8",
    email: isNew ? "" : "admin@andina.com",
    status: true,
  });
  const [admins, setAdmins] = useState(isNew ? [] : MOCK_ADMINS);
  const [showAdminSearch, setShowAdminSearch] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const handleSave = () => {
    setToast(isNew ? "Empresa creada exitosamente" : "Cambios guardados exitosamente");
    setTimeout(() => { setToast(null); navigate("/admin/companies"); }, 2000);
  };

  const removeAdmin = (id: number) => setAdmins(prev => prev.filter(a => a.id !== id));
  const addAdmin = (admin: typeof AVAILABLE_ADMINS[0]) => {
    setAdmins(prev => [...prev, admin]);
    setShowAdminSearch(false);
  };

  return (
    <div>
      <Breadcrumb items={[
        { label: "Empresas", onClick: () => navigate("/admin/companies") },
        { label: isNew ? "Nueva Empresa" : "Minera Andina S.A." }
      ]} />

      <PageHeader
        title={isNew ? "Nueva Empresa" : "Minera Andina S.A."}
        subtitle={isNew ? "Registrar una nueva empresa en la plataforma" : "Editar detalles de la empresa y gestionar administradores"}
        actions={
          <>
            <OutlinedBtn onClick={() => navigate("/admin/companies")}>Cancelar</OutlinedBtn>
            <PrimaryBtn onClick={handleSave}>Guardar Cambios</PrimaryBtn>
          </>
        }
      />

      <div className="grid grid-cols-3 gap-6">
        {/* Left: Form */}
        <div className="col-span-2 space-y-6">
          <Card>
            <SectionLabel>Información de la Empresa</SectionLabel>
            <div className="grid grid-cols-2 gap-5">
              <InputField label="Razón Social" value={form.razonSocial} onChange={v => setForm(p => ({ ...p, razonSocial: v }))} required />
              <InputField label="Nombre Comercial" value={form.tradeName} onChange={v => setForm(p => ({ ...p, tradeName: v }))} required />
              <InputField label="RUT/CUIT" value={form.cuit} onChange={v => setForm(p => ({ ...p, cuit: v }))} required placeholder="XX-XXXXXXXX-X" />
              <InputField label="Email de Contacto" type="email" value={form.email} onChange={v => setForm(p => ({ ...p, email: v }))} required />
            </div>
            <div className="mt-5">
              <Toggle label="Empresa activa" checked={form.status} onChange={v => setForm(p => ({ ...p, status: v }))} />
            </div>
          </Card>

          {/* Administrators */}
          <Card>
            <SectionLabel>Administradores Asignados</SectionLabel>
            <div className="space-y-3 mb-4">
              {admins.length === 0 ? (
                <p className="text-sm py-4 text-center" style={{ color: colors.textSecondary }}>No hay administradores asignados aún</p>
              ) : admins.map(a => (
                <div
                  key={a.id}
                  className="flex items-center justify-between p-3 rounded-lg border"
                  style={{ borderColor: colors.border }}
                >
                  <div className="flex items-center gap-3">
                    <Avatar name={a.name} size={36} />
                    <div>
                      <div className="text-sm font-medium" style={{ color: colors.textPrimary }}>{a.name}</div>
                      <div className="text-xs" style={{ color: colors.textSecondary }}>{a.email}</div>
                    </div>
                  </div>
                  <button onClick={() => removeAdmin(a.id)} className="p-1.5 rounded-lg hover:bg-red-50 transition-colors">
                    <X size={14} style={{ color: colors.error }} />
                  </button>
                </div>
              ))}
            </div>

            {showAdminSearch ? (
              <div className="border rounded-xl p-4" style={{ borderColor: colors.border }}>
                <p className="text-sm font-medium mb-3" style={{ color: colors.textPrimary }}>Seleccionar Administrador</p>
                {AVAILABLE_ADMINS.filter(a => !admins.find(ax => ax.id === a.id)).map(a => (
                  <button
                    key={a.id}
                    onClick={() => addAdmin(a)}
                    className="w-full flex items-center gap-3 p-2.5 rounded-lg text-left hover:bg-gray-50 transition-colors"
                  >
                    <Avatar name={a.name} size={32} />
                    <div>
                      <div className="text-sm font-medium" style={{ color: colors.textPrimary }}>{a.name}</div>
                      <div className="text-xs" style={{ color: colors.textSecondary }}>{a.email}</div>
                    </div>
                  </button>
                ))}
                <button onClick={() => setShowAdminSearch(false)} className="text-xs mt-2" style={{ color: colors.textSecondary }}>Cancelar</button>
              </div>
            ) : (
              <button
                onClick={() => setShowAdminSearch(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-colors"
                style={{ borderColor: colors.secondary, color: colors.secondary }}
              >
                <UserPlus size={16} /> Asignar Administrador
              </button>
            )}
          </Card>
        </div>

        {/* Right: Summary */}
        <div className="space-y-4">
          <Card>
            <h3 className="font-semibold text-sm mb-4" style={{ color: colors.textPrimary }}>Resumen de la Empresa</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span style={{ color: colors.textSecondary }}>Creada</span>
                <span style={{ color: colors.textPrimary }}>15 Ene, 2024</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: colors.textSecondary }}>Última modificación</span>
                <span style={{ color: colors.textPrimary }}>20 May, 2025</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: colors.textSecondary }}>Usuarios activos</span>
                <span className="font-semibold" style={{ color: colors.textPrimary }}>84</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: colors.textSecondary }}>Programas activos</span>
                <span className="font-semibold" style={{ color: colors.textPrimary }}>7</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: colors.textSecondary }}>Sesiones VR totales</span>
                <span className="font-semibold" style={{ color: colors.textPrimary }}>1,245</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: colors.textSecondary }}>Certificados emitidos</span>
                <span className="font-semibold" style={{ color: colors.textPrimary }}>312</span>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="font-semibold text-sm mb-3" style={{ color: colors.textPrimary }}>Estado</h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: form.status ? colors.success : colors.error }} />
              <span className="text-sm font-medium" style={{ color: form.status ? colors.success : colors.error }}>
                {form.status ? "Activo" : "Inactivo"}
              </span>
            </div>
          </Card>
        </div>
      </div>

      {toast && <Toast message={toast} type="success" onClose={() => setToast(null)} />}
    </div>
  );
}
