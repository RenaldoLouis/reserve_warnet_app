import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ToastProvider from "@/components/providers/toaster-provider";
import AuthProvider from "@/components/providers/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Todo App",
  description: "Mongodb and prisma",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`} >
        <AuthProvider>
          <ToastProvider />
          <main className="p-3 m-auto max-w-screen-sm h-svh">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
