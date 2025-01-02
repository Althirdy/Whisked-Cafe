import axios from "axios";
import { login } from "./Auth_T";

export const Auth_Login = async ({ email, password }: login) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/v1/login`,
      {
        email,
        password,
      }
    );
    const token = response.data.token;

    localStorage.setItem("ACCESS_TOKEN", token); // Store the token in localStorage
    return { success: true, token }; // Return success and token
  } catch (error: any) {
    if (error.response && error.response.data) {
      return { success: false, message: error.response.data };
    }
    return { success: false, message: "An unexpected error occurred." };
  }
};

export const Auth_Logout = async () => {
  try {
    await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/v1/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
        },
      }
    );
    localStorage.removeItem("ACCESS_TOKEN");
    return { status: true };
  } catch (error: any) {
    console.error("Logout failed:", error.response?.data || error.message);
    return { status: false };
  }
};
