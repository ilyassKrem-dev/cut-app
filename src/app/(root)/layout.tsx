import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "../globals.css";
import BiMainNav from "../assets/big-sc/Nav/bi-nav";
import SmMainNav from "../assets/small-sc/Nav/sm-nav";
import SmMainWrapper from "../assets/wrappers/sm-wrapper";
import BiMainWrapper from "../assets/wrappers/bi-wrapper";
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
          <BiMainWrapper>
            <SmMainWrapper>
              <main>
                {children}
              </main>
            </SmMainWrapper>
          </BiMainWrapper>
      </body>
    </html>
  );
}
