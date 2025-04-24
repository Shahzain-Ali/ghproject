"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Heart, ShoppingCart, X } from 'lucide-react';
import { client } from "@/sanity/lib/client";
import { Product } from "@/app/types/Product";
import { groq } from "next-sanity";
// import ReviewsSection from "../PreviewComponent/PreviewComponent";
import { motion } from 'framer-motion';
import { useCart } from "@/app/context/cartContext";
import Link from "next/link";
import { useTranslations } from "next-intl";

const getFeaturedProducts = groq`*[_type == "product" && name in [
  "Varmora Plastic Chair Solid",
  "Hans Wegner Style Three-Legged Shell Chair",
  "Tribù Elio Chair",
  "Sobuy Folding Chair Wooden"
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

const FeaturedProducts = () => {
  const { dispatch, state } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [wishlistedProducts, setWishlistedProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const t = useTranslations();

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
  
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast({ show: false, message: '', type: '' });
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [toast]);
  
  const showToast = (message: string, type: string) => {
    setToast({ show: true, message, type });
  };

  const handleCartToggle = (product: Product) => {
    const existingCartItem = state.cart.find(item => item._id === product._id);
    
    if (existingCartItem) {
      dispatch({ 
        type: 'REMOVE_FROM_CART', 
        payload: product._id 
      });
      showToast('Item removed from cart', 'info');
    } else {
      dispatch({ 
        type: 'ADD_TO_CART', 
        payload: { ...product, quantity: 1 } 
      });
      showToast('Successfully item added to cart', 'success');
    }
  };
  
  // const isProductInCart = (productId: string): boolean => {
  //   return state.cart.some(item => item._id === productId);
  // };
  
  const handleProductSelect = (product: Product) => {
    setSelectedProducts(prev => {
      const isSelected = prev.some(p => p._id === product._id);
      if (isSelected) {
        return prev.filter(p => p._id !== product._id);
      }
      if (prev.length < 2) {
        return [...prev, product];
      }
      return prev;
    });
  };

  const handleWishlistToggle = (product: Product) => {
    let updatedWishlist: Product[];
    const isAlreadyWishlisted = wishlistedProducts.some(item => item._id === product._id);
    
    if (isAlreadyWishlisted) {
      updatedWishlist = wishlistedProducts.filter(item => item._id !== product._id);
      showToast('Item removed from wishlist', 'info');
    } else {
      updatedWishlist = [...wishlistedProducts, product];
      showToast('Successfully item added to wishlist', 'success');
    }

    setWishlistedProducts(updatedWishlist);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    }
  };

  return (
    <div className="md:w-[100%] mx-auto px-4 sm:px-6 lg:px-4 lg:w-[90%] py-8 ">
      {/* Toast Notification */}
      {toast.show && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-2 rounded-md shadow-lg ${
          toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
        }`}>
          {toast.message}
        </div>
      )}
      
      <div className="relative mb-8 smm:mb-4 ">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-indigo-900 text-center">
            {t('featuredProducts.heading')}
        </h2>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 customsm:relative customsm:text-center customsm:mt-8 custom:text-center smm:relative smm:mt-8 smm:text-center">
          <button
            onClick={() => selectedProducts.length === 2 && setIsCompareModalOpen(true)}
            disabled={selectedProducts.length !== 2}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base rounded transition-colors whitespace-nowrap ${
              selectedProducts.length === 2
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Compare Products
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 p-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-4 lg:gap-4 md:p-0 lg:p-0">
        {products.map((product) => (
          <motion.div
            key={product._id}
            className="relative bg-white rounded-lg shadow-lg hover:shadow-md transition-all duration-300"
            onMouseEnter={() => setHoveredProduct(product._id)}
            onMouseLeave={() => setHoveredProduct(null)}
          >
            <div className="relative aspect-square overflow-hidden rounded-t-lg bg-[#F6F7FB]">
              {product.image?.asset?.url && (
                <Image
                  src={product.image.asset.url}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              )}
              
              {/* Hover Overlay */}
              {hoveredProduct === product._id && (
                <div className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center">
                  <div className="absolute top-4 right-4 flex flex-col space-y-2">
                    <motion.button
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white p-2 rounded-full shadow-md hover:bg-gray-50"
                      onClick={(e) => {
                        e.preventDefault();
                        handleWishlistToggle(product);
                      }}
                    >
                      <Heart
                        size={20}
                        className={wishlistedProducts.some(item => item._id === product._id) ? 'text-red-500 fill-current' : 'text-gray-600'}
                      />
                    </motion.button>
                    
                    <motion.button initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} 
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleCartToggle(product); }} 
                    className="bg-white p-2 rounded-full shadow-md transition-colors duration-300 hover:bg-gray-50" > 
                    <ShoppingCart size={20}
                     className={`transition-colors duration-300 ${ state.cart.some(item => item._id === product._id) ? 'text-blue-500 fill-current' : 'text-gray-600' }`} />
                    </motion.button>
                                        
                                          
                  </div>
                  
                  <Link
                    href={`/products/${product.slug.current}`}
                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
                  >
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-green-500 text-white w-[100px] h-[30px] rounded-md text-sm font-medium hover:bg-green-600 transition-colors"
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
                      className="form-checkbox h-4 w-4 sm:h-5 sm:w-5 text-indigo-600 rounded border-gray-300"
                    />
                  </motion.div>
                </div>
              )}
            </div>
            
            <div className="p-3 sm:p-4">
              <h3 className="text-base sm:text-lg font-medium text-center text-pink-500">
                {t(`featuredProducts.${product.name}`)}
              </h3>
              <p className="text-xs sm:text-sm text-center text-gray-600 mt-1">Code - {product._id}</p>
              <div className="flex justify-center items-center gap-3 mt-2">
                <span className="text-base sm:text-lg font-semibold text-indigo-900">
                  ${product.price}
                </span>
                {product.discountPercentage && (
                  <span className="text-xs sm:text-sm text-gray-400 line-through">
                    ${(product.price * (1 + product.discountPercentage/100)).toFixed(2)}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Comparison Modal */}
      {isCompareModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl sm:text-2xl font-bold">Product Comparison</h2>
              <button 
                onClick={() => setIsCompareModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 sm:p-3 text-left">Attribute</th>
                    <th className="border p-2 sm:p-3">{selectedProducts[0]?.name}</th>
                    <th className="border p-2 sm:p-3">{selectedProducts[1]?.name}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2 sm:p-3 font-semibold">Price</td>
                    <td className="border p-2 sm:p-3 text-center">${selectedProducts[0]?.price}</td>
                    <td className="border p-2 sm:p-3 text-center">${selectedProducts[1]?.price}</td>
                  </tr>
                  <tr>
                    <td className="border p-2 sm:p-3 font-semibold">Description</td>
                    <td className="border p-2 sm:p-3">{selectedProducts[0]?.description}</td>
                    <td className="border p-2 sm:p-3">{selectedProducts[1]?.description}</td>
                  </tr>
                  <tr>
                    <td className="border p-2 sm:p-3 font-semibold">Category</td>
                    <td className="border p-2 sm:p-3 text-center">{selectedProducts[0]?.category}</td>
                    <td className="border p-2 sm:p-3 text-center">{selectedProducts[1]?.category}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default FeaturedProducts;