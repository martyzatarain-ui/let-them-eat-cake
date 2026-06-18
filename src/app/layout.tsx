import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LET THEM EAT CAKE — Corporate Compensation Database",
  description:
    "How many workers equal one CEO? A transparency terminal tracking CEO-to-worker pay ratios at public companies, sourced from SEC proxy filings.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-crt-black text-crt-green min-h-screen">
        <div className="crt-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
