import Image from 'next/image';
import React from 'react';

const Logos = () => {
  return (
    <div className="max-w-[1177px] mx-auto flex items-center justify-center h-[200px] sm:h-[150px] lg:h-[250px]">
      <div className="w-full sm:w-[80%] md:w-[70%] lg:w-[904px] flex items-center justify-center">
        <Image
          src="/Group_124 (2).png"
          alt="Logo"
          width={904}
          height={93}
          className="w-full h-auto"
        />
      </div>
    </div>
  );
};

export default Logos;
