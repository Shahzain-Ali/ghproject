import React from "react";
import { MdOutlineEmail } from "react-icons/md";
import { FaPhoneVolume } from "react-icons/fa6";
import { FiUser } from "react-icons/fi";
import { FaChevronDown, FaRegHeart } from "react-icons/fa6";
import { LuShoppingCart } from "react-icons/lu";
import { Josefin_Sans } from "next/font/google";

const josefin_Sans = Josefin_Sans({ weight: "400", subsets: ["latin"] });

const Header = () => {
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
          <div className="flex items-center gap-2">
            <h1 className="text-sm customsm:text-[11px] sm:text-base font-semibold">English</h1>
            <FaChevronDown className="w-4 h-4 customsm:w-3" />
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
          <div className="flex items-center gap-2">
            <h1 className="text-sm customsm:text-[11px] sm:text-base font-semibold">Wishlist</h1>
            <FaRegHeart className="w-4 h-4 customsm:w-3" />
          </div>

          {/* Shopping Cart */}
          <LuShoppingCart className="w-6 h-6 customsm:w-4" />
        </div>
      </div>
    </div>
  );
};

export default Header;
