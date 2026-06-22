import { ReactNode } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

// ─── Color Tokens ───────────────────────────────────────────────────────────
export const colors = {
  primary: "#1A365D",
  primaryHover: "#2D4A7A",
  secondary: "#F97316",
  secondaryHover: "#EA6C0A",
  slate: "#334155",
  bg: "#F9FAFB",
  white: "#FFFFFF",
  error: "#EF4444",
  success: "#22C55E",
  warning: "#EAB308",
  textPrimary: "#0F172A",
  textSecondary: "#64748B",
  border: "#E2E8F0",
};

// ─── Translations ─────────────────────────────────────────────────────────────
export const statusTranslations: Record<string, string> = {
  active: "activo",
  inactive: "inactivo",
  pending: "pendiente",
  approved: "aprobado",
  rejected: "rechazado",
  draft: "borrador",
  closed: "cerrado",
  completed: "completado",
  failed: "reprobado",
  "in progress": "en progreso",
  "not started": "no iniciado",
  locked: "bloqueado",
};

export const permissionTranslations: Record<string, string> = {
  view_users: "Ver usuarios",
  create_users: "Crear usuarios",
  edit_users: "Editar usuarios",
  delete_users: "Eliminar usuarios",
  assign_roles: "Asignar roles",
  view_companies: "Ver empresas",
  create_companies: "Crear empresas",
  edit_companies: "Editar empresas",
  deactivate_companies: "Desactivar empresas",
  view_simulations: "Ver simulaciones",
  create_simulations: "Crear simulaciones",
  edit_simulations: "Editar simulaciones",
  manage_metrics: "Gestionar métricas",
  view_programs: "Ver programas",
  create_programs: "Crear programas",
  assign_programs: "Asignar programas",
  close_programs: "Cerrar programas",
  view_global_reports: "Ver reportes globales",
  view_company_reports: "Ver reportes de empresa",
  export_reports: "Exportar reportes",
  edit_configuration: "Editar configuración",
  manage_templates: "Gestionar plantillas",
  view_audit_log: "Ver registro de auditoría",
  create_user_employee: "Crear usuario empleado",
  view_reports: "Ver reportes",
  view_settings: "Ver ajustes",
};

// ─── Status Badge ────────────────────────────────────────────────────────────
const statusStyles: Record<string, { bg: string; text: string }> = {
  activo: { bg: "#DCFCE7", text: "#166534" },
  inactivo: { bg: "#F1F5F9", text: "#475569" },
  pendiente: { bg: "#FEF9C3", text: "#854D0E" },
  aprobado: { bg: "#D1FAE5", text: "#065F46" },
  rechazado: { bg: "#FEE2E2", text: "#991B1B" },
  borrador: { bg: "#F1F5F9", text: "#475569" },
  cerrado: { bg: "#E5E7EB", text: "#374151" },
  completado: { bg: "#D1FAE5", text: "#065F46" },
  fallido: { bg: "#FEE2E2", text: "#991B1B" },
  "en progreso": { bg: "#DBEAFE", text: "#1E40AF" },
  "no iniciado": { bg: "#F1F5F9", text: "#475569" },
  bloqueado: { bg: "#E5E7EB", text: "#6B7280" },
  active: { bg: "#DCFCE7", text: "#166534" },
  inactive: { bg: "#F1F5F9", text: "#475569" },
  pending: { bg: "#FEF9C3", text: "#854D0E" },
  approved: { bg: "#D1FAE5", text: "#065F46" },
  rejected: { bg: "#FEE2E2", text: "#991B1B" },
  draft: { bg: "#F1F5F9", text: "#475569" },
  closed: { bg: "#E5E7EB", text: "#374151" },
  completed: { bg: "#D1FAE5", text: "#065F46" },
  failed: { bg: "#FEE2E2", text: "#991B1B" },
  "in progress": { bg: "#DBEAFE", text: "#1E40AF" },
  "not started": { bg: "#F1F5F9", text: "#475569" },
  locked: { bg: "#E5E7EB", text: "#6B7280" },
};

export function StatusBadge({ status }: { status: string }) {
  const translatedStatus = statusTranslations[status.toLowerCase()] || status;
  const s = statusStyles[status.toLowerCase()] ?? { bg: "#F1F5F9", text: "#475569" };
  return (
    <span
      style={{ backgroundColor: s.bg, color: s.text }}
      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize"
    >
      {translatedStatus}
    </span>
  );
}

// ─── Stat Card ───────────────────────────────────��────────────────────────────
interface StatCardProps {
  label: string;
  value: string | number;
  icon: ReactNode;
  trend?: { value: string; up: boolean };
  color?: string;
}

