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
import { mutate } from 'swr'


export function DialogEditSpace({
  index,
  reservable,
  tipoEspacioReserva,
  idEspacio,
  idNombre,
  form,
  setter,
  setReservabilidad,
  setIdEspacioBorrar
}) {

  const handleSubmit = async (e,id) => {
    e.preventDefault();
    // console.log('Editado reservabilidad: ', form.reservable);
    // setIdEspacioBorrar(idEspacio)
    // setReservabilidad(form.reservable)
    console.log("id", id)

    try {
      const deleteReserva = () => {
        return new Promise((resolve, reject) => {
          (async () => {
            
            console.log("URL ", `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/espacios/edit/` + id 
            + "/reservabilidad" + form.reservable.replace(/(Si|No)/, ''));

            await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/espacios/edit/` + id 
            + "/reservabilidad" + form.reservable.replace(/(Si|No)/, ''), {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session?.accessToken}` // Ajusta esto según cómo manejes la autenticación
              }
            })
              .then(() => {
                mutate(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/espacios/edit/` + id + "/reservabilidad")
                resolve()
              })
              .catch((error) => {
                console.log(error)
                reject(error)
              })
          })()
        })
      }
      // toast.promise(deleteReserva, {
      //   loading: "Cargando",
      //   success: () =>  "Reserva eliminada con éxito",
      //   error: (error) => {
      //     return "Error"
      //   }
      // })

    } catch (error) {
      const { path, message } = JSON.parse(error.message)[0]
      // toast.error(path[0] + ': ' + message)
      console.log(error)
    }
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
        <form onSubmit={e => handleSubmit(e, idEspacio)}>
          <DialogHeader>
            <DialogTitle>{idNombre}</DialogTitle>
            <DialogDescription>Puedes modificar los siguientes valores.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-1">
            <div className="items-center gap-4 space-y-1">
              <Label htmlFor="name" className="text-right">Categoría</Label>
              <Select>
                <SelectTrigger >
                  <SelectValue placeholder={tipoEspacioReserva} />
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
              <Select onValueChange={reservable => setter({ key: 'reservable', value: reservable })}>
                <SelectTrigger >
                  <SelectValue placeholder={reservable} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem
                      value="Si"
                      // onSelect={(value) => console.log(value)}
                    >Si</SelectItem>
                    <SelectItem
                      value="No"
                      // onSelect={(value) => console.log(value)}
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
