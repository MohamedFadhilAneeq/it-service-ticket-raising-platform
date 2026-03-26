import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ChevronRight,
  Clock,
  Wrench
} from "lucide-react";

function Footer() {
  const currentYear = new Date().getFullYear(); // Automatically updates the year

  return (
    <footer className="bg-blue-950 text-blue-100 pt-16 border-t-4 border-yellow-400">
      <div className="max-w-7xl mx-auto px-6 grid gap-12 md:grid-cols-2 lg:grid-cols-4 pb-12">

        {/* 1. COMPANY INFO & SOCIALS */}
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
              <Wrench className="text-yellow-400" size={24} />
              Genuine Computers
            </h3>
            <p className="text-blue-200 text-sm leading-relaxed mt-4">
              Your trusted partner for reliable computer and IT service solutions. 
              We provide professional repair, installation, and troubleshooting services 
              to keep your digital life running smoothly.
            </p>
          </div>

          {/* SOCIAL ICONS */}
          <div className="flex gap-3">
            {[
              { icon: Facebook, label: "Facebook" },
              { icon: Twitter, label: "Twitter" },
              { icon: Instagram, label: "Instagram" },
              { icon: Linkedin, label: "LinkedIn" }
            ].map((Social, index) => (
              <a 
                key={index}
                href="#" 
                aria-label={Social.label}
                className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center text-white hover:bg-yellow-400 hover:text-blue-950 hover:-translate-y-1 transition-all duration-300 shadow-md"
              >
                <Social.icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* 2. QUICK LINKS */}
        <div>
          <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">Quick Links</h3>
          <ul className="space-y-3 text-sm">
            {[
              { name: "Home", path: "/" },
              { name: "About Us", path: "/about" },
              { name: "Our Services", path: "/services" },
              { name: "Raise Service Ticket", path: "/raise-ticket" },
              { name: "Track Ticket Status", path: "/track-ticket" },
            ].map((link, index) => (
              <li key={index}>
                <Link 
                  to={link.path} 
                  className="flex items-center gap-2 hover:text-yellow-400 transition-colors group"
                >
                  <ChevronRight size={14} className="text-blue-500 group-hover:text-yellow-400 group-hover:translate-x-1 transition-all" />
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* 3. CORE SERVICES */}
        <div>
          <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">Our Services</h3>
          <ul className="space-y-3 text-sm">
            {[
              "Laptop & Desktop Repair",
              "Printer Servicing",
              "Software Installation",
              "Network Troubleshooting",
              "Data Recovery",
              "Virus & Malware Removal"
            ].map((service, index) => (
              <li key={index}>
                <Link 
                  to="/services" 
                  className="flex items-center gap-2 hover:text-yellow-400 transition-colors group"
                >
                  <ChevronRight size={14} className="text-blue-500 group-hover:text-yellow-400 group-hover:translate-x-1 transition-all" />
                  {service}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* 4. CONTACT INFO & HOURS */}
        <div>
          <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">Contact Us</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <div className="mt-1 bg-blue-900 p-2 rounded text-yellow-400 flex-shrink-0">
                <MapPin size={16} />
              </div>
              <span className="leading-relaxed text-blue-100">
                Shop no 81-A, Ist Floor, Cauvery Road,<br />
                Opp to Al-ameen Matriculation School,<br />
                Karungalpalayam,<br />
                Erode 638003
              </span>
            </li>
            <li className="flex items-center gap-3">
              <div className="bg-blue-900 p-2 rounded text-yellow-400 flex-shrink-0">
                <Phone size={16} />
              </div>
              <a href="tel:+919443680101" className="hover:text-yellow-400 transition-colors">
                +91 94436 80101
              </a>
            </li>
            <li className="flex items-center gap-3">
              <div className="bg-blue-900 p-2 rounded text-yellow-400 flex-shrink-0">
                <Mail size={16} />
              </div>
              <a href="mailto:gencomptech@gmail.com" className="hover:text-yellow-400 transition-colors">
                gencomptech@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-3 pt-2 border-t border-blue-900">
              <div className="bg-blue-900 p-2 rounded text-yellow-400 flex-shrink-0">
                <Clock size={16} />
              </div>
              <span className="text-blue-100">
                Mon - Sat: 9:30 AM - 8:00 PM
              </span>
            </li>
          </ul>
        </div>

      </div>

      {/* BOTTOM LEGAL BAR */}
      <div className="bg-blue-900 py-6 border-t border-blue-800">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-blue-300">
          <p>© {currentYear} Genuine Computers & Technologies. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
