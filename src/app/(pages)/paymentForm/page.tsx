"use client"

import React, { useState } from 'react';
import { useCart } from '@/app/context/cartContext';
import Image from 'next/image';
import { z } from 'zod';


const PaymentSchema = z.object({
  cardNumber: z.string().min(16, 'Invalid card number'),
  nameOnCard: z.string().min(3, 'Invalid name on card'),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Invalid expiry date'),
  cvv: z.string().min(3, 'Invalid CVV')
});

type PaymentFormData = z.infer<typeof PaymentSchema>;

const PaymentForm: React.FC = () => {
  const { state } = useCart();
  const [formData, setFormData] = useState<PaymentFormData>({
    cardNumber: '',
    nameOnCard: '',
    expiryDate: '',
    cvv: ''
  });
  const [errors, setErrors] = useState<Partial<PaymentFormData>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      PaymentSchema.parse(formData);
      // Add your payment processing logic here
      console.log(formData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(error.formErrors.fieldErrors);
      }
    }
  };


  const calculateTotal = () => {
    return state.cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="container mx-auto px-4 py-8 grid lg:grid-cols-2 gap-8">
      {/* Order Summary Section */}
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
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>£{calculateTotal().toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Form Section */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="cardNumber" className="block font-medium mb-2">
            Card number
          </label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            placeholder="Card number"
            value={formData.cardNumber}
            onChange={handleInputChange}
            className={`border rounded-md px-3 py-2 w-full ${
              errors.cardNumber ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
          />
          {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="nameOnCard" className="block font-medium mb-2">
            Name on card
          </label>
          <input
            type="text"
            id="nameOnCard"
            name="nameOnCard"
            placeholder="Name on card"
            value={formData.nameOnCard}
            onChange={handleInputChange}
            className={`border rounded-md px-3 py-2 w-full ${
              errors.nameOnCard ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
          />
          {errors.nameOnCard && <p className="text-red-500 text-sm mt-1">{errors.nameOnCard}</p>}
        </div>

        <div className="mb-4 flex">
          <div className="mr-2 flex-1">
            <label htmlFor="expiryDate" className="block font-medium mb-2">
              Expiry date
            </label>
            <input
              type="text"
              id="expiryDate"
              name="expiryDate"
              placeholder="MM/YY"
              value={formData.expiryDate}
              onChange={handleInputChange}
              className={`border rounded-md px-3 py-2 w-full ${
                errors.expiryDate ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
            />
            {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
          </div>
          <div className="flex-1">
            <label htmlFor="cvv" className="block font-medium mb-2">
              CVV
            </label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              placeholder="CVV"
              value={formData.cvv}
              onChange={handleInputChange}
              className={`border rounded-md px-3 py-2 w-full ${
                errors.cvv ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
            />
            {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
          </div>
        </div>

        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-md w-full"
        >
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;