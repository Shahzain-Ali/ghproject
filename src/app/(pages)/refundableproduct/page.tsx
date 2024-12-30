import React from 'react'
import Image from 'next/image'
import Link from 'next/link'


const RefundableProduct = () => {
  return (
    <div>
         <div className="h-[200px] bg-[#F6F5FF] flex items-center py-16 w-[100%px]">
          <div className=" md:w-[1170px] ml-[82px]  customsm:mx-auto smm:mx-auto sm:ml-[18px] md:ml-[60px] customsm:w-[200px]">
            <h1 className="text-3xl  md:text-left font-bold mb-4  customsm:text-[18px]inline-block">
              404 Not Found
            </h1>
            <div className="flex md:justify-start items-center gap-2 text-sm  md:ml-0 customsm:w-[250px] ">
              <Link href="/">Home</Link>
              <span>•</span>
              <Link href="/pages">Pages</Link>
              <span>•</span>
              <span className="text-[#FB2E86]">404 Not Found</span>
            </div>
          </div>
        </div>


        <section className='p-8'>
            <Image src='/NotFound.png' alt='' width={500} height={100} className='h-80 mx-auto'></Image>
            <div className='mx-auto  w-[20%] my-4'>
                <button className='bg-[#FB2E86] rounded-md w-[100%] h-12 border text-white'><a href="/home">Back To Home</a></button>
            </div>
        </section>

        <section className='my-6'>
                    <Image src="/Group_124 (2).png" alt='' width={950} height={50} className='mx-auto'></Image>
        </section>
    </div>
  )
}

export default RefundableProduct
