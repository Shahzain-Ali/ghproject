'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { Product } from '@/app/types/Product';
import { urlFor } from '@/sanity/lib/image';
import { useCart } from '@/app/context/cartContext';
import { motion } from 'framer-motion';
import { AlertCircle, ShoppingCart, Zap } from 'lucide-react';

interface ProductClientProps {
  product: Product;
}

const ProductClient: React.FC<ProductClientProps> = ({ product }) => {
  const { dispatch } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState<string | null>(null);

  // Calculate total price with dynamic pricing strategy
  const totalPrice = useMemo(() => {
    if (quantity <= 1) return product.price;
    
    // Implement volume-based pricing strategy
    const discountTiers = [
      { threshold: 3, discount: 0.05 },  // 5% off for 3-5 items
      { threshold: 6, discount: 0.10 },  // 10% off for 6-9 items
      { threshold: 10, discount: 0.15 }  // 15% off for 10+ items
    ];

    const applicableDiscount = discountTiers.find(tier => quantity >= tier.threshold);
    
    if (applicableDiscount) {
      return Number((product.price * quantity * (1 - applicableDiscount.discount)).toFixed(2));
    }

    return product.price * quantity;
  }, [product.price, quantity]);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) {
      setError("Quantity must be at least 1");
      return;
    }

    if (newQuantity > 20) {
      setError("Maximum order quantity is 20");
      return;
    }

    setError(null);
    setQuantity(newQuantity);
  };

  const addToCart = () => {
    if (error) return;

    dispatch({ 
      type: 'ADD_TO_CART', 
      payload: {
        ...product,
        quantity: quantity,
        totalPrice: totalPrice
      }
    });
  };

  const imageUrl = product.image?.asset 
  ? urlFor(product.image.asset)
    .width(800)
    .height(900)
    .fit('max')
    .url()
  : '/placeholder-image.jpg';

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen flex flex-col  items-center p-6 border-4 border-bl"
    >
      <div className="max-w-5xl h-[45rem] w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-8 grid md:grid-cols-2 lg:grid-cols-2 gap-10">
          {/* Image Section */}
          <div className="space-y-6">
            <motion.div 
              className="relative h-[500px] rounded-xl overflow-hidden shadow-lg"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image
                src={imageUrl}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw "
                className="object-contain"
              />
            </motion.div>
            
            {/* Thumbnail Gallery */}
            <div className="flex gap-4 justify-center">
              {[1, 2, 3].map((index) => (
                <motion.div 
                  key={index} 
                  className="relative w-24 h-24 cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Image
                    src={imageUrl}
                    alt={`${product.name} Thumbnail ${index}`}
                    fill
                    className="object-cover rounded-lg"
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Product Details Section */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-4 text-gray-900">{product.name}</h1>
              <p className="text-gray-600 mb-6">{product.description}</p>
            </div>

            <div className="space-y-6">
              {/* Pricing and Discount Logic */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-blue-800">
                    £{totalPrice}
                  </span>
                  {quantity > 1 && (
                    <span className="text-sm text-blue-600">
                      {quantity > 3 ? "Volume Discount Applied!" : ""}
                    </span>
                  )}
                </div>
              </div>

              {/* Quantity Control */}
              <div className="flex items-center space-x-4">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="p-2 bg-gray-200 rounded-full"
                >
                  -
                </motion.button>
                
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(Number(e.target.value))}
                  min="1"
                  max="20"
                  className="w-16 text-center border rounded p-2"
                />
                
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="p-2 bg-gray-200 rounded-full"
                >
                  +
                </motion.button>
              </div>

              {/* Error Handling */}
              {error && (
                <div className="flex items-center text-red-500 space-x-2">
                  <AlertCircle size={20} />
                  <span>{error}</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={addToCart}
                  disabled={!!error}
                  className="flex items-center justify-center space-x-2 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                >
                  <ShoppingCart size={20} />
                  <span>Add to Cart</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center space-x-2 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  <Zap size={20} />
                  <span>Buy Now</span>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductClient;