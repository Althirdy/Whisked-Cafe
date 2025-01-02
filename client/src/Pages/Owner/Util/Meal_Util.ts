import axios from "axios";

export type mealCategory = {
  id: number;
  category: string;
};

export const getMealCategory = async (): Promise<mealCategory[]> => {
  let categories: mealCategory[] = [];

  try {
    const response = await axios.get<mealCategory[]>(
      "http://127.0.0.1:8000/api/v1/mealCategory"
    );
    categories = response.data;
  } catch (error) {
    console.error("Error fetching meal categories:", error.message);
    categories = [];
  }
  return categories;
};
