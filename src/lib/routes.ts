export const routes = {
  index: "/",
  posts: {
    index: "posts",
    addPost: "add-post",
    getPost: ":id_post",
    editPost: ":id_post/edit",
  },
  profile: {
    index: "profile",
    posts: "posts",
  },
  auth: {
    login: "login",
    register: "register",
    forgotPassword: "forgot-password",
    resetPassword: "reset-password",
  },
};
