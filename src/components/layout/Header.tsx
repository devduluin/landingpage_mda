"use client";

import React, { useState, useEffect, RefObject } from "react";
import { Menu, X } from "lucide-react";
import LogoDuluinAnimation from "../animations/LogoDuluinAnimation";
import { BsWhatsapp } from "react-icons/bs";
import Image from "next/image";

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
            ? "text-green-600 bg-green-50"
            : "text-gray-700 hover:text-green-600 hover:bg-gray-50"
        }
        before:absolute before:bottom-0 before:left-1/2 before:transform before:-translate-x-1/2
        before:w-0 before:h-0.5 before:bg-green-600 before:transition-all before:duration-300
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
      className="group cursor-pointer
    flex items-center space-x-2
    px-4 py-2.5 rounded-xl
    bg-gradient-to-r from-[#158576] to-[#125c52]
    hover:from-[#158576] hover:to-[#124b44]
    text-white font-medium text-sm
    shadow-lg hover:shadow-xl
    transform transition-all duration-300
    hover:scale-105 active:scale-95
    focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
"
    >
      <BsWhatsapp
        size={18}
        className="hover:animate-[wiggle_1s_ease-in-out_infinite] group-hover:scale-105 transition-transform duration-300"
      />
      <span className="relative inline-block">
        <span className="block transition-transform duration-300">
          WhatsApp
        </span>
      </span>
    </button>
  );
};

interface HeaderProps {
  scrollContainerRef: RefObject<HTMLDivElement | null>;
}

const Header: React.FC<HeaderProps> = ({ scrollContainerRef }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState("");

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
    // { label: "Blog", href: "#blog" },
    // { label: "Karir", href: "#karir" },
    { label: "Tentang Kami", href: "#tentang" },
  ];

  return (
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
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => window.location.reload()}
            className="cursor-pointer flex items-center space-x-2 group"
          >
            <Image
              src="/MDAP_LOGO.svg"
              alt="Logo MDAP"
              width={150}
              height={30}
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
            <WhatsAppButton />
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <Menu
                  className={`absolute inset-0 transition-all duration-300 ${
                    isMenuOpen ? "rotate-180 opacity-0" : "rotate-0 opacity-100"
                  }`}
                  size={24}
                />
                <X
                  className={`absolute inset-0 transition-all duration-300 ${
                    isMenuOpen
                      ? "rotate-0 opacity-100"
                      : "-rotate-180 opacity-0"
                  }`}
                  size={24}
                />
              </div>
            </button>
          </div>
        </div>
      </div>
      <div
        className={`
            md:hidden overflow-hidden transition-all duration-300 ease-in-out
            ${isMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"}
          `}
      >
        <div className="bg-white/95 backdrop-blur-md border-t border-gray-100">
          <nav className="container mx-auto px-6 py-4">
            <div className="space-y-2">
              {navItems.map((item, index) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="
                      block px-4 py-3 rounded-lg text-gray-700 
                      hover:text-green-600 hover:bg-green-50
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
  );
};

export default Header;
