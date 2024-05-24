'use client'

import Layout from "@/components/layout";
import { useSession } from "next-auth/react"
import useSWR from "swr";



export default function RootLayout({ children, params }) {

  const { status, data: session } = useSession()
  console.log('statuuuuuuus', status)
  console.log('sessioooooooooooon', session?.accessToken)
  console.log(new Date().toISOString())

   const { data: user, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/personas`,
     (url) =>
       fetch(url, {
         headers: {
           Authorization: `Bearer ${session?.accessToken}`,
         },
       }).then((res) => res.json())
   );
  
  console.log("useeeeeeeeeeeer", user)

  return (
    <div>
      <Layout />
      <div className="pt-24">
        {children}
      </div>
    </div>
  );
}
