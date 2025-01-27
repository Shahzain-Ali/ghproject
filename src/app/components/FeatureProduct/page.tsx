"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Heart, X, ShoppingCart } from 'lucide-react';
import { client } from "@/sanity/lib/client";
import { Product } from "@/app/types/Product";
import { groq } from "next-sanity";
import ReviewsSection from "../PreviewComponent/PreviewComponent";
import { motion } from 'framer-motion';
import { useCart } from "@/app/context/cartContext";

const getFeaturedProducts = groq`*[_type == "product"] {
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
    const isInCart = state.cart.some(item => item._id === product._id);
    
    if (isInCart) {
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

  const isProductInCart = (productId: string) => {
    return state.cart.some(item => item._id === productId);
  };

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

  const featuredProductNames = [
    "Varmora Plastic Chair Solid", 
    "Hans Wegner Style Three-Legged Shell Chair", 
    "Tribù Elio Chair", 
    "Sobuy Blue Folding Chair Wooden Padded"
  ];

  const featuredProducts = products.filter(product => 
    featuredProductNames.includes(product.name)
  );

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-6 border-4 text-center">
        <h2 className="text-2xl font-bold">Featured Products</h2>
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {featuredProducts.map((product) => (
          <motion.div 
            key={product._id}
            className="border rounded-lg p-4 relative group shadow-sm hover:shadow-md transition-shadow"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute top-2 left-2 z-20">
              <input 
                type="checkbox"
                checked={selectedProducts.some(p => p._id === product._id)}
                onChange={() => handleProductSelect(product)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
            </div>

            {product.image?.asset?.url && (
              <div className="relative">
                <Image 
                  src={product.image.asset.url} 
                  alt={product.name} 
                  width={500} 
                  height={500} 
                  className="w-full h-64 object-cover mb-4 rounded"
                />
                <div className="absolute top-2 right-2 z-20 flex flex-col space-y-2">
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddToWishlist(product);
                    }}
                    className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
                  >
                    <Heart 
                      className={`${
                        wishlistedProducts.some(item => item._id === product._id)
                          ? 'text-red-500 fill-current' 
                          : 'text-gray-500'
                      }`} 
                      size={20} 
                    />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleCartToggle(product)}
                    className={`rounded-full p-2 shadow-md transition-all duration-300 ${
                      isProductInCart(product._id)
                        ? 'bg-blue-500 hover:bg-blue-600'
                        : 'bg-white hover:bg-gray-100'
                    }`}
                  >
                    <ShoppingCart 
                      size={20} 
                      className={`transition-colors duration-300 ${
                        isProductInCart(product._id) ? 'text-white' : 'text-gray-500'
                      }`}
                    />
                  </motion.button>
                </div>
                <ReviewsSection productId={product._id} />
              </div>
            )}
            <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
            <p className="text-xl font-bold text-blue-600">${product.price}</p>
            {product.description && (
              <p className="text-sm text-gray-500 mt-2 line-clamp-2">{product.description}</p>
            )}
          </motion.div>
        ))}
      </div>

      {isCompareModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg p-6 w-11/12 max-w-4xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Product Comparison</h2>
              <button 
                onClick={() => setIsCompareModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-3 text-left">Attribute</th>
                  <th className="border p-3">{selectedProducts[0]?.name}</th>
                  <th className="border p-3">{selectedProducts[1]?.name}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-3 font-semibold">Price</td>
                  <td className="border p-3 text-center">${selectedProducts[0]?.price}</td>
                  <td className="border p-3 text-center">${selectedProducts[1]?.price}</td>
                </tr>
                <tr>
                  <td className="border p-3 font-semibold">Description</td>
                  <td className="border p-3">{selectedProducts[0]?.description}</td>
                  <td className="border p-3">{selectedProducts[1]?.description}</td>
                </tr>
                <tr>
                  <td className="border p-3 font-semibold">Category</td>
                  <td className="border p-3 text-center">{selectedProducts[0]?.category}</td>
                  <td className="border p-3 text-center">{selectedProducts[1]?.category}</td>
                </tr>
              </tbody>
            </table>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default FeaturedProducts;

