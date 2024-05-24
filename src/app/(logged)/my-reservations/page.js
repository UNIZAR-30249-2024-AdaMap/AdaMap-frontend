
'use client'

import { MyReservations } from "@/components/my-reservations/my-reservations"

export default function MyReservationsPage() {

  //const user = JSON.parse(localStorage.getItem('user'))
  //const rol = user?.roles.join(', ').toLowerCase();
  const rol = "admin"

  return (
    <div className="container px-1 py-20">
      <div className="space-y-2">
        <div className="flex justify-between">
          <h1 className="text-6xl font-bold ">Mis reservas</h1>
          <p className="text-xl font-light text-gray-500">Rol: {rol}</p>
        </div>
        <p className=" text-gray-500 text-xl font-light">
          Echale un vistazo a tus reservas.
        </p>
      </div>
      <div className="mt-10">
        <MyReservations/>
      </div>
    </div>
  );
}
