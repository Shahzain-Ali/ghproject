"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, ShoppingCart } from 'lucide-react';
import { Product } from "@/app/types/Product";

const WishlistPage = () => {
  const [wishlistedProducts, setWishlistedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setWishlistedProducts(JSON.parse(savedWishlist));
    }
  }, []);

  const removeFromWishlist = (productId: string) => {
    const updatedWishlist = wishlistedProducts.filter(item => item._id !== productId);
    setWishlistedProducts(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  const addToCart = (product: Product) => {
    console.log('Product added to cart:', product);
    // Implement cart logic
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Wishlist</h1>

      {wishlistedProducts.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          Your wishlist is empty. Start adding some products!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {wishlistedProducts.map((product) => (
            <div 
              key={product._id} 
              className="border rounded-lg p-4 relative group"
            >
              {product.image?.asset?.url ? (
                <Image 
                  src={product.image.asset.url} 
                  alt={product.name} 
                  width={300} 
                  height={300} 
                  className="w-full h-48 object-cover mb-4"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center mb-4">
                  No Image Available
                </div>
              )}
              
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600">${product.price}</p>
              
              <div className="flex justify-between mt-4">
                {product.slug?.current && (
                  <Link 
                    href={`/products/${product.slug.current}`} 
                    className="text-blue-500 hover:underline"
                  >
                    View Details
                  </Link>
                )}
                
                <div className="flex space-x-2">
                  <button 
                    onClick={() => removeFromWishlist(product._id)}
                    className="text-red-500 hover:bg-red-50 p-2 rounded-full"
                    title="Remove from Wishlist"
                  >
                    <Trash2 size={20} />
                  </button>
                  
                  <button 
                    onClick={() => addToCart(product)}
                    className="text-green-500 hover:bg-green-50 p-2 rounded-full"
                    title="Add to Cart"
                  >
                    <ShoppingCart size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;