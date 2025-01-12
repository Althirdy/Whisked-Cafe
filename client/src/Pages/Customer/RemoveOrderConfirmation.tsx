import { AlertCircleIcon } from "lucide-react";
import Modal from "../../Components/Modal";
import { OnlineOrderReport } from "../Owner/ReportsComp/Report_T";
import { Description, Field, Label, Textarea } from "@headlessui/react";
import clsx from "clsx";
import { useStateContext } from "../../Contexts/ContextProvider";
import { useRef } from "react";
import toast from "react-hot-toast";
import { UpdateOnlineOrder } from "./Util/Customer_Util";

type RemoveOrderConfirmation_T = {
  isOpen: boolean;
  onClose: () => void;
  order: OnlineOrderReport;
  FetchOnlineOrder: () => void;
};
export default function RemoveOrderConfirmation({
  isOpen,
  onClose,
  order,
  FetchOnlineOrder,
}: RemoveOrderConfirmation_T) {
  const { user } = useStateContext();
  const note = useRef<HTMLTextAreaElement>(null);
  const handleRemove = async () => {
    if (!note.current?.value) {
      toast.error("What is the reason for cancellation of the order?");
      return;
    }
    const UpdateData = {
      status: "CANCELLED",
      crewId: user?.id,
      id: order.id,
      cancelReason: note.current?.value,
    };

    const res = await UpdateOnlineOrder(UpdateData);
    if (res.success) {
      FetchOnlineOrder();
      toast.success("Order Cancelled successfully!");
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 font-bold ">
            <AlertCircleIcon size={24} className="text-red-600" />
            <span className="text-gray-800">Remove Online Order</span>
          </div>
        </div>
      }
    >
      <div>
        <p className="text-gray-600">
          Are you sure you want to remove{" "}
          <span className="italic font-bold text-gray-800">
            {order.customer.fullName}
          </span>{" "}
          Order? This action cannot be undone.
        </p>
        <Field className="mt-4">
          <Description className="text-sm/6 text-gray-800">
            Reason for cancellation.
          </Description>
          <Textarea
            ref={note}
            className={clsx(
              "block w-full resize-none rounded-lg border bg-white/5 py-1.5 px-3 text-sm/6 text-black",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
            )}
            rows={3}
          />
        </Field>
        <div className="flex items-center mt-5 gap-2 justify-end">
          <button
            type="button"
            className="border text-sm px-4 py-2 rounded-md shadow-sm"
            onClick={onClose}
          >
            Close
          </button>
          <button
            type="button"
            onClick={handleRemove}
            className="border border-white bg-red-600 text-white text-sm px-4 py-2 rounded-md shadow-sm"
          >
            Remove
          </button>
        </div>
      </div>
    </Modal>
  );
}
