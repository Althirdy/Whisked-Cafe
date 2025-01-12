import { ReactNode, useEffect, useState } from "react";
import Modal from "../../Components/Modal";
import { usePosStateContext } from "../../Contexts/POSContextProvider";
import toast from "react-hot-toast";
import PaymentModal from "./PaymentModal";

type CustomerName_T = {
  isOpen: boolean;
  onClose: () => void;
};

export default function PickUpOptionModal({ isOpen, onClose }: CustomerName_T) {
  const { posOrder, setMutatePos } = usePosStateContext();
  const [ReadyToPayment, setReadyToPayment] = useState(false);
  const [time, setTime] = useState<any>();
  const handleScheduled = () => {
    setMutatePos({ prop: "pickUp", value: "Scheduled" });
  };
  const [isPaymentModal, setIsPaymentModal] = useState(false);
  const handleStandard = () => {
    setMutatePos({ prop: "pickUp", value: "Standard" });
    setMutatePos({ prop: "time", value: "in 10 Minutes" });
    setTime("");
  };
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const _time = e.target.value; // Format: "HH:MM"
    const [hours, minutes] = _time.split(":").map(Number);

    if (hours < 8 || hours > 18 || (hours === 18 && minutes > 0)) {
      setReadyToPayment(false);
      toast.error("The store is not open during the selected time.");
    } else {
      // Convert to 12-hour format with AM/PM
      const period = hours >= 12 ? "PM" : "AM";
      const adjustedHours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format
      const formattedTime = `${adjustedHours}:${minutes
        .toString()
        .padStart(2, "0")} ${period}`;

      setTime(formattedTime); // Save the formatted time
      setMutatePos({ prop: "time", value: formattedTime });
    }
  };

  const handlePayment = () => {
    setMutatePos({ prop: "time", value: time || "in 10 Minutes" });
    setIsPaymentModal(true);
    onClose();
  };

  const isReadyToPayment = () => {
    if (posOrder?.pickUp == "Scheduled" && time) {
      setReadyToPayment(true);
    } else if (posOrder?.pickUp == "Standard") {
      setReadyToPayment(true);
    } else {
      setReadyToPayment(false);
    }
  };

  useEffect(() => {
    isReadyToPayment();
  }, [posOrder]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title={<Title />}>
        <div className="space-y-4">
          <Option
            value="Standard"
            description="10 Minutes"
            isSelected={posOrder?.pickUp === "Standard"}
            onSelect={handleStandard}
          />
          <Option
            value="Scheduled"
            description={
              <input
                type="time"
                step="900" // Step size in seconds (e.g., 900 = 15 minutes)
                onChange={handleTimeChange}
              />
            }
            isSelected={posOrder?.pickUp === "Scheduled"}
            onSelect={handleScheduled}
          />
          {ReadyToPayment && (
            <button
              onClick={handlePayment}
              className="bg-brown-600 text-white w-full p-2 rounded-md hover:bg-opacity-95"
            >
              Payment
            </button>
          )}
        </div>
      </Modal>
      <PaymentModal
        isOpen={isPaymentModal}
        onClose={() => setIsPaymentModal(false)}
      />
    </>
  );
}

function Title() {
  return (
    <div className="pb-4 border-b">
      <h1 className="flex gap-2 items-center font-semibold text-brown-600 text-xl">
        Pick-Up Option
      </h1>
    </div>
  );
}

type OptionProps = {
  value: string;
  description: ReactNode;
  isSelected: boolean;
  onSelect?: () => void;
};

function Option({ value, description, isSelected, onSelect }: OptionProps) {
  return (
    <div
      className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer ${
        isSelected ? "border-brown-600" : "border-gray-300"
      }`}
      onClick={onSelect}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-5 h-5 flex justify-center items-center rounded-full border ${
            isSelected ? "border-brown-600" : "border-gray-300"
          }`}
        >
          {isSelected && (
            <div className="w-3 h-3 bg-brown-600 rounded-full"></div>
          )}
        </div>
        <div className="font-semibold text-gray-500">{value}</div>
      </div>
      <div className="text-gray-500">{description}</div>
    </div>
  );
}
