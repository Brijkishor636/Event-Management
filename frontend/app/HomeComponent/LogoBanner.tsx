"use client"

export default function LogoBanner() {
  const logos = [
    {
      name: "Asian Paints",
      img: "https://upload.wikimedia.org/wikipedia/en/0/09/Asian_Paints_logo.svg",
    },
    {
      name: "Aditya Birla Group",
      img: "https://upload.wikimedia.org/wikipedia/en/d/d0/Aditya_Birla_Group_logo.png",
    },
    {
      name: "HPCL",
      img: "https://upload.wikimedia.org/wikipedia/en/0/08/Hindustan_Petroleum_logo.svg",
    },
    {
      name: "Zydus Wellness",
      img: "https://upload.wikimedia.org/wikipedia/en/3/3c/Zydus_Wellness_logo.png",
    },
    {
      name: "Wipro",
      img: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Wipro_logo_2020.svg",
    },
    {
      name: "Amazon",
      img: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    },
    {
      name: "Flipkart",
      img: "https://upload.wikimedia.org/wikipedia/commons/0/0d/Flipkart_logo.png",
    },
    {
      name: "L'Oréal",
      img: "https://upload.wikimedia.org/wikipedia/commons/3/35/L%27Oreal_logo.svg",
    },
  ];

  return (
    <section className="w-full bg-gray-200 shadow-sm hover:shadow-md transition py-6 my-15 hidden lg:block">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-center text-lg font-semibold text-gray-700 mb-8">
          Trusted by Leading Companies
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center justify-items-center">
          {logos.map((logo, index) => (
            <img
              key={index}
              src={logo.img}
              alt={logo.name}
              className="h-10 object-contain grayscale hover:grayscale-0 transition"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
