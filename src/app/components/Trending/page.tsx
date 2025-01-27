"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "../utils/image";
import { Product } from "@/app/types/Product";
import { getBlueSofa } from "@/sanity/lib/queries";
import { useCart } from "@/app/context/cartContext";
import { motion } from 'framer-motion';

const Trending = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const { dispatch, state } = useCart();

  useEffect(() => {
    async function fetchTrendingProduct() {
      const fetchedProduct = await client.fetch(getBlueSofa);
      console.log("Fetched Product:", fetchedProduct);
      setProduct(fetchedProduct[0]);
    }
    fetchTrendingProduct();
  }, []);

  const isInCart = (productId: string) => {
    return state.cart.some(item => item._id === productId);
  };

  const handleAddToCart = () => {
    if (!product) return;

    if (isInCart(product._id)) {
      dispatch({
        type: 'REMOVE_FROM_CART',
        payload: product._id
      });
    } else {
      dispatch({
        type: 'ADD_TO_CART',
        payload: {
          ...product,
          quantity: 1
        }
      });
    }
  };

  if (!product) return null;

  return (
    <div className="bg-[#F1F0FF] py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row lg:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8">
          {/* Product Image */}
          <section className="w-full md:w-1/2 flex justify-center ">
            <div className="relative w-full max-w-md aspect-square bg-[pink] rounded-full">
              {product.image && (
                <Image
                  src={urlFor(product.image)}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-contain"
                  loading="lazy"
                />
              )}
            </div>
          </section>

          {/* Product Details */}
          <section className="w-full md:w-1/2 md:text-left">
            <h2 className="text-2xl md:text-3xl lg:text-2xl font-bold mb-6 text-[#151875]">
              {product.name}
            </h2>

            {product.description && (
              <div className="">
                <div className="flex items-center mb-2">
                  <span className="border-2 border-red-500 inline-block w-[15px] h-[15px] rounded-xl bg-red-500"></span>
                  <p className="text-gray-700 ml-2 inline-block">
                    {product.description}
                  </p>
                </div>
                <div className="flex items-center mb-2">
                  <span className="inline-block w-[15px] h-[15px] rounded-xl bg-blue-500"></span>
                  <p className="text-gray-700 ml-2 inline-block">
                    Arms, backs and seats are structurally reinforced
                  </p>
                </div>
                <div className="flex items-center mb-2">
                  <span className="inline-block w-[15px] h-[15px] rounded-xl bg-green-500"></span>
                  <p className="inline-block ml-2 text-[14px]">
                    All frames constructed with hardwood solids and laminates
                  </p>
                </div>
              </div>
            )}
            <div className="flex place-items-center"></div>

            <div className="mb-8 flex mt-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                className={`font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out ${
                  isInCart(product._id)
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {isInCart(product._id) ? 'Remove from Cart' : 'Add to Cart'}
              </motion.button>

              <div className="flex flex-col ml-4">
                <div className="flex items-center justify-center md:justify-start space-x-3">
                  <span className="text-blue-500">✓</span>
                  <p className="text-gray-700">Price: ${product.price}</p>
                </div>
                
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Trending;