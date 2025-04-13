"use client";

import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { FormEvent, useEffect, useState } from "react";
import convertToSubcurrency from "../lib/convertToSubcurrency";
import Loader from "./Loader";

const CheckoutPage = ({
  amount,
  name,
  message,
  reciever,
}: {
  amount: number;
  name: string;
  message: string;
  reciever: string;
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetch("api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: convertToSubcurrency(amount),
        name,
        message,
        reciever,
      }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) return;

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `http://localhost:3000/payment-success?amount=${amount}`,
      },
    });

    if (error) {
      setErrorMessage(error.message);
    }

    setLoading(false);
  };

  if (!stripe || !clientSecret || !elements) {
    return <Loader />;
  }

  return (
    <form onSubmit={handleSubmit} className="w-full bg-white p-4 rounded-lg">
      {clientSecret && <PaymentElement />}
      {errorMessage && <div>{errorMessage}</div>}
      <button
        className="bg-[var(--accent)] text-white py-2 rounded-lg w-full cursor-pointer hover:bg-[#0060cc] transition-all duration-300 mt-8"
        disabled={!stripe || loading}
      >
        {!loading ? `Pay $${amount}` : "Processing"}
      </button>
    </form>
  );
};
export default CheckoutPage;
