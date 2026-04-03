"use client";
import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

export default function AppShell({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 min-h-screen p-4 sm:p-6 lg:ml-60 flex flex-col gap-4">
        <Topbar onMenuClick={() => setSidebarOpen((prev) => !prev)} />
        <main>{children}</main>
      </div>
    </div>
  );
}
