"use client"

import React, { useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js';
import { Button } from '../ui/button';
import { checkoutOrder } from '@/lib/actions/order.actions';


loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const Checkout = ({ snippet, userId }: any) => {
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      console.log('Order placed! You will receive an email confirmation.');
    }

    if (query.get('canceled')) {
      console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
    }
  }, []);

  const onCheckout = async () => {
    const snippetToBePurchased = {
      title: snippet.title,
      snippetId: snippet._id,
      price: snippet.price,
      buyerId: userId
    }

    await checkoutOrder(snippetToBePurchased);
  }

  return (
    <form onSubmit={onCheckout} method="post">
      <Button type="submit" role="link" size="lg" className="h-8 w-8 text-sm">
        Buy
      </Button>
    </form>
  )
}

export default Checkout