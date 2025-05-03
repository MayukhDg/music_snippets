"use server";

import Stripe from 'stripe';
import { connectToDatabase } from '@/database/connection';
import Order from '@/database/models/order.schema';
import mongoose from 'mongoose';
import Snippet from '@/database/models/snippets.schema';
import { addtoDownloadedSnippets } from './user.actions';

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
  

export async function incrementDownloadCount(snippetId: string): Promise<void> {
  try {
    await connectToDatabase();  
    const updatedSnippet = await Snippet.findByIdAndUpdate(
          snippetId,
          { $inc: { downloadCount: 1 } },
          { new: true }
      );
    await updatedSnippet?.save(); // Save the updated snippet to persist changes'
     return JSON.parse(JSON.stringify(updatedSnippet)); // Return the updated snippet
  } catch (error) {
      console.error('Failed to update download count:', error);
      throw error;
  }
}



export const createOrder = async (order: any) => {
    try {
      await connectToDatabase()
      const newOrder = await Order.create(order)
      await newOrder.save()
      await addtoDownloadedSnippets(
            order.buyerId, order.snippetId)
      return JSON.parse(JSON.stringify(newOrder))  
    } catch (error) {
      console.error("Error creating order:", error)
      throw new Error("Error creating order")
    }
  }


  export async function getOrdersByBuyerId(buyerId: string) {
    try {
      const orders = await Order.find({ buyerId: new mongoose.Types.ObjectId(buyerId) })
        .populate({path:'snippetId', model:Snippet}) // optional: populates snippet details
        .sort({ createdAt: 'desc' }); // newest orders first
  
      return JSON.parse(JSON.stringify(orders));
    } catch (error) {
      console.error('Error fetching orders by buyerId:', error);
      return [];
    }
  }


  export async function getUserDownloadCount(userId: string): Promise<number> {
    try {
        await connectToDatabase(); // Ensure the database connection is established
        const result = await Snippet.aggregate([
            {
                $match: {
                    author: new mongoose.Types.ObjectId(userId),
                },
            },
            {
                $group: {
                    _id: null,
                    totalDownloads: { $sum: '$downloadCount' },
                },
            },
        ]);

        return result[0]?.totalDownloads || 0;
    } catch (error) {
        console.error('Error calculating user download count:', error);
        throw error;
    }
}


export async function getUserOrdersWithUniqueSnippets(userId:string) {
   try {
    
    await connectToDatabase(); // Ensure the database connection is established
    const objectId = new mongoose.Types.ObjectId(userId);

    const uniqueOrders = await Order.aggregate([
      {
        $match: { buyerId: objectId } // filter by user
      },
      {
        $sort: { createdAt: -1 } // optional: prefer latest orders
      },
      {
        $group: {
          _id: "$snippetId",
          order: { $first: "$$ROOT" }
        }
      },
      {
        $replaceRoot: { newRoot: "$order" }
      },
      {
        $lookup: {
          from: "snippets",
          localField: "snippetId",
          foreignField: "_id",
          as: "snippetId"
        }
      },
      {
        $unwind: "$snippetId"
      }
    ]);
  
    return JSON.parse(JSON.stringify(uniqueOrders));
   } catch (error) {
    console.error('Error fetching unique orders:', error);
   }
}


