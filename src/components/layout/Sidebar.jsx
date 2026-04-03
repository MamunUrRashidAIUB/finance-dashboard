"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/context/AppContext";

const navItems = [
  { label: "Dashboard", href: "/" },
  { label: "Transactions", href: "/transactions" },
  { label: "Insights", href: "/insights" },
];

export default function Sidebar({ isOpen, onClose }) {
  const pathname = usePathname();
  const { role, setRole } = useApp();

  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-screen w-60 text-white flex flex-col px-4 py-5 z-50 border-r border-white/10 bg-[radial-gradient(circle_at_top,#1f3b76_0%,#111827_45%,#070b14_100%)] overflow-hidden transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="pointer-events-none absolute -top-24 -left-20 h-56 w-56 rounded-full bg-cyan-300/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-10 h-56 w-56 rounded-full bg-blue-500/20 blur-3xl" />

        <div className="relative mb-8">
          <div className="inline-flex items-center justify-center rounded-xl bg-white/10 border border-white/20 px-3 py-2 backdrop-blur-sm shadow-lg shadow-black/20">
            <span className="text-lg font-black tracking-[0.2em] text-white">XYZ</span>
          </div>
          <span className="text-[11px] text-slate-300/90 block mt-2 tracking-[0.16em] uppercase">Finance Dashboard</span>
        </div>

        <nav className="relative flex flex-col gap-2 flex-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`group flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                pathname === item.href
                  ? "bg-linear-to-r from-blue-500 to-cyan-400 text-white shadow-md shadow-blue-900/40"
                  : "text-slate-300 hover:text-white hover:bg-white/10"
              }`}
            >
              <span>{item.label}</span>
              <span
                className={`h-2 w-2 rounded-full transition-all duration-200 ${
                  pathname === item.href ? "bg-white" : "bg-slate-500/70 group-hover:bg-cyan-300"
                }`}
              />
            </Link>
          ))}
        </nav>

        <div className="relative mt-auto rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-3 shadow-lg shadow-black/20">
          <p className="text-[10px] text-slate-300 mb-2 uppercase tracking-[0.2em]">Role</p>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full bg-slate-900/70 text-white text-sm rounded-lg px-3 py-2 border border-slate-700 focus:outline-none focus:border-cyan-300 transition-colors"
          >
            <option value="viewer">Viewer</option>
            <option value="admin">Admin</option>
          </select>
          <p className="text-xs text-slate-300 mt-2 leading-relaxed">
            {role === "admin" ? "✏️ Can add & edit transactions" : "👁️ Read-only access"}
          </p>
        </div>
      </aside>
    </>
  );
}