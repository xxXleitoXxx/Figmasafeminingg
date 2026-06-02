import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Check, Users } from "lucide-react";
import { Breadcrumb, PageHeader, PrimaryBtn, OutlinedBtn, Toggle, Avatar, colors, Card, ConfirmModal, Toast } from "../shared";

const EMPLOYEES = [
  { id: 1, name: "Juan Pérez", role: "Employee", email: "juan@andina.com", assigned: false },
  { id: 2, name: "Ana Torres", role: "Employee", email: "ana@andina.com", assigned: true },
  { id: 3, name: "Carlos Ruiz", role: "Employee", email: "carlos@andina.com", assigned: false },
  { id: 4, name: "María López", role: "Employee", email: "maria@andina.com", assigned: false },
  { id: 5, name: "Pedro Rojas", role: "Employee", email: "pedro@andina.com", assigned: false },
  { id: 6, name: "Elena Torres", role: "Employee", email: "elena@andina.com", assigned: true },
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
    setToast(`${selected.length} employee${selected.length !== 1 ? "s" : ""} assigned successfully`);
    setTimeout(() => { setToast(null); navigate("/company/programs"); }, 2000);
  };

  return (
    <div>
      <Breadcrumb items={[
        { label: "Programs", onClick: () => navigate("/company/programs") },
        { label: "Fire Safety & Evacuation Q2 2025", onClick: () => navigate("/company/programs") },
        { label: "Assign Employees" }
      ]} />

      <PageHeader
        title="Assign Program"
        subtitle="Fire Safety & Evacuation Q2 2025"
      />

      {/* Tabs */}
      <div className="flex gap-1 mb-6 p-1 bg-white rounded-xl border w-fit" style={{ borderColor: colors.border }}>
        {[{ key: "individual", label: "Individual Assignment" }, { key: "bulk", label: "Bulk Assignment" }].map(tab => (
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
              <h3 className="font-semibold mb-4" style={{ color: colors.textPrimary }}>Select Employees</h3>
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
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: `${colors.success}15`, color: colors.success }}>Already assigned</span>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          ) : (
            <Card>
              <h3 className="font-semibold mb-4" style={{ color: colors.textPrimary }}>Bulk Assignment</h3>
              <div className="space-y-4">
                <Toggle
                  label="Select all active employees not yet assigned"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
                <div className="p-4 rounded-xl" style={{ backgroundColor: colors.bg }}>
                  <p className="text-sm" style={{ color: colors.textSecondary }}>
                    <span className="font-semibold" style={{ color: colors.textPrimary }}>{unassigned.length}</span> employees available for assignment
                  </p>
                  <p className="text-xs mt-1" style={{ color: colors.textSecondary }}>
                    ({EMPLOYEES.filter(e => e.assigned).length} already assigned to this program)
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
              <h3 className="font-semibold" style={{ color: colors.textPrimary }}>Assignment Summary</h3>
            </div>

            <div className="p-4 rounded-xl mb-4" style={{ backgroundColor: colors.bg }}>
              <div className="text-3xl font-bold mb-1" style={{ color: colors.primary }}>{selected.length}</div>
              <p className="text-sm" style={{ color: colors.textSecondary }}>
                employee{selected.length !== 1 ? "s" : ""} will be assigned to
              </p>
              <p className="text-sm font-semibold mt-1" style={{ color: colors.textPrimary }}>Fire Safety & Evacuation Q2 2025</p>
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
              Assign {selected.length > 0 ? `(${selected.length})` : ""}
            </PrimaryBtn>
            <OutlinedBtn onClick={() => navigate("/company/programs")} className="w-full justify-center mt-2">
              Cancel
            </OutlinedBtn>
          </Card>
        </div>
      </div>

      {showConfirm && (
        <ConfirmModal
          title="Confirm Assignment"
          description={`Are you sure you want to assign ${selected.length} employee${selected.length !== 1 ? "s" : ""} to this program? They will receive a notification.`}
          onConfirm={handleAssign}
          onCancel={() => setShowConfirm(false)}
          confirmLabel="Assign Employees"
        />
      )}

      {toast && <Toast message={toast} type="success" onClose={() => setToast(null)} />}
    </div>
  );
}
