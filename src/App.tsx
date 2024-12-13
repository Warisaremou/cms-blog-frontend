import { AuthLayout, BoardLayout } from "@/components/layouts";
import { routes } from "@/lib/routes";
import { Home, NotFound } from "@/pages";
import { ForgotPassword, Login, Register, ResetPassword } from "@/pages/auth";
import { AddPost, EditPost, Post, Posts } from "@/pages/posts";
import { Profile } from "@/pages/profile";
import { Route, BrowserRouter as Router, Routes } from "react-router";

function App() {
  return (
    <div>
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
              <Route
                path={routes.posts.addPost}
                element={<AddPost />}
              />
              <Route
                path={routes.posts.editPost}
                element={<EditPost />}
              />
            </Route>
            <Route path={routes.profile.index}>
              <Route
                index
                element={<Profile />}
              />
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
    </div>
  );
}

export default App;
