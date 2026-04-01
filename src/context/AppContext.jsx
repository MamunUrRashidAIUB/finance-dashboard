"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { mockTransactions } from "@/data/mockData";

const AppContext = createContext(null);

function getInitialTransactions() {
  if (typeof window === "undefined") return mockTransactions;
  const stored = localStorage.getItem("transactions");
  if (stored === null) return mockTransactions;
  try {
    return JSON.parse(stored);
  } catch {
    return mockTransactions;
  }
}

function getInitialRole() {
  if (typeof window === "undefined") return "viewer";
  return localStorage.getItem("role") || "viewer";
}

export function AppProvider({ children }) {
  const [transactions, setTransactions] = useState(getInitialTransactions);
  const [role, setRole] = useState(getInitialRole);
  const [filters, setFilters] = useState({
    search: "",
    type: "all",
    category: "all",
    sortBy: "date-desc",
  });

  // Persist transactions to localStorage on change
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  // Persist role
  useEffect(() => {
    localStorage.setItem("role", role);
  }, [role]);

  return (
    <AppContext.Provider value={{ transactions, setTransactions, role, setRole, filters, setFilters }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}