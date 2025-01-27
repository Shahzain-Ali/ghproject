// components/ShoppingBasket/ShoppingBasket.tsx
'use client';

import React from 'react';
import { useCart, CartItem } from '@/app/context/cartContext';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';
import { Trash2, Minus, Plus } from 'lucide-react';

const ShoppingBasket: React.FC = () => {
    const { state, dispatch } = useCart();

    const removeFromCart = (id: string) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    };

    const getTotalPrice = () => {
        return (state.cart || []).reduce((total, item) => total + (item?.price || 0) * (item?.quantity || 0), 0);
    };

    const decreaseQuantity = (item: CartItem) => {
        if (item.quantity > 1) {
            dispatch({
                type: 'UPDATE_CART',
                payload: { ...item, quantity: item.quantity - 1 },
            });
        }
    };

    const increaseQuantity = (item: CartItem) => {
        dispatch({
            type: 'UPDATE_CART',
            payload: { ...item, quantity: item.quantity + 1 },
        });
    };

    const cartItems = state.cart || [];

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                Your Shopping Cart
            </h1>

            {cartItems.length === 0 ? (
                <div className="text-center py-12 bg-gray-100 rounded-lg">
                    <p className="text-xl text-gray-600">Your cart is empty</p>
                    <Link href="/products" className="inline-block mt-4 px-6 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-700 transition">
                        Continue Shopping
                    </Link>
                </div>
            ) : (
                <div className="space-y-6">
                    {cartItems.map((item, index) => {
                        if (!item || !item._id) return null;

                        return (
                            <div
                                key={item._id}
                                className="flex flex-col md:flex-row lg:flex-row items-center bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow"
                            >
                                <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                                    <Link href={`/products/${item.slug?.current || ''}`}>
                                        <div className="w-32 h-32 relative rounded-lg overflow-hidden">
                                            {item.image?.asset ? (
                                                <Image
                                                    src={urlFor(item.image).url()}
                                                    alt={item.name || 'Product image'}
                                                    fill
                                                    sizes="128px"
                                                    priority={index === 0}
                                                    className="object-cover transition duration-300 hover:scale-110"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                                    <span className="text-gray-400">No image</span>
                                                </div>
                                            )}
                                        </div>
                                    </Link>
                                </div>

                                <div className="flex-grow w-full md:w-auto">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                                        <div className="mb-4 md:mb-0 md:mr-6">
                                            <h2 className="text-xl font-bold text-gray-900 mb-2">{item.name || 'Unnamed Product'}</h2>
                                            <p className="text-gray-600 text-sm mb-2">{item.description || 'No description available'}</p>
                                            <span className="text-gray-900 font-semibold">£{item.price || 0}</span>
                                        </div>

                                        <div className="flex items-center space-x-4">
                                            <div className="flex items-center border rounded-md">
                                                <button
                                                    onClick={() => decreaseQuantity(item)}
                                                    className="p-2 text-gray-600 hover:bg-gray-100"
                                                    aria-label="Decrease quantity"
                                                >
                                                    <Minus size={20} />
                                                </button>
                                                <span className="px-4 text-gray-900">{item.quantity || 1}</span>
                                                <button
                                                    onClick={() => increaseQuantity(item)}
                                                    className="p-2 text-gray-600 hover:bg-gray-100"
                                                    aria-label="Increase quantity"
                                                >
                                                    <Plus size={20} />
                                                </button>
                                            </div>

                                            <span className="text-lg font-semibold text-gray-900">
                                                £{(item.price || 0) * (item.quantity || 1)}
                                            </span>

                                            <button
                                                onClick={() => removeFromCart(item._id)}
                                                className="text-red-600 hover:text-red-800 transition"
                                                aria-label="Remove item"
                                            >
                                                <Trash2 size={24} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    <div className="bg-gray-50 rounded-lg p-6 flex flex-col md:flex-row justify-between items-center">
                        <div className="text-xl font-semibold text-gray-900 mb-4 md:mb-0">
                            Subtotal
                        </div>
                        <div className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">
                            £{getTotalPrice()}
                        </div>
                        <div className="text-sm text-gray-600 mb-4 md:mb-0">
                            Taxes and shipping calculated at checkout
                        </div>
                        <Link href="/checkoutform">
                            <button
                                className="w-full md:w-auto px-8 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-700 transition"
                                aria-label="Proceed to checkout"
                            >
                                Proceed to Checkout
                            </button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShoppingBasket;