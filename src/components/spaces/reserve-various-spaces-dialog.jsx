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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { useState } from 'react'
import { LuChevronsUpDown, LuCheck } from "react-icons/lu"

const nombresEspacios = [
  { title: 'Aula 101' },
  { title: 'Aula 102' },
  { title: 'Laboratorio de Química' },
  { title: 'Laboratorio de Física' },
  { title: 'Sala de Seminarios 1' },
  { title: 'Sala de Seminarios 2' },
  { title: 'Sala Común de Estudiantes' },
  { title: 'Sala Común de Profesores' },
];

export function DialogReservaVariosEspacios({
}) {


  const handleSubmit = async (e) => {
    console.log('Reserva hecha');
  };

  const [selectedSpaces, setSelectedSpaces] = useState([]);
  const [open, setOpen] = useState(false);

  console.log(selectedSpaces);

  const toggleSelection = (title) => {
    setSelectedSpaces(prev => {
      const currentIndex = prev.indexOf(title);
      if (currentIndex === -1) {
        return [...prev, title];
      } else {
        return prev.filter(item => item !== title);
      }
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={cn(buttonVariants({ variant: 'adaMap' }), 'ml-4 px-7')}>
          Reservar varios espacios
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={e => handleSubmit(e)}>
          <DialogHeader>
            <DialogTitle>Selecciona varios espacios</DialogTitle>
            <DialogDescription>Reserva más de un espacio si desea.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-1 mt-4">
            <div className="items-center gap-4 space-y-1">
              <Popover className='w-full mx-auto' open={open} onOpenChange={setOpen} >
                <div className='flex flex-col space-y-2 w-full'>
                  <Label>Espacios</Label>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                    >
                      <div className='flex justify-between space-x-20 items-center text-sm'>
                        <p className="font-light opacity-75">Selecciona los espacios que desea reservar</p>
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
                          {nombresEspacios.map((espacio) => (
                            <Button
                              variant="adaMap"
                              key={espacio.title}
                              onClick={() => toggleSelection(espacio.title)}
                              className={cn(
                                'w-full text-sm',
                                selectedSpaces.includes(espacio.title) ? 'bg-custom-AdaMapBlue text-white' : 'bg-gray-200 text-black'
                              )}
                            >
                              {espacio.title}
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
              <Label htmlFor="name" >Tipo de uso</Label>
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
              <Label htmlFor="name" >Número de asistentes</Label>
              <Input
                type="number"
                id="name"
                placeholder="Número de asistentes"
                onChange={(e) => console.log(e.target.value)}
              />
            </div>
            <div className="items-center gap-4 space-y-1">
              <Label htmlFor="name" >Fecha, hora inicio y hora fin</Label>
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
              <Label htmlFor="name" >Descripción</Label>
              <Textarea
                placeholder="Detalles adicionales."
                onChange={(e) => console.log(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter className="mt-3">
            <Button type="submit" className={buttonVariants({ variant: 'adaMap' })}>Reservar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog >
  )
}
