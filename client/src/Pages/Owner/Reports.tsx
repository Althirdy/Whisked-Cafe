import React, { useState } from "react";
import InputField from "../../Components/InputField";
import { Download } from "lucide-react";

function Reports() {
  const [query, setQuery] = useState("");
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="w-[50%]">
          <InputField
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search order"
          />
        </div>
        <button className="flex gap-2 px-4 py-2 bg-white text-gray-900 border hover:bg-gray-50 rounded-md items-center text-sm">
          <Download size={20} />
          Export as PDF
        </button>
      </div>
    </div>
  );
}

export default Reports;
