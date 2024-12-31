import React from "react";
import Modal from "../../../Components/Modal";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

function OrderReportModal({ isOpen, onClose }: ModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="pb-4 border-b">
          <h2 className="text-brown-600 text-xl font-semibold">INV1122-002</h2>
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
            <Detials description="Customer: " content="Jin Dela Cruz" />
            <Detials description="Mode of Payment: " content="Cash" />
          </div>
          <div className="space-y-1">
            <Detials description="Issued On: " content="12-24-2024" />
            <Detials description="Pick-Up: " content="10:00 AM" />
          </div>
        </div>
        {/* Orders */}
        <div className="py-4 space-y-4 border-b">
          <h3 className="text-gray-600 text-sm">Orders:</h3>
          <ul>
            <li className="flex items-center text-sm justify-between">
              <span>1x</span>
              <span>Spanish Latte</span>
              <span>₱50</span>
            </li>
          </ul>
          <p className="text-gray-800 text-sm">Total Items: 1</p>
        </div>
        {/* total price */}
        <div className="py-4">
          <div className="flex justify-between text-gray-900 items-center">
            <h1>Total Price:</h1>
            <span>₱ 50.00</span>
          </div>
          <div className="flex justify-between text-gray-700 text-sm items-center">
            <h1>Tender:</h1>
            <span>₱ 50.00</span>
          </div>
          <div className="flex justify-between text-gray-700 text-sm items-center">
            <h1>Change:</h1>
            <span>₱ 00.00</span>
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
