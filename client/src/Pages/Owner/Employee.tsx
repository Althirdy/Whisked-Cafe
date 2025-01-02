import { useEffect, useState } from "react";
import InputField from "../../Components/InputField";
import { UserPlus } from "lucide-react";
import EmployeeList from "./EmployeeComp/EmployeeList";
import AddEmployeeModal from "./EmployeeComp/AddEmployeeModal";
import { Employee_T } from "./Employee_T";
import { FetchEmployees } from "./EmployeeComp/Employee_Util";

function Employee() {
  const [query, setQuery] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [employeeData, setEmployeeData] = useState<Employee_T[]>();

  /**
   *
   * @Method Fetching all the Employee
   * @param Url - when the query is not empty it will pass as a param in the query in backend
   */
  const FetchEmployee = async (Url?: string) => {
    const res = await FetchEmployees(Url);
    if (res.success) {
      setEmployeeData(res.data.data);
    } else {
      setEmployeeData([]);
    }
  };

  useEffect(() => {
    const url = query
      ? `${import.meta.env.VITE_BACKEND_URL}/v1/employee?query=${query}`
      : undefined;

    FetchEmployee(url);
  }, [query]);
  return (
    <div className="space-y-4">
      <div className="md:flex space-y-2 justify-between items-center">
        <div className="flex flex-col gap-2 md:w-[50%]">
          <h1 className="font-semibold text-md">
            Employee List ({employeeData?.length})
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
      {employeeData ? (
        <EmployeeList employee={employeeData} FetchEmployee={FetchEmployee} />
      ) : (
        "Loading..."
      )}
      {/* AddingModal */}
      <AddEmployeeModal
        isOpen={isOpen}
        FetchEmployee={FetchEmployee}
        closeDialog={() => setIsOpen(false)}
      />
      {/* UpdaingModal */}
    </div>
  );
}

export default Employee;
