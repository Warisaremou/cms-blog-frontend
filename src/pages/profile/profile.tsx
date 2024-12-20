import ProfileForm from "@/components/forms/profile-form";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/hooks/use-localstorage";
import { useToast } from "@/hooks/use-toast";
import { routes } from "@/lib/routes";
import { deleteAccount } from "@/services/auth";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function Profile() {
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { removeItem } = useLocalStorage();

  const handleAccountDeletion = async () => {
    setIsDeletingAccount(true);

    await deleteAccount()
      .then(async (response) => {
        toast({
          title: response.message,
        });
        removeItem("accessToken");
        setIsDeletingAccount(false);
        setTimeout(() => {
          navigate(`/${routes.auth.login}`);
          window.location.reload();
        }, 1500);
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: error.response.data.message ?? error.message,
        });
        setIsDeletingAccount(false);
      });
  };

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-bh-bold">Profile</h1>
      <ProfileForm />

      <Button
        variant="destructive"
        className="md:w-fit"
        disabled={isDeletingAccount}
        onClick={handleAccountDeletion}
      >
        {isDeletingAccount && (
          <Loader2
            className="mr-2 size-4 animate-spin"
            aria-hidden="true"
          />
        )}
        Delete Account
      </Button>
    </div>
  );
}
