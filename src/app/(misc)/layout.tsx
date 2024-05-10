import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "../globals.css";



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
            <main className="min-h-screen">
              {children}
            </main>
   
      </body>
    </html>
  );
}
