'use client'

import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useState } from 'react'


export function UserSignIn({ className, ...props }) {

  const router = useRouter()
  const [isLoading, setIsLoading] = useState()


  const handleSubmit = async (e) => {
    e.preventDefault()
    const { correo } = event.target

    try {
      const logIn = () => {
        return new Promise((resolve, reject) => {
          setIsLoading(true)
          signIn('credentials', {
            correo: correo.value,
            redirect: false
          })
            .then(async (res) => {
              console.log('res', res)
              if (res.status === 200) {
                setIsLoading(false)
                router.push('/spaces')
                resolve()
              }
              //throw new Error(res.error)
            })
            .catch((error) => {
              setIsLoading(false)
              reject(error)
            })
        })
      }

      toast.promise(logIn, {
        loading: 'cargando...',
        success: () => 'funciona',
        error: (error) => JSON.stringify(error)
      })
    } catch (error) {
      console.log('error', error)
      toast.error(error?.message)
    }
  }

  if (isLoading) return null

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="correo">
              Correo electrónico
            </Label>
            <Input
              id="correo"
              placeholder="Correo electrónico"
              type="email"
              autoCapitalize="none"
              autoCorrect="off"
            />
          </div>
          <Button
            className="bg-black text-white rounded-lg p-2 text-center hover:bg-custom-AdaMapBlueDark hover:text-white  mt-5"
            type="submit"
          >Logueate con el correo</Button>
        </div>
      </form>
    </div>
  )
}
