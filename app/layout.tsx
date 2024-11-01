import useAuth from "@/hooks/useAuth";
import "./globals.css";
import "nes.css/css/nes.min.css";
import { Press_Start_2P } from 'next/font/google';
import AuthCheck from "@/components/AuthCheck";

const pressStart2P = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${pressStart2P.className}`}
      >
        <AuthCheck>
          {children}
        </AuthCheck>
      </body>
    </html>
  );
}
