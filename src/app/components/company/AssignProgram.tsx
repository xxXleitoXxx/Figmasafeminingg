import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Check, Users } from "lucide-react";
import { Breadcrumb, PageHeader, PrimaryBtn, OutlinedBtn, Toggle, Avatar, colors, Card, ConfirmModal, Toast } from "../shared";

const EMPLOYEES = [
  { id: 1, name: "Juan Pérez", role: "Empleado", email: "juan@andina.com", assigned: false },
  { id: 2, name: "Ana Torres", role: "Empleado", email: "ana@andina.com", assigned: true },
  { id: 3, name: "Carlos Ruiz", role: "Empleado", email: "carlos@andina.com", assigned: false },
  { id: 4, name: "María López", role: "Empleado", email: "maria@andina.com", assigned: false },
  { id: 5, name: "Pedro Rojas", role: "Empleado", email: "pedro@andina.com", assigned: false },
  { id: 6, name: "Elena Torres", role: "Empleado", email: "elena@andina.com", assigned: true },
];

export function AssignProgram() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<"individual" | "bulk">("individual");
  const [selectAll, setSelectAll] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const unassigned = EMPLOYEES.filter(e => !e.assigned);

  const toggleSelect = (id: number) => setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const handleSelectAll = (v: boolean) => {
    setSelectAll(v);
    setSelected(v ? unassigned.map(e => e.id) : []);
  };

  const handleAssign = () => {
    setShowConfirm(false);
    setToast(`${selected.length} empleado${selected.length !== 1 ? "s" : ""} asignado${selected.length !== 1 ? "s" : ""} exitosamente`);
    setTimeout(() => { setToast(null); navigate("/company/programs"); }, 2000);
  };

  return (
    <div>
      <Breadcrumb items={[
        { label: "Programas", onClick: () => navigate("/company/programs") },
        { label: "Seguridad y Evacuación de Incendios Q2 2025", onClick: () => navigate("/company/programs") },
        { label: "Asignar Empleados" }
      ]} />

      <PageHeader
        title="Asignar Programa"
        subtitle="Seguridad y Evacuación de Incendios Q2 2025"
      />

      {/* Tabs */}
      <div className="flex gap-1 mb-6 p-1 bg-white rounded-xl border w-fit" style={{ borderColor: colors.border }}>
        {[{ key: "individual", label: "Asignación Individual" }, { key: "bulk", label: "Asignación Masiva" }].map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key as "individual" | "bulk")}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            style={{ backgroundColor: activeTab === tab.key ? colors.primary : "transparent", color: activeTab === tab.key ? "white" : colors.textSecondary }}>
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          {activeTab === "individual" ? (
            <Card>
              <h3 className="font-semibold mb-4" style={{ color: colors.textPrimary }}>Seleccionar Empleados</h3>
              <div className="space-y-2">
                {EMPLOYEES.map(emp => (
                  <div
                    key={emp.id}
                    onClick={() => !emp.assigned && toggleSelect(emp.id)}
                    className="flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all"
                    style={{
                      borderColor: selected.includes(emp.id) ? colors.primary : colors.border,
                      backgroundColor: emp.assigned ? colors.bg : selected.includes(emp.id) ? `${colors.primary}08` : "white",
                      opacity: emp.assigned ? 0.7 : 1,
                    }}
                  >
                    <div className="flex-shrink-0">
                      {emp.assigned ? (
                        <div className="w-5 h-5 rounded flex items-center justify-center" style={{ backgroundColor: `${colors.success}20` }}>
                          <Check size={12} style={{ color: colors.success }} />
                        </div>
                      ) : (
                        <input
                          type="checkbox"
                          checked={selected.includes(emp.id)}
                          onChange={() => {}}
                          style={{ accentColor: colors.primary }}
                        />
                      )}
                    </div>
                    <Avatar name={emp.name} size={32} />
                    <div className="flex-1">
                      <p className="text-sm font-medium" style={{ color: colors.textPrimary }}>{emp.name}</p>
                      <p className="text-xs" style={{ color: colors.textSecondary }}>{emp.email} · {emp.role}</p>
                    </div>
                    {emp.assigned && (
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: `${colors.success}15`, color: colors.success }}>Ya asignado</span>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          ) : (
            <Card>
              <h3 className="font-semibold mb-4" style={{ color: colors.textPrimary }}>Asignación Masiva</h3>
              <div className="space-y-4">
                <Toggle
                  label="Seleccionar todos los empleados activos aún no asignados"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
                <div className="p-4 rounded-xl" style={{ backgroundColor: colors.bg }}>
                  <p className="text-sm" style={{ color: colors.textSecondary }}>
                    <span className="font-semibold" style={{ color: colors.textPrimary }}>{unassigned.length}</span> empleados disponibles para asignar
                  </p>
                  <p className="text-xs mt-1" style={{ color: colors.textSecondary }}>
                    ({EMPLOYEES.filter(e => e.assigned).length} ya asignados a este programa)
                  </p>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Summary sidebar */}
        <div>
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <Users size={18} style={{ color: colors.primary }} />
              <h3 className="font-semibold" style={{ color: colors.textPrimary }}>Resumen de Asignación</h3>
            </div>

            <div className="p-4 rounded-xl mb-4" style={{ backgroundColor: colors.bg }}>
              <div className="text-3xl font-bold mb-1" style={{ color: colors.primary }}>{selected.length}</div>
              <p className="text-sm" style={{ color: colors.textSecondary }}>
                empleado{selected.length !== 1 ? "s" : ""} será{selected.length !== 1 ? "n" : ""} asignado{selected.length !== 1 ? "s" : ""} a
              </p>
              <p className="text-sm font-semibold mt-1" style={{ color: colors.textPrimary }}>Seguridad y Evacuación de Incendios Q2 2025</p>
            </div>

            {selected.length > 0 && (
              <div className="space-y-2 mb-4 max-h-40 overflow-y-auto">
                {selected.map(id => {
                  const emp = EMPLOYEES.find(e => e.id === id);
                  if (!emp) return null;
                  return (
                    <div key={id} className="flex items-center gap-2">
                      <Avatar name={emp.name} size={24} />
                      <span className="text-xs" style={{ color: colors.textPrimary }}>{emp.name}</span>
                    </div>
                  );
                })}
              </div>
            )}

            <PrimaryBtn
              onClick={() => selected.length > 0 && setShowConfirm(true)}
              disabled={selected.length === 0}
              className="w-full justify-center"
            >
              Asignar {selected.length > 0 ? `(${selected.length})` : ""}
            </PrimaryBtn>
            <OutlinedBtn onClick={() => navigate("/company/programs")} className="w-full justify-center mt-2">
              Cancelar
            </OutlinedBtn>
          </Card>
        </div>
      </div>

      {showConfirm && (
        <ConfirmModal
          title="Confirmar Asignación"
          description={`¿Estás seguro de que quieres asignar ${selected.length} empleado${selected.length !== 1 ? "s" : ""} a este programa? Recibirán una notificación.`}
          onConfirm={handleAssign}
          onCancel={() => setShowConfirm(false)}
          confirmLabel="Asignar Empleados"
        />
      )}

      {toast && <Toast message={toast} type="success" onClose={() => setToast(null)} />}
    </div>
  );
}
