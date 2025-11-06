import { useEffect, useState } from "react";
import api from "../api/axios";
import PropertyCard from "../components/PropertyCard";
import { FaSearch } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

// Extra sections
import StatsStrip from "../components/StatsStrip";
import WhyChooseUs from "../components/WhyChooseUs";
import FeaturedCities from "../components/FeaturedCities";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";

export default function Home() {
  const [q, setQ] = useState({ city: "", type: "", purpose: "" });
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const cleanedQuery = Object.fromEntries(
        Object.entries(q).filter(([_, v]) => v && v.trim() !== "")
      );

      const { data } = await api.get("/api/properties", { params: cleanedQuery });

      // ✅ Ensure data is always an array
      if (Array.isArray(data)) {
        setList(data);
      } else {
        console.warn("⚠️ Unexpected API response:", data);
        setList([]);
        setError("Unexpected response format from server.");
      }
    } catch (err) {
      console.error("❌ Failed to load properties:", err);
      setList([]);
      setError("Failed to load properties. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const featured = [
    "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=1600",
    "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1600",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600",
    "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1600",
  ];

  return (
    <div className="bg-gray-50 dark:bg-neutral-900 dark:text-white">

      {/* ✅ Hero Banner */}
      <div className="rounded-2xl overflow-hidden shadow-xl mb-8">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 2800 }}
          pagination={{ clickable: true }}
          loop
        >
          {featured.map((src, i) => (
            <SwiperSlide key={i}>
              <div
                className="h-[75vh] bg-cover bg-center relative"
                style={{ backgroundImage: `url(${src})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70 flex items-center">
                  <div className="px-8 text-white max-w-xl">
                    <h1 className="text-5xl md:text-6xl font-extrabold drop-shadow animate-fade-in">
                      Find Your Dream Home
                    </h1>
                    <p className="mt-4 text-lg opacity-90 animate-slide-up">
                      Curated luxury homes across global destinations.
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ✅ Search Bar */}
      <div className="max-w-7xl mx-auto p-4 -mt-10 relative z-10">
        <div className="backdrop-blur-md bg-white/80 dark:bg-neutral-900/70 border rounded-2xl p-5 mb-8 shadow-lg grid grid-cols-1 md:grid-cols-4 gap-3">
          <input
            className="input input-bordered w-full dark:bg-neutral-800"
            placeholder="Search City (e.g., Dubai, Bangalore)"
            value={q.city}
            onChange={(e) => setQ({ ...q, city: e.target.value })}
          />

          <select
            className="select select-bordered dark:bg-neutral-800"
            value={q.type}
            onChange={(e) => setQ({ ...q, type: e.target.value })}
          >
            <option value="">Property Type</option>
            <option>APARTMENT</option>
            <option>VILLA</option>
            <option>PLOT</option>
            <option>TOWNHOUSE</option>
            <option>STUDIO</option>
          </select>

          <select
            className="select select-bordered dark:bg-neutral-800"
            value={q.purpose}
            onChange={(e) => setQ({ ...q, purpose: e.target.value })}
          >
            <option value="">Purpose</option>
            <option>SALE</option>
            <option>RENT</option>
          </select>

          <button
            onClick={load}
            className="btn btn-primary text-lg font-bold flex gap-2 justify-center"
          >
            <FaSearch /> Search
          </button>
        </div>
      </div>

      {/* ✅ Error Banner */}
      {error && (
        <div className="max-w-7xl mx-auto bg-red-100 text-red-700 border border-red-300 p-4 rounded-xl mb-6">
          {error}
        </div>
      )}

      {/* ✅ Stats */}
      <StatsStrip />

      {/* ✅ Featured Listings */}
      <div className="max-w-7xl mx-auto p-4">
        <h2 className="text-3xl font-bold mb-4">Featured Listings ✨</h2>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse rounded-xl border bg-white dark:bg-neutral-800 h-64"
              />
            ))}
          </div>
        ) : list.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6">
            {list.map((p) => (
              <PropertyCard key={p.id} p={p} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg py-10">
            No properties found. Try another search.
          </p>
        )}
      </div>

      {/* ✅ Extra Sections */}
      <FeaturedCities />
      <WhyChooseUs />
      <Testimonials />
      <Footer />
    </div>
  );
}
