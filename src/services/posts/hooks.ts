import api from "@/lib/axios-instance";

export const getAllPosts = async () => {
  const response = await api.get("/posts").then((res) => res);
  return response.data;
};
