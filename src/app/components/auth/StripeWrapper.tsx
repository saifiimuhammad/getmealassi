"use client";

import { ReactNode } from "react";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const StripeWrapper = ({ children }: { children: ReactNode }) => {
  return <Elements stripe={stripePromise}>{children}</Elements>;
};
export default StripeWrapper;
