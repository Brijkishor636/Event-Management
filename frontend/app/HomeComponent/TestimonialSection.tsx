"use client"

export default function Testimonials() {
  const testimonials = [
    {
      title: "Students and Professionals",
      desc: "Unlock Your Potential: Compete, Build Resume, Grow and get Hired!",
      img: "./student.webp",
    },
    {
      title: "Companies and Recruiters",
      desc: "Discover Right Talent: Hire, Engage, and Brand Like Never Before!",
      img: "./companies.webp",
    },
    {
      title: "Colleges",
      desc: "Bridge Academia and Industry: Empower Students with Real–World Opportunities!",
      img: "./colleges.webp",
    },
  ];

  return (
    <section className="px-6 pt-3 xl:px-15 md:px-20 lg:px-4">
      <h2 className="text-xl font-bold text-gray-800 mb-8">
        Who's using Event Manager?
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t, index) => (
          <div
            key={index}
            className="flex items-center justify-between gap-4 border border-gray-400 rounded-xl p-5 shadow-sm hover:shadow-md transition bg-gray-100"
          >
            <div>
              <h3 className="text-lg md:text-base lg:text-lg font-semibold text-gray-900">{t.title}</h3>
              <p className="text-sm sm:text-[12px] text-gray-600 mt-2">{t.desc}</p>
            </div>
            <img
              src={t.img}
              alt={t.title}
              className="w-25 h-20 rounded-2xl object-cover"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-5 mb-10">
        <button className="text-gray-700 font-semibold flex items-center gap-1 cursor-pointer">
          Know How <span>▼</span>
        </button>
      </div>
    </section>
  );
}
