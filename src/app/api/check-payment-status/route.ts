import { Payment } from "@/app/models/Payment";
import { connectDb } from "@/app/utils/db";
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { id } = req.query;

    if (!id || typeof id !== "string") {
      return res.status(400).json({ error: "PaymentIntent ID is required." });
    }

    const paymentIntent = await stripe.paymentIntents.retrieve(id);

    res.status(200).json({ status: paymentIntent.status });
  } catch (error) {
    console.error("Stripe Error:", error);
    res.status(500).json({ error: (error as Error).message });
  }
}
