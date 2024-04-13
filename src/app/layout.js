import { Inter } from "next/font/google"
import { UserProvider } from '@/context/user-context'
import '@/styles/globals.css'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AdaMap",
  description: "Generated by create next app",
};

export default function RootLayout({ children, params }) {
  return (
    <html lang="en">
      <body >
          <UserProvider>
            {children}
          </UserProvider>
      </body>
    </html>
  );
}