export function StatCard({ label, value, icon, trend, color = colors.primary }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl border p-6 flex items-start justify-between shadow-sm" style={{ borderColor: colors.border }}>
      <div>
        <p className="text-sm font-medium mb-1" style={{ color: colors.textSecondary }}>{label}</p>
        <p className="text-3xl font-bold" style={{ color: colors.textPrimary }}>{value}</p>
        {trend && (
          <div className="flex items-center gap-1 mt-2">
            {trend.up ? <TrendingUp size={14} color={colors.success} /> : <TrendingDown size={14} color={colors.error} />}
            <span className="text-xs font-medium" style={{ color: trend.up ? colors.success : colors.error }}>{trend.value}</span>
          </div>
        )}
      </div>
      <div className="p-3 rounded-lg" style={{ backgroundColor: `${color}15` }}>
        <div style={{ color }}>{icon}</div>
      </div>
    </div>
  );
}

// ─── Page Header ────────────────────────────────────────────────���────────────
interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}

export function PageHeader({ title, subtitle, actions }: PageHeaderProps) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: colors.textPrimary }}>{title}</h1>
        {subtitle && <p className="text-sm mt-1" style={{ color: colors.textSecondary }}>{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-3">{actions}</div>}
    </div>
  );
}

// ─── Primary Button ───────────────────────────────────────────────────────────
export function PrimaryBtn({ children, onClick, className = "", disabled = false, type = "button" }: {
  children: ReactNode; onClick?: () => void; className?: string; disabled?: boolean; type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      style={{ backgroundColor: disabled ? "#94A3B8" : colors.primary }}
      onMouseEnter={e => { if (!disabled) (e.currentTarget as HTMLButtonElement).style.backgroundColor = colors.primaryHover; }}
      onMouseLeave={e => { if (!disabled) (e.currentTarget as HTMLButtonElement).style.backgroundColor = colors.primary; }}
    >
      {children}
    </button>
  );
}

// ─── Secondary Button (orange) ────────────────────────────────────────────────
export function SecondaryBtn({ children, onClick, className = "", disabled = false }: {
  children: ReactNode; onClick?: () => void; className?: string; disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-medium transition-colors disabled:opacity-50 ${className}`}
      style={{ backgroundColor: colors.secondary }}
      onMouseEnter={e => { if (!disabled) (e.currentTarget as HTMLButtonElement).style.backgroundColor = colors.secondaryHover; }}
      onMouseLeave={e => { if (!disabled) (e.currentTarget as HTMLButtonElement).style.backgroundColor = colors.secondary; }}
    >
      {children}
    </button>
  );
}

// ─── Outlined Button ──────────────────────────────────────────────────────────
export function OutlinedBtn({ children, onClick, className = "" }: {
  children: ReactNode; onClick?: () => void; className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${className}`}
      style={{ borderColor: colors.border, color: colors.slate, backgroundColor: "transparent" }}
      onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.backgroundColor = colors.bg}
      onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent"}
    >
      {children}
    </button>
  );
}

// ─── Destructive Button ───────────────────────────────────────────────────────
export function DestructiveBtn({ children, onClick, className = "" }: {
  children: ReactNode; onClick?: () => void; className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-medium transition-colors ${className}`}
      style={{ backgroundColor: colors.error }}
    >
      {children}
    </button>
  );
}

// ─── Input Field ──────────────────────────────────────────────────────────────
export function InputField({ label, type = "text", placeholder, value, onChange, required, readOnly, hint, error, className }: {
  label?: string; type?: string; placeholder?: string; value?: string; onChange?: (v: string) => void;
  required?: boolean; readOnly?: boolean; hint?: string; error?: string; className?: string;
}) {
  return (
    <div className={`flex flex-col gap-1 ${className ?? ""}`}>
      {label && <label className="text-sm font-medium" style={{ color: colors.textPrimary }}>{label}{required && <span className="text-red-500 ml-1">*</span>}</label>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange?.(e.target.value)}
        readOnly={readOnly}
        className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none transition-all"
        style={{ 
          borderColor: error ? colors.error : colors.border, 
          backgroundColor: readOnly ? colors.bg : colors.white, 
          color: colors.textPrimary 
        }}
        onFocus={e => { 
          if (!readOnly) e.currentTarget.style.boxShadow = `0 0 0 2px ${error ? colors.error : colors.primary}40`; 
          e.currentTarget.style.borderColor = error ? colors.error : colors.primary; 
        }}
        onBlur={e => { 
          e.currentTarget.style.boxShadow = "none"; 
          e.currentTarget.style.borderColor = error ? colors.error : colors.border; 
        }}
      />
      {error ? (
        <p className="text-xs mt-0.5 font-medium" style={{ color: colors.error }}>{error}</p>
      ) : hint ? (
        <p className="text-xs" style={{ color: colors.textSecondary }}>{hint}</p>
      ) : null}
    </div>
  );
}

// ─── Select Field ─────────────────────────────────────────────────────────────
export function SelectField({ label, value, onChange, options, required }: {
  label?: string; value?: string; onChange?: (v: string) => void;
  options: { label: string; value: string }[]; required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium" style={{ color: colors.textPrimary }}>{label}{required && <span className="text-red-500 ml-1">*</span>}</label>}
      <select
        value={value}
        onChange={e => onChange?.(e.target.value)}
        className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none transition-all appearance-none cursor-pointer"
        style={{ borderColor: colors.border, backgroundColor: colors.white, color: colors.textPrimary }}
        onFocus={e => { e.currentTarget.style.boxShadow = `0 0 0 2px ${colors.primary}40`; e.currentTarget.style.borderColor = colors.primary; }}
        onBlur={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = colors.border; }}
      >
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}

// ─── Toggle Switch ────────────────────────────────────────────────────────────
export function Toggle({ label, checked, onChange }: { label?: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <div
        onClick={() => onChange(!checked)}
        className="relative w-10 h-5 rounded-full transition-colors flex items-center"
        style={{ backgroundColor: checked ? colors.primary : "#CBD5E1" }}
      >
        <div
          className="absolute w-4 h-4 rounded-full bg-white shadow transition-transform"
          style={{ transform: checked ? "translateX(20px)" : "translateX(2px)" }}
        />
      </div>
      {label && <span className="text-sm font-medium" style={{ color: colors.textPrimary }}>{label}</span>}
    </label>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────
export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-xl border shadow-sm p-6 ${className}`} style={{ borderColor: colors.border }}>
      {children}
    </div>
  );
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────
export function ProgressBar({ value, max = 100, color = colors.secondary }: { value: number; max?: number; color?: string }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className="w-full h-2 rounded-full" style={{ backgroundColor: "#E2E8F0" }}>
      <div className="h-2 rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: color }} />
    </div>
  );
}

