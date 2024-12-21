import CustomLink from "@/components/custom-link";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import UserProfileDropdown from "@/components/user-profile-dropdown";
import { siteConfig } from "@/config/site";
import { useAuth } from "@/contexts/auth/hook";
import { routes } from "@/lib/routes";
import { Link, Outlet } from "react-router";

export default function BoardLayout() {
  const { isAuthenticated, userData } = useAuth();

  return (
    <div className="container flex flex-col min-h-screen w-full">
      {/* Navbar */}
      <nav className="flex flex-row items-center justify-between py-4 border-b border-secondary">
        <Logo />

        <ul className="flex flex-row items-center gap-x-1 md:gap-x-4 w-full justify-center">
          {siteConfig.mainNav.map((item, index) => (
            <CustomLink
              item={item}
              key={`${index}-${item.title}`}
              // className={cn(item.title === "Home" && "max-md:hidden")}
            />
          ))}
        </ul>

        {isAuthenticated ? (
          <div className="flex gap-2">
            <Button
              variant="default"
              asChild
            >
              <Link to={`/posts/${routes.posts.addPost}`}>Share a Post</Link>
            </Button>
            <UserProfileDropdown userData={userData} />
          </div>
        ) : (
          <div className="flex gap-2">
            <Button
              variant="default"
              asChild
            >
              <Link to={routes.auth.register}>Create Account</Link>
            </Button>
            <Button
              variant="ghost"
              asChild
              className="border border-muted-foreground/15 max-sm:hidden"
            >
              <Link to={routes.auth.login}>Login</Link>
            </Button>
          </div>
        )}
      </nav>

      {/* Children */}
      <Outlet />

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-secondary py-8">
        <Logo />
        <h4 className="text-sm">©2024_All Rights Reserved</h4>
      </div>
    </div>
  );
}
