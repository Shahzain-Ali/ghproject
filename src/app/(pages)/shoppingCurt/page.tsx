"use client"
import React from 'react'
import Link from 'next/link'
import { useState } from 'react'
import Image from 'next/image'

const ShoppingCart = () => {
    const [counts, setCounts] = useState<number[]>(Array(5).fill(0));

    const updateCount = (index: number, increment: number) => {
        const newCounts = [...counts];
        newCounts[index] = Math.max(0, newCounts[index] + increment);
        setCounts(newCounts);
    };
    

    return (
        <div className="w-full">
            {/* Header Section */}
            <div className="bg-[#F6F5FF] py-4 md:py-8 lg:py-16">
                <div className="w-[95%] max-w-[1170px] mx-auto px-2 md:px-4">
                    <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 md:mb-4">
                        Shopping Cart
                    </h1>
                    <div className="flex items-center gap-1 md:gap-2 text-xs md:text-sm">
                        <Link href="/">Home</Link>
                        <span>•</span>
                        <Link href="/pages">Pages</Link>
                        <span>•</span>
                        <span className="text-[#FB2E86]">Shopping Cart</span>
                    </div>
                </div>
            </div>

            {/* Main Cart Section */}
            <section className='py-4 md:py-8'>
                <div className="customsm:w-[95%] smm:w-[85%] sm:w-[80%] md:w-[90%] lg:w-[80%] max-w-[1400px] mx-auto justify-between">
                    <div className="flex flex-col lg:flex-row md:flex-row gap-4 ">
                        {/* Main Cart Table */}
                        <div className="flex-0">
                            {/* Table Header */}
                            <div className="grid grid-cols-4 gap-2 md:gap-4 mb-4 text-[#1D3178] font-bold text-sm md:text-base lg:text-xl">
                                <div className="col-span-1">Product</div>
                                <div className="text-center">Price</div>
                                <div className="text-center">Quantity</div>
                                <div className="text-center">Total</div>
                            </div>

                            {/* Cart Items */}
                            <div className="space-y-4">
                                {[1, 2, 3, 4, 5].map((item, index) => (
                                    <div key={index} className="grid grid-cols-4  pb-2 bg-white rounded-lg shadow-sm items-center">
                                        {/* Product */}
                                        <div className="col-span-1 flex md:flex-col gap-2 md:gap-4">
                                            <Image
                                                src={`/Rectangle_${34 + index}.png`} 
                                                alt="" 
                                                className="w-12 h-12 md:w-20 md:h-20 lg:w-24 lg:h-24 object-cover"
                                            />
                                            <div className="customsm:block smm:block sm:block md:block lg:block ">
                                                <h3 className="font-semibold text-xs md:text-sm lg:text-base customsm:text-[10px]">Ut diam consequat</h3>
                                                <p className="text-[#A1A8C1] text-xs md:text-sm customsm:text-[10px]">Color: Brown<br />Size: XL</p>
                                            </div>
                                        </div>

                                        {/* Price */}
                                        <div className="text-center text-xs md:text-sm lg:text-base">
                                            $32.00
                                        </div>

                                        {/* Quantity */}
                                        <div className="flex justify-center">
                                            <div className="flex items-center gap-1 md:gap-2">
                                                <button 
                                                    className="w-4 h-4 md:w-6 md:h-6 bg-[#BEBFC2] flex items-center justify-center text-white text-xs md:text-base"
                                                    onClick={() => updateCount(index, -1)}
                                                >−</button>
                                                <span className="w-6 md:w-10 h-4 md:h-6 bg-[#F0EFF2] flex items-center justify-center text-xs md:text-base">
                                                    {counts[index]}
                                                </span>
                                                <button 
                                                    className="w-4 h-4 md:w-6 md:h-6 bg-[#BEBFC2] flex items-center justify-center text-white text-xs md:text-base"
                                                    onClick={() => updateCount(index, 1)}
                                                >+</button>
                                            </div>
                                        </div>

                                        {/* Total */}
                                        <div className="text-center text-xs md:text-sm lg:text-base">
                                            €219.00
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Cart Actions */}
                            <div className="flex justify-between mt-4">
                                <button className='bg-[#FB2E86] rounded px-3 md:px-6 py-1 md:py-2 text-white text-xs md:text-sm'>
                                    Update Cart
                                </button>
                                <button className='bg-[#FB2E86] rounded px-3 md:px-6 py-1 md:py-2 text-white text-xs md:text-sm'>
                                    Clear Cart
                                </button>
                            </div>
                        </div>

                        {/* Cart Summary Section - Side by side on lg and xlg */}
                        <div className="lg:w-[400px] md:w-[400px] space-y-4 lg:space-y-8">
                            {/* Cart Totals */}
                            <div className="bg-[#F4F4FC] p-4 rounded-sm text-center">
                                <h2 className="text-lg md:text-xl text-[#1D3178] font-bold mb-4">Cart Totals</h2>
                                <div className="space-y-4">
                                    <div className="flex justify-between pb-2 border-b border-gray-300">
                                        <span className="text-sm md:text-base text-[#1D3178]">Subtotals:</span>
                                        <span className="text-sm md:text-base">€219.00</span>
                                    </div>
                                    <div className="flex justify-between pb-2 border-b border-gray-300">
                                        <span className="text-sm md:text-base text-[#1D3178]">Totals:</span>
                                        <span className="text-sm md:text-base">€325.00</span>
                                    </div>
                                    <div className="pt-2">
                                        <p className="text-xs md:text-sm text-gray-600 mb-4">
                                            <i className="fa-solid fa-check bg-green-400 text-white p-1 rounded mr-2"></i>
                                            Shipping & taxes calculated at checkout
                                        </p>
                                        <button className="w-full bg-[#19D16F] text-white py-2 md:py-3 rounded text-sm md:text-base">
                                            Proceed To Checkout
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Shipping Calculator */}
                            <div className="bg-[#F4F4FC] p-4 rounded-sm text-center">
                                <h2 className="text-lg md:text-xl text-[#1D3178] font-bold mb-4">Calculate Shipping</h2>
                                <div className="space-y-4">
                                    <input 
                                        type="text" 
                                        placeholder="Bangladesh" 
                                        className="w-full border-b-2 bg-transparent pb-2 text-sm md:text-base"
                                    />
                                    <input 
                                        type="text" 
                                        placeholder="Mirpur Dhaka - 1200" 
                                        className="w-full border-b-2 bg-transparent pb-2 text-sm md:text-base"
                                    />
                                    <input 
                                        type="text" 
                                        placeholder="Postal Code" 
                                        className="w-full border-b-2 bg-transparent pb-2 text-sm md:text-base"
                                    />
                                    <button className="bg-[#FB2E86] text-white py-2 md:py-3 px-4 md:px-6 rounded text-sm md:text-base">
                                        Calculate Shipping
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ShoppingCart