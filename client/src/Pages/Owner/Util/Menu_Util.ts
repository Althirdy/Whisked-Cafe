import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;
/**
 * @getMenu - Fetching all of the meals from the backend
 * @return - return the data from the backend if its success or not
 */

export const getMenu = async (Url: string) => {
  try {
    const response = await axios.get(Url);
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
