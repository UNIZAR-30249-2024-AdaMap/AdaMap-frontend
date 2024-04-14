'use client'

import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'

export function UserSignIn ({ className, ...props }) {

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="username">
              Correo electrónico
            </Label>
            <Input
              id="username"
              placeholder="Correo electrónico"
              type="username"
              autoCapitalize="none"
              autoComplete="username"
              autoCorrect="off"
            />
          </div>

          <Link
            href={'/spaces'}
            className="bg-black text-white rounded-lg p-2 text-center hover:bg-custom-AdaMapBlueDark hover:text-white  mt-5"
          >Logueate con el correo</Link>
        
        </div>
      </form>
    </div>
  )
}
