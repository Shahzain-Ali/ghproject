/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { getTopCategories } from "@/sanity/lib/queries";
import { useTranslations } from "next-intl";

const TopCategories = () => {
  const [products, setProducts] = useState<any[]>([]);
  const t = useTranslations('topCategories')

  useEffect(() => {
    async function fetchProducts() {
      const fetchedProducts = await client.fetch(getTopCategories);
      setProducts(fetchedProducts);
    }
    fetchProducts();
  }, []);

  return (
    <div className="bg-white pb-8 pt-8">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-purple-700 mb-14">
        {t('heading')}
      </h1>

      <div className="grid grid-cols-1 customsm:grid-cols-[repeat(1,auto)] pb-14 justify-center gap-2 sm:grid-cols-[repeat(3,auto)] md:grid-cols-[repeat(4,180px)] lg:grid-cols-[repeat(4,auto)]  ustify-center justify-items-center mx-auto w-full">
        {products.map((product, index) => (
          <Link 
            key={index} 
            href={`/products/${product.slug?.current}`}
            className="h-auto hover:shadow-md customsm:w-[20rem] sm:w-[13rem] smm:w-[20rem] md:w-[11rem] border lg:w-[14rem] w-[13rem] flex flex-col items-center sm:mt-4 "
          >
            {product.image && (
              <Image
                src={product.image.asset.url}
                alt={product.name}
                width={112}
                height={112}
                className="w-[7rem] h-[7rem] customsm:w-[14rem] customsm:h-[14rem] smm:w-[20rem] smm:h-[19rem] lg:h-[13rem] lg:w-auto bg-[#F6F7FB] rounded-full shadow-md object-contain"
                loading="lazy"
              />
            )}
            <p className="text-center mt-2">
              {t(`${product.name}`)} <br /> ${product.price}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default TopCategories;