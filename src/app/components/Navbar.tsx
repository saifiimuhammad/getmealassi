"use client";

import { SidebarOpenIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Search from "./Search";
import Sidebar from "./Sidebar";

type LinksType = {
  title: string;
  to: string;
};

const navLinks: LinksType[] = [
  {
    title: "Home",
    to: "/",
  },
  {
    title: "About",
    to: "/about",
  },
  {
    title: "Contact",
    to: "/contact",
  },
  {
    title: "Blog",
    to: "/blog",
  },
];

const Navbar = () => {
  const { data: session } = useSession();
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const handleOnClick = () => {
    setIsSidebarOpen(true);
  };

  return (
    <nav className="container w-full h-[80px] flex items-center justify-between">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <button
        className="inline-block md:hidden text-[var(--secondary)] font-bold text-3xl cursor-pointer hover:text-[var(--text)] transition-all duration-300"
        onClick={handleOnClick}
      >
        <SidebarOpenIcon />
      </button>
      <Link href="/" className="hidden md:inline-block">
        <div
          className={`logo text-[var(--primary)] font-bold text-3xl cursor-pointer hover:text-[var(--secondary)] transition-all duration-300`}
        >
          Getmealassi
        </div>
      </Link>
      <Search />
      <ul className="nav-menu hidden md:flex items-center justify-center gap-x-8">
        {navLinks.map((link, key) => {
          return (
            <li
              key={key}
              className={`relative text-[var(--secondary)] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-[var(--secondary)] after:transition-all after:duration-300 hover:after:w-full`}
            >
              <a href={link.to}>{link.title}</a>
            </li>
          );
        })}
      </ul>
      <div className="flex items-center justify-center gap-x-4">
        {session ? (
          <div className="relative">
            <button
              id="dropdownDividerButton"
              data-dropdown-toggle="dropdownDivider"
              className="text-[var(--text)] cursor-pointer font-medium text-sm px-2 md:px-5 py-2.5 text-center inline-flex items-center"
              type="button"
              onClick={() => setShowDropdown(!showDropdown)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
            >
              <Image
                src={session.user?.image || "/default-avatar.png"}
                alt="User Profile"
                height={40}
                width={40}
                className="rounded-full h-[30px] w-[30px] md:h-[40px] md:w-[40px]"
              />
              <svg
                className="w-2.5 h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            <div
              id="dropdownDivider"
              className={`absolute right-3 z-10 ${
                showDropdown ? "" : "hidden"
              } bg-[var(--secondary)] divide-y divide-gray-100 rounded-lg shadow-sm w-44`}
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDividerButton"
              >
                <li>
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/user/${session.user?.name}`}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                  >
                    Your Page
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                  >
                    Settings
                  </Link>
                </li>
              </ul>
              <div className="py-2">
                <button
                  onClick={() => signOut()}
                  className="block w-full text-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer"
                >
                  Signout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <Link href={"/login"}>
              <button className="hidden lg:inline-block px-6 py-3 rounded-full bg-[var(--accent)] text-[var(--background)] cursor-pointer hover:bg-[#0060cc] hover:text-white transition-all duration-300">
                Get started
              </button>
            </Link>
            <Link href={"/login"}>
              <button
                className={`relative text-[var(--secondary)] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-[var(--secondary)] after:transition-all after:duration-300 hover:after:w-full cursor-pointer`}
              >
                Login
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
