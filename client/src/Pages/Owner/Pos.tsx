import { useEffect, useState } from "react";
import ComboBox from "../../Components/ComboBox";
import { ShoppingBag } from "lucide-react";
import MenuList from "./POSComp/MenuList";
import { getMealCategory, mealCategory } from "./Util/Meal_Util";
import OrderSummary from "./POSComp/OrderSummary";

// const CategoryData = ["All Meals"];

function Pos() {
  const [category, setSelectedCategory] = useState<mealCategory | null>();
  const [CategoryData, setCategoryData] = useState<mealCategory[]>([
    {
      id: 0,
      category: "All menu",
    },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getMealCategory();
      setCategoryData(data);
    };

    fetchCategories();
  }, []);

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
          <button onClick={()=>setIsOpen(true)} className="bg-brown-600 flex gap-2 items-center text-white px-4 py-2.5 rounded-md text-sm">
            <ShoppingBag size={16} />
            Show Orders
          </button>
        </div>
        {/* MenuSection */}
        <MenuList />
      </div>
      <OrderSummary isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

export default Pos;
