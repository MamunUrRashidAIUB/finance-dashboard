import { AppProvider } from "@/context/AppContext";
import Sidebar from "@/components/layout/Sidebar";
import "./globals.css";

export const metadata = {
  title: "Finance Dashboard",
  description: "Track your financial activity",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <AppProvider>
          <div className="flex">
            <Sidebar />
            <main className="ml-60 flex-1 min-h-screen p-6">
              {children}
            </main>
          </div>
        </AppProvider>
      </body>
    </html>
  );
}