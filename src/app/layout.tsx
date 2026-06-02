import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { CartDrawerProvider } from "@/context/CartDrawerContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

export const metadata: Metadata = {
  title: "Maison Luxe — Sacs à Main de Luxe",
  description: "Découvrez notre collection exclusive de sacs à main de luxe : Chanel, Hermès, Louis Vuitton, Gucci, Prada, Dior.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full">
      <body className="min-h-full flex flex-col antialiased">
        <CartProvider>
          <CartDrawerProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <CartDrawer />
          </CartDrawerProvider>
        </CartProvider>
      </body>
    </html>
  );
}
