import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { colors } from "../shared";

export function ForgotPasswordScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setSent(true);
    setLoading(false);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: "linear-gradient(135deg, #1A365D 0%, #334155 100%)" }}
    >
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl p-8 shadow-2xl">
          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 text-sm font-medium mb-6 hover:opacity-70 transition-opacity"
            style={{ color: colors.textSecondary }}
          >
            <ArrowLeft size={16} /> Volver al inicio de sesión
          </button>

          {!sent ? (
            <>
              <h2 className="text-xl font-semibold mb-2" style={{ color: colors.textPrimary }}>Restablecer Contraseña</h2>
              <p className="text-sm mb-6" style={{ color: colors.textSecondary }}>
                Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: colors.textPrimary }}>Correo electrónico</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="tu@empresa.com"
                    required
                    className="w-full px-4 py-3 rounded-lg border text-sm outline-none transition-all"
                    style={{ borderColor: colors.border, color: colors.textPrimary }}
                    onFocus={e => { e.currentTarget.style.borderColor = colors.primary; e.currentTarget.style.boxShadow = `0 0 0 2px ${colors.primary}30`; }}
                    onBlur={e => { e.currentTarget.style.borderColor = colors.border; e.currentTarget.style.boxShadow = "none"; }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading || !email}
                  className="w-full py-3 rounded-lg text-white font-semibold text-sm transition-all"
                  style={{ backgroundColor: loading || !email ? "#94A3B8" : colors.primary }}
                >
                  {loading ? "Enviando..." : "Enviar enlace"}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-6">
              <CheckCircle size={48} className="mx-auto mb-4" style={{ color: colors.success }} />
              <h3 className="text-xl font-semibold mb-2" style={{ color: colors.textPrimary }}>Revisa tu correo</h3>
              <p className="text-sm mb-6" style={{ color: colors.textSecondary }}>
                Enviamos un enlace para restablecer tu contraseña a <strong>{email}</strong>. Revisa tu bandeja de entrada y sigue las instrucciones.
              </p>
              
              {/* Development helper to quickly test the reset flow */}
              <div className="mb-6 p-3 rounded-lg border border-dashed border-gray-300 text-xs text-left bg-gray-50">
                <p className="font-semibold text-gray-500 mb-1">🔗 Enlace de prueba (Simulación):</p>
                <a href="/reset-password?token=abcdef123456789" className="text-blue-600 hover:underline break-all">
                  /reset-password?token=abcdef123456789
                </a>
              </div>

              <button
                onClick={() => navigate("/login")}
                className="w-full py-3 rounded-lg text-white font-semibold text-sm"
                style={{ backgroundColor: colors.primary }}
              >
                Volver a Iniciar Sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
