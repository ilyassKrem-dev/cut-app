import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "../../globals.css";
import NavBar from "@/assets/header-assets/navBar";
import SmMainNav from "@/assets/small-sc/Nav/sm-nav";
import AuthProvider from "@/assets/wrappers/AuthWrapper";
import { Suspense } from "react";
import LoadingAnimation from "@/assets/other/spinner";
import { Toaster } from "@/components/ui/toaster";
import SideBar from "@/components/messages/assets/sideBar";
import { LoginProvider } from "@/assets/wrappers/loginWrapper";
const sora = Sora({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Messages",
  description: "BerberCut for getting in call with barbers online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={sora.className}>
            <AuthProvider>
                <LoginProvider>
                  <NavBar />
                  <Suspense fallback={<LoadingAnimation />}>

                    <main className="h-screen flex md:pt-[5.4rem]">
                      <SideBar />
                      {children}
                    </main>
                    <Toaster />
                  </Suspense>
                </LoginProvider>
                <SmMainNav />
            </AuthProvider>
          
      </body>
    </html>
  );
}
