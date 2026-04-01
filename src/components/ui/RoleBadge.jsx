"use client";

export default function RoleBadge({ role }) {
  const isAdmin = role === "admin";

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
        isAdmin
          ? "bg-blue-100 text-blue-700"
          : "bg-gray-100 text-gray-700"
      }`}
    >
      {isAdmin ? "Admin" : "Viewer"}
    </span>
  );
}
