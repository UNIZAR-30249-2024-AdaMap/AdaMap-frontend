/******************************************************************************************
 * Nombre del Proyecto: AdaMap              *
 * Frontend: AdaMap                          *
 * Asignatura: Laboratorio de Ingeniería de Software *
 ******************************************************************************************/
import { Filters } from "@/components/filters/filters"

const rol = "Gerente"

export default function FiltersPage() {
  return (
    <div className="container px-1 py-20">
      <div className="space-y-2">
        <div className="flex justify-between">
          <h1 className="text-6xl font-bold ">Buscar & Filtrar</h1>
          <p className="text-xl font-light text-gray-500">Rol: {rol}</p>
        </div>
        <p className=" text-gray-500 text-xl font-light">
          Elige el espacio que mejor se adapte a tus necesidades.
        </p>
      </div>
      <div className="mt-10">
        <Filters />
      </div>
    </div>
  );
}
