import { useEffect, useState } from "react";
import Modal from "../../../Components/Modal";
import { usePosStateContext } from "../../../Contexts/POSContextProvider";
import InputField from "../../../Components/InputField";
import CustomerName from "./CustomerName";
import { SaveSuccessOrder } from "../Util/POS_Util";
import toast from "react-hot-toast";
import { useStateContext } from "../../../Contexts/ContextProvider";
import SuccessOrderModal from "./SuccessOrderModal";

type Payment = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Payment({ isOpen, onClose }: Payment) {
  const { posOrder, setPaymentMethod, setReferenceNumber} =
    usePosStateContext();
  const {user} = useStateContext()
  const [referenceNumber, _setReferenceNumber] = useState("");
  const maxLength = 4;
  const [customerModal, setCustomerModal] = useState(false);
  const [success,setSuccess] = useState(false)
  const handleReferenceNumberChange = (e) => {
    const value = e.target.value;
    // Ensure the input value doesn't exceed the maximum length
    if (value.length <= maxLength) {
      _setReferenceNumber(value);
    }
  };
  const handlePlaceOrder = async () => {
    if (!posOrder?.customerName) {
      setCustomerModal(true);
      return;
    }
    const successOrderData = {
      crewID: user?.id,
      customerName: posOrder.customerName,
      orderType: posOrder.orderType,
      meals: JSON.stringify(posOrder.meals),
      paymentMethod: posOrder.paymentMethod,
      referenceNumber: posOrder.referenceNumber,
      totalPrice: posOrder.totalPrice,
      tender: posOrder.tender,
      change: posOrder.change,
    };
    const res = await SaveSuccessOrder(successOrderData);
    if (res.success) {
      onClose();
      setSuccess(true);
    } else {
      toast.error(res.message);
    }
  };

  const handleProceedValidation = () => {
    if (posOrder?.totalPrice <= posOrder?.tender && posOrder?.paymentMethod) {
      if (
        posOrder.paymentMethod == "Gcash" &&
        posOrder.referenceNumber &&
        posOrder.referenceNumber.length == 4
      ) {
        return true;
      } else if (posOrder.paymentMethod == "Cash") {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };
  useEffect(() => {
    if (posOrder?.paymentMethod == "Cash") {
      _setReferenceNumber("");
    }
  }, [posOrder?.paymentMethod]);

  useEffect(() => {
    setReferenceNumber(referenceNumber);
  }, [referenceNumber]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="">
          <span className="block mb-2 font-medium">
            Customer Name:{" "}
            {posOrder?.customerName && (
              <span
                onClick={() => setCustomerModal(true)}
                className="text-sm  cursor-pointer text-brown-600"
              >
                {" "}
                {posOrder?.customerName}
              </span>
            )}
          </span>
          <span className="block mb-2 font-medium">
            Payment Method{" "}
            <span className="text-sm">({posOrder?.paymentMethod})</span>
          </span>
          <div className="pb-4">
            <div className="flex items-center gap-2 pb-1 ">
              <PaymentMethod
                onClick={() => setPaymentMethod("Cash")}
                type="Cash"
                src="https://png.pngtree.com/png-clipart/20211017/original/pngtree-money-icon-isolated-dollar-cash-illustration-png-image_6855357.png"
              />
              <PaymentMethod
                type="Gcash"
                onClick={() => setPaymentMethod("Gcash")}
                src="https://raketcontent.com/small_Gcash_PNG_1280x720_1_removebg_preview_654dc4afd6.png"
              />
            </div>
            {posOrder?.paymentMethod == "Gcash" && (
              <InputField
                label="Reference Number"
                value={referenceNumber}
                onChange={handleReferenceNumberChange}
                type="number"
                placeholder="4132"
              />
            )}
          </div>
          <div className="space-y-2 border-t pt-2">
            <span className="block  text-gray-700 ">
              Total Price:{" "}
              <span className="text-md font-medium">
                ₱{posOrder?.totalPrice}.00
              </span>
            </span>
            <span className="block text-gray-700 ">
              Change:{" "}
              <span className="text-md font-medium">
                ₱{posOrder?.change}.00
              </span>
            </span>
            <KeyPad />
          </div>
          {handleProceedValidation() && (
            <button
              onClick={handlePlaceOrder}
              className="p-3 mt-4 w-full rounded-md hover:bg-opacity-90 bg-brown-600 text-white"
            >
              Place Order
            </button>
          )}
        </div>
      </Modal>
      <CustomerName
        isOpen={customerModal}
        onClose={() => setCustomerModal(false)}
      />
      <SuccessOrderModal 
        isOpen={success}
        onClose={()=>setSuccess(false)}
      />
    </>
  );
}

function PaymentModalTitle() {
  return (
    <div className="pb-4 border-b">
      <h1 className="text-brown-600 text-lg font-bold">Payment</h1>
    </div>
  );
}

function PaymentMethod({
  src,
  type,
  onClick,
}: {
  src: string;
  type: string;
  onClick: () => void;
}) {
  const { posOrder } = usePosStateContext();
  const isActive = posOrder?.paymentMethod == type;
  return (
    <div
      onClick={onClick}
      className={`flex flex-col cursor-pointer  items-center border p-2 rounded-lg ${
        isActive ? "bg-gray-100" : "hover:bg-gray-100"
      }`}
    >
      <img src={src} alt={type} className="h-16 w-24 object-contain" />
      <span className="text-gray-600">{type}</span>
    </div>
  );
}

function KeyPad() {
  const [tender, _setTender] = useState("");
  const { setTender } = usePosStateContext();

  useEffect(() => {
    const parsedTender = parseInt(tender, 10);
    if (!isNaN(parsedTender)) {
      setTender(parsedTender);
    } else {
      setTender(0);
    }
  }, [tender]);

  const handleKeyPress = (value) => {
    _setTender((prev) => prev + value);
  };

  const handleClear = () => {
    _setTender("");
  };

  const handleBackspace = () => {
    _setTender((prev) => prev.slice(0, -1));
  };

  return (
    <div className=" text-center">
      <input
        type="text"
        value={tender}
        readOnly
        placeholder="Enter Tender Amount"
        className="text-md text-center p-2 w-full mb-6 border border-gray-300 rounded-lg focus:outline-none"
      />
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 9 }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handleKeyPress((i + 1).toString())}
            className="text-lg p-2.5 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200"
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={handleClear}
          className="text-lg p-2.5 bg-red-100 border border-gray-300 rounded-lg hover:bg-red-200"
        >
          Clear
        </button>
        <button
          onClick={() => handleKeyPress("0")}
          className="text-lg p-2.5 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200"
        >
          0
        </button>
        <button
          onClick={handleBackspace}
          className="text-lg p-2.5 bg-yellow-100 border border-gray-300 rounded-lg hover:bg-yellow-200"
        >
          ⌫
        </button>
      </div>
    </div>
  );
}
