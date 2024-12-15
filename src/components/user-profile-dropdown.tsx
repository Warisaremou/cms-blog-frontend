import LogoutButton from "@/components/logout-button";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { routes } from "@/lib/routes";
import { User } from "@/types";
import UserAvatar from "@/user-avatar";
import { User as UserIcon } from "lucide-react";
import { Link } from "react-router";

export default function UserProfileDropdown({ userData }: { userData: User }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          className="relative size-11 rounded-full"
        >
          <UserAvatar
            avatar={userData.avatar}
            firstname={userData.firstname}
            surname={userData.surname}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56"
        align="end"
        forceMount
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{userData.username}</p>
            <p className="text-xs leading-none text-muted-foreground">{userData.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            asChild
            className="cursor-pointer"
          >
            <Link to={routes.profile.index}>
              <UserIcon
                className="mr-2 size-4"
                aria-hidden="true"
              />
              Profile
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="hover:!bg-destructive/10 dark:hover:!bg-red-500/30">
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
