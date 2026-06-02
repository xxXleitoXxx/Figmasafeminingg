import { createBrowserRouter, Navigate } from "react-router";
import { AppShell } from "./components/layout/AppShell";
import { LoginScreen } from "./components/auth/LoginScreen";
import { ForgotPasswordScreen } from "./components/auth/ForgotPasswordScreen";

// Admin
import { AdminDashboard } from "./components/admin/AdminDashboard";
import { CompaniesScreen } from "./components/admin/CompaniesScreen";
import { CompanyDetail } from "./components/admin/CompanyDetail";
import { AdminUsersScreen } from "./components/admin/AdminUsersScreen";
import { SimulationsCatalog } from "./components/admin/SimulationsCatalog";
import { SimulationDetail } from "./components/admin/SimulationDetail";
import { RolesScreen } from "./components/admin/RolesScreen";
import { GlobalReports } from "./components/admin/GlobalReports";
import { Configuration } from "./components/admin/Configuration";

// Company
import { CompanyDashboard } from "./components/company/CompanyDashboard";
import { CompanyUsers } from "./components/company/CompanyUsers";
import { CompanyRoles } from "./components/company/CompanyRoles";
import { ProgramsList } from "./components/company/ProgramsList";
import { ProgramCreate } from "./components/company/ProgramCreate";
import { AssignProgram } from "./components/company/AssignProgram";
import { EmployeeProgress } from "./components/company/EmployeeProgress";
import { CompanyReports } from "./components/company/CompanyReports";

// Coordinator
import { CoordinatorDashboard } from "./components/coordinator/CoordinatorDashboard";
import { ExamManagement } from "./components/coordinator/ExamManagement";

// Employee
import { EmployeeDashboard } from "./components/employee/EmployeeDashboard";
import { ProgramDetail } from "./components/employee/ProgramDetail";
import { ExamInterface } from "./components/employee/ExamInterface";
import { ExamResults } from "./components/employee/ExamResults";
import { MyCertificates } from "./components/employee/MyCertificates";
import { MyProfile } from "./components/employee/MyProfile";

// Shared profile (reused for company and coordinator roles)
const SharedProfile = () => <MyProfile />;

// Shared programs view for coordinator (reuse ProgramsList)
const CoordPrograms = () => <ProgramsList />;

// Shared reports for coordinator (reuse CompanyReports)
const CoordReports = () => <CompanyReports />;

// Shared employees view for coordinator (reuse EmployeeProgress)
const CoordEmployees = () => <EmployeeProgress />;

// Shared simulations for company admin (reuse catalog)
const CompanySimulations = () => <SimulationsCatalog />;
const CoordSimulations = () => <SimulationsCatalog />;

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    Component: LoginScreen,
  },
  {
    path: "/forgot-password",
    Component: ForgotPasswordScreen,
  },

  // ─── System Admin ──────────────────────────────────
  {
    path: "/admin",
    Component: AppShell,
    children: [
      { index: true, Component: AdminDashboard },
      { path: "companies", Component: CompaniesScreen },
      { path: "companies/new", Component: CompanyDetail },
      { path: "companies/:id", Component: CompanyDetail },
      { path: "users", Component: AdminUsersScreen },
      { path: "simulations", Component: SimulationsCatalog },
      { path: "simulations/new", Component: SimulationDetail },
      { path: "simulations/:id", Component: SimulationDetail },
      { path: "roles", Component: RolesScreen },
      { path: "reports", Component: GlobalReports },
      { path: "config", Component: Configuration },
    ],
  },

  // ─── Company Admin ─────────────────────────────────
  {
    path: "/company",
    Component: AppShell,
    children: [
      { index: true, Component: CompanyDashboard },
      { path: "users", Component: CompanyUsers },
      { path: "roles", Component: CompanyRoles },
      { path: "programs", Component: ProgramsList },
      { path: "programs/new", Component: ProgramCreate },
      { path: "programs/:id", Component: ProgramCreate },
      { path: "programs/:id/assign", Component: AssignProgram },
      { path: "programs/:id/progress", Component: EmployeeProgress },
      { path: "simulations", Component: CompanySimulations },
      { path: "reports", Component: CompanyReports },
      { path: "profile", Component: SharedProfile },
    ],
  },

  // ─── Coordinator ───────────────────────────────────
  {
    path: "/coordinator",
    Component: AppShell,
    children: [
      { index: true, Component: CoordinatorDashboard },
      { path: "programs", Component: CoordPrograms },
      { path: "programs/new", Component: ProgramCreate },
      { path: "programs/:id", Component: ProgramCreate },
      { path: "programs/:id/assign", Component: AssignProgram },
      { path: "programs/:id/progress", Component: CoordEmployees },
      { path: "simulations", Component: CoordSimulations },
      { path: "employees", Component: CoordEmployees },
      { path: "exams", Component: ExamManagement },
      { path: "reports", Component: CoordReports },
      { path: "profile", Component: SharedProfile },
    ],
  },

  // ─── Employee ──────────────────────────────────────
  {
    path: "/employee",
    Component: AppShell,
    children: [
      { index: true, Component: EmployeeDashboard },
      { path: "programs/:id", Component: ProgramDetail },
      { path: "certificates", Component: MyCertificates },
      { path: "profile", Component: MyProfile },
    ],
  },

  // Exam interface (fullscreen, outside AppShell)
  {
    path: "/employee/exam/:id",
    Component: ExamInterface,
  },
  {
    path: "/employee/exam/:id/results",
    Component: ExamResults,
  },
]);
