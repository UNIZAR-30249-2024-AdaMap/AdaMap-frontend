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
import { DialogReservaVariosEspacios } from "@/components/spaces/reserve-various-spaces-dialog"
import useSWR from 'swr'
import { useEffect } from 'react'

const spacesData = [
  {
    id: "Laboratorio 1.02",
    edificio: "Ada Byron",
    categoria: "Laboratorio",
    planta: "1",
    tamano: "50.34 m²",
    horario: "L-D 8:00-20:00",
    propietario: "DIIS",
    aforo: "50",
    reservable: true
  },
  {
    id: "Aula 0.05",
    edificio: "Ada Byron",
    categoria: "Aula",
    planta: "1",
    tamano: "50.34 m²",
    horario: "L-D 8:00-20:00",
    propietario: "DIIS",
    aforo: "50",
    reservable: true
  },
  {
    id: "Laboratorio 1.03",
    edificio: "Ada Byron",
    categoria: "Laboratorio",
    planta: "1",
    tamano: "50.34 m²",
    horario: "L-D 8:00-20:00",
    propietario: "DIIS",
    aforo: "50",
    reservable: false
  },
  {
    id: "Laboratorio 1.04",
    edificio: "Ada Byron",
    categoria: "Laboratorio",
    planta: "1",
    tamano: "50.34 m²",
    horario: "L-D 8:00-20:00",
    propietario: "DIIS",
    aforo: "50",
    reservable: true
  },

];

export function AllSpaces() {
  const [searchTerm, setSearchTerm] = useState('')
  // const [fetchedData, setFetchedData] = useState(null);

  const { data: espacios } = useSWR(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/espacios/buscar`);
  console.log(espacios);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/espacios/buscar`);
  //       const data = await res.json();
  //       setFetchedData(data);
  //       console.log("Fetched data:", data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const filteredSpaces = spacesData.filter(spacesData => {
    return spacesData.id.toLowerCase().includes(searchTerm.toLowerCase())
  });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

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
            <Link
              href={'/filters'}
              className={cn(buttonVariants({ variant: 'adaMap' }), 'ml-4 px-7'
              )}>
              Filtros
            </Link>
          </div>
          <DialogReservaVariosEspacios />
        </div>

      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredSpaces.map((space, index) => (
          <div key={index} className="flex flex-col rounded-lg border overflow-hidden shadow-sm">
            <div className="p-4 flex-1">
              <h3 className="font-semibold text-lg">{space.id}</h3>
              <p className="text-md text-gray-500">Edificio: {space.edificio}</p>
              <p className="text-md text-gray-500">Categoría: {space.categoria}</p>
              <p className="text-md text-gray-500">Planta: {space.planta}</p>
              <p className="text-md text-gray-500">Tamaño: {space.tamano}</p>
              <p className="text-md text-gray-500">Horario: {space.horario}</p>
              <p className="text-md text-gray-500">Propietario: {space.propietario}</p>
              <p className="text-md text-gray-500">Aforo: {space.aforo}</p>
            </div>
            <Separator />
            <div className="p-4  grid gap-2">
              {space.reservable &&
                (<DialogReserva index={index} idNombre={space.id} aforo={space.aforo} />)
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
