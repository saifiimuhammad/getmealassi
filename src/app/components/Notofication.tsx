// components/Notification.tsx
"use client";
import { useEffect, useState } from "react";

type Props = {
  message: string;
  type?: "success" | "error";
  duration?: number; // in ms
};

export default function Notification({
  message,
  type = "success",
  duration = 3000,
}: Props) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  if (!show) return null;

  return (
    <div
      className={`fixed top-5 right-5 z-50 transition-all duration-300 ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      } text-white px-4 py-2 rounded-xl shadow-lg animate-slide-in`}
    >
      {message}
    </div>
  );
}
