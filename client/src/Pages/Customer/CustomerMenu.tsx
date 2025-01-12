import { useEffect, useState } from "react";
import {
  getMealCategory,
  getMeals,
  mealCategory,
} from "../Owner/Util/Meal_Util";
import ComboBox from "../../Components/ComboBox";
import { Meal_T, PosMealOrder } from "../Owner/POSComp/POS_T";
import AddOnsModal from "../Owner/POSComp/AddOnsModal";
import { usePosStateContext } from "../../Contexts/POSContextProvider";
import toast from "react-hot-toast";
import { ShoppingBag } from "lucide-react";
/**
 * @BASE_URL the base url for our backend
 */
const BASE_URL = import.meta.env.VITE_BACKEND_URL;
export default function CustomerMenu() {
  const [meals, setMeals] = useState<Meal_T[]>();
  const [category, setSelectedCategory] = useState<mealCategory | null>();
  const [CategoryData, setCategoryData] = useState<mealCategory[]>([
    {
      id: 0,
      category: "All menu",
    },
  ]);
  const { posOrder } = usePosStateContext();

  /**
   * @useEffect Fetching the Meal Categories
   * we need to separate the fetchMeals and fetchCategories because the fetchMeals need to watch the category
   */
  /**
   * @getMeals Creating a function that will call our getMeals in that way we can use this function later
   */
  const fetchMeals = async (url: string | undefined) => {
    const result = await getMeals(url);
    setMeals(result.data.data);
  };
  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getMealCategory();
      setCategoryData([
        {
          id: 0,
          category: "All menu",
        },
        ...data,
      ]);
    };
    fetchCategories();
  }, []);
  useEffect(() => {
    let url =
      category?.id != 0
        ? `${BASE_URL}/v1/meals?category=${category?.id}`
        : undefined;
    fetchMeals(url);
  }, [category]);
  return (
    <div className="p-4">
      <div className="flex items-center gap-2">
        <ComboBox
          combo_data={CategoryData}
          setSelectedData={(newCategory: mealCategory | null) =>
            setSelectedCategory(newCategory)
          }
        />
      </div>
      {/* Menu List */}
      {meals ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5  2xl:grid-cols-7 mt-6 gap-2">
          {meals && meals.map((m, i) => <ItemCard key={i} meal={m} />)}
        </div>
      ) : (
        "Loading..."
      )}
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
  const { posOrder, setposOrder, AddQuantity } = usePosStateContext();

  let quantity = Array.isArray(posOrder?.meals)
    ? posOrder?.meals
        .filter((m) => m.id === meal.id) // Find all meals with matching meal.id
        .reduce((acc, meal) => acc + (meal.quantity || 0), 0) // Sum the quantities
    : 0;

  const HandleMenuClick = () => {
    if (!meal.isAvailable) return;
    if (meal.mealCategory == 5) {
      const mealCart = posOrder?.meals.find((n) => n.id == meal?.id);
      if (!mealCart) {
        const mealOrder: PosMealOrder = {
          id: meal.id,
          mealName: meal.mealName,
          mealPrice: meal.mealPrices[0].price,
          quantity: 1,
          originalPrice: meal.mealPrices[0].price,
          totalPrice: meal.mealPrices[0].price,
          mealOrderId: (posOrder?.meals?.length || 0) + 1,
          mealCategory: meal.mealCategory,
        };
        setposOrder(mealOrder);
        toast.success("Order Added to cart!", {
          style: { backgroundColor: "#8B4513", color: "#ffffff" },
        });
      } else {
        AddQuantity(mealCart.mealOrderId);
      }
    } else {
      setIsOpen(true);
    }
  };

  return (
    <>
      <div
        onClick={HandleMenuClick}
        className={`${
          meal.isAvailable ? " cursor-pointer" : "cursor-not-allowed"
        } p-4 border bg-white shadow-sm  flex flex-col justify-between rounded-md relative  hover:bg-gray-50 z-1`}
      >
        {!meal.isAvailable ? (
          <div className="bg-brown-600 text-white px-2.5 py-2 text-xs rounded-md absolute top-2 left-2">
            Not Available
          </div>
        ) : (
          ""
        )}
        {/* OrderCount */}
        {quantity != 0 && (
          <div className="h-10 w-10 absolute bg-slate-600 text-white flex items-center justify-center rounded-full font-medium right-2 top-2 text-md">
            {quantity}
          </div>
        )}
        <img
          src={meal.image}
          alt="Meal Image"
          className="h-20 w-24 object-contain mx-auto"
        />
        <div className="space-y-[-.2rem]">
          <h2 className="text-gray-900 text-md font-medium">
            {" "}
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
