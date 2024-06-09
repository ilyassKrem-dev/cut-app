import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "../../globals.css";
import 'leaflet/dist/leaflet.css'
import NavBar from "@/assets/header-assets/navBar";
import SmMainNav from "@/assets/small-sc/Nav/sm-nav";
import AuthProvider from "@/assets/wrappers/AuthWrapper";
import { Suspense } from "react";
import LoadingAnimation from "@/assets/other/spinner";
import { LoginProvider } from "@/assets/wrappers/loginWrapper";
import { Toaster } from "@/components/ui/toaster";
const sora = Sora({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Salon",
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
                  <main className="h-screen">
                    {children}
                  </main>
                  <Toaster />
                </Suspense>
              </LoginProvider>
            </AuthProvider>
           
          <SmMainNav />
        
      </body>
    </html>
  );
}
