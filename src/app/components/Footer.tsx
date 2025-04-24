import React from 'react';
import { FaGithub } from 'react-icons/fa';
import { IoLogoVercel } from 'react-icons/io5';
import { FaLinkedin } from 'react-icons/fa';
import Link from "next/link";
import { useTranslations } from "next-intl";

function Footer() {
  const t = useTranslations('footer');

  const handleSignUp = () => {
    // Redirect to Clerk's sign-up page
    window.location.href = 'https://magnetic-anchovy-34.accounts.dev/sign-up?redirect_url=http%3A%2F%2Flocalhost%3A3000%2F';
  }

  return (
    <div className='bg-[#EEEFFB] w-full'>
      <footer className="text-gray-600 body-font mx-auto">
        <div className="py-16 md:py-24 mx-auto ">
          <div className="flex flex-wrap justify-evenly smm:w-full customsm:w-full sm:pl-10 md:px-10 lg:pl-8">
            {/* First Column */}
            <div className="w-full sm:w-1/2 smm:text-center md:w-1/2 lg:w-1/4 mb-8 md:mb-0">
              <h2 className="title-font font-bold text-black text-lg mb-4 customsm:text-center ">
                {t('brand') || "Hekto"}
              </h2>
              
              {/* Email signup with consistent positioning */}
              <div className="flex flex-row max-w-xs  bg-white rounded h-10 overflow-hidden customsm:mx-auto smm:mx-auto">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    id="footer-field"
                    placeholder={t('emailPlaceholder') || "Enter Email Address"}
                    name="footer-field"
                    className="w-full h-full smm:mx-auto bg-transparent border-0 outline-none text-gray-700 py-2 px-3 text-sm"
                  />
                </div>
                <button 
                  onClick={handleSignUp}
                  className="w-20 flex-shrink-0 flex items-center justify-center text-white bg-[#FB2E86] hover:bg-pink-600 text-sm font-medium transition duration-200"
                >
                  {t('signup') || "Sign Up"}
                </button>
              </div>
              
              <p className="text-gray-500 text-sm mt-4 customsm:px-4">
                {t('contactInfo') || "Contact Info"}
                <br className="hidden lg:block" />
                {t('address') || "17 Princess Road, London, Greater London NW1 8JR, UK"}
              </p>
            </div>

            {/* Categories Column */}
            <div className="w-full customsm:w-1/2 customsm:text-center smm:text-center smm:w-1/2 sm:w-1/2 md:w-1/2 lg:w-1/4 mb-8 md:mb-0 px-4">
              <h2 className="title-font font-bold text-black text-lg mb-4">
                {t('categories.title') || "Categories"}
              </h2>
              <nav className="mb-10">
                <ul>
                  {/* Use fallback in case t.raw isn't available */}
                  {(t.raw ? t.raw('categories.items') : ["Laptops & Computers", "Cameras & Photography", "Smart Phones & Tablets", "Video Games & Consoles", "Waterproof Headphones"]).map((item:string, index:number) => (
                    <li key={index} className="mb-2">
                      <a className="text-gray-600 hover:text-gray-800 cursor-pointer">{item}</a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Customer Care Column */}
            <div className="w-full customsm:w-1/2 customsm:text-center smm:text-center smm:w-1/2 sm:w-1/2  md:w-1/2 lg:w-1/4 mb-8 md:mb-0 px-4">
              <h2 className="title-font font-bold text-black text-lg mb-4">
                {t('customerCare.title') || "Customer Care"}
              </h2>
              <nav className="mb-10">
                <ul>
                  {(t.raw ? t.raw('customerCare.items') : ["My Account", "Discount", "Returns", "Orders History", "Order Tracking"]).map((item:string, index:number) => (
                    <li key={index} className="mb-2">
                      <a className="text-gray-600 hover:text-gray-800 cursor-pointer">{item}</a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Pages Column */}
            <div className="w-full customsm:text-center smm:text-center smm:w-1/2 sm:w-1/2  md:w-1/2 lg:w-1/4">
              <h2 className="title-font font-bold text-black text-lg mb-4">
                {t('pages.title') || "Pages"}
              </h2>
              <nav className="mb-10">
                <ul>
                  {(t.raw ? t.raw('pages.items') : ["Blog", "Browse the Shop", "Category", "Pre-Built Pages", "Visual Composer Elements", "WooCommerce Pages"]).map((item:string, index:number) => (
                    <li key={index} className="mb-2">
                      <a className="text-gray-600 hover:text-gray-800 cursor-pointer">{item}</a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="bg-[#E7E4F8] w-[100%]">
          <div className="container mx-auto px-4 py-4 flex flex-wrap justify-between items-center">
            <p className="text-sm text-gray-500">
              © 2024 Hekto —
              <a
                href="#"
                className="text-gray-600 ml-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                @Right Reserved
              </a>
            </p>
            <div className="flex items-center mt-4 md:mt-0">
              <Link 
                target='blank' 
                href={"https://github.com/Shahzain-Bangash"} 
                className="text-gray-900"
              >
                <FaGithub className='text-2xl' />
              </Link>

              <Link
                target='blank' 
                href={"https://ghproject-beta.vercel.app"} 
                className="ml-4 text-gray-900"
              >
                <IoLogoVercel className='text-2xl' />
              </Link>
              
              <Link
                target='blank' 
                href={"https://www.linkedin.com/in/shahzain-ali-518b862ba"} 
                className="ml-4 text-gray-900"
              >
                <FaLinkedin className='text-2xl' />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;