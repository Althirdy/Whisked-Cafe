import { useState } from "react";
import OrderReportModal from "./OrderReportModal";
import { Report_T } from "./Report_T";

function ReportsList({ reportData }: { reportData: Report_T[] }) {
  return (
    <div className="mt-5 grid gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
      {reportData &&
        reportData.map((item, index) => (
          <ReportCard key={index} report={item} />
        ))}
    </div>
  );
}

function ReportCard({ report }: { report: Report_T }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="border space-y-2 relative rounded-md p-4 bg-white shadow-sm">
        <h1 className="font-semibold text-gray-800 ">
          {report.invoiceNo.length > 10
            ? `${report.invoiceNo.slice(0, 10)}...`
            : report.invoiceNo}
        </h1>
        <div>
          <p className="text-sm text-gray-600">
            Customer Name:{" "}
            <span className="font-semibold text-gray-700">
              {report.customerName}
            </span>
          </p>
          <p className="text-sm text-gray-600">
            Items:{" "}
            <span className="font-semibold text-gray-700">
              {report.meals.length}
            </span>
          </p>
          <p className="text-sm text-gray-600">
            Total Price:{" "}
            <span className="font-semibold text-gray-700">
              ₱ {report.totalPrice}.00
            </span>
          </p>
          <p className="text-sm text-gray-600">
            Order:{" "}
            <span className="font-semibold text-gray-700">
              {report.orderType}
            </span>
          </p>
        </div>
        <span
          onClick={() => setIsModalOpen(true)}
          className=" cursor-pointer py-1 hover:text-blue-400  text-blue-600 underline text-sm"
        >
          View Details
        </span>
      </div>
      {isModalOpen && (
        <OrderReportModal
          report={report}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}

export default ReportsList;
