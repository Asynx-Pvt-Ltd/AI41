import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import ClientSideToastContainer from "./components/ClientSideToasterContainer";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Tools",
  description: "AI Tools Directory",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://kit.fontawesome.com/224b290536.js"
          crossOrigin="anonymous"
        />
      </head>
      <body className={inter.className}>
        <ClientSideToastContainer />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
