import { Button } from "@/components/ui/button";
import { User } from "@/types";
import UserAvatar from "@/user-avatar";

export default function AvatarUpload({ userData }: { userData: User }) {
  return (
    <div className="flex items-center gap-x-3">
      <UserAvatar
        avatar={userData.avatar}
        firstname={userData.firstname}
        surname={userData.surname}
        className="size-16 border-2"
      />

      <Button
        variant="ghost"
        className="rounded-full border"
      >
        Change
      </Button>
    </div>
  );
}
