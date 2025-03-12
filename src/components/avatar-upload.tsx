import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { updateUserAvatar } from "@/services/auth";
import { User } from "@/types";
import UserAvatar from "@/user-avatar";
import { Loader2 } from "lucide-react";
import { ChangeEvent, useRef, useState } from "react";

type Props = {
  userData: User;
  refresh?: () => void;
};

export default function AvatarUpload({ userData, refresh }: Props) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    const { files } = e.target;

    if (!files) {
      toast({
        variant: "destructive",
        title: "No file selected",
      });
    } else {
      await updateUserAvatar({
        image: files[0],
      })
        .then(() => {
          toast({
            title: "Avatar updated successfully",
          });
          setIsLoading(false);
          refresh();
        })
        .catch((error) => {
          toast({
            variant: "destructive",
            title: error.response.data.message ?? error.message,
          });
          setIsLoading(false);
        });
    }
  };

  return (
    <div className="flex items-center gap-x-3">
      <UserAvatar
        avatar={userData.avatar}
        firstname={userData.firstname}
        surname={userData.surname}
        className="size-16 border-2"
      />

      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleAvatarUpload}
      />

      <Button
        variant="ghost"
        className="rounded-full border"
        disabled={isLoading}
        onClick={() => fileInputRef.current?.click()}
      >
        {isLoading && (
          <Loader2
            className="mr-2 size-4 animate-spin"
            aria-hidden="true"
          />
        )}
        Change Avatar
      </Button>
    </div>
  );
}
