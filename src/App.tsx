import { AuthLayout, BoardLayout, ProfileLayout } from "@/components/layouts";
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/contexts/auth/provider";
import CategoriesProvider from "@/contexts/categories/provider";
import PostsProvider from "@/contexts/posts/provider";
import AuthGuard from "@/guard/auth";
import { routes } from "@/lib/routes";
import { Home, NotFound } from "@/pages";
import { ForgotPassword, Login, Register, ResetPassword } from "@/pages/auth";
import { AddPost, EditPost, Post, Posts } from "@/pages/posts";
import { MyPosts, Profile } from "@/pages/profile";
import { Route, BrowserRouter as Router, Routes } from "react-router";

function App() {
  return (
    <PostsProvider>
      <CategoriesProvider>
        <AuthProvider>
          <Router>
            <Routes>
              <Route
                path={routes.index}
                element={<BoardLayout />}
              >
                <Route
                  index
                  element={<Home />}
                />
                <Route path={routes.posts.index}>
                  <Route
                    index
                    element={<Posts />}
                  />
                  <Route
                    path={routes.posts.getPost}
                    element={<Post />}
                  />
                  <Route element={<AuthGuard />}>
                    <Route
                      path={routes.posts.addPost}
                      element={<AddPost />}
                    />
                    <Route
                      path={routes.posts.editPost}
                      element={<EditPost />}
                    />
                  </Route>
                </Route>
                <Route element={<AuthGuard />}>
                  <Route
                    path={routes.profile.index}
                    element={<ProfileLayout />}
                  >
                    <Route
                      index
                      element={<Profile />}
                    />
                    <Route
                      path={routes.profile.posts}
                      element={<MyPosts />}
                    />
                  </Route>
                </Route>
              </Route>
              <Route element={<AuthLayout />}>
                <Route
                  path={routes.auth.login}
                  element={<Login />}
                />
                <Route
                  path={routes.auth.register}
                  element={<Register />}
                />
                <Route
                  path={routes.auth.forgotPassword}
                  element={<ForgotPassword />}
                />
                <Route
                  path={routes.auth.resetPassword}
                  element={<ResetPassword />}
                />
              </Route>

              <Route
                path="*"
                element={<NotFound />}
              />
            </Routes>
          </Router>
          <Toaster />
        </AuthProvider>
      </CategoriesProvider>
    </PostsProvider>
  );
}

export default App;
