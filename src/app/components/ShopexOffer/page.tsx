import React from 'react';

const ShopexOffer = () => {
  return (
    <div className="w-full mb-6 px-4">
      {/* Heading */}
      <div className="text-center mb-6">
        <h1 className="text-[#151875] text-[24px] font-bold">
          What Shopex Offer!
        </h1>
      </div>

      {/* Card Container */}
      <div className="flex flex-wrap justify-center gap-6 mx-auto w-full max-w-[1200px]">
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
    </div>
  );
};

export default ShopexOffer;
