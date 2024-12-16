import api from "@/lib/axios-instance";
import { addPostCredentials } from "@/types";

export const getAllPosts = async () => {
  const response = await api.get("/posts").then((res) => res);
  return response.data;
};

export const addPost = async ({ title, content, image, categories }: addPostCredentials) => {
  const form = new FormData();

  form.append("title", title);
  form.append("content", content);
  categories.map((id_category) => {
    form.append("categories", id_category.toString());
  });
  // image && form.append("image", "wx");
  console.log(image);

  const response = await api.post("/posts", form).then((res) => res);
  return response.data;
};
