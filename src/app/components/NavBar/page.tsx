"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import '@fortawesome/fontawesome-free/css/all.min.css';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleScroll = () => {
      setIsMobileMenuOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    {
      href: "/home",
      label: "Home",
      dropdown: [
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
  ];

  return (
    <nav className="border-b-2 " ref={navRef}>
      <div className="max-w-7xl mx-auto px-4 h-[70px]  lg:w-[90%]">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h2 className="title-font font-extrabold text-blue-950 tracking-widest text-xl">
              Hekto
            </h2>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-black focus:outline-none"
            >
              <i className="fa fa-bars"></i>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4 lg:flex lg:items-center lg:space-x-8  flex-grow justify-center ">
            <ul className="flex justify-center space-x-6 lg:space-x-12 lg:text-[18px] lg:w-[100%] ">
              {navLinks.map((link) => (
                <li key={link.href} className="relative group">
                  <Link 
                    href={link.href}
                    className="text-black hover:text-pink-600 hover:underline underline-offset-2 py-2"
                  >
                    {link.label}
                  </Link>
                  {link.dropdown && (
                    <ul className="absolute left-0 hidden group-hover:block bg-white shadow-lg mt-2 rounded-md w-48 z-50">
                      {link.dropdown.map((item) => (
                        <li key={item.href}>
                          <Link 
                            href={item.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-600 hover:text-white"
                          >
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

          {/* Search Bar */}
          <div className="hidden md:block lg:block ">
            <div className="relative">
              <input
                type="text"
                className="bg-[#dad6d6] text-sm rounded-sm pl-3 pr-10 py-1.5 w-[200px] focus:outline-none"
                placeholder="Search..."
              />
              <button className="absolute right-0 top-0 h-full bg-[#FB2E86] px-3 rounded-r-sm">
                <i className="fa fa-magnifying-glass text-white text-xs"></i>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`
            md:hidden 
            lg:hidden
            fixed inset-y-0 left-0 w-64 
            bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50
            ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          `}>
            <div className="p-6">
              <ul className="space-y-4">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href}
                      className="block text-black hover:text-pink-600"
                    >
                      {link.label}
                    </Link>
                    {link.dropdown && (
                      <ul className="ml-4 mt-2 space-y-2">
                        {link.dropdown.map((item) => (
                          <li key={item.href}>
                            <Link 
                              href={item.href}
                              className="block text-sm text-gray-600 hover:text-pink-600"
                            >
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
              {/* Mobile Search */}
              <div className="mt-6">
                <div className="relative">
                  <input
                    type="text"
                    className="bg-[#dad6d6] text-sm rounded-md pl-3 pr-10 py-1.5 w-full focus:outline-none"
                    placeholder="Search..."
                  />
                  <button className="absolute right-0 top-0 h-full bg-[#FB2E86] px-3 rounded-r-md">
                    <i className="fa fa-magnifying-glass text-white text-xs"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;