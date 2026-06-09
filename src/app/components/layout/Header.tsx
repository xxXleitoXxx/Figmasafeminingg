import { useState } from "react";
import { Bell, Search } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { colors, Avatar } from "../shared";

const NOTIFICATIONS = [
  { id: 1, text: "Nueva empleada registrada: Ana Torres", time: "Hace 5 min", read: false },
  { id: 2, text: "Programa 'Seguridad contra Incendios 2025' expira en 7 días", time: "Hace 1 hora", read: false },
  { id: 3, text: "Juan Pérez completó la Simulación VR", time: "Hace 2 horas", read: true },
  { id: 4, text: "Certificado emitido para Laura García", time: "Ayer", read: true },
  { id: 5, text: "Copia de seguridad del sistema completada con éxito", time: "Ayer", read: true },
];

interface HeaderProps {
  title?: string;
}

export function Header({ title }: HeaderProps) {
  const { user } = useAuth();
  const [showNotif, setShowNotif] = useState(false);
  const unread = NOTIFICATIONS.filter(n => !n.read).length;

  if (!user) return null;

  return (
    <header
      className="flex items-center justify-between px-8 border-b"
      style={{ height: 64, backgroundColor: colors.white, borderColor: colors.border, flexShrink: 0 }}
    >
      {/* Left */}
      <div className="flex items-center gap-4">
        {title && <h2 className="font-semibold text-base" style={{ color: colors.textPrimary }}>{title}</h2>}
        <div className="relative hidden md:flex items-center">
          <Search size={14} className="absolute left-3" style={{ color: colors.textSecondary }} />
          <input
            placeholder="Buscar..."
            className="pl-9 pr-4 py-1.5 rounded-lg text-sm border outline-none w-56"
            style={{ borderColor: colors.border, backgroundColor: colors.bg, color: colors.textPrimary }}
          />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotif(!showNotif)}
            className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Bell size={20} style={{ color: colors.textSecondary }} />
            {unread > 0 && (
              <span
                className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center text-white"
                style={{ backgroundColor: colors.secondary, fontSize: 9 }}
              >
                {unread}
              </span>
            )}
          </button>

          {showNotif && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowNotif(false)} />
              <div
                className="absolute right-0 top-12 z-50 w-80 bg-white rounded-xl shadow-xl border overflow-hidden"
                style={{ borderColor: colors.border }}
              >
                <div className="px-4 py-3 border-b flex items-center justify-between" style={{ borderColor: colors.border }}>
                  <span className="font-semibold text-sm" style={{ color: colors.textPrimary }}>Notificaciones</span>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full text-white"
                    style={{ backgroundColor: colors.secondary }}
                  >
                    {unread} nuevas
                  </span>
                </div>
                <div className="divide-y divide-gray-100">
                  {NOTIFICATIONS.map(n => (
                    <div
                      key={n.id}
                      className="px-4 py-3 hover:bg-gray-50 transition-colors"
                      style={{ backgroundColor: n.read ? "white" : "#EFF6FF" }}
                    >
                      <div className="flex items-start gap-2">
                        {!n.read && <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: colors.secondary }} />}
                        {n.read && <div className="w-2 flex-shrink-0" />}
                        <div>
                          <p className="text-xs" style={{ color: colors.textPrimary }}>{n.text}</p>
                          <p className="text-xs mt-0.5" style={{ color: colors.textSecondary }}>{n.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2 text-center border-t" style={{ borderColor: colors.border }}>
                  <button className="text-xs font-medium" style={{ color: colors.primary }}>Ver todas las notificaciones</button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* User */}
        <div className="flex items-center gap-2">
          <Avatar name={user.name} size={32} />
          <div className="hidden md:block">
            <div className="text-sm font-medium leading-tight" style={{ color: colors.textPrimary }}>{user.name}</div>
            {user.company && <div className="text-xs leading-tight" style={{ color: colors.textSecondary }}>{user.company}</div>}
          </div>
        </div>
      </div>
    </header>
  );
}
