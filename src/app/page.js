'use client'

import Link from 'next/link'
import Image from "next/image"
import { buttonVariants } from '@/components/ui/button'
import { cn } from "@/lib/utils"
import { usePathname } from 'next/navigation'

  
export default function InitPage() {
  const path = usePathname()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-50">
      <main className="container mx-auto p-4">
        <div className="flex flex-wrap items-center justify-between">
          <div className="w-full md:w-2/3 px-4 mb-4 md:mb-0">
            <h1 className="text-8xl font-bold mb-6">
              Reserva tu espacio en el Ada Byron
            </h1>
            <p className="text-xl mb-6 font-light">
              Reserva de una manera fácil y cómoda los espacios del edificio Ada Byron.
            </p>
            <Link
              href={'/sign-in'}
              className={cn(buttonVariants({ variant: 'adaMap' }),'w-full'
              )}>
              Comenzar
            </Link>
          </div>
          <div className="w-full md:w-1/3 px-4">
            <Image 
              src="/assets/logoLABIS.png"
              alt="Ada Byron Building"
              width={500}
              height={300}
            />
          </div>
        </div>
      </main>
    </div>
  )
}