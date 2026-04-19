'use server';

import { Stripe } from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  apiVersion: '2023-10-16' as any,
});

export async function createCheckoutSession(priceId: string) {
  // Stub for creating a Stripe Checkout Session
  console.log('Creating checkout session for price:', priceId);
  return { url: 'https://checkout.stripe.test/c/pay/cs_test_mock' };
}
