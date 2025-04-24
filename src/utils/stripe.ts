// src/utils/stripe.ts
"use client"

import { loadStripe, Stripe } from '@stripe/stripe-js';

// Define proper types for lineItems
interface CheckoutParams {
  lineItems: {
    price: string;
    quantity: number;
  }[];
}

export async function checkout({ lineItems }: CheckoutParams) {
  let stripePromise: Promise<Stripe | null> | null = null;
  
  const getStripe = () => {
    if (!stripePromise) {
      const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
      // Check if the key exists
      if (!key) {
        throw new Error('Stripe publishable key is not defined');
      }
      stripePromise = loadStripe(key);
    }
    return stripePromise;
  };
  
  const stripe = await getStripe();
  
  if (!stripe) {
    throw new Error('Failed to initialize Stripe');
  }
  
  await stripe.redirectToCheckout({
    mode: "payment",
    lineItems,
    successUrl: `${window.location.origin}?session_id={CHECKOUT_SESSION_ID}`,
    cancelUrl: window.location.origin
  });
}