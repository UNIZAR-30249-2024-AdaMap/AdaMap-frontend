'use client'

import Layout from "@/components/layout";
import { UserProvider } from "@/context/user-context";
import { useSession } from "next-auth/react"
import useSWR from "swr";
import { useEffect } from "react";


export default function RootLayout({ children, params }) {

 /* const { status, data: session } = useSession()

   const { data: user, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/personas`,
     (url) =>
       fetch(url, {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`
        }
       }).then((res) => res.json())
   );*/


  return (
    <div>
      {/*<UserProvider user={user}>*/}
        <Layout />
        <div className="pt-24">
          {children}
        </div>
      {/*</UserProvider>*/}
    </div>
  );
}
