import { useState } from "react";
import InputField from "../../Components/InputField";
import Modal from "../../Components/Modal";
import { usePosStateContext } from "../../Contexts/POSContextProvider";
import { useStateContext } from "../../Contexts/ContextProvider";
import { SaveOnlineOrder } from "./Util/Customer_Util";
import SuccessOrderModal from "../Owner/POSComp/SuccessOrderModal";
import toast from "react-hot-toast";
type CustomerName_T = {
  isOpen: boolean;
  onClose: () => void;
};
export default function PaymentModal({ isOpen, onClose }: CustomerName_T) {
  const maxLength = 4;
  const [referenceNumber, setReferenceNumber] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const { setMutatePos, posOrder, ResetData } = usePosStateContext();
  const { user } = useStateContext();
  const handleReferenceNumberChange = (e) => {
    const value = e.target.value;
    // Ensure the input value doesn't exceed the maximum length
    if (value.length <= maxLength) {
      setReferenceNumber(value);
      setMutatePos({ prop: "referenceNumber", value: value });
    }
  };

  const handlePlaceOrder = async () => {
    const successOrderData = {
      customerId: user?.id,
      meals: JSON.stringify(posOrder?.meals),
      pickUp: posOrder?.pickUp,
      time: posOrder?.time,
      totalPrice: posOrder?.totalPrice,
      referenceNumber: posOrder?.referenceNumber,
      note: posOrder?.note,
    };
    const res = await SaveOnlineOrder(successOrderData);
    if(res.success){
      setIsSuccess(true)
      setReferenceNumber("")
      ResetData();
      onClose()
    }else{
      toast.error(res.message)
      console.log(res?.error)
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={
          <div>
            <h1 className="text-brown-600 font-bold text-lg pb-4 border-b">
              Payment
            </h1>
          </div>
        }
      >
        <div>
          <span className="text-sm text-gray-800">
            Please scan the QR code to pay
          </span>
          <img
            src="https://cdn.shopify.com/s/files/1/0493/3877/7794/files/IMG_3300_600x600.jpg?v=1638497918"
            alt=""
          />
          <InputField
            label="Reference Number"
            value={referenceNumber}
            onChange={handleReferenceNumberChange}
            type="number"
            placeholder="4132"
          />
          {posOrder?.referenceNumber &&
            posOrder.referenceNumber.length == 4 && (
              <button
                onClick={handlePlaceOrder}
                className="p-3 mt-4 w-full rounded-md hover:bg-opacity-90 bg-brown-600 text-white"
              >
                Place Order
              </button>
            )}
        </div>
      </Modal>
      <SuccessOrderModal
        isOpen={isSuccess}
        onClose={() => setIsSuccess(false)}
      />
    </>
  );
}
