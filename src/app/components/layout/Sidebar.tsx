import { ReactNode } from "react";
import { useNavigate, useLocation } from "react-router";
import { useAuth, Role } from "../../context/AuthContext";
import {
  LayoutDashboard, Building2, Users, Play, Shield, BarChart2, Settings,
  Briefcase, ClipboardList, FileText, UserCircle, GraduationCap, BookOpen, Award
} from "lucide-react";

interface NavItem {
  label: string;
  icon: ReactNode;
  path: string;
}

const navByRole: Record<Role, NavItem[]> = {
  admin: [
    { label: "Panel", icon: <LayoutDashboard size={18} />, path: "/admin" },
    { label: "Empresas", icon: <Building2 size={18} />, path: "/admin/companies" },
    { label: "Administradores", icon: <Users size={18} />, path: "/admin/users" },
    { label: "Simulaciones", icon: <Play size={18} />, path: "/admin/simulations" },
    { label: "Roles", icon: <Shield size={18} />, path: "/admin/roles" },
    { label: "Reportes", icon: <BarChart2 size={18} />, path: "/admin/reports" },
    { label: "Configuración", icon: <Settings size={18} />, path: "/admin/config" },
  ],
  company: [
    { label: "Panel", icon: <LayoutDashboard size={18} />, path: "/company" },
    { label: "Usuarios", icon: <Users size={18} />, path: "/company/users" },
    { label: "Roles", icon: <Shield size={18} />, path: "/company/roles" },
    { label: "Programas", icon: <Briefcase size={18} />, path: "/company/programs" },
    { label: "Simulaciones", icon: <Play size={18} />, path: "/company/simulations" },
    { label: "Reportes", icon: <BarChart2 size={18} />, path: "/company/reports" },
    { label: "Mi Perfil", icon: <UserCircle size={18} />, path: "/company/profile" },
  ],
  coordinator: [
    { label: "Panel", icon: <LayoutDashboard size={18} />, path: "/coordinator" },
    { label: "Mis Programas", icon: <Briefcase size={18} />, path: "/coordinator/programs" },
    { label: "Simulaciones", icon: <Play size={18} />, path: "/coordinator/simulations" },
    { label: "Empleados", icon: <Users size={18} />, path: "/coordinator/employees" },
    { label: "Exámenes", icon: <ClipboardList size={18} />, path: "/coordinator/exams" },
    { label: "Reportes", icon: <BarChart2 size={18} />, path: "/coordinator/reports" },
    { label: "Mi Perfil", icon: <UserCircle size={18} />, path: "/coordinator/profile" },
  ],
  employee: [
    { label: "Mi Entrenamiento", icon: <GraduationCap size={18} />, path: "/employee" },
    { label: "Mis Certificados", icon: <Award size={18} />, path: "/employee/certificates" },
    { label: "Mi Perfil", icon: <UserCircle size={18} />, path: "/employee/profile" },
  ],
};

const roleLabels: Record<Role, string> = {
  admin: "Administrador del Sistema",
  company: "Admin Empresa",
  coordinator: "Coordinador",
  employee: "Empleado",
};

export function Sidebar() {
  const { user, logout, clearRole } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (!user || !user.role) return null;

  const items = navByRole[user.role];

  const isActive = (path: string) => {
    if (path === `/admin` || path === `/company` || path === `/coordinator` || path === `/employee`) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div
      className="flex flex-col h-full"
      style={{ width: 240, backgroundColor: "#1A365D", color: "white", flexShrink: 0 }}
    >
      {/* Logo */}
      <div className="px-6 py-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#F97316" }}>
            <span className="text-white font-bold text-sm">⛏</span>
          </div>
          <div>
            <div className="font-bold text-sm leading-tight">SafeMining VR</div>
            <div className="text-xs opacity-60 leading-tight">Plataforma VR</div>
          </div>
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <div className="space-y-1">
          {items.map(item => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left"
              style={{
                backgroundColor: isActive(item.path) ? "rgba(255,255,255,0.12)" : "transparent",
                color: isActive(item.path) ? "white" : "rgba(255,255,255,0.7)",
                borderLeft: isActive(item.path) ? "3px solid #F97316" : "3px solid transparent",
              }}
              onMouseEnter={e => {
                if (!isActive(item.path)) (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(255,255,255,0.06)";
              }}
              onMouseLeave={e => {
                if (!isActive(item.path)) (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
              }}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* User info + logout */}
      <div className="px-4 py-4 border-t border-white/10">
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
            style={{ backgroundColor: "#F97316" }}
          >
            {user.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)}
          </div>
          <div className="min-w-0">
            <div className="text-sm font-medium truncate">{user.name}</div>
            <div className="text-xs opacity-60 truncate">{roleLabels[user.role]}</div>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <button
            onClick={() => clearRole()}
            className="w-full text-xs py-1.5 rounded-lg text-left px-2 transition-colors"
            style={{ color: "rgba(255,255,255,0.7)", backgroundColor: "rgba(255,255,255,0.05)" }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.color = "white";
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(255,255,255,0.1)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.7)";
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(255,255,255,0.05)";
            }}
          >
            ⟲ Cambiar rol
          </button>
          <button
            onClick={() => { logout(); navigate("/login"); }}
            className="w-full text-xs py-1.5 rounded-lg text-left px-2 transition-colors mt-1"
            style={{ color: "rgba(255,255,255,0.5)" }}
            onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.color = "white"}
            onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.5)"}
          >
            → Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
}
