import React from "react";

const FeaturedProducts = () => {
  const products = [
    {
      name: "Cantilever chair",
      code: "Y523201",
      price: "$42.00",
      image: "/Chair_Image.png",
    },
    {
      name: "Cantilever chair",
      code: "Y523201",
      price: "$42.00",
      image: "/Chair2_Image.png",
    },
    {
      name: "Cantilever chair",
      code: "Y523201",
      price: "$42.00",
      image: "/Chair3_Image.png",
    },
    {
      name: "Cantilever chair",
      code: "Y523201",
      price: "$42.00",
      image: "/Chair4_Image.png",
    },
  ];

  return (
    <section className="bg-purple-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-[#1A0B5B] mb-8">
          Featured Products
        </h2>
        <div
    className="
    grid 
    grid-cols-1
    sm:grid-cols-[repeat(auto-fit,minmax(200px,1fr))]
    md:grid-cols-[repeat(4,1fr)]
    lg:grid-cols-[repeat(auto-fit,minmax(210px,1fr))]
    gap-4
    justify-center
    justify-items-center
    mx-auto
    w-full
  "
>


          {products.map((product, index) => (
            <div
              key={index}
              className="relative w-full max-w-[300px] border rounded-xl p-4 bg-white shadow-md hover:shadow-lg transition duration-300 mx-auto"
            >
              <div className="w-full h-40 flex items-center justify-center overflow-hidden rounded-lg ">
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-contain w-full h-full"
                />
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500">{product.code}</p>
                <p className="text-lg font-bold text-gray-800 mt-2">
                  {product.price}
                </p>
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-purple-500 text-white opacity-0 hover:opacity-100 flex items-center justify-center rounded-xl transition duration-300">
                <button className="py-2 px-4 bg-white text-purple-500 font-bold rounded-md shadow-md">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;