import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ToasterProvider from "@/lib/ToasterProvider";
import Navbar from "@/components/Navbar";
import { Suspense } from "react";
import Loading from "./loading";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AmarStore",
  description: "amarStore E-Commerce web-app",
};

export const dynamic = 'force-dynamic';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {



  return (
    <html lang="en">
    <body className={inter.className}>
      <ClerkProvider>
        <ToasterProvider />
        <Navbar />
        <Suspense fallback={<Loading/>}>
        {children}
        </Suspense>
        <Footer/>
      </ClerkProvider>
    </body>
  </html>
  );
}
