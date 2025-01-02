import { Cake, Coffee, Dog } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <Cake className="h-6 w-6" />,
      title: "Pastry",
      description: "Baked fresh made for sweetness",
    },
    {
      icon: <Coffee className="h-6 w-6" />,
      title: "Coffee",
      description: "Espresso to class",
    },
    {
      icon: <Dog className="h-6 w-6" />,
      title: "Pet friendly",
      description: "Bring along your fur friends",
    },
  ];

  return (
    <section className=" py-16">
      <div className="container mx-auto  px-4">
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col border border-gray-300 items-center rounded-xl bg-white p-6 text-center shadow-sm"
            >
              <div className="rounded-full bg-red-600 p-3 text-white">
                {feature.icon}
              </div>
              <h3 className="mt-4 text-2xl font-bold text-brown-800">
                {feature.title}
              </h3>
              <p className="text-lg text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
