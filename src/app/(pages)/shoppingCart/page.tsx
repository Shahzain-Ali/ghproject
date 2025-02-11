'use client';

// import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import dynamic from 'next/dynamic';

const ShoppingBasket = dynamic(
  () => import("../../components/ShoppingBasket"),
  { 
    ssr: false,
    loading: () => (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <p className="text-xl text-gray-600">Loading cart...</p>
      </div>
    )
  }
);

const CartPage = () => {
  return (
    <>
        <div className="w-full flex justify-center sm:mx-auto items-center min-h-screen">
          <ShoppingBasket />
        </div>
      
    </>
  );
};

export default CartPage;