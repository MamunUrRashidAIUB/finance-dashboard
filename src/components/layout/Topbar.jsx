"use client";
import { useApp } from "@/context/AppContext";
import RoleBadge from "@/components/ui/RoleBadge";

export default function Topbar({ onMenuClick }) {
  const { role } = useApp();

  return (
    <header className="bg-white border border-gray-100 rounded-xl px-3 sm:px-4 py-3 flex items-center justify-between gap-3">
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <button
          type="button"
          aria-label="Toggle sidebar"
          onClick={onMenuClick}
          className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-gray-50 p-2 text-gray-700 hover:bg-gray-100 lg:hidden"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        <div className="min-w-0">
        <p className="text-sm text-gray-500">Financial Workspace</p>
          <p className="text-base font-semibold text-gray-800 truncate">Overview</p>
        </div>
      </div>
      <RoleBadge role={role} />
    </header>
  );
}
