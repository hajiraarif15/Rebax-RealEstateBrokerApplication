import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt } from "react-icons/fa";

export default function PropertyCard({ p }) {
  const img = p.images?.[0]?.url || "https://source.unsplash.com/800x600/?luxury-house";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03, y: -4 }}
      transition={{ duration: 0.25 }}
      className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden cursor-pointer border hover:shadow-2xl hover:border-indigo-400"
    >
      <Link to={`/property/${p.id}`}>
        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
          src={img}
          className="h-56 w-full object-cover rounded-t-xl"
          alt={p.title}
        />

        <div className="p-4">
          <h3 className="font-bold text-xl">{p.title}</h3>
          <p className="text-gray-600 flex items-center gap-1 text-sm">
            <FaMapMarkerAlt /> {p.city}, {p.state}
          </p>

          <p className="text-lg font-bold text-indigo-600 mt-2">
            ₹ {p.price.toLocaleString()}
          </p>

          <div className="flex justify-between text-xs mt-2 text-gray-700 dark:text-gray-300">
            <span className="flex items-center gap-1"><FaBed /> {p.bedrooms} Beds</span>
            <span className="flex items-center gap-1"><FaBath /> {p.bathrooms} Bath</span>
            <span className="flex items-center gap-1"><FaRulerCombined /> {p.areaSqft} sqft</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
