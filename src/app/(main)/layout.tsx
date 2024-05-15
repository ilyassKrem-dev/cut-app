import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "../globals.css";
import 'leaflet/dist/leaflet.css'
import NavBar from "@/components/connection/navBar";
import SmMainNav from "@/assets/small-sc/Nav/sm-nav";
import AuthProvider from "@/assets/wrappers/AuthWrapper";
import { Suspense } from "react";
import LoadingAnimation from "@/assets/other/spinner";

const sora = Sora({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BarberCut",
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
          <NavBar />
          
            <AuthProvider>
              <Suspense fallback={<LoadingAnimation />}>
                <main className="min-h-screen">
                  {children}
                </main>
              </Suspense>
            </AuthProvider>
           
          <SmMainNav />
        
      </body>
    </html>
  );
}
