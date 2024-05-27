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
import { Category, Propietarios, tipoUso, Departamentos } from '@/lib/constants'
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
  idNombre
}) {
  const [form, setForm] = useState({ reservable: reservable, categoria: tipoEspacioReserva, dueno: propietarios.departamento ? 'departamento' : propietarios.eina ? 'eina' : propietarios.personas ? 'personas' : null, propietarios: propietarios.propietario})
  const setter = ({ key, value }) => setForm({ ...form, [key]: value })

  const { data: session } = useSession()
  console.log(propietarios)

  // Función para eliminar un comentario
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Editado reservabilidad: ', form.reservable);
    console.log('reservable: ', reservable);
    console.log('categoria: ', tipoEspacioReserva);
    console.log('propietarios: ', propietarios);

    console.log(form)

    try {

      // CAMBIAR RESERVAVILIDAD
      if (reservable !== form.reservable) {
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
                .then(async(res) => {
                  mutate(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/espacios/buscar`)
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

        toast.promise(cambiarReservabilidad, {
          loading: 'cargando...',
          success: () => 'funciona cambiarReservabilidad',
          error: (error) => error
        })
      }

      // Cambiar categoria
      if (tipoEspacioReserva !== form.categoria) {
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
                .then(async(res) => {
                  mutate(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/espacios/buscar`)
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

        toast.promise(cambiarTipoReserva, {
          loading: 'cargando...',
          success: () => 'funciona cambiarTipoReserva',
          error: (error) => error
        })
      }

      console.log(propietarios.propietario, form.propietarios)

      // Cambiar propietario
      if (propietarios.propietario !== form.propietarios || (form.dueno === 'eina' && form.propietarios[0] !== 'EINA')) {
        console.log("ENTRA EN CAMBIAR PROPIETARIO");

        console.log(form.dueno)

        if (form.dueno === "eina") {
          console.log("entrando a eina")
          const cambiarPropietarioEINA = () => {
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
                  .then(async(res) => {
                    mutate(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/espacios/buscar`)
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

          toast.promise(cambiarPropietarioEINA, {
            loading: 'cargando...',
            success: () => 'funciona cambiarTipoReserva',
            error: (error) => error
          })


        }
        else if (form.dueno === 'departamento') {
          const cambiarPropietarioDepartamento = () => {
            return new Promise((resolve, reject) => {
              (async () => {

                console.log("URL ", `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/espacios/edit/${idEspacio}/propietario/departamento/${form.propietarios[0]}`)

                await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/espacios/edit/${idEspacio}/propietario/departamento/${form.propietarios[0]}`, {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session?.accessToken}` // Ajusta esto según cómo manejes la autenticación
                  }
                })
                  .then(async(res) => {
                    mutate(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/espacios/buscar`)
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

          toast.promise(cambiarPropietarioDepartamento, {
            loading: 'cargando...',
            success: () => 'funciona cambiarTipoReserva',
            error: (error) => error
          })
          
        } else {
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
                  body: JSON.stringify(form.propietarios)
                })
                  .then(async(res) => {
                    mutate(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/espacios/buscar`)
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

          toast.promise(cambiarPropietario, {
            loading: 'cargando...',
            success: () => 'funciona cambiarTipoReserva',
            error: (error) => error
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
            {reservable === "Si" &&
              <div className="items-center gap-4 space-y-1">
                <Label htmlFor="name" className="text-right">Categoría</Label>
                <Select onValueChange={categoria => setter({ key: 'categoria', value: categoria })}>
                  <SelectTrigger >
                    <SelectValue placeholder={tipoEspacioReserva.charAt(0) + tipoEspacioReserva.slice(1).toLowerCase()} />
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
                <Label htmlFor="name" className="text-right">Propietarios</Label>
              <Select onValueChange={categoria => setter({ key: 'dueno', value: categoria })
              }>
                  <SelectTrigger >
                    <SelectValue placeholder={propietarios.eina ? 'Eina' : propietarios.departamento ? 'Departamento' : propietarios.personas ? 'Personas' : null} />
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
            
            {form.dueno === 'departamento' &&
            <div className="items-center gap-4 space-y-1">
                <Label htmlFor="name" className="text-right">Departamento</Label>
                <Select onValueChange={categoria => setter({ key: 'propietarios', value: [categoria] })}>
                  <SelectTrigger >
                    <SelectValue placeholder={propietarios.propietario} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {Departamentos.map((uso, index) => (
                        <SelectItem
                          key={index}
                          value={uso.value}
                          onSelect={(value) => console.log(value)}
                        >{uso.title}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>}
            
            {form.dueno === 'personas' &&
            <div className="items-center gap-4 space-y-1">
                <Label htmlFor="name" className="text-right">Personas</Label>
                <Input
                  id="correo"
                  placeholder={form?.propietarios?.join(', ')}
                  type="text"
                  autoCorrect="off"
                  onChange={(e) => {setter({ key: 'propietarios', value: e.target.value.split(",").map(elemento => elemento.trim()) })}}
                />
              </div>}
            
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
          <DialogClose asChild className="mt-3">
            <Button type="submit" className={buttonVariants({ variant: 'adaMap' })}>Guardar</Button>
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  )
}
