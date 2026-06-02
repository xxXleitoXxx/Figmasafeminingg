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
            <ArrowLeft size={16} /> Back to login
          </button>

          {!sent ? (
            <>
              <h2 className="text-xl font-semibold mb-2" style={{ color: colors.textPrimary }}>Reset Password</h2>
              <p className="text-sm mb-6" style={{ color: colors.textSecondary }}>
                Enter your email address and we'll send you a link to reset your password.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: colors.textPrimary }}>Email address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="you@company.com"
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
                  {loading ? "Sending..." : "Send Reset Link"}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-6">
              <CheckCircle size={48} className="mx-auto mb-4" style={{ color: colors.success }} />
              <h3 className="text-xl font-semibold mb-2" style={{ color: colors.textPrimary }}>Check your email</h3>
              <p className="text-sm mb-6" style={{ color: colors.textSecondary }}>
                We sent a password reset link to <strong>{email}</strong>. Check your inbox and follow the instructions.
              </p>
              <button
                onClick={() => navigate("/login")}
                className="w-full py-3 rounded-lg text-white font-semibold text-sm"
                style={{ backgroundColor: colors.primary }}
              >
                Back to Sign In
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
