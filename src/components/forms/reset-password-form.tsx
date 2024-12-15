import InputError from "@/components/input-error";
import { PasswordInput } from "@/components/password-input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import api from "@/lib/axios-instance";
import { routes } from "@/lib/routes";
import { resetPasswordSchema } from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router";
import { z } from "zod";

type resetPasswordFormCredentials = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordForm() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<resetPasswordFormCredentials>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      hashValue: searchParams.get("hash") ?? "",
      password: "",
      confirmPassword: "",
    },
    mode: "all",
  });

  const onSubmit = async (payload: resetPasswordFormCredentials) => {
    setIsLoading(true);
    const { hashValue, password } = payload;

    await api
      .post("/auth/reset-password", {
        hashValue,
        password,
      })
      .then(async (response) => {
        toast({
          title: response.data.message,
        });
        setTimeout(() => {
          navigate(`/${routes.auth.login}`);
          window.location.reload();
        }, 1500);
        setIsLoading(false);
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: error.response.data.message ?? error.message,
        });
        setIsLoading(false);
      });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="form-container"
    >
      <div className="space-y-3">
        {/* Password field */}
        <div>
          <div className="form-input">
            <Label htmlFor="password">Password</Label>
            <PasswordInput
              id="password"
              placeholder="Password"
              {...register("password")}
            />
          </div>
          {errors.password && <InputError errorMessage={errors.password.message} />}
        </div>

        {/* Confirm Password field */}
        <div>
          <div className="form-input">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <PasswordInput
              id="confirm-password"
              placeholder="Confirm Password"
              {...register("confirmPassword")}
            />
          </div>
          {errors.confirmPassword && <InputError errorMessage={errors.confirmPassword.message} />}
        </div>
      </div>

      <Button
        className="w-full"
        type="submit"
        size="lg"
        disabled={isLoading}
      >
        {isLoading && (
          <Loader2
            className="mr-2 size-4 animate-spin"
            aria-hidden="true"
          />
        )}
        Reset Password
      </Button>
    </form>
  );
}
