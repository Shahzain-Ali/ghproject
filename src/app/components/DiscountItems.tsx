/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { getDiscountItems } from "@/sanity/lib/queries";
import { Product } from "@/app/types/Product";
import { useTranslations } from "next-intl";

const DiscountItem: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState("Wood Chair");
  const t = useTranslations('discountItem')

  useEffect(() => {
    async function fetchDiscountProducts() {
      const fetchedProducts = await client.fetch(getDiscountItems);
      setProducts(fetchedProducts);
    }
    fetchDiscountProducts();
  }, []);

  const categories = ["Wood Chair", "Plastic Chair", "Sofa Collection"];

  return (
    <section className="py-8 md:py-16 bg-white">
      <div className="max-w-6xl mx-auto w-[90%]">
        {/* Title and Categories */}
        <div className="text-center mb-8">
          <h2 className="text-purple-700 text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            {t('title')}
          </h2>
          <div className="w-auto">
            <Link href={""}>
              <ul className="flex space-x-3 text-xl text-gray-500 justify-center ">
                {categories.map((category) => (
                  <li
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className=''
                  >
                    {category}
                  </li>
                ))}
              </ul>
            </Link>
          </div>
        </div>

        {/* Content Container */}
        <div className="flex flex-col md:flex-row lg:flex-row items-center justify-center gap-8 lg:gap-12">

          {/* Left Content */}
          <div className="w-full md:w-1/2 text-center md:text-left lg:text-left md:ml-12 lg:ml-20">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
              {t('offer')}
            </h1>
            <h2 className="text-[#FB2E86] mb-2 text-lg">{t('productName')}</h2>
            <p className="text-gray-500 mb-6 text-sm md:text-base lg:text-base">
              {t('description')}
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-500 text-left md:text-left lg:text-left 
              text-sm md:text-base lg:text-base mb-6">
              {t('features.material')}
              {t('features.colors')}
              {t('features.design')}
              {t('features.repeatMaterial')}
            </ul>
            {products.length > 0 && products[0].slug?.current && (
              <div className="flex justify-center md:justify-start lg:justify-start">
                <Link 
                  href={`/products/${products[0].slug.current}`} 
                  className="inline-block bg-pink-500 text-white px-4 py-2 md:px-6 md:py-3 lg:px-6 lg:py-3 
                  rounded shadow-md hover:bg-pink-600 text-sm md:text-base lg:text-base"
                >
                  {t('button')}
                </Link>
              </div>
            )}
          </div>

          {/* Right Content (Image) */}
          <div className="w-full md:w-1/2 flex justify-center">
            {products.length > 0 && products[0].image && (
              <Link href={`/products/${products[0].slug?.current}`}>
                <Image
                  src={products[0].image.asset.url}
                  alt={products[0].name}
                  width={400}
                  height={400}
                  className="rounded-full shadow-md object-contain 
                  w-[250px] h-[250px] 
                  md:w-[350px] md:h-[350px] 
                  lg:w-[400px] lg:h-[400px]
                  bg-[#F5E1FC]"
                  loading="lazy"
                />
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscountItem;