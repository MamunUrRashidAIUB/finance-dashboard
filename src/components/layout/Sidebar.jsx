"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/context/AppContext";

const navItems = [
  { label: "Dashboard", href: "/" },
  { label: "Transactions", href: "/transactions" },
  { label: "Insights", href: "/insights" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { role, setRole } = useApp();

  return (
    <aside className="fixed top-0 left-0 h-screen w-60 bg-gray-900 text-white flex flex-col px-4 py-6 z-50">
      {/* Logo */}
      <div className="mb-10">
        <span className="text-xl font-bold tracking-tight text-white">Zorvyn</span>
        <span className="text-xs text-gray-400 block mt-0.5">Finance Dashboard</span>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              pathname === item.href
                ? "bg-blue-600 text-white"
                : "text-gray-400 hover:bg-gray-800 hover:text-white"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Role Switcher */}
      <div className="mt-auto">
        <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">Role</p>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full bg-gray-800 text-white text-sm rounded-md px-3 py-2 border border-gray-700 focus:outline-none focus:border-blue-500"
        >
          <option value="viewer">Viewer</option>
          <option value="admin">Admin</option>
        </select>
        <p className="text-xs text-gray-500 mt-2">
          {role === "admin" ? "✏️ Can add & edit transactions" : "👁️ Read-only access"}
        </p>
      </div>
    </aside>
  );
}