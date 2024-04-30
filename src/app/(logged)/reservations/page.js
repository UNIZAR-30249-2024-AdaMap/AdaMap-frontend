import { AllReservations } from "@/components/reservations/all-reservations"

export default function ReservationsPage() {
  return (
    <div className="container px-1 py-20">
      <div className="space-y-2">
        <h1 className="text-6xl font-bold ">Reservas</h1>
        <p className=" text-gray-500 text-xl font-light">
          Listado con las reservas realizadas hasta le momento.
        </p>
      </div>
      <div className="mt-10">
        <AllReservations />
      </div>
    </div>
  );
}
