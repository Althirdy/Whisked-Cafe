import { useEffect, useState } from "react";
import ComboBox from "../../Components/ComboBox";
import { ShoppingBag } from "lucide-react";
import MenuList from "./POSComp/MenuList";
import { getMealCategory, getMeals, mealCategory } from "./Util/Meal_Util";
import OrderSummary from "./POSComp/OrderSummary";
import { Meal_T } from "./POSComp/POS_T";
import { usePosStateContext } from "../../Contexts/POSContextProvider";

/**
 * @BASE_URL the base url for our backend
 */
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

function Pos() {
  const [category, setSelectedCategory] = useState<mealCategory | null>();
  const [CategoryData, setCategoryData] = useState<mealCategory[]>([
    {
      id: 0,
      category: "All menu",
    },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [meals, setMeals] = useState<Meal_T[]>();
  const { posOrder } = usePosStateContext();

  /**
   * @getMeals Creating a function that will call our getMeals in that way we can use this function later
   */
  const fetchMeals = async (url: string | undefined) => {
    const result = await getMeals(url);
    setMeals(result.data.data);
  };

  /**
   * @useEffect Fetching the Meal Categories
   * we need to separate the fetchMeals and fetchCategories because the fetchMeals need to watch the category
   */
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
    <>
      <div>
        <div className="flex items-center gap-2">
          <ComboBox
            combo_data={CategoryData}
            setSelectedData={(newCategory: mealCategory | null) =>
              setSelectedCategory(newCategory)
            }
          />
          {posOrder?.meals.length != 0 && (
            <button
              onClick={() => setIsOpen(true)}
              className="bg-brown-600 flex gap-2 items-center text-white px-4 py-2.5 rounded-md text-sm"
            >
              <ShoppingBag size={16} />
              Show {posOrder?.meals.length} Orders
            </button>
          )}
        </div>
        {/* MenuSection */}
        {meals ? (
          <MenuList meals={meals} />
        ) : (
          <h1 className="mt-4">Loading ....</h1>
        )}
      </div>
      <OrderSummary isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

export default Pos;
