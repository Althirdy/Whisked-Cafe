import { useState } from "react";
import ComboBox from "../../Components/ComboBox";
import { ShoppingBag } from "lucide-react";
import MenuList from "./POSComp/MenuList";

const CategoryData = ["All Meals"];

function Pos() {
  const [category, setSelectedCategory] = useState<string | null>("");

  return (
    <div>
      <div className="flex items-center gap-2">
        <ComboBox
          combo_data={CategoryData}
          setSelectedData={(newCategory: string | null) =>
            setSelectedCategory(newCategory)
          }
        />
        <button className="bg-brown-600 flex gap-2 items-center text-white px-4 py-2.5 rounded-md text-sm">
          <ShoppingBag size={16} />
          Show Orders
        </button>
      </div>
      {/* MenuSection */}
      <MenuList />
    </div>
  );
}

export default Pos;
