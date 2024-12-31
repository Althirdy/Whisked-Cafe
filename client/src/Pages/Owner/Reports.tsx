import React, { useState } from "react";
import InputField from "../../Components/InputField";
import { Download } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReportsList from "./ReportsComp/ReportsList";

function Reports() {
  const [query, setQuery] = useState("");
  const [date, setDate] = useState(new Date());

  return (
    <div>
      <h1 className="mb-2 font-semibold text-md text-gray-900">Invoices (4)</h1>
      <div className="prose flex  gap-4 items-center mb-2">
        <DatePicker
          selected={date}
          onChange={(date) => {
            setDate(date);
          }}
          className="py-2 px-3 border border-gray-300 text-gray-800 text-sm rounded-md flex items-center"
          maxDate={new Date()}
        />
        <button className="flex gap-2 px-4 py-2 bg-white border-gray-300 text-gray-900 border hover:bg-gray-50 rounded-md items-center text-sm">
          <Download size={20} />
          Export as PDF
        </button>
      </div>
      <div className="md:w-[60%] lg:w-[40%] flex flex-col gap-2">
        <InputField
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search order"
        />
      </div>
      <ReportsList />
    </div>
  );
}

export default Reports;
