import CountUp from "react-countup";

export default function StatsStrip() {
  const stats = [
    { label: "Properties Listed", value: 1200 },
    { label: "Verified Brokers", value: 180 },
    { label: "Happy Buyers", value: 2400 },
    { label: "Cities Covered", value: 25 },
  ];
  return (
    <section className="bg-indigo-600 text-white">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div key={i} className="text-center">
            <div className="text-3xl font-extrabold">
              <CountUp end={s.value} duration={1.4} />+
            </div>
            <div className="opacity-90">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
