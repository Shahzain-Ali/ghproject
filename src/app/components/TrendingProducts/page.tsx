import React from 'react';

const TrendingProducts = () => {
  return (
    <div>
      {/* First Section: 4 Images Centered */}
      <div className="text-center my-8">
        <h2 className="text-2xl font-bold">Trending Products</h2>
      </div>
      <div className="grid grid-cols-1 pb-6 customsm:grid customsm:grid-cols-[400px]  sm:grid-cols-[repeat(3,150px)] md:grid-cols-[repeat(4,150px)] lg:grid-cols-[repeat(4,150px)] gap-x-8 gap-y-4 justify-center justify-items-center mx-auto w-full">
        <div className='smm:w-[220px] w-[160px] h-[240px] text-center text-[12px] shadow-md '><img
          src="/image_1171 (9).png"
          alt="Product 1"
          className="smm:w-[160px] w-[140px] h-[170px] mx-auto bg-[#F5F6F8] mt-2"
        />
        <p className='pt-2'>
        Cantilever chair <br /> $26.00 <s>$42.00</s>
        </p>
            </div>
        <div  className='smm:w-[220px] w-[160px] h-[240px] text-center text-[12px] shadow-md'><img
          src="/image_1171 (1).png"
          alt="Product 2"
          className="smm:w-[160px] w-[140px] h-[170px] mx-auto bg-[#F5F6F8] mt-2"
        />
         <p className='pt-2'>
        Cantilever chair <br /> $26.00 <s>$42.00</s>
        </p></div>
        <div  className='smm:w-[220px] w-[160px] h-[240px] text-center text-[12px] shadow-md'><img
          src="/image_1171 (5).png"
          alt="Product 3"
          className=" smm:w-[160px] w-[140px] h-[170px] mx-auto bg-[#F5F6F8] mt-2"
        />
         <p className='pt-2'>
        Cantilever chair <br /> $26.00 <s>$42.00</s>
        </p></div>
        <div  className='smm:w-[220px] w-[160px] h-[240px] text-center text-[12px] shadow-md'><img
          src="/image_1171 (6).png"
          alt="Product 4"
          className=" smm:w-[160px] w-[140px] h-[170px] mx-auto bg-[#F5F6F8] mt-2"
        />
         <p className='pt-2'>
        Cantilever chair <br /> $26.00 <s>$42.00</s>
        </p></div>
      </div>

      {/* Second Section: 2 Rows Layout */}
      <div className="grid grid-cols-1   sm:grid-cols-[repeat(3,150px)]  md:grid-cols-[230px_230px_250px] lg:grid-cols-[230px_230px_250px] gap-4 gap-y-4 justify-center justify-items-center mx-auto w-full">
        {/* First Image - Spanning 2 Rows */}
        <img
          src="/Group_ok.png"
          alt="First Large Image"
          className="row-span-2 w-full max-w-[300px]"
        />

        {/* Second Image - Spanning 2 Rows */}
        <img
          src="/image_3 (3).png"
          alt="Second Large Image"
          className="row-span-2 w-full max-w-[300px]"
        />

        {/* Last Column: 3 Small Images */}
        <div className="grid grid-rows-3 w-full gap-y-2 justify-center mt-2 mr-5 ">
          <img src="/Group_124 (4).png" alt="Small Image 1"  className='w-[150px]'/>
          <img src="/Group_124 (5).png" alt="Small Image 2"  className='w-[150px]'/>
          <img src="/Group_124 (6).png" alt="Small Image 3" className='w-[150px]' />
        </div>
      </div>
    </div>
  );
};

export default TrendingProducts;
