import React from "react";

const DiscountItem: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center gap-10 px-6 w-[90%] md:flex-nowrap sm:flex-col">
        {/* Left Content */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-purple-700 text-3xl font-bold mb-4">
            Discount Item
          </h2>
          <div className="flex space-x-3 text-sm text-gray-500 mb-6 justify-center md:justify-start">
            <span className="underline cursor-pointer">Wood Chair</span>
            <span className="underline cursor-pointer">Plastic Chair</span>
            <span className="underline cursor-pointer">Sofa Collection</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            20% Discount Of All Products
          </h3>
          <p className="text-gray-500 mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu eget
            feugiat habitasse nec, bibendum condimentum.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-500 text-left md:text-left sm:pl-0 sm:text-center">
            <li>Material expose like metals</li>
            <li>Simple neutral colours</li>
            <li>Clear lines and geometric figures</li>
            <li>Material expose like metals</li>
          </ul>
          <button className="mt-8 bg-pink-500 text-white px-6 py-3 rounded shadow-md hover:bg-pink-600">
            Shop Now
          </button>
        </div>

        {/* Right Content */}
        <div className="flex-1 flex justify-center smm:hidden customsm:hidden">
          <img
            src="/Group_154.png"
            alt="Chair"
            className="rounded-full shadow-md w-full max-w-sm"
          />
        </div>
      </div>
    </section>
  );
};

export default DiscountItem;
