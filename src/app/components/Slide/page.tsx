"use client";
import { useState } from "react";
import Link from "next/link";

const slides = [
  {
    title: "New Furniture Collection Trends in 2020",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo.",
    buttonText: "Shop Now",
    chairImage: "/pink_sofa.png",
  },
  {
    title: "Modern Chair Designs for Your Home",
    description:
      "Discover the latest modern furniture trends to elevate your living space.",
    buttonText: "Shop Now",
    chairImage: "/pink_sofa.png",
  },
  {
    title: "Elegant Furniture for Every Space",
    description:
      "Bring timeless elegance to your home with our exclusive furniture collection.",
    buttonText: "Shop Now",
    chairImage: "/pink_sofa.png",
  },
];

function MainSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1
    );
  };

  const current = slides[currentSlide];

  return (
    <main className="bg-[#F2F0FF]" >


      
    <section className="relative py-10 md:py-10 px-5 flex flex-col customsm:flex-col md:flex-row lg:flex-row sm:flex-col items-center justify-between overflow-hidden w-[100%] mx-auto">
  
  {/* Upper Image (Lamp) */}

  <div className="inline-block w-[18%] absolute top-0 left-0 sm:w-full ">
    <img src="/image_32.png" alt="" className="w-[220px] h-[160px] sm:w-[130px] sm:h-[100px]" />
  </div>

  <div className="flex justify-between customsm:flex-col w-[80%] ml-auto mr-10 sm:w-full sm:order-2 sm:text-center">
    
  {/* Left Column: Content (Title, Description, Button) */}
    
    <div className="md:w-1/3 lg:w-1/3 max-w-lg text-center  md:text-left lg:text-left flex flex-col justify-center sm:w-full">
      <p className="text-sm text-pink-500 font-medium">
        Best Furniture For Your Castle...
      </p>
      <h1 className="text-3xl md:text-4xl lg:text-4xl font-bold text-indigo-950 leading-tight mt-2">
        {current.title}
      </h1>
      <p className="text-gray-600 text-sm mt-4 leading-relaxed">
        {current.description}
      </p>
      <Link
        href="#"
        className="inline-block bg-pink-500 text-white text-sm font-medium py-2 px- rounded-sm mt-6 hover:bg-pink-600 transition-all duration-300 w-1/3 text-center customsm:mx-auto smm:w-[200px] md:w-[200px] lg:w-[200px]  sm:w-2/3"
      >
        {current.buttonText}
      </Link>
    </div>

    {/* Right Column: Chair Image */}


    <div className="md:w-1/3 lg:w-1/3 smm:w-[50%] smm:h-[400px] flex justify-center items-center relative  ">
      {/* Background Image with Rotation */}
      <div
        className="absolute h-[22rem] smm:h-[16rem] smm:w-[200px] inset-0 bg-cover bg-center rounded-full md:rotate-45 sm:rotate-45  transform rotate-45 mt-12 "
        style={{ backgroundImage: `url('/Group_129.png')` }}
      ></div>

      {/* Discount Tag */}
      <div className="absolute top-[48px] right-[1.25rem] sm:[48px] sm:right-5 md:top-[48px] md:right-[0rem] lg:top-[32px] lg:right-[0rem] z-20">
        <img src="/Group_124 (7).png" alt="" className="w-[60px] md:w-[70px] lg:w-[80px]" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-[12px] md:text-[14px] lg:text-[16px] font-bold">
          50% <br /> off
        </div>
      </div>

      {/* Foreground Image (Sofa) */}
      <div className="relative z-10 bg-gradient-to-r rounded-full p-10 mt-10 smm:pt-0 ">
        <img
          src={current.chairImage}
          alt="Furniture_Chair"
          className="object-contain max-w-[18rem] smm:w-[12rem]"
        />
      </div>
    </div>
  </div>

  {/* Navigation Dots */}
  <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2">
    {slides.map((_, index) => (
      <button
        key={index}
        onClick={() => setCurrentSlide(index)}
        className={`w-3 h-3 rounded-full  border-2 ${
          currentSlide === index ? "bg-pink-500" : "bg-gray-300 hover:bg-gray-400"
        }`}
      ></button>
    ))}
  </div>
</section>

    </main>
  );
}

export default MainSection;
