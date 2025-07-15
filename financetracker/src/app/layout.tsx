import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import ConditionalLayout from "@/components/ConditionalLayout";
import { SessionProvider } from "next-auth/react";

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

          <StoreProvider>
            <ConditionalLayout>
              <SessionProvider> {children}
              </SessionProvider>
            </ConditionalLayout>

          </StoreProvider>
        </main>
      </body>
    </html>
  );
}
