import InputError from "@/components/input-error";
import { PasswordInput } from "@/components/password-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocalStorage } from "@/hooks/use-localstorage";
import { useToast } from "@/hooks/use-toast";
import api from "@/lib/axios-instance";
import { routes } from "@/lib/routes";
import { loginSchema } from "@/lib/validations/auth";
import { loginCredentials } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";

export default function LoginForm() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { setItem } = useLocalStorage();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginCredentials>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
    mode: "all",
  });

  const onSubmit = async (payload: loginCredentials) => {
    setIsLoading(true);

    await api
      .post("/auth/login", payload)
      .then(async (response) => {
        toast({
          title: response.data.message,
        });
        setItem("accessToken", response.data?.token);
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
        navigate("/");
        window.location.reload();
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
        {/* Identifier field */}
        <div>
          <div className="form-input">
            <Label htmlFor="identifier">Identifier</Label>
            <Input
              id="identifier"
              placeholder="Your identifier"
              {...register("identifier")}
            />
          </div>
          {errors.identifier && <InputError errorMessage={errors.identifier.message} />}
        </div>

        {/* Password field */}
        <div>
          <div className="form-input">
            <Label htmlFor="password">Password</Label>
            <PasswordInput
              id="password"
              placeholder="Your Password"
              {...register("password")}
            />
          </div>
          {errors.password && <InputError errorMessage={errors.password.message} />}
        </div>
      </div>

      <div className="flex justify-end">
        <Link
          className="external-link"
          to={`/${routes.auth.forgotPassword}`}
        >
          Forgot password ?
        </Link>
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
        Log in
      </Button>

      <div className="text-center text-sm">
        Don&apos;t have an account ?
        <Link
          className="external-link ml-1"
          to={`/${routes.auth.register}`}
        >
          sign up now
        </Link>
      </div>
    </form>
  );
}
