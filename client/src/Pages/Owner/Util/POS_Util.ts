import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const SaveSuccessOrder = async (successOrerData: any) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/v1/successorder`,
      { ...successOrerData },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
          "Content-Type": "application/json",
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
      message: error.response?.data?.message || "Failed to fetch employees",
    };
  }
};

export const FetchSuccessOrder = async (URL = "") => {
  try {
    const response = await axios.get(URL, {
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
