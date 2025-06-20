
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import AuthButton from "./AuthButton";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/#about" },
    { name: "Services", href: "/#services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Blog", href: "/blog" },
    { name: "Resume", href: "/resume" },
    { name: "Testimonials", href: "/testimonials" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "py-3 bg-dark/80 backdrop-blur-lg shadow-lg"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <a
          href="/"
          className="text-2xl font-bold text-white flex items-center gap-2"
        >
          <span className="text-gradient-gold">Nehemiah</span>
        </a>

        {/* Desktop menu */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="nav-link">
              {link.name}
            </a>
          ))}
          <AuthButton />
        </div>

        {/* Mobile menu button */}
        <button
          className="lg:hidden text-white focus:outline-none"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden absolute top-full left-0 w-full bg-dark shadow-lg transform transition-all duration-300 ease-in-out ${
          isMenuOpen 
            ? "opacity-100 translate-y-0 visible" 
            : "opacity-0 -translate-y-4 invisible"
        }`}
      >
        <div className="container mx-auto py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="nav-link block py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <div className="mt-2">
            <AuthButton />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
