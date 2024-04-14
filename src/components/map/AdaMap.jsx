'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Category, Planta } from '@/lib/constants'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function AdaMap() {
  const [selectedFloor, setSelectedFloor] = useState('PRIMERA PLANTA');
  const [selectedSpace, setSelectedSpace] = useState(null);

  // Replace with actual data
  const spaces = [
    { id: 'Laboratorio 1.02', type: 'Laboratorio', details: 'Some details...' },
  ];

  const selectSpace = (space) => {
    setSelectedSpace(space);
  };

  return (
    <div className="">
      <div className="flex flex-col lg:flex-row justify-between p-4">
        <div className="lg:w-1/4 mb-4 lg:mb-0 flex flex-col space-y-2">
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
          <div className="flex flex-col rounded-lg border overflow-hidden shadow-sm p-4 "> 
            {Category.map((category, index) => (
              <p key={index}>
                {category.title}
              </p>
            ))}
          </div>
          <div className="flex flex-col rounded-lg border overflow-hidden shadow-sm p-4"> 
            {selectedSpace ? (
              <>
                <h2 className="font-bold text-xl mb-2">{selectedSpace.id}</h2>
                <p className="text-gray-700">{selectedSpace.details}</p>
              </>
            ) : (
              <p className="text-gray-700">Selecciona un espacio para mostrar su información.</p>
            )}
          </div>
        </div>
        
        <div className="w-1/2">
          <Image src="/assets/logoLABIS.png" alt="Map" layout="responsive" width="200" height="200" />
        </div>
      </div>
    </div>
  );
}
