import { CirclePlus, ShoppingBag, Trash } from "lucide-react";
import Modal from "../../../Components/Modal";

type OrderSummaryModal_T = {
  isOpen: boolean;
  onClose: () => void;
};

export default function OrderSummary({ ...props }: OrderSummaryModal_T) {
  return (
    <Modal
      isOpen={props.isOpen}
      onClose={props.onClose}
      title={<OrderSummaryTitle />}
    >
      <div className="space-y-3">
        <span className="text-gray-700">items: (1)</span>
        <div className="space-y-2 max-h-[60vh] overflow-auto pr-2 OrderSummaryScroll">
          <OrderItem />
        </div>
        <button className="bg-brown-600 text-white w-full p-2 rounded-md hover:bg-opacity-95">
          Proceed to Payment
        </button>
      </div>
    </Modal>
  );
}

function OrderSummaryTitle() {
  return (
    <div className="pb-4 border-b">
      <h1 className="flex gap-2 items-center font-semibold text-brown-600 text-xl">
        <ShoppingBag size={20} /> Order Summary
      </h1>
    </div>
  );
}

function OrderItem() {
  return (
    <div className="flex justify-between">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="font-bold text-slate-800">Spanish Latte</h1>
          <span className="text-xs">12 Oz</span>
        </div>
        <div className="ml-2 flex flex-col">
          <span className="text-sm font-semibold text-gray-800">
            Sugar Level: 100%
          </span>
          <span className="text-sm font-medium text-gray-600">Add ons:</span>
        </div>
        <div className="ml-4 flex flex-col">
          <span className="text-sm  text-gray-600">
            Espresso Shot
          </span>
          <span className="text-sm  text-gray-600">Nata</span>
          <span className="text-sm  text-gray-600">Pearl</span>
        </div>
      </div>
      <div className="space-y-2">
        <div className="text-gray-800 flex items-center gap-4 p-1 justify-center border rounded-md">
          <Trash className="cursor-pointer hover:text-brown-600" size={18} />
          <span className="text-md">1</span>
          <CirclePlus
            size={18}
            className="cursor-pointer hover:text-brown-600"
          />
        </div>
        <p className="text-gray-800 text-sm">Total: ₱ 150.00</p>
      </div>
    </div>
  );
}
