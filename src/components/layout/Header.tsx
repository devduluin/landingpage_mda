"use client";

import React, { useState, useEffect, RefObject } from "react";
import { BsWhatsapp } from "react-icons/bs";
import Image from "next/image";
import MDALogo from "../animated/MDALogoAnimate";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({
  href,
  children,
  isActive = false,
}) => {
  return (
    <a
      href={href}
      className={`
        relative px-4 py-2 rounded-lg font-medium transition-all duration-300 ease-in-out
        ${
          isActive
            ? "text-orange-600 bg-orange-50"
            : "text-gray-700 hover:text-orange-600 hover:bg-orange-50"
        }
        before:absolute before:bottom-0 before:left-1/2 before:transform before:-translate-x-1/2
        before:w-0 before:h-0.5 before:bg-orange-600 before:transition-all before:duration-300
        hover:before:w-3/4
        ${isActive ? "before:w-3/4" : ""}
      `}
    >
      {children}
    </a>
  );
};

const WhatsAppButton: React.FC = () => {
  return (
    <button
      onClick={() => window.open("https://wa.me/6281910031000", "_blank")}
      className={`
        flex group cursor-pointer relative overflow-hidden items-center space-x-2
        px-4 py-2.5 rounded-xl
        bg-gradient-to-r from-orange-500 to-orange-600
        text-white font-medium text-sm
        shadow-lg 
        transform transition-all duration-300
        hover:scale-105 active:scale-95 outline-none
        focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2

        active:outline-none active:ring-0 active:focus:outline-none active:focus:ring-0
        focus-visible:outline-none focus-visible:ring-0

        after:content-[''] after:absolute after:-z-10 after:h-1 after:w-1
        after:bg-green-900 after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2
        after:rounded-full after:transition-all after:duration-[1500ms]
        hover:after:scale-[300]
      `}
    >
      <BsWhatsapp
        size={18}
        className="group-hover:scale-105 transition-transform duration-300"
      />
      <span>WhatsApp</span>
    </button>
  );
};

interface HeaderProps {
  scrollContainerRef: RefObject<HTMLDivElement | null>;
}

const Header: React.FC<HeaderProps> = ({ scrollContainerRef }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeSection] = useState("");

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    const handleScroll = () => {
      if (scrollContainer) {
        setScrollY(scrollContainer.scrollTop);
      }
    };

    scrollContainer?.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      scrollContainer?.removeEventListener("scroll", handleScroll);
    };
  }, [scrollContainerRef]);

  const navItems = [
    { label: "Produk", href: "#produk" },
    { label: "Tentang Kami", href: "#tentang" },
  ];

  return (
    <>
      <header
        className={`
            w-full z-50 transition-all duration-500 ease-in-out
            ${
              scrollY > 20
                ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100"
                : "bg-white/80 backdrop-blur-sm"
            }
          `}
      >
        <div className="container mx-auto px-4 max-w-7xl py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => window.location.reload()}
              className="cursor-pointer flex items-center space-x-2 group"
            >
              <MDALogo
                width={180}
                height={50}
                className="header-logo transition-transform duration-300 group-hover:scale-105"
              />
            </button>

            <nav className="hidden md:flex items-center space-x-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.label}
                  href={item.href}
                  isActive={activeSection === item.label.toLowerCase()}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <div className="hidden md:flex">
                <WhatsAppButton />
              </div>

              <div className="md:hidden">
                <input
                  id="hamburger-checkbox"
                  className="hamburger-checkbox"
                  type="checkbox"
                  checked={isMenuOpen}
                  onChange={(e) => setIsMenuOpen(e.target.checked)}
                />
                <label
                  className="hamburger-toggle"
                  htmlFor="hamburger-checkbox"
                >
                  <div className="hamburger-bar hamburger-bar--top"></div>
                  <div className="hamburger-bar hamburger-bar--middle"></div>
                  <div className="hamburger-bar hamburger-bar--bottom"></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`
              md:hidden overflow-hidden transition-all duration-300 ease-in-out
              ${isMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"}
            `}
        >
          <div className="bg-white/95 backdrop-blur-md border-t border-gray-100">
            <nav className="container mx-auto px-4 max-w-7xl py-4">
              <div className="space-y-2">
                {navItems.map((item, index) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="
                        block px-4 py-3 rounded-lg text-orange-500 
                        hover:text-orange-600 hover:bg-green-50
                        transition-all duration-200
                        transform hover:translate-x-2
                      "
                    style={{
                      animationDelay: `${index * 50}ms`,
                      animation: isMenuOpen
                        ? "slideInLeft 0.3s ease-out forwards"
                        : "",
                    }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
                <div className="pt-4 border-t border-gray-100">
                  <WhatsAppButton />
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
