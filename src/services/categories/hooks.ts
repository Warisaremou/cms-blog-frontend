import api from "@/lib/axios-instance";

export const getAllCategories = async () => {
  const response = await api.get("/categories").then((res) => res);
  return response.data;
};
