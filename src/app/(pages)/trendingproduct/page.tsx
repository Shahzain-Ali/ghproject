// types.ts
 // pages/products.tsx
import Image from 'next/image';
import { FC } from 'react';
import Link from 'next/link';



interface Product {
    id: number;
    name: string;
    rating: number;
    price: string;
    image: string;
    description: string;
  }

  
  const Products: FC = () => {
    const products: Product[] = [
      {
        id: 1,
        name: "Simple model",
        rating: 3,
        price: "$29.00",
        image: "/Rectangle_12.png",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est."
      },
      {
        id: 2,
        name: "Surface air",
        rating: 5,
        price: "$49.00",
        image: "/Rectangle_32_(6).png",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est."
      },
      {
        id: 3,
        name: "High watch",
        rating: 5,
        price: "$39.00",
        image: "/Rectangle_32_(5).png",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est."
      },
      {
        id: 4,
        name: "Monte quis",
        rating: 3,
        price: "$49.00",
        image: "/Rectangle_32_(4).png",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est."
      },
      {
        id: 5,
        name: "Monte rogelia",
        rating: 5,
        price: "$39.00",
        image: "/Rectangle_32_(3).png",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est."
      },
      {
        id: 6,
        name: "Ultricy com",
        rating: 3,
        price: "$49.00",
        image: "/Rectangle_32_(2).png",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est."
      },

    ];
  
    const renderStars = (rating: number) => {
      return (
        <div className="flex">
          {[...Array(5)].map((_, index) => (
            <span key={index} className={`text-lg ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}>
              ★
            </span>
          ))}
        </div>
      );
    };
  
    return (
      <div className="max-w-7xl mx-auto  py-8">

        <div className="h-[200px] bg-[#F6F5FF] flex items-center py-16 w-[100%px]">
          <div className=" md:w-[1170px] ml-[82px]  customsm:mx-auto smm:mx-auto sm:ml-[18px] md:ml-[60px] customsm:w-[200px]">
            <h1 className="text-3xl  md:text-left font-bold mb-4  customsm:text-[18px]inline-block">
              Trending Products
            </h1>
            <div className="flex md:justify-start items-center gap-2 text-sm  md:ml-0 customsm:w-[250px] ">
              <Link href="/">Home</Link>
              <span>•</span>
              <Link href="/pages">Pages</Link>
              <span>•</span>
              <span className="text-[#FB2E86]">Trending Products</span>
            </div>
          </div>
        </div>

          <section className='w-[80%] customsm:w-[98%] smm:w-[98%] sm:w-[90%]  mx-auto '>
            <div className='w-[100%] mx-auto my-10 py-3'>
             <div className='flex justify-between w-full  bor'>
                <div>
                    <h1 className='text-[#151875]'>Ecommerce Acceories & Fashion item </h1>
                    <p className='text-[#8A8FB9] text-[10px]'>About 9,620 results (0.62 seconds)</p>
                </div>
                <div className='text-[#182378]  flex gap-4'>
                    <div>
                    <label htmlFor="pageNumber">Per Page:</label>
                    <input type="number" id='pageNumber' className='border-2 w-[50px] h-[20px] ' />
                    </div>
                    <div>
                    <label htmlFor="pageNumber">Sort By:</label>
                    <select name="" id="" className='border-2 text-[10px] w-[80px] h-[20px]'>Best Match
                        <option value="Best Match">Best Match</option>
                    </select>
                    </div>
                    <div>
                    <label htmlFor="pageNumber">View:</label>
                    <input type="number" id='pageNumber' className='border-2 w-[60px] h-[20px]' />
                    </div>
                </div>
             </div>
            </div>
        </section>


        <div className="flex flex-row customsm:flex-col md:flex-row gap-6 smm:gap-0 sm:gap-0 customsm:w-[98%]  sm:w-[90%] smm:w-[98%] w-[80%] mx-auto">
            
          {/* Left Sidebar */}
          <div className="w-full  smm:w-[30%]  sm:w-[30%] md:w-[30%] lg:w-[30%] customsm:grid customsm:grid-cols-2 customsm:gap-3 ml-2">
            {/* Product Brand */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Product Brand</h3>
              <div className="space-y-3">
                <label className="flex items-center space-x-2 text-gray-600">
                  <input type="checkbox" className="form-checkbox h-4 w-4 text-pink-600" />
                  <span>Coaster Furniture</span>
                </label>
                <label className="flex items-center space-x-2 text-gray-600">
                  <input type="checkbox" className="form-checkbox h-4 w-4 text-pink-600" />
                  <span>Fusion Dot High Fashion</span>
                </label>
                <label className="flex items-center space-x-2 text-gray-600">
                  <input type="checkbox" className="form-checkbox h-4 w-4 text-pink-600" />
                  <span>Unique Furnitture Restor</span>
                </label>
                <label className="flex items-center space-x-2 text-gray-600">
                  <input type="checkbox" className="form-checkbox h-4 w-4 text-pink-600" />
                  <span>Dream Furnitture Flipping</span>
                </label>
              </div>
            </div>
  
            {/* Discount Offer */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Discount Offer</h3>
              <div className="space-y-3">
                <label className="flex items-center space-x-2 text-gray-600">
                  <input type="checkbox" className="form-checkbox h-4 w-4 text-pink-600" />
                  <span>20% Cashback</span>
                </label>
                <label className="flex items-center space-x-2 text-gray-600">
                  <input type="checkbox" className="form-checkbox h-4 w-4 text-pink-600" />
                  <span>5% Cashback Offer</span>
                </label>
                <label className="flex items-center space-x-2 text-gray-600">
                  <input type="checkbox" className="form-checkbox h-4 w-4 text-pink-600" />
                  <span>25% Discount Offer</span>
                </label>
              </div>
            </div>
  
            {/* Rating */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Rating Item</h3>
              <div className="space-y-3">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center space-x-2">
                    {renderStars(rating)}
                    <span className="text-gray-600">({rating})</span>
                  </div>
                ))}
              </div>
            </div>
  
            {/* Categories */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Categories</h3>
              <div className="space-y-3 text-gray-600">
                <div>Prestashop</div>
                <div>Magento</div>
                <div>Accessories</div>
                <div>Bags</div>
                <div>Camera</div>
                <div>Dresses</div>
              </div>
            </div>
  
            {/* Price Filter */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Price Filter</h3>
              <div className="space-y-3">
                <label className="flex items-center space-x-2 text-gray-600">
                  <input type="radio" name="price" className="form-radio h-4 w-4 text-pink-600" />
                  <span>$0.00 - $150.00</span>
                </label>
                <label className="flex items-center space-x-2 text-gray-600">
                  <input type="radio" name="price" className="form-radio h-4 w-4 text-pink-600" />
                  <span>$150.00 - $350.00</span>
                </label>
                <label className="flex items-center space-x-2 text-gray-600">
                  <input type="radio" name="price" className="form-radio h-4 w-4 text-pink-600" />
                  <span>$150.00 - $504.00</span>
                </label>
                <label className="flex items-center space-x-2 text-gray-600">
                  <input type="radio" name="price" className="form-radio h-4 w-4 text-pink-600" />
                  <span>$450.00 +</span>
                </label>
              </div>
            </div>
          </div>
  
          {/* Product Grid */}
          <div className="flex-1">
            <div className="space-y-6 customsm:space-y-3 ">
              {products.map((product) => (
                <div key={product.id} className="flex w-[100%] items-center border border-gray-200 rounded-lg p-2 hover:shadow-lg transition-shadow">
                  <div className="relative customsm:w-[35%] customsm:h-[140px] smm:w-[50%] w-[60%] h-44 flex-shrink-0 ">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div className="ml-4 flex-1 w-72">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-[20px] font-medium">{product.name}</h3>
                      {renderStars(product.rating)}
                    </div>
                    <p className="text-pink-600 font-semibold mb-2">{product.price}</p>
                    <p className="text-gray-600 text-sm">{product.description}</p>
                    <div className="flex space-x-4 mt-4">
                      <button className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50">
                        <span className="sr-only">Favorite</span>
                        ♡
                      </button>
                      <button className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50">
                        <span className="sr-only">Share</span>
                        ↗
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Products;