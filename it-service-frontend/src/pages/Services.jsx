import { Laptop, Printer, Download, Wifi } from "lucide-react";

function Services() {
  const services = [
    {
      icon: Laptop,
      title: "Laptop & Desktop Repair",
      description:
        "Diagnosis and repair of hardware and software issues for laptops and desktop computers across all major brands.",
    },
    {
      icon: Printer,
      title: "Printer Service",
      description:
        "Installation, maintenance, and troubleshooting of inkjet and laser printers for home and office use.",
    },
    {
      icon: Download,
      title: "Software Installation",
      description:
        "Operating system installation, driver updates, and resolution of common software-related problems.",
    },
    {
      icon: Wifi,
      title: "Network Support",
      description:
        "Setup and troubleshooting of wired and wireless networks to ensure stable and secure connectivity.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-center mb-12">
          Our Services
        </h1>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition"
            >
              <div className="flex justify-center mb-4 text-blue-900">
                <service.icon size={42} />
              </div>

              <h3 className="text-lg font-semibold mb-3">
                {service.title}
              </h3>

              <p className="text-sm text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
