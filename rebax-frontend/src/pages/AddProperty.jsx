import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import ImageUpload from "../components/ImageUpload";

export default function AddProperty() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "", description: "", city: "", state: "",
    price: "", bedrooms: "", bathrooms: "", areaSqft: "",
    type: "", purpose: "", address: "", mapLink: "",
    amenities: [], images: []
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.description || !form.city || !form.state || !form.price || !form.type || !form.purpose) {
      alert("Please fill in all required fields.");
      return;
    }

    const payload = {
      ...form,
      bedrooms: Number(form.bedrooms) || 1,
      bathrooms: Number(form.bathrooms) || 1,
      areaSqft: Number(form.areaSqft) || 500,
      price: Number(form.price),
      images: form.images.map(i => i.url || i),
      amenities: form.amenities || []
    };

    console.log("Submitting payload:", payload);

    try {
      const response = await api.post("/api/properties", payload);
      console.log("Property created:", response.data);
      alert("Property added successfully!");
      navigate("/broker/listings");
    } catch (err) {
      console.error("Failed to add property:", err.response?.data || err.message);
      const errorMsg = err.response?.data?.message || err.message || "Failed to add property";
      alert(`❌ ${errorMsg}`);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-neutral-900 shadow-xl rounded-xl p-8 mt-8">
      <h2 className="text-3xl font-bold mb-6 text-indigo-600 dark:text-indigo-300">
        Add New Property
      </h2>

      <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
        {[
          ["title", "Property Title *", true],
          ["price", "Price (₹) *", true],
          ["bedrooms", "Bedrooms", false],
          ["bathrooms", "Bathrooms", false],
          ["areaSqft", "Area Sqft", false],
          ["city", "City *", true],
          ["state", "State *", true],
          ["address", "Address *", true],
          ["mapLink", "Google Map Embed Link", false]
        ].map(([name, label, required]) => (
          <input
            key={name}
            type={name === "price" || name === "bedrooms" || name === "bathrooms" || name === "areaSqft" ? "number" : "text"}
            placeholder={label}
            className="input input-bordered w-full dark:bg-neutral-800"
            value={form[name]}
            onChange={(e) => setForm({ ...form, [name]: e.target.value })}
            required={required}
          />
        ))}

        <select 
          className="select select-bordered dark:bg-neutral-800" 
          value={form.type}
          onChange={(e)=>setForm({...form, type:e.target.value})}
          required
        >
          <option value="">Select Type *</option>
          <option value="APARTMENT">APARTMENT</option>
          <option value="VILLA">VILLA</option>
          <option value="PLOT">PLOT</option>
          <option value="TOWNHOUSE">TOWNHOUSE</option>
          <option value="STUDIO">STUDIO</option>
        </select>

        <select 
          className="select select-bordered dark:bg-neutral-800" 
          value={form.purpose}
          onChange={(e)=>setForm({...form, purpose:e.target.value})}
          required
        >
          <option value="">Select Purpose *</option>
          <option value="SALE">SALE</option>
          <option value="RENT">RENT</option>
        </select>

        <textarea
          placeholder="Description *"
          className="textarea textarea-bordered col-span-2 dark:bg-neutral-800"
          rows={4}
          value={form.description}
          onChange={(e)=>setForm({...form, description:e.target.value})}
          required
        />

        
        <label className="col-span-2 font-semibold text-gray-700 dark:text-gray-300">
          Upload Property Images
        </label>
        <div className="col-span-2">
          <ImageUpload
            initial={form.images}
            onChange={(imgs) => setForm({ ...form, images: imgs })}
          />
        </div>

        <button className="btn btn-primary col-span-2 text-lg font-bold">
          Submit Property
        </button>
      </form>
    </div>
  );
}
