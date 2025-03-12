import { PostList } from "@/types";
import { createContext } from "react";

const PostsContext = createContext<{
  isLoading: boolean;
  refresh: () => void;
  posts: PostList;
}>({
  isLoading: true,
  refresh: () => {},
  posts: {
    data: [],
    meta: {
      page: 1,
      per_page: 6,
    },
  },
});

export { PostsContext };
