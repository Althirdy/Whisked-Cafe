import { Eye, EyeOff, UserPlus } from "lucide-react";
import Modal from "../../../Components/Modal";
import { useState } from "react";
import { Employee_T } from "../Employee_T";
type AddModalProps_T = {
  isOpen: boolean;
  closeDialog: () => void;
  employee: Employee_T;
};

function UpdateEmployeeModal({
  isOpen,
  closeDialog,
  employee,
}: AddModalProps_T) {
  const [formData, setFormData] = useState({
    password: "",
    confirm_password: "",
  });
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirm_password: false,
  });

  const handleAddEmployee = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="overflow-visible">
      <Modal
        isOpen={isOpen}
        onClose={closeDialog}
        title={
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 font-bold text-gray-900">
              <UserPlus size={20} />
              Update Employee
            </div>
            <p className="text-sm text-gray-500"><span className="italic">{employee.fullName}'s</span> Password.</p>
          </div>
        }
      >
        <form className="space-y-4" onSubmit={handleAddEmployee}>
          {/* Password */}
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword.password ? "text" : "password"}
                className="w-full rounded-lg border p-3 placeholder:text-sm border-gray-300  pr-10 text-sm focus:border-brown-500 focus:outline-none focus:ring-1 focus:ring-brown-500"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <button
                type="button"
                onClick={() =>
                  setShowPassword({
                    ...showPassword,
                    password: !showPassword.password,
                  })
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword.password ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
          {/* Confirm Password */}
          <div className="space-y-2">
            <label
              htmlFor="confirm_password"
              className="text-sm font-medium text-gray-700"
            >
              Confirm Password<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="confirm_password"
                type={showPassword.confirm_password ? "text" : "password"}
                className="w-full rounded-lg border p-3 placeholder:text-sm border-gray-300  pr-10 text-sm focus:border-brown-500 focus:outline-none focus:ring-1 focus:ring-brown-500"
                value={formData.confirm_password}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    confirm_password: e.target.value,
                  })
                }
              />
              <button
                type="button"
                onClick={() =>
                  setShowPassword({
                    ...showPassword,
                    confirm_password: !showPassword.confirm_password,
                  })
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword.confirm_password ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 justify-end">
            <button
              type="button"
              className="border text-sm px-4 py-2 rounded-md shadow-sm"
              onClick={closeDialog}
            >
              Close
            </button>
            <button
              type="submit"
              className="border border-white bg-brown-600 text-white text-sm px-4 py-2 rounded-md shadow-sm"
            >
              Save
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default UpdateEmployeeModal;
