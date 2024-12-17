import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/auth/hook";
import { cn } from "@/lib/utils";
import { updateProfileSchema } from "@/lib/validations/auth";
import { updateProfileCredentials } from "@/types";
import UserAvatar from "@/user-avatar";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Textarea } from "../ui/textarea";

export default function ProfileForm() {
  // const { toast } = useToast();
  const { userData } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState<Date>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<updateProfileCredentials>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      firstname: "",
      surname: "",
      address: "",
      date_of_birth: "",
      description: "",
    },
    mode: "all",
  });

  useEffect(() => {
    const fecthData = async () => {
      await reset({
        firstname: userData.firstname,
        surname: userData.surname,
        address: userData.address,
        date_of_birth: userData.date_of_birth,
        description: userData.description,
      });
    };
    fecthData();
  }, [reset, userData]);

  const onSubmit = async (payload: updateProfileCredentials) => {
    setIsLoading(true);
    console.log(payload);
  };

  return (
    <div className="space-y-10">
      {/* User avatar */}
      <div className="flex items-center gap-x-3">
        <UserAvatar
          avatar={userData.avatar}
          firstname={userData.firstname}
          surname={userData.surname}
          className="size-16"
        />

        <Button
          variant="ghost"
          className="rounded-full border"
        >
          Change
        </Button>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="form-container !px-0"
      >
        <div className="space-y-3">
          {/* Firstname field */}
          <div>
            <div className="form-input">
              <Label htmlFor="firstname">Firstname</Label>
              <Input
                id="firstname"
                placeholder="Your Firstname"
                {...register("firstname")}
              />
            </div>
            {errors.firstname && <InputError errorMessage={errors.firstname.message} />}
          </div>

          {/* Surname field */}
          <div>
            <div className="form-input">
              <Label htmlFor="surname">Surname</Label>
              <Input
                id="surname"
                placeholder="Your Surname"
                {...register("surname")}
              />
            </div>
            {errors.surname && <InputError errorMessage={errors.surname.message} />}
          </div>

          {/* Address field */}
          <div>
            <div className="form-input">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                placeholder="Your Address"
                {...register("address")}
              />
            </div>
            {errors.address && <InputError errorMessage={errors.address.message} />}
          </div>

          {/* Date of Birth field */}
          <div>
            <div className="form-input">
              <Label htmlFor="date_of_birth">Bithdate</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn("w-[280px] justify-start text-left font-normal", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon />
                    {/* {date ? format(date, "PPP") : <span>Pick a date</span>} */}
                    <span>Pick a date</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            {errors.address && <InputError errorMessage={errors.address.message} />}
          </div>

          {/* Description field */}
          <div>
            <div className="form-input">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Tell us about yourself"
                rows={4}
                {...register("description")}
                className="resize-none"
              />
            </div>
            {errors.description && <InputError errorMessage={errors.description.message} />}
          </div>
        </div>

        <Button
          className="w-fit"
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
          Update Profile
        </Button>
      </form>
    </div>
  );
}
