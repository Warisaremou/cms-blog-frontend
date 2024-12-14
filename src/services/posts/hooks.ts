import api from "@/lib/axios-instance";
import { useMutation, useQuery } from "@tanstack/react-query";

// --------------- KEYS --------------- //
const POSTS_KEYS = {
  POSTS: ["posts"],
  POST: (id_post: string) => ["post", id_post],
  ADD_POST: ["add-post"],
  UPDATE_POST: (id_post: string) => ["update-post", id_post],
  DELETE_POST: (id_post: string) => ["delete-post", id_post],
};

// Posts query handler
const usePosts = () => {
  return useQuery({
    queryKey: POSTS_KEYS.POSTS,
    queryFn: () => api.get("/posts").then((response) => response.data),
  });
};

// Post query handler
const usePost = (id_post: string) => {
  return useQuery({
    queryKey: POSTS_KEYS.POST(id_post),
    queryFn: () => api.get(`/posts/${id_post}`).then((response) => response.data),
  });
};

// Add Post query handler
const useAddPost = () => {
  return useMutation({
    mutationKey: POSTS_KEYS.ADD_POST,
    mutationFn: (credentials: { title: string }) => api.post("/posts/", credentials).then((response) => response.data),
  });
};

// Update Post query handler

// Delete Post query handler
const useDeletePost = (id_post: string) => {
  return useMutation({
    mutationKey: POSTS_KEYS.DELETE_POST(id_post),
    mutationFn: () => api.delete(`/posts/${id_post}`).then((response) => response.data),
  });
};

export { POSTS_KEYS, useAddPost, useDeletePost, usePost, usePosts };
