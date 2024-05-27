'use client'

import { ModifyRS } from "@/components/modifyRS/modifyRS";
import { useUser } from "@/context/user-context";

export default function ModifyRSPage() {

  const { user } = useUser()
  const rol = user?.roles.join(', ').toLowerCase();

  return (
    <div className="container px-1 py-20">
      <div className="space-y-2">
        <div className="flex justify-between">
          <h1 className="text-6xl font-bold ">Reservas y espacios</h1>
          <p className="text-xl font-light text-gray-500">Rol: {rol}</p>
        </div>
        <p className=" text-gray-500 text-xl font-light">
          Modifica tus reservas y espacios.
        </p>
      </div>
      <div className="mt-10">
        <ModifyRS />
      </div>
    </div>
  );
}
