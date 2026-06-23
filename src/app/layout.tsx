import type { Metadata } from "next";
import  { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css"; 
import { Background } from "@/src/components/layout/Backgroud";

export const metadata: Metadata = {
  title: "Brenno Developer",
  description: "Portfólio do Brenno.",
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${jetBrainsMono.variable} min-h-screen leading-relaxed text-slate-400 antialiased selection:bg-cyan-300 selection:text-slate-950`}>
          <Background/>
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
