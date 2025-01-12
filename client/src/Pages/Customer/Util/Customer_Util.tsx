import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const SaveOnlineOrder = async (successOrerData: any) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/v1/onlineorder`,
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
      error: error.response?.data?.error,
    };
  }
};

export const FetchOnlineOrder = async ({ url }: { url: string }) => {
  try {
    const response = await axios.get(`${url}`, {
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
      error: error.response?.data?.error,
    };
  }
};

export const UpdateOnlineOrder = async (data: {
  status: string;
  crewId: number;
  id: number;
  cancelReason?: string;
}) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/v1/onlineorder/${data.id}`,
      {
        status: data.status,
        crewId: data.crewId,
        cancelReason: data.cancelReason,
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
