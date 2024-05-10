'use client'

import "./globals.css";
import Navbar from "@/components/layouts/navbar";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";

const disableNavbar = ["/auth", "/authenticated"]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathName = usePathname();
  const isNavbarDisabled = disableNavbar.some((path) => pathName.startsWith(path));
  return (
    <html lang="en">
      <body className="">
        <SessionProvider>
          {!isNavbarDisabled && <Navbar/>}
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
