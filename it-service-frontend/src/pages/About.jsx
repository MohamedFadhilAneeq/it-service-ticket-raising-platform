function About() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-3xl font-bold mb-10 text-center">
          About Us
        </h1>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Genuine Computers & Technologies
            </h2>

            <p className="text-gray-700 mb-4 leading-relaxed">
              Genuine Computers & Technologies is a trusted IT service provider
              offering reliable computer repair and technical support services.
              We cater to individuals, small businesses, and organizations with
              a focus on quality and customer satisfaction.
            </p>

            <p className="text-gray-700 mb-4 leading-relaxed">
              Our services include laptop and desktop repair, printer servicing,
              software installation, and network troubleshooting across multiple
              leading brands.
            </p>

            <p className="text-gray-700 leading-relaxed">
              With experienced technicians and a structured service process, we
              aim to deliver timely and efficient solutions tailored to customer
              needs.
            </p>
          </div>

          {/* Image / Visual Placeholder */}
          <div className="h-72 bg-gray-100 rounded-xl flex items-center justify-center">
            <span className="text-gray-400">
              Company / Service Center Image
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
