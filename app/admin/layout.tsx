import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import LeftSideBar from "@/components/layout/LeftSideBar";
import TopBar from "@/components/layout/TopBar";
import ToasterProvider from "@/lib/ToasterProvider";
import Loading from "./loading";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AmarStore",
  description: "amarStore E-Commerce web-app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <ClerkProvider>
    <html lang="en">
        <body className={inter.className}>
          <ToasterProvider/>
          <div className="flex max-lg:flex-col text-grey-1">
            <LeftSideBar />
            <TopBar />
          <Suspense fallback={<Loading/>}>
            <div className="flex-1">{children}</div>
          </Suspense>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
