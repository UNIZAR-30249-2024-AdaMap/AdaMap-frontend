'use client'

import Layout from "@/components/layout";
import { UserProvider } from "@/context/user-context";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import useSWR from "swr";


export default function RootLayout({ children, params }) {

  if(!JSON.parse(localStorage?.getItem('user'))) return redirect('/')

  return (
    <div>
      <UserProvider user={JSON.parse(localStorage?.getItem('user'))}>
        <Layout />
        <div className="pt-24">
          {children}
        </div>
      </UserProvider>
    </div>
  );
}
