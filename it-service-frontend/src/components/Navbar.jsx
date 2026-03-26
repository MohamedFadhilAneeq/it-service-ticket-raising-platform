import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Mail, Clock, Ticket, Search, ChevronRight } from "lucide-react";
import logo from "../assets/logo.jpg"; // adjust path if needed

function Navbar() {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Add a shadow to the navbar when scrolling down
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Automatically close mobile menu when a link is clicked
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ];

  // Helper to check if a link is the current active page
  const isActive = (path) => location.pathname === path;

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? "shadow-xl" : ""}`}>
      
      {/* TOP CONTACT BAR */}
      <div className={`bg-gray-100 text-gray-600 text-xs sm:text-sm transition-all duration-300 ${isScrolled ? "hidden md:block py-1" : "py-2"}`}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row md:justify-between items-center gap-2">
          <div className="flex flex-wrap justify-center sm:flex-row gap-4 sm:gap-6 font-medium">
            <a href="tel:+919443680101" className="flex items-center gap-1.5 hover:text-blue-900 transition">
              <Phone size={14} className="text-blue-900" /> +91 94436 80101
            </a>
            <a href="mailto:gencomptech@gmail.com" className="flex items-center gap-1.5 hover:text-blue-900 transition">
              <Mail size={14} className="text-blue-900" /> gencomptech@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <Clock size={14} className="text-blue-900" /> Mon – Sat : 9:00 AM – 7:00 PM
          </div>
        </div>
      </div>

      {/* MAIN NAVBAR */}
      <nav className="bg-blue-950 text-white relative">
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
          
          {/* LOGO */}
          <Link to="/" className="flex items-center group">
            <div className="bg-white p-1 rounded-lg mr-3 group-hover:shadow-lg transition">
              <img
                src={logo}
                alt="Genuine Computers & Technologies"
                className="h-10 w-auto object-contain"
              />
            </div>
            <span className="font-bold text-lg md:text-xl tracking-tight hidden sm:block">
              Genuine <span className="text-yellow-400">Computers</span>
            </span>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex items-center space-x-8">
            <div className="flex space-x-6 font-medium">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative py-2 transition-colors hover:text-yellow-400 ${
                    isActive(link.path) ? "text-yellow-400" : "text-blue-100"
                  }`}
                >
                  {link.name}
                  {/* Active underline indicator */}
                  {isActive(link.path) && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-400 rounded-full"></span>
                  )}
                </Link>
              ))}
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex items-center space-x-4 border-l border-blue-800 pl-6">
              <Link 
                to="/track-ticket" 
                className="flex items-center gap-2 text-sm font-semibold text-blue-100 hover:text-white transition"
              >
                <Search size={16} /> Track Ticket
              </Link>
              <Link 
                to="/raise-ticket" 
                className="flex items-center gap-2 bg-yellow-400 text-blue-950 font-bold px-5 py-2.5 rounded-lg hover:bg-yellow-300 hover:-translate-y-0.5 hover:shadow-lg transition-all"
              >
                <Ticket size={16} /> Raise Ticket
              </Link>
            </div>
          </div>

          {/* MOBILE TOGGLE */}
          <button
            className="lg:hidden p-2 text-blue-100 hover:text-white hover:bg-blue-900 rounded-lg transition"
            onClick={() => setOpen(!open)}
            aria-label="Toggle Menu"
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* MOBILE MENU DROPDOWN */}
        <div 
          className={`lg:hidden absolute top-full left-0 w-full bg-blue-950 border-t border-blue-900 shadow-2xl transition-all duration-300 overflow-hidden ${
            open ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col px-6 py-6 space-y-2 font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                  isActive(link.path) ? "bg-blue-900 text-yellow-400" : "text-blue-100 hover:bg-blue-900 hover:text-white"
                }`}
              >
                {link.name}
                <ChevronRight size={16} className={isActive(link.path) ? "opacity-100" : "opacity-0"} />
              </Link>
            ))}
            
            <div className="w-full h-px bg-blue-800 my-4"></div>

            <Link 
              to="/track-ticket" 
              className="flex items-center justify-center gap-2 w-full p-3 rounded-lg border border-blue-800 text-blue-100 hover:bg-blue-900 transition"
            >
              <Search size={18} /> Track Status
            </Link>
            
            <Link 
              to="/raise-ticket" 
              className="flex items-center justify-center gap-2 w-full p-3 rounded-lg bg-yellow-400 text-blue-950 font-bold hover:bg-yellow-300 transition shadow-lg"
            >
              <Ticket size={18} /> Raise Service Request
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
