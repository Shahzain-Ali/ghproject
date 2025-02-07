import React from 'react'
import Image from 'next/image'

const Loader = () => {
  return (
    <div className='fixed top-0 left-0 w-full min-h-screen z-50 bg-white p-10 flex items-center justify-center'>
        <div className='relative w-24 h-24 flex items-center justify-center' >
        <div className='absolute inset-0 rounded-full border-2 border-dotted border-gray-800 animate-spin-slow'  />
           <Image src="/loader.png" alt='loaderImage' width={200} height={200} className='w-32 h-32 object-cover'/>
           
        </div>
    </div>
  )
}

export default Loader