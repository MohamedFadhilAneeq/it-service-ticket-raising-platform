import { Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

function Contact() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-center mb-12">
          Contact Us
        </h1>

        <div className="grid md:grid-cols-2 gap-12">
          {/* CONTACT DETAILS */}
          <div className="bg-white rounded-xl shadow-md p-8 space-y-6">
            <h2 className="text-xl font-semibold mb-4">
              Get in Touch
            </h2>

            <div className="flex items-start gap-4">
              <MapPin className="text-blue-900 mt-1" />
              <p className="text-gray-700">
                
                Genuine Computers & Technologies<br />
                Erode, Tamil Nadu
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Phone className="text-blue-900" />
              <p className="text-gray-700">
                +91 94436 80101
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Mail className="text-blue-900" />
              <p className="text-gray-700">
                gencomptech@gmail.com
              </p>
            </div>

            <p className="text-sm text-gray-600 pt-4">
              Office Hours: Monday to Saturday, 9:00 AM – 7:00 PM
            </p>

            {/* CTA */}
            <div className="pt-6">
              <p className="text-gray-600 mb-3">
                For service-related queries, please raise a ticket.
              </p>
              <Link
                to="/raise-ticket"
                className="inline-block bg-blue-900 text-white px-6 py-3 rounded font-semibold hover:bg-blue-800 transition"
              >
                Raise a Service Request
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-4">
  <iframe
    title="Genuine Computers & Technologies Location"
    src="https://www.google.com/maps?q=11.3502133,77.7195103&output=embed"
    className="w-full h-[400px] rounded-xl border"
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  ></iframe>
</div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
