import { Payment } from "@/app/models/Payment";
import { User } from "@/app/models/User";
import { connectDb } from "@/app/utils/db";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: NextRequest) {
  try {
    const { amount, name, message, reciever } = await req.json();

    connectDb(process.env.MONGODB_URI as string, "GetmeaLassi");

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    const user = await User.findOne({ email: reciever });

    const payment = {
      paymentId: paymentIntent.id,
      name,
      amount,
      status: true,
      reciever: user._id,
      message,
    };

    await Payment.create(payment);

    return NextResponse.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Internal Error", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
        error,
      },
      {
        status: 500,
      }
    );
  }
}
