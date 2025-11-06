import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const data = [
  { name: "Aisha K.", txt: "Found a perfect 2BHK in Whitefield within 3 days!", role: "Buyer" },
  { name: "John Realtor", txt: "RebaX helps me close faster with qualified leads.", role: "Broker" },
  { name: "Rahul S.", txt: "Clean UI, verified listings — no spam.", role: "Buyer" },
];

export default function Testimonials() {
  return (
    <section className="max-w-5xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-6 text-center">What our users say</h2>
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3500 }}
        pagination={{ clickable: true }}
        spaceBetween={24}
        slidesPerView={1}
        className="pb-10"
        breakpoints={{ 768: { slidesPerView: 2 } }}
      >
        {data.map((t, i) => (
          <SwiperSlide key={i}>
            <div className="rounded-2xl border bg-white dark:bg-neutral-900 p-6 shadow h-full">
              <p className="text-lg">“{t.txt}”</p>
              <div className="mt-4 font-semibold">{t.name}</div>
              <div className="text-sm text-gray-500">{t.role}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
