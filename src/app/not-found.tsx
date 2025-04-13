import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container h-screen mx-auto flex items-center justify-center flex-col gap-y-4 bg-white text-black">
      <h2 className="text-3xl font-bold">Not Found</h2>
      <p className="text-xl font-extralight">
        Could not find requested resource
      </p>
      <Link
        href="/"
        className="relative text-black after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-black after:transition-all after:duration-300 hover:after:w-full"
      >
        Return Home
      </Link>
    </div>
  );
}
