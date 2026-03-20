import { Link } from "react-router-dom";
import { Laptop, Printer, Download, Wifi } from "lucide-react";

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
    <>
      {/* HERO SECTION */}
      <section
        className="relative bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 "></div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            One Stop IT Service Solutions
          </h1>

          <p className="text-lg md:text-xl mb-8 opacity-90">
            Reliable Computer & IT Services You Can Trust
          </p>

          <Link
            to="/raise-ticket"
            className="inline-block bg-yellow-400 text-blue-900 font-semibold px-8 py-3 rounded hover:bg-yellow-300 transition"
          >
            Raise Service Request
          </Link>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our Services
          </h2>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-blue-900 text-white rounded-xl p-6 text-center shadow-md hover:shadow-xl transition">
              <div className="flex justify-center mb-4">
                <Laptop size={42} />
              </div>
              <h3 className="text-lg font-semibold mb-3">
                Laptop & Desktop Repair
              </h3>
              <p className="text-sm opacity-90">
                Hardware and software repair for all major brands.
              </p>
            </div>

            <div className="bg-blue-900 text-white rounded-xl p-6 text-center shadow-md hover:shadow-xl transition">
              <div className="flex justify-center mb-4">
                <Printer size={42} />
              </div>
              <h3 className="text-lg font-semibold mb-3">
                Printer Service
              </h3>
              <p className="text-sm opacity-90">
                Installation, maintenance, and repair of printers.
              </p>
            </div>

            <div className="bg-blue-900 text-white rounded-xl p-6 text-center shadow-md hover:shadow-xl transition">
              <div className="flex justify-center mb-4">
                <Download size={42} />
              </div>
              <h3 className="text-lg font-semibold mb-3">
                Software Installation
              </h3>
              <p className="text-sm opacity-90">
                OS installation and software troubleshooting.
              </p>
            </div>

            <div className="bg-blue-900 text-white rounded-xl p-6 text-center shadow-md hover:shadow-xl transition">
              <div className="flex justify-center mb-4">
                <Wifi size={42} />
              </div>
              <h3 className="text-lg font-semibold mb-3">
                Network Troubleshooting
              </h3>
              <p className="text-sm opacity-90">
                Network setup and connectivity issue resolution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BRANDS SECTION */}
<section className="py-20 bg-white">
  <div className="max-w-7xl mx-auto px-6">
    <h2 className="text-3xl font-bold text-center mb-14">
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
            className="max-h-full max-w-full object-contain"
          />
        </div>
      ))}

    </div>
  </div>
</section>

    </>
  );
}

export default Home;
