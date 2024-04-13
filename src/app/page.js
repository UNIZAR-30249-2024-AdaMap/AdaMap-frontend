/**
 * v0 by Vercel.
 * @see https://v0.dev/t/iaYyTHlZaxD
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { buttonVariants } from '@/components/ui/button'
import { cn } from "@/lib/utils"
  
export default function Component() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-50">
      <main className="container mx-auto p-4">
        <div className="flex flex-wrap items-center justify-between">
          <div className="w-full md:w-1/2 px-4 mb-4 md:mb-0">
            <h1 className="text-8xl font-bold mb-6">
              Reserva tu espacio en el Ada Byron
            </h1>
            <p className="text-xl mb-6 font-light">
              Reserva de una manera fácil y cómoda los espacios del edificio Ada Byron.
            </p>
            <Button className={cn(buttonVariants({ variant: 'adaMap' }), 'w-full')}>
              Button
            </Button>
          </div>
          <div className="w-full md:w-1/2 px-4">
            <Image 
              src="/assets/logoLABIS.png"
              alt="Ada Byron Building"
              width={500}
              height={300}
              objectFit="contain"
            />
          </div>
        </div>
      </main>
    </div>
  )
}