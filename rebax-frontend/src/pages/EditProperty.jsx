import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

export default function EditProperty() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { auth } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "APARTMENT",
    purpose: "SALE",
    bedrooms: "",
    bathrooms: "",
    areaSqft: "",
    price: "",
    address: "",
    city: "",
    state: "",
    mapLink: "",
    amenities: "",
    images: [""]
  });

  // Load existing property data
  useEffect(() => {
    const loadProperty = async () => {
      try {
        const response = await api.get(`/api/properties/${id}`);
        const property = response.data;
        
        // Check if current user is the owner of this property
        if (property.broker.id !== auth?.userId) {
          toast.error("You can only edit your own properties");
          navigate("/broker/listings");
          return;
        }
        
        setForm({
          title: property.title || "",
          description: property.description || "",
          type: property.type || "APARTMENT",
          purpose: property.purpose || "SALE",
          bedrooms: property.bedrooms?.toString() || "",
          bathrooms: property.bathrooms?.toString() || "",
          areaSqft: property.areaSqft?.toString() || "",
          price: property.price?.toString() || "",
          address: property.address || "",
          city: property.city || "",
          state: property.state || "",
          mapLink: property.mapLink || "",
          amenities: property.amenities || "",
          images: property.images?.map(img => img.url) || [""]
        });
      } catch (error) {
        console.error("Error loading property:", error);
        toast.error("Failed to load property details");
        navigate("/broker/listings");
      } finally {
        setLoading(false);
      }
    };

    if (id && auth?.userId) {
      loadProperty();
    }
  }, [id, auth?.userId, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (index, value) => {
    const newImages = [...form.images];
    newImages[index] = value;
    setForm(prev => ({ ...prev, images: newImages }));
  };

  const addImageField = () => {
    if (form.images.length < 5) {
      setForm(prev => ({ ...prev, images: [...prev.images, ""] }));
    }
  };

  const removeImageField = (index) => {
    if (form.images.length > 1) {
      const newImages = form.images.filter((_, i) => i !== index);
      setForm(prev => ({ ...prev, images: newImages }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    try {
      // Validate required fields
      if (!form.title || !form.city || !form.state || !form.price) {
        toast.error("Please fill in all required fields");
        return;
      }

      // Prepare data
      const data = {
        ...form,
        bedrooms: parseInt(form.bedrooms) || 0,
        bathrooms: parseInt(form.bathrooms) || 0,
        areaSqft: parseInt(form.areaSqft) || 0,
        price: parseFloat(form.price) || 0,
        images: form.images.filter(img => img.trim() !== "")
      };

      const response = await api.put(`/api/properties/${id}`, data);
      
      if (response.status === 200) {
        toast.success("Property updated successfully! 🎉");
        navigate("/broker/listings");
      }
    } catch (error) {
      console.error("Update error:", error);
      const message = error.response?.data?.message || error.response?.data || "Failed to update property";
      toast.error(typeof message === 'string' ? message : "Failed to update property");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Edit Property</h1>
        <button
          onClick={() => navigate("/broker/listings")}
          className="btn btn-ghost"
        >
          ← Back to Listings
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Basic Information</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Property Title *</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Enter property title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Type</label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="select select-bordered w-full"
              >
                <option value="APARTMENT">Apartment</option>
                <option value="HOUSE">House</option>
                <option value="VILLA">Villa</option>
                <option value="STUDIO">Studio</option>
                <option value="PENTHOUSE">Penthouse</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Purpose</label>
              <select
                name="purpose"
                value={form.purpose}
                onChange={handleChange}
                className="select select-bordered w-full"
              >
                <option value="SALE">For Sale</option>
                <option value="RENT">For Rent</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Price (₹) *</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Enter price"
                required
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="4"
              className="textarea textarea-bordered w-full"
              placeholder="Describe your property..."
            />
          </div>
        </div>

        {/* Property Details */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Property Details</h2>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Bedrooms</label>
              <input
                type="number"
                name="bedrooms"
                value={form.bedrooms}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Number of bedrooms"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Bathrooms</label>
              <input
                type="number"
                name="bathrooms"
                value={form.bathrooms}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Number of bathrooms"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Area (sq ft)</label>
              <input
                type="number"
                name="areaSqft"
                value={form.areaSqft}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Area in square feet"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">Amenities</label>
            <input
              type="text"
              name="amenities"
              value={form.amenities}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="e.g., Swimming pool, Gym, Parking, Garden"
            />
          </div>
        </div>

        {/* Location */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Location</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">City *</label>
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Enter city"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">State *</label>
              <input
                type="text"
                name="state"
                value={form.state}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Enter state"
                required
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">Full Address</label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              rows="2"
              className="textarea textarea-bordered w-full"
              placeholder="Enter complete address"
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">Google Maps Link</label>
            <input
              type="url"
              name="mapLink"
              value={form.mapLink}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="Paste Google Maps link (optional)"
            />
          </div>
        </div>

        {/* Images */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Property Images</h2>
            {form.images.length < 5 && (
              <button
                type="button"
                onClick={addImageField}
                className="btn btn-sm btn-outline"
              >
                + Add Image
              </button>
            )}
          </div>

          <div className="space-y-3">
            {form.images.map((image, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="url"
                  value={image}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                  className="input input-bordered flex-1"
                  placeholder="Enter image URL"
                />
                {form.images.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeImageField(index)}
                    className="btn btn-error btn-outline btn-sm"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            💡 Tip: Use image hosting services like Imgur, Cloudinary, or upload to your website
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-4 justify-end">
          <button
            type="button"
            onClick={() => navigate("/broker/listings")}
            className="btn btn-ghost"
            disabled={submitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="btn btn-primary"
          >
            {submitting ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Updating...
              </>
            ) : (
              "Update Property"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}