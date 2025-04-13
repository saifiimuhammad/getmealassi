import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { Payment } from "../../models/Payment";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { amount, currency } = req.body as {
      amount: number;
      currency: string;
    };

    if (!amount || !currency) {
      return res
        .status(400)
        .json({ error: "Amount and currency are required." });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types: ["card"],
    });

    let payment;

    if (paymentIntent.status !== "succeeded") {
      payment = new Payment({
        paymentId: paymentIntent.id,
        amount,
        currency,
        status: false,
      });
    } else {
      payment = new Payment({
        paymentId: paymentIntent.id,
        amount,
        currency,
        status: true,
      });
    }

    await payment.save();

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Stripe Error:", error);
    res.status(500).json({ error: (error as Error).message });
  }
}
