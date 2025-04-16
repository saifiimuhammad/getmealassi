import Link from "next/link";
import React from "react";

const PaymentSuccess = ({ searchParams }: { searchParams: unknown }) => {
  const { amount } = searchParams;

  return (
    <div className="bg-[var(--background)] text-[var(--text)] flex justify-center items-center h-screen">
      <div className="container text-center p-8">
        <h1 className="text-3xl font-bold text-[var(--secondary)]">
          Payment Successful!
        </h1>
        <p className="text-lg font-light mt-4">
          You have successfully donated{" "}
          <span className="pl-2 text-[var(--primary)] text-4xl font-bold">
            ${amount as string}
          </span>
        </p>
        <Link
          href="/"
          className="mt-6 inline-block bg-[var(--accent)] text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-600 transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
