import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "../globals.css";
import 'leaflet/dist/leaflet.css'
import BiMainNav from "@/assets/big-sc/Nav/bi-nav";
import SmMainHeader from "@/assets/small-sc/header/sm-header";
import SmMainNav from "@/assets/small-sc/Nav/sm-nav";
import { Suspense } from "react";
import Loading from "./loading";
import { LoginProvider } from "@/assets/wrappers/loginWrapper";
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
        <LoginProvider>
          <BiMainNav />
          <Suspense>
            <SmMainHeader />
          </Suspense>
         
            <main>
              <Suspense fallback={<Loading/>}>
                {children}
              </Suspense>
            </main>
          
          <Suspense>
            <SmMainNav />
          </Suspense>
        </LoginProvider>
      </body>
    </html>
  );
}
