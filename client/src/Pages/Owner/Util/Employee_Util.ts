import axios from "axios";
import { AddingEmployee_T } from "../EmployeeComp/Employee_T";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

/**
 * Add a new employee
 * @param employee - Employee data
 * @returns Response from the server
 * @M method
 */

export const addEmployee_M = async (employeeDate: AddingEmployee_T) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/v1/employee`,
      {
        fullName: employeeDate.fullName,
        phoneNumber: employeeDate.phoneNumber,
        email: employeeDate.email,
        role: employeeDate.role,
        password: employeeDate.password,
        password_confirmation: employeeDate.confirm_password,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
          "Content-Type": "application/json",
        },
      }
    );
    return {
      success: true,
      message: response.data.message,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "An error occurred",
      errors: error.response?.data?.errors || {},
    };
  }
};

/**
 * Fetch all employees
 * @returns List of employees
 */

export const FetchEmployees = async (
  Url: string = `${BASE_URL}/v1/employee`
) => {
  try {
    const response = await axios.get(Url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
      },
    });
    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to fetch employees",
    };
  }
};

/**
 * Update employee
 * @returns Response from Server
 * @param Password - new Password for the employee and the ID
 */
export const UpdateEmployee = async ({
  id,
  password,
  confirm_password,
}: {
  id: number;
  password: string;
  confirm_password: string;
}) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/v1/employee/${id}`,
      {
        password: password,
        password_confirmation: confirm_password,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
        },
      }
    );
    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data || "Failed to Update employees",
    };
  }
};

/**
 * Deactivate employee
 * @returns Response from Server
 * @param id- Employee ID
 */

export const DeactivateEmployee = async ({ id }: { id: number }) => {
  try {
    const response = await axios.delete(`${BASE_URL}/v1/employee/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
      },
    });
    return {
      success: true,
      date: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data || "Failed to Remove employee",
    };
  }
};
