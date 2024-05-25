'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { LuSearch, LuTrash, LuClipboardEdit } from "react-icons/lu"
import { DialogEditSpace } from "@/components/spaces-gerente/edit-space"
import { useSession } from 'next-auth/react'
import useSWR from 'swr'

export function SpacesGerente() {
  const [searchTerm, setSearchTerm] = useState('')


  const { data: session } = useSession()


  const { data: espacios, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/espacios/buscar?`, (url) => fetch(url, {
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
    <div className="flex flex-col w-full">
      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-t-lg">
        <div className="relative">
          <LuSearch className="absolute left-3 top-3 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            className="w-full bg-white dark:bg-gray-950 shadow-none appearance-none pl-8 pr-4 py-2 rounded-md"
            placeholder="Busca el espacio por nombre de espacio"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div className="border rounded-b-lg overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Espacio</TableHead>
              <TableHead>Id</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Planta</TableHead>
              <TableHead>Tamaño</TableHead>
              <TableHead>Horario</TableHead>
              <TableHead>Propietario/s</TableHead>
              <TableHead>Aforo máximo</TableHead>
              <TableHead>Porcentaje uso</TableHead>
              <TableHead>Reservable</TableHead>
              <TableHead className="w-[100px]">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSpaces.map((space, index) => (
              <TableRow key={index}>
                <TableCell>{space.nombre}</TableCell>
                <TableCell>{space.idEspacio}</TableCell>
                <TableCell>{space.tipoEspacioParaReserva}</TableCell>
                <TableCell>{space.planta}</TableCell>
                <TableCell>{space.tamano} m²</TableCell>
                {/* <TableCell>{space.horario}</TableCell> */}
                <TableCell>{Object.entries(space.horarioParaReserva).map(([dia, horario]) => (
                  <p key={dia} className="text-md text-gray-500 ml-4">{dia.replace('horario', "")} : {horario}</p>
                ))}</TableCell>
                <TableCell>{space.propietarioEspacio.propietario.join(", ")}
                </TableCell>
                <TableCell>{space.numMaxPersonas}</TableCell>
                <TableCell>{space.porcentajeUso != 0 ? space.porcentajeUso : space.porcentajeUsoDefecto} %</TableCell>
                <TableCell>{space.reservable ? "Sí" : "No"}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <DialogEditSpace index={index} idNombre={space.id} />
                    {/* <Button className="text-red-500 hover:text-red-600" size="icon" variant="ghost">
                      <LuTrash className="h-4 w-4" />
                      <span className="sr-only">Eliminar</span>
                    </Button> */}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

