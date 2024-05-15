"use client"

import dynamic from 'next/dynamic'
import React from 'react'

export default function AdaMapPage() {

  const AdaMap = dynamic(() => import('@/components/map/AdaMap'), {
    loading: () => <p>A map is loading</p>,
    ssr: false
  });


  return (
    <div className=''>
      <AdaMap />
    </div>
  );
}
