import { ReactNode } from "react";
import Modal from "../../Components/Modal";
import { OnlineOrderReport } from "../Owner/ReportsComp/Report_T";

type CustomerOrderModel_T = {
  isOpen: boolean;
  onClose: () => void;
  order: OnlineOrderReport;
};

export default function CustomerOrderModel({
  isOpen,
  onClose,
  order,
}: CustomerOrderModel_T) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="pb-4 border-b">
          <h2 className="text-brown-600 text-xl font-semibold">
            {order.invoiceNo}
          </h2>
        </div>
      }
    >
      <div>
        <header className="mb-4">
          <h5 className="font-semibold text-sm text-gray-900">
            Whisked Cafe - By Ericka
          </h5>
          <p className="text-sm text-gray-600">
            Blk 18 Lot 21 Congress Extension , Caloocan, Philippines
          </p>
        </header>
        <div className="flex items-center justify-between border-b pb-4">
          <div className="space-y-1">
            <Detials
              description="Customer: "
              content={order.customer.fullName}
            />
            <Detials
              description="Customer Phone Number: "
              content={order.customer.phoneNumber}
            />
            <Detials description="PickUp: " content={order.pickUp} />
            <Detials description="Time: " content={order.time} />
            <Detials description="Status: " content={order.status} />
            {order.status.toUpperCase() != "PENDING" && (
              <>
                <Detials description="Crew: " content={order.crew?.fullName} />
                <Detials
                  description="Phone Number: "
                  content={order.crew?.phoneNumber}
                />
                {order.status.toUpperCase() == "CANCELLED" && (
                  <Detials
                    description="Reason: "
                    content={order.cancelReason}
                  />
                )}
              </>
            )}
            <Detials
              description="Reference Number: "
              content={order.referenceNumber}
            />
            <Detials
              description="Note: "
              content={
                <div className="italic font-regular">
                  {order.orderNote || "N/A"}
                </div>
              }
            />
          </div>
        </div>
        {/* Orders */}
        <div className="py-4 space-y-4 border-b">
          <h3 className="text-gray-600 text-sm">Orders:</h3>
          <ul className="space-y-2">
            {order.meals.map((item, index) => (
              <li key={index} className="grid grid-cols-3 text-sm ">
                <span className="">{item.quantity}x</span>
                <div className="flex flex-col">
                  <div className="flex gap-2 items-center">
                    <span className="font-semibold">{item.mealName}</span>
                    <span className="text-xs">
                      {typeof item.mealPrice == "object" &&
                        `${item.mealPrice.size}`}
                    </span>
                  </div>
                  {/* ADDONS */}
                  {item.addOns && item.addOns.length > 0 && (
                    <div className="ml-4">
                      {item.addOns.map((addOn, addOnIndex) => (
                        <>
                          <span
                            key={addOnIndex}
                            className="text-gray-600 text-xs"
                          >
                            {addOn.name} ₱{addOn.price}
                          </span>
                          <br />
                        </>
                      ))}
                    </div>
                  )}
                </div>
                <span className="text-end">₱ 250</span>
              </li>
            ))}
          </ul>
          <p className="text-gray-800 text-sm">
            Total Items: {order.meals.length}
          </p>
        </div>
        {/* total price */}
        <div className="py-4">
          <div className="flex justify-between text-gray-900 items-center">
            <h1>Total Price:</h1>
            <span>₱ {order.totalPrice}.00</span>
          </div>
        </div>
      </div>
    </Modal>
  );
}

function Detials({
  description,
  content,
}: {
  description: string;
  content: ReactNode;
}) {
  return (
    <h6 className="text-sm text-gray-600">
      {description}
      <span className="text-gray-800 font-semibold ">{content}</span>
    </h6>
  );
}
