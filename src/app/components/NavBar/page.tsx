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
  // const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="border-b-2 " ref={navRef}>
      <div className="w-full flex items-center justify-center  h-[70px]">
        <div className="sm:w-full md:w-[89%] lg:w-[89%] flex items-center justify-between h-[50px] px-4 relative">
          {/* Hamburger Menu Button */}
       

          <div>
            <h2 className="title-font font-extrabold text-blue-950 tracking-widest text-xl">
              Hekto
            </h2>
          </div>
{/* Navigation menu */}
          <div
      className={`${
        open ? "translate-x-0" : "-translate-x-full"
      } md:flex md:translate-x-0 md:static w-[20%] md:w-auto bg-white/90 md:bg-transparent absolute top-0 right-0  sm:left-[-10px] md:left-[-60px] lg:left-[-78px] smm:left-[-150px] smm:w-[60%] customsm:left-[-50px] customsm:w-[50%] smm:text-center customsm:text-center sm:text-center lg:text-center h-screen md:h-auto z-40 transition-transform duration-500 ease-in-out`}
    >
      <ul className="flex flex-col md:flex-row md:gap-x-2 lg:gap-x-5 xl:gap-x-5 2xl:gap-x-10 sm:text-md md:text-sm lg:text-md xl:text-md text-black">
        {[
          {
            href: "/home",
            label: "Home",
            dropdown: [
              { label: "Hekto Demo", href: "/demopage" },
              { label: "Trending Products", href: "/trendingproduct" },
              { label: "Grid Default", href: "/griddefault" },
              { label: "FAQ", href: "/faq" },
              { label: "Refund Product", href: "/refundableproduct" },
            ],
          },
          { href: "/about", label: "Pages" },
          { href: "/product", label: "Products" },
          { href: "/blog", label: "Blog" },
          { href: "/shop", label: "Shop" },
          { href: "/contact", label: "Contact" },
        ].map((link) => (
          <li 
            key={link.href}
            className="relative group p-4 hover:underline hover:text-pink-600 underline-offset-2 w-full md:w-auto mx-auto"
          >
            <div className="flex items-center customsm:w-[70px] lg:w-[70px] lg:ml-[50px]  customsm:ml-[50px] smm:w-[70px] smm:ml-[90px]">
              <Link href={link.href}>
                {link.label}
              </Link>

              {/* Add Dropdown Icon */}
              {link.dropdown && (
                <span className="ml-2">
                  <i className="fa-solid fa-caret-down hidden md:block lg:hidden"></i>
                  <i className="fa-solid fa-caret-right hidden md:hidden lg:block smm:block sm:block customsm:block"></i>
                </span>
              )}
            </div>

            {/* Dropdown Menu */}
            {link.dropdown && (
              <ul className="absolute customsm:right-[-72%] lg:left-[65%] smm:right-[-65%] md:top-10  bg-opacity-60 sm:landscape:right-[-70%] sm:right-[-20%] right-[55%] md:left-0 top-[0px] hidden group-hover:block bg-white shadow-lg mt-2 rounded-md w-40 z-50">
                {link.dropdown.map((item) => (
                  <li
                    key={item.href}
                    className="p-2 hover:bg-pink-600 hover:text-white cursor-pointer"
                  >
                    <Link href={item.href}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
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
