import { Plus } from "lucide-react";
import InputField from "../../Components/InputField";
import { useState } from "react";

export default function () {
  const [query, setQuery] = useState<string>("");

  return (
    <div>
      {" "}
      <div className="md:flex space-y-2 justify-between items-center">
        <div className="flex flex-col gap-2 md:w-[50%]">
          <h1 className="font-semibold text-md">Inventory</h1>
          <InputField
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search employee.."
          />
        </div>
        <button className="px-3 py-2 bg-brown-600 flex items-center gap-2 text-white rounded-md text-sm hover:bg-opacity-90 focus:outline-1 focus:outline-blue-600">
          <Plus size={16} />
          Add Item
        </button>
      </div>
    </div>
  );
}
