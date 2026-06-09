import { useState } from "react";
import { Camera } from "lucide-react";
import { PageHeader, InputField, PrimaryBtn, colors, Card, SectionLabel, Toast } from "../shared";
import { useAuth } from "../../context/AuthContext";

export function MyProfile() {
  const { user } = useAuth();
  const [form, setForm] = useState({
    firstName: user?.name.split(" ")[0] ?? "",
    lastName: user?.name.split(" ")[1] ?? "",
    email: user?.email ?? "",
  });
  const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" });
  const [toast, setToast] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error">("success");

  const handleSaveProfile = () => {
    setToastType("success");
    setToast("Perfil actualizado exitosamente");
    setTimeout(() => setToast(null), 3000);
  };

  const handleChangePassword = () => {
    if (passwords.new !== passwords.confirm) {
      setToastType("error");
      setToast("Las contraseñas no coinciden");
      setTimeout(() => setToast(null), 3000);
      return;
    }
    if (passwords.new.length < 8) {
      setToastType("error");
      setToast("La contraseña debe tener al menos 8 caracteres");
      setTimeout(() => setToast(null), 3000);
      return;
    }
    setToastType("success");
    setToast("Contraseña actualizada exitosamente");
    setPasswords({ current: "", new: "", confirm: "" });
    setTimeout(() => setToast(null), 3000);
  };

  const initials = user ? user.name.split(" ").map(n => n[0]).join("").toUpperCase() : "U";
  const hue = user ? user.name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) % 360 : 200;

  return (
    <div>
      <PageHeader title="Mi Perfil" subtitle="Gestiona la información de tu cuenta y ajustes de seguridad" />

      <div className="grid grid-cols-2 gap-6">
        {/* Left: Profile Info */}
        <div className="space-y-6">
          <Card>
            <SectionLabel>Información Personal</SectionLabel>

            {/* Avatar */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold"
                  style={{ backgroundColor: `hsl(${hue}, 60%, 40%)` }}
                >
                  {initials}
                </div>
                <button
                  className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center text-white shadow-md border-2 border-white"
                  style={{ backgroundColor: colors.primary }}
                >
                  <Camera size={12} />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <InputField label="Nombre" value={form.firstName} onChange={v => setForm(p => ({ ...p, firstName: v }))} />
                <InputField label="Apellido" value={form.lastName} onChange={v => setForm(p => ({ ...p, lastName: v }))} />
              </div>
              <InputField label="Email" type="email" value={form.email} onChange={() => {}} readOnly hint="El email no se puede cambiar. Contacta a tu administrador." />
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: colors.textPrimary }}>Empresa</label>
                <div className="w-full px-3 py-2.5 rounded-lg border text-sm" style={{ borderColor: colors.border, backgroundColor: colors.bg, color: colors.textSecondary }}>
                  {user?.company ?? "—"}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: colors.textPrimary }}>Rol</label>
                <div className="flex">
                  <span
                    className="text-xs font-medium px-3 py-1.5 rounded-lg"
                    style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}
                  >
                    {user?.role === "employee" ? "Empleado / Aprendiz" :
                     user?.role === "company" ? "Administrador de Empresa" :
                     user?.role === "coordinator" ? "Coordinador" : "Administrador del Sistema"}
                  </span>
                </div>
              </div>
              <PrimaryBtn onClick={handleSaveProfile} className="w-full justify-center">Guardar Perfil</PrimaryBtn>
            </div>
          </Card>
        </div>

        {/* Right: Security */}
        <div>
          <Card>
            <SectionLabel>Seguridad</SectionLabel>
            <h3 className="font-semibold mb-4" style={{ color: colors.textPrimary }}>Cambiar Contraseña</h3>
            <div className="space-y-4">
              <InputField
                label="Contraseña Actual"
                type="password"
                value={passwords.current}
                onChange={v => setPasswords(p => ({ ...p, current: v }))}
                placeholder="••••••••"
              />
              <InputField
                label="Nueva Contraseña"
                type="password"
                value={passwords.new}
                onChange={v => setPasswords(p => ({ ...p, new: v }))}
                placeholder="••••••••"
                hint="Mínimo 8 caracteres"
              />
              <InputField
                label="Confirmar Nueva Contraseña"
                type="password"
                value={passwords.confirm}
                onChange={v => setPasswords(p => ({ ...p, confirm: v }))}
                placeholder="••••••••"
              />
              <button
                onClick={handleChangePassword}
                className="w-full py-2.5 rounded-lg text-white font-semibold text-sm transition-all"
                style={{ backgroundColor: colors.secondary }}
              >
                Actualizar Contraseña
              </button>
            </div>
          </Card>

          <Card className="mt-4">
            <h3 className="font-semibold mb-3" style={{ color: colors.textPrimary }}>Actividad de la Cuenta</h3>
            <div className="space-y-2 text-sm">
              {[
                { label: "Último inicio de sesión", value: "Hoy, 09:23 AM" },
                { label: "Cuenta creada", value: "10 de enero, 2024" },
                { label: "Sesiones este mes", value: "12" },
              ].map(item => (
                <div key={item.label} className="flex justify-between py-1.5 border-b" style={{ borderColor: colors.border }}>
                  <span style={{ color: colors.textSecondary }}>{item.label}</span>
                  <span className="font-medium" style={{ color: colors.textPrimary }}>{item.value}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {toast && <Toast message={toast} type={toastType} onClose={() => setToast(null)} />}
    </div>
  );
}
