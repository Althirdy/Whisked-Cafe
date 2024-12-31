import { useState } from "react";
import ComboBox from "../../Components/ComboBox";
import boba_milktea from "@/Assets/boba_milktea.png";

const CategoryData = ["All Meals"];

function Pos() {
  const [category, setSelectedCategory] = useState<string | null>("");

  return (
    <div>
      <ComboBox
        combo_data={CategoryData}
        setSelectedData={(newCategory: string | null) =>
          setSelectedCategory(newCategory)
        }
      />
      {/* MenuSection */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 mt-6 gap-2">
        <ItemCard />
        <ItemCard />

        <ItemCard />

        <ItemCard />

        <ItemCard />

      </div>
    </div>
  );
}

function ItemCard() {
  return (
    <div className="p-4 border shadow-sm bg-white rounded-md relative cursor-pointer hover:bg-gray-50 z-1">
      {/* OrderCount */}
      <div className="h-10 w-10 absolute bg-brown-600 text-white flex items-center justify-center rounded-full font-medium right-2 top-2 text-md">
        2
      </div>
      <img src={boba_milktea} alt="Boba Milktea" className="h-28 mx-auto" />
      <div className="space-y-[-.2rem]">
        <h2 className="text-gray-900 text-lg font-medium">Boba Milktea</h2>
        <p className="text-gray-600 text-sm">₱ 99.00</p>
      </div>
    </div>
  );
}

export default Pos;
