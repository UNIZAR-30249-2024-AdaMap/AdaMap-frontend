'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { LuSearch, LuTrash, LuClipboardEdit } from "react-icons/lu"
import { DialogEditSpace } from "@/components/spaces-gerente/edit-space"

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
    porcentaje: "100%",
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
    porcentaje: "100%",
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
    porcentaje: "100%",
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
    porcentaje: "50%",
    reservable: true
  }
];

export function SpacesGerente() {
  const [searchTerm, setSearchTerm] = useState('')


  const filteredSpaces = spacesData.filter(spacesData => {
    return spacesData.id.toLowerCase().includes(searchTerm.toLowerCase())
  });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

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
              <TableHead>Edificio</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Planta</TableHead>
              <TableHead>Tamaño</TableHead>
              <TableHead>Horario</TableHead>
              <TableHead>Propietario</TableHead>
              <TableHead>Aforo</TableHead>
              <TableHead>Porcentaje</TableHead>
              <TableHead>Reservable</TableHead>
              <TableHead className="w-[100px]">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSpaces.map((space, index) => (
                <TableRow key={index}>
                  <TableCell>{space.id}</TableCell>
                  <TableCell>{space.edificio}</TableCell>
                  <TableCell>{space.categoria}</TableCell>
                  <TableCell>{space.planta}</TableCell>
                  <TableCell>{space.tamano}</TableCell>
                  <TableCell>{space.horario}</TableCell>
                  <TableCell>{space.propietario}</TableCell>
                  <TableCell>{space.aforo}</TableCell>
                  <TableCell>{space.porcentaje}</TableCell>
                  <TableCell>{space.reservable ? "Sí" : "No"}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <DialogEditSpace index={index} idNombre={space.id}/>
                      <Button className="text-red-500 hover:text-red-600" size="icon" variant="ghost">
                        <LuTrash className="h-4 w-4" />
                        <span className="sr-only">Eliminar</span>
                      </Button>
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

