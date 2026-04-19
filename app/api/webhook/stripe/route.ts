import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock', {
  apiVersion: '2026-03-25.dahlia',
});

// Use admin client since this is a server webhook overriding RLS potentially
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  const payload = await req.text();
  const signature = req.headers.get('stripe-signature') as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;

  try {
    if (!webhookSecret) throw new Error('Stripe Webhook Secret not set');
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return NextResponse.json({ error: 'Webhook Error' }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        
        // Metadata contains Supabase userId mapping
        const userId = session.metadata?.userId;
        const customerId = session.customer as string;

        if (userId) {
          // Verify user exists in Prisma
          const user = await prisma.user.findFirst({
            where: { email: session.customer_email || undefined }
          });

          if (user) {
            await prisma.subscription.upsert({
              where: { userId: user.id },
              create: {
                userId: user.id,
                stripeId: customerId,
                tier: 'Pro',
                active: true,
              },
              update: {
                stripeId: customerId,
                tier: 'Pro',
                active: true,
              }
            });
            console.log(`✅ Provisioned Pro tier for User ${user.email}`);
          }
        }
        break;
      }
      
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        await prisma.subscription.updateMany({
          where: { stripeId: customerId },
          data: { active: false, tier: 'Bronze' }
        });
        console.log(`❌ Cancelled Pro tier for customer ${customerId}`);
        break;
      }

      default:
        console.log(`Unhandled stripe webhook event type: ${event.type}`);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error: any) {
    console.error(`Webhook DB operation failed: ${error.message}`);
    return NextResponse.json({ error: 'Database Update Error' }, { status: 500 });
  }
}
