import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const FetchInventory = async (Url: string) => {
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

export const FetchInventoryCategory = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/v1/inventoryCategory`, {
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

export const addInventoryStock = async (inventoryData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/v1/inventory`,
      {
        ...inventoryData,
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
