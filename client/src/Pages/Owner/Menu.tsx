import { useEffect, useState } from "react";
import { getMenu } from "./Util/Menu_Util";
import ComboBox from "../../Components/ComboBox";
import { getMealCategory, mealCategory } from "./Util/Meal_Util";
import MenuList from "./MenuComp/MenuList";
import { Plus } from "lucide-react";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export default function Menu() {
  const [menuData, setMenuData] = useState<any>();
  const [category, setSelectedCategory] = useState<mealCategory | null>();
  const [CategoryData, setCategoryData] = useState<mealCategory[]>([
    {
      id: 0,
      category: "All menu",
    },
  ]);
  const fetchMenu = async (url: string) => {
    const res = await getMenu(url);
    setMenuData(res.data);
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
    if (category?.id != 0) {
      fetchMenu(`${BASE_URL}/v1/menu?category=${category?.id}`);
    } else {
      fetchMenu(`${BASE_URL}/v1/menu`);
    }
  }, [category]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2 text-gray-800 text-sm">
            Total Meals in Menu ({menuData?.meta?.total})
          </h1>
          <ComboBox
            combo_data={CategoryData}
            setSelectedData={(newCategory: mealCategory | null) =>
              setSelectedCategory(newCategory)
            }
          />
        </div>
        <button className="px-3 py-2 bg-brown-600 flex items-center gap-2 text-white rounded-md text-sm hover:bg-opacity-90 focus:outline-1 focus:outline-blue-600">
          <Plus size={16} />
          Add Meal
        </button>
      </div>
      <MenuList meals={menuData?.data} />
      {/* Pagination */}
      {menuData?.meta?.total != 0 && (
        <div className="mt-4 justify-end flex items-center gap-4">
          <button
            disabled={!menuData?.links?.prev}
            onClick={() => fetchMenu(menuData?.links?.prev)}
            className="border disabled:cursor-not-allowed disabled:bg-gray-200 text-sm gap-2 px-4 py-2 flex items-center rounded-md bg-white"
          >
            Prev
          </button>
          <p className="flex flex-col items-center text-xs">
            <span>0{menuData?.meta?.current_page}</span>
            Page
          </p>
          <button
            disabled={!menuData?.links?.next}
            onClick={() => fetchMenu(menuData?.links?.next)}
            className="border disabled:cursor-not-allowed disabled:bg-gray-200 text-sm gap-2 px-4 py-2 flex items-center rounded-md bg-white"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
