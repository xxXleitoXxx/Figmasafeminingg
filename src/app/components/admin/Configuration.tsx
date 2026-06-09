import { useState } from "react";
import {
  PageHeader,
  Toggle,
  colors,
  Card,
  PrimaryBtn,
  Toast,
} from "../shared";

export function Configuration() {
  const [activeTab, setActiveTab] = useState("general");
  const [toast, setToast] = useState<string | null>(null);

  const [general, setGeneral] = useState({
    platformName: "SafeMining VR",
    issuingEntity: "SafeMining Corp.",
    contactEmail: "admin@safemining.com",
  });
  const [security, setSecurity] = useState({
    jwtWeb: 24,
    jwtVR: 8,
    loginAttempts: 5,
    blockDuration: 30,
  });
  const [evalDefaults, setEvalDefaults] = useState({
    threshold: 75,
  });
  const [notifications, setNotifications] = useState({
    programAssignment: true,
    approval: true,
    rejection: true,
    expiryWarning: true,
    certificateIssued: true,
    expiryDays: 7,
  });
  const [showCertPreview, setShowCertPreview] = useState(false);

  const save = () => {
    setToast("Configuración guardada exitosamente");
    setTimeout(() => setToast(null), 3000);
  };

  const tabs = [
    { key: "general", label: "General" },
    { key: "security", label: "Seguridad" },
    { key: "certificate", label: "Plantilla de Certificado" },
  ];

  return (
    <div>
      <PageHeader
        title="Configuración del Sistema"
        subtitle="Gestionar ajustes y parámetros globales de la plataforma"
      />

      <div
        className="flex gap-1 mb-6 p-1 bg-white rounded-xl border w-fit"
        style={{ borderColor: colors.border }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
            style={{
              backgroundColor:
                activeTab === tab.key
                  ? colors.primary
                  : "transparent",
              color:
                activeTab === tab.key
                  ? "white"
                  : colors.textSecondary,
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "general" && (
        <Card className="max-w-xl">
          <h3
            className="font-semibold mb-5"
            style={{ color: colors.textPrimary }}
          >
            Ajustes Generales
          </h3>
          <div className="space-y-4">
            <div>
              <label
                className="block text-sm font-medium mb-1"
                style={{ color: colors.textPrimary }}
              >
                Nombre de la Plataforma
              </label>
              <input
                value={general.platformName}
                onChange={(e) =>
                  setGeneral((p) => ({
                    ...p,
                    platformName: e.target.value,
                  }))
                }
                className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none"
                style={{ borderColor: colors.border }}
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-1"
                style={{ color: colors.textPrimary }}
              >
                Entidad Emisora
              </label>
              <input
                value={general.issuingEntity}
                onChange={(e) =>
                  setGeneral((p) => ({
                    ...p,
                    issuingEntity: e.target.value,
                  }))
                }
                className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none"
                style={{ borderColor: colors.border }}
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-1"
                style={{ color: colors.textPrimary }}
              >
                Logo
              </label>
              <div
                className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                style={{ borderColor: colors.border }}
              >
                <p
                  className="text-sm"
                  style={{ color: colors.textSecondary }}
                >
                  Haz clic para subir logo (PNG, SVG)
                </p>
              </div>
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-1"
                style={{ color: colors.textPrimary }}
              >
                Email de Contacto
              </label>
              <input
                type="email"
                value={general.contactEmail}
                onChange={(e) =>
                  setGeneral((p) => ({
                    ...p,
                    contactEmail: e.target.value,
                  }))
                }
                className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none"
                style={{ borderColor: colors.border }}
              />
            </div>
            <PrimaryBtn onClick={save}>
              Guardar Ajustes Generales
            </PrimaryBtn>
          </div>
        </Card>
      )}

      {activeTab === "security" && (
        <Card className="max-w-xl">
          <h3
            className="font-semibold mb-5"
            style={{ color: colors.textPrimary }}
          >
            Ajustes de Seguridad
          </h3>
          <div className="space-y-5">
            {[
              {
                label: "Caducidad JWT – Web (horas)",
                key: "jwtWeb",
                value: security.jwtWeb,
              },
              {
                label: "Caducidad JWT – Visor VR (horas)",
                key: "jwtVR",
                value: security.jwtVR,
              },
              {
                label: "Intentos Máx. de Login Antes de Bloqueo",
                key: "loginAttempts",
                value: security.loginAttempts,
              },
              {
                label: "Duración del Bloqueo (minutos)",
                key: "blockDuration",
                value: security.blockDuration,
              },
            ].map((field) => (
              <div key={field.key}>
                <label
                  className="block text-sm font-medium mb-1"
                  style={{ color: colors.textPrimary }}
                >
                  {field.label}
                </label>
                <input
                  type="number"
                  value={field.value}
                  onChange={(e) =>
                    setSecurity((p) => ({
                      ...p,
                      [field.key]: Number(e.target.value),
                    }))
                  }
                  className="w-32 px-3 py-2.5 rounded-lg border text-sm outline-none text-center"
                  style={{ borderColor: colors.border }}
                />
              </div>
            ))}
            <PrimaryBtn onClick={save}>
              Guardar Ajustes de Seguridad
            </PrimaryBtn>
          </div>
        </Card>
      )}

      {activeTab === "certificate" && (
        <Card className="max-w-2xl">
          <h3
            className="font-semibold mb-5"
            style={{ color: colors.textPrimary }}
          >
            Plantilla de Certificado
          </h3>
          <div className="space-y-5">
            <div>
              <label
                className="block text-sm font-medium mb-1"
                style={{ color: colors.textPrimary }}
              >
                Texto de Introducción
              </label>
              <textarea
                defaultValue="Por la presente se certifica que la siguiente persona ha completado con éxito el entrenamiento de seguridad en RV requerido."
                rows={3}
                className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none resize-none"
                style={{ borderColor: colors.border }}
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: colors.textPrimary }}
              >
                Campos Visibles
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  "Nombre del Empleado",
                  "Empresa",
                  "Nombre del Programa",
                  "Fecha de Finalización",
                  "Puntaje",
                  "Coordinador",
                ].map((f) => (
                  <label
                    key={f}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      defaultChecked
                      className="rounded"
                      style={{ accentColor: colors.primary }}
                    />
                    <span
                      className="text-sm"
                      style={{ color: colors.textPrimary }}
                    >
                      {f}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-1"
                style={{ color: colors.textPrimary }}
              >
                Texto de Firma Digital
              </label>
              <input
                defaultValue="Carlos Mendoza – Jefe de Seguridad"
                className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none"
                style={{ borderColor: colors.border }}
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-1"
                style={{ color: colors.textPrimary }}
              >
                Texto de Pie de Página
              </label>
              <input
                defaultValue="SafeMining VR | Plataforma de Entrenamiento de Seguridad Minera | www.safemining.vr"
                className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none"
                style={{ borderColor: colors.border }}
              />
            </div>
            <div className="flex gap-3">
              <PrimaryBtn onClick={save}>
                Guardar Plantilla
              </PrimaryBtn>
              <button
                onClick={() => setShowCertPreview(true)}
                className="px-4 py-2 rounded-lg border text-sm font-medium transition-colors"
                style={{
                  borderColor: colors.border,
                  color: colors.textSecondary,
                }}
              >
                Previsualizar Certificado
              </button>
            </div>
          </div>
        </Card>
      )}

      {showCertPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setShowCertPreview(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl w-[640px] p-0 overflow-hidden">
            <div
              className="h-2"
              style={{ backgroundColor: colors.primary }}
            />
            <div className="p-8">
              <div
                className="text-center border-4 rounded-xl p-8"
                style={{ borderColor: colors.secondary }}
              >
                <div
                  className="text-xs font-semibold uppercase tracking-widest mb-4"
                  style={{ color: colors.textSecondary }}
                >
                  SafeMining VR
                </div>
                <h2
                  className="text-2xl font-bold mb-2"
                  style={{ color: colors.primary }}
                >
                  Certificado de Finalización
                </h2>
                <p
                  className="text-sm mb-6"
                  style={{ color: colors.textSecondary }}
                >
                  Por la presente se certifica que la siguiente
                  persona ha completado con éxito el
                  entrenamiento de seguridad en RV requerido.
                </p>
                <div
                  className="text-2xl font-bold mb-1"
                  style={{ color: colors.textPrimary }}
                >
                  Juan Pérez
                </div>
                <div
                  className="text-sm mb-4"
                  style={{ color: colors.textSecondary }}
                >
                  Minera Andina S.A.
                </div>
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div
                    className="font-semibold text-lg"
                    style={{ color: colors.textPrimary }}
                  >
                    Seguridad y Evacuación de Incendios – Q2 2025
                  </div>
                  <div
                    className="text-sm mt-1"
                    style={{ color: colors.textSecondary }}
                  >
                    Completado: 26 de Mayo, 2025 • Puntaje: 92/100
                  </div>
                </div>
                <div className="flex justify-between items-end">
                  <div className="text-left">
                    <div
                      className="border-t pt-2 text-xs"
                      style={{
                        borderColor: colors.border,
                        color: colors.textSecondary,
                      }}
                    >
                      Carlos Mendoza
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: colors.textSecondary }}
                    >
                      Jefe de Seguridad
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className="text-3xl mb-1"
                      style={{ color: colors.secondary }}
                    >
                      ⛏
                    </div>
                  </div>
                </div>
                <div
                  className="text-xs mt-4"
                  style={{ color: colors.textSecondary }}
                >
                  SafeMining VR | Plataforma de Entrenamiento de
                  Seguridad Minera
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowCertPreview(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors text-sm"
            >
              ✕
            </button>
          </div>
        </div>
      )}

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