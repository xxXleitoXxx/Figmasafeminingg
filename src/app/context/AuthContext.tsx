import { createContext, useContext, useState, ReactNode } from "react";

export type Role = "admin" | "company" | "coordinator" | "employee";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  company?: string;
  avatar?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (role: Role) => void;
  logout: () => void;
}

const MOCK_USERS: Record<Role, AuthUser> = {
  admin: { id: "1", name: "Carlos Mendoza", email: "admin@safemining.com", role: "admin" },
  company: { id: "2", name: "Laura Gómez", email: "laura@minera-andina.com", role: "company", company: "Minera Andina S.A." },
  coordinator: { id: "3", name: "Roberto Silva", email: "roberto@minera-andina.com", role: "coordinator", company: "Minera Andina S.A." },
  employee: { id: "4", name: "Juan Pérez", email: "juan@minera-andina.com", role: "employee", company: "Minera Andina S.A." },
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  const login = (role: Role) => setUser(MOCK_USERS[role]);
  const logout = () => setUser(null);

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
