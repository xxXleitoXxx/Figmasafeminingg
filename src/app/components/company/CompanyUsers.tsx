import { useState } from "react";
import { Plus, Pencil, ToggleLeft, X, Search } from "lucide-react";
import { PageHeader, PrimaryBtn, StatusBadge, OutlinedBtn, InputField, SelectField, Toggle, Avatar, colors, EmptyState } from "../shared";

const USERS = [
  { id: 1, name: "Juan Pérez", email: "juan@andina.com", role: "Employee", status: "active", regDate: "2024-01-10", lastActivity: "May 25, 2025" },
  { id: 2, name: "Ana Torres", email: "ana@andina.com", role: "Employee", status: "active", regDate: "2024-02-15", lastActivity: "May 24, 2025" },
  { id: 3, name: "Roberto Silva", email: "roberto@andina.com", role: "Coordinator", status: "active", regDate: "2024-01-20", lastActivity: "May 26, 2025" },
  { id: 4, name: "María López", email: "maria@andina.com", role: "Employee", status: "active", regDate: "2024-03-01", lastActivity: "May 23, 2025" },
  { id: 5, name: "Carlos Ruiz", email: "carlos@andina.com", role: "Employee", status: "inactive", regDate: "2024-04-10", lastActivity: "Apr 15, 2025" },
  { id: 6, name: "Elena Vega", email: "elena@andina.com", role: "Coordinator", status: "active", regDate: "2023-11-05", lastActivity: "May 26, 2025" },
];

const ROLE_COLORS: Record<string, string> = {
  Employee: "#3B82F6",
  Coordinator: "#8B5CF6",
  "Company Admin": "#F97316",
};

function UserDrawer({ user, onClose, onSave }: { user?: typeof USERS[0] | null; onClose: () => void; onSave: () => void }) {
  const [form, setForm] = useState({
    firstName: user?.name.split(" ")[0] ?? "",
    lastName: user?.name.split(" ")[1] ?? "",
    email: user?.email ?? "",
    role: user?.role ?? "Employee",
    status: user?.status === "active",
  });

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute right-0 top-0 bottom-0 w-[480px] bg-white shadow-2xl flex flex-col">
        <div className="flex items-center justify-between px-6 py-5 border-b" style={{ borderColor: colors.border }}>
          <h3 className="font-semibold text-base" style={{ color: colors.textPrimary }}>{user ? "Edit User" : "New User"}</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100"><X size={18} /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <InputField label="First Name" value={form.firstName} onChange={v => setForm(p => ({ ...p, firstName: v }))} required />
            <InputField label="Last Name" value={form.lastName} onChange={v => setForm(p => ({ ...p, lastName: v }))} required />
          </div>
          <InputField label="Email" type="email" value={form.email} onChange={v => setForm(p => ({ ...p, email: v }))} required />
          <SelectField
            label="Role"
            value={form.role}
            onChange={v => setForm(p => ({ ...p, role: v }))}
            options={["Employee", "Coordinator", "Safety Inspector", "HR Assistant"].map(r => ({ label: r, value: r }))}
          />
          <Toggle label="Active account" checked={form.status} onChange={v => setForm(p => ({ ...p, status: v }))} />
          {!user && (
            <div className="p-3 rounded-lg text-xs" style={{ backgroundColor: "#EFF6FF", color: "#1D4ED8" }}>
              ✉ A welcome email will be sent to this user automatically upon creation.
            </div>
          )}
        </div>
        <div className="px-6 py-4 border-t flex justify-end gap-3" style={{ borderColor: colors.border }}>
          <OutlinedBtn onClick={onClose}>Cancel</OutlinedBtn>
          <PrimaryBtn onClick={onSave}>{user ? "Save Changes" : "Create User"}</PrimaryBtn>
        </div>
      </div>
    </div>
  );
}

