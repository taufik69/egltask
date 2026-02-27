import React from "react";
import Container from "./Container";
import Image from "next/image";
import Link from "next/link";
import { FaYoutube, FaLinkedinIn, FaMediumM, FaBookmark } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-linear-to-b from-[rgba(73,163,248,0)] to-[rgba(15,209,186,0.06)] pt-20 pb-10">
      <Container>
        <div className="flex flex-col md:flex-row justify-between gap-y-12 pb-16 border-b border-teal-gray/50">
          {/* Left Side: Logo and Description */}
          <div className="max-w-107.5">
            <div className="w-52 mb-8">
              <Image
                src="/logo.png"
                alt="Everything Green Logo"
                width={200}
                height={60}
                className="w-full h-auto"
              />
            </div>
            <p className="text-medium-gray font-regular leading-relaxed">
              Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua. Ut enim ad minim veniam, quis
              nostrud exercitation ullamco laboris nisi ut aliquip ex.
            </p>
          </div>

          {/* Right Side: Links Sections */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-12 lg:gap-x-24">
            {/* Solutions */}
            <div>
              <h4 className="text-black font-semibold text-lg mb-6">
                Solutions
              </h4>
              <ul className="space-y-4">
                {["Web Tool", "Consulting", "Research"].map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-medium-gray hover:text-primary transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-black font-semibold text-lg mb-6">Company</h4>
              <ul className="space-y-4">
                {["About", "Methodology", "Partners"].map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-medium-gray hover:text-primary transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Community */}
            <div>
              <h4 className="text-black font-semibold text-lg mb-6">
                Community
              </h4>
              <ul className="space-y-4">
                {["Blog", "Events", "Open-Source Data"].map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-medium-gray hover:text-primary transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright and Socials */}
        <div className="mt-10 flex flex-col md:flex-row justify-between items-center gap-y-6">
          <p className="text-medium-gray text-sm">
            Copyright © 2025 everythinggreen. All Rights Reserved
          </p>

          <div className="flex items-center gap-x-4">
            {[
              { icon: <FaYoutube />, href: "#" },
              { icon: <FaLinkedinIn />, href: "#" },
              { icon: <FaMediumM />, href: "#" },
              { icon: <FaBookmark />, href: "#" },
            ].map((social, index) => (
              <Link
                key={index}
                href={social.href}
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-medium-gray shadow-sm hover:text-primary transition-all duration-300"
              >
                {social.icon}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