// ─── Breadcrumb ───────────────────────────────────────────────────────────────
export function Breadcrumb({ items }: { items: { label: string; onClick?: () => void }[] }) {
  return (
    <nav className="flex items-center gap-2 text-sm mb-6">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2">
          {i > 0 && <span style={{ color: colors.textSecondary }}>/</span>}
          <span
            onClick={item.onClick}
            className={item.onClick ? "cursor-pointer hover:underline" : ""}
            style={{ color: item.onClick ? colors.primary : colors.textSecondary }}
          >
            {item.label}
          </span>
        </span>
      ))}
    </nav>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────
export function EmptyState({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4">
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
        <circle cx="40" cy="40" r="38" stroke={colors.border} strokeWidth="2" />
        <circle cx="40" cy="28" r="10" fill={`${colors.primary}20`} stroke={colors.primary} strokeWidth="1.5" />
        <path d="M20 58c0-11 9-18 20-18s20 7 20 18" stroke={colors.primary} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <div className="text-center">
        <p className="font-semibold text-base" style={{ color: colors.textPrimary }}>{title}</p>
        {subtitle && <p className="text-sm mt-1" style={{ color: colors.textSecondary }}>{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

// ─── Section Label ────────────────────────────────────────────────────────────
export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#94A3B8" }}>{children}</span>
      <div className="flex-1 h-px" style={{ backgroundColor: colors.border }} />
    </div>
  );
}

// ─── Avatar ───────────────────────────────────────────────────────────────────
export function Avatar({ name, size = 32 }: { name: string; size?: number }) {
  const initials = name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  const hue = name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) % 360;
  return (
    <div
      className="rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0"
      style={{ width: size, height: size, backgroundColor: `hsl(${hue}, 60%, 40%)`, fontSize: size * 0.35 }}
    >
      {initials}
    </div>
  );
}

// ─── Confirm Modal ────────────────────────────────────────────────────────────
export function ConfirmModal({ title, description, onConfirm, onCancel, confirmLabel = "Confirmar", dangerous = false }: {
  title: string; description: string; onConfirm: () => void; onCancel: () => void;
  confirmLabel?: string; dangerous?: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onCancel} />
      <div className="relative bg-white rounded-xl shadow-xl p-6 w-full max-w-md mx-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: dangerous ? "#FEE2E2" : "#DBEAFE" }}>
            <span className="text-xl">{dangerous ? "⚠️" : "❓"}</span>
          </div>
          <h3 className="text-lg font-semibold" style={{ color: colors.textPrimary }}>{title}</h3>
        </div>
        <p className="text-sm mb-6" style={{ color: colors.textSecondary }}>{description}</p>
        <div className="flex justify-end gap-3">
          <OutlinedBtn onClick={onCancel}>Cancelar</OutlinedBtn>
          {dangerous ? (
            <DestructiveBtn onClick={onConfirm}>{confirmLabel}</DestructiveBtn>
          ) : (
            <PrimaryBtn onClick={onConfirm}>{confirmLabel}</PrimaryBtn>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Toast ────────────────────────────────────────────────────────────────────
export function Toast({ message, type = "success", onClose }: { message: string; type?: "success" | "error"; onClose: () => void }) {
  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg text-white text-sm font-medium"
      style={{ backgroundColor: type === "success" ? colors.success : colors.error }}
    >
      <span>{type === "success" ? "✓" : "✕"}</span>
      <span>{message}</span>
      <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100">✕</button>
    </div>
  );
}
