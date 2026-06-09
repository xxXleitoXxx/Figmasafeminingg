import { useState } from "react";
import { useNavigate } from "react-router";
import { Plus, Eye, Pencil, ToggleLeft, Search, Filter, Building2 } from "lucide-react";
import { PageHeader, PrimaryBtn, StatusBadge, OutlinedBtn, colors, EmptyState } from "../shared";

const COMPANIES = [
  { id: 1, name: "Minera Andina S.A.", tradeName: "Andina Mining", cuit: "30-71234567-8", email: "admin@andina.com", status: "active", admins: 2, regDate: "2024-01-15" },
  { id: 2, name: "Codelco Norte Ltda.", tradeName: "Codelco Norte", cuit: "76-89012345-6", email: "contact@codelco.cl", status: "active", admins: 3, regDate: "2024-02-20" },
  { id: 3, name: "Gold Field Chile SpA", tradeName: "Gold Field", cuit: "77-34567890-1", email: "hr@goldfield.cl", status: "active", admins: 1, regDate: "2024-03-10" },
  { id: 4, name: "Antofagasta PLC Chile", tradeName: "Antofagasta", cuit: "76-90123456-7", email: "info@antofagasta.cl", status: "inactive", admins: 2, regDate: "2023-11-05" },
  { id: 5, name: "Anglo American Chile", tradeName: "Anglo American", cuit: "76-12345678-9", email: "safety@angloamerican.cl", status: "active", admins: 4, regDate: "2023-09-01" },
  { id: 6, name: "Yamana Gold Chile", tradeName: "Yamana Gold", cuit: "76-56789012-3", email: "training@yamana.cl", status: "active", admins: 1, regDate: "2025-01-12" },
];

export function CompaniesScreen() {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState(COMPANIES);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = companies.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const toggleStatus = (id: number) => {
    setCompanies(prev => prev.map(c => c.id === id ? { ...c, status: c.status === "active" ? "inactive" : "active" } : c));
  };

  return (
    <div>
      <PageHeader
        title="Empresas"
        subtitle={`${companies.length} empresas en total`}
        actions={<PrimaryBtn onClick={() => navigate("/admin/companies/new")}><Plus size={16} /> Nueva Empresa</PrimaryBtn>}
      />

      {/* Filters */}
      <div className="bg-white rounded-xl border p-4 mb-5 flex items-center gap-3 flex-wrap" style={{ borderColor: colors.border }}>
        <div className="relative flex-1 min-w-48">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: colors.textSecondary }} />
          <input
            placeholder="Buscar empresas..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg border text-sm outline-none"
            style={{ borderColor: colors.border, color: colors.textPrimary }}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={14} style={{ color: colors.textSecondary }} />
          {["todos", "activos", "inactivos"].map(s => {
            const statusMap: Record<string, string> = { "todos": "all", "activos": "active", "inactivos": "inactive" };
            const actualStatus = statusMap[s];
            return (
              <button
                key={s}
                onClick={() => setStatusFilter(actualStatus)}
                className="px-3 py-1.5 rounded-lg text-sm font-medium capitalize transition-colors"
                style={{
                  backgroundColor: statusFilter === actualStatus ? colors.primary : "transparent",
                  color: statusFilter === actualStatus ? "white" : colors.textSecondary,
                  border: `1px solid ${statusFilter === actualStatus ? colors.primary : colors.border}`,
                }}
              >
                {s}
              </button>
            )
          })}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border overflow-hidden shadow-sm" style={{ borderColor: colors.border }}>
        <table className="w-full text-sm">
          <thead style={{ backgroundColor: colors.bg, borderBottom: `1px solid ${colors.border}` }}>
            <tr>
              {["Empresa", "RUT/CUIT", "Email de Contacto", "Estado", "Admins", "Fecha de Registro", "Acciones"].map(h => (
                <th key={h} className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: colors.textSecondary }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={7}><EmptyState title="No se encontraron empresas" subtitle="Intenta ajustar tu búsqueda o filtros" /></td></tr>
            ) : filtered.map((c, i) => (
              <tr
                key={c.id}
                className="transition-colors"
                style={{ borderBottom: i < filtered.length - 1 ? `1px solid ${colors.border}` : "none" }}
                onMouseEnter={e => (e.currentTarget as HTMLTableRowElement).style.backgroundColor = "#F8FAFC"}
                onMouseLeave={e => (e.currentTarget as HTMLTableRowElement).style.backgroundColor = ""}
              >
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${colors.primary}15` }}>
                      <Building2 size={16} style={{ color: colors.primary }} />
                    </div>
                    <div>
                      <div className="font-medium" style={{ color: colors.textPrimary }}>{c.name}</div>
                      <div className="text-xs" style={{ color: colors.textSecondary }}>{c.tradeName}</div>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3.5 font-mono text-xs" style={{ color: colors.textSecondary }}>{c.cuit}</td>
                <td className="px-5 py-3.5" style={{ color: colors.textSecondary }}>{c.email}</td>
                <td className="px-5 py-3.5"><StatusBadge status={c.status} /></td>
                <td className="px-5 py-3.5">
                  <span className="font-semibold" style={{ color: colors.textPrimary }}>{c.admins}</span>
                </td>
                <td className="px-5 py-3.5 text-xs" style={{ color: colors.textSecondary }}>{new Date(c.regDate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => navigate(`/admin/companies/${c.id}`)}
                      className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                      title="View"
                    >
                      <Eye size={16} style={{ color: colors.textSecondary }} />
                    </button>
                    <button
                      onClick={() => navigate(`/admin/companies/${c.id}`)}
                      className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                      title="Edit"
                    >
                      <Pencil size={16} style={{ color: colors.textSecondary }} />
                    </button>
                    <button
                      onClick={() => toggleStatus(c.id)}
                      className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                      title={c.status === "active" ? "Deactivate" : "Activate"}
                    >
                      <ToggleLeft size={16} style={{ color: c.status === "active" ? colors.success : colors.error }} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <span className="text-sm" style={{ color: colors.textSecondary }}>Mostrando {filtered.length} de {companies.length} empresas</span>
        <div className="flex items-center gap-2">
          <OutlinedBtn className="py-1.5 px-3 text-xs">Anterior</OutlinedBtn>
          <div className="flex gap-1">
            {[1, 2, 3].map(p => (
              <button
                key={p}
                className="w-8 h-8 rounded-lg text-sm font-medium transition-colors"
                style={{ backgroundColor: p === 1 ? colors.primary : "transparent", color: p === 1 ? "white" : colors.textSecondary }}
              >
                {p}
              </button>
            ))}
          </div>
          <OutlinedBtn className="py-1.5 px-3 text-xs">Siguiente</OutlinedBtn>
        </div>
      </div>
    </div>
  );
}
