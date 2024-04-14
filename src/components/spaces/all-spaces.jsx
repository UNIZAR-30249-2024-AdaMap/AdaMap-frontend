import { Button } from "@/components/ui/button";
import { buttonVariants } from '@/components/ui/button';

// Datos simulados de los espacios
const spacesData = [
  { name: "Grand Ballroom", capacity: 500 },
  { name: "Conference Room", capacity: 50 },
  { name: "Outdoor Garden", capacity: 200 },
  { name: "Rooftop Lounge", capacity: 100 }
];

export function AllSpaces() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para manejar el envío de formulario o acción del botón
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {spacesData.map((space, index) => (
        <div key={index} className="flex flex-col rounded-lg border border-gray-200 bg-white overflow-hidden shadow-sm dark:border-gray-800 dark:bg-gray-950">
          <div className="p-4 flex-1">
            <h3 className="font-semibold text-lg">{space.name}</h3>
            <p className="text-sm text-gray-500">Capacity: {space.capacity}</p>
          </div>
          <div className="p-4 border-t border-gray-200 grid gap-2 dark:border-gray-800">
            <Button size="sm">Book</Button>
          </div>
        </div>
      ))}
    </div>
  );
}
