"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import '@fortawesome/fontawesome-free/css/all.min.css';

function Navbar() {
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  // const router = useRouter();

  const toggleMenu = () => {
    setOpen(!open);
  };

  useEffect(() => {
    // Function to handle clicks outside the navbar
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    // Function to handle scroll and close menu
    const handleScroll = () => {
      setOpen(false);
    };

    // Add event listeners
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('scroll', handleScroll);

    // Clean up event listeners
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close menu when pathname changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <main className="border-b-2 bg-neutral-100" ref={navRef}>
      <div className="w-full flex items-center justify-center bg-[#F6F5FF] h-[70px]">
        <div className="sm:w-full md:w-[89%] lg:w-[89%] flex items-center justify-between h-[50px] px-4 relative">
          {/* Hamburger Menu Button */}
       

          <div>
            <h2 className="title-font font-extrabold text-blue-950 tracking-widest text-xl">
              Hekto
            </h2>
          </div>

          {/* Navigation Menu */}
          <div
            className={`${
              open ? "translate-x-0" : "-translate-x-full"
            } md:flex md:translate-x-0 md:static w-[50%] md:w-auto bg-white/90 md:bg-transparent absolute top-0 left-[-58px] smm:left-[-140px] smm:w-[60%] smm:text-right customsm:text-center sm:text-center lg:text-center h-screen md:h-auto z-40 transition-transform duration-500 ease-in-out`}
          >
            <ul className="flex flex-col md:flex-row md:gap-x-2 lg:gap-x-5 xl:gap-x-5 2xl:gap-x-10 sm:text-md md:text-sm lg:text-md xl:text-md text-black">
              {[
                { href: "/home", label: "Home" },
                { href: "/about", label: "Pages" },
                { href: "/product", label: "Products" },
                { href: "/blog", label: "Blog" },
                { href: "/shop", label: "Shop" },
                { href: "/contact", label: "Contact" }
              ].map((link) => (
                <li 
                  key={link.href}
                  className="p-4 hover:underline hover:text-pink-600 underline-offset-2  w-[20%] mx-auto"
                >
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
     
          <div className="flex gap-x-4 items-center">
  {/* Search bar visible on all screens */}
  <div className="w-[200px] md:w-[160px] flex justify-between items-center relative  ">
  <label htmlFor="search" className="bg-[#dad6d6] inline-block pl-[8px] text-left rounded-[3px] w-full">
    <input type="text"  className="bg-[#dad6d6] text-[10px] outline-none w-full" id="search" />
    <span className="bg-[#FB2E86]  absolute right-0 top-0 bottom-0 flex items-center px-2">
      <li className="fa fa-magnifying-glass text-xs"></li>
    </span>
  </label>
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
