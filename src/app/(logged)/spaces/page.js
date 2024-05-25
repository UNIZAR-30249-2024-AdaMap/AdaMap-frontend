'use client'

import { AllSpaces } from "@/components/spaces/all-spaces"
import { useUser } from "@/context/user-context";


export default function SpacesPage() {

  const { user } = useUser()
  const rol = user?.roles.join(', ').toLowerCase();

  return (
    <div className="container px-1 py-20">
      <div className="space-y-2">
        <div className="flex justify-between">
          <h1 className="text-6xl font-bold ">Espacios</h1>
          <p className="text-xl font-light text-gray-500">Rol: {rol}</p>
        </div>
        <p className=" text-gray-500 text-xl font-light">
          Elige el espacio que mejor se adapte a tus necesidades.
        </p>
      </div>
      <div className="mt-10">
        <AllSpaces />
      </div>
    </div>
  );
}
