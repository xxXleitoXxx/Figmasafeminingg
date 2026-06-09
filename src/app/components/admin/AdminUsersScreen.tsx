import { useState } from "react";
import { Plus, Pencil, ToggleLeft, X, Search } from "lucide-react";
import { PageHeader, PrimaryBtn, StatusBadge, OutlinedBtn, InputField, SelectField, Toggle, Avatar, colors, EmptyState } from "../shared";

const USERS = [
  { id: 1, name: "Laura Gómez", email: "laura@andina.com", company: "Minera Andina S.A.", status: "active", createdAt: "2024-01-20" },
  { id: 2, name: "Diego Torres", email: "diego@codelco.cl", company: "Codelco Norte", status: "active", createdAt: "2024-02-15" },
  { id: 3, name: "Ana Soto", email: "ana@goldfield.cl", company: "Gold Field Chile", status: "inactive", createdAt: "2024-03-01" },
  { id: 4, name: "Roberto Fuentes", email: "roberto@antofagasta.cl", company: "Antofagasta PLC", status: "active", createdAt: "2024-04-10" },
  { id: 5, name: "Carla Vega", email: "carla@angloamerican.cl", company: "Anglo American Chile", status: "active", createdAt: "2024-05-22" },
];

interface DrawerProps { user?: typeof USERS[0] | null; onClose: () => void; onSave: () => void; }

function UserDrawer({ user, onClose, onSave }: DrawerProps) {
  const [form, setForm] = useState({
    firstName: user?.name.split(" ")[0] ?? "",
    lastName: user?.name.split(" ")[1] ?? "",
    email: user?.email ?? "",
    company: user?.company ?? "Minera Andina S.A.",
    status: user?.status === "active",
  });

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute right-0 top-0 bottom-0 w-[480px] bg-white shadow-2xl flex flex-col">
        <div className="flex items-center justify-between px-6 py-5 border-b" style={{ borderColor: colors.border }}>
          <h3 className="font-semibold text-base" style={{ color: colors.textPrimary }}>
            {user ? "Editar Administrador" : "Nuevo Administrador"}
          </h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100"><X size={18} /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <InputField label="Nombre" value={form.firstName} onChange={v => setForm(p => ({ ...p, firstName: v }))} required />
            <InputField label="Apellido" value={form.lastName} onChange={v => setForm(p => ({ ...p, lastName: v }))} required />
          </div>
          <InputField label="Correo Electrónico" type="email" value={form.email} onChange={v => setForm(p => ({ ...p, email: v }))} required />
          <SelectField
            label="Empresa Asignada"
            value={form.company}
            onChange={v => setForm(p => ({ ...p, company: v }))}
            options={[
              { label: "Minera Andina S.A.", value: "Minera Andina S.A." },
              { label: "Codelco Norte", value: "Codelco Norte" },
              { label: "Gold Field Chile", value: "Gold Field Chile" },
              { label: "Antofagasta PLC", value: "Antofagasta PLC" },
              { label: "Anglo American Chile", value: "Anglo American Chile" },
            ]}
          />
          <Toggle label="Cuenta activa" checked={form.status} onChange={v => setForm(p => ({ ...p, status: v }))} />
        </div>

        <div className="px-6 py-4 border-t flex justify-end gap-3" style={{ borderColor: colors.border }}>
          <OutlinedBtn onClick={onClose}>Cancelar</OutlinedBtn>
          <PrimaryBtn onClick={onSave}>Guardar Administrador</PrimaryBtn>
        </div>
      </div>
    </div>
  );
}

export function AdminUsersScreen() {
  const [users, setUsers] = useState(USERS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showDrawer, setShowDrawer] = useState(false);
  const [editUser, setEditUser] = useState<typeof USERS[0] | null>(null);

  const filtered = users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || u.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const toggleStatus = (id: number) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === "active" ? "inactive" : "active" } : u));
  };

  const handleSave = () => { setShowDrawer(false); setEditUser(null); };

  return (
    <div>
      <PageHeader
        title="Administradores de Empresa"
        subtitle={`${users.length} administradores registrados`}
        actions={<PrimaryBtn onClick={() => { setEditUser(null); setShowDrawer(true); }}><Plus size={16} /> Nuevo Admin</PrimaryBtn>}
      />

      <div className="bg-white rounded-xl border p-4 mb-5 flex items-center gap-3" style={{ borderColor: colors.border }}>
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: colors.textSecondary }} />
          <input
            placeholder="Buscar por nombre o correo..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg border text-sm outline-none"
            style={{ borderColor: colors.border }}
          />
        </div>
        {["todos", "activos", "inactivos"].map(s => {
          const statusMap: Record<string, string> = { "todos": "all", "activos": "active", "inactivos": "inactive" };
          const actualStatus = statusMap[s];
          return (
            <button
              key={s}
              onClick={() => setStatusFilter(actualStatus)}
              className="px-3 py-1.5 rounded-lg text-sm font-medium capitalize"
              style={{ backgroundColor: statusFilter === actualStatus ? colors.primary : "transparent", color: statusFilter === actualStatus ? "white" : colors.textSecondary, border: `1px solid ${statusFilter === actualStatus ? colors.primary : colors.border}` }}
            >
              {s}
            </button>
          )
        })}
      </div>

      <div className="bg-white rounded-xl border overflow-hidden shadow-sm" style={{ borderColor: colors.border }}>
        <table className="w-full text-sm">
          <thead style={{ backgroundColor: colors.bg, borderBottom: `1px solid ${colors.border}` }}>
            <tr>
              {["Nombre", "Correo Electrónico", "Empresa", "Estado", "Creado", "Acciones"].map(h => (
                <th key={h} className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: colors.textSecondary }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={6}><EmptyState title="No se encontraron administradores" /></td></tr>
            ) : filtered.map((u, i) => (
              <tr
                key={u.id}
                className="transition-colors"
                style={{ borderBottom: i < filtered.length - 1 ? `1px solid ${colors.border}` : "none" }}
                onMouseEnter={e => (e.currentTarget as HTMLTableRowElement).style.backgroundColor = "#F8FAFC"}
                onMouseLeave={e => (e.currentTarget as HTMLTableRowElement).style.backgroundColor = ""}
              >
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <Avatar name={u.name} size={34} />
                    <span className="font-medium" style={{ color: colors.textPrimary }}>{u.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3.5" style={{ color: colors.textSecondary }}>{u.email}</td>
                <td className="px-5 py-3.5" style={{ color: colors.textSecondary }}>{u.company}</td>
                <td className="px-5 py-3.5"><StatusBadge status={u.status} /></td>
                <td className="px-5 py-3.5 text-xs" style={{ color: colors.textSecondary }}>{new Date(u.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</td>
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
        <UserDrawer user={editUser} onClose={() => { setShowDrawer(false); setEditUser(null); }} onSave={handleSave} />
      )}
    </div>
  );
}
