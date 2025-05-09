"use client"
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useTranslations } from "next-intl";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const t = useTranslations('Navigation')

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        navRef.current && !navRef.current.contains(event.target as Node) && 
        hamburgerRef.current && !hamburgerRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
  
    return () => {
      document.removeEventListener('mousedown', handleClickOutside); // Properly remove event listener
    };
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const toggleMobileMenu = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default behavior
    e.stopPropagation(); // Stop event from bubbling
    setIsMobileMenuOpen(prevState => !prevState);
  };

  const navLinks = [
    {
      href: "/home",
      label: t('Home'),
      dropdown: [
        { label: "Trending Products", href: "/trendingproduct" },
        { label: "Grid Default", href: "/griddefault" },
        { label: "FAQ", href: "/faq" },
        { label: "Refund Product", href: "/refundableproduct" },
      ],
    },
    { href: "/about", label: t('Pages') },
    { href: "/products", label: t('Products')  },
    { href: "/blog", label: t('Blog') },
    { href: "/shop", label: t('Shop')  },
    { href: "/contact", label: t('Contact') },
  ];

  return (
    <nav className="border-b-2" ref={navRef}>
      <div className="max-w-7xl mx-auto px-4 h-[70px] lg:w-[90%]">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h2 className="title-font font-extrabold text-blue-950 tracking-widest text-xl">
              Hekto
            </h2>
          </div>

          {/* Mobile Menu Button with Hamburger Style */}
          <div className="md:hidden lg:hidden mr-4">
            <button
              ref={hamburgerRef}
              onClick={toggleMobileMenu}
              className="relative flex items-center justify-center w-10 h-8 cursor-pointer z-50 focus:outline-none"
            >
              <div 
                className={`
                  w-[30px] h-[3px] bg-black rounded-md relative transition-all duration-500 ease-in-out 
                  ${isMobileMenuOpen ? 'bg-transparent before:rotate-45 before:translate-x-[5px] before:translate-y-[5px] after:-rotate-45 after:translate-x-[5px] after:-translate-y-[5px]' : ''}
                  before:content-[''] before:absolute before:w-[30px] before:h-[3px] before:bg-black before:rounded-md before:transition-all before:duration-500 before:ease-in-out before:-translate-y-[10px]
                  after:content-[''] after:absolute after:w-[30px] after:h-[3px] after:bg-black after:rounded-md after:transition-all after:duration-500 after:ease-in-out after:translate-y-[10px]
                `} 
              />
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4 lg:flex lg:items-center lg:space-x-8 flex-grow justify-center ">
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
          <div className="hidden md:block lg:block">
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
            opacity-90
            fixed inset-y-0 left-0 w-64 
            bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40
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