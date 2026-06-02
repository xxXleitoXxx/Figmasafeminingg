import { createContext, useContext, useState, ReactNode } from "react";

export type Role = "admin" | "company" | "coordinator" | "employee";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: Role | null;
  availableRoles: Role[];
  company?: string;
  avatar?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (email: string) => void;
  selectRole: (role: Role) => void;
  clearRole: () => void;
  logout: () => void;
}

const MOCK_USER_BASE = {
  id: "1", 
  name: "Carlos Mendoza", 
  email: "demo@safemining.com",
  company: "Minera Andina S.A.",
  availableRoles: ["admin", "company", "coordinator", "employee"] as Role[]
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  const login = (email: string) => {
    setUser({
      ...MOCK_USER_BASE,
      email,
      role: null
    });
  };

  const selectRole = (role: Role) => {
    if (user && user.availableRoles.includes(role)) {
      setUser({ ...user, role });
    }
  };

  const clearRole = () => {
    if (user) {
      setUser({ ...user, role: null });
    }
  };

  const logout = () => setUser(null);

  return <AuthContext.Provider value={{ user, login, selectRole, clearRole, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
