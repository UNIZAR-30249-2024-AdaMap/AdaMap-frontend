'use client'

import Layout from "@/components/layout";
import { useSession } from "next-auth/react"


export default function RootLayout({ children, params }) {

  const { status, data: session } = useSession()
  console.log('statuuuuuuus', status)

  return (
    <div>
      <Layout />
      <div className="pt-24">
        {children}
      </div>
    </div>
  );
}
