import { CupSoda, ShoppingBag } from "lucide-react";
import Modal from "../../../Components/Modal";
import { usePosStateContext } from "../../../Contexts/POSContextProvider";

type OrderType = {
  isOpen: boolean;
  onClose: () => void;
  handleOrderTypeProceed: () => void;
};

export default function OrderType({
  isOpen,
  onClose,
  handleOrderTypeProceed,
}: OrderType) {
  const { posOrder, setOrderType } = usePosStateContext();

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={<OrderTypeModalTitle />}>
      <div className="space-y-2">
        <OrderTypeOption
          orderType="Take Out"
          onClick={() => setOrderType("Take Out")}
          icon={<ShoppingBag size={28} className="text-brown-600" />}
          type="Take Out"
          subhead={"Pack it up and take it anywhere!"}
        />
        <OrderTypeOption
          onClick={() => setOrderType("Dine In")}
          orderType="Dine In"
          icon={<CupSoda size={28} className="text-brown-600" />}
          type="Dine In"
          subhead="A dining experience made just for you."
        />
        {posOrder?.orderType && (
          <>
            {" "}
            <button
              onClick={() => handleOrderTypeProceed()}
              className="p-2.5 text-center w-full bg-brown-600 text-white rounded-md"
            >
              Proceed
            </button>
          </>
        )}
      </div>
    </Modal>
  );
}

function OrderTypeModalTitle() {
  return (
    <div>
      <h1 className="text-brown-600 font-bold pb-4 border-b">Order Type</h1>
    </div>
  );
}

function OrderTypeOption({
  icon,
  type,
  orderType,
  onClick,
  subhead,
}: {
  icon: React.ReactNode;
  orderType: string;
  type: string;
  subhead: string;
  onClick: () => void;
}) {
  const { posOrder } = usePosStateContext();

  const isActive = orderType == posOrder?.orderType;
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-2  p-4 rounded-md cursor-pointer border ${
        isActive ? "bg-gray-100 text-gray-800" : "hover:bg-gray-100"
      }`}
    >
      {icon}
      <div className="flex flex-col gap-[-1rem]">
        <h1 className=" text-lg font-semibold">{type}</h1>
        <p className="text-sm text-gray-600">{subhead}</p>
      </div>
    </div>
  );
}
