import { ChevronLeft, ChevronRight, Star } from "lucide-react";

export default function Products() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-center md:text-4xl lg:text-5xl font-bold text-brown-800">
          Popular products
        </h2>
        <p className="mt-2 md:text-lg lg:text-xl text-center text-gray-600">
          Highlighting top-selling items to keep you informed on customer
          favorites
        </p>

        <div className="relative mt-12">
          <button className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow-md">
            <ChevronLeft className="h-6 w-6" />
          </button>

          <div className="mx-12">
            <div className="flex items-center gap-8">
              <div className="flex-1 md:flex items-center rounded-xl bg-white p-6 ">
                <img
                  src="/assets/popular_matcha.png"
                  alt="Matcha Flavor"
                  className="mx-auto lg:w-[600px] lg:h-[600px] object-cover"
                />
                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-3xl font-bold text-brown-800">
                      Matcha Flavor
                    </h3>
                    <span className="rounded-full bg-brown-600 px-3 py-1 text-sm text-white">
                      $48
                    </span>
                  </div>
                  <p className="mt-2 text-lg leading-tight text-gray-600">
                    Experience the smooth, rich <br /> notes of pure matcha
                  </p>
                  <div className="mt-4 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow-md">
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
