"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--background)] text-[var(--text)] px-4 text-center">
      <div className="text-6xl mb-4">🚨</div>
      <h2 className="text-3xl font-semibold text-[var(--secondary)] mb-2">
        Oops! Something went wrong.
      </h2>
      <p className="text-base mb-6">
        We’re working to fix it. Please try again.
      </p>
      <button
        onClick={() => reset()}
        className="bg-white text-[var(--secondary)] px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform duration-300 cursor-pointer shadow-lg"
      >
        🔄 Try Again
      </button>
    </div>
  );
}
