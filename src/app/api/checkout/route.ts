/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  try {
    // Only initialize Stripe when the function is called
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
      apiVersion: '2025-03-31.basil',
    });

    const body = await req.json();
    const { items, shippingDetails } = body;

    // Validate the request body
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ 
        success: false, 
        error: 'Invalid items data' 
      }, { status: 400 });
    }

    // Create line items for Stripe

    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: 'gbp',
        product_data: {
          name: item.name,
          images: item.image?.asset?.url ? [item.image.asset.url] : [],
          description: item.description || '',
        },
        unit_amount: Math.round(item.price * 100), // Convert to pence
      },
      quantity: item.quantity,
    }));
    
    // Get the base URL for success/cancel URLs
    const origin = req.headers.get('origin') || 'http://localhost:3000';
    
    // Create Stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${origin}/success`,
      cancel_url: `${origin}/cancel`,
      metadata: {
        order_items: JSON.stringify(items.map((item: any) => ({
          id: item._id,
          name: item.name,
          quantity: item.quantity,
          price: item.price
        }))),
        customer_email: shippingDetails?.email || '',
        shipping_address: JSON.stringify(shippingDetails || {})
      }
    });

    return NextResponse.json({ 
      success: true,
      sessionId: session.id
    });
  } catch (error) {
    console.error('Session creation error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}