import { useState } from "react";
import InputField from "../../Components/InputField";
import { UserPlus } from "lucide-react";
import EmployeeList from "./EmployeeComp/EmployeeList";
import AddEmployeeModal from "./EmployeeComp/AddEmployeeModal";
import { Employee_T } from "./Employee_T";

const employeeData: Employee_T[] = [
  {
    id: 1,
    fullName: "Bj Cabaat",
    email: "Bj@whiskedcafe.com",
    role: "Cashier",
    phoneNumber: "+639090323355",
  },
  {
    id: 2,
    fullName: "Jin Failana",
    email: "Jin@whiskedcafe.com",
    role: "Cashier",
    phoneNumber: "+639090323355",
  },
];

function Employee() {
  const [query, setQuery] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="md:flex space-y-2 justify-between items-center">
        <div className="flex flex-col gap-2 md:w-[50%]">
          <h1 className="font-semibold text-md">
            Employee List ({employeeData.length})
          </h1>
          <InputField
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search employee.."
          />
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="px-3 py-2 bg-brown-600 flex items-center gap-2 text-white rounded-md text-sm hover:bg-opacity-90 focus:outline-1 focus:outline-blue-600"
        >
          <UserPlus size={16} />
          Add Employee
        </button>
      </div>
      {/* EmployeeList */}
      <EmployeeList employee={employeeData} />
      {/* AddingModal */}
      <AddEmployeeModal isOpen={isOpen} closeDialog={() => setIsOpen(false)} />
      {/* UpdaingModal */}
    </div>
  );
}

export default Employee;
