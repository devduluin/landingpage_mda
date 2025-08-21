"use client";

import React, { useState, useEffect, RefObject } from "react";
import Link from "next/link";
import { BsWhatsapp } from "react-icons/bs";
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
    <Link
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
    </Link>
  );
};

const WhatsAppButton: React.FC = () => {
  return (
    <button
  onClick={() => window.open("https://wa.me/6281914710001", "_blank")}
  className={`
    flex group cursor-pointer relative overflow-hidden items-center space-x-2
    px-4 py-2.5 rounded-xl
    bg-gradient-to-r from-orange-500 to-orange-600
    text-white font-medium text-sm
    shadow-lg 
    
    transform transition-all duration-700 ease-out transform-gpu
    hover:scale-[1.05] active:scale-[0.95] 
    active:transition-all active:duration-700
    
    outline-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
    active:outline-none active:ring-0 active:focus:outline-none active:focus:ring-0
    focus-visible:outline-none focus-visible:ring-0

    after:content-[''] after:absolute after:-z-10 
    after:h-0 after:w-0 after:aspect-square
    after:bg-gradient-to-r after:from-green-800 after:to-emerald-600 
    after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2
    after:rounded-full after:transition-all after:duration-700 after:ease-out
    after:opacity-0
    hover:after:h-[300px] hover:after:w-[300px] hover:after:scale-110 hover:after:opacity-90
    hover:after:duration-700 hover:after:ease-in-out
  `}
>
  {/* Icon Container with Airplane Transform Effect */}
  <div className="relative w-[18px] h-[18px] overflow-visible">
    {/* WhatsApp Icon - Default State */}
    <div className="
      absolute inset-0
      transition-all duration-500 ease-out
      group-hover:translate-x-8 group-hover:-translate-y-1 group-hover:opacity-0 group-hover:scale-75
    ">
      <BsWhatsapp
        size={17}
        className="
          transition-all duration-500 ease-out
          group-hover:rotate-45
        "
      />
    </div>

    {/* Airplane Icon - Hover State */}
    <div className="
      absolute inset-0
      transition-all duration-500 ease-out
      -translate-x-6 translate-y-1 opacity-0 scale-125 rotate-180
      group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 group-hover:scale-100 group-hover:rotate-0
    ">
      <svg 
        width="18" 
        height="18" 
        viewBox="0 0 24 24" 
        fill="currentColor"
        className="
          transition-all duration-300 ease-out delay-200
          group-hover:drop-shadow-sm
        "
      >
        {/* Paper Plane / Airplane Path */}
        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
      </svg>
    </div>

    {/* Flight Trail Effect */}
    <div className="
      absolute top-1/2 left-0
      w-0 h-0.5 bg-white/60 rounded-full
      transition-all duration-700 ease-out delay-100
      group-hover:w-6 group-hover:-translate-x-2
      transform -translate-y-1/2
    " />

    {/* Speed Lines */}
    {[...Array(3)].map((_, i) => (
      <div
        key={i}
        className={`
          absolute top-1/2 left-0
          w-0 h-px bg-white/40 rounded-full
          transition-all duration-500 ease-out
          transform -translate-y-1/2
          group-hover:w-4
          ${i === 0 ? 'group-hover:-translate-x-1 group-hover:-translate-y-2' : ''}
          ${i === 1 ? 'group-hover:-translate-x-2 group-hover:-translate-y-1' : ''}
          ${i === 2 ? 'group-hover:-translate-x-3 group-hover:translate-y-0' : ''}
          opacity-0 group-hover:opacity-60
        `}
        style={{ 
          transitionDelay: `${300 + (i * 100)}ms`,
        }}
      />
    ))}

    {/* Spark Effect */}
    {[...Array(4)].map((_, i) => (
      <div
        key={`spark-${i}`}
        className={`
          absolute w-0.5 h-0.5 bg-yellow-200 rounded-full
          transition-all duration-600 ease-out
          ${i === 0 ? 'top-0 right-0 group-hover:translate-x-2 group-hover:-translate-y-1' : ''}
          ${i === 1 ? 'top-2 right-1 group-hover:translate-x-3 group-hover:translate-y-0' : ''}
          ${i === 2 ? 'bottom-0 right-0 group-hover:translate-x-2 group-hover:translate-y-1' : ''}
          ${i === 3 ? 'top-1 left-4 group-hover:translate-x-4 group-hover:-translate-y-0.5' : ''}
          opacity-0 scale-0
          group-hover:opacity-80 group-hover:scale-150
        `}
        style={{ 
          transitionDelay: `${400 + (i * 75)}ms`,
        }}
      />
    ))}
  </div>
  
  {/* Text Animation */}
  <span className="
    relative transition-all duration-300 ease-out
    group-hover:translate-x-0.5
    group-active:translate-x-0
    group-active:transition-all group-active:duration-100
  ">
    WhatsApp
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
    { label: "Beranda", href: "/" },
    { label: "Produk", href: "/produk" },
    { label: "Tentang Kami", href: "/tentang-kami" },
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
              onClick={() => (window.location.href = "/")}
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
                  <Link
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
                  </Link>
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
