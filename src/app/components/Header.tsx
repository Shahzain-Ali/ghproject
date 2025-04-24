"use client";
import React, {useEffect, useState} from "react";
import { MdOutlineEmail } from "react-icons/md";
import { FaPhoneVolume } from "react-icons/fa6";
import { FiUser } from "react-icons/fi";
import { FaChevronDown } from "react-icons/fa6";
import { LuShoppingCart } from "react-icons/lu";
import { Josefin_Sans } from "next/font/google";
import { useCart } from '@/app/context/cartContext';
import { ClerkLoaded, SignInButton, useUser, SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import { Check, ChevronDown, Globe, Heart, LogOut } from "lucide-react";
import { useWishlist } from "../context/wishlistContext";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const josefin_Sans = Josefin_Sans({ weight: "400", subsets: ["latin"] });

const Header = () => {
  const { state } = useCart();
  const { user, isLoaded: isUserLoaded } = useUser();
  const { state: wishlistState } = useWishlist();
  const router = useRouter();
  const [currentLocale, setCurrentLocale] = useState('en');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'ur', name: 'Urdu', nativeName: 'اردو' }
  ];

  // Count items
  const wishlistItemCount = wishlistState.wishlist.length;
  const cartItemCount = state.cart.reduce((total, item) => total + item.quantity, 0);

  // Component load hone par current cookie value fetch karein
  useEffect(() => {
    const savedLocale = Cookies.get('NEXT_LOCALE') || 'en';
    setCurrentLocale(savedLocale);
  }, []);

  const handleLanguageSelect = (langCode: string) => {
    Cookies.set("NEXT_LOCALE", langCode, { path: "/" });
    setCurrentLocale(langCode);
    setIsDropdownOpen(false);
    router.refresh();
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.user-menu-container') && isUserMenuOpen) {
        setIsUserMenuOpen(false);
      }
      if (!target.closest('.language-dropdown') && isDropdownOpen) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isUserMenuOpen, isDropdownOpen]);

  const currentLanguage = languages.find(lang => lang.code === currentLocale) || languages[0];

  return (
    <div className={`w-full bg-[#7E33E0] text-[#f1f1f1] flex justify-center sm:mx-auto items-center py-2 px-4 smm:px-0 ${josefin_Sans.className}`}>
      <div className="w-full  max-w-[1170px] flex flex-wrap justify-between px-6 customsm:px-0 items-center gap-y-3">
        {/* Left Section */}
        <div className="flex flex-row sm:flex-row customsm:mx-auto smm:mx-auto sm:mx-auto md:mx-auto sm:items-center gap-4 sm:gap-8">
          {/* Email */}
          <div className="flex items-center gap-2">
            <MdOutlineEmail className="w-4 h-4 text-[#ffffff]" />
            <h1 className="text-sm customsm:text-[11px] sm:text-base font-semibold">alishahzain604@gmail.com</h1>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-2 sm:mx-auto">
            <FaPhoneVolume className="w-4 h-4 text-[#ffffff]" />
            <h1 className="text-sm customsm:text-[11px] sm:text-base font-semibold">(12345)67890</h1>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-wrap items-center justify-center gap-4 customsm:mx-auto smm:mx-auto sm:mx-auto md:mx-auto ">
          {/* Language */}
          <div className="relative language-dropdown">
            <div 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 cursor-pointer text-[#f1f1f1] hover:opacity-80 transition-opacity"
            >
              <Globe className="w-5 h-5" />
              <span className="text-sm font-semibold">{currentLanguage.name}</span>
              <ChevronDown 
                className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} 
              />
            </div>

            {isDropdownOpen && (
              <div className="absolute border right-0 top-full customsm:right-auto customsm:w-[8rem] smm:w-[8rem] sm:w-[10rem] mt-2 w-48 bg-white text-black shadow-lg rounded-lg  border-gray-200 z-50">
                <div className="py-1">
                  {languages.map((lang) => (
                    <div
                      key={lang.code}
                      onClick={() => handleLanguageSelect(lang.code)}
                      className={`
                        flex items-center justify-between px-4 py-2 cursor-pointer 
                        hover:bg-[#7E33E0] hover:text-white transition-colors duration-200
                        ${currentLocale === lang.code ? ' bg-gray-100  ' : ''}
                      `}
                    >
                      <div className="flex flex-col">
                        <span className="font-semibold text-sm">{lang.name}</span>
                        <span className="text-xs opacity-70">{lang.nativeName}</span>
                      </div>
                      {currentLocale === lang.code && (
                        <Check className="w-5 h-5" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Currency */}
          <div className="flex items-center gap-2">
            <h1 className="text-sm customsm:text-[11px] smm:text-[12px] sm:text-base font-semibold">USD</h1>
            <FaChevronDown className="w-4 h-4 customsm:w-3" />
          </div>

          {/* Login/User with Logout - FIXED VERSION */}
          <ClerkLoaded>
            {isUserLoaded && user ? (
              <div className="relative user-menu-container">
                <div 
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                >
                  <span className="text-sm customsm:text-[11px] smm:text-[12px] sm:text-base font-semibold">{user.firstName}</span>
                  <FiUser className="w-4 h-4 customsm:w-3" />
                  <ChevronDown 
                    className={`w-3 h-3 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} 
                  />
                </div>
                
                {/* User dropdown menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-50">
                    <div className="py-1">
                      <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#7E33E0] hover:text-white">
                        Profile
                      </Link>
                      <Link href="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#7E33E0] hover:text-white">
                        My Orders
                      </Link>
                      <SignOutButton>
                        <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#7E33E0] hover:text-white flex items-center">
                          <LogOut className="w-4 h-4 mr-2" />
                          Logout
                        </button>
                      </SignOutButton>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <SignInButton>
                <div className="flex items-center gap-2 cursor-pointer">
                  <h1 className="text-sm customsm:text-[11px] smm:text-[12px] sm:text-base font-semibold">Login</h1>
                  <FiUser className="w-4 h-4 customsm:w-3" />
                </div>
              </SignInButton>
            )}
          </ClerkLoaded>
          
          {/* Clerk not loaded state - will be hidden once Clerk loads */}
          {!isUserLoaded && (
            <div className="flex items-center gap-2">
              <h1 className="text-sm customsm:text-[11px] smm:text-[12px] sm:text-base font-semibold">Login</h1>
              <FiUser className="w-4 h-4 customsm:w-3" />
            </div>
          )}

          {/* Wishlist  */}  
          <div className="relative">
            <Link href="/wishlist" className="cursor-pointer relative">
              <Heart className="w-6 h-6" />
              {wishlistItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistItemCount}
                </span>
              )}
            </Link>
          </div>

          {/* Shopping Cart */}
          <Link href="/shoppingCart" className="cursor-pointer relative">
            <LuShoppingCart className="w-6 h-6 customsm:w-4" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full 
              w-5 h-5 flex items-center justify-center text-xs font-bold">
                {cartItemCount}
              </span>
            )}
          </Link>

          {/* FAQ and Help Center */}
          <div className="flex items-center gap-4">
            <Link href="/faq" className="cursor-pointer">FAQs</Link>
          </div>
          <Link href="/help-center" className="text-sm customsm:text-[11px] smm:text-[12px] sm:text-base font-semibold text-[#f1f1f1] hover:underline">
            Help Center
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;