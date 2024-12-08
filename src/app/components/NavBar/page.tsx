"use client";
import Link from "next/link";
import { useState } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';

function Navbar() {
  const [open, setOpen] = useState(false); // Add state for open toggle

  const toggleMenu = () => {
    setOpen(!open); // Toggle open state when button is clicked
  };

  return (
    <main className="border-b-2 bg-neutral-100">
      <div className="w-full flex items-center justify-center bg-white h-[70px]">
        {/* all content */}
        <div className="sm:w-full md:w-[80%] flex items-center justify-between h-[50px] px-4">

          <div>
            {/* logo */}
            <h2 className="title-font font-extrabold text-blue-950 tracking-widest text-xl">
              Hekto
            </h2>
          </div>

          {/* links - animated sliding nav */}
          <div
            className={`${
              open ? "translate-x-0" : "-translate-x-full"
            } md:flex md:translate-x-0 md:static w-[50%] md:w-auto bg-gray-800 md:bg-transparent absolute top-0 left-0 h-screen md:h-auto z-40 transition-transform duration-500 ease-in-out`}
          >
            <ul className="flex flex-col md:flex-row md:gap-x-2 lg:gap-x-5 xl:gap-x-5 2xl:gap-x-10 sm:text-md md:text-sm lg:text-md xl:text-md text-white md:text-black ">
              <li className="p-4 hover:underline hover:text-pink-600 underline-offset-2">
                <Link href="/">Home</Link>
              </li>
              <li className="p-4 hover:underline hover:text-pink-600 underline-offset-2">
                <Link href="/pages">Pages</Link>
              </li>
              <li className="p-4 hover:underline hover:text-pink-600 underline-offset-2">
                <Link href="/products">Products</Link>
              </li>
              <li className="p-4 hover:underline hover:text-pink-600 underline-offset-2">
                <Link href="/blog">Blog</Link>
              </li>
              <li className="p-4 hover:underline hover:text-pink-600 underline-offset-2">
                <Link href="/shop">Shop</Link>
              </li>
              <li className="p-4 hover:underline hover:text-pink-600 underline-offset-2">
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          <div className="flex gap-x-4 items-center">
  {/* Search bar visible on all screens */}
  <div className="flex w-full bg-gray-200 rounded-sm items-center">
    <input
      className="w-full bg-gray-200 outline-none pl-2"
      type="search"
      placeholder="Search"
    />
    <i className="fa fa-search text-xl  bg-pink-600 px-1 py-1 text-white rounded-sm h-full w-[30px]"></i>
  </div>

            {/* Toggle Button for mobile */}
            <button onClick={toggleMenu} className="md:hidden p-2 text-black">
              <i className="fa fa-bars"></i> {/* Hamburger menu icon */}
            </button>
          </div>

        </div>
      </div>
    </main>
  );
}

export default Navbar;
