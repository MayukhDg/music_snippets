import stripe from 'stripe'
import { NextResponse } from 'next/server'
import { createOrder, incrementDownloadCount } from '@/lib/actions/order.actions'
import User from '@/database/models/user.schema'
import { addtoDownloadedSnippets } from '@/lib/actions/user.actions'

export async function POST(request: Request) {
  const body = await request.text()

  const sig = request.headers.get('stripe-signature') as string
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

  let event

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
  } catch (err) {
    return NextResponse.json({ message: 'Webhook error', error: err })
  }

  // Get the ID and type
  const eventType = event.type

  // CREATE
  if (eventType === 'checkout.session.completed') {
    const { id, amount_total, metadata } = event.data.object

    const order = {
      stripeId: id,
      snippetId: metadata?.snippetId || '',
      buyerId: metadata?.buyerId || '',
      totalAmount: amount_total,
      createdAt: new Date(),
    }

    const newOrder = await createOrder(order)
    await incrementDownloadCount(order.snippetId)
    return NextResponse.json({ message: 'OK', order: newOrder })
  }

  return new Response('', { status: 200 })
}