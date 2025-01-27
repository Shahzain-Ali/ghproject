// page.tsx
'use client';

import React from "react";
import dynamic from 'next/dynamic';

const ShoppingBasket = dynamic(
  () => import("../../components/ShoppingBasket/ShoppingBasket"),
  { 
    ssr: false,
    loading: () => (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
          Your Shopping Cart
        </h1>
        <div className="text-center py-12 bg-gray-100 rounded-lg">
          <p className="text-xl text-gray-600">Loading cart...</p>
        </div>
      </div>
    )
  }
);

const Cart: React.FC = () => {
  return (
    <div className="w-full flex justify-center sm:mx-auto items-center min-h-screen">
      <ShoppingBasket />
    </div>
  );
};

export default Cart;