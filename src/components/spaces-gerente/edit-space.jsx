import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import { LuSearch, LuTrash, LuClipboardEdit } from "react-icons/lu"


export function DialogEditSpace({
  index,
  idNombre,
}) {

  const handleSubmit = async (e) => {
    console.log('Reserva hecha');
  };
  
  return (
    <Dialog key={index}>
      <DialogTrigger asChild>
      <Button size="icon" variant="ghost">
        <LuClipboardEdit className="h-4 w-4" />
        <span className="sr-only">Editar</span>
      </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={e => handleSubmit(e)}>
          <DialogHeader>
            <DialogTitle>{idNombre}</DialogTitle>
            <DialogDescription>Edición del espacio.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-1">
          <div className="items-center gap-4 space-y-1">
              <Label htmlFor="name" className="text-right">Fecha, hora inicio y hora fin</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="date"
                  id="name"
                  placeholder="Fecha"
                  className="flex-1"
                  onChange={(e) => console.log(e.target.value)}
                />
                <Input
                  type="time"
                  id="name"
                  placeholder="Hora de inicio"
                  className="w-28"
                  onChange={(e) => console.log(e.target.value)}
                />
                <Input
                  type="time"
                  id="name"
                  placeholder="Hora de fin"
                  className="w-28"
                  onChange={(e) => console.log(e.target.value)}
                />
              </div>
            </div>
            
            <div className="items-center gap-4 space-y-1">
              <Label htmlFor="name" className="text-right">Número de asistentes</Label>
              <Input
                type="number"
                id="name"
                placeholder="Aforo máximo"
                onChange={(e) => console.log(e.target.value)}
              />
            </div>
            <div className="items-center gap-4 space-y-1">
              <Label htmlFor="name" className="text-right">Tipo de uso</Label>
              <Select>
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
              <Label htmlFor="name" className="text-right">Descripción</Label>
              <Textarea
                placeholder="Detalles adicionales."
                onChange={(e) => console.log(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter className="mt-3">
            <Button type="submit" className={buttonVariants({ variant: 'adaMap' })}>Guardar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
