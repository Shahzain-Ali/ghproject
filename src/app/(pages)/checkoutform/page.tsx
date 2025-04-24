/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import React, { useState } from 'react';
import * as z from 'zod';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useCart } from '@/app/context/cartContext';
import Image from 'next/image';
// import { client } from '@/sanity/lib/client';
// import { CheckoutSubmission } from '@/app/types/checkOut';

// Stripe configuration
const stripePromise = loadStripe("pk_test_51QlT0JBOOSH6BWk9kNoLZUVrwoBiPZfME1cH43Jur4nNvis4GoL5KECaCjX1C3JTOZj9kc1L8RvkYnNvAYEoKRRv00enfkyWlz");

// Validation Schema
const CheckoutSchema = z.object({
  email: z.string().email("Invalid email address"),
  firstName: z.string().min(2, "First name required"),
  lastName: z.string().min(2, "Last name required"),
  phone: z.string().regex(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/, "Invalid phone number"),
  address: z.string().min(5, "Address required"),
  apartment: z.string().optional(),
  city: z.string().min(2, "City required"),
  country: z.string().min(2, "Country required"),
  postalCode: z.string().min(4, "Postal code required")
});

// Interfaces
export interface CheckoutFormErrors {
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  apartment?: string;
  city?: string;
  country?: string;
  postalCode?: string;
}

export interface CheckoutFormData {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  apartment?: string;
  city: string;
  country: string;
  postalCode: string;
}

// Main Checkout Form Component
const CheckoutForm: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { state, dispatch } = useCart();
  const [errors, setErrors] = useState<CheckoutFormErrors>({});
  const [formData, setFormData] = useState<CheckoutFormData>({
    email: '', firstName: '', lastName: '', phone: '', 
    address: '', apartment: '', city: '', country: '', postalCode: ''
  });

  const [isPaymentStage, setIsPaymentStage] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderStatus, setOrderStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Calculate totals
  const subtotal = state.cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const total = subtotal;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      CheckoutSchema.parse(formData);
      
      setErrors({});

      await handlePaymentSubmit();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formErrors = error.errors.reduce((acc: CheckoutFormErrors, curr) => {
          const path = curr.path[0] as keyof CheckoutFormErrors;
          acc[path] = curr.message;
          return acc;
        }, {});
        setErrors(formErrors);
      }
      console.error('Submission error:', error);
    }
  };

  const handlePaymentSubmit = async () => {
    setIsProcessing(true);
    
    try {
      // Checkout Session create karne ke liye API call
      const response = await fetch(`/api/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          shippingDetails: formData,
          items: state.cart
        })
      });
  
      if (!response.ok) {
        throw new Error('Payment request failed');
      }
  
      const data = await response.json();
      
      if (data.success && data.sessionId) {
        // Stripe checkout page par redirect karen
        const stripe = await stripePromise;
        if (!stripe) {
          throw new Error('Stripe failed to initialize');
        }
        
        const { error } = await stripe.redirectToCheckout({
          sessionId: data.sessionId
        });
        
        if (error) {
          throw error;
        }
      } else {
        throw new Error(data.error || 'Payment processing failed');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      setOrderStatus('error');
    } finally {
      setIsProcessing(false);
    }
  };

  const OrderStatus = () => {
    if (orderStatus === 'success') {
      return (
        <div className="text-center p-8 bg-green-50 rounded-lg">
          <h2 className="text-2xl font-bold text-green-600 mb-4">Order Confirmed!</h2>
          <p>Thank you for your purchase. A confirmation email has been sent.</p>
        </div>
      );
    }

    if (orderStatus === 'error') {
      return (
        <div className="text-center p-8 bg-red-50 rounded-lg">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Payment Failed</h2>
          <p>There was an issue processing your payment. Please try again.</p>
          <button 
            onClick={() => setOrderStatus('idle')}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      );
    }

    return null;
  };

  // Render main checkout content
  const renderCheckoutContent = () => {
    if (orderStatus !== 'idle') {
      return <OrderStatus />;
    }

    return (
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Contact & Shipping Details */}
        <div>
          <h2 className="text-2xl font-bold mb-6">
            {isPaymentStage ? 'Payment Details' : 'Contact & Shipping Details'}
          </h2>
          
          {!isPaymentStage ? (
            <form onSubmit={handleDetailsSubmit} className="space-y-4">
              {/* Contact Information Section */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Email and Phone Input Fields */}
                  <div>
                    <label className="block mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="you@example.com"
                      className="w-full p-3 border rounded-md"
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 123-4567"
                      className="w-full p-3 border rounded-md"
                    />
                    {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                  </div>
                </div>
              </div>

              {/* Shipping Address Section */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Shipping Address</h3>
                {/* Name Inputs */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="John"
                      className="w-full p-3 border rounded-md"
                    />
                    {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label className="block mb-2">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Doe"
                      className="w-full p-3 border rounded-md"
                    />
                    {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
                  </div>
                </div>

                {/* Address Inputs */}
                <div className="mt-4">
                  <label className="block mb-2">Street Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="123 Main Street"
                    className="w-full p-3 border rounded-md mb-4"
                  />
                  {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}

                  <input
                    type="text"
                    name="apartment"
                    value={formData.apartment}
                    onChange={handleInputChange}
                    placeholder="Apartment, suite, etc. (Optional)"
                    className="w-full p-3 border rounded-md"
                  />
                </div>

                {/* City, Country, Postal Code */}
                <div className="grid md:grid-cols-3 gap-4 mt-4">
                  <div>
                    <label className="block mb-2">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="New York"
                      className="w-full p-3 border rounded-md"
                    />
                    {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
                  </div>
                  <div>
                    <label className="block mb-2">Country</label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full p-3 border rounded-md"
                    >
                      <option value="">Select Country</option>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="UK">United Kingdom</option>
                    </select>
                    {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
                  </div>
                  <div>
                    <label className="block mb-2">Postal Code</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      placeholder="10001"
                      className="w-full p-3 border rounded-md"
                    />
                    {errors.postalCode && <p className="text-red-500 text-sm">{errors.postalCode}</p>}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-500 text-white py-3 rounded-md mt-6 hover:bg-green-600 transition-colors"
                >
                  Continue to Payment
                </button>
              </div>
            </form>
          ) : (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Payment Details</h3>
              <p className="mb-4">Click the button below to proceed to the secure payment page.</p>
              <button 
                onClick={handlePaymentSubmit}
                disabled={isProcessing}
                className={`w-full text-white py-3 rounded-md transition-colors ${
                  isProcessing 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-green-500 hover:bg-green-600'
                }`}
              >
                {isProcessing ? 'Processing...' : `Pay £${total.toFixed(2)}`}
              </button>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            {state.cart.map((item) => (
              <div key={item._id} className="flex justify-between items-center mb-4 pb-4 border-b">
                <div className="flex items-center">
                  <Image
                    src={item.image?.asset ? item.image.asset.url : '/images/fallback-image.png'}
                    alt={item.name}
                    width={64}
                    height={64}
                    className="object-cover mr-4 rounded-md"
                  />
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-gray-500">{item.description}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="ml-4 font-semibold">£{(item.price * item.quantity).toFixed(2)}</span>
                  <span className="ml-4">Qty: {item.quantity}</span>
                </div>
              </div>
            ))}
            <div className="mt-4">
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>£{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>£{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Elements stripe={stripePromise}>
      <div className="container mx-auto px-4 py-8">
        {renderCheckoutContent()}
      </div>
    </Elements>
  );
};

export default CheckoutForm;