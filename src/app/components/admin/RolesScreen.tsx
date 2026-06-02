import { useState } from "react";
import { Plus, ChevronDown, ChevronUp, Pencil } from "lucide-react";
import { PageHeader, PrimaryBtn, StatusBadge, colors, Card } from "../shared";

const MODULES = ["Users", "Companies", "Simulations", "Programs", "Reports", "Configuration"];

const PERMISSIONS: Record<string, string[]> = {
  Users: ["view_users", "create_users", "edit_users", "delete_users", "assign_roles"],
  Companies: ["view_companies", "create_companies", "edit_companies", "deactivate_companies"],
  Simulations: ["view_simulations", "create_simulations", "edit_simulations", "manage_metrics"],
  Programs: ["view_programs", "create_programs", "assign_programs", "close_programs"],
  Reports: ["view_global_reports", "view_company_reports", "export_reports"],
  Configuration: ["edit_configuration", "manage_templates", "view_audit_log"],
};

const BASE_ROLES = [
  { id: 1, name: "System Administrator", description: "Full platform access", permCount: 20, status: "active", permissions: Object.values(PERMISSIONS).flat() },
  { id: 2, name: "Company Administrator", description: "Manages one company", permCount: 14, status: "active", permissions: ["view_users", "create_users", "edit_users", "assign_roles", "view_programs", "create_programs", "assign_programs", "close_programs", "view_company_reports", "export_reports"] },
  { id: 3, name: "Coordinator", description: "Manages programs and employees", permCount: 8, status: "active", permissions: ["view_users", "view_programs", "assign_programs", "view_company_reports"] },
  { id: 4, name: "Employee", description: "Access assigned training", permCount: 3, status: "active", permissions: ["view_programs"] },
];

const CUSTOM_ROLES = [
  { id: 10, name: "Safety Inspector", description: "View-only access plus report export", permCount: 5, users: 3, status: "active" },
  { id: 11, name: "HR Assistant", description: "Limited user management", permCount: 4, users: 7, status: "active" },
];

export function RolesScreen() {
  const [activeTab, setActiveTab] = useState<"base" | "additional">("base");
  const [expandedRole, setExpandedRole] = useState<number | null>(null);

  return (
    <div>
      <PageHeader
        title="System Roles"
        actions={<PrimaryBtn><Plus size={16} /> New Role</PrimaryBtn>}
      />

      {/* Tabs */}
      <div className="flex gap-1 mb-6 p-1 bg-white rounded-xl border w-fit" style={{ borderColor: colors.border }}>
        {[{ key: "base", label: "Base Roles" }, { key: "additional", label: "Additional Roles" }].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as "base" | "additional")}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            style={{ backgroundColor: activeTab === tab.key ? colors.primary : "transparent", color: activeTab === tab.key ? "white" : colors.textSecondary }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "base" ? (
        <div className="bg-white rounded-xl border overflow-hidden shadow-sm" style={{ borderColor: colors.border }}>
          {BASE_ROLES.map((role, i) => (
            <div key={role.id} style={{ borderBottom: i < BASE_ROLES.length - 1 ? `1px solid ${colors.border}` : "none" }}>
              <div
                className="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setExpandedRole(expandedRole === role.id ? null : role.id)}
              >
                <div className="flex items-center gap-4">
                  <div>
                    <div className="font-medium" style={{ color: colors.textPrimary }}>{role.name}</div>
                    <div className="text-xs mt-0.5" style={{ color: colors.textSecondary }}>{role.description}</div>
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  <span className="text-sm" style={{ color: colors.textSecondary }}>{role.permCount} permissions</span>
                  <StatusBadge status={role.status} />
                  <button className="p-1.5 rounded-lg hover:bg-gray-200 transition-colors" onClick={e => e.stopPropagation()}>
                    <Pencil size={14} style={{ color: colors.textSecondary }} />
                  </button>
                  {expandedRole === role.id ? <ChevronUp size={16} style={{ color: colors.textSecondary }} /> : <ChevronDown size={16} style={{ color: colors.textSecondary }} />}
                </div>
              </div>

              {expandedRole === role.id && (
                <div className="px-6 pb-5" style={{ backgroundColor: colors.bg }}>
                  <div className="grid grid-cols-3 gap-4 pt-4">
                    {MODULES.map(module => (
                      <div key={module}>
                        <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: colors.textSecondary }}>{module}</p>
                        <div className="space-y-1.5">
                          {(PERMISSIONS[module] || []).map(perm => (
                            <label key={perm} className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={role.permissions.includes(perm)}
                                readOnly
                                className="rounded"
                                style={{ accentColor: colors.primary }}
                              />
                              <span className="text-xs" style={{ color: colors.textPrimary }}>
                                {perm.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase())}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
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
              <div className="flex items-center gap-4 text-sm mb-4">
                <div>
                  <span style={{ color: colors.textSecondary }}>Permissions: </span>
                  <span className="font-semibold" style={{ color: colors.textPrimary }}>{role.permCount}</span>
                </div>
                <div>
                  <span style={{ color: colors.textSecondary }}>Users: </span>
                  <span className="font-semibold" style={{ color: colors.textPrimary }}>{role.users}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors"
                  style={{ borderColor: colors.border, color: colors.textSecondary }}
                >
                  <Pencil size={12} /> Edit
                </button>
                <button
                  className="px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors"
                  style={{ borderColor: colors.error, color: colors.error }}
                >
                  Deactivate
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
