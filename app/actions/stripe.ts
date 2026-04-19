"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import Stripe from "stripe";
import { createClient } from "@/lib/supabase-server";

// Fallback Stripe Instance (will throw errors if env vars aren't provided when actually executed)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_mock", {
  apiVersion: "2024-06-20",
});

export async function createCheckoutSession() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user || !user.email) {
    redirect("/auth/login");
    return;
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Stripe secret key must be configured in .env");
  }

  const headersList = await headers();
  const origin = headersList.get("origin") || "http://localhost:3000";

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "VibeCode Arena Pro Tier",
              description: "Unlimited executions and advanced algorithm evaluations.",
            },
            unit_amount: 1500, // $15.00
            recurring: { interval: "month" },
          },
          quantity: 1,
        },
      ],
      mode: "subscription",
      customer_email: user.email,
      success_url: `${origin}/dashboard?checkout=success`,
      cancel_url: `${origin}/pricing?checkout=cancelled`,
      metadata: {
        userId: user.id // Tie Supabase user to Stripe checkout
      }
    });

    if (session.url) {
      redirect(session.url);
    }
  } catch (error: any) {
    console.error("Error creating stripe session:", error);
    throw new Error("Failed to initialize checkout.");
  }
}
