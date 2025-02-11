"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { getDiscountItems } from "@/sanity/lib/queries";
import { Product } from "@/app/types/Product";

const DiscountItem: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState("Wood Chair");

  useEffect(() => {
    async function fetchDiscountProducts() {
      const fetchedProducts = await client.fetch(getDiscountItems);
      setProducts(fetchedProducts);
    }
    fetchDiscountProducts();
  }, []);

  const categories = ["Wood Chair", "Plastic Chair", "Sofa Collection"];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto items-center gap-10 px-6 w-[90%] md:flex-nowrap sm:flex-col place-items-center">
        <div className="w-[80%] mx-auto text-center">
          <h2 className="text-purple-700 text-3xl font-bold mb-4">
            Discount Item
          </h2>
          <div className="w-auto text-center">
            <ul className="flex space-x-3 text-sm text-gray-500 mb-6 mx-auto w-auto justify-center text-center">
              {categories.map((category) => (
                <li
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`cursor-pointer ${
                    activeCategory === category ? "underline" : ""
                  }`}
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="w-[80%]">
          <div className="flex justify-between">
            <div className="w-[50%] smm:w-[100%] customsm:text-center customsm::w-[100%] customsm:mx-auto">
              <h1 className="text-2xl customsm:text-[18px] font-bold text-gray-800 mb-4">
                20% Discount Of All Products
              </h1>
              <h2 className="text-[#FB2E86] mb-2">Eams Sofa Compact</h2>
              <p className="text-gray-500 mb-6 customsm:text-[14px]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu eget
                feugiat habitasse nec, bibendum condimentum.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-500 text-left md:text-left sm:pl-0 sm:text-center customsm:text-[14px]">
                <li>Material expose like metals</li>
                <li>Simple neutral colours</li>
                <li>Clear lines and geometric figures</li>
                <li>Material expose like metals</li>
              </ul>
              {products.length > 0 && products[0].slug?.current && (
                <Link 
                  href={`/products/${products[0].slug.current}`} 
                  className="mt-8 inline-block bg-pink-500 text-white px-6 py-3 rounded shadow-md hover:bg-pink-600"
                >
                  Shop Now
                </Link>
              )}
            </div>

            {/* Right Content */}
            <div className="flex sm:block sm:w-[50%] sm:h-[12rem] smm:hidden customsm:hidden w-[40%]">
              {products.length > 0 && products[0].image && (
                <Link href={`/products/${products[0].slug?.current}`}>
                  <Image
                    src={products[0].image.asset.url}
                    alt={products[0].name}
                    width={500}
                    height={500}
                    className="rounded-full shadow-md w-full sm:h-[16rem] max-w-sm object-contain ml-auto bg-[#F5E1FC]"
                    loading="lazy"
                  />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscountItem;