const cities = [
  { name: "Bangalore", img: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde" },
  { name: "Hyderabad", img: "https://images.unsplash.com/photo-1582407947304-fd86f028f716" },
  { name: "Mumbai", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c" },
  { name: "Dubai", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" },
];

export default function FeaturedCities() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-6">Explore by City</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cities.map((c, i) => (
          <div key={i} className="group rounded-2xl overflow-hidden relative h-56 shadow border">
            <img src={c.img} alt={c.name} className="w-full h-full object-cover group-hover:scale-110 transition" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-3 left-4 text-white text-xl font-semibold">{c.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
