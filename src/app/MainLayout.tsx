'use client';

import { usePathname } from "next/navigation";
import Header from "./components/Header";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import { CartProvider } from '@/app/context/cartContext';
import { WishlistProvider } from '@/app/context/wishlistContext';

export default function MainLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isStudioPage = pathname?.startsWith('/studio');

  return (
  
    <CartProvider>
      <WishlistProvider>
      {!isStudioPage && (
        <>
          <Header/>
          <Navbar/>
        </>
      )}
      {children}
      {!isStudioPage && <Footer/>}
      </WishlistProvider>
    </CartProvider>
    
  );
}