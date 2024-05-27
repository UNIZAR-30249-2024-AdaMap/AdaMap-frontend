
'use client'

import { Inter } from "next/font/google"
import { UserProvider } from '@/context/user-context'
import '@/styles/globals.css'
import { Toaster } from "sonner";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function LangLayout({ children, params }) {
  return (
    <html lang="en">
      <body >
      <Toaster />
        <SessionProvider
          refetchInterval={5 * 60}
          refetchOnWindowFocus={true}
          basePath="/api/auth"
      >
          {children}
        </SessionProvider>
    </body>
  </html>
  );
}
