import Logo from "@/components/logo";

export default function Navbar() {
  return (
    <nav className="flex flex-row items-center justify-between py-4">
      <Logo />

      {/* <ul className="flex flex-row items-center gap-x-1 md:gap-x-4">
        {siteConfig.mainNav.map((item) => {
          const isActive = pathname === item.href || pathname.includes(item.title.toLowerCase());

          return (
            <Link
              className={cn(
                "rounded-full px-4 py-2 text-sm text-foreground transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/10 focus-visible:ring-offset-0",
                isActive ? "bg-gray-200/70 font-semibold" : "font-medium hover:bg-accent",
              )}
              href={item.href}
              key={item.title}
            >
              {item.title}
            </Link>
          );
        })}
      </ul> */}

      {/* <div className="flex gap-2">
        <Button
          variant="default"
          asChild
        >
          <Link href={routes.blogs.addPost}>Add Post</Link>
        </Button>
        <UserProfileDropdown />
      </div> */}
    </nav>
  );
}
