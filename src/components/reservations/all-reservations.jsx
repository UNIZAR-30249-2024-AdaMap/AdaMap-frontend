'use client'
import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { LuSearch, LuTrash, LuClipboardEdit } from "react-icons/lu"


export function AllReservations() {
  const [searchTerm, setSearchTerm] = useState('')

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
            placeholder="Busca la reserva"
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
              <TableHead>Usuario</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Hora Inicio</TableHead>
              <TableHead>Hora Fin</TableHead>
              <TableHead>Aforo</TableHead>
              <TableHead>Tipo de Uso</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead className="w-[100px]">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Sala de Juntas 1</TableCell>
              <TableCell>jdoe@empresa.com</TableCell>
              <TableCell>2023-04-15</TableCell>
              <TableCell>09:00</TableCell>
              <TableCell>11:00</TableCell>
              <TableCell>10</TableCell>
              <TableCell>Reunión</TableCell>
              <TableCell>Reunión del equipo de ventas</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button size="icon" variant="ghost">
                    <LuClipboardEdit className="h-4 w-4" />
                    <span className="sr-only">Editar</span>
                  </Button>
                  <Button className="text-red-500 hover:text-red-600" size="icon" variant="ghost">
                    <LuTrash className="h-4 w-4" />
                    <span className="sr-only">Eliminar</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Auditorio Principal</TableCell>
              <TableCell>mgarcia@empresa.com</TableCell>
              <TableCell>2023-04-20</TableCell>
              <TableCell>14:00</TableCell>
              <TableCell>16:00</TableCell>
              <TableCell>50</TableCell>
              <TableCell>Conferencia</TableCell>
              <TableCell>Conferencia de lanzamiento de producto</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button size="icon" variant="ghost">
                    <LuClipboardEdit className="h-4 w-4" />
                    <span className="sr-only">Editar</span>
                  </Button>
                  <Button className="text-red-500 hover:text-red-600" size="icon" variant="ghost">
                    <LuTrash className="h-4 w-4" />
                    <span className="sr-only">Eliminar</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Sala de Capacitación</TableCell>
              <TableCell>jsmith@empresa.com</TableCell>
              <TableCell>2023-04-25</TableCell>
              <TableCell>08:30</TableCell>
              <TableCell>12:30</TableCell>
              <TableCell>20</TableCell>
              <TableCell>Capacitación</TableCell>
              <TableCell>Capacitación de nuevos empleados</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button size="icon" variant="ghost">
                    <LuClipboardEdit className="h-4 w-4" />
                    <span className="sr-only">Editar</span>
                  </Button>
                  <Button className="text-red-500 hover:text-red-600" size="icon" variant="ghost">
                    <LuTrash className="h-4 w-4" />
                    <span className="sr-only">Eliminar</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

