/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { getTopCategories } from "@/sanity/lib/queries";

const TopCategories = () => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const fetchedProducts = await client.fetch(getTopCategories);
      setProducts(fetchedProducts);
    }
    fetchProducts();
  }, []);

  return (
    <div className="bg-white pb-8 pt-8">
      <h1 className="text-2xl font-bold text-center text-[#1A0B5B] mb-14">
        Top Categories
      </h1>

      <div className="grid grid-cols-1 pb-14 sm:grid-cols-[repeat(3,150px)] md:grid-cols-[repeat(4,150px)] lg:grid-cols-[repeat(4,150px)] gap-4 justify-center justify-items-center mx-auto w-full">
        {products.map((product, index) => (
          <Link 
            key={index} 
            href={`/products/${product.slug?.current}`}
            className="h-[10rem] w-[10rem] flex flex-col items-center"
          >
            {product.image && (
              <Image
                src={product.image.asset.url}
                alt={product.name}
                width={112}
                height={112}
                className="w-[7rem] h-[7rem] bg-[#F6F7FB] rounded-full shadow-md object-contain"
                loading="lazy"
              />
            )}
            <p className="text-center mt-2">
              {product.name} <br /> ${product.price}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default TopCategories;