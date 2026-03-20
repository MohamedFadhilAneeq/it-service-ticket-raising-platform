import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.jpg"; // adjust path if needed

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* TOP CONTACT BAR */}
      <div className="bg-gray-100 text-sm">
        <div className="max-w-7xl mx-auto px-6 py-2 flex flex-col md:flex-row md:justify-between gap-2">
          <div className="flex flex-col sm:flex-row gap-4 text-gray-700">
            <span>📞 +91 94436 80101</span>
            <span>📧 gencomptech@gmail.com</span>
          </div>
          <div className="text-gray-600">
            ⏰ Mon – Sat : 9:00 AM – 7:00 PM
          </div>
        </div>
      </div>

      {/* MAIN NAVBAR */}
      <nav className="bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          
          {/* LOGO */}
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="Genuine Computers & Technologies"
              className="h-10 object-contain"
            />
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex space-x-6 font-medium">
            <Link to="/" className="hover:text-yellow-400">Home</Link>
            <Link to="/about" className="hover:text-yellow-400">About Us</Link>
            <Link to="/services" className="hover:text-yellow-400">Services</Link>
            <Link to="/contact" className="hover:text-yellow-400">Contact</Link>
            <Link to="/raise-ticket" className="hover:text-yellow-400">Raise Ticket</Link>
            <Link to="/track-ticket" className="hover:text-yellow-400">Track Ticket</Link>
          </div>

          {/* MOBILE TOGGLE */}
          <button
            className="md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle Menu"
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {open && (
          <div className="md:hidden bg-blue-900 border-t border-blue-800">
            <div className="flex flex-col px-6 py-4 space-y-4 font-medium">
              <Link onClick={() => setOpen(false)} to="/">Home</Link>
              <Link onClick={() => setOpen(false)} to="/about">About Us</Link>
              <Link onClick={() => setOpen(false)} to="/services">Services</Link>
              <Link onClick={() => setOpen(false)} to="/contact">Contact</Link>
              <Link onClick={() => setOpen(false)} to="/raise-ticket">Raise Ticket</Link>
              <Link onClick={() => setOpen(false)} to="/track-ticket">Track Ticket</Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
