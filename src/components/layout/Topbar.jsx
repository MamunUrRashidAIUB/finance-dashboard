"use client";
import { useApp } from "@/context/AppContext";
import RoleBadge from "@/components/ui/RoleBadge";

export default function Topbar() {
  const { role } = useApp();

  return (
    <header className="bg-white border border-gray-100 rounded-xl px-4 py-3 flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">Financial Workspace</p>
        <p className="text-base font-semibold text-gray-800">Overview</p>
      </div>
      <RoleBadge role={role} />
    </header>
  );
}
