
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
      snippetId: snippet._id.toString(),
      price: snippet.price,
      buyerId: userId
    }

   const sessionUrl = await checkoutOrder(snippetToBePurchased)

   if(sessionUrl) {
    window.location.href = sessionUrl
   } else {
    console.error("Error creating checkout session")
   }
  }

  return (
    <form action={onCheckout}>
      <Button role='link' type='submit' size="lg" className="h-8 w-8 text-sm ml-4">
        Buy
      </Button>
    </form>
  )
}

export default Checkout