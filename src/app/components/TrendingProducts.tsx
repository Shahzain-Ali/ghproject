"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Heart, ShoppingCart, X } from 'lucide-react';
import { client } from "@/sanity/lib/client";
import { Product } from "@/app/types/Product";
import { groq } from "next-sanity";
import { motion } from 'framer-motion';
import { useCart } from "@/app/context/cartContext";
import Link from "next/link";

const getFeaturedProducts = groq`*[_type == "product" && name in [
  "Cantilever Chair",
  "Nordic Net Red Chair",
  "Futuristic Sleek Modern Chair",
  "Sobuy Blue Folding Chair Wooden Padded",
  "Liberty Wood 63' Floating Entertainment Center",
  "Replica Hans Wegner Wishbone Chair",
  "Nautilus Lounge Chair",
  "Alpha Chair – Solid Ebonised Oak"
]] {
  _id,
  name,
  image {
    asset-> {
      _id,
      url
    }
  },
  price,
  description,
  discountPercentage,
  category,
  slug {
    current
  }
}`;

const TrendingProducts = () => {
  const { dispatch, state } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [wishlistedProducts, setWishlistedProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts: Product[] = await client.fetch(getFeaturedProducts);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const loadWishlist = () => {
      const savedWishlist = localStorage.getItem('wishlist');
      if (savedWishlist) {
        setWishlistedProducts(JSON.parse(savedWishlist));
      }
    };

    fetchProducts();
    loadWishlist();
  }, []);

  const handleCartToggle = (product: Product) => {
    const isInCart = isProductInCart(product._id);
    if (isInCart) {
      dispatch({ type: 'REMOVE_FROM_CART', payload: product._id });
    } else {
      dispatch({ type: 'ADD_TO_CART', payload: { ...product, quantity: 1 }});
    }
  };

  const isProductInCart = (productId: string): boolean => {
    return state.cart.some(item => item._id === productId);
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProducts(prev => {
      const isSelected = prev.some(p => p._id === product._id);
      if (isSelected) return prev.filter(p => p._id !== product._id);
      if (prev.length < 2) return [...prev, product];
      return prev;
    });
  };

  const handleAddToWishlist = (product: Product) => {
    setWishlistedProducts(prev => {
      const isAlreadyWishlisted = prev.some(item => item._id === product._id);
      const updatedWishlist = isAlreadyWishlisted
        ? prev.filter(item => item._id !== product._id)
        : [...prev, product];
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      return updatedWishlist;
    });
  };

  return (
    <div className="w-full bg-white px-4 md:px-6 lg:px-8 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header with Compare Button */}
        <div className="relative mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-indigo-900">
            Trending Products
          </h2>
          <div className="absolute right-0 top-1/2 -translate-y-1/2">
            <button
              onClick={() => selectedProducts.length === 2 && setIsCompareModalOpen(true)}
              disabled={selectedProducts.length !== 2}
              className={`px-4 py-2 rounded transition-colors ${
                selectedProducts.length === 2
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Compare Products
            </button>
          </div>
        </div>

        {/* Top Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8 mb-12">
          {products.slice(4, 8).map((product) => (
            <motion.div
              key={product._id}
              className="bg-[#F6F7FB] rounded-lg relative group"
              onMouseEnter={() => setHoveredProduct(product._id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="p-4">
                <div className="relative aspect-square mb-4">
                  {product.image?.asset?.url && (
                    <Image
                      src={product.image.asset.url}
                      alt={product.name}
                      fill
                      className="object-contain"
                    />
                  )}
                  
                  {/* Hover Overlay */}
                  {hoveredProduct === product._id && (
                    <div className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center">
                      <div className="absolute top-4 right-4 flex flex-col space-y-2">
                        <motion.button
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          onClick={() => handleAddToWishlist(product)}
                          className="bg-white p-2 rounded-full shadow-md hover:bg-gray-50"
                        >
                          <Heart
                            className={wishlistedProducts.some(item => item._id === product._id)
                              ? 'text-red-500 fill-current'
                              : 'text-gray-600'
                            }
                            size={20}
                          />
                        </motion.button>
                        <motion.button
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          onClick={() => handleCartToggle(product)}
                          className={`p-2 rounded-full shadow-md ${
                            isProductInCart(product._id)
                              ? 'bg-blue-500'
                              : 'bg-white hover:bg-gray-50'
                          }`}
                        >
                          <ShoppingCart
                            size={20}
                            className={isProductInCart(product._id) ? 'text-white' : 'text-gray-600'}
                          />
                        </motion.button>
                      </div>

                      <Link
                        href={`/products/${product.slug.current}`}
                        className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
                      >
                        <motion.button
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-green-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-600 transition-colors"
                        >
                          View Details
                        </motion.button>
                      </Link>

                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute top-4 left-4"
                      >
                        <input
                          type="checkbox"
                          checked={selectedProducts.some(p => p._id === product._id)}
                          onChange={() => handleProductSelect(product)}
                          className="form-checkbox h-5 w-5 text-indigo-600 rounded border-gray-300"
                        />
                      </motion.div>
                    </div>
                  )}
                </div>
                <Link href={`/products/${product.slug.current}`} className="block text-center">
                  <h3 className="text-lg font-medium text-pink-500 mb-2">{product.name}</h3>
                  <div className="flex justify-center items-center gap-3">
                    <span className="text-indigo-900 font-bold">${product.price}</span>
                    {product.discountPercentage && (
                      <span className="text-gray-400 line-through">
                        ${(product.price * (1 + product.discountPercentage/100)).toFixed(2)}
                      </span>
                    )}
                  </div>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Rest of your existing promotional and products list sections remain unchanged */}
         {/* Promotional and Products List Section */}
         <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {/* Left Promo */}
          <div className="bg-pink-50 rounded-lg p-8">
            <h3 className="text-xl font-bold text-indigo-900 mb-2">23% off in all products</h3>
            <Link href="/shop" className="text-pink-500 hover:text-pink-600 inline-block mb-6">
              Shop Now
            </Link>
            <div className="flex justify-end ">
              <div className="relative w-48 h-48">
                <Image
                  src="/image-1162.png"
                  alt="Promotional Clock"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* Middle Promo */}
          <div className="bg-blue-50 rounded-lg p-8">
            <h3 className="text-xl font-bold text-indigo-900 mb-2">23% off in all products</h3>
            <Link href="/collection" className="text-pink-500 hover:text-pink-600 inline-block mb-6">
              View Collection
            </Link>
          {products.slice(3,4).map((product) => (
            <div key={product._id} className="flex items-center gap-4 " >
                <div className="relative h-20 rounded-lg  w-[100%]">
                  {product.image?.asset?.url && (
                    <Image
                      src={product.image.asset.url}
                      alt={product.name}
                      fill
                      className="object-contain"
                    />
                  )}
                </div>
            </div>
        ))}
          </div>

          {/* Right Products List */}
          <div className="space-y-6">
            {products.slice(0,3).map((product) => (
              <div key={product._id} className="flex items-center gap-4">
                <div className="relative w-20 h-20 bg-[#F6F7FB] rounded-lg p-2">
                  {product.image?.asset?.url && (
                    <Image
                      src={product.image.asset.url}
                      alt={product.name}
                      fill
                      className="object-contain"
                    />
                  )}
                </div>
                <div>
                  <h3 className="font-medium text-indigo-900">{product.name}</h3>
                  <p className="text-indigo-600 font-bold">${product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison Modal */}
        {isCompareModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-indigo-900">Product Comparison</h2>
                <button
                  onClick={() => setIsCompareModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-full"
                >
                  <X size={24} />
                </button>
              </div>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border p-4 text-left">Attribute</th>
                    <th className="border p-4">{selectedProducts[0]?.name}</th>
                    <th className="border p-4">{selectedProducts[1]?.name}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-4 font-medium">Price</td>
                    <td className="border p-4 text-center">${selectedProducts[0]?.price}</td>
                    <td className="border p-4 text-center">${selectedProducts[1]?.price}</td>
                  </tr>
                  <tr>
                    <td className="border p-4 font-medium">Description</td>
                    <td className="border p-4">{selectedProducts[0]?.description}</td>
                    <td className="border p-4">{selectedProducts[1]?.description}</td>
                  </tr>
                  <tr>
                    <td className="border p-4 font-medium">Category</td>
                    <td className="border p-4 text-center">{selectedProducts[0]?.category}</td>
                    <td className="border p-4 text-center">{selectedProducts[1]?.category}</td>
                  </tr>
                </tbody>
              </table>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrendingProducts;