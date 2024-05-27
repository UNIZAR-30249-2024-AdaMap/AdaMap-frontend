'use client'

import Image from "next/image";
import Link from 'next/link'
import { NavBarItems } from '@/lib/constants'
import { signOut } from "next-auth/react"
import { useUser } from "@/context/user-context"
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Separator } from "./ui/separator";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { toast } from "sonner";

export default function Layout() {

  const { user } = useUser()
  const esGerente = user?.roles.includes('GERENTE');

  const { data: notificaciones, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/reservas/notificaciones`, (url) => fetch(url, {
    headers: {
      Authorization: `Bearer ${user.correo}`
    }
  }).then(res => res.json()))

  console.log(notificaciones)

  const [isModalOpen, setIsModalOpen] = useState(true);

  const closeModal = () => {
    try {
      const deleteNotificaciones = () => {
        return new Promise((resolve, reject) => {
          (async () => {
            await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/reservas/notificaciones`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.correo}` // Ajusta esto según cómo manejes la autenticación
              }
            })
              .then(() => {
                setIsModalOpen(false);
                resolve()
              })
              .catch((error) => {
                console.log(error)
                reject(error)
              })
          })()
        })
      }

      toast.promise(deleteNotificaciones, {
        loading: "Cargando",
        success: () => "Notificaciones eliminadas",
        error: (error) => {
          return "Error"
        }
      })
    } catch (error) {
      const { path, message } = JSON.parse(error.message)[0]
      toast.error(path[0] + ': ' + message)
    }
    // poner toast con datos actualizados
  };

  if (isLoading) return null
  return (
    <>
      { notificaciones && notificaciones.length !== 0 && isModalOpen &&
        <div className="fixed  inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-[80%]">
            <h2 className="text-xl font-semibold mb-4">Notificaciones</h2>
            <div className="max-h-72 w-full rounded-md border flex flex-col gap-2 overflow-scroll">
              {notificaciones.map((tag, index) => (
                <>
                      <Card key={index}>
                        <CardHeader>
                          <CardTitle> Mensaje nuevo</CardTitle>
                          <CardDescription>{tag}</CardDescription>
                        </CardHeader>
                      </Card>
                </>
              ))}
            </div>
            
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-red-500 text-white rounded-md w-full"
            >
              Eliminar notificaciones
            </button>
          </div>
        </div>
      }
      <div className="bg-custom-AdaMapBlue p-4 w-full fixed z-50">
        <div className="mx-auto flex items-center justify-between w-full">
          <Link href={'/spaces'}>
            <div className="flex items-center space-x-1 ml-0 md:ml-5">
              <Image
                className="h-16 w-16"
                src="/assets/logoLABIS.png"
                alt="AdaMap logo"
                width={100}
                height={100}
                priority={true}
              />
              <span className="text-2xl font-bold hidden sm:block">AdaMap</span>
            </div>
          </Link>
          <div className="flex items-center space-x-4 mr-0 md:mr-5">
            <div className="flex items-center space-x-2">
              {NavBarItems.map((item, index) => (
                (esGerente || index !== 0) && (
                  <Link key={item.href} href={item.href}>
                    <h1 className="text-lg font-bold md:text-md hover:text-custom-AdaMapBlueDark mr-9">{item.title}</h1>
                  </Link>
                )
              ))}
            </div>
            <button
              onClick={() => {
                signOut({ callbackUrl: "/" });
                localStorage.removeItem('user')
              }}
              className="cursor-pointer text-white bg-custom-AdaMapBlueDark p-2 rounded-lg hover:bg-custom-AdaMapBlueLight hover:text-black"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
        </div>
      </>
  )
}

