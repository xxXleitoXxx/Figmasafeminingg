import { createBrowserRouter, Navigate } from "react-router";
import { AppShell } from "./components/layout/AppShell";
import { LoginScreen } from "./components/auth/LoginScreen";
import { RoleSelectionScreen } from "./components/auth/RoleSelectionScreen";
import { ForgotPasswordScreen } from "./components/auth/ForgotPasswordScreen";
import { ResetPasswordScreen } from "./components/auth/ResetPasswordScreen";

// System Admin
import { HelpManagement } from "./components/admin/HelpManagement";

// Shared Help Center
import { HelpCenter } from "./components/shared/HelpCenter";
import { AuditTrail } from "./components/shared/AuditTrail";

// Admin
import { AdminDashboard } from "./components/admin/AdminDashboard";
import { CompaniesScreen } from "./components/admin/CompaniesScreen";
import { CompanyDetail } from "./components/admin/CompanyDetail";
import { CompanyCreate } from "./components/admin/CompanyCreate";
import { AdminUsersScreen } from "./components/admin/AdminUsersScreen";
import { SimulationsCatalog } from "./components/admin/SimulationsCatalog";
import { SimulationDetail } from "./components/admin/SimulationDetail";
import { SimulationView } from "./components/shared/SimulationView";
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
import { ExamCreate } from "./components/coordinator/ExamCreate";

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

// Shared exams for company admin (reuse ExamManagement)
const CompanyExams = () => <ExamManagement />;

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
    path: "/role-selection",
    Component: RoleSelectionScreen,
  },
  {
    path: "/forgot-password",
    Component: ForgotPasswordScreen,
  },
  {
    path: "/reset-password",
    Component: ResetPasswordScreen,
  },

  // ─── System Admin ──────────────────────────────────
  {
    path: "/admin",
    Component: AppShell,
    children: [
      { index: true, Component: AdminDashboard },
      { path: "companies", Component: CompaniesScreen },
      { path: "companies/new", Component: CompanyCreate },
      { path: "companies/:id", Component: CompanyDetail },
      { path: "users", Component: AdminUsersScreen },
      { path: "simulations", Component: SimulationsCatalog },
      { path: "simulations/new", Component: SimulationDetail },
      { path: "simulations/:id", Component: SimulationView },
      { path: "simulations/:id/view", Component: SimulationView },
      { path: "simulations/:id/edit", Component: SimulationDetail },
      { path: "roles", Component: RolesScreen },
      { path: "reports", Component: GlobalReports },
      { path: "config", Component: Configuration },
      { path: "help", Component: HelpManagement },
      { path: "audit", Component: AuditTrail },
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
      { path: "simulations/:id", Component: SimulationView },
      { path: "simulations/:id/view", Component: SimulationView },
      { path: "exams", Component: CompanyExams },
      { path: "exams/new", Component: ExamCreate },
      { path: "reports", Component: CompanyReports },
      { path: "audit", Component: AuditTrail },
      { path: "profile", Component: SharedProfile },
      { path: "help", Component: HelpCenter },
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
      { path: "simulations/:id", Component: SimulationView },
      { path: "simulations/:id/view", Component: SimulationView },
      { path: "employees", Component: CoordEmployees },
      { path: "exams", Component: ExamManagement },
      { path: "exams/new", Component: ExamCreate },
      { path: "reports", Component: CoordReports },
      { path: "profile", Component: SharedProfile },
      { path: "help", Component: HelpCenter },
    ],
  },

  // ─── Employee ──────────────────────────────────────
  {
    path: "/employee",
    Component: AppShell,
    children: [
      { index: true, Component: EmployeeDashboard },
      { path: "programs/:id", Component: ProgramDetail },
      { path: "simulations/:id", Component: SimulationView },
      { path: "simulations/:id/view", Component: SimulationView },
      { path: "certificates", Component: MyCertificates },
      { path: "profile", Component: MyProfile },
      { path: "help", Component: HelpCenter },
    ],
  },

  // Exam and Simulation interface (fullscreen, outside AppShell)
  {
    path: "/employee/exam/:id",
    Component: ExamInterface,
  },
  {
    path: "/employee/exam/:id/results",
    Component: ExamResults,
  },
]);
