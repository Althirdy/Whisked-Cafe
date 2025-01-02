import {
  EllipsisVertical,
  Mail,
  PencilIcon,
  Phone,
  TrashIcon,
  User,
  UserCog,
} from "lucide-react";
import { Employee_T } from "../Employee_T";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import UpdateEmployeeModal from "./UpdateEmployeeModal";
import { useState } from "react";
import RemoveEmployeeModal from "./RemoveEmployeeModal";

interface EmployeeList_I {
  employee: Employee_T[];
  FetchEmployee: () => void;
}

export default function EmployeeList({
  employee,
  FetchEmployee,
}: EmployeeList_I) {
  return (
    <div className="grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
      {employee &&
        employee.map((data) => (
          <EmployeeCard
            employee_data={data}
            key={data.id}
            FetchEmployee={FetchEmployee}
          />
        ))}
    </div>
  );
}

function EmployeeCard({
  employee_data,
  FetchEmployee,
}: {
  employee_data: Employee_T;
  FetchEmployee: () => void;
}) {
  const [isOpen, setIsOpen] = useState({
    updateModal: false,
    removeModal: false,
  });

  return (
    <div className="border space-y-2 relative rounded-md p-4 bg-white shadow-sm">
      <div className="absolute top-2 right-2 w-52 text-right">
        <Menu>
          <MenuButton className="hover:border text-gray-800 p-1 rounded-md ">
            <EllipsisVertical />
          </MenuButton>

          <MenuItems
            transition
            anchor="bottom end"
            className="w-52 text-sm bg-white border rounded-lg shadow-md space-y-2 p-2"
          >
            <MenuItem>
              <button
                onClick={() => setIsOpen({ ...isOpen, updateModal: true })}
                className="flex items-center gap-2 pl-4 text-md  text-gray-700 font-medium hover:bg-gray-100 w-full p-2 rounded-md"
              >
                <PencilIcon className="size-4 fill-white/30" />
                Edit
              </button>
            </MenuItem>
            <MenuItem>
              <button
                onClick={() => setIsOpen({ ...isOpen, removeModal: true })}
                className="flex items-center gap-2 pl-4 text-md  text-gray-700 font-medium hover:bg-gray-100 w-full p-2 rounded-md"
              >
                <TrashIcon className="size-4 fill-white/30" />
                Remove
              </button>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
      {isOpen.updateModal && (
        <UpdateEmployeeModal
          isOpen={isOpen.updateModal}
          employee={employee_data}
          closeDialog={() => setIsOpen({ ...isOpen, updateModal: false })}
        />
      )}
      {isOpen.removeModal && (
        <RemoveEmployeeModal
          FetchEmployee={FetchEmployee}
          isOpen={isOpen.removeModal}
          closeDialog={() => setIsOpen({ ...isOpen, removeModal: false })}
          employee={employee_data}
        />
      )}
      <div className="flex items-center gap-2 text-gray-900">
        <User size={15} />
        <span className=" text-md font-bold">{employee_data.fullName}</span>
      </div>
      <div className="flex items-center gap-2 text-gray-600">
        <Mail size={15} />
        <span className=" text-sm">{employee_data.email}</span>
      </div>
      <div className="flex items-center gap-2 text-gray-600">
        <Phone size={15} />
        <span className=" text-sm">{employee_data.phoneNumber}</span>
      </div>
      <div className="text-sm   gap-2 border flex items-center justify-center   p-2 rounded-md">
        <UserCog size={15} />
        {employee_data.role}
      </div>
    </div>
  );
}
