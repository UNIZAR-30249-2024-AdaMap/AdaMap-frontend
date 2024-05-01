'use client'

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { buttonVariants } from '@/components/ui/button';
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { LuSearch } from "react-icons/lu";
import { Input } from "@/components/ui/input";
import Link from 'next/link';
import { DialogReserva } from "@/components/spaces/reserve-dialog";

export function ModifyRS() {
  return (
    <div className='flex flex-row justify-between w-full space-x-4'>  
      <div className="flex flex-col rounded-lg border overflow-hidden shadow-sm flex-1 h-full "> 
        <div className="p-4">
          <h3 className="font-semibold text-4xl">Reservas</h3>
          <p className="mt-3 text-2xl font-light text-gray-500">Modifica las características de una reserva específica.</p>
        </div>
        <Separator className="mt-60"/>
        <div className="p-4 grid gap-2">
          <Link
            href={'/reservations'}
            className={cn(buttonVariants({ variant: 'adaMap' }), 'w-full')
            }>
            Reservas
          </Link>
        </div>
      </div>
      <div className="flex flex-col rounded-lg border overflow-hidden shadow-sm flex-1 h-full">
        <div className="p-4">
          <h3 className="font-semibold text-4xl">Espacios</h3>
          <p className="mt-3 text-2xl font-light text-gray-500">Modifica las características de un espacio específico.</p>
        </div>
        <Separator className="mt-60"/>
        <div className="p-4 grid gap-2">
          <Link
            href={'/spaces-gerente'}
            className={cn(buttonVariants({ variant: 'adaMap' }), 'w-full')
            }>
            Espacios
          </Link>
        </div>
      </div>
    </div>
  );
}
