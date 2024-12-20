import { useLocalStorage } from "@/hooks/use-localstorage";
import { routes } from "@/lib/routes";
import { LogOut } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function LogoutButton() {
  const { removeItem } = useLocalStorage();
  const [isPending, setIsPending] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsPending(true);
    setTimeout(() => {
      removeItem("accessToken");
      setIsPending(false);
      navigate(`/${routes.posts.index}`);
      window.location.reload();
    }, 1500);
  };

  return (
    <button
      aria-label="Logout"
      onClick={handleLogout}
      disabled={isPending}
      className="flex w-full cursor-pointer items-center py-[2px] font-bh-medium text-destructive dark:text-red-500"
    >
      <LogOut
        className="mr-2 size-4"
        aria-hidden="true"
      />
      <span>Logout</span>
    </button>
  );
}
