import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { tipoUso } from "@/lib/constants";
import { Textarea } from "@/components/ui/textarea";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { LuChevronsUpDown, LuCheck } from "react-icons/lu";
import { toast } from "sonner";
import { useSession } from 'next-auth/react'


export function DialogReservaAutomatica({
  filteredSpaces,
  setFilteredUrl,
}) {
  //console.log(filteredSpaces);

  const [form, setForm] = useState({
    tipoUso: null,
    numAsistentes: null,
    fecha: null,
    duracion: null,
    descripcion: null,
    horaInicio: null,
  });
  const setter = ({ key, value }) => setForm({ ...form, [key]: value });

  const [selectedSpaces, setSelectedSpaces] = useState([]);
  const [open, setOpen] = useState(false);

  const { data: session } = useSession()

  
  //console.log(selectedSpaces);

  const toggleSelection = (title) => {
    setSelectedSpaces(prev => {
      const currentIndex = prev.indexOf(title);
      if (currentIndex === -1) {
        return [...prev, title];
      } else {
        return prev.filter((item) => item !== title);
      }
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('selectedSpaces', selectedSpaces)
    console.log('form', form)
    
    try {
      const createNewReserva = () => {
        return new Promise((resolve, reject) => {
          (async () => {
            await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/reservas/reservar`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session?.accessToken}` // Ajusta esto según cómo manejes la autenticación
              },
              body: JSON.stringify({
                espacios: selectedSpaces,
                tipoUso: form.tipoUso,
                numAsistentes: form.numAsistentes,
                horaInicio: form.horaInicio,
                duracion: form.duracion,
                descripcion: form.descripcion,
                horaInicio: form.horaInicio,
                fecha: form.fecha,
              })
            })
              .then(() => {
                resolve()
              })
              .catch((error) => {
                console.log(error)
                reject(error)
              })
          })()
        })
      }

      toast.promise(createNewReserva, {
        loading: "Cargando",
        success: () => "Reserva realizada con éxito",
        error: (error) => {
          return "Error"
        }
      })
      e.target.reset()
    } catch (error) {
      const { path, message } = JSON.parse(error.message)[0]
      toast.error(path[0] + ': ' + message)
    }
    // poner toast con datos actualizados
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={cn(buttonVariants({ variant: "adaMap" }), "ml-4 px-7")}
        >
          Reserva automática
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <form onSubmit={(e) => {
          handleSubmit(e)
        }
        }>
          <DialogHeader>
            <DialogTitle>Selecciona varios espacios</DialogTitle>
            <DialogDescription>
              Reserva más de un espacio si desea.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-1 mt-4">
            <div className="items-center gap-4 space-y-1">
              <Popover
                className="w-full mx-auto"
                open={open}
                onOpenChange={setOpen}
              >
                <div className="flex flex-col space-y-2 w-full">
                  <Label>Espacios</Label>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                    >
                      <div className="flex justify-between space-x-20 items-center text-sm overflow-hidden">
                        <p className="font-light opacity-75">
                          Selecciona los espacios que desea reservar
                        </p>
                        <LuChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
                      </div>
                    </Button>
                  </PopoverTrigger>
                </div>
                <PopoverContent className="w-full" align="center">
                  <Command>
                    <CommandList>
                      <CommandGroup>
                        <div className="flex flex-col items-center gap-2">
                          {filteredSpaces?.map((espacio) => (
                            <Button
                              variant="adaMap"
                              key={espacio.nombre}
                              onClick={() => toggleSelection(espacio.idEspacio)}
                              className={cn(
                                "w-full text-sm",
                                selectedSpaces.includes(espacio.idEspacio)
                                  ? "bg-custom-AdaMapBlue text-white"
                                  : "bg-gray-200 text-black"
                              )}
                            >
                              {espacio.nombre}
                            </Button>
                          ))}
                        </div>
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <div className="items-center gap-4 space-y-1">
              <Label htmlFor="name">Tipo de uso</Label>
              <Select onValueChange={tipoUso => setter({ key: 'tipoUso', value: tipoUso})}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleciona el tipo de uso" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {tipoUso.map((uso, index) => (
                      <SelectItem
                        key={index}
                        value={uso.value}
                        // onSelect={(value) =>  console.log(value)}
                      >
                        {uso.title}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="items-center gap-4 space-y-1">
              <Label htmlFor="name">Número de asistentes</Label>
              <Input
                type="number"
                id="name"
                placeholder="Número de asistentes"
                onChange={(e) => setter({ key:'numAsistentes', value: e.target.value})}
              />
            </div>
            <div className="items-center gap-4 space-y-1">
              <Label htmlFor="name">Fecha, hora inicio y duración</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="date"
                  id="name"
                  placeholder="Fecha"
                  className="flex-1"
                  onChange={(e) => setter({ key:'fecha', value: new Date(e.target.value)})}
                />
                <Input
                  type="time"
                  id="name"
                  placeholder="Hora de inicio"
                  className="w-28"
                  onChange={(e) => setter({ key:'horaInicio', value: e.target.value})}
                />
                <Input
                  type="number"
                  id="duracion"
                  placeholder="Duración"
                  className="w-28"
                  onChange={(e) => setter({ key:'duracion', value: e.target.value})}
                />
              </div>
            </div>
            <div className="items-center gap-4 space-y-1">
              <Label htmlFor="name">Descripción</Label>
              <Textarea
                placeholder="Detalles adicionales."
                onChange={(e) => setter({ key: 'descripcion', value: e.target.value })}
              />
            </div>
          </div>
          <DialogClose asChild className="mt-3 w-full">
            <Button
              type="submit"
              disabled={!form.duracion || !form.fecha || !form.horaInicio || !form.numAsistentes || !form.tipoUso || selectedSpaces.length === 0}
              className={buttonVariants({ variant: "adaMap" })}
            >
              Reservar
            </Button>
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  );
}
