import React from 'react'

const LeatestProducts = () => {
  return (
    <div className='mb-6'>
          <div className="max-w-6xl mx-auto  items-center gap-10 px-6 w-[90%] md:flex-nowrap sm:flex-col">
        {/* Left Content */}
        <div className=" w-[80%] mx-auto text-center ">
          <h2 className="text-[#151875] text-3xl font-bold mb-4 ">
                Leatest Products
          </h2>
        <div className="w-auto  text-center">
          <ul className="flex  space-x-3 text-sm text-gray-500 mb-6  mx-auto w-auto justify-center text-center">
            <li className=" hover:text-[#FB2E86] hover:border hover:border-b-[#FB2E86] ">New Arrival</li>
            <li className="">Best Seller</li>
            <li className="">Featured</li>
            <li className="">Offer</li>
          </ul>
        </div>
        </div>
        </div>
        <div className="flex flex-wrap justify-center gap-6 mx-auto md:w-[85%] lg:w-[70%] w-full max-w-[1200px]">
        {/* Cards */}
        {[
          { img: '/image_1171 (7).png', title: 'Free Delivery' },
          { img: '/image_1171 (2).png', title: 'Cashback' },
          { img: '/image_1171 (8).png', title: 'Premium Quality' },
          { img: '/image_1171 (4).png', title: 'Premium Quality' },
          { img: '/image_1171 (6).png', title: 'Premium Quality' },
          { img: '/image_3 (1).png', title: 'Premium Quality' },
        ].map((item, index) => (
          <div
            key={index}
            className="w-[90%] sm:w-[280px] md:w-[200px] lg:w-[200px] h-auto  text-center bg-white rounded-lg flex flex-col items-center"
          >
            <img
              src={item.img}
              alt={item.title}
              className="w-[90%] h-full mb-4 bg-[#F7F7F7]"
            />
          <p className='pt-2 text-[11px] flex'>
                Cantilever chair  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; $26.00 &nbsp;<s className='text-[#FB2448]'>$42.00</s>
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LeatestProducts
