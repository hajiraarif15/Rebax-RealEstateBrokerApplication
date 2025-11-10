import { useEffect, useState } from "react";
import api from "../api/axios";
import PropertyCard from "../components/PropertyCard";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function MyListings() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { auth } = useAuth();

  const load = async () => {
    setLoading(true);
    try {
      // Debug auth data
      const authData = localStorage.getItem("rebax_auth");
      console.log("Auth data from localStorage:", authData);
      if (authData) {
        const parsed = JSON.parse(authData);
        console.log("Parsed auth data:", {
          email: parsed.email,
          role: parsed.role,
          userId: parsed.userId,
          hasToken: !!parsed.token
        });
      }
      
      console.log("Loading listings...");
      const response = await api.get("/api/properties/my");
      console.log("Full API response:", response);
      console.log("Response data:", response.data);
      console.log("Data type:", typeof response.data);
      console.log("Is array?", Array.isArray(response.data));
      
      if (Array.isArray(response.data)) {
        console.log("Setting property list:", response.data.length, "items");
        setList(response.data);
        if (response.data.length === 0) {
          toast.info("No properties found. Try adding a new property.");
        }
      } else {
        console.warn("Unexpected data format:", response.data);
        console.warn("Expected array, got:", typeof response.data);
        toast.error("Unexpected response format from server.");
        setList([]);
      }
    } catch (err) {
      const status = err.response?.status;
      const body = err.response?.data;
      console.error("Error loading listings:", status, body || err.message);
      console.error("Full error:", err);
      if (status === 401) {
        toast.error("Session expired. Please log in.");
        navigate("/login");
      } else if (status === 403) {
        toast.error("Access denied.");
        navigate("/");
      } else {
        toast.error(body?.message || "Failed to load your listings.");
      }
      setList([]);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    load();
  }, [auth?.userId]);

  const remove = async (id) => {
    if (!window.confirm("Are you sure you want to delete this property?")) return;
    try {
      // If backend delete endpoint not yet implemented this will 404; handle gracefully.
      const res = await api.delete(`/api/properties/${id}`);
      if (res.status === 204 || res.status === 200) {
        toast.success("Property deleted!");
        setList(prev => prev.filter(p => p.id !== id));
      } else {
        toast.error("Delete failed (unexpected status).");
      }
    } catch (err) {
      console.error("Delete error:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Failed to delete property.");
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-4 grid md:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="animate-pulse h-64 rounded-xl border bg-white dark:bg-neutral-900"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex flex-wrap gap-3 justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">My Listings</h1>
        <div className="flex gap-2">
          <button
            className="btn btn-outline"
            type="button"
            onClick={load}
            disabled={loading}
          >
            {loading ? "Loading..." : "Refresh"}
          </button>
          <button
            className="btn bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 !text-white font-semibold px-6"
            onClick={() => navigate("/broker/add")}
          >
            ➕ Add New Property
          </button>
        </div>
      </div>

      {list.length === 0 ? (
        <p className="text-center text-gray-500 py-10">
          You have not added any properties yet.
        </p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {list.map((p) => (
            <div key={p.id} className="relative group">
              <PropertyCard p={p} />
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition">
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/broker/edit/${p.id}`)}
                    className="btn btn-sm bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => remove(p.id)}
                    className="btn btn-sm bg-red-600 hover:bg-red-700 text-white"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
