// @ts-ignore

import { Payment } from "@/app/models/Payment";
import { User } from "@/app/models/User";
import { connectDb } from "@/app/utils/db";
import Stripe from "stripe";

export async function POST(req: Request) {
  try {
    const { amount, name, message, reciever } = await req.json();

    connectDb(process.env.MONGODB_URI as string, "GetmeaLassi");

    const user = await User.findOne({ email: reciever });

    if (!user)
      return Response.json(
        {
          success: false,
          message: "Creator not found!",
        },
        {
          status: 404,
        }
      );

    if (!user?.stripeInfo?.secretKey)
      return Response.json(
        {
          success: false,
          message: "Creator did not added any payment method yet!",
        },
        {
          status: 404,
        }
      );

    const stripe = new Stripe(user?.stripeInfo?.secretKey as string);

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    const payment = {
      paymentId: paymentIntent.id,
      name,
      amount,
      status: true,
      reciever: user._id,
      message,
    };

    await Payment.create(payment);

    return Response.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Internal Error", error);

    return Response.json(
      {
        success: false,
        message: "Internal Server Error",
        error: (error as Error).message,
      },
      {
        status: 500,
      }
    );
  }
}
