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


export function NotiReservation({
  index,
  idNombre,
}) {

  const handleSubmit = async (e) => {
    console.log('Reserva hecha');
  };
  
  return (
    <Dialog>
      <DialogTrigger asChild>
      <Button className={cn(buttonVariants({ variant: 'adaMap' }), 'w-full')}>Message</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={e => handleSubmit(e)}>
          <DialogHeader>
            <DialogTitle>¡Reservas modificadas!</DialogTitle>
            <DialogDescription>Tu reserva con ID: {idNombre} se le ha modificado el horario.</DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-3">
            <Button type="submit" className={buttonVariants({ variant: 'adaMap' })}>Recibido</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
