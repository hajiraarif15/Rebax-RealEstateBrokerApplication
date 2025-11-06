import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";

export default function Contact() {
  const MAP_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  return (
    <div className="bg-gray-50 dark:bg-neutral-900 dark:text-white">

      {/* ✅ HERO SECTION */}
      <div className="relative h-[45vh] flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600"
          className="absolute inset-0 w-full h-full object-cover opacity-90"
          alt="Contact Banner"
        />
        <div className="absolute inset-0 bg-black/60"></div>

        <h1 className="relative z-10 text-5xl font-extrabold text-white drop-shadow-lg">
          Contact <span className="text-indigo-400">RebaX</span>
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-14 grid lg:grid-cols-2 gap-12">

        {/* ✅ CONTACT INFO CARD */}
        <div className="bg-white dark:bg-neutral-800 shadow-xl p-8 rounded-2xl border">
          <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Have questions? We’re here to help you find your dream home or assist with your property listings.
          </p>

          <div className="space-y-4 text-lg">
            <div className="flex items-center gap-3">
              <FaPhoneAlt className="text-indigo-600 text-xl" />
              <span>+91 95131 31555</span>
            </div>

            <div className="flex items-center gap-3">
              <FaEnvelope className="text-indigo-600 text-xl" />
              <span>hajiraarif@rebax.com</span>
            </div>

            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-indigo-600 text-xl" />
              <span>Bangalore, India</span>
            </div>
          </div>

          {/* ✅ SOCIAL LINKS */}
          <div className="flex gap-4 mt-6 text-2xl">
            <a href="#" className="hover:text-indigo-500 transition"><FaInstagram /></a>
            <a href="#" className="hover:text-indigo-500 transition"><FaLinkedin /></a>
            <a href="#" className="hover:text-indigo-500 transition"><FaWhatsapp /></a>
          </div>
        </div>

        {/* ✅ CONTACT FORM */}
        <form className="bg-white dark:bg-neutral-800 shadow-xl p-8 rounded-2xl border">
          <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>

          <div className="grid grid-cols-1 gap-4">
            <input type="text" placeholder="Your Name" className="input input-bordered dark:bg-neutral-700"/>
            <input type="email" placeholder="Your Email" className="input input-bordered dark:bg-neutral-700"/>
            <textarea rows={4} placeholder="Your Message" className="textarea textarea-bordered dark:bg-neutral-700"></textarea>
            <button type="submit" className="btn btn-primary w-full text-lg font-semibold">Send Message</button>
          </div>
        </form>

      </div>

      
    </div>
  );
}
