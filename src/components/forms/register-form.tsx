import { PasswordInput } from "@/components/password-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { routes } from "@/lib/routes";
import { registerSchema } from "@/lib/validations/auth";
import { createAccount } from "@/services/auth";
import { registerCredentials } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import InputError from "../input-error";

export default function RegisterForm() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<registerCredentials>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      surname: "",
      firstname: "",
      email: "",
      password: "",
    },
    mode: "all",
  });

  const onSubmit = async (payload: registerCredentials) => {
    setIsLoading(true);

    await createAccount(payload)
      .then(async (response) => {
        toast({
          title: response.message,
        });
        setTimeout(() => {
          setIsLoading(false);
          navigate(`/${routes.auth.login}`);
        }, 1500);
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
        {/* Username Field */}
        <div>
          <div className="form-input">
            <Label htmlFor="username">Username</Label>
            <Input
              className=""
              id="username"
              placeholder="Your username"
              {...register("username")}
            />
          </div>
          {errors.username && <InputError errorMessage={errors.username.message} />}
        </div>

        {/* Surname field */}
        <div>
          <div className="form-input">
            <Label htmlFor="surname">Surname</Label>
            <Input
              id="surname"
              placeholder="Your surname"
              {...register("surname")}
            />
          </div>
          {errors.surname && <InputError errorMessage={errors.surname.message} />}
        </div>

        {/* Firstname field */}
        <div>
          <div className="form-input">
            <Label htmlFor="firstname">Firstname</Label>
            <Input
              id="firstname"
              placeholder="Your firstname"
              {...register("firstname")}
            />
          </div>
          {errors.firstname && <InputError errorMessage={errors.firstname.message} />}
        </div>

        {/* Email field */}
        <div>
          <div className="form-input">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              placeholder="Your email"
              {...register("email")}
            />
          </div>
          {errors.email && <InputError errorMessage={errors.email.message} />}
        </div>

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
        Create account
      </Button>

      <div className="text-center text-sm">
        Already have an account ?
        <Link
          className="external-link ml-1"
          to={`/${routes.auth.login}`}
        >
          sign in
        </Link>
      </div>
    </form>
  );
}
