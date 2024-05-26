'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { buttonVariants } from '@/components/ui/button'
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { LuSearch } from "react-icons/lu"
import { Input } from "@/components/ui/input"
import Link from 'next/link'
import { DialogReserva } from "@/components/spaces/reserve-dialog"
import { DialogFileters } from "@/components/spaces/filters-dialog"
import { DialogReservaVariosEspacios } from "@/components/spaces/reserve-various-spaces-dialog"
import { DialogReservaAutomatica } from "@/components/spaces/reserve-automatic-dialog"
import useSWR from 'swr'
import { useEffect } from 'react'
import { useSession } from 'next-auth/react'


export function AllSpaces() {
  const [searchTerm, setSearchTerm] = useState('')
  const [form, setForm] = useState({ categoria: null, planta: null, ocupantes: null })
  const [filteredUrl, setFilteredUrl] = useState('')
  const setter = ({ key, value }) => setForm({ ...form, [key]: value })

  const { data: session } = useSession()


  const { data: espacios, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/espacios/buscar?` + filteredUrl, (url) => fetch(url, {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`
    }
  }).then(res => res.json()))

  console.log(espacios);

  const filteredSpaces = espacios?.filter(espacio => {
    return espacio.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  if (isLoading) return null
  
  return (
    <div>
      <div className="mb-4 ">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <LuSearch className="w-10 h-10 mr-2 text-gray-500" />
            <Input
              placeholder="Busca el espacio"
              className="text-base"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <DialogFileters form={form} setter={setter} setFilteredUrl={setFilteredUrl} />
          </div>
          <DialogReservaAutomatica filteredSpaces={filteredSpaces} setFilteredUrl={setFilteredUrl} />
          <DialogReservaVariosEspacios filteredSpaces={filteredSpaces} setFilteredUrl={setFilteredUrl} />
        </div>

      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredSpaces?.map((space, index) => (
          <div key={index} className="flex flex-col rounded-lg border overflow-hidden shadow-sm">
            <div className="p-4 flex-1">
              <h3 className="font-semibold text-lg">{space.nombre}</h3>
              <p className="text-md text-gray-700">Identificador: {space.idEspacio}</p>
              <p className="text-md text-gray-700">Edificio: Ada Byron</p>
              <p className="text-md text-gray-700">Categoría: {space.tipoEspacioParaReserva}</p>
              <p className="text-md text-gray-700">Planta: {space.planta}</p>
              <p className="text-md text-gray-700">Tamaño: {space.tamano} m²</p>
              <p className="text-md text-gray-700">Propietario: {space.propietarioEspacio.propietario[0]}</p>
              <p className="text-md text-gray-700">Aforo: {space.maxPersonasParaReserva}</p>
              <p className="text-md text-gray-700">Horario:</p>
              {Object.entries(space.horarioParaReserva)?.map(([dia, horario]) => (
                <p key={dia} className="text-md text-gray-500 ml-4">{dia.replace('horario', "")} : {horario}</p>
              ))}
              
            </div>
            <Separator />
            <div className="p-4  grid gap-2">
              {space.reservable &&
                (<DialogReserva index={index} idEspacio={space.idEspacio} idNombre={space.nombre} />)
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
