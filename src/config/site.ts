import { routes } from "@/lib/routes";
import { MainNavItem } from "@/types";

export const siteConfig = {
  name: "BlogHunter",
  description: "Simple blogging platform",
  url: "website_url",
  mainNav: [
    {
      title: "Home",
      href: routes.index,
    },
    {
      title: "Posts",
      href: routes.posts.index,
    },
  ] satisfies MainNavItem[],
  profileNav: [
    {
      title: "Profile",
      href: `/${routes.profile.index}`,
    },
    {
      title: "My Posts",
      href: routes.profile.posts,
    },
  ] satisfies MainNavItem[],
};
