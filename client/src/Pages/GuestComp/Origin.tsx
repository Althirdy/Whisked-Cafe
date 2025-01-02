export default function Origin() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="grid grid-cols-2 gap-4">
            <img
              src="/assets/origin_harvest.png"
              alt="Sagada coffee plantation"
              className="rounded-2xl object-cover w-full h-full"
            />
            <img
              src="/assets/origin_beans.png"
              alt="Fresh coffee beans"
              className="rounded-2xl object-cover w-full h-full"
            />
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-brown-600 font-medium">Fresh from</h3>
              <h2 className="text-4xl md:text-5xl font-bold text-brown-800">
                Sagada!
              </h2>
            </div>

            <p className="text-lg text-brown-800 font-medium">
              Freshly sourced from Sagada — a cup full of tradition and flavor.
            </p>

            <p className="text-gray-600 leading-relaxed">
              Our beans are carefully sourced from the mountains of Sagada,
              where the cool climate and rich soil produce the perfect blend of
              flavor.
            </p>

            <div className="pt-4">
              <button className="inline-flex items-center px-6 py-3 rounded-full bg-brown-600 text-white hover:bg-brown-700 transition-colors">
                Learn More About Our Coffee
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
