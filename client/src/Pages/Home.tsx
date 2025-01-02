import Hero from "./GuestComp/Hero";
import Features from "./GuestComp/Features";
import Products from "./GuestComp/Products";
import Testimonials from "./GuestComp/Testimonials";
import Origin from "./GuestComp/Origin";

export default function Home() {
  return (
    <div>
      <Hero />
      <Features />
      <Products />
      <Testimonials />
      <Origin />
    </div>
  );
}
