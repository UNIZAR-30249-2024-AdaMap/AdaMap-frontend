import { SpacesGerente } from "@/components/spaces-gerente/spaces-gerente";

const rol = "Gerente"

export default function SpacesGerentePage() {
  return (
    <div className="container px-1 py-20">
      <div className="space-y-2">
        <div className="flex justify-between">
          <h1 className="text-6xl font-bold ">Espacios</h1>
          <p className="text-xl font-light text-gray-500">Rol: {rol}</p>
        </div>
        <p className=" text-gray-500 text-xl font-light">
          Revisa todos los espacios.
        </p>
      </div>
      <div className="mt-10">
        <SpacesGerente/>
      </div>
    </div>
  );
}
