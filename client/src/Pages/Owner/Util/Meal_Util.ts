import axios from "axios";

export type mealCategory = {
  id: number;
  category: string;
};

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
  } catch (error) {
    console.error("Error fetching meal categories:", error.message);
    categories = [];
  }
  return categories;
};
