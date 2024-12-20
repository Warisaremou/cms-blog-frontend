import api from "@/lib/axios-instance";
import { addPostCredentials } from "@/types";

export const getAllPosts = async () => {
  const response = await api.get("/posts").then((res) => res);
  return response.data;
};

export const getAllPostsByUser = async () => {
  const response = await api.get("/posts/users/user-posts").then((res) => res);
  return response.data;
};

export const addPost = async ({ title, content, image, categories }: addPostCredentials) => {
  const form = new FormData();

  form.append("title", title);
  form.append("content", content);
  categories.map((id_category) => {
    form.append("categories", id_category.toString());
  });

  // @ts-expect-error: image might be undefined
  if (image) form.append("image", image[0]);

  const response = await api
    .post("/posts", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res);
  return response.data;
};

export const editpost = async (id_post: number, { title, content, image, categories }: addPostCredentials) => {
  const form = new FormData();

  form.append("title", title);
  form.append("content", content);
  categories.forEach((id_category) => {
    form.append("categories", id_category.toString());
  });

  if (image instanceof File) {
    form.append("image", image);
  }

  const response = await api.patch(`/posts/${id_post}`, form).then((res) => res);

  return response.data;
};

export const deletePost = async (id_post: number) => {
  const response = await api.delete(`/posts/${id_post}`).then((res) => res);
  return response.data;
};
