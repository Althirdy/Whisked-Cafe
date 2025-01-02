export default function Testimonials() {
  return (
    <section className="py-10 bg-[#FAF6F1]">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <img
            src="/assets/double_quote.png"
            alt="DoubleQuote"
            className="mx-auto"
          />
          <blockquote>
            <p className="text-xl md:text-2xl italic text-brown-800 leading-relaxed">
              "In a fast-paced world, we believe in slow mornings and mindful
              moments. Our coffee is crafted with care, bringing you a little
              bit of comfort and connection in every cup."
            </p>
          </blockquote>
          <div className="mt-6 text-brown-600">
            <cite className="not-italic">
              <span className="font-bold italic text-gray-900 text-xl">
                Ericka Laxamana
              </span>
              <span className="mx-2">|</span>
              <span className="text-brown-500">Owner of Whisked Cafe</span>
            </cite>
          </div>
        </div>
      </div>
    </section>
  );
}
