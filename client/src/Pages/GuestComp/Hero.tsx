import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="flex flex-col justify-center">
            <img src="/assets/beans.png" alt="Beans" className="h-24 w-24" />
            <h1 className="text-4xl font-bold text-brown-800 md:text-5xl lg:text-6xl">
              Savor the Perfect Blend, Every Time
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Each sip tells another story every time that'll make you crave for
              more as you get lost
            </p>
            <button className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-brown-600 px-6 py-3 text-white hover:bg-brown-700">
              Order Now
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <img
              src="/assets/cookies_img.png"
              alt="Coffee and pastries"
              className="rounded-2xl object-cover"
            />
            <div className="flex flex-col gap-4">
              <img
                src="/assets/shop_img.png"
                alt="Coffee shop interior"
                className="rounded-2xl object-cover"
              />
              <img
                src="/assets/coffee_img.png"
                alt="Coffee preparation"
                className="rounded-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
