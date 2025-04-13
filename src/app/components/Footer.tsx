import Link from "next/link";

const footerLinks = [
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

const Footer = () => {
  return (
    <footer className="bg-[var(--background)] text-[var(--text)] py-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Section - Branding & About */}
        <div>
          <h2 className="text-2xl font-bold text-[var(--secondary)]">
            Getmealassi
          </h2>
          <p className="mt-2 text-sm w-[70%]">
            A crowdfunding platform to support creators and projects easily.
          </p>
        </div>

        {/* Middle Section - Quick Links */}
        <div className="flex flex-col space-y-3">
          <h3 className="text-lg font-semibold">Quick Links</h3>

          {footerLinks.map((link, key) => {
            return (
              <li key={key} className="list-none">
                <Link
                  href={link.to}
                  className="relative text-[var(--secondary)] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-[var(--secondary)] after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link.title}
                </Link>
              </li>
            );
          })}
        </div>

        {/* Right Section - Newsletter & Socials */}
        <div>
          <h3 className="text-lg font-semibold">Stay Updated</h3>
          <p className="text-sm">Subscribe to our newsletter for updates.</p>
          <div className="mt-3 flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 rounded-l-md border border-[var(--secondary)] focus:outline-none"
            />
            <button className="bg-[var(--accent)] text-white px-4 py-2 rounded-r-md hover:bg-[var(--secondary)] transition-all">
              Subscribe
            </button>
          </div>

          {/* Social Icons */}
          <div className="mt-4 flex space-x-4">
            <Link href="#" className="hover:text-[var(--accent)]">
              <i className="ri-twitter-fill text-2xl"></i>
            </Link>
            <Link href="#" className="hover:text-[var(--accent)]">
              <i className="ri-facebook-fill text-2xl"></i>
            </Link>
            <Link href="#" className="hover:text-[var(--accent)]">
              <i className="ri-instagram-fill text-2xl"></i>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Section - Copyright */}
      <div className="text-center text-sm mt-8 border-t pt-4 border-[var(--secondary)]">
        © {new Date().getFullYear()} Getmealassi. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
