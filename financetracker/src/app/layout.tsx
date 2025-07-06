import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";
import { AntdRegistry } from "@ant-design/nextjs-registry";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Finance Tracker",
  description: "Finance Tracker Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-geist-sans antialiased bg-[#F5F7F9]`}
      >
        <main>
          <AntdRegistry>
          <SidebarProvider>
            <AppSidebar />
            <SidebarTrigger className="md:hidden" />
            {children}
          </SidebarProvider>
          </AntdRegistry>
        </main>
      </body>
    </html>
  );
}
