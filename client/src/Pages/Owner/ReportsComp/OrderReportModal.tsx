import React from "react";
import Modal from "../../../Components/Modal";
import { Report_T } from "./Report_T";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  report: Report_T;
};

function OrderReportModal({ isOpen, onClose, report }: ModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="pb-4 border-b">
          <h2 className="text-brown-600 text-xl font-semibold">
            {report.invoiceNo}
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
            <Detials description="Customer: " content={report.customerName} />
            <Detials
              description="Mode of Payment: "
              content={report.paymentMethod}
            />
            {report.paymentMethod == "Gcash" && (
              <Detials
                description="Reference Number: "
                content={report.referenceNumber ? report.referenceNumber : ""}
              />
            )}
          </div>
          <div className="space-y-1">
            <Detials description="Issued On: " content={report.createdAt} />
            <Detials description="Cashier: " content={report.user.fullName} />
          </div>
        </div>
        {/* Orders */}
        <div className="py-4 space-y-4 border-b">
          <h3 className="text-gray-600 text-sm">Orders:</h3>
          <ul className="space-y-2">
            {report.meals.map((item, index) => (
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
                <span className="text-end">₱{item.totalPrice}</span>
              </li>
            ))}
          </ul>
          <p className="text-gray-800 text-sm">
            Total Items: {report.meals.length}
          </p>
        </div>
        {/* total price */}
        <div className="py-4">
          <div className="flex justify-between text-gray-900 items-center">
            <h1>Total Price:</h1>
            <span>₱ {report.totalPrice}.00</span>
          </div>
          <div className="flex justify-between text-gray-700 text-sm items-center">
            <h1>Tender:</h1>
            <span>₱ {report.tender}.00</span>
          </div>
          <div className="flex justify-between text-gray-700 text-sm items-center">
            <h1>Change:</h1>
            <span>₱ {report.change}.00</span>
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
  content: string;
}) {
  return (
    <h6 className="text-sm text-gray-600">
      {description}
      <span className="text-gray-800 font-semibold ">{content}</span>
    </h6>
  );
}

export default OrderReportModal;
