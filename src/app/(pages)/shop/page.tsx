import React from 'react'
import Link from 'next/link'
import {  FaRegHeart } from "react-icons/fa6";
import { LuShoppingCart } from "react-icons/lu";

const Shop = () => {
    
  return (
    
    <div>
          <div className="h-[200px] bg-[#F6F5FF] flex items-center py-16">
          <div className="container md:w-[1170px] mx-auto px-6">
            <h1 className="text-3xl text-center md:text-left font-bold mb-4 md:ml-20">
              Shop List
            </h1>
            <div className="flex justify-center md:justify-start items-center gap-2 text-sm md:ml-20">
              <Link href="/">Home</Link>
              <span>•</span>
              <Link href="/pages">Pages</Link>
              <span>•</span>
              <span className="text-[#FB2E86]">Shop List</span>
            </div>
          </div>
        </div>



        <section>
            <div className='w-[80%] mx-auto my-10 py-3'>
             <div className='flex justify-between w-full '>
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

        <section>
            {/* ########### First Picture Details */}

            <div className='flex justify-between w-[80%] mx-auto py-3' >
                <div className='w-[50%]  '>
                    <img src="/Rectangle_32.png" alt="" className='mx-auto' />
                </div>
                <div className='w-[50%]  flex flex-col gap-3  pt-5'>
                    <div className='flex place-items-center gap-x-4'>
                        <h1 className='text-[14px] font-semibold text-[#111C85]'>Accumsan tincidunt</h1>
                        <div className="flex gap-2">
                            <a href="#" className="w-[10px] h-[10px] bg-[#DE9034] rounded-full"></a>
                            <a href="#" className="w-[10px] h-[10px] bg-pink-600 rounded-full"></a>
                            <a href="#" className="w-[10px] h-[10px] bg-blue-600 rounded-full"></a>
                        </div>
                    </div>
                    <div className='flex place-items-center gap-x-4'>
                        <p className='text-[14px]'>
                        $26.00 <span className='text-[#FF2AAA]'>$52.00</span>
                        </p>
                        <img src="/Group_236.png" alt="" className='w-[50px] h-[16px] '/>
                    </div>
                    <p className='text-[#9295AA] text-[14px]'>
                         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo.
                    </p>
                    <div className='flex place-items-center'>
                    <LuShoppingCart className="w-6 h-6 customsm:w-4 inline-block ml-2" />
                    <FaRegHeart className="w-4 h-4 customsm:w-3 inline-block ml-8" />
                    <i className="fas fa-search-plus inline-block ml-8"></i>

                    </div>
                </div>
            </div>
                {/* ########### Second Picture Details */}

            <div className='flex justify-between w-[80%] mx-auto py-3' >
                <div className='w-[50%]  '>
                    <img src="/Rectangle_32 (1).png" alt="" className='mx-auto' />
                </div>
                <div className='w-[50%]  flex flex-col gap-3  pt-5'>
                    <div className='flex place-items-center gap-x-4'>
                        <h1 className='text-[14px] font-semibold text-[#111C85]'>Accumsan tincidunt</h1>
                        <div className="flex gap-2">
                            <a href="#" className="w-[10px] h-[10px] bg-[#DE9034] rounded-full"></a>
                            <a href="#" className="w-[10px] h-[10px] bg-pink-600 rounded-full"></a>
                            <a href="#" className="w-[10px] h-[10px] bg-blue-600 rounded-full"></a>
                        </div>
                    </div>
                    <div className='flex place-items-center gap-x-4'>
                        <p className='text-[14px]'>
                        $26.00 <span className='text-[#FF2AAA]'>$52.00</span>
                        </p>
                        <img src="/Group_236.png" alt="" className='w-[50px] h-[16px] '/>
                    </div>
                    <p className='text-[#9295AA] text-[14px]'>
                         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo.
                    </p>
                    <div className='flex place-items-center'>
                    <LuShoppingCart className="w-6 h-6 customsm:w-4 inline-block ml-2" />
                    <FaRegHeart className="w-4 h-4 customsm:w-3 inline-block ml-8" />
                    <i className="fas fa-search-plus inline-block ml-8"></i>

                    </div>
                </div>
            </div>

                {/* ########### Third Picture Details */}


            <div className='flex justify-between w-[80%] mx-auto py-3' >
                <div className='w-[50%]  '>
                    <img src="/Rectangle_32 (2).png" alt="" className='mx-auto' />
                </div>
                <div className='w-[50%]  flex flex-col gap-3  pt-5'>
                    <div className='flex place-items-center gap-x-4'>
                        <h1 className='text-[14px] font-semibold text-[#111C85]'>Accumsan tincidunt</h1>
                        <div className="flex gap-2">
                            <a href="#" className="w-[10px] h-[10px] bg-[#DE9034] rounded-full"></a>
                            <a href="#" className="w-[10px] h-[10px] bg-pink-600 rounded-full"></a>
                            <a href="#" className="w-[10px] h-[10px] bg-blue-600 rounded-full"></a>
                        </div>
                    </div>
                    <div className='flex place-items-center gap-x-4'>
                        <p className='text-[14px]'>
                        $26.00 <span className='text-[#FF2AAA]'>$52.00</span>
                        </p>
                        <img src="/Group_236.png" alt="" className='w-[50px] h-[16px] '/>
                    </div>
                    <p className='text-[#9295AA] text-[14px]'>
                         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo.
                    </p>
                    <div className='flex place-items-center'>
                    <LuShoppingCart className="w-6 h-6 customsm:w-4 inline-block ml-2" />
                    <FaRegHeart className="w-4 h-4 customsm:w-3 inline-block ml-8" />
                    <i className="fas fa-search-plus inline-block ml-8"></i>

                    </div>
                </div>
            </div>

                {/* ########### Four Picture Details */}

            <div className='flex justify-between w-[80%] mx-auto py-3' >
                <div className='w-[50%]  '>
                    <img src="/Rectangle_32 (3).png" alt="" className='mx-auto' />
                </div>
                <div className='w-[50%]  flex flex-col gap-3  pt-5'>
                    <div className='flex place-items-center gap-x-4'>
                        <h1 className='text-[14px] font-semibold text-[#111C85]'>Accumsan tincidunt</h1>
                        <div className="flex gap-2">
                            <a href="#" className="w-[10px] h-[10px] bg-[#DE9034] rounded-full"></a>
                            <a href="#" className="w-[10px] h-[10px] bg-pink-600 rounded-full"></a>
                            <a href="#" className="w-[10px] h-[10px] bg-blue-600 rounded-full"></a>
                        </div>
                    </div>
                    <div className='flex place-items-center gap-x-4'>
                        <p className='text-[14px]'>
                        $26.00 <span className='text-[#FF2AAA]'>$52.00</span>
                        </p>
                        <img src="/Group_236.png" alt="" className='w-[50px] h-[16px] '/>
                    </div>
                    <p className='text-[#9295AA] text-[14px]'>
                         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo.
                    </p>
                    <div className='flex place-items-center'>
                    <LuShoppingCart className="w-6 h-6 customsm:w-4 inline-block ml-2" />
                    <FaRegHeart className="w-4 h-4 customsm:w-3 inline-block ml-8" />
                    <i className="fas fa-search-plus inline-block ml-8"></i>

                    </div>
                </div>
            </div>

                {/* ########### Fifth Picture Details */}

            <div className='flex justify-between w-[80%] mx-auto py-3' >
                <div className='w-[50%]  '>
                    <img src="/Rectangle_32 (4).png" alt="" className='mx-auto' />
                </div>
                <div className='w-[50%]  flex flex-col gap-3  pt-5'>
                    <div className='flex place-items-center gap-x-4'>
                        <h1 className='text-[14px] font-semibold text-[#111C85]'>Accumsan tincidunt</h1>
                        <div className="flex gap-2">
                            <a href="#" className="w-[10px] h-[10px] bg-[#DE9034] rounded-full"></a>
                            <a href="#" className="w-[10px] h-[10px] bg-pink-600 rounded-full"></a>
                            <a href="#" className="w-[10px] h-[10px] bg-blue-600 rounded-full"></a>
                        </div>
                    </div>
                    <div className='flex place-items-center gap-x-4'>
                        <p className='text-[14px]'>
                        $26.00 <span className='text-[#FF2AAA]'>$52.00</span>
                        </p>
                        <img src="/Group_236.png" alt="" className='w-[50px] h-[16px] '/>
                    </div>
                    <p className='text-[#9295AA] text-[14px]'>
                         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo.
                    </p>
                    <div className='flex place-items-center'>
                    <LuShoppingCart className="w-6 h-6 customsm:w-4 inline-block ml-2" />
                    <FaRegHeart className="w-4 h-4 customsm:w-3 inline-block ml-8" />
                    <i className="fas fa-search-plus inline-block ml-8"></i>

                    </div>
                </div>
            </div>

                {/* ########### six Picture Details */}

            <div className='flex justify-between w-[80%] mx-auto py-3' >
                <div className='w-[50%]  '>
                    <img src="/Rectangle_32 (5).png" alt="" className='mx-auto' />
                </div>
                <div className='w-[50%]  flex flex-col gap-3  pt-5'>
                    <div className='flex place-items-center gap-x-4'>
                        <h1 className='text-[14px] font-semibold text-[#111C85]'>Accumsan tincidunt</h1>
                        <div className="flex gap-2">
                            <a href="#" className="w-[10px] h-[10px] bg-[#DE9034] rounded-full"></a>
                            <a href="#" className="w-[10px] h-[10px] bg-pink-600 rounded-full"></a>
                            <a href="#" className="w-[10px] h-[10px] bg-blue-600 rounded-full"></a>
                        </div>
                    </div>
                    <div className='flex place-items-center gap-x-4'>
                        <p className='text-[14px]'>
                        $26.00 <span className='text-[#FF2AAA]'>$52.00</span>
                        </p>
                        <img src="/Group_236.png" alt="" className='w-[50px] h-[16px] '/>
                    </div>
                    <p className='text-[#9295AA] text-[14px]'>
                         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo.
                    </p>
                    <div className='flex place-items-center'>
                    <LuShoppingCart className="w-6 h-6 customsm:w-4 inline-block ml-2" />
                    <FaRegHeart className="w-4 h-4 customsm:w-3 inline-block ml-8" />
                    <i className="fas fa-search-plus inline-block ml-8"></i>

                    </div>
                </div>
            </div>

                {/* ########### Seven Picture Details */}

            <div className='flex justify-between w-[80%] mx-auto py-3' >
                <div className='w-[50%]  '>
                    <img src="/Rectangle_32 (6).png" alt="" className='mx-auto' />
                </div>
                <div className='w-[50%]  flex flex-col gap-3  pt-5'>
                    <div className='flex place-items-center gap-x-4'>
                        <h1 className='text-[14px] font-semibold text-[#111C85]'>Accumsan tincidunt</h1>
                        <div className="flex gap-2">
                            <a href="#" className="w-[10px] h-[10px] bg-[#DE9034] rounded-full"></a>
                            <a href="#" className="w-[10px] h-[10px] bg-pink-600 rounded-full"></a>
                            <a href="#" className="w-[10px] h-[10px] bg-blue-600 rounded-full"></a>
                        </div>
                    </div>
                    <div className='flex place-items-center gap-x-4'>
                        <p className='text-[14px]'>
                        $26.00 <span className='text-[#FF2AAA]'>$52.00</span>
                        </p>
                        <img src="/Group_236.png" alt="" className='w-[50px] h-[16px] '/>
                    </div>
                    <p className='text-[#9295AA] text-[14px]'>
                         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo.
                    </p>
                    <div className='flex place-items-center'>
                    <LuShoppingCart className="w-6 h-6 customsm:w-4 inline-block ml-2" />
                    <FaRegHeart className="w-4 h-4 customsm:w-3 inline-block ml-8" />
                    <i className="fas fa-search-plus inline-block ml-8"></i>

                    </div>
                </div>
            </div>

                    {/* ########### Eight Picture Details */}

        </section>
    </div>
  )
  
}

export default Shop
