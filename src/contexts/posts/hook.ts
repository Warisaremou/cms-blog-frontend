import { PostsContext } from "@/contexts/posts/context";
import { useContext } from "react";

export const usePosts = () => {
  const context = useContext(PostsContext);

  if (!context) {
    throw new Error("usePosts must be wrapped  in a <PostsProvider />");
  }

  return context;
};
