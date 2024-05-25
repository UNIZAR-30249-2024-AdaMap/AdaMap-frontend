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
import { Category, Planta } from '@/lib/constants'


export function DialogFileters({
  form,
  setter,
  setFilteredUrl
}) {

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFilteredUrl(new URLSearchParams(Object.fromEntries(Object.entries(form).filter(([_, value]) => value !== null))).toString())
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={cn(buttonVariants({ variant: 'adaMap' }), 'ml-2 w-full')}>Filtros</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
      <form onSubmit={e => handleSubmit(e)}>
        <div className="grid gap-6">
          <div className="grid grid-cols-1 gap-6">
            <div className="flex flex-col gap-1">
              <Label className="text-sm" htmlFor="spaces">
                Ocupantes máximos
              </Label>
              <div className="flex items-center gap-2">
              <Input 
                type="number" 
                placeholder="Ocupantes máximos" 
                value={form.ocupantes}
                onChange={(e) => {
                  setter({ key: 'ocupantes', value: e.target.value })
                }} />
              
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <Label className="text-sm" htmlFor="category">
                Categoría
              </Label>
              <Select onValueChange={categoriaValue => setter({ key: 'categoria', value: categoriaValue})}>
              <SelectTrigger >
                <SelectValue placeholder={form.categoria || "Seleciona la categoría"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {Category.map((uso, index) => (
                      <SelectItem
                        key={index}
                        value={uso.value}
                      >{uso.title}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1">
              <Label className="text-sm" htmlFor="plant">
                Planta
              </Label>
              <Select onValueChange={plantaValue => setter({ key: 'planta', value: plantaValue})}>
              <SelectTrigger >
                    <SelectValue placeholder={form.planta ? 'Planta ' + form.planta : "Seleciona la planta"}  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {Planta.map((uso, index) => (
                      <SelectItem
                        key={index}
                        value={uso.value}
                      >{uso.title}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
            
          <div className="flex flex-col gap-1">
            <button type="submit" className={cn(buttonVariants({ variant: 'adaMap' }),'w-full')}>Buscar</button>
          </div>
        </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
