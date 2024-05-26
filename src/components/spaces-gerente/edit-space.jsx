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
import { buttonVariants } from '@/components/ui/button'
import { Category, Propietarios, tipoUso } from '@/lib/constants'
import { Textarea } from "@/components/ui/textarea"
import { LuClipboardEdit } from "react-icons/lu"
import { mutate } from 'swr'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
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
import { cn } from "@/lib/utils";
import { useState } from "react";
import { LuChevronsUpDown, LuCheck } from "react-icons/lu";


export function DialogEditSpace({
  index,
  reservable,
  tipoEspacioReserva,
  propietarios,
  idEspacio,
  idNombre,
  form,
  setter,
}) {
  const [open, setOpen] = useState(false);
  const [selectedSpaces, setSelectedSpaces] = useState([]);

  const { data: session } = useSession()

  // Función para eliminar un comentario
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Editado reservabilidad: ', form.reservable);
    console.log('reservable: ', reservable);
    console.log('categoria: ', tipoEspacioReserva);
    console.log('propietarios: ', propietarios);

    try {

      // CAMBIAR RESERVAVILIDAD
      if (reservable !== form.reservable && form.reservable !== null) {
        console.log("ENTRAN EN CAMBIAR CATEGORIAERVABILIDAD");
        console.log(form.reservable)
        console.log(reservable !== null)

        const cambiarReservabilidad = () => {
          return new Promise((resolve, reject) => {
            (async () => {

              console.log("URL ", `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/espacios/edit/${idEspacio}/reservabilidad`)

              await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/espacios/edit/${idEspacio}/reservabilidad`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${session?.accessToken}` // Ajusta esto según cómo manejes la autenticación
                }
              })
                .then(() => {
                  mutate(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/espacios/buscar?`)
                  resolve()
                })
                .catch((error) => {
                  console.log(error)
                  reject(error)
                })
            })()
          })
        }

        toast.promise(cambiarReservabilidad, {
          loading: 'cargando...',
          success: () => 'funciona cambiarReservabilidad',
          error: (error) => JSON.stringify(error)
        })
      }

      // Cambiar categoria
      if (tipoEspacioReserva !== form.categoria && form.categoria !== null) {
        console.log("ENTRAN EN CAMBIAR CATEGORIA");
        const cambiarTipoReserva = () => {
          return new Promise((resolve, reject) => {
            (async () => {

              console.log("URL ", `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/espacios/edit/${idEspacio}/categoria/${form.categoria}`)

              await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/espacios/edit/${idEspacio}/categoria/${form.categoria}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${session?.accessToken}` // Ajusta esto según cómo manejes la autenticación
                }
              })
                .then(() => {
                  mutate(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/espacios/buscar?`)
                  resolve()
                })
                .catch((error) => {
                  console.log(error)
                  reject(error)
                })
            })()
          })
        }

        toast.promise(cambiarTipoReserva, {
          loading: 'cargando...',
          success: () => 'funciona cambiarTipoReserva',
          error: (error) => JSON.stringify(error)
        })
      }

      // Cambiar propietario
      if (propietarios.sort().join('') !== selectedSpaces.sort().join('')) {
        console.log("ENTRA EN CAMBIAR PROPIETARIO");
        console.log("selectedSpaces", selectedSpaces)
        console.log("selectedSpaces", selectedSpaces[0])

        if (selectedSpaces[0] === "EINA") {
          console.log("entrando a eina")
          const cambiarPropietario = () => {
            return new Promise((resolve, reject) => {
              (async () => {

                console.log("URL ", `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/espacios/edit/${idEspacio}/propietario/EINA`)

                await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/espacios/edit/${idEspacio}/propietario/EINA`, {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session?.accessToken}` // Ajusta esto según cómo manejes la autenticación
                  }
                })
                  .then(() => {
                    mutate(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/espacios/buscar?`)
                    resolve()
                  })
                  .catch((error) => {
                    console.log(error)
                    reject(error)
                  })
              })()
            })
          }

          toast.promise(cambiarPropietario, {
            loading: 'cargando...',
            success: () => 'funciona cambiarTipoReserva',
            error: (error) => JSON.stringify(error)
          })


        }
        else if (selectedSpaces[0] === "DIIS" || selectedSpaces[0] === "DIEC") {
          const cambiarPropietario = () => {
            return new Promise((resolve, reject) => {
              (async () => {

                console.log("URL ", `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/espacios/edit/${idEspacio}/propietario/departamento/${selectedSpaces[0]}`)

                await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/espacios/edit/${idEspacio}/propietario/departamento/${selectedSpaces[0]}`, {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session?.accessToken}` // Ajusta esto según cómo manejes la autenticación
                  }
                })
                  .then(() => {
                    mutate(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/espacios/buscar?`)
                    resolve()
                  })
                  .catch((error) => {
                    console.log(error)
                    reject(error)
                  })
              })()
            })
          }

          toast.promise(cambiarPropietario, {
            loading: 'cargando...',
            success: () => 'funciona cambiarTipoReserva',
            error: (error) => JSON.stringify(error)
          })
          
        } else if (selectedSpaces.includes('Investigador contratado') || selectedSpaces.includes('Docente investigador') ){
          const cambiarPropietario = () => {
            return new Promise((resolve, reject) => {
              (async () => {

                console.log("URL ", `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/espacios/edit/${idEspacio}/propietario/personas`)

                await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/espacios/edit/${idEspacio}/propietario/personas`, {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session?.accessToken}` // Ajusta esto según cómo manejes la autenticación
                  },
                  body: JSON.stringify(selectedSpaces)
                })
                  .then(() => {
                    mutate(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/espacios/buscar?`)
                    resolve()
                  })
                  .catch((error) => {
                    console.log(error)
                    reject(error)
                  })
              })()
            })
          }

          toast.promise(cambiarPropietario, {
            loading: 'cargando...',
            success: () => 'funciona cambiarTipoReserva',
            error: (error) => JSON.stringify(error)
          })
        }
      }


      e.target.reset()
    } catch (error) {
      const { path, message } = JSON.parse(error.message)[0]
      console.log(error)
      toast.error(path[0] + ': ' + message)
    }
  }

  const toggleSelection = (title) => {
    console.log(title)
    setSelectedSpaces(prev => {
      const currentIndex = prev.indexOf(title);
      if (currentIndex === -1) {
        return [...prev, title];
      } else {
        return prev.filter((item) => item !== title);
      }
    });
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
            {reservable === "Sí" &&
              <div className="items-center gap-4 space-y-1">
                <Label htmlFor="name" className="text-right">Categoría</Label>
                <Select onValueChange={categoria => setter({ key: 'categoria', value: categoria })}>
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
            }

            <div className="items-center gap-4 space-y-1">
              <Popover
                className="w-full mx-auto"
                open={open}
                onOpenChange={setOpen}
              >
                <div className="flex flex-col space-y-2 w-full">
                  <Label>Propietarios</Label>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                    >
                      <div className="flex justify-between space-x-20 items-center text-sm overflow-hidden">
                        <p className="font-light opacity-75">
                          Selecciona los propietarios
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
                          {Propietarios?.map((uso, index) => (
                            <Button
                              variant="adaMap"
                              key={index}
                              onClick={() => toggleSelection(uso.title)}
                              className={cn(
                                "w-full text-sm",
                                selectedSpaces.includes(uso.title)
                                  ? "bg-custom-AdaMapBlue text-white"
                                  : "bg-gray-200 text-black"
                              )}
                            >
                              {uso.title}
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
              <Label htmlFor="name" className="text-right">Reservable</Label>
              <Select onValueChange={reservable => setter({ key: 'reservable', value: reservable })}>
                <SelectTrigger >
                  <SelectValue placeholder={reservable} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem
                      value="Si"
                    >Si</SelectItem>
                    <SelectItem
                      value="No"
                    >No</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogClose className="mt-3">
            <Button type="submit" className={buttonVariants({ variant: 'adaMap' })}>Guardar</Button>
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  )
}
