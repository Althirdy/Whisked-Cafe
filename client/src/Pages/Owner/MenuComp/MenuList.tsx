import { useState } from "react";
import { Menu_Props } from "../POSComp/MenuList";
import { Meal_T } from "../POSComp/POS_T";
import MenuInfoModal from "./MenuInfoModal";

export default function MenuList({ meals }: Menu_Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 mt-6 gap-2">
      {meals &&
        meals.map((item, index) => <MenuCard key={index} meal={item} />)}
    </div>
  );
}

function MenuCard({ meal }: { meal: Meal_T }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="p-4 border shadow-sm bg-white flex flex-col gap-2 justify-between rounded-md relative cursor-pointer hover:bg-gray-50 z-1"
      >
        {meal.isAvailable ? (
          <div className="bg-slate-600 text-white px-2.5 py-2 text-xs rounded-md absolute top-2 left-2">
            Available
          </div>
        ) : (
          <div className="bg-brown-600 text-white px-2.5 py-2 text-xs rounded-md absolute top-2 left-2">
            Not Available
          </div>
        )}

        <img
          src={meal.image}
          alt="Meal Image"
          className="h-20 w-24 object-contain mx-auto"
        />
        <div className="space-y-[-.2rem]">
          <h2 className={`text-gray-900  font-medium text-md`}>
            {meal.mealName.length > 12
              ? `${meal.mealName.slice(0, 10)}...`
              : meal.mealName}
          </h2>
          <div>
            <p className="text-xs">
              For as low as: <span>₱ {meal.mealPrices[0]?.price}.00</span>{" "}
              <span>{meal.mealPrices[0]?.size}</span>
            </p>
          </div>
        </div>
      </div>
      {isOpen && (
        <MenuInfoModal
          meal={meal}
          isOpen={isOpen}
          // mealPrices={meal.mealPrices}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
