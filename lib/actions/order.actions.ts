"use server";

import Stripe from 'stripe';
import { connectToDatabase } from '@/database/connection';
import Order from '@/database/models/order.schema';

interface Snippet {
  snippetId: string;
  buyerId: string;
  title: string;
  price: number;
}

export const checkoutOrder = async (snippet: Snippet) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const price = Number(snippet.price) * 100;

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'inr',
            unit_amount: price,
            product_data: {
              name: snippet.title,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        snippetId: snippet.snippetId,
        buyerId: snippet.buyerId,
      },
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/dashboard`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
    });

  return session.url!    
  
} catch (error:any) {
    console.error("Error creating checkout session:", error);
  }
};
  


export const createOrder = async (order: any) => {
    try {
      await connectToDatabase()
      const newOrder = await Order.create(order)
      await newOrder.save()
      return JSON.parse(JSON.stringify(newOrder))  
    } catch (error) {
      console.error("Error creating order:", error)
      throw new Error("Error creating order")
    }
  }