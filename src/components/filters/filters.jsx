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
import { toast } from 'sonner'
import useSWR from 'swr'
import { useState } from 'react'
import { useSession } from "next-auth/react"



export function Filters() {

  const [form, setForm] = useState({ planta: null, categoria: null, ocupantes: null })
  const setter = ({ key, value }) => setForm({ ...form, [key]: value })
  const { data: session } = useSession()
  const [espaciosFiltrados, setEspaciosFiltrados] = useState([])

  console.log("espaciosFiltrados", espaciosFiltrados)

  const handleSubmit = (e) => {
    e.preventDefault();

    setEspaciosFiltrados([])

    let newForm = {...form};

    if (form.ocupantes === 0 || form.ocupantes === null) {
      const { ocupantes, ...rest } = newForm;
      newForm = rest;
    }

    if (form.categoria === null) {
      const { categoria, ...rest } = newForm;
      newForm = rest;
    }

    if (form.planta === null) {
      const { planta, ...rest } = newForm;
      newForm = rest;
    }
    
    try {
      const filtrarBusqueda = () => {
        return new Promise(async (resolve, reject) => {
          const params = new URLSearchParams();

          // Solo añadir los parámetros que existen en newForm
          if ('planta' in newForm) {
            params.append('planta', newForm.planta);
          }
          if ('categoria' in newForm) {
            params.append('categoria', newForm.categoria);
          }
          if ('ocupantes' in newForm) {
            params.append('ocupantes', newForm.ocupantes);
          }
          
          await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/espacios/buscar?${params.toString()}`)
            .then(async (res) => {
              const body = await res.json();
              if (res.status === 200) {
                console.log("bodddddy", body);
                setEspaciosFiltrados(body);
                resolve();
              }
            })
            .catch((error) => {
              console.log(error);
              reject(error);
            });
        });
      };

      toast.promise(filtrarBusqueda, {
        loading: "Cargando...",
        success: () => "Funciona",
        error: (error) => JSON.stringify(error),
      });
    } catch (error) {
      console.log("error", error);
      toast.error(error?.message);
    }
  };

  return (
      <div className="container grid gap-6 md:gap-8">
      <form onSubmit={e => handleSubmit(e)}>
        <div className="grid gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1">
              <Label className="text-sm" htmlFor="spaces">
                Ocupantes máximos
              </Label>
              <div className="flex items-center gap-2">
              <Input 
                type="number" 
                placeholder="Ocupantes máximos" 
                onChange={(e) => {
                  setter({ key: 'ocupantes', value: e.target.value })
                }} />
              
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <Label className="text-sm" htmlFor="category">
                Categoría
              </Label>
              <Select onValueChange={categoriaValue => setter({ key: 'categoria', value: categoriaValue})}>
              <SelectTrigger >
                <SelectValue placeholder="Seleciona la categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {Category.map((uso, index) => (
                      <SelectItem
                        key={index}
                        value={uso.value}
                      >{uso.title}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1">
              <Label className="text-sm" htmlFor="plant">
                Planta
              </Label>
              <Select onValueChange={plantaValue => setter({ key: 'planta', value: plantaValue})}>
              <SelectTrigger >
                <SelectValue placeholder="Seleciona la planta" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {Planta.map((uso, index) => (
                      <SelectItem
                        key={index}
                        value={uso.value}
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