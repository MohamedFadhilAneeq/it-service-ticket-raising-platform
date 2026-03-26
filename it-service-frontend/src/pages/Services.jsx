import { Link } from "react-router-dom";
import { Laptop, Printer, Download, Wifi, HardDrive, ShieldAlert, Monitor, PhoneCall, ArrowRight } from "lucide-react";

function Services() {
  const services = [
    {
      icon: Laptop,
      title: "Laptop & Desktop Repair",
      description: "Diagnosis and repair of hardware and software issues for all major computer brands.",
    },
    {
      icon: Printer,
      title: "Printer Service",
      description: "Installation, maintenance, and troubleshooting of inkjet and laser printers.",
    },
    {
      icon: Download,
      title: "Software Installation",
      description: "Operating system installation, driver updates, and software issue resolution.",
    },
    {
      icon: Wifi,
      title: "Network Support",
      description: "Setup and troubleshooting of wired and wireless networks for stable connectivity.",
    },
    // New Services Added Below
    {
      icon: HardDrive,
      title: "Data Recovery",
      description: "Professional recovery of lost, corrupted, or accidentally deleted files from storage devices.",
    },
    {
      icon: ShieldAlert,
      title: "Virus & Malware Removal",
      description: "Deep system cleaning, threat neutralization, and security software deployment.",
    },
    {
      icon: Monitor,
      title: "Custom PC Builds",
      description: "Tailored desktop assembly for gaming, editing, or heavy workstation requirements.",
    },
    {
      icon: PhoneCall,
      title: "Remote IT Consulting",
      description: "Instant remote troubleshooting and expert IT advice for your business infrastructure.",
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-10 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-extrabold text-blue-950 mb-6">
            Comprehensive IT Services
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            From quick software fixes to complex hardware repairs, our service catalog is 
            designed to keep your personal and professional digital life running smoothly.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-20">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-8 border border-gray-100 group flex flex-col h-full"
            >
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:-translate-y-2 transition-transform duration-300">
                <service.icon size={32} />
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {service.title}
              </h3>

              <p className="text-gray-600 leading-relaxed mb-6 flex-grow">
                {service.description}
              </p>
              
              <Link to="/raise-ticket" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors mt-auto">
                Request Service <ArrowRight size={16} />
              </Link>
            </div>
          ))}
        </div>

        {/* Bottom Call to Action */}
        <div className="bg-gradient-to-br from-blue-950 to-blue-900 rounded-3xl p-10 md:p-16 text-center text-white shadow-2xl relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-5 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-yellow-400 opacity-10 rounded-full blur-2xl"></div>
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Need a custom solution?</h2>
            <p className="text-blue-100 text-lg mb-10">
              If you don't see your specific issue listed above, don't worry. Submit a ticket describing your problem, and our technicians will evaluate it.
            </p>
            <Link
              to="/raise-ticket"
              className="inline-block bg-yellow-400 text-blue-950 font-bold px-10 py-4 rounded-lg hover:bg-yellow-300 transition-all shadow-lg hover:scale-105"
            >
              Open a Service Ticket
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Services;
