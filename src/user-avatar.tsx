import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type Props = {
  avatar: string | null;
  surname: string;
  firstname: string;
  className?: string;
};

export default function UserAvatar({ avatar, surname, firstname, className }: Props) {
  return (
    <Avatar className={cn("border bg-accent size-9", className)}>
      <AvatarImage
        src={avatar ?? ""}
        alt={`${surname} ${firstname}`}
        className="size-full object-cover"
      />
      <AvatarFallback>{firstname.substring(0, 1).toUpperCase() + surname.substring(0, 1).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
}
