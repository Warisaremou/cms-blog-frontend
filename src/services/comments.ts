import api from "@/lib/axios-instance";
import { Comment } from "@/types";

export async function getComments(id_post: number) {
  const response = await api.get(`/comments/posts/${id_post}`);
  return response.data;
}

export async function addComment(comment_data: Comment) {
  const response = await api.post(`/comments`, comment_data);
  return response.data;
}
