import React from 'react'
import Link from 'next/link'

const About = () => {
  return (
    <div>
    <div className="h-[200px] bg-[#F6F5FF] flex items-center py-16">
        <div className="container md:w-[1170px] mx-auto px-6">
          <h1 className="text-3xl text-center md:text-left font-bold mb-4 md:ml-20">About Us</h1>
          <div className="flex justify-center md:justify-start items-center gap-2 text-sm md:ml-20">
            <Link href="/">Home</Link>
            <span>•</span>
            <Link href="/pages">Pages</Link>
            <span>•</span>
            <span className="text-[#FB2E86]">About Us</span>
          </div>
        </div>
  
      </div>
      <section className='py-16'>
            <div className='flex customsm:flex-col customsm:w-auto  w-[70%] mx-auto gap-x-6  justify-center'>
                <div className='w-[300px] h-[290px] customsm:mx-auto'>
                    <img src="/Group 73.png" alt="" className='w-[300px] h-[250px] smm:h-[200px]' />
                </div>
                <div className='w-[300px]  smm:h-[200px] sm:h-[220px] h-[250px]  relative customsm:mx-auto' >
                    <h1 className='text-[24px] smm:text-[16px] sm:text-[20px]'>Know About Our Ecomerce <br />
                    Business, History</h1>
                    <p className='text-[12px] sm:text-[10px] smm:text-[8px]'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis neque ultrices mattis aliquam, malesuada diam est. Malesuada sem tristique amet erat vitae eget dolor lobortis. Accumsan faucibus vitae lobortis quis bibendum quam.
                    </p>
                    <button className="bg-[#FB2E86] text-white mt-5 smm:text-[2px] sm:w-[55px] w-[60px] h-[25px] sm:h-[22px] sm:text-[2px] text-[8px] rounded-sm absolute" 
                style={{
                //   right: '33%', // Adjust these values based on the image ratio
                //   top: '65%',  // Keeps the button in proportion
                }}>
          <span className='text-[]'>Add to Cart</span>
         </button>
                </div>
            </div>
        </section>  

        <div className="text-center mb-6">
        <h1 className=" text-[24px] font-bold">
          Our Features
        </h1>
      </div>
        {/* Card Container */}
      <div className="flex flex-wrap justify-center gap-6 mx-auto w-[90%] max-w-[1200px]">
        {/* Cards */}
        {[
          { img: '/free_delivery 1.png', title: 'Free Delivery' },
          { img: '/cashback_1.png', title: 'Cashback' },
          { img: '/Group.png', title: 'Premium Quality' },
          { img: '/24_hours_support_ 1.png', title: '24/7 Support' },
        ].map((item, ind) => (
          <div
            key={ind}
            className="shadow-md w-[90%] sm:w-[280px] md:w-[200px] lg:w-[220px] h-auto p-4 text-center bg-white rounded-lg flex flex-col items-center"
          >
            <img
              src={item.img}
              alt={item.title}
              className="w-[50px] h-[55px] mb-4"
            />
            <h2 className="text-[16px] font-semibold text-[#151875] mb-2">
              {item.title}
            </h2>
            <p className="text-[14px] text-[#a4a3a3] leading-5">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa
              purus gravida.
            </p>
          </div>
        ))}
      </div>
      <section className='bg-[#FBFBFF] w-full py-7 my-7'>
            <div className='w-[100%] text-center'>
                <h1 className='text-[24px] font-bold '>Our Client Say!</h1>
            </div>
            <div className='w-[50%]  mx-auto mt-2 '>
                <img src="/Comments_and_ images.png" alt="" className='w-[400px] h-[200px] mx-auto'/>
            </div>
      </section>
    </div>
  )
}

export default About
