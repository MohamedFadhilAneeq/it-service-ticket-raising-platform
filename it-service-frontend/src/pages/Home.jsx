import { Link } from "react-router-dom";
import { Laptop, Printer, Download, Wifi, Ticket, Search, Wrench, ArrowRight } from "lucide-react";

// Brand logos (make sure these paths exist)
import dell from "../assets/brands/dell.png";
import hp from "../assets/brands/hp.png";
import lenovo from "../assets/brands/lenovo.png";
import acer from "../assets/brands/acer.png";
import asus from "../assets/brands/asus.png";
import canon from "../assets/brands/canon.png";
import heroImage from "../assets/hero.png";

function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* HERO SECTION */}
      <section
        className="relative bg-cover bg-center min-h-[80vh] flex items-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        {/* Modern Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-blue-900/80 to-transparent"></div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
              One-Stop IT <span className="text-yellow-400">Service Solutions</span>
            </h1>
            <p className="text-lg md:text-xl mb-10 text-gray-200 leading-relaxed">
              Fast, reliable, and transparent computer repair and IT support. 
              Raise a ticket in seconds and let our certified technicians handle the rest.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/raise-ticket"
                className="flex items-center gap-2 bg-yellow-400 text-blue-950 font-bold px-8 py-4 rounded-lg hover:bg-yellow-300 transition-all hover:scale-105 shadow-lg"
              >
                <Ticket size={20} />
                Raise Service Request
              </Link>
              <Link
                to="/track-ticket"
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-semibold px-8 py-4 rounded-lg hover:bg-white/20 transition-all"
              >
                <Search size={20} />
                Track Status
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-blue-950 mb-4">How Our Service Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">A seamless, hassle-free process from reporting your issue to getting your device back in perfect condition.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="text-center relative z-10">
              <div className="w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-6 border-4 border-white shadow-lg">
                <Ticket className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">1. Raise a Ticket</h3>
              <p className="text-gray-600">Describe your issue online and get a unique tracking ID instantly.</p>
            </div>
            {/* Step 2 */}
            <div className="text-center relative z-10">
              <div className="w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-6 border-4 border-white shadow-lg">
                <Search className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">2. Diagnosis & Quote</h3>
              <p className="text-gray-600">Our experts diagnose the problem and provide a transparent cost estimate.</p>
            </div>
            {/* Step 3 */}
            <div className="text-center relative z-10">
              <div className="w-20 h-20 mx-auto bg-yellow-100 rounded-full flex items-center justify-center mb-6 border-4 border-white shadow-lg">
                <Wrench className="text-yellow-600" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">3. Fast Resolution</h3>
              <p className="text-gray-600">We fix the issue promptly and notify you the moment it's ready.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES PREVIEW SECTION */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-blue-950 mb-4">Core Services</h2>
              <p className="text-gray-600">Comprehensive IT solutions for homes and businesses.</p>
            </div>
            <Link to="/services" className="hidden md:flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800 transition">
              View All Services <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Laptop, title: "Laptop & Desktop", desc: "Hardware and software repair for all major brands." },
              { icon: Printer, title: "Printer Service", desc: "Installation, maintenance, and repair of printers." },
              { icon: Download, title: "Software Install", desc: "OS installation and software troubleshooting." },
              { icon: Wifi, title: "Network Setup", desc: "Network setup and connectivity issue resolution." }
            ].map((srv, idx) => (
              <div key={idx} className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-gray-100">
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <srv.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{srv.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{srv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BRANDS SECTION (Restored to original sizes) */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-14 text-blue-950">
            Brands We Handle
          </h2>

          <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-14">
            {[
              { src: dell, alt: "Dell" },
              { src: hp, alt: "HP" },
              { src: lenovo, alt: "Lenovo" },
              { src: asus, alt: "Asus" },
              { src: acer, alt: "Acer" },
              { src: canon, alt: "Canon" },
            ].map((brand) => (
              <div
                key={brand.alt}
                className="flex items-center justify-center h-24 w-40 md:h-28 md:w-48"
              >
                <img
                  src={brand.src}
                  alt={brand.alt}
                  className="max-h-full max-w-full object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-blue-950 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <h2 className="text-3xl font-bold mb-6">Experiencing Technical Difficulties?</h2>
          <p className="text-blue-200 mb-8 text-lg">Don't let IT issues slow you down. Create a service ticket now and our team will get back to you immediately.</p>
          <Link to="/raise-ticket" className="inline-block bg-yellow-400 text-blue-950 font-bold px-8 py-4 rounded-lg hover:bg-yellow-300 transition-all shadow-lg hover:shadow-yellow-400/20">
            Raise a Ticket Now
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
