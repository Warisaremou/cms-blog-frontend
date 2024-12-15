import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import api from "@/lib/axios-instance";
import { forgotPasswordSchema } from "@/lib/validations/auth";
import { forgotPasswordCredentials } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import InputError from "../input-error";

export default function ForgotPasswordForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<forgotPasswordCredentials>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
    mode: "all",
  });

  const onSubmit = async (payload: forgotPasswordCredentials) => {
    setIsLoading(true);

    await api
      .post("/auth/forgot-password", payload)
      .then(async (response) => {
        toast({
          title: response.data.message,
        });
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
        Send reset link
      </Button>
    </form>
  );
}
