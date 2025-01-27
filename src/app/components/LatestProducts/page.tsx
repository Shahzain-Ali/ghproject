"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart } from 'lucide-react';
import { client } from "@/sanity/lib/client";
import { getLatestProduct } from "@/sanity/lib/queries";
import { Product } from "@/app/types/Product";

const LatestProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState("New Arrival");
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [wishlistedProducts, setWishlistedProducts] = useState<string[]>([]);
  const [cartProducts, setCartProducts] = useState<string[]>([]);

  useEffect(() => {
    async function fetchLatestProducts() {
      const fetchedProducts = await client.fetch(getLatestProduct);
      setProducts(fetchedProducts);
    }
    fetchLatestProducts();
  }, []);

  const categories = ["New Arrival", "Best Seller", "Featured", "Offer"];

  const handleAddToWishlist = (productId: string) => {
    setWishlistedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId]
    );
  };

  const handleAddToCart = (productId: string) => {
    setCartProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId]
    );
  };

  return (
    <div className="mb-6">
      <div className="max-w-6xl mx-auto items-center gap-10 px-6 w-[90%] md:flex-nowrap sm:flex-col">
        <div className="w-[80%] mx-auto text-center">
          <h2 className="text-[#151875] text-3xl font-bold mb-4">
            Latest Products
          </h2>
          <div className="w-auto text-center">
            <ul className="flex space-x-3 text-sm text-gray-500 mb-6 mx-auto w-auto justify-center text-center">
              {categories.map((category) => (
                <li
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`cursor-pointer ${
                    activeCategory === category
                      ? "text-[#FB2E86] border-b border-b-[#FB2E86]"
                      : "hover:text-[#FB2E86] hover:border-b hover:border-b-[#FB2E86]"
                  }`}
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      <div className="flex flex-wrap justify-center gap-6 mx-auto md:w-[85%] lg:w-[70%] w-full max-w-[1200px]">
        {products.map((product) => 
           product.slug?.current && (
          <div 
            key={product.name}
            className="relative w-[90%] sm:w-[280px] md:w-[200px] lg:w-[200px] h-auto"
            onMouseEnter={() => setHoveredProduct(product._id)}
            onMouseLeave={() => setHoveredProduct(null)}
          >
            <Link 
              href={`/products/${product.slug?.current}`} 
              className="bg-white rounded-lg flex flex-col items-center"
            >
              {product.image && (
                <div className="relative w-full">
                  <Image
                    src={product.image.asset.url}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="w-[90%] h-full mb-4 bg-[#F7F7F7] object-contain mx-auto"
                    loading="lazy"
                  />
                  {hoveredProduct === product._id && (
                    <div className="absolute top-2 right-2 flex flex-col space-y-2">
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          handleAddToWishlist(product._id);
                        }}
                        className="bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition"
                      >
                        <Heart 
                          className={`${
                            wishlistedProducts.includes(product._id) 
                              ? 'text-red-500 fill-current' 
                              : 'text-gray-500'
                          }`} 
                          size={16} 
                        />
                      </button>
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          handleAddToCart(product._id);
                        }}
                        className="bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition"
                      >
                        <ShoppingCart 
                          className={`${
                            cartProducts.includes(product._id) 
                              ? 'text-blue-500 fill-current' 
                              : 'text-gray-500'
                          }`} 
                          size={16} 
                        />
                      </button>
                    </div>
                  )}
                </div>
              )}
              <p className="pt-2 text-[11px] flex">
                {product.name} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; $
                {product.price} &nbsp;
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestProducts;