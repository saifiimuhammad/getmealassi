"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AddPayment from "../components/AddPayment";
import EditPage from "../components/EditPage";

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeComponent, setActiveComponent] = useState("edit");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mb-4">
      {/* Dashboard Navigation */}
      <div className="flex items-center justify-between flex-col md:flex-row mt-8">
        <div className="flex flex-col items-start gap-y-2">
          <h1 className="text-3xl md:text-5xl font-bold">Dashboard</h1>
          <p className="text-lg md:text-2xl font-light">
            Welcome {session?.user?.name},
          </p>
        </div>

        <div className="flex items-center gap-x-8 mt-8 md:mt-0">
          <button
            onClick={() => setActiveComponent("edit")}
            className="relative text-[var(--secondary)] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-[var(--secondary)] after:transition-all after:duration-300 hover:after:w-full cursor-pointer"
          >
            Edit Page
          </button>
          <button
            onClick={() => setActiveComponent("addPayment")}
            className="relative text-[var(--secondary)] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-[var(--secondary)] after:transition-all after:duration-300 hover:after:w-full cursor-pointer"
          >
            Add Payment Method
          </button>
        </div>
      </div>

      {/* Dynamic rendering container */}
      <div className="w-full mt-8">
        {activeComponent === "edit" && (
          <EditPage loggedUser={session?.user?.email as string} />
        )}
        {activeComponent === "addPayment" && (
          <AddPayment loggedUser={session?.user?.email as string} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
