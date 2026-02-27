import React from "react";
import Container from "./Container";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <div>
      <nav className="py-4.5">
        <Container>
          <div className="flex items-center justify-between">
            {/* logo */}
            <div className="w-62.25 h-18">
              <Image
                src="/logo.png"
                alt="logo"
                width={250}
                height={100}
                className="w-full h-full object-cover"
              />
            </div>
            {/* navlist */}
            <ul className="flex items-center gap-x-7.5">
              {[
                { id: 1, name: "Home", href: "#" },
                { id: 2, name: "Services", href: "#" },
                { id: 3, name: "Blog", href: "#" },
                { id: 4, name: "Contact Us", href: "#" },
              ].map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className="font-normal font-inter text-[16px] text-black hover:text-black/90 hover:font-semibold transition duration-300 ease-in-out"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* button */}
            <button className="py-2 px-8.5 border border-primary rounded-[30px] text-black font-medium text-[16px] hover:bg-primary hover:text-white transition duration-300 ease-in-out">
              Login
            </button>
          </div>
        </Container>
      </nav>
    </div>
  );
};

export default Navbar;
