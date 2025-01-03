import axios from "axios";

export type mealCategory = {
  id: number;
  category: string;
};
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const getMealCategory = async (): Promise<mealCategory[]> => {
  let categories: mealCategory[] = [];

  try {
    const response = await axios.get<mealCategory[]>(
      `${import.meta.env.VITE_BACKEND_URL}/v1/mealCategory`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
        },
      }
    );
    categories = response.data;
  } catch (error: any) {
    console.error("Error fetching meal categories:", error.message);
    categories = [];
  }
  return categories;
};

/**
 * @GetMealMethod - Fetching all of the meals from the backend
 * @return - return the data from the backend if its success or not
 */

export const getMeals = async (Url: string = `${BASE_URL}/v1/meals`) => {
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
