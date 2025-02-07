import Stripe from 'stripe';

if(!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET-KEY is not set");
}

 const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string,{
    apiVersion:"2025-01-27.acacia",

})

export default stripe;