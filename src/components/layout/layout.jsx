import { AppProvider } from "@/context/AppContext";
import "./globals.css";

export const metadata = {
  title: "Finance Dashboard",
  description: "Track your financial activity",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}