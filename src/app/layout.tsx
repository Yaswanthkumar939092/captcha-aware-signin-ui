
import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DashboardLayout } from "@/components/dashboard-layout";
import { UserProvider } from "@/app/context/UserContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Application Dashboard",
  description: "Manage your applications",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          <DashboardLayout>{children}</DashboardLayout>
        </UserProvider>
      </body>
    </html>
  );
}
