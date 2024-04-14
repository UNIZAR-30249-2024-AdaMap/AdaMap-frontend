'use client'

import Link from 'next/link'
import { UserSignIn } from '@/components/auth/user-signin-form'
import Image from 'next/image'

export default function SignInPage () {
  return (
    <div className="container relative h-screen items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 bg-custom-AdaMapBlue bg-cover">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-black dark:border-r lg:flex">
        <div className="absolute inset-0 bg-white" />
        <div className="absolute inset-0 bg-[url('/assets/logoLABIS.png')] bg-cover" />
        <Link href={'/'}>
        <div className="relative z-20 flex items-center text-lg font-bold">
          <Image
            className="w-14 h-auto"
            src="/assets/logoLABIS.png"
            alt="AdaMap logo"
            width={100}
            height={100}              
          />
            AdaMap
          </div>
        </Link>
      </div>
      <div className=" flex items-center justify-center h-full">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
              Logueate en AdaMap
              </h1>
              <p className="text-sm text-muted-foreground mb-5">
              Introduce tu correo para poder acceder a la aplicación.
              </p>
            </div>
            <UserSignIn />
          </div>
        </div>
      </div>
    </div>
  )
}
