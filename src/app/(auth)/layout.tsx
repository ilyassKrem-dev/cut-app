import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "../globals.css";
import NavBar from "@/assets/header-assets/navBar";
import SmMainNav from "@/assets/small-sc/Nav/sm-nav";
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
              <main>
                {children}
              </main>
            <SmMainNav />
      </body>
    </html>
  );
}
