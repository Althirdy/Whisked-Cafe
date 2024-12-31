import { useState } from "react";
import OrderReportModal from "./OrderReportModal";

function ReportsList() {
  return (
    <div className="mt-5 grid gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
      <ReportCard />
      <ReportCard />

      <ReportCard />

      <ReportCard />

    </div>
  );
}

function ReportCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="border space-y-2 relative rounded-md p-4 bg-white shadow-sm">
        <h1 className="font-semibold text-gray-800">INV1122-001</h1>
        <div>
          <p className="text-sm text-gray-600">
            Items: <span className="font-semibold text-gray-700">4</span>
          </p>
          <p className="text-sm text-gray-600">
            Total Price:{" "}
            <span className="font-semibold text-gray-700">₱150</span>
          </p>
          <p className="text-sm text-gray-600">
            Order: <span className="font-semibold text-gray-700">In-Store</span>
          </p>
        </div>
        <span
          onClick={() => setIsModalOpen(true)}
          className=" cursor-pointer py-1 hover:text-blue-400  text-blue-600 underline text-sm"
        >
          View Details
        </span>
      </div>
      <OrderReportModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

export default ReportsList;
