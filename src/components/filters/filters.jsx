/******************************************************************************************
 * Nombre del Proyecto: AdaMap              *
 * Frontend: AdaMap                          *
 * Asignatura: Laboratorio de Ingeniería de Software *
 ******************************************************************************************/
'use client'
import Link from 'next/link'

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Category, Planta } from '@/lib/constants'


export function Filters() {

  const handleSubmit = async (e) => {
    console.log('Busqueda hecha')
  }

  return (
      <div className="container grid gap-6 md:gap-8">
      <form onSubmit={e => handleSubmit(e)}>
        <div className="grid gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1">
              <Label className="text-sm" htmlFor="name">
                Identificador
              </Label>
              <Input id="name" placeholder="Introduce el identificador" 
                onChange={(e) => console.log(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label className="text-sm" htmlFor="spaces">
                Numero de espacios
              </Label>
              <div className="flex items-center gap-2">
                <Input id="spaces" placeholder="Introduce el numero de espacios" type="number" 
                  onChange={(e) => console.log(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <Label className="text-sm" htmlFor="category">
                Categoria
              </Label>
              <Select>
              <SelectTrigger >
                <SelectValue placeholder="Seleciona la categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {Category.map((uso, index) => (
                      <SelectItem
                        key={index}
                        value={uso.value}
                        onSelect={(value) => console.log(value)}
                      >{uso.title}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex flex-col gap-1">
              <Label className="text-sm" htmlFor="start-time">
                Hora de inicio y Hora de fin
              </Label>
              <div className="flex items-center gap-2">
                <Input type="time" id="start-time" 
                 onChange={(e) => console.log(e.target.value)}
                />
                <Input type="time" id="end-time" 
                  onChange={(e) => console.log(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <Label className="text-sm" htmlFor="min-occupancy">
                Nuero maximo de ocupantes
              </Label>
              <div className="flex items-center gap-2">
                <Input id="min-occupancy" placeholder="Introduce max ocupantes" type="number" 
                  onChange={(e) => console.log(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <Label className="text-sm" htmlFor="plant">
                Planta
              </Label>
              <Select>
              <SelectTrigger >
                <SelectValue placeholder="Seleciona la planta" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {Planta.map((uso, index) => (
                      <SelectItem
                        key={index}
                        value={uso.value}
                        onSelect={(value) => console.log(value)}
                      >{uso.title}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
            
          <div className="flex flex-col gap-1">
            <button type="submit" className={cn(buttonVariants({ variant: 'adaMap' }),'w-full')}>Buscar</button>
          </div>
        </div>
        </form>
      </div>
  )
}