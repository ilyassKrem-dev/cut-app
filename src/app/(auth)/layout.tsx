import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "../globals.css";
import NavBar from "@/assets/header-assets/navBar";
import SmMainNav from "@/assets/small-sc/Nav/sm-nav";
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
            <NavBar />
              <main>
                {children}
              </main>
            <SmMainNav />
      </LoginProvider>
      </body>
    </html>
  );
}
