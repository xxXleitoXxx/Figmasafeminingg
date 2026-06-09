import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Eye, EyeOff } from "lucide-react";
import { useAuth, Role } from "../../context/AuthContext";
import { colors } from "../shared";

const ROLE_PATHS: Record<Role, string> = {
  admin: "/admin",
  company: "/company",
  coordinator: "/coordinator",
  employee: "/employee",
};

export function LoginScreen() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("demo@safemining.com");
  const [password, setPassword] = useState("password123");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      if (user.role) {
        navigate(ROLE_PATHS[user.role]);
      } else {
        navigate("/role-selection");
      }
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    login(email);
    navigate("/role-selection");
    setLoading(false);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: "linear-gradient(135deg, #1A365D 0%, #334155 100%)" }}
    >
      <div className="w-full max-w-md">
        {/* Logo area */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4" style={{ backgroundColor: colors.secondary }}>
            <span className="text-3xl">⛏</span>
          </div>
          <h1 className="text-3xl font-bold text-white">SafeMining VR</h1>
          <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.6)" }}>Plataforma de Entrenamiento de Seguridad Minera</p>
        </div>

        {/* Card */}
        <div
          className="bg-white rounded-2xl p-8 shadow-2xl"
          style={{ boxShadow: "0 0 40px rgba(249,115,22,0.2), 0 20px 60px rgba(0,0,0,0.3)" }}
        >
          <h2 className="text-xl font-semibold mb-6" style={{ color: colors.textPrimary }}>Inicia sesión en tu cuenta</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: colors.textPrimary }}>Correo electrónico</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border text-sm outline-none transition-all"
                style={{ borderColor: colors.border, color: colors.textPrimary }}
                onFocus={e => { e.currentTarget.style.borderColor = colors.primary; e.currentTarget.style.boxShadow = `0 0 0 2px ${colors.primary}30`; }}
                onBlur={e => { e.currentTarget.style.borderColor = colors.border; e.currentTarget.style.boxShadow = "none"; }}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: colors.textPrimary }}>Contraseña</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 rounded-lg border text-sm outline-none transition-all"
                  style={{ borderColor: colors.border, color: colors.textPrimary }}
                  onFocus={e => { e.currentTarget.style.borderColor = colors.primary; e.currentTarget.style.boxShadow = `0 0 0 2px ${colors.primary}30`; }}
                  onBlur={e => { e.currentTarget.style.borderColor = colors.border; e.currentTarget.style.boxShadow = "none"; }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: colors.textSecondary }}
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Sign In button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg text-white font-semibold text-sm transition-all mt-2"
              style={{ backgroundColor: loading ? "#94A3B8" : colors.primary }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Iniciando sesión...
                </span>
              ) : "Iniciar Sesión"}
            </button>
          </form>

          <div className="text-center mt-4">
            <button
              onClick={() => navigate("/forgot-password")}
              className="text-sm font-medium hover:underline"
              style={{ color: colors.primary }}
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>
        </div>

        <p className="text-center text-xs mt-6" style={{ color: "rgba(255,255,255,0.4)" }}>
          © 2025 SafeMining VR. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
}
