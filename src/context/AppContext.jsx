"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { mockTransactions } from "@/data/mockData";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [transactions, setTransactions] = useState([]);
  const [role, setRole] = useState("viewer");
  const [filters, setFilters] = useState({
    search: "",
    type: "all",
    category: "all",
    sortBy: "date-desc",
  });

  // Load from localStorage or fall back to mock data
  useEffect(() => {
    const stored = localStorage.getItem("transactions");
    if (stored) {
      setTransactions(JSON.parse(stored));
    } else {
      setTransactions(mockTransactions);
    }

    const storedRole = localStorage.getItem("role");
    if (storedRole) setRole(storedRole);
  }, []);

  // Persist transactions to localStorage on change
  useEffect(() => {
    if (transactions.length > 0) {
      localStorage.setItem("transactions", JSON.stringify(transactions));
    }
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