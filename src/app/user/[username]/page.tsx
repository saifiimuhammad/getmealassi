"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import supporterImage from "../../assets/gifs/user.gif";
import coverImage from "../../assets/images/defaultCover.png";
import profileImage from "../../assets/images/defaultProfile.jpg";

import { useSession } from "next-auth/react";
import {
  FaInstagram as InstagramIcon,
  FaStripe as StripeIcon,
} from "react-icons/fa";
import { FaXTwitter as TwitterIcon } from "react-icons/fa6";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutPage from "../../components/CheckoutPage";
import convertToSubcurrency from "../../lib/convertToSubcurrency";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLC_KEY === undefined) {
  throw new Error("Stripe public key is not defined.");
}

// const stripePromise = loadStripe(
//   process.env.NEXT_PUBLIC_STRIPE_PUBLC_KEY as string
// );

type AmountType = {
  amount: string;
  value: number;
};

const amountList: AmountType[] = [
  { amount: "$5", value: 5 },
  { amount: "$10", value: 10 },
  { amount: "$25", value: 25 },
  { amount: "$50", value: 50 },
  { amount: "$100", value: 100 },
  { amount: "$500 ⭐", value: 500 },
];

const Username = ({
  params,
}: {
  params: {
    username: string;
  };
}) => {
  const [amount, setAmount] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [user, setUser] = useState({});
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);

  const { data: session } = useSession();

  const stripePromise = loadStripe(user?.stripeInfo?.publishableKey as string);

  const getData = async () => {
    setLoading(true);
    fetch(`/api/payments/${params.username}`)
      .then((res) => res.json())
      .then((data) => {
        setPayments(data.payments);
        setUser(data.user);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching payments:", error);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[var(--secondary)]"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Banner Image and the Profile Image */}
      <div className="relative w-full mb-8 md:mb-32">
        <div className="rounded-full absolute -bottom-12 md:-bottom-30 left-1/2 transform -translate-x-1/2 border-4 md:border-8 border-white">
          <Image
            src={user?.avatar?.url || profileImage}
            alt="avatar"
            width={230}
            height={230}
            className="object-fill w-[80px] md:w-[230px] rounded-full"
          />
        </div>
        <div className="cover md:h-88 bg-[var(--secondary)]">
          <Image
            src={user?.banner?.url || coverImage}
            alt="cover"
            width={1200}
            height={400}
            className="w-full md:h-88"
          />
        </div>
      </div>

      {/* User Information, Socials and Support links */}
      <div className="w-full py-10 flex items-center justify-center flex-col gap-y-1">
        <h1 className="text-center text-2xl md:text-3xl font-bold">
          {user?.name}
        </h1>
        <h5 className="text-center text-sm md:text-lg font-light">
          {/* creating modern web apps */}
          {user?.tagline || "No tagline"}
        </h5>
        <h5 className="text-center text-sm md:text-lg">{user?.email}</h5>

        <div className="flex items-center justify-center flex-col gap-y-2 w-[70%] md:w-1/6 mt-4">
          <button className="bg-[var(--accent)] text-white py-2 rounded-lg w-full cursor-pointer hover:bg-[#0060cc] transition-all duration-300">
            Join for free
          </button>
          <button className="bg-[var(--secondary)] text-white py-2 rounded-lg w-full cursor-pointer hover:bg-[#333333] transition-all duration-300">
            See membership options
          </button>
        </div>
        <div className="flex items-center justify-center gap-x-4 mt-4">
          <Link
            href={"https://www.instagram.com/"}
            className="text-3xl text-[var(--secondary)] hover:text-[#333333] transition-all duration-300"
          >
            <InstagramIcon />
          </Link>
          <Link
            href={"https://twitter.com/"}
            className="text-3xl text-[var(--secondary)] hover:text-[#333333] transition-all duration-300"
          >
            <TwitterIcon />
          </Link>
        </div>
      </div>

      {/* Supporters list and payment options for subscription */}
      <div className="flex items-stretch justify-center flex-wrap md:flex-nowrap gap-4 w-full container pt-10 pb-16">
        {/* Supporters List */}
        <div className="supporters w-full md:w-1/2 flex items-start justify-start flex-col gap-y-6 p-8 rounded-lg shadow shadow-zinc-200">
          <h2 className="text-2xl font-medium">Supporters 🌟</h2>
          <ul className="flex flex-col gap-y-2 w-full overflow-y-scroll h-100 px-2">
            {payments.length > 0 ? (
              payments.map((p, key) => (
                <li
                  key={key}
                  className="text-md font-light flex items-center justify-start w-full"
                >
                  <Image
                    src={supporterImage}
                    alt="Supporter gif"
                    width={80}
                    height={80}
                    className="hidden md:block"
                  />{" "}
                  {p.name} donated ${p.amount / 100} with a message &quot;
                  {p.message}
                  &quot;
                </li>
              ))
            ) : (
              <>No supporters yet.</>
            )}
          </ul>
        </div>

        {/* Payment options for members */}
        <div className="payment w-full md:w-1/2 p-8 flex flex-col items-center justify-between bg-[#fff5cc] rounded-lg shadow shadow-zinc-200">
          <div className="w-full flex flex-col items-start justify-center gap-y-4">
            <h2 className="text-2xl font-medium">Support & Donate 💳</h2>
            <div className="payment-field flex flex-col md:flex-row items-center justify-center gap-1 w-full">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-2 border border-zinc-400 rounded-lg bg-white"
                value={name}
                onChange={(e) => setName(String(e.target.value))}
              />
              <input
                type="text"
                placeholder="Your Message"
                className="w-full p-2 border border-zinc-400 rounded-lg bg-white"
                value={message}
                onChange={(e) => setMessage(String(e.target.value))}
              />
            </div>
            <div className="payment-field flex items-center justify-between gap-x-1 w-full">
              <input
                type="number"
                placeholder="Enter amount"
                className="w-full p-2 border border-zinc-400 rounded-lg bg-white"
                value={amount === 0 ? "" : amount}
                onChange={(e) => setAmount(Number(e.target.value))}
              />
            </div>

            {/* Fixed amount list */}
            <div className="flex items-center justify-start flex-wrap gap-4 w-full">
              {amountList.map((item, index) => {
                return (
                  <button
                    key={index}
                    className="bg-white text-[var(--text)] text-sm py-1 px-2 rounded-lg flex items-center justify-center gap-x-2 cursor-pointer hover:bg-zinc-100 transition-all duration-300"
                    onClick={() => setAmount(item.value)}
                  >
                    {item.amount}
                  </button>
                );
              })}
            </div>

            {amount > 0 && name.length > 0 && message.length > 0 && (
              <Elements
                stripe={stripePromise}
                options={{
                  mode: "payment",
                  amount: convertToSubcurrency(amount), // cents
                  currency: "usd",
                }}
              >
                <CheckoutPage
                  amount={amount}
                  name={name}
                  message={message}
                  reciever={session?.user?.email as string}
                />
              </Elements>
            )}
          </div>
          <div className="flex items-center justify-center gap-x-3 mt-20">
            <span>Powered by</span> <StripeIcon className="text-7xl" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Username;
