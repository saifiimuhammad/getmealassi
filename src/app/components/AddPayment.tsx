"use client";

import { useState } from "react";

const AddPayment = ({ loggedUser }: { loggedUser: string }) => {
  const [secretKey, setSecretKey] = useState<string>("");
  const [publishableKey, setPublishableKey] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/save-stripe-keys/${loggedUser}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ secretKey, publishableKey }),
      });

      if (!response.ok) throw new Error("Failed to save keys.");

      alert("Stripe keys saved successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to save keys. Please try again.");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-8">Add Stripe Payment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Stripe Secret Key</label>
          <input
            type="password"
            className="w-full p-2 border rounded"
            placeholder="sk_live_..."
            value={secretKey}
            onChange={(e) => setSecretKey(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block font-medium">Stripe Publishable Key</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="pk_live_..."
            value={publishableKey}
            onChange={(e) => setPublishableKey(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[var(--accent)] hover:bg-[#0060cc] text-white px-4 py-2 rounded cursor-pointer"
        >
          Save Payment Settings
        </button>
      </form>
    </div>
  );
};

export default AddPayment;
