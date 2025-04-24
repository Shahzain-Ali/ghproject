'use client';

import Image from "next/image";
import Link from "next/link";
import { Trash2, ShoppingCart } from 'lucide-react';
import { Product } from "@/app/types/Product";
import { useWishlist } from "@/app/context/wishlistContext";
import { useCart } from "@/app/context/cartContext";

const WishlistPage = () => {
  const { state: wishlistState, dispatch: wishlistDispatch } = useWishlist();
  const { state: cartState, dispatch: cartDispatch } = useCart();

  const removeFromWishlist = (productId: string) => {
    wishlistDispatch({ type: 'REMOVE_FROM_WISHLIST', payload: productId });
  };

  const resetWishlist = () => {
    wishlistDispatch({ type: 'CLEAR_WISHLIST' });
  };

  const addToCart = (product: Product) => {
    if (!product._id) return; // safety check

    const isAlreadyInCart = cartState.cart.some(item => item._id === product._id);
    if (isAlreadyInCart) {
      cartDispatch({
        type: 'ADD_TO_CART',
        payload: {
          ...product,
          quantity: 1
        }
      });
    } else {
      cartDispatch({
        type: 'ADD_TO_CART',
        payload: {
          ...product,
          quantity: 1
        }
      });
    }

    // Optionally remove from wishlist after adding to cart
    // removeFromWishlist(product._id);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Wishlist</h1>
        {wishlistState.wishlist.length > 0 && (
          <button
            onClick={resetWishlist}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
          >
            Reset Wishlist
          </button>
        )}
      </div>

      {wishlistState.wishlist.length === 0 ? (
        <div className="text-center text-gray-500 py-8 bg-gray-100 rounded-lg">
          <p className="text-xl mb-4">Your wishlist is empty. Start adding some products!</p>
          <Link 
            href="/products" 
            className="inline-block px-6 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-700 transition"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {wishlistState.wishlist.map((product) => (
            <div 
              key={product._id} 
              className="border rounded-lg p-4 relative group shadow-sm hover:shadow-md transition-shadow"
            >
              {product.image?.asset?.url ? (
                <Image 
                  src={product.image.asset.url} 
                  alt={product.name} 
                  width={300} 
                  height={300} 
                  className="w-full h-48 object-cover mb-4 rounded-md"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center mb-4 rounded-md">
                  No Image Available
                </div>
              )}
              
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-4">${product.price}</p>
              
              <div className="flex justify-between items-center">
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
                    className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors"
                    title="Remove from Wishlist"
                  >
                    <Trash2 size={20} />
                  </button>
                  
                  <button 
                    onClick={() => addToCart(product)}
                    className="text-green-500 hover:bg-green-50 p-2 rounded-full transition-colors"
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
