"use client";

import { useState } from "react";
import PageHeader from "@/app/components/PageHeader";
import Image from "next/image";
import userCartStore, { CartItem } from "../../../../store";
import { urlFor } from "@/sanity/lib/image";
import { useUser } from "@clerk/nextjs";
import { createCheckoutSession, Metadata } from "../../../../action/createCheckoutSession";

export default function Shipping() {
   const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    country: "",
    postal: "",
  });
  
  const groupedItems: CartItem[] = userCartStore((state) => state.getGroupedItems()) || [];
 const {user} = useUser()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };



  const getTotalPrice = () => {
    return groupedItems.reduce((total, { product, quantity }) => total + (product?.price || 0) * quantity, 0);
  };

  const getSubTotalPrice = () => {
    return groupedItems.reduce((total, { product, quantity }) => {
      const price = product?.price ?? 0;
      const discountPercentage = product?.discountPercentage ?? 0;
      const discount = (price * discountPercentage) / 100;
      const discountedPrice = price - discount;
      return total + discountedPrice * quantity;
    }, 0);
  };
  
  

  const handleCheckout = async () => {
    setLoading(true);
  
    try {
      
      await handleSubmit(); 
   
      const metadata: Metadata = {
        orderNumber: crypto.randomUUID(),
        customerName: user?.fullName ?? "Unknown",
        customerEmail: user?.emailAddresses[0]?.emailAddress ?? "Unknown",
        clerkUserId: user!.id ?? "Unknown",
      };
  

      const checkoutUrl = await createCheckoutSession(groupedItems, metadata);
  
      
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        alert("Failed to create checkout session.");
      }
    } catch (error) {
      console.error("Checkout process failed:", error);
      alert("An error occurred during checkout. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  
  
  const handleSubmit = async () => {
    const payload = {
      shipToAddress: {
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        address: formData.address,
        apartment: formData.apartment,
        city: formData.city,
        country: formData.country,
        postal: formData.postal,  
      },
      packages: [
        {
          weight: { value: 5, unit: "ounce" },
          dimensions: { height: 3, width: 15, length: 10, unit: "inch" },
        },
      ],
    };
  
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/shipengine`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      console.log("Response from API", data);
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };
  

  return (
    <section>
      <PageHeader heading="Hekto Demo" />
      <div className="min-h-screen bg-white flex justify-center py-10 px-4 overflow-x-hidden">
        <div className="max-w-full w-full lg:max-w-[1177px] grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="col-span-3">
            <h1 className="text-2xl font-bold mb-2 text-[#1D3178] font-sans">Hekto Demo</h1>
            <p className="text-sm text-gray-600 mb-6">
              Cart / Information / Shipping / Payment
            </p>
          </div>

          <div className="col-span-3 md:col-span-2 bg-[#F8F8FD] p-6" >
            <div>
              <h2 className="text-lg font-bold mb-4 text-[#1D3178] font-josefin">Contact Information</h2>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
             
                placeholder="Email or mobile phone number"
                className="w-full p-3 outline-none border-b-2 mb-3 border-[#BFC6E0] font-lato text-[#C1C8E1] bg-transparent"
              />
              <label className="flex items-center text-sm mt-4 font-lato text-[#C1C8E1]">
                <input type="checkbox" className="mr-2" />
                Keep me up to date on news and exclusive offers
              </label>
            </div>

            <div className="mt-28">
              <h2 className="text-lg font-bold mb-4 text-[#1D3178] font-josefin">Shipping Address</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
             
                  placeholder="First name (optional)"
                  className="w-full p-3 outline-none border-b-2 mb-2 border-[#BFC6E0] font-lato text-[#C1C8E1] bg-transparent"
                />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                 
                  placeholder="Last name"
                  className="w-full p-3 outline-none border-b-2 mb-2 border-[#BFC6E0] font-lato text-[#C1C8E1] bg-transparent"
                />
              </div>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
               
                placeholder="Address"
                className="w-full p-3 outline-none border-b-2 mb-2 mt-3 border-[#BFC6E0] font-lato text-[#C1C8E1] bg-transparent"
              />
              <input
                type="text"
                name="apartment"
                value={formData.apartment}
                onChange={handleChange}
                
                placeholder="Apartment, suite, etc. (optional)"
                className="w-full p-3 outline-none border-b-2 mb-2 border-[#BFC6E0] font-lato text-[#C1C8E1] bg-transparent"
              />
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
              
                placeholder="City"
                className="w-full p-3 outline-none border-b-2 mb-2 border-[#BFC6E0] font-lato text-[#C1C8E1] bg-transparent"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
              
                  placeholder="Country"
                  className="w-full p-3 outline-none border-b-2 mb-2 border-[#BFC6E0] font-lato text-[#C1C8E1] bg-transparent"
                />
                <input
                  type="text"
                  name="postal"
                  value={formData.postal}
                  onChange={handleChange}
            
                  placeholder="Postal Code"
                  className="w-full p-3 outline-none border-b-2 mb-2 border-[#BFC6E0] font-lato text-[#C1C8E1] bg-transparent"
                />
              </div>
            </div>

            <button
             
              className="w-[182px] h-[44px] mb-6 font-josefin bg-[#FB2E86] hover:bg-pink-500 text-white py-3 rounded-[2px] mt-24"
            >
              Continue Shipping
            </button>
          </div>

          <div className="bg-white p-6">
            <ul className="divide-y divide-gray-200 border-b-2">
              {groupedItems?.map(({ product }) => {
                return (
                  <li key={product?._id} className="flex justify-between py-4 font-josefin">
                    <div className="flex items-center gap-3">
                      {product?.image && (
                        <Image
                          src={urlFor(product?.image).url()}
                          alt={product?.name || "product image"}
                          width={200}
                          height={200}
                          className="w-16 h-16 object-cover rounded"
                        />
                      )}
                      <div>
                        <p className="font-medium text-[#15245E]">{product?.name}</p>
                        <p className="text-sm text-gray-500">Color: {"N/A"}</p>
                        <p className="text-sm text-gray-500">Size: {"N/A"}</p>
                      </div>
                    </div>
                    
                  </li>
                );
              })}
            </ul>

            <div className="bg-[#F4F4FC] p-6 mt-10">
              <div className="flex justify-between py-2 text-[#1D3178] text-lg lg:text-xl font-josefin border-b-2 border-solid border-[#E8E6F1] mb-2">
                <span className="font-semibold">Subtotal:</span>
                <span> £{getSubTotalPrice().toFixed(2)}</span>
              </div>
              <div className="flex text-[#1D3178] text-lg lg:text-xl font-josefin justify-between py-2 border-b-2 border-solid border-[#E8E6F1] mb-2">
                <span className="font-semibold">Total:</span>
                <span>£{getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="flex items-center mb-6 mt-10">
                <input
                  type="checkbox"
                  id="saveInfo"
                  className="mr-2 focus:ring-[#19D16F] rounded-[2px]"
                />
                <label
                  htmlFor="saveInfo"
                  className="lg:text-sm text-xs font-lato text-[#8A91AB] whitespace-nowrap"
                >
                  Shipping & taxes calculated at checkout.
                </label>
              </div>
              <button
    type="button"
    onClick={handleCheckout} // Separate handler for checkout
    disabled={loading}
    className="w-full bg-[#FB2E86] text-white py-3 rounded-[2px]"
  >
    {loading ? "Processing..." : "Proceed to Checkout"}
  </button>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
