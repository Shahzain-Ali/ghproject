"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, X, ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '@/app/types/Product';
import ReviewsSection from "./PreviewComponent";
import { useCart } from '../context/cartContext';

interface ProductListingProps {
  allProducts: Product[];
}

const ProductListing: React.FC<ProductListingProps> = ({ allProducts }) => {
  const { state, dispatch } = useCart();
  const [wishlistedProducts, setWishlistedProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [isCartSidebarOpen, setIsCartSidebarOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  useEffect(() => {
    // Check if we're in the browser environment
    if (typeof window !== 'undefined') {
      const savedWishlist = localStorage.getItem('wishlist');
      
      if (savedWishlist) {
        setWishlistedProducts(JSON.parse(savedWishlist));
      }
    }
  }, []);

  // Hide toast after 3 seconds
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

  const handleQuantityChange = (product: Product, newQuantity: number) => {
    if (newQuantity > 0) {
      dispatch({ 
        type: 'UPDATE_CART', 
        payload: { ...product, quantity: newQuantity } 
      });
    } else {
      dispatch({ 
        type: 'REMOVE_FROM_CART', 
        payload: product._id 
      });
      showToast('Item removed from cart', 'info');
    }
  };

  const handleProductSelect = (product: Product) => {
    const isSelected = selectedProducts.some(p => p._id === product._id);
    
    if (isSelected) {
      setSelectedProducts(selectedProducts.filter(p => p._id !== product._id));
    } else if (selectedProducts.length < 2) {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const handleCompareProducts = () => {
    if (selectedProducts.length === 2) {
      setIsCompareModalOpen(true);
    }
  };

  const calculateTotal = () => {
    return state.cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isProductInCart = (productId: string): boolean => {
    return state.cart.some(item => item._id === productId);
  };

  return (
    <div className="mx-auto px-4 py-6 lg:py-8">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-4 right-4 z-50 px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-lg ${
              toast.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
            } text-white text-sm sm:text-base`}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Section */}
      <div className="relative mb-6 sm:mb-8">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-indigo-900 text-center mb-4 sm:mb-0">
          Products List
        </h2>
        <div className="sm:absolute sm:right-0 sm:top-1/2 sm:-translate-y-1/2 flex justify-center sm:justify-end">
          <button
            onClick={handleCompareProducts}
            disabled={selectedProducts.length !== 2}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base rounded-lg transition flex items-center space-x-2 ${
              selectedProducts.length === 2
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <span>Compare Products</span>
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 customsm:w-[100%] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {allProducts.map((product) => (
          <motion.div 
            key={product._id} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white shadow-lg rounded-xl overflow-hidden transform transition hover:shadow-xl"
            onMouseEnter={() => setHoveredProduct(product._id)}
            onMouseLeave={() => setHoveredProduct(null)}
          >
            <div className="relative">
              {product.image && product.slug?.current && (
                <div className="relative aspect-square bg-[#F6F7FB]">
                  <Link href={`/products/${product.slug.current}`}>
                    <Image 
                      src={product.image.asset.url} 
                      alt={product.name} 
                      fill
                      className="object-contain transition-transform group-hover:opacity-80"
                    />
                  </Link>
                  
                  {/* Hover Overlay for Desktop */}
                  {(hoveredProduct === product._id || window.innerWidth < 768) && (
                    <div className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center">
                      <div className="absolute top-4 right-4 flex flex-col space-y-2">
                        <motion.button
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.preventDefault();
                            handleWishlistToggle(product);
                          }}
                          className="bg-white p-2 rounded-full shadow-md transition-colors duration-300 hover:bg-gray-50"
                        >
                          <Heart
                            size={20}
                            className={wishlistedProducts.some(item => item._id === product._id) 
                              ? 'text-red-500 fill-current' 
                              : 'text-gray-600'}
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
                          className="bg-green-500 text-white px-4 md:px-2 py-2 rounded-md text-sm font-medium hover:bg-green-600 transition-colors"
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
              )}
              
              <div className="p-3 sm:p-4">
                <h3 className="text-base sm:text-lg font-medium text-center text-pink-500">{product.name}</h3>
                <p className="text-xs sm:text-sm text-center text-gray-600 mt-1">Code - {product._id}</p>
                <div className="flex justify-center items-center gap-3 mt-2">
                  <p className="text-base sm:text-lg font-semibold text-indigo-900">£{product.price}</p>
                </div>
                <ReviewsSection productId={product._id} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isCartSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex"
          >
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween' }}
              className="ml-auto w-full max-w-sm sm:w-96 bg-white h-full shadow-xl p-4 sm:p-6 overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold">Your Cart</h2>
                <button 
                  onClick={() => setIsCartSidebarOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>

              {state.cart.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  Your cart is empty
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    {state.cart.map((item) => (
                      <div 
                        key={item._id} 
                        className="flex items-center justify-between border-b pb-4"
                      >
                        <div className="flex items-center space-x-2 sm:space-x-4">
                          <div className="relative w-14 h-14 sm:w-16 sm:h-16">
                            <Image 
                              src={item.image.asset.url} 
                              alt={item.name} 
                              fill
                              className="object-contain"
                            />
                          </div>
                          <div>
                            <h3 className="text-sm sm:text-base font-semibold">{item.name}</h3>
                            <p className="text-xs sm:text-sm text-gray-500">£{item.price}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-1 sm:space-x-2">
                          <button 
                            onClick={() => handleQuantityChange(item, item.quantity - 1)}
                            className="bg-gray-200 p-1 rounded-full"
                          >
                            <Minus size={14} className="sm:w-4 sm:h-4" />
                          </button>
                          <span className="text-sm sm:text-base mx-1">{item.quantity}</span>
                          <button 
                            onClick={() => handleQuantityChange(item, item.quantity + 1)}
                            className="bg-gray-200 p-1 rounded-full"
                          >
                            <Plus size={14} className="sm:w-4 sm:h-4" />
                          </button>
                          <button 
                            onClick={() => {
                              dispatch({ type: 'REMOVE_FROM_CART', payload: item._id });
                              showToast('Item removed from cart', 'info');
                            }}
                            className="text-red-500 hover:text-red-700 ml-2"
                          >
                            <Trash2 size={18} className="sm:w-5 sm:h-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6">
                    <div className="flex justify-between font-bold text-lg sm:text-xl">
                      <span>Total:</span>
                      <span>£{calculateTotal()}</span>
                    </div>
                    <button 
                      className="w-full mt-4 bg-blue-500 text-white py-2 sm:py-3 rounded-lg hover:bg-blue-600 transition text-sm sm:text-base"
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Cart Button */}
      <button
        onClick={() => setIsCartSidebarOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
      >
        <ShoppingCart size={24} />
        {state.cart.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
            {state.cart.length}
          </span>
        )}
      </button>

      {/* Compare Modal */}
      <AnimatePresence>
        {isCompareModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl sm:text-2xl font-bold">Product Comparison</h2>
                <button 
                  onClick={() => setIsCompareModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border p-2 sm:p-3 text-left text-xs sm:text-sm">Attribute</th>
                      <th className="border p-2 sm:p-3 text-xs sm:text-sm">{selectedProducts[0].name}</th>
                      <th className="border p-2 sm:p-3 text-xs sm:text-sm">{selectedProducts[1].name}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border p-2 sm:p-3 font-semibold text-xs sm:text-sm">Price</td>
                      <td className="border p-2 sm:p-3 text-center text-xs sm:text-sm">£{selectedProducts[0].price}</td>
                      <td className="border p-2 sm:p-3 text-center text-xs sm:text-sm">£{selectedProducts[1].price}</td>
                    </tr>
                    <tr>
                      <td className="border p-2 sm:p-3 font-semibold text-xs sm:text-sm">Description</td>
                      <td className="border p-2 sm:p-3 text-xs sm:text-sm">{selectedProducts[0].description}</td>
                      <td className="border p-2 sm:p-3 text-xs sm:text-sm">{selectedProducts[1].description}</td>
                    </tr>
                    <tr>
                      <td className="border p-2 sm:p-3 font-semibold text-xs sm:text-sm">Category</td>
                      <td className="border p-2 sm:p-3 text-center text-xs sm:text-sm">{selectedProducts[0].category}</td>
                      <td className="border p-2 sm:p-3 text-center text-xs sm:text-sm">{selectedProducts[1].category}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductListing;