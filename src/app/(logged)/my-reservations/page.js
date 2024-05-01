
import { MyReservations } from "@/components/my-reservations/my-reservations"

const rol = "Gerente"

export default function MyReservationsPage() {
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
