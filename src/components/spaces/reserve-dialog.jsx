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
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { buttonVariants } from '@/components/ui/button'
import { tipoUso } from '@/lib/constants'

export function DialogReserva({
  id,
  aforo
}) {
  return (
    <Dialog key={id}>
      <DialogTrigger asChild>
        <Button className={cn(buttonVariants({ variant: 'adaMap' }), 'w-full')}>Reserva</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{id}</DialogTitle>
          <DialogDescription>Reserva este espacio.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="items-center gap-4 space-y-2">
            <Label htmlFor="name" className="text-right">
              Tipo de uso
            </Label>
            <Select>
              <SelectTrigger >
                <SelectValue placeholder="Seleciona el tipo de uso" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {tipoUso.map((uso) => (
                    <SelectItem value={uso.value}>{uso.title}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
