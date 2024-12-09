import React from 'react';

const Trending = () => {
  return (
    <div className="bg-[#F1F0FF] bg-cover bg-center bg-no-repeat w-full h-[300px] flex justify-center items-center">
      {/* Image Container */}
      <div className="relative w-[50%] mx-auto">
        {/* Image */}
        <img src="/Sof_101 (2).png" alt="Trending Product" className="w-full h-auto" />
        
        {/* Button */}
        <button className="bg-[#FB2E86] text-white customsm:w-[40px] customsm:h-[16px] smm:w-[50px] smm:h-[20px] smm:text-[2px] sm:w-[55px] w-[60px] h-[25px] sm:h-[22px] sm:text-[2px] text-[8px] rounded-sm absolute" 
                style={{
                  right: '33%', // Adjust these values based on the image ratio
                  top: '65%',  // Keeps the button in proportion
                }}>
          <span className='text-[]'>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default Trending;
