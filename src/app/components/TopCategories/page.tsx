import React from "react";


const TopCategories = () => {
    
  return (
    <div className="bg-white pb-8 pt-8">
      {/* Heading */}
      <h1 className="text-2xl font-bold text-center text-[#1A0B5B] mb-14">
        Top Categories
      </h1>

      {/* Categories Container */}
      <div className="grid grid-cols-1 pb-14  sm:grid-cols-[repeat(3,150px)] md:grid-cols-[repeat(4,150px)] lg:grid-cols-[repeat(4,150px)] gap-4 justify-center justify-items-center mx-auto w-full">

        {/* Category 1 */}
        <div className="h-[10rem] w-[10rem] flex flex-col items-center">
          <img
            src="/image_1171 (4).png"
            alt=""
            className="w-[7rem] h-[7rem] bg-[#F6F7FB] rounded-full shadow-md"
          />
          <p className="text-center mt-2">
            Mini LCW Chair <br /> $56
          </p>
        </div>

        {/* Category 2 */}
        <div className="h-[10rem] w-[10rem] flex flex-col items-center">
          <img
            src="/image_1171 (3).png"
            alt=""
            className="w-[7rem] h-[7rem] bg-[#F6F7FB] rounded-full shadow-md"
          />
          <p className="text-center mt-2">
            Mini LCW Chair <br /> $56
          </p>
        </div>

        {/* Category 3 */}
        <div className="h-[10rem] w-[10rem] flex flex-col items-center">
          <img
            src="/image_1171 (8).png"
            alt=""
            className="w-[7rem] h-[7rem] bg-[#F6F7FB] rounded-full shadow-md"
          />
          <p className="text-center mt-2">
            Mini LCW Chair <br /> $56
          </p>
        </div>

        {/* Category 4 */}
        <div className="h-[10rem] w-[10rem] flex flex-col items-center ">
          <img
            src="/image_1171 (1).png"
            alt=""
            className="w-[7rem] h-[7rem] bg-[#F6F7FB] rounded-full shadow-md"
          />
          <p className="text-center mt-2">
            Mini LCW Chair <br /> $56
          </p>
     
        </div>
      
      </div>
      <div className="w-[100vw]">
        <img src="/Group_161.png" alt="" className="w-[100%] pb-6" />
        <img src="image 1174 (1).png" alt="" className="w-[600px] mx-auto" />
      </div>

      <section className="w-auto mb-6">
            <img src="/Group _62.png" alt="" className="w-[100%]"/>
      </section>
      <section className="w-auto">
        <img src="/Group_124 (2).png" alt="" className="w-[50%] mx-auto" />
      </section>
     
    </div>
  );
};

export default TopCategories;
