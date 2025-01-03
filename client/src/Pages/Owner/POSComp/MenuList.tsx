import { useState } from "react";
import AddOnsModal from "./AddOnsModal";
import { Meal_T, PosMealOrder } from "./POS_T";
import { usePosStateContext } from "../../../Contexts/POSContextProvider";
import toast from "react-hot-toast";

type Menu_Props = {
  meals: Meal_T[];
};

export default function MenuList({ meals }: Menu_Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 mt-6 gap-2">
      {meals && meals.map((m, i) => <ItemCard key={i} meal={m} />)}
    </div>
  );
}

/**
 *
 * @param Meal the meals data from  database
 * @returns
 */
function ItemCard({ meal }: { meal: Meal_T }) {
  const [isOpen, setIsOpen] = useState(false);
  const { posOrder,setposOrder } = usePosStateContext();

  let quantity = Array.isArray(posOrder?.meals)
    ? posOrder?.meals
        .filter((m) => m.id === meal.id) // Find all meals with matching meal.id
        .reduce((acc, meal) => acc + (meal.quantity || 0), 0) // Sum the quantities
    : 0;

  const HandleMenuClick = () => {
    if(meal.mealCategory == 5){
      const mealOrder:PosMealOrder = {
        id: meal.id,
        mealName: meal.mealName,
        mealPrice: meal.mealPrices[0].price,
        quantity: 1,
        originalPrice:  meal.mealPrices[0].price,
        totalPrice: meal.mealPrices[0].price,
        mealOrderId: (posOrder?.meals?.length || 0) + 1,
        mealCategory: meal.mealCategory
      }
      setposOrder(mealOrder);
      toast.success("Order Added to cart!", {
        style: { backgroundColor: "#8B4513", color: "#ffffff" },
      });
    }else{
      setIsOpen(true)
    }
  }

  return (
    <>
      <div
        onClick={HandleMenuClick}
        className="p-4 border shadow-sm bg-white flex flex-col justify-between rounded-md relative cursor-pointer hover:bg-gray-50 z-1"
      >
        {/* OrderCount */}
        {quantity != 0 && (
          <div className="h-10 w-10 absolute bg-slate-600 text-white flex items-center justify-center rounded-full font-medium right-2 top-2 text-md">
            {quantity}
          </div>
        )}
        <img
          src={meal.image}
          alt="Meal Image"
          className="h-24 w-24 object-contain mx-auto"
        />
        <div className="space-y-[-.2rem]">
          <h2 className="text-gray-900 text-lg font-medium">{meal.mealName}</h2>
          <div>
            <p className="text-xs">
              For as low as: <span>₱ {meal.mealPrices[0]?.price}.00</span>{" "}
              <span>{meal.mealPrices[0]?.size}</span>
            </p>
          </div>
        </div>
      </div>
      {meal.mealCategory !== 5 && isOpen && (
        <AddOnsModal
          meal={meal}
          isOpen={isOpen}
          mealPrices={meal.mealPrices}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
