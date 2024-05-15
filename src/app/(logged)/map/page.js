"use client"

import dynamic from 'next/dynamic'

export default function AdaMapPage() {

  const AdaMap = dynamic(() => import('@/components/map/AdaMap'), {
    loading: () => <p>A map is loading</p>,
    ssr: false
  });


  return (
    <div >
      <AdaMap />
    </div>
  );
}
