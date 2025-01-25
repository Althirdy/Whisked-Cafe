import { useState } from "react";
import ComboBox from "../../../Components/ComboBox";
import Modal from "../../../Components/Modal";
import { Meal_T } from "../POSComp/POS_T";

type MenuInfoModal = {
  isOpen: boolean;
  onClose: () => void;
  meal: Meal_T;
};
const _status = ["Available", "Unavailable"];

export default function MenuInfoModal({
  isOpen,
  onClose,
  meal,
}: MenuInfoModal) {
  const [status, setStatus] = useState("");
  const handleUpdateStatus = async () => {
    const updatedData = {
      id: meal.id,
      status: status == "Available",
    };
    
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div>
          <h1 className="text-bold text-brown-600 pb-4 border-b">
            Meal Information
          </h1>
        </div>
      }
    >
      <div className="w-full space-y-2">
        <div>
          <span className="text-sm text-gray-700">
            Status:{" "}
            <span className="italic text-brown-600">
              {meal.isAvailable ? "Available" : "UnAvailable"}
            </span>
          </span>
          <ComboBox
            combo_data={_status}
            setSelectedData={(newCategory: string | null) =>
              setStatus(newCategory)
            }
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="mealName" className="text-gray-700 text-sm">
            Meal Name
          </label>
          <input
            type="text"
            readOnly
            name="mealName"
            defaultValue={meal.mealName}
            className="border rounded-md p-2 w-full text-sm bg-slate-50"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="category" className="text-gray-700 text-sm">
            Category
          </label>
          <input
            type="text"
            readOnly
            name="category"
            defaultValue={Category(meal.mealCategory)}
            className="border rounded-md p-2 w-full text-sm bg-slate-50"
          />
        </div>
        <div>
          <span className="text-gray-700 text-sm">Prices</span>
          <div className="space-y-1">
            {meal.mealPrices.map((item, index) => (
              <div key={index} className="">
                <label htmlFor="Price" className="text-sm text-gray-700">
                  Size: {item.size}
                </label>
                <input
                  type="text"
                  name="price"
                  readOnly
                  defaultValue={`₱ ${item.price}.00`}
                  className="border rounded-md p-2 w-full text-sm bg-slate-50"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button onClick={()=>onClose()} className="text-sm border px-4 py-2 rounded-md">
            Cancel
          </button>
          <button onClick={handleUpdateStatus} className="text-sm bg-brown-600 text-white px-4 py-2 rounded-md">
            Save Update
          </button>
        </div>
      </div>
    </Modal>
  );
}

function Category(category: number) {
  switch (category) {
    case 1:
      return "Hot Coffee";
      break;
    case 2:
      return "Iced Coffee";
      break;
    case 3:
      return "Non-Coffee";
      break;
    case 4:
      return "Matcha Edition";
      break;
    case 5:
      return "Pastry";
      break;
    default:
      return "Unknown Category";
  }
}
