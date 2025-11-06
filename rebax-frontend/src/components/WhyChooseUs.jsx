export default function WhyChooseUs() {
  const items = [
    { title: "Verified Listings", desc: "Every property is reviewed for authenticity." },
    { title: "Broker Network", desc: "Trusted brokers across major cities." },
    { title: "Smart Search", desc: "Powerful filters to find your perfect home." },
    { title: "Secure & Private", desc: "Your data is encrypted and safe." },
  ];
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-6">Why choose <span className="text-indigo-600">RebaX</span>?</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((it, idx) => (
          <div key={idx} className="rounded-2xl border bg-white dark:bg-neutral-900 p-6 shadow hover:shadow-lg transition">
            <h3 className="font-semibold text-lg">{it.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">{it.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
