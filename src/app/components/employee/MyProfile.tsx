import { useState } from "react";
import { Camera } from "lucide-react";
import { PageHeader, InputField, PrimaryBtn, colors, Card, SectionLabel, Toast } from "../shared";
import { useAuth } from "../../context/AuthContext";

export function MyProfile() {
  const { user } = useAuth();
  const [form, setForm] = useState({
    firstName: user?.name.split(" ")[0] ?? "",
    lastName: user?.name.split(" ")[1] ?? "",
    email: user?.email ?? "",
  });
  const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" });
  const [toast, setToast] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error">("success");

  const handleSaveProfile = () => {
    setToastType("success");
    setToast("Profile updated successfully");
    setTimeout(() => setToast(null), 3000);
  };

  const handleChangePassword = () => {
    if (passwords.new !== passwords.confirm) {
      setToastType("error");
      setToast("Passwords don't match");
      setTimeout(() => setToast(null), 3000);
      return;
    }
    if (passwords.new.length < 8) {
      setToastType("error");
      setToast("Password must be at least 8 characters");
      setTimeout(() => setToast(null), 3000);
      return;
    }
    setToastType("success");
    setToast("Password updated successfully");
    setPasswords({ current: "", new: "", confirm: "" });
    setTimeout(() => setToast(null), 3000);
  };

  const initials = user ? user.name.split(" ").map(n => n[0]).join("").toUpperCase() : "U";
  const hue = user ? user.name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) % 360 : 200;

  return (
    <div>
      <PageHeader title="My Profile" subtitle="Manage your account information and security settings" />

      <div className="grid grid-cols-2 gap-6">
        {/* Left: Profile Info */}
        <div className="space-y-6">
          <Card>
            <SectionLabel>Personal Information</SectionLabel>

            {/* Avatar */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold"
                  style={{ backgroundColor: `hsl(${hue}, 60%, 40%)` }}
                >
                  {initials}
                </div>
                <button
                  className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center text-white shadow-md border-2 border-white"
                  style={{ backgroundColor: colors.primary }}
                >
                  <Camera size={12} />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <InputField label="First Name" value={form.firstName} onChange={v => setForm(p => ({ ...p, firstName: v }))} />
                <InputField label="Last Name" value={form.lastName} onChange={v => setForm(p => ({ ...p, lastName: v }))} />
              </div>
              <InputField label="Email" type="email" value={form.email} onChange={() => {}} readOnly hint="Email cannot be changed. Contact your administrator." />
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: colors.textPrimary }}>Company</label>
                <div className="w-full px-3 py-2.5 rounded-lg border text-sm" style={{ borderColor: colors.border, backgroundColor: colors.bg, color: colors.textSecondary }}>
                  {user?.company ?? "—"}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: colors.textPrimary }}>Role</label>
                <div className="flex">
                  <span
                    className="text-xs font-medium px-3 py-1.5 rounded-lg"
                    style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}
                  >
                    {user?.role === "employee" ? "Employee / Trainee" :
                     user?.role === "company" ? "Company Administrator" :
                     user?.role === "coordinator" ? "Coordinator" : "System Administrator"}
                  </span>
                </div>
              </div>
              <PrimaryBtn onClick={handleSaveProfile} className="w-full justify-center">Save Profile</PrimaryBtn>
            </div>
          </Card>
        </div>

        {/* Right: Security */}
        <div>
          <Card>
            <SectionLabel>Security</SectionLabel>
            <h3 className="font-semibold mb-4" style={{ color: colors.textPrimary }}>Change Password</h3>
            <div className="space-y-4">
              <InputField
                label="Current Password"
                type="password"
                value={passwords.current}
                onChange={v => setPasswords(p => ({ ...p, current: v }))}
                placeholder="••••••••"
              />
              <InputField
                label="New Password"
                type="password"
                value={passwords.new}
                onChange={v => setPasswords(p => ({ ...p, new: v }))}
                placeholder="••••••••"
                hint="Minimum 8 characters"
              />
              <InputField
                label="Confirm New Password"
                type="password"
                value={passwords.confirm}
                onChange={v => setPasswords(p => ({ ...p, confirm: v }))}
                placeholder="••••••••"
              />
              <button
                onClick={handleChangePassword}
                className="w-full py-2.5 rounded-lg text-white font-semibold text-sm transition-all"
                style={{ backgroundColor: colors.secondary }}
              >
                Update Password
              </button>
            </div>
          </Card>

          <Card className="mt-4">
            <h3 className="font-semibold mb-3" style={{ color: colors.textPrimary }}>Account Activity</h3>
            <div className="space-y-2 text-sm">
              {[
                { label: "Last login", value: "Today, 09:23 AM" },
                { label: "Account created", value: "January 10, 2024" },
                { label: "Sessions this month", value: "12" },
              ].map(item => (
                <div key={item.label} className="flex justify-between py-1.5 border-b" style={{ borderColor: colors.border }}>
                  <span style={{ color: colors.textSecondary }}>{item.label}</span>
                  <span className="font-medium" style={{ color: colors.textPrimary }}>{item.value}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {toast && <Toast message={toast} type={toastType} onClose={() => setToast(null)} />}
    </div>
  );
}
