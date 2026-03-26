import { CheckCircle, Users, Clock, Shield } from "lucide-react";

function About() {
  return (
    <div className="min-h-screen bg-gray-50 pt-10 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-extrabold text-blue-950 mb-6">
            About Genuine Computers
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            We are a trusted IT service provider dedicated to solving your technical 
            problems with speed, transparency, and unmatched expertise.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          
          {/* Image / Visual */}
          <div className="relative">
            <div className="aspect-square md:aspect-[4/3] bg-blue-100 rounded-3xl overflow-hidden shadow-2xl relative z-10">
              {/* Replace with actual image: <img src={aboutImage} alt="Our Workshop" className="w-full h-full object-cover" /> */}
              <div className="w-full h-full flex flex-col items-center justify-center text-blue-800 bg-gradient-to-br from-blue-100 to-blue-200">
                <Shield size={64} className="mb-4 opacity-50" />
                <span className="font-semibold text-lg">Service Center Showcase</span>
              </div>
            </div>
            {/* Decorative background element */}
            <div className="absolute -bottom-6 -right-6 w-full h-full border-4 border-yellow-400 rounded-3xl -z-10"></div>
          </div>

          {/* Text Content */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">
              Your Technology, Our Priority
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              Genuine Computers & Technologies caters to individuals, small businesses, and 
              organizations. We understand that in today's digital age, downtime is not an option.
            </p>
            <p className="text-gray-600 leading-relaxed text-lg mb-8">
              With a structured service ticketing process, we ensure every customer request is 
              tracked, managed, and resolved efficiently. Our certified technicians specialize in 
              everything from basic printer servicing to complex network troubleshooting.
            </p>

            {/* Feature List */}
            <div className="space-y-4 pt-4 border-t border-gray-200">
              {[
                "Certified and experienced technicians",
                "Transparent pricing with no hidden fees",
                "Automated ticket tracking system",
                "Fast turnaround times for critical repairs"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
                  <span className="text-gray-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Company Stats Bar */}
        <div className="bg-blue-950 rounded-3xl p-10 text-white grid grid-cols-2 md:grid-cols-4 gap-8 text-center shadow-xl">
          <div>
            <div className="flex justify-center mb-3 text-yellow-400"><Users size={32} /></div>
            <h4 className="text-4xl font-bold mb-2">2k+</h4>
            <p className="text-blue-200 text-sm font-medium uppercase tracking-wider">Happy Clients</p>
          </div>
          <div>
            <div className="flex justify-center mb-3 text-yellow-400"><Shield size={32} /></div>
            <h4 className="text-4xl font-bold mb-2">6</h4>
            <p className="text-blue-200 text-sm font-medium uppercase tracking-wider">Years Experience</p>
          </div>
          <div>
            <div className="flex justify-center mb-3 text-yellow-400"><CheckCircle size={32} /></div>
            <h4 className="text-4xl font-bold mb-2">100%</h4>
            <p className="text-blue-200 text-sm font-medium uppercase tracking-wider">Resolution Rate</p>
          </div>
          <div>
            <div className="flex justify-center mb-3 text-yellow-400"><Clock size={32} /></div>
            <h4 className="text-4xl font-bold mb-2">24/7</h4>
            <p className="text-blue-200 text-sm font-medium uppercase tracking-wider">Ticket Support</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default About;
