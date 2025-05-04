
import React from "react";
import { UserProvider } from "@/app/context/UserContext";
import { DashboardLayout } from "@/components/dashboard-layout";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </UserProvider>
  );
}
