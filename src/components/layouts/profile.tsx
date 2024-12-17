import CustomLink from "@/components/custom-link";
import { siteConfig } from "@/config/site";
import { Outlet } from "react-router";

export default function ProfileLayout() {
  return (
    <div className="flex flex-col gap-5 px-2 md:px-8 max-w-4xl w-full mx-auto board-content">
      <div className="flex max-lg:flex-col lg:items-start gap-5">
        {/* Sidebar */}
        <ul className="py-3 lg:px-3 lg:max-w-48 w-full flex lg:flex-col max-lg:border-b lg:border-r border-accent gap-1">
          {siteConfig.profileNav.map((item, index) => (
            <CustomLink
              item={item}
              key={`${index}-${item.title}`}
            />
          ))}
        </ul>

        {/* Children */}
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
