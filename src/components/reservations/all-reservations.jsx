'use client'
import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { LuSearch, LuTrash, LuClipboardEdit } from "react-icons/lu"
import { DialogEditReserva } from "@/components/reservations/edit-dialog"
import { useSession } from 'next-auth/react'
import useSWR from 'swr'
import { toast } from 'sonner'
import { mutate } from 'swr'


export function AllReservations({ rol }) {
  const [searchTerm, setSearchTerm] = useState('')

  const { data: session } = useSession()

  const { data: reservasVivas, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/reservas/reservasVivas`, (url) => fetch(url, {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`
    }
  }).then(res => res.json()))


  console.log("reservasVivase", reservasVivas)

  const filteredReservas = Array.isArray(reservasVivas)
    ? reservasVivas.filter(reserva => reserva.persona.nombre.toLowerCase().includes(searchTerm.toLowerCase()))
    : []

  // const filteredReservas = []

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = async (id) => {
    console.log("id", id)
    try {
      const deleteReserva = () => {
        return new Promise((resolve, reject) => {
          (async () => {
            await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/reservas/eliminarReserva/${id}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session?.accessToken}` // Ajusta esto según cómo manejes la autenticación
              }
            })
              .then(() => {
                mutate(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/reservas/reservasVivas`)
                resolve()
              })
              .catch((error) => {
                console.log(error)
                reject(error)
              })
          })()
        })
      }
      toast.promise(deleteReserva, {
        loading: "Cargando",
        success: () =>  "Reserva eliminada con éxito",
        error: (error) => {
          return "Error"
        }
      })

    } catch (error) {
      const { path, message } = JSON.parse(error.message)[0]
      toast.error(path[0] + ': ' + message)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toISOString().split('T')[0]
  }

  if (isLoading) return null

  return (
    <div className="flex flex-col w-full">
      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-t-lg">
        <div className="relative">
          <LuSearch className="absolute left-3 top-3 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            className="w-full bg-white dark:bg-gray-950 shadow-none appearance-none pl-8 pr-4 py-2 rounded-md"
            placeholder="Busca la reserva por usuario"
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
              <TableHead>Espacio/s</TableHead>
              <TableHead>Usuario</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Hora Inicio</TableHead>
              <TableHead>Duración</TableHead>
              <TableHead>Asistentes</TableHead>
              <TableHead>Tipo de Uso</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead className="w-[100px]">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReservas.map((reservation, index) => (
              <TableRow key={index}>
                <TableCell>{reservation.idReserva}</TableCell>
                <TableCell>
                  {reservation.espacios?.map((espacio, idx) => (
                    <div key={idx}>{espacio.nombre}</div>
                  ))}
                </TableCell>
                <TableCell>{reservation.persona.nombre}</TableCell>
                <TableCell>{formatDate(reservation.fecha)}</TableCell>
                <TableCell>{reservation.horaInicio}</TableCell>
                <TableCell>{reservation.duracion} min.</TableCell>
                <TableCell>{reservation.numAsistentes}</TableCell>
                <TableCell>{reservation.tipoUso}</TableCell>
                <TableCell>{reservation.descripcion}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button className="text-red-500 hover:text-red-600" size="icon"
                      variant="ghost" onClick={() => handleDelete(reservation.idReserva)}>
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

