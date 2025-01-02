import { useState } from "react";
import ComboBox from "../../../Components/ComboBox";
import InputField from "../../../Components/InputField";
import Modal from "../../../Components/Modal";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { AddingEmployee_T } from "../Employee_T";
import { addEmployee_M } from "./Employee_Util";
import toast from "react-hot-toast";

type AddModalProps_T = {
  isOpen: boolean;
  closeDialog: () => void;
  FetchEmployee: () => void;
};

const Role = ["Cashier", "Assistant Manager"];

export default function AddEmployeeModal({
  isOpen,
  closeDialog,
  FetchEmployee,
}: AddModalProps_T) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<any>();
  const [addEmployee, setAddEmployee] = useState<AddingEmployee_T>({
    fullName: "",
    email: "",
    phoneNumber: "",
    role: "",
    password: "",
    confirm_password: "",
  });

  const handleAddEmployee = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await addEmployee_M(addEmployee);
    if (!result.success) {
      setError(result.errors);
      console.log(result.errors);
    } else {
      setError(null);
      setAddEmployee({
        fullName: "",
        email: "",
        phoneNumber: "",
        role: "",
        password: "",
        confirm_password: "",
      });
      toast.success("Employee Added Successfully!");
      FetchEmployee();
      closeDialog();
      
    }
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
              Add Employee
            </div>
            <p className="text-sm text-gray-500">
              Fill in the details below to add a new team member.
            </p>
          </div>
        }
      >
        <form className="space-y-4" onSubmit={handleAddEmployee}>
          <div>
            <span className="text-sm">Employee Role</span>
            <ComboBox
              setSelectedData={(newRole: string | null) =>
                setAddEmployee({ ...addEmployee, role: newRole })
              }
              combo_data={Role}
            />
          </div>
          <InputField
            label="Full Name"
            value={addEmployee.fullName}
            onChange={(e) =>
              setAddEmployee({ ...addEmployee, fullName: e.target.value })
            }
          />
          {error?.fullName &&
            error?.fullName.map((n, index) => {
              return <DisplayError key={index} FieldError={n} />;
            })}
          <InputField
            label="Email"
            value={addEmployee.email}
            onChange={(e) =>
              setAddEmployee({ ...addEmployee, email: e.target.value })
            }
          />
          {error?.email &&
            error?.email.map((n, index) => {
              return <DisplayError key={index} FieldError={n} />;
            })}
          <InputField
            label="Phone No."
            value={addEmployee.phoneNumber}
            placeholder="+63"
            onChange={(e) =>
              setAddEmployee({ ...addEmployee, phoneNumber: e.target.value })
            }
          />
          {error?.phoneNumber &&
            error?.phoneNumber.map((n, index) => {
              return <DisplayError key={index} FieldError={n} />;
            })}
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
                type={showPassword ? "text" : "password"}
                className="w-full rounded-lg border p-3 placeholder:text-sm border-gray-300  pr-10 text-sm focus:border-brown-500 focus:outline-none focus:ring-1 focus:ring-brown-500"
                placeholder="Enter your password"
                value={addEmployee.password}
                onChange={(e) =>
                  setAddEmployee({ ...addEmployee, password: e.target.value })
                }
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {error?.password &&
              error?.password.map((n, index) => {
                return <DisplayError key={index} FieldError={n} />;
              })}
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
                type={showConfirmPassword ? "text" : "password"}
                className="w-full rounded-lg border p-3 placeholder:text-sm border-gray-300  pr-10 text-sm focus:border-brown-500 focus:outline-none focus:ring-1 focus:ring-brown-500"
                placeholder="Enter your password"
                value={addEmployee.confirm_password}
                onChange={(e) =>
                  setAddEmployee({
                    ...addEmployee,
                    confirm_password: e.target.value,
                  })
                }
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {error?.confirm_password &&
              error?.confirm_password.map((n, index) => {
                return <DisplayError key={index} FieldError={n} />;
              })}
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
              Add Employee
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

function DisplayError({ FieldError }: { FieldError: string }) {
  return (
    <>
      <span className="text-red-600 text-xs">{FieldError}</span>
      <br />
    </>
  );
}