export function CompanyUsers() {
  const [users, setUsers] = useState(USERS);
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [showDrawer, setShowDrawer] = useState(false);
  const [editUser, setEditUser] = useState<typeof USERS[0] | null>(null);
  const [selected, setSelected] = useState<number[]>([]);

  const filtered = users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchTab = activeTab === "all" || (activeTab === "coordinators" && u.role === "Coordinator") || (activeTab === "employees" && u.role === "Employee");
    return matchSearch && matchTab;
  });

  const toggleStatus = (id: number) => setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === "active" ? "inactive" : "active" } : u));
  const toggleSelect = (id: number) => setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  return (
    <div>
      <PageHeader
        title="Users"
        subtitle={`${users.length} users in your company`}
        actions={
          <div className="flex gap-2">
            {selected.length > 0 && (
              <button className="px-4 py-2 rounded-lg text-sm font-medium border" style={{ borderColor: colors.secondary, color: colors.secondary }}>
                Bulk Assign Role ({selected.length})
              </button>
            )}
            <PrimaryBtn onClick={() => { setEditUser(null); setShowDrawer(true); }}><Plus size={16} /> New User</PrimaryBtn>
          </div>
        }
      />

      {/* Tabs */}
      <div className="flex gap-1 mb-5 p-1 bg-white rounded-xl border w-fit" style={{ borderColor: colors.border }}>
        {[{ key: "all", label: "All" }, { key: "coordinators", label: "Coordinators" }, { key: "employees", label: "Employees" }].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            style={{ backgroundColor: activeTab === tab.key ? colors.primary : "transparent", color: activeTab === tab.key ? "white" : colors.textSecondary }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl border p-4 mb-5" style={{ borderColor: colors.border }}>
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: colors.textSecondary }} />
          <input
            placeholder="Search by name or email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg border text-sm outline-none"
            style={{ borderColor: colors.border }}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border overflow-hidden shadow-sm" style={{ borderColor: colors.border }}>
        <table className="w-full text-sm">
          <thead style={{ backgroundColor: colors.bg, borderBottom: `1px solid ${colors.border}` }}>
            <tr>
              <th className="px-5 py-3 w-10">
                <input type="checkbox" className="rounded" style={{ accentColor: colors.primary }}
                  checked={selected.length === filtered.length && filtered.length > 0}
                  onChange={() => setSelected(selected.length === filtered.length ? [] : filtered.map(u => u.id))} />
              </th>
              {["Name", "Email", "Role", "Status", "Registered", "Last Activity", "Actions"].map(h => (
                <th key={h} className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: colors.textSecondary }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={8}><EmptyState title="No users found" /></td></tr>
            ) : filtered.map((u, i) => (
              <tr
                key={u.id}
                className="transition-colors"
                style={{ borderBottom: i < filtered.length - 1 ? `1px solid ${colors.border}` : "none", backgroundColor: selected.includes(u.id) ? "#EFF6FF" : "" }}
                onMouseEnter={e => { if (!selected.includes(u.id)) (e.currentTarget as HTMLTableRowElement).style.backgroundColor = "#F8FAFC"; }}
                onMouseLeave={e => { if (!selected.includes(u.id)) (e.currentTarget as HTMLTableRowElement).style.backgroundColor = ""; }}
              >
                <td className="px-5 py-3.5">
                  <input type="checkbox" className="rounded" style={{ accentColor: colors.primary }} checked={selected.includes(u.id)} onChange={() => toggleSelect(u.id)} />
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <Avatar name={u.name} size={32} />
                    <span className="font-medium" style={{ color: colors.textPrimary }}>{u.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3.5" style={{ color: colors.textSecondary }}>{u.email}</td>
                <td className="px-5 py-3.5">
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full" style={{ backgroundColor: `${ROLE_COLORS[u.role]}15`, color: ROLE_COLORS[u.role] }}>{u.role}</span>
                </td>
                <td className="px-5 py-3.5"><StatusBadge status={u.status} /></td>
                <td className="px-5 py-3.5 text-xs" style={{ color: colors.textSecondary }}>{new Date(u.regDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</td>
                <td className="px-5 py-3.5 text-xs" style={{ color: colors.textSecondary }}>{u.lastActivity}</td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <button onClick={() => { setEditUser(u); setShowDrawer(true); }} className="p-1.5 rounded-lg hover:bg-gray-100"><Pencil size={15} style={{ color: colors.textSecondary }} /></button>
                    <button onClick={() => toggleStatus(u.id)} className="p-1.5 rounded-lg hover:bg-gray-100"><ToggleLeft size={15} style={{ color: u.status === "active" ? colors.success : colors.error }} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showDrawer && (
        <UserDrawer user={editUser} onClose={() => { setShowDrawer(false); setEditUser(null); }} onSave={() => { setShowDrawer(false); setEditUser(null); }} />
      )}
    </div>
  );
}
