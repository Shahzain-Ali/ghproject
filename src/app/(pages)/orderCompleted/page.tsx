import React from 'react'
import Link from 'next/link'


const OrderCompleted = () => {
  return (
    <div>
       <div className="h-[200px] bg-[#F6F5FF] flex items-center py-16">
          <div className=" md:w-[1170px] ml-[82px]  customsm:mx-auto smm:mx-auto sm:ml-[18px] md:ml-[60px] customsm:w-[200px]">
            <h1 className="text-3xl  md:text-left font-bold mb-4  customsm:text-[18px]inline-block">
              Order Completed
            </h1>
            <div className="flex md:justify-start items-center gap-2 text-sm  md:ml-0 customsm:w-[250px] ">
              <Link href="/">Home</Link>
              <span>•</span>
              <Link href="/pages">Pages</Link>
              <span>•</span>
              <span className="text-[#FB2E86]">Order Completed</span>
            </div>
          </div>
        </div>

        <section className='  h-[500px] flex flex-col justify-center items-center'>
          <div className=' h-[400px] w-[80%] flex flex-col justify-center'>
             <div className='border-l-2 border-b-2 border-dotted border-[#D2D1D1] text-center w-[80%] mx-auto  '>
                <div className=' flex '>
                <img src="/clock_1.png" alt="" className='w-[70px] h-[70px] mx-[-35px] ' />
                    <img src="/Vector_15.png" alt="" className='mx-auto w-[50px] h-[50px] ' />
                </div>
                <h1 className="text-3xl customsm:text-[18px] smm:text-[20px]  md:text-left font-bold mb-4 md:ml-20 mt-4">
                Your Order Is Completed! 
                </h1>
                <p className='text-[#8D92A7] customsm:text-[12px] smm:text-[12px]'>
                Thank you for your order! Your order is being processed and will be completed within 3-6 <br />
                 &nbsp; hours. You will receive an email confirmation when your order is completed.

                </p>
                <button className='w-[180px] h-[50px] customsm:w-[120px] customsm:h-[30px] customsm:text-[10px] customsm:p-1 smm:w-[150px] smm:h-[40px] smm:text-[12px] smm:p-2 bg-[#FF1788] p-4 text-[#ffff] rounded-sm mt-4 mb-8'>Continue Shopping</button>
             </div>
            </div>
            <div>
                <img src="/Group_124 (2).png" alt="" />
            </div>
        </section>
    </div>
  )
}

export default OrderCompleted
