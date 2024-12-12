import CustomLink from "@/components/custom-link";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { routes } from "@/lib/routes";
import { Link, Outlet } from "react-router";

export default function BoardLayout() {
  return (
    <div className="container">
      {/* Navbar */}
      <nav className="flex flex-row items-center justify-between py-4">
        <Logo />

        <ul className="flex flex-row items-center gap-x-1 md:gap-x-4">
          {siteConfig.mainNav.map((item, index) => (
            <CustomLink
              item={item}
              key={`${index}-${item.title}`}
            />
          ))}
        </ul>

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
          {/* <UserProfileDropdown /> */}
        </div>
      </nav>

      {/* Children */}
      <div className="py-12">
        <Outlet />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-secondary py-5">
        <Logo />
        <h4 className="text-sm">©2024_All Rights Reserved</h4>
      </div>
    </div>
  );
}
