import { useEffect, useState } from "react";
import { useStateContext } from "../../Contexts/ContextProvider";
import { FetchOnlineOrder } from "./Util/Customer_Util";
import { OnlineOrderReport } from "../Owner/ReportsComp/Report_T";
import CustomerOrderModel from "./CustomerOrderModel";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;
export default function CustomerOrder() {
  const [onlineOrder, setOnlineOrder] = useState<OnlineOrderReport[]>();
  const { user } = useStateContext();
  const fetchOnlineOrder = async ({ url }: { url: string }) => {
    const result = await FetchOnlineOrder({ url: url });
    setOnlineOrder(result.data.data);
    console.log(result.data.data);
  };

  useEffect(() => {
    const url = `${BASE_URL}/v1/onlineorder?customerId=${user?.id}`;
    fetchOnlineOrder({ url: url });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-brown-600 font-bold text-xl">Your Orders</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 mt-5">
        {onlineOrder &&
          onlineOrder.map((order, index) => (
            <ReportCard report={order} key={index} />
          ))}
      </div>
    </div>
  );
}

function ReportCard({ report }: { report: OnlineOrderReport }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const statusClass = () => {
    switch(report.status.toUpperCase()){
      case "CANCELLED":
          return 'bg-red-600 text-white'
          break;
      case "PENDING":
          return 'bg-brown-600 text-white'
          break;
      case "ACCEPTED":
        return 'bg-blue-600 text-white'
        break;
      default: 
        return "text-white bg-green-600"
    }
  }

  return (
    <>
      <div className="border space-y-2 relative rounded-md p-4 bg-white shadow-sm">
        <h1 className="font-semibold text-gray-800 ">
          {report.invoiceNo.length > 10
            ? `${report.invoiceNo.slice(0, 10)}...`
            : report.invoiceNo}
        </h1>
        <div>
          <div
            className={`text-xs ${statusClass()
            }  py-1 px-2 rounded-md absolute right-2 top-2`}
          >
            <span className="font-regular ">{report.status.toUpperCase()}</span>
          </div>
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
            Reference Number:{" "}
            <span className="font-semibold text-gray-700">
              {report.referenceNumber}
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
        <CustomerOrderModel
          order={report}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
