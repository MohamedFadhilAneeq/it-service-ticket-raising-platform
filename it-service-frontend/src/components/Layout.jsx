import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ArrowUp, X, Phone } from "lucide-react";

function Layout({ children }) {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showBanner, setShowBanner] = useState(true);

  // Handle scroll event to show/hide the "Scroll to Top" button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll back to the top of the page
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      
      {/* OPTIONAL: Global Announcement Banner */}
      {showBanner && (
        <div className="bg-blue-900 text-white text-sm py-2 px-6 flex justify-between items-center relative z-50">
          <div className="flex items-center gap-3 mx-auto">
            <span className="hidden sm:inline-block bg-yellow-400 text-blue-950 text-xs font-extrabold px-2 py-0.5 rounded uppercase tracking-wider">
              Emergency Support
            </span>
            <p className="hidden md:block text-blue-100">
              Need immediate technical assistance? Our technicians are ready.
            </p>
            <a 
              href="tel:+919443680101" 
              className="flex items-center gap-1.5 font-bold text-yellow-400 hover:text-yellow-300 transition"
            >
              <Phone size={14} /> +91 94436 80101
            </a>
          </div>
          
          <button 
            onClick={() => setShowBanner(false)}
            className="text-blue-300 hover:text-white transition-colors absolute right-4 md:right-6"
            aria-label="Close banner"
          >
            <X size={18} />
          </button>
        </div>
      )}

      {/* MAIN NAVIGATION */}
      <Navbar />

      {/* PAGE CONTENT */}
      {/* The flex-1 ensures this container pushes the footer to the bottom */}
      <main className="flex-1 w-full flex flex-col relative">
        {children}
      </main>

      {/* FOOTER */}
      <Footer />

      {/* SCROLL TO TOP BUTTON */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-3 bg-yellow-400 text-blue-950 rounded-full shadow-xl border-2 border-white hover:bg-yellow-300 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 z-50 ${
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp size={24} strokeWidth={2.5} />
      </button>
      
    </div>
  );
}

export default Layout;
