import { SidebarCloseIcon } from "lucide-react";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

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

const Sidebar = ({
  isSidebarOpen,
  setIsSidebarOpen,
}: {
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <aside
      className={`${
        isSidebarOpen ? "" : "hidden transition-all duration-300"
      } fixed z-50 top-0 left-0 w-[70%] h-full bg-[var(--background)] px-4 py-8 flex items-start justify-start flex-col gap-y-8 shadow-xl shadow-zinc-300 transition-all duration-300`}
    >
      <div className="w-full flex items-center justify-between">
        <Link
          href={"/"}
          className="logo text-[var(--primary)] font-bold text-2xl cursor-pointer hover:text-[var(--secondary)] transition-all duration-300"
        >
          GetmeaLassi
        </Link>
        <button
          className="pr-4 cursor-pointer"
          onClick={() => setIsSidebarOpen(false)}
        >
          <SidebarCloseIcon />
        </button>
      </div>
      <ul className="flex items-start justify-center flex-col gap-y-5 pl-4">
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
    </aside>
  );
};
export default Sidebar;
