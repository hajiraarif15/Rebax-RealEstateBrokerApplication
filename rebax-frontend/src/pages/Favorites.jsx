import { useEffect, useState } from "react";
import api from "../api/axios";
import PropertyCard from "../components/PropertyCard";
import toast from "react-hot-toast";

export default function Favorites() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data } = await api.get("/api/favorites/me");
    setList(data);
    setLoading(false);
  };

  const remove = async (propertyId) => {
    await api.delete(`/api/favorites/${propertyId}`);
    toast.success("Removed from favorites");
    load();
  };

  useEffect(() => { load(); }, []);

  if (loading) {
    return <div className="max-w-7xl mx-auto p-4 grid md:grid-cols-3 gap-6">
      {[...Array(6)].map((_,i)=><div key={i} className="animate-pulse h-64 rounded-xl border bg-white dark:bg-neutral-900" />)}
    </div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Favorites</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {list.map((f) => (
          <div key={f.id} className="relative group">
            <PropertyCard p={f.property} />
            <button
              onClick={() => remove(f.property.id)}
              className="absolute top-3 right-3 btn btn-sm opacity-0 group-hover:opacity-100 transition"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
