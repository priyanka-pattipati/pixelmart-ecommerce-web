import { AuthProvider } from "@/context/auth-context";
import { ProductProvider } from "@/context/product-context";
import type { Metadata } from "next";
import type React from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "PixelMart - Product Management Dashboard",
  description: "Modern product management and e-commerce dashboard",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body>
        <AuthProvider>
          <ProductProvider>{children}</ProductProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
