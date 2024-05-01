'use client'
import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { LuSearch, LuTrash, LuClipboardEdit } from "react-icons/lu"
import { NotiReservation } from "@/components/my-reservations/noti-reservations"

const reservationsData = [
  {
    id: "1",
    nombre: "Sala de Juntas 1",
    usuario: "jdoe@empresa.com",
    fecha: "2023-04-15",
    horaInicio: "09:00",
    horaFin: "11:00",
    aforo: "10",
    tipoUso: "Reunión",
    descripcion: "Reunión del equipo de ventas"
  },
  {
    id: "2",
    nombre: "Auditorio Principal",
    usuario: "mgarcia@empres.com",
    fecha: "2023-04-20",
    horaInicio: "14:00",
    horaFin: "16:00",
    aforo: "50",
    tipoUso: "Conferencia",
    descripcion: "Conferencia de lanzamiento de producto"
  },
  {
    id: "3",
    nombre: "Sala de Capacitación",
    usuario: "jsmith@empresa.com",
    fecha: "2023-04-25",
    horaInicio: "08:30",
    horaFin: "12:30",
    aforo: "20",
    tipoUso: "Capacitación",
    descripcion: "Capacitación de nuevos empleados"
  }
]

export function MyReservations() {
  const [searchTerm, setSearchTerm] = useState('')


  const filteredSpaces = reservationsData.filter(reservationsData => {
    return reservationsData.nombre.toLowerCase().includes(searchTerm.toLowerCase())
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
            placeholder="Busca la reserva por espacios"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div className="border rounded-b-lg overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
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
            {filteredSpaces.map((reservation, index) => (
                <TableRow key={index}>
                  <TableCell>{reservation.id}</TableCell>
                  <TableCell>{reservation.nombre}</TableCell>
                  <TableCell>{reservation.usuario}</TableCell>
                  <TableCell>{reservation.fecha}</TableCell>
                  <TableCell>{reservation.horaInicio}</TableCell>
                  <TableCell>{reservation.horaFin}</TableCell>
                  <TableCell>{reservation.aforo}</TableCell>
                  <TableCell>{reservation.tipoUso}</TableCell>
                  <TableCell>{reservation.descripcion}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                    (<NotiReservation index={index} idNombre={reservation.id}/>) {/* Delete this */}
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

