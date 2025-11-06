import { FaBuilding, FaUsers, FaHandshake, FaAward } from "react-icons/fa";

export default function About() {
  return (
    <div className="bg-gray-50 dark:bg-neutral-900 dark:text-white">

      {/* ✅ HERO SECTION */}
      <div className="relative h-[60vh] flex items-center">
        <img
          src="/about.jpg"
          alt="About RebaX"
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <h1 className="text-5xl font-extrabold text-white drop-shadow-md">
            About <span className="text-indigo-400">RebaX</span>
          </h1>
          <p className="text-lg mt-4 text-gray-200 max-w-2xl mx-auto leading-relaxed">
            India's most premium real-estate platform connecting home-buyers
            with trusted brokers & top-quality properties.
          </p>
        </div>
      </div>

      {/* ✅ MISSION */}
      <div className="max-w-6xl mx-auto py-16 px-4 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
            To revolutionize property buying by making it transparent, seamless,
            and modern — enabling customers to discover premium homes while
            empowering property brokers with technology & trust.
          </p>
        </div>
        <img src="/mission.jpg" alt="Mission" className="rounded-xl shadow-xl" />
      </div>

      {/* ✅ VISION */}
      <div className="max-w-6xl mx-auto py-12 px-4 grid md:grid-cols-2 gap-10 items-center md:flex-row-reverse">

        <img src="/vision.jpg" alt="Vision" className="rounded-xl shadow-xl order-2 md:order-1" />

        <div className="order-1 md:order-2">
          <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
            To build the most trusted, luxury-focused real estate ecosystem where every
            buyer feels confident & every broker grows with innovation.
          </p>
        </div>
      </div>

      {/* ✅ WHY CHOOSE US */}
      <div className="bg-white dark:bg-neutral-800 py-20">
        <div className="max-w-6xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-10">Why Choose RebaX?</h2>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: <FaBuilding />, title: "Premium Properties" },
              { icon: <FaUsers />, title: "Verified Brokers" },
              { icon: <FaHandshake />, title: "Trust & Transparency" },
              { icon: <FaAward />, title: "Exceptional Service" }
            ].map((item, index) => (
              <div
                key={index}
                className="p-6 bg-gray-50 dark:bg-neutral-700 rounded-xl shadow-lg 
                  hover:scale-105 transition-transform cursor-pointer"
              >
                <div className="text-indigo-600 text-5xl mb-3 mx-auto">{item.icon}</div>
                <h3 className="font-semibold text-lg">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
