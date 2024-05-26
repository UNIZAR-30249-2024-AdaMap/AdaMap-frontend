'use client'

import Image from "next/image";
import Link from 'next/link'
import { NavBarItems } from '@/lib/constants'
import { signOut } from "next-auth/react"
import { useUser } from "@/context/user-context"

export default function Layout() {

  const { user } = useUser()
  const esGerente = user?.roles.includes('GERENTE');

  return (
    <div className="bg-custom-AdaMapBlue p-4 w-full fixed z-50">
      <div className="mx-auto flex items-center justify-between w-full">
        <Link href={'/spaces'}>
          <div className="flex items-center space-x-1 ml-0 md:ml-5">
            <Image
              className="h-16 w-16"
              src="/assets/logoLABIS.png"
              alt="AdaMap logo"
              width={100}
              height={100}
              priority={true}
            />
            <span className="text-2xl font-bold hidden sm:block">AdaMap</span>
          </div>
        </Link>
        <div className="flex items-center space-x-4 mr-0 md:mr-5">
          <div className="flex items-center space-x-2">
            {NavBarItems.map((item, index) => (
              (esGerente || index !== 0) && (
                <Link key={item.href} href={item.href}>
                  <h1 className="text-lg font-bold md:text-md hover:text-custom-AdaMapBlueDark mr-9">{item.title}</h1>
                </Link>
              )
            ))}
          </div>
          <button
            onClick={() => {
              signOut({ callbackUrl: "/" });
              localStorage.removeItem('user')
            }}
            className="cursor-pointer text-white bg-custom-AdaMapBlueDark p-2 rounded-lg hover:bg-custom-AdaMapBlueLight hover:text-black"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  )
}

