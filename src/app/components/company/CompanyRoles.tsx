import { useState } from "react";
import { Plus, Pencil, Eye, X } from "lucide-react";
import { PageHeader, PrimaryBtn, StatusBadge, colors, Card, SectionLabel } from "../shared";

const STANDARD_ROLES = [
  { id: 1, name: "Company Administrator", description: "Full company management access", permissions: 14 },
  { id: 2, name: "Coordinator", description: "Manages programs and employees", permissions: 8 },
  { id: 3, name: "Employee", description: "Access to assigned training content", permissions: 3 },
];

const CUSTOM_ROLES = [
  { id: 10, name: "Safety Inspector", description: "View reports and export data", users: 3, status: "active" },
  { id: 11, name: "HR Assistant", description: "Manage employee accounts only", users: 7, status: "active" },
];

const PERMISSIONS_BY_MODULE = {
  Training: ["view_programs", "assign_programs", "create_programs"],
  Users: ["view_users", "create_user_employee", "edit_users"],
  Reports: ["view_reports", "export_reports"],
  Settings: ["view_settings"],
};

function CreateRoleModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [perms, setPerms] = useState<string[]>([]);

  const toggle = (p: string) => setPerms(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-2xl w-[560px] flex flex-col max-h-[80vh]">
        <div className="flex items-center justify-between px-6 py-5 border-b" style={{ borderColor: colors.border }}>
          <h3 className="font-semibold" style={{ color: colors.textPrimary }}>New Custom Role</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100"><X size={18} /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: colors.textPrimary }}>Role Name *</label>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Senior Coordinator"
              className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none" style={{ borderColor: colors.border }} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: colors.textPrimary }}>Description</label>
            <textarea value={desc} onChange={e => setDesc(e.target.value)} rows={2}
              className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none resize-none" style={{ borderColor: colors.border }} />
          </div>
          <div>
            <SectionLabel>Permissions</SectionLabel>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(PERMISSIONS_BY_MODULE).map(([module, ps]) => (
                <div key={module}>
                  <p className="text-xs font-semibold mb-2" style={{ color: colors.textSecondary }}>{module}</p>
                  <div className="space-y-1.5">
                    {ps.map(p => (
                      <label key={p} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={perms.includes(p)} onChange={() => toggle(p)} style={{ accentColor: colors.primary }} />
                        <span className="text-xs" style={{ color: colors.textPrimary }}>{p.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase())}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="px-6 py-4 border-t flex justify-end gap-3" style={{ borderColor: colors.border }}>
          <button onClick={onClose} className="px-4 py-2 rounded-lg border text-sm font-medium" style={{ borderColor: colors.border, color: colors.textSecondary }}>Cancel</button>
          <PrimaryBtn onClick={onClose}>Create Role</PrimaryBtn>
        </div>
      </div>
    </div>
  );
}

export function CompanyRoles() {
  const [showCreate, setShowCreate] = useState(false);

  return (
    <div>
      <PageHeader
        title="Company Roles"
        actions={<PrimaryBtn onClick={() => setShowCreate(true)}><Plus size={16} /> New Custom Role</PrimaryBtn>}
      />

      {/* Standard Roles */}
      <div className="mb-6">
        <h3 className="font-semibold text-base mb-4" style={{ color: colors.textPrimary }}>Standard Roles</h3>
        <div className="bg-white rounded-xl border shadow-sm overflow-hidden" style={{ borderColor: colors.border }}>
          {STANDARD_ROLES.map((role, i) => (
            <div
              key={role.id}
              className="flex items-center justify-between px-6 py-4"
              style={{ borderBottom: i < STANDARD_ROLES.length - 1 ? `1px solid ${colors.border}` : "none" }}
            >
              <div>
                <div className="font-medium" style={{ color: colors.textPrimary }}>{role.name}</div>
                <div className="text-xs mt-0.5" style={{ color: colors.textSecondary }}>{role.description}</div>
              </div>
              <div className="flex items-center gap-5">
                <span className="text-sm" style={{ color: colors.textSecondary }}>{role.permissions} permissions</span>
                <button className="flex items-center gap-1.5 p-1.5 rounded-lg hover:bg-gray-100 transition-colors" style={{ color: colors.textSecondary }}>
                  <Eye size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Roles */}
      <div>
        <h3 className="font-semibold text-base mb-4" style={{ color: colors.textPrimary }}>Custom Roles</h3>
        {CUSTOM_ROLES.length === 0 ? (
          <Card className="text-center py-8">
            <p className="text-sm" style={{ color: colors.textSecondary }}>No custom roles created yet.</p>
            <PrimaryBtn onClick={() => setShowCreate(true)} className="mx-auto mt-3"><Plus size={16} /> Create First Role</PrimaryBtn>
          </Card>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {CUSTOM_ROLES.map(role => (
              <Card key={role.id}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold" style={{ color: colors.textPrimary }}>{role.name}</h4>
                    <p className="text-xs mt-0.5" style={{ color: colors.textSecondary }}>{role.description}</p>
                  </div>
                  <StatusBadge status={role.status} />
                </div>
                <div className="text-sm mb-4" style={{ color: colors.textSecondary }}>
                  <span className="font-semibold" style={{ color: colors.textPrimary }}>{role.users}</span> users assigned
                </div>
                <div className="flex gap-2">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium" style={{ borderColor: colors.border, color: colors.textSecondary }}>
                    <Pencil size={12} /> Edit
                  </button>
                  <button
                    className="px-3 py-1.5 rounded-lg border text-xs font-medium"
                    style={{ borderColor: role.users > 0 ? colors.border : colors.error, color: role.users > 0 ? colors.textSecondary : colors.error }}
                    title={role.users > 0 ? `Cannot deactivate: ${role.users} users assigned` : "Deactivate role"}
                  >
                    {role.users > 0 ? `${role.users} active users` : "Deactivate"}
                  </button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {showCreate && <CreateRoleModal onClose={() => setShowCreate(false)} />}
    </div>
  );
}
