import { useNavigate } from "react-router";
import { useAuth, Role } from "../../context/AuthContext";
import { colors } from "../shared";
import {
  Shield,
  Building2,
  Users,
  GraduationCap,
} from "lucide-react";
import { useEffect } from "react";

const ROLE_INFO: Record<
  Role,
  { title: string; desc: string; icon: any; path: string }
> = {
  admin: {
    title: "System Administrator",
    desc: "Manage companies, users, and global catalog",
    icon: Shield,
    path: "/admin",
  },
  company: {
    title: "Company Administrator",
    desc: "Manage your company's roles and programs",
    icon: Building2,
    path: "/company",
  },
  coordinator: {
    title: "Coordinator",
    desc: "Assign training and monitor exams",
    icon: Users,
    path: "/coordinator",
  },
  employee: {
    title: "Trainee / Employee",
    desc: "Access your training and certificates",
    icon: GraduationCap,
    path: "/employee",
  },
};

export function RoleSelectionScreen() {
  const { user, selectRole, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null;

  const handleSelect = (role: Role) => {
    selectRole(role);
    navigate(ROLE_INFO[role].path);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background:
          "linear-gradient(135deg, #1A365D 0%, #334155 100%)",
      }}
    >
      <div className="w-full max-w-2xl">
        <div className="text-center mb-10">
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
            style={{ backgroundColor: colors.secondary }}
          >
            <span className="text-3xl">⛏</span>
          </div>
          <h1 className="text-3xl font-bold text-white">
            Select Your Role
          </h1>
          <p
            className="text-sm mt-2"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            Welcome back, {user.name}. Please select a role to
            continue.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {user.availableRoles.map((role) => {
            const info = ROLE_INFO[role];
            const Icon = info.icon;
            return (
              <button
                key={role}
                onClick={() => handleSelect(role)}
                className="bg-white rounded-xl p-6 text-left transition-all hover:-translate-y-1 hover:shadow-xl group"
                style={{
                  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                  border: `2px solid transparent`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor =
                    colors.primary;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor =
                    "transparent";
                }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="p-3 rounded-lg flex-shrink-0 transition-colors"
                    style={{
                      backgroundColor: `${colors.primary}15`,
                      color: colors.primary,
                    }}
                  >
                    <Icon size={24} />
                  </div>
                  <div>
                    <h3
                      className="font-semibold text-lg mb-1"
                      style={{ color: colors.textPrimary }}
                    >
                      {info.title}
                    </h3>
                    <p
                      className="text-sm"
                      style={{ color: colors.textSecondary }}
                    >
                      {info.desc}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={handleLogout}
            className="text-sm text-white/60 hover:text-white transition-colors"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}