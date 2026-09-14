import { NavLink } from "react-router-dom";
import { Activity, ListChecks, UploadCloud } from "lucide-react";
import logoIcon from "@/assets/brand/logo-icon.png";
import TopHeader from "./TopHeader";

const navItems = [
  { to: "/", label: "Dashboard", icon: Activity },
  { to: "/incidents", label: "Incidents", icon: ListChecks },
  { to: "/upload", label: "Upload", icon: UploadCloud },
];

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <TopHeader />
      <div className="flex flex-1">
        <aside className="w-56 bg-white border-r border-gray-200 flex flex-col">
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-brand-dark/10 text-brand-dark"
                      : "text-gray-600 hover:bg-gray-50"
                  }`
                }
              >
                <Icon size={16} />
                {label}
              </NavLink>
            ))}
          </nav>
          <div className="p-3 border-t border-gray-100 flex items-center gap-2">
            <img src={logoIcon} alt="" className="h-5 w-5" />
            <span className="text-xs text-gray-400">© 2026 Amgen Inc.</span>
          </div>
        </aside>
        <main className="flex-1 overflow-y-auto bg-gray-50">{children}</main>
      </div>
    </div>
  );
}