/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";
import { MdOutlineEmail } from "react-icons/md";
import { FaPhoneVolume } from "react-icons/fa6";
import { FiUser } from "react-icons/fi";
import { FaChevronDown, FaRegHeart} from "react-icons/fa6";
import { LuShoppingCart } from "react-icons/lu";
import { Josefin_Sans } from "next/font/google";
import { useRouter } from "next/navigation";
import { useCart } from '@/app/context/cartContext';
import { FaSearch } from "react-icons/fa";

const josefin_Sans = Josefin_Sans({ weight: "400", subsets: ["latin"] });

const languages = [
  { code: 'en', name: 'English' },
  { code: 'ur', name: 'Urdu' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'es', name: 'Español' }
];

const Header = () => {
  const router = useRouter();
  const { state } = useCart();
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [faqs, setFaqs] = useState([
    { question: 'What is your return policy?', answer: 'Our return policy is 30 days from the date of purchase.' },
    { question: 'How do I track my order?', answer: 'You can track your order by logging into your account and checking the order status.' },
    { question: 'Do you offer international shipping?', answer: 'Yes, we offer international shipping to select countries.' },
    { question: 'What payment methods do you accept?', answer: 'We accept Visa, Mastercard, American Express, and PayPal.' }
  ]);

  const navigateToWishlist = () => {
    router.push("/wishlist");
  };

  const cartItemCount = state.cart.reduce((total, item) => total + item.quantity, 0);

  const toggleLanguageDropdown = () => {
    setLanguageDropdownOpen(!languageDropdownOpen);
  };

  const handleLanguageSelect = (language: React.SetStateAction<{ code: string; name: string; }>) => {
    setSelectedLanguage(language);
    setLanguageDropdownOpen(false);
  };


  return (
    <div
      className={`w-full bg-[#7E33E0] text-[#f1f1f1] flex justify-center sm:mx-auto items-center py-2 px-4 smm:px-0  ${josefin_Sans.className}`}
    >
      <div className="w-full max-w-[1170px]  flex flex-wrap  justify-between px-6 customsm:px-0 items-center gap-y-3 ">
        {/* Left Section */}
        <div className="flex flex-row sm:flex-row customsm:mx-auto smm:mx-auto sm:mx-auto sm:items-center gap-4 sm:gap-8 ">
          {/* Email */}
          <div className="flex items-center gap-2">
            <MdOutlineEmail className="w-4 h-4 text-[#ffffff]" />
            <h1 className="text-sm customsm:text-[11px] sm:text-base font-semibold">mhhasanul@gmail.com</h1>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-2 sm:mx-auto ">
            <FaPhoneVolume className="w-4 h-4 text-[#ffffff]" />
            <h1 className="text-sm customsm:text-[11px] sm:text-base font-semibold">(12345)67890</h1>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-wrap items-center justify-end gap-4 customsm:mx-auto  smm:mx-auto sm:mx-auto ">
          {/* Language */}
          <div className="relative">
            <div 
              className="flex items-center gap-2 cursor-pointer"
              onClick={toggleLanguageDropdown}
            >
              <h1 className="text-sm customsm:text-[11px] sm:text-base font-semibold">
                {selectedLanguage.name}
              </h1>
              <FaChevronDown 
                className={`w-4 h-4 customsm:w-3 transition-transform ${languageDropdownOpen ? 'rotate-180' : ''}`} 
              />
            </div>
            {languageDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 bg-white text-black shadow-lg rounded-md z-10">
                {languages.map((lang) => (
                  <div 
                    key={lang.code} 
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleLanguageSelect(lang)}
                  >
                    {lang.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Currency */}
          <div className="flex items-center gap-2">
            <h1 className="text-sm customsm:text-[11px] sm:text-base font-semibold">USD</h1>
            <FaChevronDown className="w-4 h-4 customsm:w-3" />
          </div>

          {/* Login */}
          <div className="flex items-center gap-2">
            <h1 className="text-sm customsm:text-[11px] sm:text-base font-semibold">Login</h1>
            <FiUser className="w-4 h-4 customsm:w-3" />
          </div>

          {/* Wishlist */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={navigateToWishlist}
          >
            <h1 className="text-sm customsm:text-[11px] sm:text-base font-semibold">Wishlist</h1>
            <FaRegHeart className="w-4 h-4 customsm:w-3" />
          </div>

          {/* Shopping Cart */}
          <a href="/shoppingCurt" className="cursor-pointer relative">
           <LuShoppingCart className="w-6 h-6 customsm:w-4" />
           {cartItemCount > 0 && (
             <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full 
             w-5 h-5 flex items-center justify-center text-xs font-bold">
               {cartItemCount}
             </span>
           )}
         </a>

         {/* FAQ and Help Center */}
         <div className="flex items-center gap-4">
             <a href="/faq" className="cursor-pointer"> FAQs </a>

           </div>
           <a href="/help-center" className="text-sm customsm:text-[11px] sm:text-base font-semibold text-[#f1f1f1] hover:underline">
             Help Center
           </a>
         </div>
        </div>
      </div>

  );
};

export default Header;