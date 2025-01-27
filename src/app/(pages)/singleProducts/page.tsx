import React from 'react';

const ProductPage = () => {
  return (
    <div className="mt-6 mb-14">
      {/* Main container for grid layout */}
      <section className="container p-2 mx-auto grid grid-cols-2 sm:grid-cols-2 smm:w-[45%] sm:w-[60%]  md:grid-cols-12 lg:grid-cols-12 gap-6 w-[95%] md:w-[70%] lg:w-[70%] shadow-md h-[auto] customsm:w-auto">
        {/* First Column: Vertical Images */}
        <div className="col-span-2  sm:col-span-1 md:col-span-2 lg:col-span-2  flex flex-col gap-4 sm:gap-6 pt-4">
          <img src="/Rectangle_134.png" alt="Thumbnail 1" className="w-full h-[110px] object-center rounded-lg" />
          <img src="/Rectangle_136.png" alt="Thumbnail 2" className="w-full h-[110px] object-center rounded-lg" />
          <img src="/Rectangle_137.png" alt="Thumbnail 3" className="w-full h-[100px] object-center rounded-lg" />
        </div>

        {/* Second Column: Main Image */}
        <div className="col-span-2 sm:col-span-1 md:col-span-5 lg:col-span-5 pt-4">
          <img src="/Rectangle_138.png" alt="Main Product" className="w-full h-[350px] object-cover rounded-lg" />
        </div>

        {/* Third Column: Product Details */}
        <div className="col-span-2 sm:col-span-2 md:col-span-5 lg:col-span-5 flex flex-col gap-3 pt-4 sm:mx-auto ">
          <h1 className="text-2xl font-bold text-[#151875]">Playwood arm chair</h1>
          <div className="flex h-[15px] place-items-center">
            <img src="/Group_236.png" alt="" className="w-[80px]" /><span>(22)</span>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-lg font-bold text-[#151875]">$32.00</p>
            <p className="text-sm line-through text-gray-400">$56.00</p>
          </div>
          <p className="text-sm text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tellus porttitor purus, et volutpat sit.
          </p>
          <button className="bg-[#FB2E86] text-white px-6 py-2 text-sm rounded-md w-[150px]">
            Add To Cart
          </button>
          <div className="flex flex-col gap-y-2">
            <h2 className="text-md font-semibold">Categories:</h2>
            <h2 className="text-md font-semibold">Tags</h2>
            <h2 className="text-md font-semibold">Share:</h2>
            <div className="flex gap-2">
              <a href="#" className="w-[20px] h-[20px] bg-blue-600 rounded-full"></a>
              <a href="#" className="w-[20px] h-[20px] bg-pink-600 rounded-full"></a>
              <a href="#" className="w-[20px] h-[20px] bg-blue-600 rounded-full"></a>
            </div>
          </div>
        </div>
      </section>

       {/* Description Section */}
       <section className='bg-[#F9F8FE] w-full py-8 mt-10'>
        <div className='w-[70%]  mx-auto'>
          <div>
            <ul className='flex gap-x-6'>
              <li className='text-[#151875] hover:border-b  hover:border-b-black inline-block'>Description</li>
              <li className='text-[#151875] hover:border-b  hover:border-b-black inline-block'>Additional Info</li>
              <li className='text-[#151875] hover:border-b  hover:border-b-black inline-block'>Reviews</li>
              <li className='text-[#151875] hover:border-b  hover:border-b-black inline-block'>Video</li>
            </ul>
          </div>
          <div className='my-4'>
            <h1 className='text-[14px] text-[#151875]'>Varius tempor.</h1>
            <p className='text-[12px] text-[#A9ACC6]'>
              Aliquam dis vulputate vulputate integer sagittis. Faucibus dolor ornare faucibus vel sed et eleifend habitasse amet.
            </p>
          </div>
    
          <div>
            <h1 className='text-[14px] text-[#151875]'>More details</h1>
            <div className=''>
              <div className="flex items-center mb-4">
                <i className="fas fa-arrow-right mr-2"></i>
                <p className='text-[12px] text-[#A9ACC6]'>Aliquam dis vulputate vulputate integer sagittis. Faucibus ds diam arcu...</p>
              </div>
              <div className="flex items-center mb-4">
                <i className="fas fa-arrow-right mr-2"></i>
                <p className='text-[12px] text-[#A9ACC6]'>Aliquam dis vulputate vulputate integer sagittis. Faucibus ds diam arcu...</p>
              </div>
              <div className="flex items-center">
                <i className="fas fa-arrow-right mr-2"></i>
                <p className='text-[12px] text-[#A9ACC6]'>Aliquam dis vulputate vulputate integer sagittis. Faucibus ds diam arcu...</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Related Products Section */}
      <section className="my-10">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-[#151875]">Related Products</h2>
        </div>
        <div className="flex flex-wrap justify-center gap-6 mx-auto md:w-[85%] lg:w-[70%] w-full max-w-[1200px]">
          {[{ img: '/Rectangle_128.png', title: 'Free Delivery' }, { img: '/Rectangle_131.png', title: 'Cashback' }, { img: '/Rectangle_130.png', title: 'Premium Quality' }, { img: '/Rectangle_133.png', title: 'Premium Quality' }].map((item, index) => (
            <div key={index} className="w-[90%] smm:[240px] sm:w-[280px] md:w-[150px] lg:w-[150px] h-auto text-center bg-white rounded-lg flex flex-col items-center">
              <img src={item.img} alt={item.title} className="w-[90%] smm:w-[60%] h-full smm:h-[300px] mb-4 bg-[#F7F7F7]" />
              <p className="pt-2 text-[11px]">
                {item.title} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; $26.00 &nbsp;<s className="text-[#FB2448]">$42.00</s>
              </p>
            </div>
          ))}
        </div>
        <section className="w-auto my-8">
          <img src="/Group_124 (2).png" alt="" className="w-[50%] mx-auto" />
        </section>
      </section>
    </div>
  );
};

export default ProductPage;
