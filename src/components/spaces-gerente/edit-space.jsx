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
import { buttonVariants } from '@/components/ui/button'
import { Category, Propietarios, tipoUso } from '@/lib/constants'
import { Textarea } from "@/components/ui/textarea"
import { LuClipboardEdit } from "react-icons/lu"


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
        <span className="sr-only">Modifica el espacio.</span>
      </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={e => handleSubmit(e)}>
          <DialogHeader>
            <DialogTitle>{idNombre}</DialogTitle>
            <DialogDescription>Puedes modificar los siguientes valores.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-1">
            <div className="items-center gap-4 space-y-1">
              <Label htmlFor="name" className="text-right">Categoría</Label>
              <Select>
                <SelectTrigger >
                  <SelectValue placeholder="Seleciona el tipo de uso" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {Category.map((uso, index) => (
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
              <Label htmlFor="name" className="text-right">Propietario</Label>
              <Select>
                <SelectTrigger >
                  <SelectValue placeholder="Seleciona el propietario" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {Propietarios.map((uso, index) => (
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
              <Label htmlFor="name" className="text-right">Reservable</Label>
              <Select>
                <SelectTrigger >
                  <SelectValue placeholder="¿Es reservable?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem
                      value="Si"
                      onSelect={(value) => console.log(value)}
                    >Si</SelectItem>
                    <SelectItem
                      value="No"
                      onSelect={(value) => console.log(value)}
                    >No</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
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
