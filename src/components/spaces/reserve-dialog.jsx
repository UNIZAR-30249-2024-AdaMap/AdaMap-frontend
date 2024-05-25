import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { buttonVariants } from '@/components/ui/button'
import { tipoUso } from '@/lib/constants'
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { useSession } from "next-auth/react"
import { useState } from "react"

export function DialogReserva({
  index,
  idEspacio,
  idNombre
}) {

  const [form, setForm] = useState({
    tipoUso: null,
    numAsistentes: null,
    fecha: null,
    duracion: null,
    descripcion: null,
    horaInicio: null,
  });
  
  const setter = ({ key, value }) => setForm({ ...form, [key]: value });
  
  const { data: session } = useSession()
  

  const handleSubmit = (e) => {
    e.preventDefault();
    
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
                espacios: [idEspacio],
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
    <Dialog key={index}>
      <DialogTrigger asChild>
        <Button className={cn(buttonVariants({ variant: 'adaMap' }), 'w-full')}>Reserva</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={e => handleSubmit(e)}>
          <DialogHeader>
            <DialogTitle>{idNombre}</DialogTitle>
            <DialogDescription>Reserva este espacio.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-1">
            <div className="items-center gap-4 space-y-1">
              <Label htmlFor="name" className="text-right">Tipo de uso</Label>
              <Select onValueChange={tipoUso => setter({ key: 'tipoUso', value: tipoUso})}>
                <SelectTrigger >
                  <SelectValue placeholder="Seleciona el tipo de uso" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {tipoUso.map((uso, index) => (
                      <SelectItem
                        key={index}
                        value={uso.value}
                        onSelect={(value) => console.log(value)}
                      >{uso.title}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="items-center gap-4 space-y-1">
              <Label htmlFor="name" className="text-right">Número de asistentes</Label>
              <Input
                type="number"
                id="name"
                placeholder="Número de asistentes"
                onChange={(e) => setter({ key:'numAsistentes', value: e.target.value})}
              />
            </div>
            <div className="items-center gap-4 space-y-1">
              <Label htmlFor="name" className="text-right">Fecha, hora inicio y duración</Label>
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
              <Label htmlFor="name" className="text-right">Descripción</Label>
              <Textarea
                placeholder="Detalles adicionales."
                onChange={(e) => setter({ key: 'descripcion', value: e.target.value })}
              />
            </div>
          </div>
          <DialogClose asChild className="mt-3 w-full">
            <Button type="submit" className={buttonVariants({ variant: 'adaMap' })}
              disabled={!form.duracion || !form.fecha || !form.horaInicio || !form.numAsistentes || !form.tipoUso }
            >Reservar</Button>
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  )
}
