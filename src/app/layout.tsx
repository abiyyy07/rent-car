'use client'

import "./globals.css";
import Navbar from "@/components/layouts/navbar";
import Footer from "@/components/layouts/footer";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";

const disableNavbar = ["/auth", "/home"]
const disableFooter = ["/auth", "/home"]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathName = usePathname();
  const isNavbarDisabled = disableNavbar.some((path) => pathName.startsWith(path));
  const isFooterDisabled = disableFooter.some((path) => pathName.startsWith(path));
  return (
    <html lang="en">
      <body className="">
        <SessionProvider>
          {!isNavbarDisabled && <Navbar/>}
          {children}
          {!isFooterDisabled && <Footer/>}
        </SessionProvider>
      </body>
    </html>
  );
}
