"use client"

import { checkout } from "@/utils/stripe";

export default function PaymentFormPage() {
  // Your component state and logic here
  
  const handleCheckout = async () => {
    // Example usage of the checkout function
    try {
      await checkout({
        lineItems: [
          {
            price: 'price_1234', // Your actual price ID
            quantity: 1
          }
        ]
      });
    } catch (error) {
      console.error('Checkout error:', error);
    }
  };

  return (
    <div>
      <h1>Payment Form</h1>
      {/* Your payment form UI here */}
      <button onClick={handleCheckout}>Proceed to Checkout</button>
    </div>
  );
}