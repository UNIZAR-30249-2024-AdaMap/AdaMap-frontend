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
import { useUser } from "@/context/user-context";


export function DialogReservaAutomatica({
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

  const { user } = useUser()


  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('form', form)
    
    try {
      const createNewReserva = () => {
        return new Promise((resolve, reject) => {
          (async () => {
            await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/reservas/reservarAutomatica`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.correo}` // Ajusta esto según cómo manejes la autenticación
              },
              body: JSON.stringify({
                tipoUso: form.tipoUso,
                numAsistentes: form.numAsistentes,
                horaInicio: form.horaInicio,
                duracion: form.duracion,
                descripcion: form.descripcion,
                horaInicio: form.horaInicio,
                fecha: form.fecha,
              })
            })
              .then(async(res) => {
                if(res.status === 200)
                  resolve()
                else  
                  reject(await res.text())
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
          return error
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
              Reserva automáticamente sin especificar los espacios.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-1 mt-4">
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
              disabled={!form.duracion || !form.fecha || !form.horaInicio || !form.numAsistentes || !form.tipoUso}
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
