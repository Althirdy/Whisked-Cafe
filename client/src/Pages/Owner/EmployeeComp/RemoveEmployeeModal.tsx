import React from "react";
import Modal from "../../../Components/Modal";
import { Employee_T } from "../Employee_T";
import { AlertCircleIcon } from "lucide-react";

type RemoveModalProps_T = {
  isOpen: boolean;
  closeDialog: () => void;
  employee: Employee_T;
};

export default function RemoveEmployeeModal({
  isOpen,
  closeDialog,
  employee,
}: RemoveModalProps_T) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={closeDialog}
      title={
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 font-bold ">
            <AlertCircleIcon size={24} className="text-red-600" />
            <span className="text-gray-800">Remove Employee</span>
          </div>
        </div>
      }
    >
      <div>
        <p className="text-gray-600">
          Are you sure you want to remove{" "}
          <span className="italic font-bold text-gray-800">
            {employee.fullName}
          </span>{" "}
          from your crew? This action cannot be undone.
        </p>
        <div className="flex items-center mt-5 gap-2 justify-end">
          <button
            type="button"
            className="border text-sm px-4 py-2 rounded-md shadow-sm"
            onClick={closeDialog}
          >
            Close
          </button>
          <button
            type="submit"
            className="border border-white bg-red-600 text-white text-sm px-4 py-2 rounded-md shadow-sm"
          >
            Remove
          </button>
        </div>
      </div>
    </Modal>
  );
}