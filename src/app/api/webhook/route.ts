import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const payload = await req.text();
  const sig = req.headers.get("Stripe-Signature");

  try {
    // Parse payload only for logging, not for the Stripe verification
    // as constructEvent needs the raw string
    const response = JSON.parse(payload);
    const dateTime = new Date(response?.created * 1000).toLocaleDateString();
    const timeString = new Date(response?.created * 1000).toLocaleTimeString();
    
    const event = stripe.webhooks.constructEvent(
      payload,
      sig!,
      process.env.STRIPE_WEBHOOK_KEY!
    );
    
    console.log("Event", event.type);
    console.log("Webhook received at", dateTime, timeString);
    
    // Handle different event types
    switch (event.type) {
      case 'payment_intent.succeeded':
        // Handle successful payment
        break;
      case 'checkout.session.completed':
        // Handle completed checkout
        break;
      // Add other cases as needed
    }

    return NextResponse.json({ status: "Success", event: event.type });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ status: "Failed", error }, { status: 400 });
  }
}