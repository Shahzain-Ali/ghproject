"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { client } from "@/sanity/lib/client";
import { Product } from "@/app/types/Product";
import { useCart } from "@/app/context/cartContext";
import { useTranslations } from "next-intl";

export const getLatestProduct = `*[_type == "product" && name in [
  "Matilda Velvet Chair – Pink", 
  "Rapson Thirty-Nine Guest Chair", 
  "Varmora Plastic Chair Solid",
  "Cozy Armchair"
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

const LatestProducts = () => {
  const { dispatch, state } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  // const [activeCategory, setActiveCategory] = useState("New Arrival");
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [wishlistedProducts, setWishlistedProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [compareProduct, setCompareProduct] = useState<Product | null>(null);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  // Add toast state
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  const categories = ["New Arrival", "Best Seller", "Featured", "Offer"];
  const t = useTranslations()

  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        const fetchedProducts = await client.fetch<Product[]>(getLatestProduct);
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

    fetchLatestProducts();
    loadWishlist();
  }, []);

  // Add toast timer effect
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast({ show: false, message: '', type: '' });
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Toast helper function
  const showToast = (message: string, type: string) => {
    setToast({ show: true, message, type });
  };

  const handleCartToggle = (product: Product) => {
    const isInCart = isProductInCart(product._id);
    if (isInCart) {
      dispatch({ type: 'REMOVE_FROM_CART', payload: product._id });
      showToast(`Removed ${product.name} from cart`, 'info');
    } else {
      dispatch({ type: 'ADD_TO_CART', payload: { ...product, quantity: 1 }});
      showToast(`Added ${product.name} to cart`, 'success');
    }
  };

  const isProductInCart = (productId: string): boolean => {
    return state.cart.some(item => item._id === productId);
  };

  const handleAddToWishlist = (product: Product) => {
    setWishlistedProducts(prev => {
      const isAlreadyWishlisted = prev.some(item => item._id === product._id);
      const updatedWishlist = isAlreadyWishlisted
        ? prev.filter(item => item._id !== product._id)
        : [...prev, product];
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      
      // Show toast message
      if (isAlreadyWishlisted) {
        showToast(`Removed ${product.name} from wishlist`, 'info');
      } else {
        showToast(`Added ${product.name} to wishlist`, 'success');
      }
      
      return updatedWishlist;
    });
  };

  const handleProductSelect = (product: Product) => {
    if (selectedProduct?._id === product._id) {
      setSelectedProduct(null);
    } else if (compareProduct?._id === product._id) {
      setCompareProduct(null);
    } else if (!selectedProduct) {
      setSelectedProduct(product);
      showToast(`Selected ${product.name} for comparison`, 'info');
    } else if (!compareProduct) {
      setCompareProduct(product);
      showToast(`Added ${product.name} to comparison`, 'info');
    }
  };

  const canCompare = selectedProduct && compareProduct;

  return (
    <div className="w-full px-4 md:px-6 lg:px-8 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Toast Notification */}
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`fixed top-4 right-4 z-50 px-4 py-2 rounded-md shadow-lg ${
              toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
            }`}
          >
            {toast.message}
          </motion.div>
        )}

        {/* Header with Compare Button */}
        <div className="relative mb-8">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl  font-bold text-[#151875] mb-4">
              {t(`latestProducts.heading`)}
            </h2>
            <ul className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm text-gray-500 mb-6">
              {categories.map((category) => (
                <li
                  key={category}
                  className={`cursor-pointer transition-colors hover:text-[#FB2E86] hover:border-b hover:border-b-[#FB2E86]`}
                >
                   {t(`latestProducts.${category}`)}
                </li>
              ))}
            </ul>
          </div>
          <div className="absolute right-0 top-0 md:top-1/2 md:-translate-y-1/2 customsm:relative customsm:text-center customsm:mt-8 custom:text-center smm:relative smm:mt-8 smm:text-center">
            <button
              onClick={() => {
                if (canCompare) {
                  setIsCompareModalOpen(true);
                  showToast('Comparing products', 'info');
                }
              }}
              disabled={!canCompare}
              className={`px-3 py-1.5 text-sm rounded transition-colors ${
                canCompare
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Compare Products
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 smm:w-[80%] mx-auto">
          {products.map((product) => product.slug?.current && (
            <motion.div
              key={product._id}
              className="relative bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              onMouseEnter={() => setHoveredProduct(product._id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="relative aspect-square p-4 bg-[#F7F7F7] rounded-t-lg smm:w-[100%] border-4 border-purple-200">
                {product.image && (
                  <Image
                    src={product.image.asset.url}
                    alt={product.name}
                    fill
                    className="object-contain p-2"
                  />
                )}
                
                {/* Hover Overlay */}
                {hoveredProduct === product._id && (
                  <div className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center">
                    {/* Top Right Icons */}
                    <div className="absolute top-4 right-4 flex flex-col space-y-2">
                      <motion.button
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        onClick={(e) => {
                          e.preventDefault();
                          handleAddToWishlist(product);
                        }}
                        className="bg-white p-2 rounded-full shadow-md hover:bg-gray-50"
                      >
                        <Heart
                          size={20}
                          className={wishlistedProducts.some(item => item._id === product._id)
                            ? 'text-red-500 fill-current'
                            : 'text-gray-600'
                          }
                        />
                      </motion.button>
                      <motion.button
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        onClick={(e) => {
                          e.preventDefault();
                          handleCartToggle(product);
                        }}
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

                    {/* View Details Button */}
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

                    {/* Compare Checkbox */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute top-4 left-4"
                    >
                      <input
                        type="checkbox"
                        checked={selectedProduct?._id === product._id || compareProduct?._id === product._id}
                        onChange={() => handleProductSelect(product)}
                        className="form-checkbox h-4 w-4 text-indigo-600 rounded border-gray-300"
                      />
                    </motion.div>
                  </div>
                )}
              </div>

              <div className="p-4 border-4 border-pink-200">
                <h3 className="text-sm md:text-base font-medium text-[#151875] mb-1">
                  {t(`latestProducts.${product.name}`)}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm md:text-base font-bold text-[#151875]">
                    ${product.price}
                  </span>
                  {product.discountPercentage && (
                    <span className="text-xs md:text-sm text-gray-400 line-through">
                      ${(product.price * (1 + product.discountPercentage/100)).toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Comparison Modal */}
        {isCompareModalOpen && selectedProduct && compareProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-lg p-4 md:p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg md:text-xl font-bold text-[#151875]">
                  Product Comparison
                </h2>
                <button
                  onClick={() => setIsCompareModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700 p-2"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border-">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border p-2 md:p-4 text-left">Attribute</th>
                      <th className="border p-2 md:p-4">{selectedProduct.name}</th>
                      <th className="border p-2 md:p-4">{compareProduct.name}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border p-2 md:p-4 font-medium">Price</td>
                      <td className="border p-2 md:p-4 text-center">${selectedProduct.price}</td>
                      <td className="border p-2 md:p-4 text-center">${compareProduct.price}</td>
                    </tr>
                    <tr>
                      <td className="border p-2 md:p-4 font-medium">Description</td>
                      <td className="border p-2 md:p-4">{selectedProduct.description}</td>
                      <td className="border p-2 md:p-4">{compareProduct.description}</td>
                    </tr>
                    <tr>
                      <td className="border p-2 md:p-4 font-medium">Category</td>
                      <td className="border p-2 md:p-4 text-center">{selectedProduct.category}</td>
                      <td className="border p-2 md:p-4 text-center">{compareProduct.category}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LatestProducts;