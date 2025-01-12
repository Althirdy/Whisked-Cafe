import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import InputField from "../../Components/InputField";
import "react-datepicker/dist/react-datepicker.css";
import {
  FetchOnlineOrder,
  UpdateOnlineOrder,
} from "../Customer/Util/Customer_Util";
import { OnlineOrderReport } from "./ReportsComp/Report_T";
import { Trash } from "lucide-react";
import CustomerOrderModel from "../Customer/CustomerOrderModel";
import RemoveOrderConfirmation from "../Customer/RemoveOrderConfirmation";
import { useStateContext } from "../../Contexts/ContextProvider";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export default function OnlineOrders() {
  const [date, setDate] = useState<Date | null>(new Date());
  const [query, setQuery] = useState("");
  const [onlineorder, setOnlineOrder] = useState<OnlineOrderReport[]>();

  const _FetchOnlineOrder = async ({ url }: { url: string }) => {
    const res = await FetchOnlineOrder({ url: url });
    if (res.success) {
      setOnlineOrder(res.data.data);
    } else {
      console.log(res.message);
    }
  };

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]; // Get today's date in "YYYY-MM-DD" format
    const selectedDate = date ? date.toISOString().split("T")[0] : null;
    let Url = `${BASE_URL}/v1/onlineorder`;

    if (selectedDate && selectedDate !== today) {
      Url += `?date=${selectedDate}`;
    }
    if (query) {
      Url +=
        selectedDate && selectedDate !== today
          ? `&query=${query}`
          : `?query=${query}`;
    }
    console.log(Url);

    _FetchOnlineOrder({ url: Url });
  }, [date, query]);

  return (
    <div>
      <h1 className="mb-2 font-semibold text-md text-gray-900">
        Online Order ({onlineorder?.length || 0})
      </h1>
      <div className="prose flex  gap-4 items-center mb-2">
        <DatePicker
          selected={date}
          onChange={(date) => {
            setDate(date);
          }}
          className="py-2 px-3 border border-gray-300 text-gray-800 text-sm rounded-md flex items-center"
          maxDate={new Date()}
        />
      </div>
      <div className="md:w-[60%] lg:w-[40%] flex flex-col gap-2">
        <InputField
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search order.. invoice no., customer name, or reference number."
        />
      </div>
      {/**
       * @OnlineOrder List
       */}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {onlineorder &&
          onlineorder.length > 0 &&
          onlineorder.map((item, index) => (
            <OnlineOrderCard
              order={item}
              key={index}
              FetchOnlineOrder={() =>
                _FetchOnlineOrder({
                  url: `${BASE_URL}/v1/onlineorder`,
                })
              }
            />
          ))}
      </div>
    </div>
  );
}

function OnlineOrderCard({
  order,
  FetchOnlineOrder,
}: {
  order: OnlineOrderReport;
  FetchOnlineOrder: () => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRemoveModal, setIsRemoveModal] = useState(false);
  const { user } = useStateContext();
  const handleConfirmOrder = async () => {
    const UpdateOrder = {
      crewId: user?.id,
      status: "ACCEPTED",
      id: order.id,
    };
    const res = await UpdateOnlineOrder(UpdateOrder);
    if (res.success) {
      toast.success("Ordered Accepted Successfully");
      FetchOnlineOrder();
    }
  };

  const handleCompleteOrder = async () => {
    const CompleteOrder = {
      crewId: user?.id,
      status: "COMPLETED",
      id: order.id,
    };
    const res = await UpdateOnlineOrder(CompleteOrder);
    if (res.success) {
      toast.success("Ordered Completed Successfully");
      FetchOnlineOrder();
    }
  };

  return (
    <>
      <div className="border space-y-2 relative rounded-md px-4 py-6 bg-white shadow-sm">
        {order.status == "pending" && (
          <button
            onClick={() => setIsRemoveModal(true)}
            title="Delete Order "
            className="p-2 absolute right-2 top-2 rounded-full hover:bg-slate-600 hover:text-white"
          >
            <Trash size={16} />
          </button>
        )}{" "}
        <div className="flex flex-col justify-between h-full">
          <div className="pb-2">
            <h1 className="font-semibold text-gray-800 ">
              {order.invoiceNo.length > 10
                ? `${order.invoiceNo.slice(0, 10)}...`
                : order.invoiceNo}
            </h1>
            <div>
              <p className="text-sm text-gray-600">
                Items:{" "}
                <span className="font-semibold text-gray-700">
                  {order.meals.length}
                </span>
              </p>
              <p className="text-sm text-gray-600">
                Total Price:{" "}
                <span className="font-semibold text-gray-700">
                  ₱ {order.totalPrice}.00
                </span>
              </p>
              <p className="text-sm text-gray-600">
                Reference Number:{" "}
                <span className="font-semibold text-gray-700">
                  {order.referenceNumber}
                </span>
              </p>
              <p className="text-sm text-gray-600">
                Pick-Up:{" "}
                <span className="font-semibold text-gray-700">
                  {order.pickUp} - {order.time}
                </span>
              </p>
            </div>
            <span
              onClick={() => setIsModalOpen(true)}
              className=" cursor-pointer py-1 hover:text-blue-400  text-blue-600 underline text-sm"
            >
              View Order Details
            </span>
          </div>
          {order.status == "ACCEPTED" && (
            <button
              onClick={handleCompleteOrder}
              className="bg-green-600 text-white w-full p-2 rounded-md text-sm hover:opacity-90"
            >
              Complete Order
            </button>
          )}
          {order.status == "pending" && (
            <button
              onClick={handleConfirmOrder}
              className="bg-brown-600 text-white w-full p-2 rounded-md text-sm hover:opacity-90"
            >
              Confirm Order
            </button>
          )}
          {order.status == "CANCELLED" && (
            <div className=" border-t pt-2">
              <span className="text-sm ">This order is cancelled</span>
              <br />
              <span className="text-xs italic">
                Reason: {order.cancelReason}
              </span>
              <br />
              <span className="text-xs italic">
                Cancelled by: {order.crew?.fullName}
              </span>
            </div>
          )}
           {order.status == "COMPLETED" && (
            <div className=" border-t pt-2">
              <span className="text-sm ">This order is completed</span>
              <br />
              <span className="text-xs italic">
                Served by: {order.crew?.fullName}
              </span>
            </div>
          )}
        </div>
      </div>
      {isModalOpen && (
        <CustomerOrderModel
          order={order}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      {isRemoveModal && (
        <RemoveOrderConfirmation
          FetchOnlineOrder={FetchOnlineOrder}
          isOpen={isRemoveModal}
          onClose={() => setIsRemoveModal(false)}
          order={order}
        />
      )}
    </>
  );
}
