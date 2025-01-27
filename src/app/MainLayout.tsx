'use client';

import { usePathname } from "next/navigation";
import Header from "./components/Header/page";
import Navbar from "./components/NavBar/page";
import Footer from "./components/Footer/page";
import { CartProvider } from '@/app/context/cartContext';

export default function MainLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isStudioPage = pathname?.startsWith('/studio');

  return (
  
    <CartProvider>
      {!isStudioPage && (
        <>
          <Header/>
          <Navbar/>
        </>
      )}
      {children}
      {!isStudioPage && <Footer/>}
    </CartProvider>
    
  );
}