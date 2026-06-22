import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { Eye, EyeOff } from "lucide-react";
import { colors } from "../shared";

export function ResetPasswordScreen() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass1, setShowPass1] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  
  const [tokenStatus, setTokenStatus] = useState<"loading" | "valid" | "invalid" | "used">("loading");

  useEffect(() => {
    // Simulate backend token validation (CA1, CA3, CA5, CA7)
    setTimeout(() => {
      if (!token || token.length < 10) {
        setTokenStatus("invalid");
      } else if (token === "USED_TOKEN_MOCK") {
        setTokenStatus("used");
      } else {
        setTokenStatus("valid");
      }
    }, 1000);
  }, [token]);

  const validatePasswordPolicy = (pass: string) => {
    // CA6: mín. 8 caracteres, 1 mayúscula, 1 minúscula, 1 dígito, 1 carácter especial, sin espacios al inicio/fin
    if (pass.length < 8) return "Debe tener al menos 8 caracteres.";
    if (!/[A-Z]/.test(pass)) return "Debe incluir al menos una letra mayúscula.";
    if (!/[a-z]/.test(pass)) return "Debe incluir al menos una letra minúscula.";
    if (!/\d/.test(pass)) return "Debe incluir al menos un número.";
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pass)) return "Debe incluir al menos un carácter especial.";
    if (/^\s|\s$/.test(pass)) return "No puede empezar ni terminar con espacios.";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // CA6: Validate policy
    const policyError = validatePasswordPolicy(newPassword);
    if (policyError) {
      setError(policyError);
      return;
    }

    // CA2: Match passwords
    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);
    // Simulate backend update (CA4)
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setSuccess(true);
    setTimeout(() => {
      navigate("/login");
    }, 3000);
  };

  if (tokenStatus === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "linear-gradient(135deg, #1A365D 0%, #334155 100%)" }}>
        <div className="text-white text-center">
          <svg className="animate-spin h-8 w-8 text-white mx-auto mb-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p>Verificando enlace...</p>
        </div>
      </div>
    );
  }

  if (tokenStatus === "invalid" || tokenStatus === "used") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "linear-gradient(135deg, #1A365D 0%, #334155 100%)" }}>
        <div className="bg-white rounded-2xl p-8 shadow-2xl w-full max-w-md text-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "#FEE2E2", color: colors.error }}>
            <span className="text-2xl">✕</span>
          </div>
          <h2 className="text-xl font-semibold mb-2" style={{ color: colors.textPrimary }}>
            {tokenStatus === "invalid" ? "Enlace inválido o expirado" : "Enlace ya utilizado"}
          </h2>
          <p className="text-sm mb-6" style={{ color: colors.textSecondary }}>
            {tokenStatus === "invalid" 
              ? "Este enlace de recuperación ha expirado o no es válido. Por favor, solicita uno nuevo."
              : "Este enlace de recuperación ya fue consumido. Si no fuiste tú, contacta al soporte inmediatamente."}
          </p>
          <button
            onClick={() => navigate("/forgot-password")}
            className="w-full py-3 rounded-lg text-white font-semibold text-sm transition-all"
            style={{ backgroundColor: colors.primary }}
          >
            Solicitar nuevo enlace
          </button>
          <button
            onClick={() => navigate("/login")}
            className="w-full py-3 mt-3 rounded-lg border font-semibold text-sm transition-all"
            style={{ borderColor: colors.border, color: colors.textSecondary }}
          >
            Volver al inicio de sesión
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "linear-gradient(135deg, #1A365D 0%, #334155 100%)" }}>
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold" style={{ color: colors.textPrimary }}>Restablecer Contraseña</h2>
            <p className="text-sm mt-2" style={{ color: colors.textSecondary }}>Crea una nueva contraseña para tu cuenta.</p>
          </div>

          {success ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "#D1FAE5", color: colors.success }}>
                <span className="text-2xl">✓</span>
              </div>
              <h3 className="font-semibold text-lg" style={{ color: colors.textPrimary }}>Contraseña actualizada</h3>
              <p className="text-sm mt-2" style={{ color: colors.textSecondary }}>Tu contraseña ha sido restablecida exitosamente. Redirigiendo al inicio de sesión...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-lg text-sm mb-4" style={{ backgroundColor: "#FEE2E2", color: colors.error, border: `1px solid #FCA5A5` }}>
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: colors.textPrimary }}>Nueva Contraseña</label>
                <div className="relative">
                  <input
                    type={showPass1 ? "text" : "password"}
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 rounded-lg border text-sm outline-none transition-all"
                    style={{ borderColor: colors.border, color: colors.textPrimary }}
                    onFocus={e => { e.currentTarget.style.borderColor = colors.primary; e.currentTarget.style.boxShadow = `0 0 0 2px ${colors.primary}30`; }}
                    onBlur={e => { e.currentTarget.style.borderColor = colors.border; e.currentTarget.style.boxShadow = "none"; }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass1(!showPass1)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    style={{ color: colors.textSecondary }}
                  >
                    {showPass1 ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <ul className="text-xs mt-2 space-y-1" style={{ color: colors.textSecondary }}>
                  <li className={newPassword.length >= 8 ? "text-green-600" : ""}>• Mínimo 8 caracteres</li>
                  <li className={/[A-Z]/.test(newPassword) ? "text-green-600" : ""}>• Al menos una mayúscula</li>
                  <li className={/[a-z]/.test(newPassword) ? "text-green-600" : ""}>• Al menos una minúscula</li>
                  <li className={/\d/.test(newPassword) ? "text-green-600" : ""}>• Al menos un número</li>
                  <li className={/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(newPassword) ? "text-green-600" : ""}>• Al menos un carácter especial</li>
                </ul>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: colors.textPrimary }}>Confirmar Contraseña</label>
                <div className="relative">
                  <input
                    type={showPass2 ? "text" : "password"}
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 rounded-lg border text-sm outline-none transition-all"
                    style={{ borderColor: colors.border, color: colors.textPrimary }}
                    onFocus={e => { e.currentTarget.style.borderColor = colors.primary; e.currentTarget.style.boxShadow = `0 0 0 2px ${colors.primary}30`; }}
                    onBlur={e => { e.currentTarget.style.borderColor = colors.border; e.currentTarget.style.boxShadow = "none"; }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass2(!showPass2)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    style={{ color: colors.textSecondary }}
                  >
                    {showPass2 ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg text-white font-semibold text-sm transition-all mt-4"
                style={{ backgroundColor: loading ? "#94A3B8" : colors.primary }}
              >
                {loading ? "Actualizando..." : "Restablecer Contraseña"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
