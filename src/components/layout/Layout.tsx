import Footer from "./Footer";
import { Navbar } from "./Navbar";
import { Outlet } from "react-router-dom";
import { useState } from "react";

export const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-900">
      <Navbar onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} />

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-neutral-800/80 backdrop-blur-lg fixed inset-0 z-40 pt-16">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a
              href="/"
              className="text-neutral-300 hover:text-white block px-3 py-2"
            >
              Home
            </a>
            <a
              href="/blog"
              className="text-neutral-300 hover:text-white block px-3 py-2"
            >
              Articles
            </a>
            <a
              href="#categories"
              className="text-neutral-300 hover:text-white block px-3 py-2"
            >
              Categories
            </a>
            <a
              href="#about"
              className="text-neutral-300 hover:text-white block px-3 py-2"
            >
              About
            </a>
          </div>
        </div>
      )}

      <Outlet />
      <Footer />
    </div>
  );
};
