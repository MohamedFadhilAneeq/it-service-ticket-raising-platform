import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from "lucide-react";

function Footer() {
  return (
    <footer className="bg-blue-900 text-white">
      {/* MAIN FOOTER */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid gap-10 md:grid-cols-4">

        {/* COMPANY INFO */}
        <div>
          <h3 className="text-lg font-semibold mb-4">
            Genuine Computers & Technologies
          </h3>
          <p className="text-sm opacity-90 leading-relaxed">
            Reliable computer and IT service solutions. We provide
            professional repair, installation, and troubleshooting services
            you can trust.
          </p>
        </div>

        {/* CONTACT INFO */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
          <ul className="space-y-3 text-sm opacity-90">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-1" />
              <span>
                Shop no 81- A Ist Floor , Cauvery Road , <br />
                Opp to Al-ameen Matriculation School ,<br />
                Karungalpalayam , <br />
                ERODE 638003
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} />
              +91 94436 80101
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} />
              gencomptech@gmail.com
            </li>
          </ul>
        </div>

        {/* SERVICES */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Services</h3>
          <ul className="space-y-2 text-sm opacity-90">
            <li>Laptop & Desktop Repair</li>
            <li>Printer Service</li>
            <li>Software Installation</li>
            <li>Network Troubleshooting</li>
          </ul>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm opacity-90">
            <li>Home</li>
            <li>About Us</li>
            <li>Services</li>
            <li>Contact</li>
            <li>Raise Ticket</li>
            <li>Track Ticket</li>
          </ul>

          {/* SOCIAL ICONS */}
          <div className="flex gap-4 mt-5">
            <Facebook className="hover:text-yellow-400 cursor-pointer" />
            <Twitter className="hover:text-yellow-400 cursor-pointer" />
            <Instagram className="hover:text-yellow-400 cursor-pointer" />
            <Linkedin className="hover:text-yellow-400 cursor-pointer" />
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="bg-blue-950 text-center py-4 text-sm opacity-90">
        © 2026 Genuine Computers & Technologies. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
