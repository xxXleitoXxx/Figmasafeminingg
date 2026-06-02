import { Outlet } from "react-router";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export function AppShell() {
  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: "#F9FAFB" }}>
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0">
        <Header />
        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
